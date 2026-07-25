#!/bin/bash

# ===================== КОНФИГУРАЦИЯ =====================
STATIC_IP="135.222.240.54"
RG_NAME="KBS"
AKS_NAME="test1"
# =======================================================

echo "Поиск ресурсной группы MC_..."
MC_RG=$(az aks show --resource-group $RG_NAME --name $AKS_NAME --query nodeResourceGroup -o tsv)
if [ -z "$MC_RG" ]; then
  echo "Ошибка: Не удалось найти MC_ группу. Проверьте RG_NAME и AKS_NAME."
  exit 1
fi
echo "Найдена MC группа: $MC_RG"

echo "Установка Ingress-контроллера с IP $STATIC_IP..."
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx > /dev/null 2>&1
helm repo update > /dev/null 2>&1

helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.admissionWebhooks.enabled=false \
  --set controller.resources.requests.cpu=0 \
  --set controller.resources.requests.memory=0 \
  --set controller.resources.limits.cpu=100m \
  --set controller.resources.limits.memory=128Mi \
  --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-internal"=false \
  --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-health-probe-request-path"=/healthz \
  --set controller.service.externalTrafficPolicy=Local \
  --set controller.service.loadBalancerIP=$STATIC_IP

echo "Ожидание назначения IP..."
sleep 10

EXTERNAL_IP=$(kubectl get svc -n ingress-nginx ingress-nginx-controller -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null)
if [ "$EXTERNAL_IP" == "$STATIC_IP" ]; then
  echo "IP успешно назначен: $EXTERNAL_IP"
else
  echo "Внимание: ожидался $STATIC_IP, получен $EXTERNAL_IP. Проверьте настройки."
fi

echo "Поиск NSG в группе $MC_RG..."
NSG_NAME=$(az network nsg list --resource-group $MC_RG --query "[0].name" -o tsv)
if [ -z "$NSG_NAME" ]; then
  echo "Ошибка: NSG не найдена."
  exit 1
fi
echo "Найдена NSG: $NSG_NAME"

echo "Добавление правила для порта 80..."
az network nsg rule create \
  --resource-group $MC_RG \
  --nsg-name $NSG_NAME \
  --name AllowHTTP \
  --priority 100 \
  --direction Inbound \
  --access Allow \
  --protocol Tcp \
  --source-address-prefixes '*' \
  --source-port-ranges '*' \
  --destination-address-prefixes '*' \
  --destination-port-ranges 80 \
  --output none

echo "Добавление правила для NodePort..."
NODE_PORT=$(kubectl get svc -n ingress-nginx ingress-nginx-controller -o jsonpath='{.spec.ports[?(@.name=="http")].nodePort}')
az network nsg rule create \
  --resource-group $MC_RG \
  --nsg-name $NSG_NAME \
  --name AllowNodePort \
  --priority 101 \
  --direction Inbound \
  --access Allow \
  --protocol Tcp \
  --source-address-prefixes '*' \
  --source-port-ranges '*' \
  --destination-address-prefixes '*' \
  --destination-port-ranges $NODE_PORT \
  --output none

echo ""
echo "=========================================="
echo "Ingress готов."
echo "Внешний IP: $EXTERNAL_IP"
echo "=========================================="
echo "Далее:"
echo "  - Создайте A-запись в DNS: $EXTERNAL_IP -> ваш домен"
echo "  - kubectl apply -f production-ingress.yaml (добавьте host в Ingress)"
echo "=========================================="
# Update Скрипт для ingress-контроллер, NSG-правила
#!/bin/bash

# 1. Установка Ingress-контроллера
echo "Установка Ingress-контроллера"
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.admissionWebhooks.enabled=false \
  --set controller.resources.requests.cpu=0 \
  --set controller.resources.requests.memory=0 \
  --set controller.resources.limits.cpu=100m \
  --set controller.resources.limits.memory=128Mi \
  --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-internal"=false \
  --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-health-probe-request-path"=/healthz \
  --set controller.service.externalTrafficPolicy=Local

# 2. Дождаться внешнего IP
echo "Ожидание внешнего IP"
EXTERNAL_IP=""
while [ -z "$EXTERNAL_IP" ]; do
  EXTERNAL_IP=$(kubectl get svc -n ingress-nginx ingress-nginx-controller -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null)
  sleep 5
done
echo "External IP: $EXTERNAL_IP"

# 3. Найти ресурсную группу MC_ и добавить NSG-правила
echo "Поиск ресурсной группы MC_..."
RESOURCE_GROUP=$(az group list --query "[?starts_with(name, 'MC_')].name" -o tsv)
if [ -z "$RESOURCE_GROUP" ]; then
  echo "Ошибка: Ресурсная группа MC_ не найдена. Убедитесь, что кластер AKS существует."
  exit 1
fi
echo "Найдена группа: $RESOURCE_GROUP"

NSG_NAME=$(az network nsg list --resource-group $RESOURCE_GROUP --query "[0].name" -o tsv)
if [ -z "$NSG_NAME" ]; then
  echo "Ошибка: NSG не найдена в группе $RESOURCE_GROUP"
  exit 1
fi
echo "Найдена NSG: $NSG_NAME"

echo "Добавление правила для порта 80"
az network nsg rule create \
  --resource-group $RESOURCE_GROUP \
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

echo "Добавление правила для NodePort"
NODE_PORT=$(kubectl get svc -n ingress-nginx ingress-nginx-controller -o jsonpath='{.spec.ports[?(@.name=="http")].nodePort}')
az network nsg rule create \
  --resource-group $RESOURCE_GROUP \
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

echo "Ingress готов. Внешний IP: $EXTERNAL_IP"
echo "Теперь: kubectl apply -f production-ingress.yaml"

# OrderItemsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiOrderItemsGet**](OrderItemsApi.md#apiorderitemsget) | **GET** /api/OrderItems |  |
| [**apiOrderItemsIdDelete**](OrderItemsApi.md#apiorderitemsiddelete) | **DELETE** /api/OrderItems/{id} |  |
| [**apiOrderItemsIdGet**](OrderItemsApi.md#apiorderitemsidget) | **GET** /api/OrderItems/{id} |  |
| [**apiOrderItemsIdPut**](OrderItemsApi.md#apiorderitemsidput) | **PUT** /api/OrderItems/{id} |  |
| [**apiOrderItemsPost**](OrderItemsApi.md#apiorderitemspost) | **POST** /api/OrderItems |  |



## apiOrderItemsGet

> Array&lt;OrderItemDTO&gt; apiOrderItemsGet()



### Example

```ts
import {
  Configuration,
  OrderItemsApi,
} from '';
import type { ApiOrderItemsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OrderItemsApi();

  try {
    const data = await api.apiOrderItemsGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;OrderItemDTO&gt;**](OrderItemDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiOrderItemsIdDelete

> apiOrderItemsIdDelete(id)



### Example

```ts
import {
  Configuration,
  OrderItemsApi,
} from '';
import type { ApiOrderItemsIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OrderItemsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiOrderItemsIdDeleteRequest;

  try {
    const data = await api.apiOrderItemsIdDelete(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `number` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiOrderItemsIdGet

> OrderItemDTO apiOrderItemsIdGet(id)



### Example

```ts
import {
  Configuration,
  OrderItemsApi,
} from '';
import type { ApiOrderItemsIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OrderItemsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiOrderItemsIdGetRequest;

  try {
    const data = await api.apiOrderItemsIdGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `number` |  | [Defaults to `undefined`] |

### Return type

[**OrderItemDTO**](OrderItemDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiOrderItemsIdPut

> apiOrderItemsIdPut(id, orderItemDTO)



### Example

```ts
import {
  Configuration,
  OrderItemsApi,
} from '';
import type { ApiOrderItemsIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OrderItemsApi();

  const body = {
    // number
    id: 56,
    // OrderItemDTO (optional)
    orderItemDTO: ...,
  } satisfies ApiOrderItemsIdPutRequest;

  try {
    const data = await api.apiOrderItemsIdPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `number` |  | [Defaults to `undefined`] |
| **orderItemDTO** | [OrderItemDTO](OrderItemDTO.md) |  | [Optional] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiOrderItemsPost

> apiOrderItemsPost(orderItemDTO)



### Example

```ts
import {
  Configuration,
  OrderItemsApi,
} from '';
import type { ApiOrderItemsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OrderItemsApi();

  const body = {
    // OrderItemDTO (optional)
    orderItemDTO: ...,
  } satisfies ApiOrderItemsPostRequest;

  try {
    const data = await api.apiOrderItemsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **orderItemDTO** | [OrderItemDTO](OrderItemDTO.md) |  | [Optional] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


# OrdersApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiOrdersGet**](OrdersApi.md#apiordersget) | **GET** /api/Orders |  |
| [**apiOrdersIdDelete**](OrdersApi.md#apiordersiddelete) | **DELETE** /api/Orders/{id} |  |
| [**apiOrdersIdGet**](OrdersApi.md#apiordersidget) | **GET** /api/Orders/{id} |  |
| [**apiOrdersIdPut**](OrdersApi.md#apiordersidput) | **PUT** /api/Orders/{id} |  |
| [**apiOrdersPost**](OrdersApi.md#apiorderspost) | **POST** /api/Orders |  |



## apiOrdersGet

> Array&lt;OrderDTO&gt; apiOrdersGet()



### Example

```ts
import {
  Configuration,
  OrdersApi,
} from '';
import type { ApiOrdersGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OrdersApi();

  try {
    const data = await api.apiOrdersGet();
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

[**Array&lt;OrderDTO&gt;**](OrderDTO.md)

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


## apiOrdersIdDelete

> apiOrdersIdDelete(id)



### Example

```ts
import {
  Configuration,
  OrdersApi,
} from '';
import type { ApiOrdersIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OrdersApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiOrdersIdDeleteRequest;

  try {
    const data = await api.apiOrdersIdDelete(body);
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


## apiOrdersIdGet

> OrderDTO apiOrdersIdGet(id)



### Example

```ts
import {
  Configuration,
  OrdersApi,
} from '';
import type { ApiOrdersIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OrdersApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiOrdersIdGetRequest;

  try {
    const data = await api.apiOrdersIdGet(body);
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

[**OrderDTO**](OrderDTO.md)

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


## apiOrdersIdPut

> apiOrdersIdPut(id, orderDTO)



### Example

```ts
import {
  Configuration,
  OrdersApi,
} from '';
import type { ApiOrdersIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OrdersApi();

  const body = {
    // number
    id: 56,
    // OrderDTO (optional)
    orderDTO: ...,
  } satisfies ApiOrdersIdPutRequest;

  try {
    const data = await api.apiOrdersIdPut(body);
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
| **orderDTO** | [OrderDTO](OrderDTO.md) |  | [Optional] |

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


## apiOrdersPost

> apiOrdersPost(orderDTO)



### Example

```ts
import {
  Configuration,
  OrdersApi,
} from '';
import type { ApiOrdersPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new OrdersApi();

  const body = {
    // OrderDTO (optional)
    orderDTO: ...,
  } satisfies ApiOrdersPostRequest;

  try {
    const data = await api.apiOrdersPost(body);
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
| **orderDTO** | [OrderDTO](OrderDTO.md) |  | [Optional] |

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


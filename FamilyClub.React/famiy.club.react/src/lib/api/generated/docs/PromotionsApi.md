# PromotionsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiPromotionsGet**](PromotionsApi.md#apipromotionsget) | **GET** /api/Promotions |  |
| [**apiPromotionsIdDelete**](PromotionsApi.md#apipromotionsiddelete) | **DELETE** /api/Promotions/{id} |  |
| [**apiPromotionsIdGet**](PromotionsApi.md#apipromotionsidget) | **GET** /api/Promotions/{id} |  |
| [**apiPromotionsIdPut**](PromotionsApi.md#apipromotionsidput) | **PUT** /api/Promotions/{id} |  |
| [**apiPromotionsPost**](PromotionsApi.md#apipromotionspost) | **POST** /api/Promotions |  |



## apiPromotionsGet

> Array&lt;PromotionDto&gt; apiPromotionsGet()



### Example

```ts
import {
  Configuration,
  PromotionsApi,
} from '';
import type { ApiPromotionsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PromotionsApi();

  try {
    const data = await api.apiPromotionsGet();
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

[**Array&lt;PromotionDto&gt;**](PromotionDto.md)

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


## apiPromotionsIdDelete

> apiPromotionsIdDelete(id)



### Example

```ts
import {
  Configuration,
  PromotionsApi,
} from '';
import type { ApiPromotionsIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PromotionsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiPromotionsIdDeleteRequest;

  try {
    const data = await api.apiPromotionsIdDelete(body);
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


## apiPromotionsIdGet

> PromotionDto apiPromotionsIdGet(id)



### Example

```ts
import {
  Configuration,
  PromotionsApi,
} from '';
import type { ApiPromotionsIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PromotionsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiPromotionsIdGetRequest;

  try {
    const data = await api.apiPromotionsIdGet(body);
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

[**PromotionDto**](PromotionDto.md)

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


## apiPromotionsIdPut

> apiPromotionsIdPut(id, promotionDto)



### Example

```ts
import {
  Configuration,
  PromotionsApi,
} from '';
import type { ApiPromotionsIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PromotionsApi();

  const body = {
    // number
    id: 56,
    // PromotionDto (optional)
    promotionDto: ...,
  } satisfies ApiPromotionsIdPutRequest;

  try {
    const data = await api.apiPromotionsIdPut(body);
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
| **promotionDto** | [PromotionDto](PromotionDto.md) |  | [Optional] |

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


## apiPromotionsPost

> apiPromotionsPost(promotionDto)



### Example

```ts
import {
  Configuration,
  PromotionsApi,
} from '';
import type { ApiPromotionsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PromotionsApi();

  const body = {
    // PromotionDto (optional)
    promotionDto: ...,
  } satisfies ApiPromotionsPostRequest;

  try {
    const data = await api.apiPromotionsPost(body);
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
| **promotionDto** | [PromotionDto](PromotionDto.md) |  | [Optional] |

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


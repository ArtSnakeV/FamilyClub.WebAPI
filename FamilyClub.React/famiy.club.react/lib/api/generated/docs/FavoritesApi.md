# FavoritesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiFavoritesGet**](FavoritesApi.md#apifavoritesget) | **GET** /api/Favorites |  |
| [**apiFavoritesProductIdDelete**](FavoritesApi.md#apifavoritesproductiddelete) | **DELETE** /api/Favorites/{productId} |  |
| [**apiFavoritesProductIdIsFavoriteGet**](FavoritesApi.md#apifavoritesproductidisfavoriteget) | **GET** /api/Favorites/{productId}/is-favorite |  |
| [**apiFavoritesProductIdPost**](FavoritesApi.md#apifavoritesproductidpost) | **POST** /api/Favorites/{productId} |  |



## apiFavoritesGet

> Array&lt;ProductDto&gt; apiFavoritesGet()



### Example

```ts
import {
  Configuration,
  FavoritesApi,
} from '';
import type { ApiFavoritesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FavoritesApi();

  try {
    const data = await api.apiFavoritesGet();
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

[**Array&lt;ProductDto&gt;**](ProductDto.md)

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


## apiFavoritesProductIdDelete

> apiFavoritesProductIdDelete(productId)



### Example

```ts
import {
  Configuration,
  FavoritesApi,
} from '';
import type { ApiFavoritesProductIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FavoritesApi();

  const body = {
    // number
    productId: 56,
  } satisfies ApiFavoritesProductIdDeleteRequest;

  try {
    const data = await api.apiFavoritesProductIdDelete(body);
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
| **productId** | `number` |  | [Defaults to `undefined`] |

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


## apiFavoritesProductIdIsFavoriteGet

> boolean apiFavoritesProductIdIsFavoriteGet(productId)



### Example

```ts
import {
  Configuration,
  FavoritesApi,
} from '';
import type { ApiFavoritesProductIdIsFavoriteGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FavoritesApi();

  const body = {
    // number
    productId: 56,
  } satisfies ApiFavoritesProductIdIsFavoriteGetRequest;

  try {
    const data = await api.apiFavoritesProductIdIsFavoriteGet(body);
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
| **productId** | `number` |  | [Defaults to `undefined`] |

### Return type

**boolean**

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


## apiFavoritesProductIdPost

> apiFavoritesProductIdPost(productId)



### Example

```ts
import {
  Configuration,
  FavoritesApi,
} from '';
import type { ApiFavoritesProductIdPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FavoritesApi();

  const body = {
    // number
    productId: 56,
  } satisfies ApiFavoritesProductIdPostRequest;

  try {
    const data = await api.apiFavoritesProductIdPost(body);
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
| **productId** | `number` |  | [Defaults to `undefined`] |

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


# CategoriesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiCategoriesGet**](CategoriesApi.md#apicategoriesget) | **GET** /api/Categories |  |
| [**apiCategoriesIdDelete**](CategoriesApi.md#apicategoriesiddelete) | **DELETE** /api/Categories/{id} |  |
| [**apiCategoriesIdGet**](CategoriesApi.md#apicategoriesidget) | **GET** /api/Categories/{id} |  |
| [**apiCategoriesIdPut**](CategoriesApi.md#apicategoriesidput) | **PUT** /api/Categories/{id} |  |
| [**apiCategoriesPost**](CategoriesApi.md#apicategoriespost) | **POST** /api/Categories |  |



## apiCategoriesGet

> Array&lt;CategoryDto&gt; apiCategoriesGet()



### Example

```ts
import {
  Configuration,
  CategoriesApi,
} from '';
import type { ApiCategoriesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CategoriesApi();

  try {
    const data = await api.apiCategoriesGet();
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

[**Array&lt;CategoryDto&gt;**](CategoryDto.md)

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


## apiCategoriesIdDelete

> apiCategoriesIdDelete(id)



### Example

```ts
import {
  Configuration,
  CategoriesApi,
} from '';
import type { ApiCategoriesIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CategoriesApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiCategoriesIdDeleteRequest;

  try {
    const data = await api.apiCategoriesIdDelete(body);
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


## apiCategoriesIdGet

> CategoryDto apiCategoriesIdGet(id)



### Example

```ts
import {
  Configuration,
  CategoriesApi,
} from '';
import type { ApiCategoriesIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CategoriesApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiCategoriesIdGetRequest;

  try {
    const data = await api.apiCategoriesIdGet(body);
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

[**CategoryDto**](CategoryDto.md)

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


## apiCategoriesIdPut

> apiCategoriesIdPut(id, categoryDto)



### Example

```ts
import {
  Configuration,
  CategoriesApi,
} from '';
import type { ApiCategoriesIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CategoriesApi();

  const body = {
    // number
    id: 56,
    // CategoryDto (optional)
    categoryDto: ...,
  } satisfies ApiCategoriesIdPutRequest;

  try {
    const data = await api.apiCategoriesIdPut(body);
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
| **categoryDto** | [CategoryDto](CategoryDto.md) |  | [Optional] |

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


## apiCategoriesPost

> apiCategoriesPost(categoryDto)



### Example

```ts
import {
  Configuration,
  CategoriesApi,
} from '';
import type { ApiCategoriesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CategoriesApi();

  const body = {
    // CategoryDto (optional)
    categoryDto: ...,
  } satisfies ApiCategoriesPostRequest;

  try {
    const data = await api.apiCategoriesPost(body);
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
| **categoryDto** | [CategoryDto](CategoryDto.md) |  | [Optional] |

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


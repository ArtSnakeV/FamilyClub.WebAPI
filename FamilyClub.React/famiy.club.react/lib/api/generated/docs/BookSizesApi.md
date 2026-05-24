# BookSizesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiBookSizesGet**](BookSizesApi.md#apibooksizesget) | **GET** /api/BookSizes |  |
| [**apiBookSizesIdDelete**](BookSizesApi.md#apibooksizesiddelete) | **DELETE** /api/BookSizes/{id} |  |
| [**apiBookSizesIdGet**](BookSizesApi.md#apibooksizesidget) | **GET** /api/BookSizes/{id} |  |
| [**apiBookSizesIdPut**](BookSizesApi.md#apibooksizesidput) | **PUT** /api/BookSizes/{id} |  |
| [**apiBookSizesPost**](BookSizesApi.md#apibooksizespost) | **POST** /api/BookSizes |  |



## apiBookSizesGet

> Array&lt;BookSizeDto&gt; apiBookSizesGet()



### Example

```ts
import {
  Configuration,
  BookSizesApi,
} from '';
import type { ApiBookSizesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BookSizesApi();

  try {
    const data = await api.apiBookSizesGet();
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

[**Array&lt;BookSizeDto&gt;**](BookSizeDto.md)

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


## apiBookSizesIdDelete

> apiBookSizesIdDelete(id)



### Example

```ts
import {
  Configuration,
  BookSizesApi,
} from '';
import type { ApiBookSizesIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BookSizesApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiBookSizesIdDeleteRequest;

  try {
    const data = await api.apiBookSizesIdDelete(body);
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


## apiBookSizesIdGet

> BookSizeDto apiBookSizesIdGet(id)



### Example

```ts
import {
  Configuration,
  BookSizesApi,
} from '';
import type { ApiBookSizesIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BookSizesApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiBookSizesIdGetRequest;

  try {
    const data = await api.apiBookSizesIdGet(body);
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

[**BookSizeDto**](BookSizeDto.md)

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


## apiBookSizesIdPut

> apiBookSizesIdPut(id, bookSizeDto)



### Example

```ts
import {
  Configuration,
  BookSizesApi,
} from '';
import type { ApiBookSizesIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BookSizesApi();

  const body = {
    // number
    id: 56,
    // BookSizeDto (optional)
    bookSizeDto: ...,
  } satisfies ApiBookSizesIdPutRequest;

  try {
    const data = await api.apiBookSizesIdPut(body);
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
| **bookSizeDto** | [BookSizeDto](BookSizeDto.md) |  | [Optional] |

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


## apiBookSizesPost

> apiBookSizesPost(bookSizeDto)



### Example

```ts
import {
  Configuration,
  BookSizesApi,
} from '';
import type { ApiBookSizesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BookSizesApi();

  const body = {
    // BookSizeDto (optional)
    bookSizeDto: ...,
  } satisfies ApiBookSizesPostRequest;

  try {
    const data = await api.apiBookSizesPost(body);
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
| **bookSizeDto** | [BookSizeDto](BookSizeDto.md) |  | [Optional] |

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


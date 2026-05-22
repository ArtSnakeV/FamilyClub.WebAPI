# AuthorsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiAuthorsGet**](AuthorsApi.md#apiauthorsget) | **GET** /api/Authors |  |
| [**apiAuthorsIdDelete**](AuthorsApi.md#apiauthorsiddelete) | **DELETE** /api/Authors/{id} |  |
| [**apiAuthorsIdGet**](AuthorsApi.md#apiauthorsidget) | **GET** /api/Authors/{id} |  |
| [**apiAuthorsIdPut**](AuthorsApi.md#apiauthorsidput) | **PUT** /api/Authors/{id} |  |
| [**apiAuthorsPost**](AuthorsApi.md#apiauthorspost) | **POST** /api/Authors |  |



## apiAuthorsGet

> Array&lt;AuthorDTO&gt; apiAuthorsGet()



### Example

```ts
import {
  Configuration,
  AuthorsApi,
} from '';
import type { ApiAuthorsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthorsApi();

  try {
    const data = await api.apiAuthorsGet();
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

[**Array&lt;AuthorDTO&gt;**](AuthorDTO.md)

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


## apiAuthorsIdDelete

> apiAuthorsIdDelete(id)



### Example

```ts
import {
  Configuration,
  AuthorsApi,
} from '';
import type { ApiAuthorsIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthorsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiAuthorsIdDeleteRequest;

  try {
    const data = await api.apiAuthorsIdDelete(body);
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


## apiAuthorsIdGet

> AuthorDTO apiAuthorsIdGet(id)



### Example

```ts
import {
  Configuration,
  AuthorsApi,
} from '';
import type { ApiAuthorsIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthorsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiAuthorsIdGetRequest;

  try {
    const data = await api.apiAuthorsIdGet(body);
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

[**AuthorDTO**](AuthorDTO.md)

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


## apiAuthorsIdPut

> apiAuthorsIdPut(id, authorDTO)



### Example

```ts
import {
  Configuration,
  AuthorsApi,
} from '';
import type { ApiAuthorsIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthorsApi();

  const body = {
    // number
    id: 56,
    // AuthorDTO (optional)
    authorDTO: ...,
  } satisfies ApiAuthorsIdPutRequest;

  try {
    const data = await api.apiAuthorsIdPut(body);
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
| **authorDTO** | [AuthorDTO](AuthorDTO.md) |  | [Optional] |

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


## apiAuthorsPost

> apiAuthorsPost(authorDTO)



### Example

```ts
import {
  Configuration,
  AuthorsApi,
} from '';
import type { ApiAuthorsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthorsApi();

  const body = {
    // AuthorDTO (optional)
    authorDTO: ...,
  } satisfies ApiAuthorsPostRequest;

  try {
    const data = await api.apiAuthorsPost(body);
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
| **authorDTO** | [AuthorDTO](AuthorDTO.md) |  | [Optional] |

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


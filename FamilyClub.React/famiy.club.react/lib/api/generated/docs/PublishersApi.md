# PublishersApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiPublishersGet**](PublishersApi.md#apipublishersget) | **GET** /api/Publishers |  |
| [**apiPublishersIdDelete**](PublishersApi.md#apipublishersiddelete) | **DELETE** /api/Publishers/{id} |  |
| [**apiPublishersIdGet**](PublishersApi.md#apipublishersidget) | **GET** /api/Publishers/{id} |  |
| [**apiPublishersIdPut**](PublishersApi.md#apipublishersidput) | **PUT** /api/Publishers/{id} |  |
| [**apiPublishersPost**](PublishersApi.md#apipublisherspost) | **POST** /api/Publishers |  |



## apiPublishersGet

> Array&lt;PublisherDto&gt; apiPublishersGet()



### Example

```ts
import {
  Configuration,
  PublishersApi,
} from '';
import type { ApiPublishersGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PublishersApi();

  try {
    const data = await api.apiPublishersGet();
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

[**Array&lt;PublisherDto&gt;**](PublisherDto.md)

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


## apiPublishersIdDelete

> apiPublishersIdDelete(id)



### Example

```ts
import {
  Configuration,
  PublishersApi,
} from '';
import type { ApiPublishersIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PublishersApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiPublishersIdDeleteRequest;

  try {
    const data = await api.apiPublishersIdDelete(body);
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


## apiPublishersIdGet

> PublisherDto apiPublishersIdGet(id)



### Example

```ts
import {
  Configuration,
  PublishersApi,
} from '';
import type { ApiPublishersIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PublishersApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiPublishersIdGetRequest;

  try {
    const data = await api.apiPublishersIdGet(body);
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

[**PublisherDto**](PublisherDto.md)

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


## apiPublishersIdPut

> apiPublishersIdPut(id, publisherDto)



### Example

```ts
import {
  Configuration,
  PublishersApi,
} from '';
import type { ApiPublishersIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PublishersApi();

  const body = {
    // number
    id: 56,
    // PublisherDto (optional)
    publisherDto: ...,
  } satisfies ApiPublishersIdPutRequest;

  try {
    const data = await api.apiPublishersIdPut(body);
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
| **publisherDto** | [PublisherDto](PublisherDto.md) |  | [Optional] |

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


## apiPublishersPost

> apiPublishersPost(publisherDto)



### Example

```ts
import {
  Configuration,
  PublishersApi,
} from '';
import type { ApiPublishersPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PublishersApi();

  const body = {
    // PublisherDto (optional)
    publisherDto: ...,
  } satisfies ApiPublishersPostRequest;

  try {
    const data = await api.apiPublishersPost(body);
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
| **publisherDto** | [PublisherDto](PublisherDto.md) |  | [Optional] |

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


# FormatsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiFormatsGet**](FormatsApi.md#apiformatsget) | **GET** /api/Formats |  |
| [**apiFormatsIdDelete**](FormatsApi.md#apiformatsiddelete) | **DELETE** /api/Formats/{id} |  |
| [**apiFormatsIdGet**](FormatsApi.md#apiformatsidget) | **GET** /api/Formats/{id} |  |
| [**apiFormatsIdPut**](FormatsApi.md#apiformatsidput) | **PUT** /api/Formats/{id} |  |
| [**apiFormatsPost**](FormatsApi.md#apiformatspost) | **POST** /api/Formats |  |



## apiFormatsGet

> Array&lt;FormatDto&gt; apiFormatsGet()



### Example

```ts
import {
  Configuration,
  FormatsApi,
} from '';
import type { ApiFormatsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FormatsApi();

  try {
    const data = await api.apiFormatsGet();
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

[**Array&lt;FormatDto&gt;**](FormatDto.md)

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


## apiFormatsIdDelete

> apiFormatsIdDelete(id)



### Example

```ts
import {
  Configuration,
  FormatsApi,
} from '';
import type { ApiFormatsIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FormatsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiFormatsIdDeleteRequest;

  try {
    const data = await api.apiFormatsIdDelete(body);
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


## apiFormatsIdGet

> FormatDto apiFormatsIdGet(id)



### Example

```ts
import {
  Configuration,
  FormatsApi,
} from '';
import type { ApiFormatsIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FormatsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiFormatsIdGetRequest;

  try {
    const data = await api.apiFormatsIdGet(body);
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

[**FormatDto**](FormatDto.md)

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


## apiFormatsIdPut

> apiFormatsIdPut(id, formatDto)



### Example

```ts
import {
  Configuration,
  FormatsApi,
} from '';
import type { ApiFormatsIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FormatsApi();

  const body = {
    // number
    id: 56,
    // FormatDto (optional)
    formatDto: ...,
  } satisfies ApiFormatsIdPutRequest;

  try {
    const data = await api.apiFormatsIdPut(body);
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
| **formatDto** | [FormatDto](FormatDto.md) |  | [Optional] |

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


## apiFormatsPost

> apiFormatsPost(formatDto)



### Example

```ts
import {
  Configuration,
  FormatsApi,
} from '';
import type { ApiFormatsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FormatsApi();

  const body = {
    // FormatDto (optional)
    formatDto: ...,
  } satisfies ApiFormatsPostRequest;

  try {
    const data = await api.apiFormatsPost(body);
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
| **formatDto** | [FormatDto](FormatDto.md) |  | [Optional] |

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


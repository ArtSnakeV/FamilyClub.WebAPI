# SeriesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiSeriesGet**](SeriesApi.md#apiseriesget) | **GET** /api/Series |  |
| [**apiSeriesIdDelete**](SeriesApi.md#apiseriesiddelete) | **DELETE** /api/Series/{id} |  |
| [**apiSeriesIdGet**](SeriesApi.md#apiseriesidget) | **GET** /api/Series/{id} |  |
| [**apiSeriesIdPut**](SeriesApi.md#apiseriesidput) | **PUT** /api/Series/{id} |  |
| [**apiSeriesPost**](SeriesApi.md#apiseriespost) | **POST** /api/Series |  |



## apiSeriesGet

> Array&lt;SeriesDto&gt; apiSeriesGet()



### Example

```ts
import {
  Configuration,
  SeriesApi,
} from '';
import type { ApiSeriesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SeriesApi();

  try {
    const data = await api.apiSeriesGet();
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

[**Array&lt;SeriesDto&gt;**](SeriesDto.md)

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


## apiSeriesIdDelete

> apiSeriesIdDelete(id)



### Example

```ts
import {
  Configuration,
  SeriesApi,
} from '';
import type { ApiSeriesIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SeriesApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiSeriesIdDeleteRequest;

  try {
    const data = await api.apiSeriesIdDelete(body);
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


## apiSeriesIdGet

> SeriesDto apiSeriesIdGet(id)



### Example

```ts
import {
  Configuration,
  SeriesApi,
} from '';
import type { ApiSeriesIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SeriesApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiSeriesIdGetRequest;

  try {
    const data = await api.apiSeriesIdGet(body);
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

[**SeriesDto**](SeriesDto.md)

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


## apiSeriesIdPut

> apiSeriesIdPut(id, seriesDto)



### Example

```ts
import {
  Configuration,
  SeriesApi,
} from '';
import type { ApiSeriesIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SeriesApi();

  const body = {
    // number
    id: 56,
    // SeriesDto (optional)
    seriesDto: ...,
  } satisfies ApiSeriesIdPutRequest;

  try {
    const data = await api.apiSeriesIdPut(body);
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
| **seriesDto** | [SeriesDto](SeriesDto.md) |  | [Optional] |

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


## apiSeriesPost

> apiSeriesPost(seriesDto)



### Example

```ts
import {
  Configuration,
  SeriesApi,
} from '';
import type { ApiSeriesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SeriesApi();

  const body = {
    // SeriesDto (optional)
    seriesDto: ...,
  } satisfies ApiSeriesPostRequest;

  try {
    const data = await api.apiSeriesPost(body);
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
| **seriesDto** | [SeriesDto](SeriesDto.md) |  | [Optional] |

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


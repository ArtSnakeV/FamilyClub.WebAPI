# LanguagesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiLanguagesGet**](LanguagesApi.md#apilanguagesget) | **GET** /api/Languages |  |
| [**apiLanguagesIdDelete**](LanguagesApi.md#apilanguagesiddelete) | **DELETE** /api/Languages/{id} |  |
| [**apiLanguagesIdGet**](LanguagesApi.md#apilanguagesidget) | **GET** /api/Languages/{id} |  |
| [**apiLanguagesIdPut**](LanguagesApi.md#apilanguagesidput) | **PUT** /api/Languages/{id} |  |
| [**apiLanguagesPost**](LanguagesApi.md#apilanguagespost) | **POST** /api/Languages |  |



## apiLanguagesGet

> Array&lt;LanguageDto&gt; apiLanguagesGet()



### Example

```ts
import {
  Configuration,
  LanguagesApi,
} from '';
import type { ApiLanguagesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LanguagesApi();

  try {
    const data = await api.apiLanguagesGet();
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

[**Array&lt;LanguageDto&gt;**](LanguageDto.md)

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


## apiLanguagesIdDelete

> apiLanguagesIdDelete(id)



### Example

```ts
import {
  Configuration,
  LanguagesApi,
} from '';
import type { ApiLanguagesIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LanguagesApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiLanguagesIdDeleteRequest;

  try {
    const data = await api.apiLanguagesIdDelete(body);
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


## apiLanguagesIdGet

> LanguageDto apiLanguagesIdGet(id)



### Example

```ts
import {
  Configuration,
  LanguagesApi,
} from '';
import type { ApiLanguagesIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LanguagesApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiLanguagesIdGetRequest;

  try {
    const data = await api.apiLanguagesIdGet(body);
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

[**LanguageDto**](LanguageDto.md)

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


## apiLanguagesIdPut

> apiLanguagesIdPut(id, languageDto)



### Example

```ts
import {
  Configuration,
  LanguagesApi,
} from '';
import type { ApiLanguagesIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LanguagesApi();

  const body = {
    // number
    id: 56,
    // LanguageDto (optional)
    languageDto: ...,
  } satisfies ApiLanguagesIdPutRequest;

  try {
    const data = await api.apiLanguagesIdPut(body);
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
| **languageDto** | [LanguageDto](LanguageDto.md) |  | [Optional] |

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


## apiLanguagesPost

> apiLanguagesPost(languageDto)



### Example

```ts
import {
  Configuration,
  LanguagesApi,
} from '';
import type { ApiLanguagesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LanguagesApi();

  const body = {
    // LanguageDto (optional)
    languageDto: ...,
  } satisfies ApiLanguagesPostRequest;

  try {
    const data = await api.apiLanguagesPost(body);
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
| **languageDto** | [LanguageDto](LanguageDto.md) |  | [Optional] |

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


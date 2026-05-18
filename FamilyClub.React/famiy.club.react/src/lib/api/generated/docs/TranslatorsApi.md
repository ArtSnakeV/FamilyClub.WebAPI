# TranslatorsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiTranslatorsGet**](TranslatorsApi.md#apitranslatorsget) | **GET** /api/Translators |  |
| [**apiTranslatorsIdDelete**](TranslatorsApi.md#apitranslatorsiddelete) | **DELETE** /api/Translators/{id} |  |
| [**apiTranslatorsIdGet**](TranslatorsApi.md#apitranslatorsidget) | **GET** /api/Translators/{id} |  |
| [**apiTranslatorsIdPut**](TranslatorsApi.md#apitranslatorsidput) | **PUT** /api/Translators/{id} |  |
| [**apiTranslatorsPost**](TranslatorsApi.md#apitranslatorspost) | **POST** /api/Translators |  |



## apiTranslatorsGet

> Array&lt;TranslatorDto&gt; apiTranslatorsGet()



### Example

```ts
import {
  Configuration,
  TranslatorsApi,
} from '';
import type { ApiTranslatorsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TranslatorsApi();

  try {
    const data = await api.apiTranslatorsGet();
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

[**Array&lt;TranslatorDto&gt;**](TranslatorDto.md)

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


## apiTranslatorsIdDelete

> apiTranslatorsIdDelete(id)



### Example

```ts
import {
  Configuration,
  TranslatorsApi,
} from '';
import type { ApiTranslatorsIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TranslatorsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiTranslatorsIdDeleteRequest;

  try {
    const data = await api.apiTranslatorsIdDelete(body);
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


## apiTranslatorsIdGet

> TranslatorDto apiTranslatorsIdGet(id)



### Example

```ts
import {
  Configuration,
  TranslatorsApi,
} from '';
import type { ApiTranslatorsIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TranslatorsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiTranslatorsIdGetRequest;

  try {
    const data = await api.apiTranslatorsIdGet(body);
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

[**TranslatorDto**](TranslatorDto.md)

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


## apiTranslatorsIdPut

> apiTranslatorsIdPut(id, translatorDto)



### Example

```ts
import {
  Configuration,
  TranslatorsApi,
} from '';
import type { ApiTranslatorsIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TranslatorsApi();

  const body = {
    // number
    id: 56,
    // TranslatorDto (optional)
    translatorDto: ...,
  } satisfies ApiTranslatorsIdPutRequest;

  try {
    const data = await api.apiTranslatorsIdPut(body);
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
| **translatorDto** | [TranslatorDto](TranslatorDto.md) |  | [Optional] |

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


## apiTranslatorsPost

> apiTranslatorsPost(translatorDto)



### Example

```ts
import {
  Configuration,
  TranslatorsApi,
} from '';
import type { ApiTranslatorsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TranslatorsApi();

  const body = {
    // TranslatorDto (optional)
    translatorDto: ...,
  } satisfies ApiTranslatorsPostRequest;

  try {
    const data = await api.apiTranslatorsPost(body);
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
| **translatorDto** | [TranslatorDto](TranslatorDto.md) |  | [Optional] |

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


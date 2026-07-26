# BlockReasonsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiBlockReasonsGet**](BlockReasonsApi.md#apiblockreasonsget) | **GET** /api/BlockReasons |  |
| [**apiBlockReasonsIdDelete**](BlockReasonsApi.md#apiblockreasonsiddelete) | **DELETE** /api/BlockReasons/{id} |  |
| [**apiBlockReasonsIdGet**](BlockReasonsApi.md#apiblockreasonsidget) | **GET** /api/BlockReasons/{id} |  |
| [**apiBlockReasonsIdPut**](BlockReasonsApi.md#apiblockreasonsidput) | **PUT** /api/BlockReasons/{id} |  |
| [**apiBlockReasonsPost**](BlockReasonsApi.md#apiblockreasonspost) | **POST** /api/BlockReasons |  |



## apiBlockReasonsGet

> Array&lt;BlockReasonDto&gt; apiBlockReasonsGet()



### Example

```ts
import {
  Configuration,
  BlockReasonsApi,
} from '';
import type { ApiBlockReasonsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockReasonsApi();

  try {
    const data = await api.apiBlockReasonsGet();
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

[**Array&lt;BlockReasonDto&gt;**](BlockReasonDto.md)

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


## apiBlockReasonsIdDelete

> apiBlockReasonsIdDelete(id)



### Example

```ts
import {
  Configuration,
  BlockReasonsApi,
} from '';
import type { ApiBlockReasonsIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockReasonsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiBlockReasonsIdDeleteRequest;

  try {
    const data = await api.apiBlockReasonsIdDelete(body);
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


## apiBlockReasonsIdGet

> BlockReasonDto apiBlockReasonsIdGet(id)



### Example

```ts
import {
  Configuration,
  BlockReasonsApi,
} from '';
import type { ApiBlockReasonsIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockReasonsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiBlockReasonsIdGetRequest;

  try {
    const data = await api.apiBlockReasonsIdGet(body);
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

[**BlockReasonDto**](BlockReasonDto.md)

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


## apiBlockReasonsIdPut

> apiBlockReasonsIdPut(id, blockReasonDto)



### Example

```ts
import {
  Configuration,
  BlockReasonsApi,
} from '';
import type { ApiBlockReasonsIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockReasonsApi();

  const body = {
    // number
    id: 56,
    // BlockReasonDto (optional)
    blockReasonDto: ...,
  } satisfies ApiBlockReasonsIdPutRequest;

  try {
    const data = await api.apiBlockReasonsIdPut(body);
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
| **blockReasonDto** | [BlockReasonDto](BlockReasonDto.md) |  | [Optional] |

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


## apiBlockReasonsPost

> apiBlockReasonsPost(blockReasonDto)



### Example

```ts
import {
  Configuration,
  BlockReasonsApi,
} from '';
import type { ApiBlockReasonsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockReasonsApi();

  const body = {
    // BlockReasonDto (optional)
    blockReasonDto: ...,
  } satisfies ApiBlockReasonsPostRequest;

  try {
    const data = await api.apiBlockReasonsPost(body);
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
| **blockReasonDto** | [BlockReasonDto](BlockReasonDto.md) |  | [Optional] |

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


# AgeRestrictionsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiAgeRestrictionsGet**](AgeRestrictionsApi.md#apiagerestrictionsget) | **GET** /api/AgeRestrictions |  |
| [**apiAgeRestrictionsIdDelete**](AgeRestrictionsApi.md#apiagerestrictionsiddelete) | **DELETE** /api/AgeRestrictions/{id} |  |
| [**apiAgeRestrictionsIdGet**](AgeRestrictionsApi.md#apiagerestrictionsidget) | **GET** /api/AgeRestrictions/{id} |  |
| [**apiAgeRestrictionsIdPut**](AgeRestrictionsApi.md#apiagerestrictionsidput) | **PUT** /api/AgeRestrictions/{id} |  |
| [**apiAgeRestrictionsPost**](AgeRestrictionsApi.md#apiagerestrictionspost) | **POST** /api/AgeRestrictions |  |



## apiAgeRestrictionsGet

> Array&lt;AgeRestrictionDto&gt; apiAgeRestrictionsGet()



### Example

```ts
import {
  Configuration,
  AgeRestrictionsApi,
} from '';
import type { ApiAgeRestrictionsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AgeRestrictionsApi();

  try {
    const data = await api.apiAgeRestrictionsGet();
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

[**Array&lt;AgeRestrictionDto&gt;**](AgeRestrictionDto.md)

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


## apiAgeRestrictionsIdDelete

> apiAgeRestrictionsIdDelete(id)



### Example

```ts
import {
  Configuration,
  AgeRestrictionsApi,
} from '';
import type { ApiAgeRestrictionsIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AgeRestrictionsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiAgeRestrictionsIdDeleteRequest;

  try {
    const data = await api.apiAgeRestrictionsIdDelete(body);
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


## apiAgeRestrictionsIdGet

> AgeRestrictionDto apiAgeRestrictionsIdGet(id)



### Example

```ts
import {
  Configuration,
  AgeRestrictionsApi,
} from '';
import type { ApiAgeRestrictionsIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AgeRestrictionsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiAgeRestrictionsIdGetRequest;

  try {
    const data = await api.apiAgeRestrictionsIdGet(body);
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

[**AgeRestrictionDto**](AgeRestrictionDto.md)

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


## apiAgeRestrictionsIdPut

> apiAgeRestrictionsIdPut(id, ageRestrictionDto)



### Example

```ts
import {
  Configuration,
  AgeRestrictionsApi,
} from '';
import type { ApiAgeRestrictionsIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AgeRestrictionsApi();

  const body = {
    // number
    id: 56,
    // AgeRestrictionDto (optional)
    ageRestrictionDto: ...,
  } satisfies ApiAgeRestrictionsIdPutRequest;

  try {
    const data = await api.apiAgeRestrictionsIdPut(body);
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
| **ageRestrictionDto** | [AgeRestrictionDto](AgeRestrictionDto.md) |  | [Optional] |

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


## apiAgeRestrictionsPost

> apiAgeRestrictionsPost(ageRestrictionDto)



### Example

```ts
import {
  Configuration,
  AgeRestrictionsApi,
} from '';
import type { ApiAgeRestrictionsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AgeRestrictionsApi();

  const body = {
    // AgeRestrictionDto (optional)
    ageRestrictionDto: ...,
  } satisfies ApiAgeRestrictionsPostRequest;

  try {
    const data = await api.apiAgeRestrictionsPost(body);
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
| **ageRestrictionDto** | [AgeRestrictionDto](AgeRestrictionDto.md) |  | [Optional] |

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


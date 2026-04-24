# ClubMemberApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiClubMemberByEmailEmailGet**](ClubMemberApi.md#apiclubmemberbyemailemailget) | **GET** /api/ClubMember/by-email/{email} |  |
| [**apiClubMemberGet**](ClubMemberApi.md#apiclubmemberget) | **GET** /api/ClubMember |  |
| [**apiClubMemberIdDelete**](ClubMemberApi.md#apiclubmemberiddelete) | **DELETE** /api/ClubMember/{id} |  |
| [**apiClubMemberIdGet**](ClubMemberApi.md#apiclubmemberidget) | **GET** /api/ClubMember/{id} |  |
| [**apiClubMemberIdPut**](ClubMemberApi.md#apiclubmemberidput) | **PUT** /api/ClubMember/{id} |  |
| [**apiClubMemberPost**](ClubMemberApi.md#apiclubmemberpost) | **POST** /api/ClubMember |  |



## apiClubMemberByEmailEmailGet

> ClubMemberReadDto apiClubMemberByEmailEmailGet(email)



### Example

```ts
import {
  Configuration,
  ClubMemberApi,
} from '';
import type { ApiClubMemberByEmailEmailGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ClubMemberApi();

  const body = {
    // string
    email: email_example,
  } satisfies ApiClubMemberByEmailEmailGetRequest;

  try {
    const data = await api.apiClubMemberByEmailEmailGet(body);
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
| **email** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ClubMemberReadDto**](ClubMemberReadDto.md)

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


## apiClubMemberGet

> Array&lt;ClubMemberReadDto&gt; apiClubMemberGet()



### Example

```ts
import {
  Configuration,
  ClubMemberApi,
} from '';
import type { ApiClubMemberGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ClubMemberApi();

  try {
    const data = await api.apiClubMemberGet();
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

[**Array&lt;ClubMemberReadDto&gt;**](ClubMemberReadDto.md)

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


## apiClubMemberIdDelete

> apiClubMemberIdDelete(id)



### Example

```ts
import {
  Configuration,
  ClubMemberApi,
} from '';
import type { ApiClubMemberIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ClubMemberApi();

  const body = {
    // string
    id: id_example,
  } satisfies ApiClubMemberIdDeleteRequest;

  try {
    const data = await api.apiClubMemberIdDelete(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

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


## apiClubMemberIdGet

> ClubMemberReadDto apiClubMemberIdGet(id)



### Example

```ts
import {
  Configuration,
  ClubMemberApi,
} from '';
import type { ApiClubMemberIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ClubMemberApi();

  const body = {
    // string
    id: id_example,
  } satisfies ApiClubMemberIdGetRequest;

  try {
    const data = await api.apiClubMemberIdGet(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ClubMemberReadDto**](ClubMemberReadDto.md)

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


## apiClubMemberIdPut

> apiClubMemberIdPut(id, updateClubMemberDto)



### Example

```ts
import {
  Configuration,
  ClubMemberApi,
} from '';
import type { ApiClubMemberIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ClubMemberApi();

  const body = {
    // string
    id: id_example,
    // UpdateClubMemberDto (optional)
    updateClubMemberDto: ...,
  } satisfies ApiClubMemberIdPutRequest;

  try {
    const data = await api.apiClubMemberIdPut(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |
| **updateClubMemberDto** | [UpdateClubMemberDto](UpdateClubMemberDto.md) |  | [Optional] |

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


## apiClubMemberPost

> apiClubMemberPost(registerClubMemberDto)



### Example

```ts
import {
  Configuration,
  ClubMemberApi,
} from '';
import type { ApiClubMemberPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ClubMemberApi();

  const body = {
    // RegisterClubMemberDto (optional)
    registerClubMemberDto: ...,
  } satisfies ApiClubMemberPostRequest;

  try {
    const data = await api.apiClubMemberPost(body);
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
| **registerClubMemberDto** | [RegisterClubMemberDto](RegisterClubMemberDto.md) |  | [Optional] |

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


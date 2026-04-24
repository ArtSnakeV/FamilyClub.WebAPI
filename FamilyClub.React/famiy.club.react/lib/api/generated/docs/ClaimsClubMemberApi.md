# ClaimsClubMemberApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiClaimsClubMemberMemberIdAddPost**](ClaimsClubMemberApi.md#apiclaimsclubmembermemberidaddpost) | **POST** /api/ClaimsClubMember/{memberId}/add |  |
| [**apiClaimsClubMemberMemberIdGet**](ClaimsClubMemberApi.md#apiclaimsclubmembermemberidget) | **GET** /api/ClaimsClubMember/{memberId} |  |
| [**apiClaimsClubMemberMemberIdRemoveDelete**](ClaimsClubMemberApi.md#apiclaimsclubmembermemberidremovedelete) | **DELETE** /api/ClaimsClubMember/{memberId}/remove |  |
| [**apiClaimsClubMemberMemberIdUpdatePut**](ClaimsClubMemberApi.md#apiclaimsclubmembermemberidupdateput) | **PUT** /api/ClaimsClubMember/{memberId}/update |  |



## apiClaimsClubMemberMemberIdAddPost

> apiClaimsClubMemberMemberIdAddPost(memberId, claimsClubMemberDto)



### Example

```ts
import {
  Configuration,
  ClaimsClubMemberApi,
} from '';
import type { ApiClaimsClubMemberMemberIdAddPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ClaimsClubMemberApi();

  const body = {
    // string
    memberId: memberId_example,
    // ClaimsClubMemberDto (optional)
    claimsClubMemberDto: ...,
  } satisfies ApiClaimsClubMemberMemberIdAddPostRequest;

  try {
    const data = await api.apiClaimsClubMemberMemberIdAddPost(body);
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
| **memberId** | `string` |  | [Defaults to `undefined`] |
| **claimsClubMemberDto** | [ClaimsClubMemberDto](ClaimsClubMemberDto.md) |  | [Optional] |

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


## apiClaimsClubMemberMemberIdGet

> Array&lt;ClaimsClubMemberDto&gt; apiClaimsClubMemberMemberIdGet(memberId)



### Example

```ts
import {
  Configuration,
  ClaimsClubMemberApi,
} from '';
import type { ApiClaimsClubMemberMemberIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ClaimsClubMemberApi();

  const body = {
    // string
    memberId: memberId_example,
  } satisfies ApiClaimsClubMemberMemberIdGetRequest;

  try {
    const data = await api.apiClaimsClubMemberMemberIdGet(body);
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
| **memberId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;ClaimsClubMemberDto&gt;**](ClaimsClubMemberDto.md)

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


## apiClaimsClubMemberMemberIdRemoveDelete

> apiClaimsClubMemberMemberIdRemoveDelete(memberId, claimsClubMemberDto)



### Example

```ts
import {
  Configuration,
  ClaimsClubMemberApi,
} from '';
import type { ApiClaimsClubMemberMemberIdRemoveDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ClaimsClubMemberApi();

  const body = {
    // string
    memberId: memberId_example,
    // ClaimsClubMemberDto (optional)
    claimsClubMemberDto: ...,
  } satisfies ApiClaimsClubMemberMemberIdRemoveDeleteRequest;

  try {
    const data = await api.apiClaimsClubMemberMemberIdRemoveDelete(body);
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
| **memberId** | `string` |  | [Defaults to `undefined`] |
| **claimsClubMemberDto** | [ClaimsClubMemberDto](ClaimsClubMemberDto.md) |  | [Optional] |

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


## apiClaimsClubMemberMemberIdUpdatePut

> apiClaimsClubMemberMemberIdUpdatePut(memberId, updateClaimClubMemberDto)



### Example

```ts
import {
  Configuration,
  ClaimsClubMemberApi,
} from '';
import type { ApiClaimsClubMemberMemberIdUpdatePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ClaimsClubMemberApi();

  const body = {
    // string
    memberId: memberId_example,
    // UpdateClaimClubMemberDto (optional)
    updateClaimClubMemberDto: ...,
  } satisfies ApiClaimsClubMemberMemberIdUpdatePutRequest;

  try {
    const data = await api.apiClaimsClubMemberMemberIdUpdatePut(body);
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
| **memberId** | `string` |  | [Defaults to `undefined`] |
| **updateClaimClubMemberDto** | [UpdateClaimClubMemberDto](UpdateClaimClubMemberDto.md) |  | [Optional] |

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


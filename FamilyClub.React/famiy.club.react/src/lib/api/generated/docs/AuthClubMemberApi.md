# AuthClubMemberApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiAuthClubMemberLoginPost**](AuthClubMemberApi.md#apiauthclubmemberloginpost) | **POST** /api/AuthClubMember/login |  |
| [**apiAuthClubMemberLogoutPost**](AuthClubMemberApi.md#apiauthclubmemberlogoutpost) | **POST** /api/AuthClubMember/logout |  |
| [**apiAuthClubMemberRegisterPost**](AuthClubMemberApi.md#apiauthclubmemberregisterpost) | **POST** /api/AuthClubMember/register |  |



## apiAuthClubMemberLoginPost

> AuthResponseClubMemberDTO apiAuthClubMemberLoginPost(loginClubMemberDto)



### Example

```ts
import {
  Configuration,
  AuthClubMemberApi,
} from '';
import type { ApiAuthClubMemberLoginPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthClubMemberApi();

  const body = {
    // LoginClubMemberDto (optional)
    loginClubMemberDto: ...,
  } satisfies ApiAuthClubMemberLoginPostRequest;

  try {
    const data = await api.apiAuthClubMemberLoginPost(body);
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
| **loginClubMemberDto** | [LoginClubMemberDto](LoginClubMemberDto.md) |  | [Optional] |

### Return type

[**AuthResponseClubMemberDTO**](AuthResponseClubMemberDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiAuthClubMemberLogoutPost

> apiAuthClubMemberLogoutPost()



### Example

```ts
import {
  Configuration,
  AuthClubMemberApi,
} from '';
import type { ApiAuthClubMemberLogoutPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthClubMemberApi();

  try {
    const data = await api.apiAuthClubMemberLogoutPost();
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


## apiAuthClubMemberRegisterPost

> ClubMemberReadDto apiAuthClubMemberRegisterPost(registerClubMemberDto)



### Example

```ts
import {
  Configuration,
  AuthClubMemberApi,
} from '';
import type { ApiAuthClubMemberRegisterPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthClubMemberApi();

  const body = {
    // RegisterClubMemberDto (optional)
    registerClubMemberDto: ...,
  } satisfies ApiAuthClubMemberRegisterPostRequest;

  try {
    const data = await api.apiAuthClubMemberRegisterPost(body);
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

[**ClubMemberReadDto**](ClubMemberReadDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


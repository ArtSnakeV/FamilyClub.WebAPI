# RolesClubMemberApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiRolesClubMemberGet**](RolesClubMemberApi.md#apirolesclubmemberget) | **GET** /api/RolesClubMember |  |
| [**apiRolesClubMemberIdDelete**](RolesClubMemberApi.md#apirolesclubmemberiddelete) | **DELETE** /api/RolesClubMember/{id} |  |
| [**apiRolesClubMemberIdGet**](RolesClubMemberApi.md#apirolesclubmemberidget) | **GET** /api/RolesClubMember/{id} |  |
| [**apiRolesClubMemberIdPut**](RolesClubMemberApi.md#apirolesclubmemberidput) | **PUT** /api/RolesClubMember/{id} |  |
| [**apiRolesClubMemberPost**](RolesClubMemberApi.md#apirolesclubmemberpost) | **POST** /api/RolesClubMember |  |
| [**apiRolesClubMemberRoleNameUsersGet**](RolesClubMemberApi.md#apirolesclubmemberrolenameusersget) | **GET** /api/RolesClubMember/{roleName}/users |  |



## apiRolesClubMemberGet

> apiRolesClubMemberGet()



### Example

```ts
import {
  Configuration,
  RolesClubMemberApi,
} from '';
import type { ApiRolesClubMemberGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RolesClubMemberApi();

  try {
    const data = await api.apiRolesClubMemberGet();
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


## apiRolesClubMemberIdDelete

> apiRolesClubMemberIdDelete(id)



### Example

```ts
import {
  Configuration,
  RolesClubMemberApi,
} from '';
import type { ApiRolesClubMemberIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RolesClubMemberApi();

  const body = {
    // string
    id: id_example,
  } satisfies ApiRolesClubMemberIdDeleteRequest;

  try {
    const data = await api.apiRolesClubMemberIdDelete(body);
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


## apiRolesClubMemberIdGet

> apiRolesClubMemberIdGet(id)



### Example

```ts
import {
  Configuration,
  RolesClubMemberApi,
} from '';
import type { ApiRolesClubMemberIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RolesClubMemberApi();

  const body = {
    // string
    id: id_example,
  } satisfies ApiRolesClubMemberIdGetRequest;

  try {
    const data = await api.apiRolesClubMemberIdGet(body);
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


## apiRolesClubMemberIdPut

> apiRolesClubMemberIdPut(id, body)



### Example

```ts
import {
  Configuration,
  RolesClubMemberApi,
} from '';
import type { ApiRolesClubMemberIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RolesClubMemberApi();

  const body = {
    // string
    id: id_example,
    // string (optional)
    body: body_example,
  } satisfies ApiRolesClubMemberIdPutRequest;

  try {
    const data = await api.apiRolesClubMemberIdPut(body);
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
| **body** | `string` |  | [Optional] |

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


## apiRolesClubMemberPost

> apiRolesClubMemberPost(body)



### Example

```ts
import {
  Configuration,
  RolesClubMemberApi,
} from '';
import type { ApiRolesClubMemberPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RolesClubMemberApi();

  const body = {
    // string (optional)
    body: body_example,
  } satisfies ApiRolesClubMemberPostRequest;

  try {
    const data = await api.apiRolesClubMemberPost(body);
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
| **body** | `string` |  | [Optional] |

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


## apiRolesClubMemberRoleNameUsersGet

> apiRolesClubMemberRoleNameUsersGet(roleName)



### Example

```ts
import {
  Configuration,
  RolesClubMemberApi,
} from '';
import type { ApiRolesClubMemberRoleNameUsersGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RolesClubMemberApi();

  const body = {
    // string
    roleName: roleName_example,
  } satisfies ApiRolesClubMemberRoleNameUsersGetRequest;

  try {
    const data = await api.apiRolesClubMemberRoleNameUsersGet(body);
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
| **roleName** | `string` |  | [Defaults to `undefined`] |

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


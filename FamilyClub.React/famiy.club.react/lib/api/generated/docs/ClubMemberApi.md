# ClubMemberApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiClubMemberByEmailEmailGet**](ClubMemberApi.md#apiclubmemberbyemailemailget) | **GET** /api/ClubMember/by-email/{email} |  |
| [**apiClubMemberFormPost**](ClubMemberApi.md#apiclubmemberformpost) | **POST** /api/ClubMember/form |  |
| [**apiClubMemberGet**](ClubMemberApi.md#apiclubmemberget) | **GET** /api/ClubMember |  |
| [**apiClubMemberIdDelete**](ClubMemberApi.md#apiclubmemberiddelete) | **DELETE** /api/ClubMember/{id} |  |
| [**apiClubMemberIdFormPut**](ClubMemberApi.md#apiclubmemberidformput) | **PUT** /api/ClubMember/{id}/form |  |
| [**apiClubMemberIdGet**](ClubMemberApi.md#apiclubmemberidget) | **GET** /api/ClubMember/{id} |  |
| [**apiClubMemberIdJsonPut**](ClubMemberApi.md#apiclubmemberidjsonput) | **PUT** /api/ClubMember/{id}/json |  |



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


## apiClubMemberFormPost

> apiClubMemberFormPost(email, password, phoneNumber, selectedRoles, name, surname, dateOfBirth, avatar)



### Example

```ts
import {
  Configuration,
  ClubMemberApi,
} from '';
import type { ApiClubMemberFormPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ClubMemberApi();

  const body = {
    // string
    email: email_example,
    // string
    password: password_example,
    // string
    phoneNumber: phoneNumber_example,
    // Array<string> (optional)
    selectedRoles: ...,
    // string (optional)
    name: name_example,
    // string (optional)
    surname: surname_example,
    // Date (optional)
    dateOfBirth: 2013-10-20,
    // Blob (optional)
    avatar: BINARY_DATA_HERE,
  } satisfies ApiClubMemberFormPostRequest;

  try {
    const data = await api.apiClubMemberFormPost(body);
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
| **password** | `string` |  | [Defaults to `undefined`] |
| **phoneNumber** | `string` |  | [Defaults to `undefined`] |
| **selectedRoles** | `Array<string>` |  | [Optional] |
| **name** | `string` |  | [Optional] [Defaults to `undefined`] |
| **surname** | `string` |  | [Optional] [Defaults to `undefined`] |
| **dateOfBirth** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **avatar** | `Blob` |  | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: Not defined


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


## apiClubMemberIdFormPut

> apiClubMemberIdFormPut(id, phoneNumber, name, surname, dateOfBirth, avatar)



### Example

```ts
import {
  Configuration,
  ClubMemberApi,
} from '';
import type { ApiClubMemberIdFormPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ClubMemberApi();

  const body = {
    // string
    id: id_example,
    // string (optional)
    phoneNumber: phoneNumber_example,
    // string (optional)
    name: name_example,
    // string (optional)
    surname: surname_example,
    // Date (optional)
    dateOfBirth: 2013-10-20,
    // Blob (optional)
    avatar: BINARY_DATA_HERE,
  } satisfies ApiClubMemberIdFormPutRequest;

  try {
    const data = await api.apiClubMemberIdFormPut(body);
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
| **phoneNumber** | `string` |  | [Optional] [Defaults to `undefined`] |
| **name** | `string` |  | [Optional] [Defaults to `undefined`] |
| **surname** | `string` |  | [Optional] [Defaults to `undefined`] |
| **dateOfBirth** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **avatar** | `Blob` |  | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
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


## apiClubMemberIdJsonPut

> apiClubMemberIdJsonPut(id, updateClubMemberDto)



### Example

```ts
import {
  Configuration,
  ClubMemberApi,
} from '';
import type { ApiClubMemberIdJsonPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ClubMemberApi();

  const body = {
    // string
    id: id_example,
    // UpdateClubMemberDto (optional)
    updateClubMemberDto: ...,
  } satisfies ApiClubMemberIdJsonPutRequest;

  try {
    const data = await api.apiClubMemberIdJsonPut(body);
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

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


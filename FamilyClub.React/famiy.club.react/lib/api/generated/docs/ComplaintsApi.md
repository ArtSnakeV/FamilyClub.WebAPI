# ComplaintsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiComplaintsByMemberClubMemberIdGet**](ComplaintsApi.md#apicomplaintsbymemberclubmemberidget) | **GET** /api/Complaints/by-member/{clubMemberId} |  |
| [**apiComplaintsComplaintIdImagesGet**](ComplaintsApi.md#apicomplaintscomplaintidimagesget) | **GET** /api/Complaints/{complaintId}/images |  |
| [**apiComplaintsComplaintIdImagesImageIdDelete**](ComplaintsApi.md#apicomplaintscomplaintidimagesimageiddelete) | **DELETE** /api/Complaints/{complaintId}/images/{imageId} |  |
| [**apiComplaintsComplaintIdImagesPost**](ComplaintsApi.md#apicomplaintscomplaintidimagespost) | **POST** /api/Complaints/{complaintId}/images |  |
| [**apiComplaintsGet**](ComplaintsApi.md#apicomplaintsget) | **GET** /api/Complaints |  |
| [**apiComplaintsIdDelete**](ComplaintsApi.md#apicomplaintsiddelete) | **DELETE** /api/Complaints/{id} |  |
| [**apiComplaintsIdGet**](ComplaintsApi.md#apicomplaintsidget) | **GET** /api/Complaints/{id} |  |
| [**apiComplaintsIdPut**](ComplaintsApi.md#apicomplaintsidput) | **PUT** /api/Complaints/{id} |  |
| [**apiComplaintsPost**](ComplaintsApi.md#apicomplaintspost) | **POST** /api/Complaints |  |



## apiComplaintsByMemberClubMemberIdGet

> Array&lt;ComplaintsReadDto&gt; apiComplaintsByMemberClubMemberIdGet(clubMemberId)



### Example

```ts
import {
  Configuration,
  ComplaintsApi,
} from '';
import type { ApiComplaintsByMemberClubMemberIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ComplaintsApi();

  const body = {
    // string
    clubMemberId: clubMemberId_example,
  } satisfies ApiComplaintsByMemberClubMemberIdGetRequest;

  try {
    const data = await api.apiComplaintsByMemberClubMemberIdGet(body);
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
| **clubMemberId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;ComplaintsReadDto&gt;**](ComplaintsReadDto.md)

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


## apiComplaintsComplaintIdImagesGet

> Array&lt;ComplaintImageDto&gt; apiComplaintsComplaintIdImagesGet(complaintId)



### Example

```ts
import {
  Configuration,
  ComplaintsApi,
} from '';
import type { ApiComplaintsComplaintIdImagesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ComplaintsApi();

  const body = {
    // number
    complaintId: 56,
  } satisfies ApiComplaintsComplaintIdImagesGetRequest;

  try {
    const data = await api.apiComplaintsComplaintIdImagesGet(body);
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
| **complaintId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;ComplaintImageDto&gt;**](ComplaintImageDto.md)

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


## apiComplaintsComplaintIdImagesImageIdDelete

> apiComplaintsComplaintIdImagesImageIdDelete(complaintId, imageId)



### Example

```ts
import {
  Configuration,
  ComplaintsApi,
} from '';
import type { ApiComplaintsComplaintIdImagesImageIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ComplaintsApi();

  const body = {
    // number
    complaintId: 56,
    // number
    imageId: 56,
  } satisfies ApiComplaintsComplaintIdImagesImageIdDeleteRequest;

  try {
    const data = await api.apiComplaintsComplaintIdImagesImageIdDelete(body);
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
| **complaintId** | `number` |  | [Defaults to `undefined`] |
| **imageId** | `number` |  | [Defaults to `undefined`] |

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


## apiComplaintsComplaintIdImagesPost

> apiComplaintsComplaintIdImagesPost(complaintId, complaintImageCreateDto)



### Example

```ts
import {
  Configuration,
  ComplaintsApi,
} from '';
import type { ApiComplaintsComplaintIdImagesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ComplaintsApi();

  const body = {
    // number
    complaintId: 56,
    // ComplaintImageCreateDto (optional)
    complaintImageCreateDto: ...,
  } satisfies ApiComplaintsComplaintIdImagesPostRequest;

  try {
    const data = await api.apiComplaintsComplaintIdImagesPost(body);
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
| **complaintId** | `number` |  | [Defaults to `undefined`] |
| **complaintImageCreateDto** | [ComplaintImageCreateDto](ComplaintImageCreateDto.md) |  | [Optional] |

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


## apiComplaintsGet

> Array&lt;ComplaintsReadDto&gt; apiComplaintsGet()



### Example

```ts
import {
  Configuration,
  ComplaintsApi,
} from '';
import type { ApiComplaintsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ComplaintsApi();

  try {
    const data = await api.apiComplaintsGet();
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

[**Array&lt;ComplaintsReadDto&gt;**](ComplaintsReadDto.md)

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


## apiComplaintsIdDelete

> apiComplaintsIdDelete(id)



### Example

```ts
import {
  Configuration,
  ComplaintsApi,
} from '';
import type { ApiComplaintsIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ComplaintsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiComplaintsIdDeleteRequest;

  try {
    const data = await api.apiComplaintsIdDelete(body);
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


## apiComplaintsIdGet

> ComplaintsReadDto apiComplaintsIdGet(id)



### Example

```ts
import {
  Configuration,
  ComplaintsApi,
} from '';
import type { ApiComplaintsIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ComplaintsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiComplaintsIdGetRequest;

  try {
    const data = await api.apiComplaintsIdGet(body);
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

[**ComplaintsReadDto**](ComplaintsReadDto.md)

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


## apiComplaintsIdPut

> apiComplaintsIdPut(id, complaintsReadDto)



### Example

```ts
import {
  Configuration,
  ComplaintsApi,
} from '';
import type { ApiComplaintsIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ComplaintsApi();

  const body = {
    // number
    id: 56,
    // ComplaintsReadDto (optional)
    complaintsReadDto: ...,
  } satisfies ApiComplaintsIdPutRequest;

  try {
    const data = await api.apiComplaintsIdPut(body);
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
| **complaintsReadDto** | [ComplaintsReadDto](ComplaintsReadDto.md) |  | [Optional] |

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


## apiComplaintsPost

> apiComplaintsPost(complaintsCreateDto)



### Example

```ts
import {
  Configuration,
  ComplaintsApi,
} from '';
import type { ApiComplaintsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ComplaintsApi();

  const body = {
    // ComplaintsCreateDto (optional)
    complaintsCreateDto: ...,
  } satisfies ApiComplaintsPostRequest;

  try {
    const data = await api.apiComplaintsPost(body);
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
| **complaintsCreateDto** | [ComplaintsCreateDto](ComplaintsCreateDto.md) |  | [Optional] |

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


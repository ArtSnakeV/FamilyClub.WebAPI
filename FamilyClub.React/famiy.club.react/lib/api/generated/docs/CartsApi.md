# CartsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiCartsClubMemberIdDelete**](CartsApi.md#apicartsclubmemberiddelete) | **DELETE** /api/Carts/{clubMemberId} |  |
| [**apiCartsClubMemberIdGet**](CartsApi.md#apicartsclubmemberidget) | **GET** /api/Carts/{clubMemberId} |  |
| [**apiCartsClubMemberIdItemsCartItemIdDelete**](CartsApi.md#apicartsclubmemberiditemscartitemiddelete) | **DELETE** /api/Carts/{clubMemberId}/items/{cartItemId} |  |
| [**apiCartsClubMemberIdItemsCartItemIdPut**](CartsApi.md#apicartsclubmemberiditemscartitemidput) | **PUT** /api/Carts/{clubMemberId}/items/{cartItemId} |  |
| [**apiCartsClubMemberIdItemsPost**](CartsApi.md#apicartsclubmemberiditemspost) | **POST** /api/Carts/{clubMemberId}/items |  |



## apiCartsClubMemberIdDelete

> apiCartsClubMemberIdDelete(clubMemberId)



### Example

```ts
import {
  Configuration,
  CartsApi,
} from '';
import type { ApiCartsClubMemberIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CartsApi();

  const body = {
    // string
    clubMemberId: clubMemberId_example,
  } satisfies ApiCartsClubMemberIdDeleteRequest;

  try {
    const data = await api.apiCartsClubMemberIdDelete(body);
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


## apiCartsClubMemberIdGet

> CartDTO apiCartsClubMemberIdGet(clubMemberId)



### Example

```ts
import {
  Configuration,
  CartsApi,
} from '';
import type { ApiCartsClubMemberIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CartsApi();

  const body = {
    // string
    clubMemberId: clubMemberId_example,
  } satisfies ApiCartsClubMemberIdGetRequest;

  try {
    const data = await api.apiCartsClubMemberIdGet(body);
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

[**CartDTO**](CartDTO.md)

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


## apiCartsClubMemberIdItemsCartItemIdDelete

> apiCartsClubMemberIdItemsCartItemIdDelete(clubMemberId, cartItemId)



### Example

```ts
import {
  Configuration,
  CartsApi,
} from '';
import type { ApiCartsClubMemberIdItemsCartItemIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CartsApi();

  const body = {
    // string
    clubMemberId: clubMemberId_example,
    // number
    cartItemId: 56,
  } satisfies ApiCartsClubMemberIdItemsCartItemIdDeleteRequest;

  try {
    const data = await api.apiCartsClubMemberIdItemsCartItemIdDelete(body);
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
| **cartItemId** | `number` |  | [Defaults to `undefined`] |

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


## apiCartsClubMemberIdItemsCartItemIdPut

> apiCartsClubMemberIdItemsCartItemIdPut(clubMemberId, cartItemId, body)



### Example

```ts
import {
  Configuration,
  CartsApi,
} from '';
import type { ApiCartsClubMemberIdItemsCartItemIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CartsApi();

  const body = {
    // string
    clubMemberId: clubMemberId_example,
    // number
    cartItemId: 56,
    // number (optional)
    body: 56,
  } satisfies ApiCartsClubMemberIdItemsCartItemIdPutRequest;

  try {
    const data = await api.apiCartsClubMemberIdItemsCartItemIdPut(body);
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
| **cartItemId** | `number` |  | [Defaults to `undefined`] |
| **body** | `number` |  | [Optional] |

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


## apiCartsClubMemberIdItemsPost

> apiCartsClubMemberIdItemsPost(clubMemberId, cartItemDTO)



### Example

```ts
import {
  Configuration,
  CartsApi,
} from '';
import type { ApiCartsClubMemberIdItemsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CartsApi();

  const body = {
    // string
    clubMemberId: clubMemberId_example,
    // CartItemDTO (optional)
    cartItemDTO: ...,
  } satisfies ApiCartsClubMemberIdItemsPostRequest;

  try {
    const data = await api.apiCartsClubMemberIdItemsPost(body);
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
| **cartItemDTO** | [CartItemDTO](CartItemDTO.md) |  | [Optional] |

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


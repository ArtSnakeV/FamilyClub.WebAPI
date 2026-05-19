# NotificationsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiNotificationsCountGet**](NotificationsApi.md#apinotificationscountget) | **GET** /api/Notifications/count |  |
| [**apiNotificationsGet**](NotificationsApi.md#apinotificationsget) | **GET** /api/Notifications |  |
| [**apiNotificationsIdDelete**](NotificationsApi.md#apinotificationsiddelete) | **DELETE** /api/Notifications/{id} |  |
| [**apiNotificationsIdGet**](NotificationsApi.md#apinotificationsidget) | **GET** /api/Notifications/{id} |  |
| [**apiNotificationsIdPut**](NotificationsApi.md#apinotificationsidput) | **PUT** /api/Notifications/{id} |  |
| [**apiNotificationsPost**](NotificationsApi.md#apinotificationspost) | **POST** /api/Notifications |  |
| [**apiNotificationsUnreadCountClubMemberIdGet**](NotificationsApi.md#apinotificationsunreadcountclubmemberidget) | **GET** /api/Notifications/unread-count/{clubMemberId} |  |



## apiNotificationsCountGet

> number apiNotificationsCountGet()



### Example

```ts
import {
  Configuration,
  NotificationsApi,
} from '';
import type { ApiNotificationsCountGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NotificationsApi();

  try {
    const data = await api.apiNotificationsCountGet();
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

**number**

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


## apiNotificationsGet

> Array&lt;NotificationDTO&gt; apiNotificationsGet()



### Example

```ts
import {
  Configuration,
  NotificationsApi,
} from '';
import type { ApiNotificationsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NotificationsApi();

  try {
    const data = await api.apiNotificationsGet();
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

[**Array&lt;NotificationDTO&gt;**](NotificationDTO.md)

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


## apiNotificationsIdDelete

> apiNotificationsIdDelete(id)



### Example

```ts
import {
  Configuration,
  NotificationsApi,
} from '';
import type { ApiNotificationsIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NotificationsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiNotificationsIdDeleteRequest;

  try {
    const data = await api.apiNotificationsIdDelete(body);
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


## apiNotificationsIdGet

> NotificationDTO apiNotificationsIdGet(id)



### Example

```ts
import {
  Configuration,
  NotificationsApi,
} from '';
import type { ApiNotificationsIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NotificationsApi();

  const body = {
    // number
    id: 56,
  } satisfies ApiNotificationsIdGetRequest;

  try {
    const data = await api.apiNotificationsIdGet(body);
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

[**NotificationDTO**](NotificationDTO.md)

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


## apiNotificationsIdPut

> apiNotificationsIdPut(id, notificationDTO)



### Example

```ts
import {
  Configuration,
  NotificationsApi,
} from '';
import type { ApiNotificationsIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NotificationsApi();

  const body = {
    // number
    id: 56,
    // NotificationDTO (optional)
    notificationDTO: ...,
  } satisfies ApiNotificationsIdPutRequest;

  try {
    const data = await api.apiNotificationsIdPut(body);
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
| **notificationDTO** | [NotificationDTO](NotificationDTO.md) |  | [Optional] |

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


## apiNotificationsPost

> apiNotificationsPost(createNotificationDTO)



### Example

```ts
import {
  Configuration,
  NotificationsApi,
} from '';
import type { ApiNotificationsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NotificationsApi();

  const body = {
    // CreateNotificationDTO (optional)
    createNotificationDTO: ...,
  } satisfies ApiNotificationsPostRequest;

  try {
    const data = await api.apiNotificationsPost(body);
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
| **createNotificationDTO** | [CreateNotificationDTO](CreateNotificationDTO.md) |  | [Optional] |

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


## apiNotificationsUnreadCountClubMemberIdGet

> number apiNotificationsUnreadCountClubMemberIdGet(clubMemberId)



### Example

```ts
import {
  Configuration,
  NotificationsApi,
} from '';
import type { ApiNotificationsUnreadCountClubMemberIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NotificationsApi();

  const body = {
    // string
    clubMemberId: clubMemberId_example,
  } satisfies ApiNotificationsUnreadCountClubMemberIdGetRequest;

  try {
    const data = await api.apiNotificationsUnreadCountClubMemberIdGet(body);
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

**number**

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


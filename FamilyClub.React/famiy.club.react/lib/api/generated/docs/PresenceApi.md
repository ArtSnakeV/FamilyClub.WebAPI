# PresenceApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiPresenceActiveCountGet**](PresenceApi.md#apipresenceactivecountget) | **GET** /api/Presence/active-count |  |
| [**apiPresenceHeartbeatPost**](PresenceApi.md#apipresenceheartbeatpost) | **POST** /api/Presence/heartbeat |  |



## apiPresenceActiveCountGet

> apiPresenceActiveCountGet()



### Example

```ts
import {
  Configuration,
  PresenceApi,
} from '';
import type { ApiPresenceActiveCountGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PresenceApi();

  try {
    const data = await api.apiPresenceActiveCountGet();
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


## apiPresenceHeartbeatPost

> apiPresenceHeartbeatPost(heartbeatRequest)



### Example

```ts
import {
  Configuration,
  PresenceApi,
} from '';
import type { ApiPresenceHeartbeatPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PresenceApi();

  const body = {
    // HeartbeatRequest (optional)
    heartbeatRequest: ...,
  } satisfies ApiPresenceHeartbeatPostRequest;

  try {
    const data = await api.apiPresenceHeartbeatPost(body);
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
| **heartbeatRequest** | [HeartbeatRequest](HeartbeatRequest.md) |  | [Optional] |

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


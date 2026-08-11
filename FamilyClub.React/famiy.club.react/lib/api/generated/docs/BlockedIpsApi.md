# BlockedIpsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiBlockedIpsDelete**](BlockedIpsApi.md#apiblockedipsdelete) | **DELETE** /api/BlockedIps |  |
| [**apiBlockedIpsGet**](BlockedIpsApi.md#apiblockedipsget) | **GET** /api/BlockedIps |  |
| [**apiBlockedIpsIpAddressDelete**](BlockedIpsApi.md#apiblockedipsipaddressdelete) | **DELETE** /api/BlockedIps/{ipAddress} |  |
| [**apiBlockedIpsPost**](BlockedIpsApi.md#apiblockedipspost) | **POST** /api/BlockedIps |  |



## apiBlockedIpsDelete

> apiBlockedIpsDelete(ipAddress)



### Example

```ts
import {
  Configuration,
  BlockedIpsApi,
} from '';
import type { ApiBlockedIpsDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockedIpsApi();

  const body = {
    // string (optional)
    ipAddress: ipAddress_example,
  } satisfies ApiBlockedIpsDeleteRequest;

  try {
    const data = await api.apiBlockedIpsDelete(body);
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
| **ipAddress** | `string` |  | [Optional] [Defaults to `undefined`] |

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


## apiBlockedIpsGet

> Array&lt;BlockedIp&gt; apiBlockedIpsGet()



### Example

```ts
import {
  Configuration,
  BlockedIpsApi,
} from '';
import type { ApiBlockedIpsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockedIpsApi();

  try {
    const data = await api.apiBlockedIpsGet();
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

[**Array&lt;BlockedIp&gt;**](BlockedIp.md)

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


## apiBlockedIpsIpAddressDelete

> apiBlockedIpsIpAddressDelete(ipAddress)



### Example

```ts
import {
  Configuration,
  BlockedIpsApi,
} from '';
import type { ApiBlockedIpsIpAddressDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockedIpsApi();

  const body = {
    // string
    ipAddress: ipAddress_example,
  } satisfies ApiBlockedIpsIpAddressDeleteRequest;

  try {
    const data = await api.apiBlockedIpsIpAddressDelete(body);
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
| **ipAddress** | `string` |  | [Defaults to `undefined`] |

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


## apiBlockedIpsPost

> apiBlockedIpsPost(addBlockedIpRequest)



### Example

```ts
import {
  Configuration,
  BlockedIpsApi,
} from '';
import type { ApiBlockedIpsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockedIpsApi();

  const body = {
    // AddBlockedIpRequest (optional)
    addBlockedIpRequest: ...,
  } satisfies ApiBlockedIpsPostRequest;

  try {
    const data = await api.apiBlockedIpsPost(body);
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
| **addBlockedIpRequest** | [AddBlockedIpRequest](AddBlockedIpRequest.md) |  | [Optional] |

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


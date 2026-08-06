# PlatformSettingsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiPlatformSettingsGet**](PlatformSettingsApi.md#apiplatformsettingsget) | **GET** /api/PlatformSettings |  |
| [**apiPlatformSettingsPut**](PlatformSettingsApi.md#apiplatformsettingsput) | **PUT** /api/PlatformSettings |  |



## apiPlatformSettingsGet

> PlatformSettingsDto apiPlatformSettingsGet()



### Example

```ts
import {
  Configuration,
  PlatformSettingsApi,
} from '';
import type { ApiPlatformSettingsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PlatformSettingsApi();

  try {
    const data = await api.apiPlatformSettingsGet();
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

[**PlatformSettingsDto**](PlatformSettingsDto.md)

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


## apiPlatformSettingsPut

> PlatformSettingsDto apiPlatformSettingsPut(platformSettingsDto)



### Example

```ts
import {
  Configuration,
  PlatformSettingsApi,
} from '';
import type { ApiPlatformSettingsPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PlatformSettingsApi();

  const body = {
    // PlatformSettingsDto (optional)
    platformSettingsDto: ...,
  } satisfies ApiPlatformSettingsPutRequest;

  try {
    const data = await api.apiPlatformSettingsPut(body);
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
| **platformSettingsDto** | [PlatformSettingsDto](PlatformSettingsDto.md) |  | [Optional] |

### Return type

[**PlatformSettingsDto**](PlatformSettingsDto.md)

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


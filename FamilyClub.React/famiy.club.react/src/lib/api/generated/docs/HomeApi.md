# HomeApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiHomeGet**](HomeApi.md#apihomeget) | **GET** /api/Home |  |



## apiHomeGet

> apiHomeGet()



### Example

```ts
import {
  Configuration,
  HomeApi,
} from '';
import type { ApiHomeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new HomeApi();

  try {
    const data = await api.apiHomeGet();
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


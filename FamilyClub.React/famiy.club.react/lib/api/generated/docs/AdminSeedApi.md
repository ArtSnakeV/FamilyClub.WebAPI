# AdminSeedApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiAdminSeedCatalogPost**](AdminSeedApi.md#apiadminseedcatalogpost) | **POST** /api/AdminSeed/catalog |  |



## apiAdminSeedCatalogPost

> SeedCatalogResult apiAdminSeedCatalogPost()



### Example

```ts
import {
  Configuration,
  AdminSeedApi,
} from '';
import type { ApiAdminSeedCatalogPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminSeedApi();

  try {
    const data = await api.apiAdminSeedCatalogPost();
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

[**SeedCatalogResult**](SeedCatalogResult.md)

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


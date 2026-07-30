# ActionLogsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiActionLogsArchiveDownloadGet**](ActionLogsApi.md#apiactionlogsarchivedownloadget) | **GET** /api/ActionLogs/archive/download |  |
| [**apiActionLogsArchiveGet**](ActionLogsApi.md#apiactionlogsarchiveget) | **GET** /api/ActionLogs/archive |  |
| [**apiActionLogsArchivePost**](ActionLogsApi.md#apiactionlogsarchivepost) | **POST** /api/ActionLogs/archive |  |
| [**apiActionLogsGet**](ActionLogsApi.md#apiactionlogsget) | **GET** /api/ActionLogs |  |
| [**apiActionLogsStatsGet**](ActionLogsApi.md#apiactionlogsstatsget) | **GET** /api/ActionLogs/stats |  |



## apiActionLogsArchiveDownloadGet

> apiActionLogsArchiveDownloadGet()



### Example

```ts
import {
  Configuration,
  ActionLogsApi,
} from '';
import type { ApiActionLogsArchiveDownloadGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ActionLogsApi();

  try {
    const data = await api.apiActionLogsArchiveDownloadGet();
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


## apiActionLogsArchiveGet

> ActionLogArchiveInfoDto apiActionLogsArchiveGet()



### Example

```ts
import {
  Configuration,
  ActionLogsApi,
} from '';
import type { ApiActionLogsArchiveGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ActionLogsApi();

  try {
    const data = await api.apiActionLogsArchiveGet();
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

[**ActionLogArchiveInfoDto**](ActionLogArchiveInfoDto.md)

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


## apiActionLogsArchivePost

> ActionLogArchiveResultDto apiActionLogsArchivePost()



### Example

```ts
import {
  Configuration,
  ActionLogsApi,
} from '';
import type { ApiActionLogsArchivePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ActionLogsApi();

  try {
    const data = await api.apiActionLogsArchivePost();
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

[**ActionLogArchiveResultDto**](ActionLogArchiveResultDto.md)

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


## apiActionLogsGet

> ActionLogPagedDto apiActionLogsGet(search, action, module, clubMemberId, level, fromUtc, toUtc, page, pageSize)



### Example

```ts
import {
  Configuration,
  ActionLogsApi,
} from '';
import type { ApiActionLogsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ActionLogsApi();

  const body = {
    // string (optional)
    search: search_example,
    // string (optional)
    action: action_example,
    // string (optional)
    module: module_example,
    // string (optional)
    clubMemberId: clubMemberId_example,
    // string (optional)
    level: level_example,
    // Date (optional)
    fromUtc: 2013-10-20T19:20:30+01:00,
    // Date (optional)
    toUtc: 2013-10-20T19:20:30+01:00,
    // number (optional)
    page: 56,
    // number (optional)
    pageSize: 56,
  } satisfies ApiActionLogsGetRequest;

  try {
    const data = await api.apiActionLogsGet(body);
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
| **search** | `string` |  | [Optional] [Defaults to `undefined`] |
| **action** | `string` |  | [Optional] [Defaults to `undefined`] |
| **module** | `string` |  | [Optional] [Defaults to `undefined`] |
| **clubMemberId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **level** | `string` |  | [Optional] [Defaults to `undefined`] |
| **fromUtc** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **toUtc** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **page** | `number` |  | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**ActionLogPagedDto**](ActionLogPagedDto.md)

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


## apiActionLogsStatsGet

> ActionLogStatsDto apiActionLogsStatsGet(fromUtc, toUtc)



### Example

```ts
import {
  Configuration,
  ActionLogsApi,
} from '';
import type { ApiActionLogsStatsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ActionLogsApi();

  const body = {
    // Date (optional)
    fromUtc: 2013-10-20T19:20:30+01:00,
    // Date (optional)
    toUtc: 2013-10-20T19:20:30+01:00,
  } satisfies ApiActionLogsStatsGetRequest;

  try {
    const data = await api.apiActionLogsStatsGet(body);
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
| **fromUtc** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **toUtc** | `Date` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**ActionLogStatsDto**](ActionLogStatsDto.md)

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


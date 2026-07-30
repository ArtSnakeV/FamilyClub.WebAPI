
# PlatformSettingsDto


## Properties

Name | Type
------------ | -------------
`id` | number
`companyName` | string
`slogan` | string
`supportEmail` | string
`supportPhone` | string
`companyAddress` | string
`booksPerPage` | number
`maxFileSizeMb` | number
`allowedFileFormats` | string
`imageResizeMode` | string
`logoData` | string
`logoContentType` | string
`iconData` | string
`iconContentType` | string
`bannerData` | string
`bannerContentType` | string
`maintenanceMode` | boolean
`maintenanceMessage` | string
`updatedAt` | Date

## Example

```typescript
import type { PlatformSettingsDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "companyName": null,
  "slogan": null,
  "supportEmail": null,
  "supportPhone": null,
  "companyAddress": null,
  "booksPerPage": null,
  "maxFileSizeMb": null,
  "allowedFileFormats": null,
  "imageResizeMode": null,
  "logoData": null,
  "logoContentType": null,
  "iconData": null,
  "iconContentType": null,
  "bannerData": null,
  "bannerContentType": null,
  "maintenanceMode": null,
  "maintenanceMessage": null,
  "updatedAt": null,
} satisfies PlatformSettingsDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PlatformSettingsDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



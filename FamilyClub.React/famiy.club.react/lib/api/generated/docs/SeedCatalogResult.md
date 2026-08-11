
# SeedCatalogResult


## Properties

Name | Type
------------ | -------------
`success` | boolean
`message` | string
`authorsAdded` | number
`authorsUpdated` | number
`publishersAdded` | number
`categoriesAdded` | number
`productsAdded` | number
`productsSkipped` | number
`productsImagesUpdated` | number

## Example

```typescript
import type { SeedCatalogResult } from ''

// TODO: Update the object below with actual values
const example = {
  "success": null,
  "message": null,
  "authorsAdded": null,
  "authorsUpdated": null,
  "publishersAdded": null,
  "categoriesAdded": null,
  "productsAdded": null,
  "productsSkipped": null,
  "productsImagesUpdated": null,
} satisfies SeedCatalogResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SeedCatalogResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



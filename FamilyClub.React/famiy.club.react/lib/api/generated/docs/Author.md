
# Author


## Properties

Name | Type
------------ | -------------
`id` | number
`authorName` | string
`biography` | string
`photoUrl` | string
`products` | [Array&lt;Product&gt;](Product.md)

## Example

```typescript
import type { Author } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "authorName": null,
  "biography": null,
  "photoUrl": null,
  "products": null,
} satisfies Author

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Author
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



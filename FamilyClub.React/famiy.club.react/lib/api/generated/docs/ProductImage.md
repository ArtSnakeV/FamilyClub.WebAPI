
# ProductImage


## Properties

Name | Type
------------ | -------------
`id` | number
`imageData` | string
`imageName` | string
`productId` | number
`product` | [Product](Product.md)

## Example

```typescript
import type { ProductImage } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "imageData": null,
  "imageName": null,
  "productId": null,
  "product": null,
} satisfies ProductImage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProductImage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



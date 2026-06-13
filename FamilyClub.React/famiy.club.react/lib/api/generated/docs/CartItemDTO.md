
# CartItemDTO


## Properties

Name | Type
------------ | -------------
`id` | number
`cartId` | number
`productId` | number
`quantity` | number
`productName` | string
`productPrice` | number

## Example

```typescript
import type { CartItemDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "cartId": null,
  "productId": null,
  "quantity": null,
  "productName": null,
  "productPrice": null,
} satisfies CartItemDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CartItemDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



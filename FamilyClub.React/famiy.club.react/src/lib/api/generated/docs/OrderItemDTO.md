
# OrderItemDTO


## Properties

Name | Type
------------ | -------------
`id` | number
`quantity` | number
`unitPrice` | number
`productId` | number
`orderId` | number

## Example

```typescript
import type { OrderItemDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "quantity": null,
  "unitPrice": null,
  "productId": null,
  "orderId": null,
} satisfies OrderItemDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OrderItemDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



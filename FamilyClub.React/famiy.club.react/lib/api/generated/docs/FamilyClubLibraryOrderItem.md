
# FamilyClubLibraryOrderItem


## Properties

Name | Type
------------ | -------------
`id` | number
`quantity` | number
`unitPrice` | number
`orderId` | number
`order` | [FamilyClubLibraryOrder](FamilyClubLibraryOrder.md)
`productId` | number
`product` | [FamilyClubLibraryProduct](FamilyClubLibraryProduct.md)
`format` | string

## Example

```typescript
import type { FamilyClubLibraryOrderItem } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "quantity": null,
  "unitPrice": null,
  "orderId": null,
  "order": null,
  "productId": null,
  "product": null,
  "format": null,
} satisfies FamilyClubLibraryOrderItem

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FamilyClubLibraryOrderItem
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



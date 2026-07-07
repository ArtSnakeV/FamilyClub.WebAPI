
# FamilyClubBLLDTOsOrderOrderDTO


## Properties

Name | Type
------------ | -------------
`id` | number
`userId` | string
`orderDate` | Date
`status` | string
`totalPrice` | number
`orderItems` | [Array&lt;FamilyClubBLLDTOsOrderItemOrderItemDTO&gt;](FamilyClubBLLDTOsOrderItemOrderItemDTO.md)

## Example

```typescript
import type { FamilyClubBLLDTOsOrderOrderDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "userId": null,
  "orderDate": null,
  "status": null,
  "totalPrice": null,
  "orderItems": null,
} satisfies FamilyClubBLLDTOsOrderOrderDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FamilyClubBLLDTOsOrderOrderDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)




# PromotionDto


## Properties

Name | Type
------------ | -------------
`id` | number
`discountPercent` | number
`startDate` | Date
`endDate` | Date

## Example

```typescript
import type { PromotionDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "discountPercent": null,
  "startDate": null,
  "endDate": null,
} satisfies PromotionDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PromotionDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



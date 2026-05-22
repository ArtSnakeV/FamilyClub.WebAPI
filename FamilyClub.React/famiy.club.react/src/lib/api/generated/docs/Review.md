
# Review


## Properties

Name | Type
------------ | -------------
`id` | number
`productId` | number
`product` | [Product](Product.md)
`userId` | number
`clubMember` | [ClubMember](ClubMember.md)
`rating` | number
`comment` | string
`createdAt` | Date
`approved` | boolean

## Example

```typescript
import type { Review } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "productId": null,
  "product": null,
  "userId": null,
  "clubMember": null,
  "rating": null,
  "comment": null,
  "createdAt": null,
  "approved": null,
} satisfies Review

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Review
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



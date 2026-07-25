
# ReviewDto


## Properties

Name | Type
------------ | -------------
`id` | number
`productId` | number
`productName` | string
`authors` | string
`userId` | string
`userName` | string
`rating` | number
`comment` | string
`createdAt` | Date
`approved` | boolean
`productImages` | [Array&lt;ProductImageDto&gt;](ProductImageDto.md)

## Example

```typescript
import type { ReviewDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "productId": null,
  "productName": null,
  "authors": null,
  "userId": null,
  "userName": null,
  "rating": null,
  "comment": null,
  "createdAt": null,
  "approved": null,
  "productImages": null,
} satisfies ReviewDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReviewDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



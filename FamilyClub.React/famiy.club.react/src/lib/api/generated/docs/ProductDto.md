
# ProductDto


## Properties

Name | Type
------------ | -------------
`id` | number
`productName` | string
`price` | number
`discountPrice` | number
`description` | string
`publisherId` | number
`productImages` | [Array&lt;ProductImage&gt;](ProductImage.md)
`originalTitle` | string
`pageCount` | number
`publishingDate` | Date
`format` | string
`originalLanguageId` | number
`isbn` | string
`promotionId` | number
`productCode` | string
`weightGrams` | number
`itemsInSet` | number
`ageRestrictions` | string
`leaveOldImages` | boolean

## Example

```typescript
import type { ProductDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "productName": null,
  "price": null,
  "discountPrice": null,
  "description": null,
  "publisherId": null,
  "productImages": null,
  "originalTitle": null,
  "pageCount": null,
  "publishingDate": null,
  "format": null,
  "originalLanguageId": null,
  "isbn": null,
  "promotionId": null,
  "productCode": null,
  "weightGrams": null,
  "itemsInSet": null,
  "ageRestrictions": null,
  "leaveOldImages": null,
} satisfies ProductDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProductDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



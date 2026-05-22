
# Product


## Properties

Name | Type
------------ | -------------
`id` | number
`productName` | string
`price` | number
`discountPrice` | number
`description` | string
`publisherId` | number
`publisher` | [Publisher](Publisher.md)
`productImages` | [Array&lt;ProductImage&gt;](ProductImage.md)
`reviews` | [Array&lt;Review&gt;](Review.md)
`rating` | number
`originalTitle` | string
`pageCount` | number
`authors` | [Array&lt;Author&gt;](Author.md)
`languages` | [Array&lt;Language&gt;](Language.md)
`publishingDate` | Date
`categories` | [Array&lt;Category&gt;](Category.md)
`series` | [Array&lt;Series&gt;](Series.md)
`format` | string
`originalLanguageId` | number
`originalLanguage` | [Language](Language.md)
`isbn` | string
`promotionId` | number
`promotion` | [Promotion](Promotion.md)
`productCode` | string
`weightGrams` | number
`itemsInSet` | number
`ageRestrictions` | string
`translators` | [Array&lt;Translator&gt;](Translator.md)

## Example

```typescript
import type { Product } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "productName": null,
  "price": null,
  "discountPrice": null,
  "description": null,
  "publisherId": null,
  "publisher": null,
  "productImages": null,
  "reviews": null,
  "rating": null,
  "originalTitle": null,
  "pageCount": null,
  "authors": null,
  "languages": null,
  "publishingDate": null,
  "categories": null,
  "series": null,
  "format": null,
  "originalLanguageId": null,
  "originalLanguage": null,
  "isbn": null,
  "promotionId": null,
  "promotion": null,
  "productCode": null,
  "weightGrams": null,
  "itemsInSet": null,
  "ageRestrictions": null,
  "translators": null,
} satisfies Product

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Product
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)




# FamilyClubBLLDTOsProductProductDto


## Properties

Name | Type
------------ | -------------
`id` | number
`productName` | string
`price` | number
`discountPrice` | number
`description` | string
`publisherId` | number
`productImages` | [Array&lt;FamilyClubLibraryProductImage&gt;](FamilyClubLibraryProductImage.md)
`originalTitle` | string
`pageCount` | number
`publishingDate` | Date
`coverType` | [FamilyClubLibraryEnumCoverType](FamilyClubLibraryEnumCoverType.md)
`availability` | [FamilyClubLibraryEnumAvailability](FamilyClubLibraryEnumAvailability.md)
`quantityInStock` | number
`originalLanguageId` | number
`isbn` | string
`promotionId` | number
`productCode` | string
`weightGrams` | number
`itemsInSet` | number
`authorIds` | Array&lt;number&gt;
`languageIds` | Array&lt;number&gt;
`categoryIds` | Array&lt;number&gt;
`seriesIds` | Array&lt;number&gt;
`translatorIds` | Array&lt;number&gt;
`formatIds` | Array&lt;number&gt;
`bookSizeIds` | Array&lt;number&gt;
`ageRestrictionIds` | Array&lt;number&gt;
`leaveOldImages` | boolean

## Example

```typescript
import type { FamilyClubBLLDTOsProductProductDto } from ''

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
  "coverType": null,
  "availability": null,
  "quantityInStock": null,
  "originalLanguageId": null,
  "isbn": null,
  "promotionId": null,
  "productCode": null,
  "weightGrams": null,
  "itemsInSet": null,
  "authorIds": null,
  "languageIds": null,
  "categoryIds": null,
  "seriesIds": null,
  "translatorIds": null,
  "formatIds": null,
  "bookSizeIds": null,
  "ageRestrictionIds": null,
  "leaveOldImages": null,
} satisfies FamilyClubBLLDTOsProductProductDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FamilyClubBLLDTOsProductProductDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



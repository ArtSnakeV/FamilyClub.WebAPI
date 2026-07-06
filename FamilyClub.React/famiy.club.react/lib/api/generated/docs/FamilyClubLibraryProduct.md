
# FamilyClubLibraryProduct


## Properties

Name | Type
------------ | -------------
`id` | number
`productName` | string
`price` | number
`discountPrice` | number
`description` | string
`publisherId` | number
`publisher` | [FamilyClubLibraryPublisher](FamilyClubLibraryPublisher.md)
`productImages` | [Array&lt;FamilyClubLibraryProductImage&gt;](FamilyClubLibraryProductImage.md)
`reviews` | [Array&lt;FamilyClubLibraryReview&gt;](FamilyClubLibraryReview.md)
`rating` | number
`originalTitle` | string
`pageCount` | number
`authors` | [Array&lt;FamilyClubLibraryAuthor&gt;](FamilyClubLibraryAuthor.md)
`languages` | [Array&lt;FamilyClubLibraryLanguage&gt;](FamilyClubLibraryLanguage.md)
`publishingDate` | Date
`categories` | [Array&lt;FamilyClubLibraryCategory&gt;](FamilyClubLibraryCategory.md)
`series` | [Array&lt;FamilyClubLibrarySeries&gt;](FamilyClubLibrarySeries.md)
`formats` | [Array&lt;FamilyClubLibraryFormat&gt;](FamilyClubLibraryFormat.md)
`ageRestrictions` | [Array&lt;FamilyClubLibraryAgeRestriction&gt;](FamilyClubLibraryAgeRestriction.md)
`bookSizes` | [Array&lt;FamilyClubLibraryBookSize&gt;](FamilyClubLibraryBookSize.md)
`originalLanguageId` | number
`originalLanguage` | [FamilyClubLibraryLanguage](FamilyClubLibraryLanguage.md)
`isbn` | string
`promotionId` | number
`promotion` | [FamilyClubLibraryPromotion](FamilyClubLibraryPromotion.md)
`coverType` | [CoverType](CoverType.md)
`availability` | [Availability](Availability.md)
`quantityInStock` | number
`productCode` | string
`weightGrams` | number
`itemsInSet` | number
`translators` | [Array&lt;FamilyClubLibraryTranslator&gt;](FamilyClubLibraryTranslator.md)
`favoritedBy` | [Array&lt;FamilyClubLibraryClubMember&gt;](FamilyClubLibraryClubMember.md)

## Example

```typescript
import type { FamilyClubLibraryProduct } from ''

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
  "formats": null,
  "ageRestrictions": null,
  "bookSizes": null,
  "originalLanguageId": null,
  "originalLanguage": null,
  "isbn": null,
  "promotionId": null,
  "promotion": null,
  "coverType": null,
  "availability": null,
  "quantityInStock": null,
  "productCode": null,
  "weightGrams": null,
  "itemsInSet": null,
  "translators": null,
  "favoritedBy": null,
} satisfies FamilyClubLibraryProduct

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FamilyClubLibraryProduct
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)




# FamilyClubLibraryClubMember


## Properties

Name | Type
------------ | -------------
`id` | string
`userName` | string
`normalizedUserName` | string
`email` | string
`normalizedEmail` | string
`emailConfirmed` | boolean
`passwordHash` | string
`securityStamp` | string
`concurrencyStamp` | string
`phoneNumber` | string
`phoneNumberConfirmed` | boolean
`twoFactorEnabled` | boolean
`lockoutEnd` | Date
`lockoutEnabled` | boolean
`accessFailedCount` | number
`name` | string
`surname` | string
`dateOfBirth` | Date
`orders` | [Array&lt;FamilyClubLibraryOrder&gt;](FamilyClubLibraryOrder.md)
`reviews` | [Array&lt;FamilyClubLibraryReview&gt;](FamilyClubLibraryReview.md)
`notifications` | [Array&lt;FamilyClubLibraryNotification&gt;](FamilyClubLibraryNotification.md)
`avatarData` | string
`favoriteProducts` | [Array&lt;FamilyClubLibraryProduct&gt;](FamilyClubLibraryProduct.md)
`favoriteCategories` | [Array&lt;FamilyClubLibraryCategory&gt;](FamilyClubLibraryCategory.md)

## Example

```typescript
import type { FamilyClubLibraryClubMember } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "userName": null,
  "normalizedUserName": null,
  "email": null,
  "normalizedEmail": null,
  "emailConfirmed": null,
  "passwordHash": null,
  "securityStamp": null,
  "concurrencyStamp": null,
  "phoneNumber": null,
  "phoneNumberConfirmed": null,
  "twoFactorEnabled": null,
  "lockoutEnd": null,
  "lockoutEnabled": null,
  "accessFailedCount": null,
  "name": null,
  "surname": null,
  "dateOfBirth": null,
  "orders": null,
  "reviews": null,
  "notifications": null,
  "avatarData": null,
  "favoriteProducts": null,
  "favoriteCategories": null,
} satisfies FamilyClubLibraryClubMember

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FamilyClubLibraryClubMember
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



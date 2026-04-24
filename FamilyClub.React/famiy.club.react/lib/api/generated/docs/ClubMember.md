
# ClubMember


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
`orders` | [Array&lt;Order&gt;](Order.md)
`reviews` | [Array&lt;Review&gt;](Review.md)

## Example

```typescript
import type { ClubMember } from ''

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
} satisfies ClubMember

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClubMember
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



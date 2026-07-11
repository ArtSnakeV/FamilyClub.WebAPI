
# FamilyClubBLLDTOsClubMemberClubMemberReadDto


## Properties

Name | Type
------------ | -------------
`id` | string
`email` | string
`phoneNumber` | string
`avatarData` | string
`name` | string
`surname` | string
`dateOfBirth` | Date
`lockoutEnd` | Date
`roles` | Array&lt;string&gt;

## Example

```typescript
import type { FamilyClubBLLDTOsClubMemberClubMemberReadDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "email": null,
  "phoneNumber": null,
  "avatarData": null,
  "name": null,
  "surname": null,
  "dateOfBirth": null,
  "lockoutEnd": null,
  "roles": null,
} satisfies FamilyClubBLLDTOsClubMemberClubMemberReadDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FamilyClubBLLDTOsClubMemberClubMemberReadDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



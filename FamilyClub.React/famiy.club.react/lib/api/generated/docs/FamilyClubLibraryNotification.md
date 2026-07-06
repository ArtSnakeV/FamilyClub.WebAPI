
# FamilyClubLibraryNotification


## Properties

Name | Type
------------ | -------------
`id` | number
`text` | string
`isRead` | boolean
`createdAt` | Date
`clubMemberId` | string
`clubMember` | [FamilyClubLibraryClubMember](FamilyClubLibraryClubMember.md)

## Example

```typescript
import type { FamilyClubLibraryNotification } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "text": null,
  "isRead": null,
  "createdAt": null,
  "clubMemberId": null,
  "clubMember": null,
} satisfies FamilyClubLibraryNotification

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FamilyClubLibraryNotification
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



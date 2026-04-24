
# AuthResponseClubMemberDTO


## Properties

Name | Type
------------ | -------------
`clubMember` | [ClubMemberReadDto](ClubMemberReadDto.md)
`token` | string
`expiration` | Date
`returnUrl` | string

## Example

```typescript
import type { AuthResponseClubMemberDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "clubMember": null,
  "token": null,
  "expiration": null,
  "returnUrl": null,
} satisfies AuthResponseClubMemberDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AuthResponseClubMemberDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



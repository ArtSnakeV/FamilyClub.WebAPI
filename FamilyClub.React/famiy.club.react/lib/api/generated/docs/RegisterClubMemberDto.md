
# RegisterClubMemberDto


## Properties

Name | Type
------------ | -------------
`email` | string
`password` | string
`phoneNumber` | string
`selectedRoles` | Array&lt;string&gt;
`name` | string
`surname` | string
`dateOfBirth` | Date

## Example

```typescript
import type { RegisterClubMemberDto } from ''

// TODO: Update the object below with actual values
const example = {
  "email": null,
  "password": null,
  "phoneNumber": null,
  "selectedRoles": null,
  "name": null,
  "surname": null,
  "dateOfBirth": null,
} satisfies RegisterClubMemberDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RegisterClubMemberDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



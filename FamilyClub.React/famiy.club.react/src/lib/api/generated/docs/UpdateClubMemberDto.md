
# UpdateClubMemberDto


## Properties

Name | Type
------------ | -------------
`phoneNumber` | string
`name` | string
`surname` | string
`dateOfBirth` | Date

## Example

```typescript
import type { UpdateClubMemberDto } from ''

// TODO: Update the object below with actual values
const example = {
  "phoneNumber": null,
  "name": null,
  "surname": null,
  "dateOfBirth": null,
} satisfies UpdateClubMemberDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateClubMemberDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)




# ClubMemberReadDto


## Properties

Name | Type
------------ | -------------
`id` | string
`email` | string
`phoneNumber` | string
`name` | string
`surname` | string
`dateOfBirth` | Date
`roles` | Array&lt;string&gt;

## Example

```typescript
import type { ClubMemberReadDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "email": null,
  "phoneNumber": null,
  "name": null,
  "surname": null,
  "dateOfBirth": null,
  "roles": null,
} satisfies ClubMemberReadDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClubMemberReadDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



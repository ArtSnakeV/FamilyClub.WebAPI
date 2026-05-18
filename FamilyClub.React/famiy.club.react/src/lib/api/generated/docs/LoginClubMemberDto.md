
# LoginClubMemberDto


## Properties

Name | Type
------------ | -------------
`username` | string
`password` | string
`rememberMe` | boolean
`returnUrl` | string

## Example

```typescript
import type { LoginClubMemberDto } from ''

// TODO: Update the object below with actual values
const example = {
  "username": null,
  "password": null,
  "rememberMe": null,
  "returnUrl": null,
} satisfies LoginClubMemberDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LoginClubMemberDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



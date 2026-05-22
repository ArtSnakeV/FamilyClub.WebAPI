
# AuthorDTO


## Properties

Name | Type
------------ | -------------
`id` | number
`authorName` | string
`biography` | string
`photoUrl` | string

## Example

```typescript
import type { AuthorDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "authorName": null,
  "biography": null,
  "photoUrl": null,
} satisfies AuthorDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AuthorDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



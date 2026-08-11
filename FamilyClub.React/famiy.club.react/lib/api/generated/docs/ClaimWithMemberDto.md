
# ClaimWithMemberDto


## Properties

Name | Type
------------ | -------------
`memberId` | string
`email` | string
`userName` | string
`phoneNumber` | string
`claimType` | string
`claimValue` | string

## Example

```typescript
import type { ClaimWithMemberDto } from ''

// TODO: Update the object below with actual values
const example = {
  "memberId": null,
  "email": null,
  "userName": null,
  "phoneNumber": null,
  "claimType": null,
  "claimValue": null,
} satisfies ClaimWithMemberDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClaimWithMemberDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



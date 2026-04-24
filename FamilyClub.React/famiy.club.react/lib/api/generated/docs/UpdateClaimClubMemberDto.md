
# UpdateClaimClubMemberDto


## Properties

Name | Type
------------ | -------------
`memberId` | string
`oldClaimType` | string
`oldClaimValue` | string
`newClaimType` | string
`newClaimValue` | string

## Example

```typescript
import type { UpdateClaimClubMemberDto } from ''

// TODO: Update the object below with actual values
const example = {
  "memberId": null,
  "oldClaimType": null,
  "oldClaimValue": null,
  "newClaimType": null,
  "newClaimValue": null,
} satisfies UpdateClaimClubMemberDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateClaimClubMemberDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



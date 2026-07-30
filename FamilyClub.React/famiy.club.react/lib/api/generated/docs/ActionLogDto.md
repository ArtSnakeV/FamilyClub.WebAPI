
# ActionLogDto


## Properties

Name | Type
------------ | -------------
`id` | number
`createdAt` | Date
`clubMemberId` | string
`userName` | string
`userRoleHint` | string
`action` | string
`module` | string
`details` | string
`ipAddress` | string
`level` | string

## Example

```typescript
import type { ActionLogDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "createdAt": null,
  "clubMemberId": null,
  "userName": null,
  "userRoleHint": null,
  "action": null,
  "module": null,
  "details": null,
  "ipAddress": null,
  "level": null,
} satisfies ActionLogDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ActionLogDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



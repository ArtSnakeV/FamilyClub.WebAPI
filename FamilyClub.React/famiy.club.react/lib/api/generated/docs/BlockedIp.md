
# BlockedIp


## Properties

Name | Type
------------ | -------------
`id` | number
`ipAddress` | string
`reason` | string
`createdAt` | Date

## Example

```typescript
import type { BlockedIp } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "ipAddress": null,
  "reason": null,
  "createdAt": null,
} satisfies BlockedIp

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BlockedIp
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



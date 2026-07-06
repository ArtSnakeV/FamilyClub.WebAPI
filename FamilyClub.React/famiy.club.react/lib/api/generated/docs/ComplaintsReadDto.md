
# ComplaintsReadDto


## Properties

Name | Type
------------ | -------------
`id` | number
`complaintText` | string
`complaintType` | string
`isResolved` | boolean
`createdAt` | Date
`resolvedAt` | Date
`clubMemberId` | string
`resolutionNotes` | string
`images` | [Array&lt;ComplaintImageDto&gt;](ComplaintImageDto.md)

## Example

```typescript
import type { ComplaintsReadDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "complaintText": null,
  "complaintType": null,
  "isResolved": null,
  "createdAt": null,
  "resolvedAt": null,
  "clubMemberId": null,
  "resolutionNotes": null,
  "images": null,
} satisfies ComplaintsReadDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ComplaintsReadDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



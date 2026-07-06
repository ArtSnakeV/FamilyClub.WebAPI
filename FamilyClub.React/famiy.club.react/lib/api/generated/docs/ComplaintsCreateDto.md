
# ComplaintsCreateDto


## Properties

Name | Type
------------ | -------------
`complaintText` | string
`complaintType` | string
`clubMemberId` | string
`images` | [Array&lt;ComplaintImageCreateDto&gt;](ComplaintImageCreateDto.md)

## Example

```typescript
import type { ComplaintsCreateDto } from ''

// TODO: Update the object below with actual values
const example = {
  "complaintText": null,
  "complaintType": null,
  "clubMemberId": null,
  "images": null,
} satisfies ComplaintsCreateDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ComplaintsCreateDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



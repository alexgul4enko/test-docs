Codegen plugin to write own code snippets

Usage: 

1. Create new file in `snippets` folter with code:

```
export default {
    imports: [],
    code: [()=>'']
}

```
## imports
`imports` is an Array of import statements

```
import: string[]
{
    imports: ["import { useMemo } from 'react'", "import { Button } from 'antd'"]
}
```
will generate 
```
import { useMemo } from 'react';
import { Button } from 'antd';
```

## code

`code` is an Array of functions that returns JS code

### configs
```
type Configs = {
  node: GQLNode,
  documentVariableName: string,
  operationType: string,
  operationResultType: string,
  operationVariablesTypes: string,
  hasRequiredVariables: boolean
}
{
  node: {
    kind: 'OperationDefinition',
    operation: 'query',
    name: { kind: 'Name', value: 'me', loc: [Object] },
    variableDefinitions: [],
    directives: [],
    selectionSet: { kind: 'SelectionSet', selections: [Array], loc: [Object] },
    loc: { start: 0, end: 150 }
  },
  documentVariableName: 'MeDocument',
  operationType: 'Query',
  operationResultType: 'MeQuery',
  operationVariablesTypes: 'MeQueryVariables',
  hasRequiredVariables: false
}
```

```
export default {
    code: (configs) => 'console.log("Hello")'
}
```
will generate 
```
console.log("Hello")
```

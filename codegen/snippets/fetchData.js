//JS Snippet to generate React Hook to send API requests using Apollo Client
import { pascalCase } from 'change-case-all';

export default {
  imports: [`import { useApolloClient } from '@apollo/client';`, `import { useCallback } from 'react';`],
  code: [
    conf => {
      const name = pascalCase(conf.node.name.value);
      return `
export function use${name}Request() {
    const client = useApolloClient();
    return useCallback<(variables: ${conf.operationVariablesTypes}, options?: Omit<Apollo.QueryOptions, 'query'>) => Promise<Apollo.ApolloQueryResult<${conf.operationResultType}>>>( (variables, options) => {
        return client.query<${conf.operationResultType}>({
            fetchPolicy: 'no-cache',
          ...options,
          query: ${conf.documentVariableName},
          variables
        })
    }, []);
}
`;
    }
  ]
};

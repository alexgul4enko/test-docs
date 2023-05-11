import { oldVisit } from '@graphql-codegen/plugin-helpers';
import { concatAST, Kind } from 'graphql';
import { BrokretteVisitor } from './visitor.js';

export const plugin = (schema, documents, config) => {
  const allAst = concatAST(documents.map(v => v.document));

  const allFragments = [
    ...allAst.definitions
      .filter(d => d.kind === Kind.FRAGMENT_DEFINITION)
      .map(fragmentDef => ({
        node: fragmentDef,
        name: fragmentDef.name.value,
        onType: fragmentDef.typeCondition.name.value,
        isExternal: false
      })),
    ...(config.externalFragments || [])
  ];

  const visitor = new BrokretteVisitor(schema, allFragments, config || {}, documents);
  const visitorResult = oldVisit(allAst, { leave: visitor });
  return {
    prepend: visitor.getImports(),
    content: [visitor.fragments, ...visitorResult.definitions.filter(t => typeof t === 'string')].join('\n')
  };
};

export { BrokretteVisitor };

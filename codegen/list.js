import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import isEmpty from 'lodash/isEmpty';

module.exports = {
  plugin(schema, documents, config, info) {
    const res = {
      prepend: [],
      content: []
    };
    documents.forEach(doc => {
      const definitions = doc.document.definitions
        .map(def => ({ name: def.name.value, operation: def.operation }))
        .filter(({ operation }) => !!operation);
      const list = definitions.find(({ name }) => name.toLowerCase().includes('list'));
      const remove = definitions.find(({ name }) => name.toLowerCase().includes('remove'));
      const update = definitions.find(({ name }) => name.toLowerCase().includes('update'));
      const create = definitions.find(({ name }) => name.toLowerCase().includes('create'));

      if (!list) {
        return;
      }
      res.prepend.push('import { useInfinityDataTemplate, InfinityConfig } from "@/shared/codegen/useInfinityDataTemplate"');
      function makeVariables(buildName) {
        return [{ list }, { remove }, { update }, { create }].reduce((res, item) => {
          const [key, val] = Object.entries(item)[0];
          return {
            ...res,
            [key]: buildName(val || {})
          };
        }, {});
      }
      const returnTypes = makeVariables(({ name, operation }) => (name ? upperFirst(camelCase(`${name}_${operation}`)) : '{}'));
      const paramTypes = makeVariables(({ name, operation }) =>
        name ? upperFirst(camelCase(`${name}_${operation}_Variables`)) : '{}'
      );
      const hooks = makeVariables(({ name }) => (name ? camelCase(`use_${name}_Request`) : undefined));
      const types = [...Object.values(returnTypes), ...Object.values(paramTypes)].map(val => val || {}).join(', ');
      const codegen = `
export function useListQueries<DataType = ${returnTypes.list}, Filters = ${paramTypes.list}>(options?:InfinityConfig<${
        paramTypes.list
      }, ${returnTypes.list},${returnTypes.update ? returnTypes.update : '{}'}, DataType>){
  return useInfinityDataTemplate<${types}, DataType, Filters>({
    list: ${hooks.list ? `${hooks.list}()` : 'undefined'},
    remove: ${hooks.remove ? `${hooks.remove}()` : 'undefined'},
    update: ${hooks.update ? `${hooks.update}()` : 'undefined'},
    create: ${hooks.create ? `${hooks.create}()` : 'undefined'},
  }, options)

}

`;
      res.content.push(codegen);
    });

    return res;
  }
};

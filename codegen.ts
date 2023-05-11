import type { CodegenConfig } from '@graphql-codegen/cli';
require('./webpack/utils/init-env');

/* end: init CRA env variables */
const config: CodegenConfig = {
  overwrite: true,
  //link to download shema
  schema: `${process.env.REACT_APP_API}/gql`,
  //files to parse
  documents: ['src/**/*.graphql', 'src/**/*.gql'],
  ignoreNoDocuments: true,
  //lint with prettier after generating new files
  hooks: { afterOneFileWrite: ['prettier --write'] },
  generates: {
    //generate global types based on schema
    'src/gql/types.generated.ts': {
      plugins: ['typescript'],
      config: {
        skipDocumentsValidation: {
          skipDuplicateValidation: true
        }
      }
    },
    //generate react hooks
    'src/': {
      preset: 'near-operation-file',
      //create file in same folder as gql file
      presetConfig: { extension: '.generated.tsx', baseTypesPath: 'gql/types.generated.ts' },
      plugins: ['typescript-operations', 'typescript-react-apollo', './codegen/index.js', './codegen/list.js'],
      config: {
        withHooks: true,
        useTypeImports: false
      }
    }
  }
};

export default config;

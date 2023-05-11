import { ClientSideBaseVisitor, DocumentMode } from '@graphql-codegen/visitor-plugin-common';
import autoBind from 'auto-bind';

export class BrokretteVisitor extends ClientSideBaseVisitor {
  _externalImportPrefix;
  imports = new Set();

  constructor(schema, fragments, rawConfig, documents) {
    super(schema, fragments, rawConfig, {
      documentMode: DocumentMode.external
    });
    this.rawConfig = rawConfig;
    this.imports = new Set();
    this._documents = documents;
    autoBind(this);
  }

  getDocumentNodeVariable(node, documentVariableName) {
    return documentVariableName;
  }

  getImports() {
    const baseImports = super.getImports();
    const hasOperations = this._collectedOperations.length > 0;

    return [...Array.from(this.imports)];
  }

  buildOperation(node, documentVariableName, operationType, operationResultType, operationVariablesTypes, hasRequiredVariables) {
    const modules = [];
    const controllerPath = require('path').join(__dirname, 'snippets');

    require('fs')
      .readdirSync(controllerPath)
      .forEach(file => {
        const name = file.replace(/\.js$/, '');
        modules.push(require(`./snippets/${file}`));
      });
    //add imports
    modules
      .map(({ default: imp }) => imp)
      .forEach(({ imports }) => {
        imports.forEach(_import => this.imports.add(_import));
      });

    const data = {
      node,
      documentVariableName,
      operationType,
      operationResultType,
      operationVariablesTypes,
      hasRequiredVariables
    };
    //generate code
    return modules
      .reduce((res, module) => {
        if (!Array.isArray(module.default.code)) {
          return res;
        }
        return [...res, ...module.default.code.map(func => func(data))];
      }, [])
      .filter(Boolean)
      .join('\n');
  }
}

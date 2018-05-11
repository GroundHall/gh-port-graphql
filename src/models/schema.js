import merge from 'lodash.merge';
import { mergeSchemas } from 'graphql-tools';

let resolvers = {};
const schemas = [];
const links = [];


/**
 * Search all the resolver.js files in the folder
 * and combine them into one object
 */
const resolverReq = require.context('./', true, /.+?resolvers\.js/);
resolverReq.keys().forEach((path) => {
  resolvers = merge(resolvers, resolverReq(path).default);
});

/**
 * Search all the schema.js files in the folder
 * and put them inside an array
 */
const schemaReq = require.context('./', true, /.+?schema\.js/);
schemaReq.keys().forEach((path) => {
  schemas.push(schemaReq(path).default);
});


/**
 * Search all the link.js files in the folder
 * and put them inside an array
 */
const linkReq = require.context('./', true, /.+?link\.js/);
linkReq.keys().forEach((path) => {
  links.push(linkReq(path).default);
});

const masterSchema = mergeSchemas({
  schemas: [...schemas, ...links],
  resolvers
});

export default masterSchema;

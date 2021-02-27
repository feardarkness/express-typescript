# Base REST API project with Typescript - Typeorm(Mysql) and Express

REST API.

## Requirements

Node 12 or higher.

To work with node 14, better to change tsconfig.json from https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping

## Create migrations

```bash
./node_modules/.bin/ts-node ./node_modules/typeorm/cli.js migration:generate -n createUserTable
```

or

```bash
npm run typeorm migration:generate -- -n createUserTable
```

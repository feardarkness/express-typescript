# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

## Create migrations

```bash
./node_modules/.bin/ts-node ./node_modules/typeorm/cli.js migration:generate -n createUserTable
```

or

```bash
npm run typeorm migration:generate -- -n createUserTable
```

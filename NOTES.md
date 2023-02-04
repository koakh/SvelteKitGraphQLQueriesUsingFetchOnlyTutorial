# NOTES

## Tutorial Links

- [Part1 - SvelteKit GraphQL Queries using fetch Only](https://rodneylab.com/sveltekit-graphql-queries-fetch/)
- [Part2 - SvelteKit GraphQL Type Generation](https://rodneylab.com/sveltekit-graphql-type-generation/)
- [Using fetch with SvelteKit: Call APIs and Server Endpoints](https://rodneylab.com/using-fetch-sveltekit/)

## Full code for this SvelteKit GraphQL queries using fetch project on the Rodney Lab Git Hub repo

- [GitHub - rodneylab/sveltekit-graphql-fetch: SvelteKit GraphQL queries using fetch only: how you can drop Apollo client and urql dependencies altogether to make your Svelte app leaner.](https://github.com/rodneylab/sveltekit-graphql-fetch)

## SWOP Api

- [SWOP - Currency Exchange Rate API](https://swop.cx/account/register/developer)
- [SWOP - GraphqQL Playground](https://swop.cx/account/dashboard/playground)

- Un: marioammonteiro@gmail.com
- Pw: fuCTXmf68MkEIhEjzKldq56EP2RM4VmO
- API-Key: 251657087dbdeb96ee34fd22f090dfc3......

## Extensions

- [GraphQL:&#32;Syntax&#32;Highlighting&#32;-&#32;Visual&#32;Studio&#32;Marketplace](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql-syntax)

```shell
$ ext install GraphQL.vscode-graphql-syntax
```

use like that

```ts
const query = `#graphql
  { id }
`;
```

## Links

- [List of circulating currencies - Wikipedia](https://en.wikipedia.org/wiki/List_of_circulating_currencies)

## SvelteKit GraphQL Type Generation - Part II

```shell
$ pnpm add -D \
  graphql \
  graphql-codegen-svelte-apollo \
  @graphql-codegen/cli \
  @graphql-codegen/typescript \
  @graphql-codegen/typescript-operations
```

> require graphql else `Error: Cannot find module 'graphql'`

> aoptionally use graphql-tag to use gql template literal tag, but seems that gives some problems, better to stick with extension

create `codegen.json` file

```json
{
  "overwrite": true,
  "schema": {
    "https://swop.cx/graphql": {
      "headers": {
        "Authorization": "ApiKey ${SWOP_API_KEY}"
      }
    }
  },
  "generates": {
    "src/lib/generated/graphql.ts": {
      "plugins": [
        "typescript",
        "typescript-operations",
        "graphql-codegen-svelte-apollo"
      ]
    }
  }
}
```

add to `.env`

```shell
SWOP_API_KEY="251657087dbdeb96ee34fd22f090dfc30a6a07e530b7413a2e29811f3f9153ba"
```

> make sure SWOP_API_KEY is defined in your .env file

add script

```json
{
  "scripts": {
		"codegen": "export $(grep SWOP_API_KEY .env | xargs) && graphql-codegen --config codegen.json && prettier --write src/lib/generated/graphql.ts",
    "codegen:watch": "export $(grep SWOP_API_KEY .env | xargs) && graphql-codegen --config codegen.json --watch"
  }
}
```

Conveniently this script is doing **three things** for us. 

- First it reads the API key from the `.env` file, making it available in the next step
- Secondly, we actually generate the types, output to src/lib/generated/graphql.ts
-  Finally, we format the types file with prettier — this saves doing it manually, before committing your code

launch script `pnpm codegen`

done `src/lib/generated/graphql.ts` generated

All that is left to do is to start using the new types, testing everything is working. We'll look at that below. Take a look at the new types generated in `src/lib/generated/graphql.ts` for now. 
You will see there are **some missing dependencies**, but if you are only using this file for types, you can ignore them. 
Just `import` using the `type` keyword, wherever you import one of these new types. For example: 

    
```ts
import type { Query, QueryLatestArgs } from '$lib/generated/graphql';
```
  
now follow the post adding types

extra to post type stroe to get rid of the type issues

`src/lib/shared/stores/rates.ts`

```ts
const rates: Writable<Rate[]> = writable([]);
```



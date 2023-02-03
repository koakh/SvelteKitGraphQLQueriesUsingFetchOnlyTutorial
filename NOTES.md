# NOTES

## Tutorial Links

- [Part1 - SvelteKit GraphQL Queries using fetch Only](https://rodneylab.com/sveltekit-graphql-queries-fetch/)
- [Part2 - SvelteKit GraphQL Type Generation](https://rodneylab.com/sveltekit-graphql-type-generation/)

## Full code for this SvelteKit GraphQL queries using fetch project on the Rodney Lab Git Hub repo

- [GitHub - rodneylab/sveltekit-graphql-fetch: SvelteKit GraphQL queries using fetch only: how you can drop Apollo client and urql dependencies altogether to make your Svelte app leaner.](https://github.com/rodneylab/sveltekit-graphql-fetch)

## SWOP Api

- [SWOP - Currency Exchange Rate API](https://swop.cx/account/register/developer)
- [SWOP - GraphqQL Playground](https://swop.cx/account/dashboard/playground)

- Un: marioammonteiro@gmail.com
- Pw: fuCTXmf68MkEIhEjzKldq56EP2RM4VmO
- API-Key: 251657087dbdeb96ee34fd22f090dfc30a6a07e530b7413a2e29811f3f9153ba

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
$ pnpm install -D graphql graphql-codegen-svelte-apollo @graphql-codegen/cli @graphql-codegen/typescript-operations
```

create `codegen.json` file
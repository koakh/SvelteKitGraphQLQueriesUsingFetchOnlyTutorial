import { SWOP_API_KEY } from '$env/static/private';
// used Query and QueryLatestArgs type(s) from codegen
import type { Query, QueryLatestArgs } from '$lib/generated/graphql';
import { apiUrl } from '$lib/shared/constants';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

// define the GraphQL query
const query = `#graphql
	query latestQuery(
		$baseCurrency: String = "EUR"
		$quoteCurrencies: [String!]
	) {
		latest(
			baseCurrency: $baseCurrency
			quoteCurrencies: $quoteCurrencies
		) {
			baseCurrency
			quoteCurrency
			date
			quote
		}
	}`;

// define form actions
export const actions: Actions = {
  add: async ({ request }) => {
    try {
      const form = await request.formData();
      const currency = form.get('currency');

      if (typeof currency === 'string') {      
        // used QueryLatestArgs type(s) from codegen
        const variables: QueryLatestArgs = {
          baseCurrency: 'EUR',
          quoteCurrencies: [currency]
        };

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `ApiKey ${SWOP_API_KEY}`
          },
          body: JSON.stringify({
            // same query
            query,
            // new variables
            variables
          })
        });

        // used Query type(s) from codegen
        const responseData: { data: Query } = await response.json();
        const rate = responseData.data.latest[0];
        return { rate };
      }
      return undefined;
    } catch (err: unknown) {
      const message = `Error in /login form: ${err as string}`;
      console.error(message);
      return error(500, message);
    }
  }
};

// define page load
export const load: PageServerLoad = async () => {
  try {
    const variables: QueryLatestArgs = {
      baseCurrency: 'EUR',
      quoteCurrencies: ['CAD', 'GBP', 'IDR', 'INR', 'USD']
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `ApiKey ${SWOP_API_KEY}`
      },
      body: JSON.stringify({
        query,
        // if you are making a different query which does not need any variables,
        // be sure to include an empty variables object.
        variables
      })
    });

    // used Query type(s) from codegen
    const { data: responseData }: { data: Query } = await response.json();
    return { ...responseData };
  } catch (error) {
    console.error(`Error in load function: ${error}`);
  }
};
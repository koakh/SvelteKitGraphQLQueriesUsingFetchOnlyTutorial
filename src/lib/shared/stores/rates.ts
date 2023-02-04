import type { Rate } from '$lib/generated/graphql';
import { writable, type Writable } from 'svelte/store';

const rates: Writable<Rate[]> = writable([]);

export { rates as default };
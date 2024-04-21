import { Sorting } from "../enums/search/Sorting";

export type SearchOptions = {
	facets?: string[][];
	sorting?: Sorting;
	offset?: Number;
	limit?: Number;
};

import { SearchFilter } from "../types/SearchFilter";

export default class SearchFacetBuilder {
	public facet: string[][] = [];

	constructor() {}

	/**
	 * Adds an operator.
	 */
	public addOperator(filters: SearchFilter[]) {
		let newFilter: string[] = [];

		console.log(filters);

		filters.forEach((value, index) => {
			newFilter.push(value.facetType + value.operation + value.value);
		});

		this.facet.push(newFilter);
	}

	public getFacet() {
		return this.facet;
	}
}

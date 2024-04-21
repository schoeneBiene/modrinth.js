import { FacetType } from "../enums/search/FacetType";
import { SearchFacetsOperator } from "../enums/search/SearchFacetsOperator";

export type SearchFilter = {
	facetType: FacetType;
	operation: SearchFacetsOperator;
	value: string;
};

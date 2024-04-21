"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchFacetBuilder {
    facet = [];
    constructor() { }
    /**
     * Adds an operator.
     */
    addOperator(filters) {
        let newFilter = [];
        console.log(filters);
        filters.forEach((value, index) => {
            newFilter.push(value.facetType + value.operation + value.value);
        });
        this.facet.push(newFilter);
    }
    getFacet() {
        return this.facet;
    }
}
exports.default = SearchFacetBuilder;

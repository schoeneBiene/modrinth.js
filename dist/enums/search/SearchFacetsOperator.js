"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFacetsOperator = void 0;
var SearchFacetsOperator;
(function (SearchFacetsOperator) {
    SearchFacetsOperator["NOT"] = "!=";
    SearchFacetsOperator["HIGHER_OR_EQUAL"] = ">=";
    SearchFacetsOperator["HIGHER"] = ">";
    SearchFacetsOperator["LOWER_OR_EQUAL"] = "<=";
    SearchFacetsOperator["LOWER"] = "<";
    SearchFacetsOperator["EQUAL"] = ":";
})(SearchFacetsOperator || (exports.SearchFacetsOperator = SearchFacetsOperator = {}));

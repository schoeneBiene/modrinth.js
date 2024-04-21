const {
	ModrinthClient,
	SearchFacetBuilder,
	FacetType,
	SearchFacetsOperator,
	GameVersion,
	Sorting,
} = require("../dist");

const client = new ModrinthClient("modrinth2 test");

const searchFacet = new SearchFacetBuilder();

console.log(searchFacet);

console.log(SearchFacetsOperator);

searchFacet.addOperator([
	{
		facetType: FacetType.VERSIONS,
		operation: SearchFacetsOperator.EQUAL,
		value: GameVersion.V1_20_2,
	},
]);

console.log(searchFacet);

client.projects
	.search("Sodium", {
		facets: searchFacet.getFacet(),
		sorting: Sorting.DOWNLOADS,
	})
	.then((result) => {
		console.log(result);

		result.hits.forEach((hit) => {
			console.log(hit.title);
		});
	})
	.catch((reason) => {
		console.log(reason);
	});

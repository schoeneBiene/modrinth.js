import { SearchHit } from "./SearchHit";

export default interface SearchResult {
	hits: SearchHit[];
	offset: Number;
	limit: Number;
	total_hits: Number;
}

import ModrinthClient from "../../ModrinthClient";
import Project, { IProject } from "../../classes/Project";
import SearchResult from "../../interfaces/search/SearchResult";
import { SearchOptions } from "../../types/SearchOptions";

export default class Projects {
	private client: ModrinthClient;

	constructor(client: ModrinthClient) {
		this.client = client;
	}

	/**
	 * Gets a project by its ID or slug.
	 * @param id Slug or ID of the project.
	 * @returns Promise of the project.
	 */
	get(id: string): Promise<Project> {
		return new Promise((resolve, reject) => {
			this.client
				._make_request(`/project/${id}`, "GET")
				.then((res) => {
					console.log(res);
					res.json().then((data) => {
						const projectInfo: IProject = JSON.parse(JSON.stringify(data));
						resolve(new Project(this.client, projectInfo));
					});
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	search(query: string, searchOptions?: SearchOptions) {
		return new Promise((resolve, reject) => {
			let params = new URLSearchParams({
				query,
			});

			if (searchOptions != undefined) {
				if (searchOptions.facets != undefined) {
					params.append("facets", JSON.stringify(searchOptions.facets));
				}
				if (searchOptions.limit != undefined) {
					params.append("limit", searchOptions.limit.toString());
				}
				if (searchOptions.sorting != undefined) {
					params.append("index", searchOptions.sorting);
				}
				if (searchOptions.offset != undefined) {
					params.append("offset", searchOptions.offset.toString());
				}
			}

			this.client
				._make_request(`/search?${params.toString()}`, "GET")
				.then((res) => {
					res.json().then((data) => {
						let result: SearchResult = JSON.parse(JSON.stringify(data));

						resolve(result);
					});
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}

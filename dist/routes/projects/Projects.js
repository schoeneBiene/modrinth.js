"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = __importDefault(require("../../classes/Project"));
class Projects {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * Gets a project by its ID or slug.
     * @param id Slug or ID of the project.
     * @returns Promise of the project.
     */
    get(id) {
        return new Promise((resolve, reject) => {
            this.client
                ._make_request(`/project/${id}`, "GET")
                .then((res) => {
                console.log(res);
                res.json().then((data) => {
                    const projectInfo = JSON.parse(JSON.stringify(data));
                    resolve(new Project_1.default(this.client, projectInfo));
                });
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    search(query, searchOptions) {
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
                    let result = JSON.parse(JSON.stringify(data));
                    resolve(result);
                });
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
}
exports.default = Projects;

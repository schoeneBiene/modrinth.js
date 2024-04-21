"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = void 0;
class Gallery {
    galleryEntries;
    id;
    constructor(client, galleryData, projectId) {
        this.galleryEntries = galleryData;
        this.id = projectId;
    }
    getEntries() {
        return this.galleryEntries;
    }
    createEntry(img, options) { }
}
exports.Gallery = Gallery;
class Project {
    client;
    client_side;
    server_side;
    game_versions;
    id;
    slug;
    project_type;
    team;
    organization;
    title;
    description;
    body;
    body_url;
    published;
    updated;
    approved;
    queued;
    status;
    requested_status;
    moderator_message;
    license;
    downloads;
    followers;
    categories;
    additional_categories;
    loaders;
    versions;
    icon_url;
    issues_url;
    source_url;
    wiki_url;
    discord_url;
    donation_urls;
    gallery;
    galleryEntries;
    color;
    thread_id;
    monetization_status;
    constructor(client, projectInfo) {
        this.client = client;
        this.client_side = projectInfo.client_side;
        this.server_side = projectInfo.server_side;
        this.game_versions = projectInfo.game_versions;
        this.id = projectInfo.id;
        this.slug = projectInfo.slug;
        this.project_type = projectInfo.project_type;
        this.team = projectInfo.team;
        this.organization = projectInfo.organization;
        this.title = projectInfo.title;
        this.description = projectInfo.description;
        this.body = projectInfo.body;
        this.body_url = projectInfo.body_url;
        this.published = projectInfo.published;
        this.updated = projectInfo.updated;
        this.approved = projectInfo.approved;
        this.queued = projectInfo.queued;
        this.status = projectInfo.status;
        this.requested_status = projectInfo.requested_status;
        this.moderator_message = projectInfo.moderator_message;
        this.license = projectInfo.license;
        this.downloads = projectInfo.downloads;
        this.followers = projectInfo.followers;
        this.categories = projectInfo.categories;
        this.additional_categories = projectInfo.additional_categories;
        this.loaders = projectInfo.loaders;
        this.versions = projectInfo.versions;
        this.icon_url = projectInfo.icon_url;
        this.issues_url = projectInfo.issues_url;
        this.source_url = projectInfo.source_url;
        this.wiki_url = projectInfo.wiki_url;
        this.discord_url = projectInfo.discord_url;
        this.donation_urls = projectInfo.donation_urls;
        this.gallery = new Gallery(this.client, projectInfo.galleryEntries, this.id);
        this.galleryEntries = projectInfo.galleryEntries;
        this.color = projectInfo.color;
        this.thread_id = projectInfo.thread_id;
        this.monetization_status = projectInfo.monetization_status;
    }
    /**
     * Follows the project.
     * @returns Promise<void>
     */
    follow() {
        return new Promise((resolve, reject) => {
            this.client
                ._make_request(`/project/${this.id}/follow`, "POST")
                .then(() => {
                resolve();
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    /**
     * Unfollow the project
     * @returns Promise<void>
     */
    unfollow() {
        return new Promise((resolve, reject) => {
            this.client
                ._make_request(`/project/${this.id}/follow`, "DELETE")
                .then(() => {
                resolve();
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    /**
     * Edits the project
     * @param editOptions Properties to edit
     */
    edit(editOptions, doNotRefetch) {
        return new Promise((resolve, reject) => {
            this.client
                ._make_request(`/project/${this.id}`, "PATCH", editOptions)
                .then(() => {
                if (doNotRefetch != true) {
                    this.refetch().then(() => {
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            })
                .catch((reason) => {
                reject(reason);
            });
        });
    }
    /**
     * Refetches Project Information
     */
    refetch() {
        return new Promise((resolve, reject) => {
            this.client
                ._make_request(`/project/${this.id}`, "GET")
                .then((res) => {
                res
                    .json()
                    .then((data) => {
                    let projectInfo = JSON.parse(JSON.stringify(data));
                    this.setProperties(projectInfo);
                    resolve();
                })
                    .catch((reason) => {
                    reject(reason);
                });
            })
                .catch((reason) => {
                reject(reason);
            });
        });
    }
    setProperties(projectInfo) {
        this.client_side = projectInfo.client_side;
        this.server_side = projectInfo.server_side;
        this.game_versions = projectInfo.game_versions;
        this.id = projectInfo.id;
        this.slug = projectInfo.slug;
        this.project_type = projectInfo.project_type;
        this.team = projectInfo.team;
        this.organization = projectInfo.organization;
        this.title = projectInfo.title;
        this.description = projectInfo.description;
        this.body = projectInfo.body;
        this.body_url = projectInfo.body_url;
        this.published = projectInfo.published;
        this.updated = projectInfo.updated;
        this.approved = projectInfo.approved;
        this.queued = projectInfo.queued;
        this.status = projectInfo.status;
        this.requested_status = projectInfo.requested_status;
        this.moderator_message = projectInfo.moderator_message;
        this.license = projectInfo.license;
        this.downloads = projectInfo.downloads;
        this.followers = projectInfo.followers;
        this.categories = projectInfo.categories;
        this.additional_categories = projectInfo.additional_categories;
        this.loaders = projectInfo.loaders;
        this.versions = projectInfo.versions;
        this.icon_url = projectInfo.icon_url;
        this.issues_url = projectInfo.issues_url;
        this.source_url = projectInfo.source_url;
        this.wiki_url = projectInfo.wiki_url;
        this.discord_url = projectInfo.discord_url;
        this.donation_urls = projectInfo.donation_urls;
        this.gallery = new Gallery(this.client, projectInfo.galleryEntries, this.id);
        this.color = projectInfo.color;
        this.thread_id = projectInfo.thread_id;
        this.monetization_status = projectInfo.monetization_status;
    }
}
exports.default = Project;

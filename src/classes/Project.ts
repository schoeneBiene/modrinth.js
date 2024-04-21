import BaseInterface from "..//BaseInterface";
import ModrinthClient from "../ModrinthClient";
import { MonetizationStatus } from "../enums/projects/MonetizationStatus";
import { ProjectStatus } from "../enums/projects/ProjectStatus";
import { ProjectType } from "../enums/tags/ProjectType";
import { SideType } from "../enums/tags/SideType";
import { GalleryCreationOptions } from "../types/projects/GalleryCreationOptions";
import { ProjectEditOptions } from "../types/projects/ProjectEditOptions";

export interface IProject extends BaseInterface {
	client_side: SideType;
	server_side: SideType;
	game_versions: string[];
	slug: string;
	project_type: ProjectType;
	team: string;
	organization: any;
	title: string;
	description: string;
	body: string;
	body_url: any;
	published: string;
	updated: string;
	approved: string | null;
	queued: string | null;
	status: ProjectStatus;
	requested_status: ProjectStatus;
	moderator_message: any;
	license: License;
	downloads: number;
	followers: number;
	categories: string[];
	additional_categories: any[];
	loaders: string[];
	versions: string[];
	icon_url: string;
	issues_url: string;
	source_url: string;
	wiki_url: string;
	discord_url: string;
	donation_urls: DonationUrl[];
	gallery: Gallery;
	galleryEntries: IGalleryEntry[];
	color: number;
	thread_id: string;
	monetization_status: MonetizationStatus;
}

export interface License {
	id: string;
	name: string;
	url: string;
}

export interface DonationUrl {
	id: string;
	platform: string;
	url: string;
}

export interface IGalleryEntry {
	url: string;
	featured: boolean;
	title: string;
	description: string;
	created: string;
	ordering: number;
}

export class Gallery {
	private galleryEntries: IGalleryEntry[];
	private id: string;

	constructor(
		client: ModrinthClient,
		galleryData: IGalleryEntry[],
		projectId: string
	) {
		this.galleryEntries = galleryData;
		this.id = projectId;
	}

	public getEntries() {
		return this.galleryEntries;
	}

	public createEntry(img: File, options: GalleryCreationOptions) {}
}

export default class Project implements IProject {
	private client: ModrinthClient;

	client_side: SideType;
	server_side: SideType;
	game_versions: string[];
	id: string;
	slug: string;
	project_type: ProjectType;
	team: string;
	organization: any;
	title: string;
	description: string;
	body: string;
	body_url: any;
	published: string;
	updated: string;
	approved: string | null;
	queued: string | null;
	status: ProjectStatus;
	requested_status: ProjectStatus;
	moderator_message: any;
	license: License;
	downloads: number;
	followers: number;
	categories: string[];
	additional_categories: any[];
	loaders: string[];
	versions: string[];
	icon_url: string;
	issues_url: string;
	source_url: string;
	wiki_url: string;
	discord_url: string;
	donation_urls: DonationUrl[];
	gallery: Gallery;
	galleryEntries: IGalleryEntry[];
	color: number;
	thread_id: string;
	monetization_status: MonetizationStatus;

	constructor(client: ModrinthClient, projectInfo: IProject) {
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
		this.gallery = new Gallery(
			this.client,
			projectInfo.galleryEntries,
			this.id
		);
		this.galleryEntries = projectInfo.galleryEntries;
		this.color = projectInfo.color;
		this.thread_id = projectInfo.thread_id;
		this.monetization_status = projectInfo.monetization_status;
	}

	/**
	 * Follows the project.
	 * @returns Promise<void>
	 */
	public follow(): Promise<void> {
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
	public unfollow(): Promise<void> {
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
	public edit(
		editOptions: ProjectEditOptions,
		doNotRefetch?: boolean
	): Promise<void> {
		return new Promise((resolve, reject) => {
			this.client
				._make_request(`/project/${this.id}`, "PATCH", editOptions)
				.then(() => {
					if (doNotRefetch != true) {
						this.refetch().then(() => {
							resolve();
						});
					} else {
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
	public refetch(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.client
				._make_request(`/project/${this.id}`, "GET")
				.then((res) => {
					res
						.json()
						.then((data) => {
							let projectInfo: IProject = JSON.parse(JSON.stringify(data));

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

	private setProperties(projectInfo: IProject) {
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
		this.gallery = new Gallery(
			this.client,
			projectInfo.galleryEntries,
			this.id
		);
		this.color = projectInfo.color;
		this.thread_id = projectInfo.thread_id;
		this.monetization_status = projectInfo.monetization_status;
	}
}

import { IGalleryEntry } from "../../classes/Project";
import { MonetizationStatus } from "../../enums/projects/MonetizationStatus";
import { Category } from "../../enums/tags/Category";
import { GameVersion } from "../../enums/tags/GameVersion";
import { SideType } from "../../enums/tags/SideType";

export interface SearchHit {
	slug: string;
	title: string;
	description: string;
	categories: Category[];
	client_side: SideType;
	server_side: SideType;
	project_type: string;
	downloads: number;
	icon_url: string;
	color: number;
	thread_id: string;
	monetization_status: MonetizationStatus;
	project_id: string;
	author: string;
	display_categories: Category[];
	versions: GameVersion[];
	follows: number;
	date_created: string;
	date_modified: string;
	latest_version: string;
	license: string;
	gallery: IGalleryEntry[];
	featured_gallery: IGalleryEntry[];
}

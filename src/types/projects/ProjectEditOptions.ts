import { ProjectStatus } from "../../enums/projects/ProjectStatus";
import { Category } from "../../enums/tags/Category";
import { SideType } from "../../enums/tags/SideType";

export type ProjectEditOptions = {
	slug?: string;
	title?: string;
	description?: string;
	categories?: Category[];
	client_side?: SideType;
	server_side?: SideType;
	body?: string;
	status?: ProjectStatus;
	requested_status?: ProjectStatus;
	additional_categories?: Category[];
	issues_url?: string | null;
	source_url?: string | null;
	wiki_url?: string | null;
	discord_url?: string | null;
	donation_url?: string | null;
	license_id?: string;
	license_url?: string | null;
	moderation_message?: string | null;
	moderation_message_body?: string | null;
};

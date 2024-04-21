import * as https from "https";
import Projects from "./routes/projects/Projects";

export default class ModrinthClient {
	public userAgent: string;
	public authorization?: string | undefined;
	public baseUrl?: string;

	/**
	 * Makes a new ModrinthClient instance.
	 * @param userAgent The user agent to use. Read https://docs.modrinth.com/#section/User-Agents for more information.
	 * @param authorization Optional authorization token. Read https://docs.modrinth.com/#section/Authorization for more information.
	 * @param baseUrl The base URL to use. Defaults to "https://api.modrinth.com/v2".
	 */
	constructor(userAgent: string, authorization?: string, baseUrl?: string) {
		this.userAgent = userAgent;
		this.authorization = authorization;

		if (baseUrl) {
			this.baseUrl = baseUrl;
		} else {
			this.baseUrl = "https://api.modrinth.com/v2";
		}
	}

	public _make_request(
		endpoint: string,
		method: string,
		data?: any
	): Promise<Response> {
		return new Promise((resolve, reject) => {
			const full_url = this.baseUrl + endpoint;

			fetch(full_url, {
				method: method,
				headers: {
					"User-Agent": this.userAgent,
					"Content-Type": "application/json",
					...(this.authorization ? { Authorization: this.authorization } : {}),
				},
				body: JSON.stringify(data),
			})
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	projects: Projects = new Projects(this);
}

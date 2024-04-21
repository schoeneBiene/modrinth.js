"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Projects_1 = __importDefault(require("./routes/projects/Projects"));
class ModrinthClient {
    userAgent;
    authorization;
    baseUrl;
    /**
     * Makes a new ModrinthClient instance.
     * @param userAgent The user agent to use. Read https://docs.modrinth.com/#section/User-Agents for more information.
     * @param authorization Optional authorization token. Read https://docs.modrinth.com/#section/Authorization for more information.
     * @param baseUrl The base URL to use. Defaults to "https://api.modrinth.com/v2".
     */
    constructor(userAgent, authorization, baseUrl) {
        this.userAgent = userAgent;
        this.authorization = authorization;
        if (baseUrl) {
            this.baseUrl = baseUrl;
        }
        else {
            this.baseUrl = "https://api.modrinth.com/v2";
        }
    }
    _make_request(endpoint, method, data) {
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
    projects = new Projects_1.default(this);
}
exports.default = ModrinthClient;

const { ModrinthClient } = require("../dist");

require("dotenv").config();

const modrinth = new ModrinthClient(
	"modrinth2 test",
	process.env.MODRINTH_TOKEN
);

const projectSlug = process.env.PROJECT_SLUG;
console.log(projectSlug);

modrinth.projects.get(projectSlug).then((project) => {
	project
		.edit({
			description: "Hello World!",
		})
		.then(() => {
			console.log(project);
		})
		.catch((err) => {
			throw err;
		});
});

const modrinth2 = require("../dist/index");

require("dotenv").config();

const client = new modrinth2.ModrinthClient(
	"ModrinthClient-test",
	process.env.MODRINTH_TOKEN
);

client.projects
	.get("sodium")
	.then((project) => {
		console.log(project);
		console.log(project.loaders);
		console.log(project.client);

		project
			.follow()
			.then(() => {
				console.log("Followed");

				project.unfollow().then(() => {
					console.log("Unfollowed");
				});
			})
			.catch((error) => {
				console.log(error);
			});
	})
	.catch((error) => {
		console.log(error);
	});

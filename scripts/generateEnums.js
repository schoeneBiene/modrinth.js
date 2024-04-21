const fs = require("fs");

function make_request(endpoint, method) {
	return new Promise((resolve, reject) => {
		const full_url = "https://api.modrinth.com/v2" + endpoint;

		fetch(full_url, {
			method: method,
			headers: {
				"User-Agent":
					"Modrinth Enum Generator (https://gist.github.com/schoeneBiene/79d6e9363432658ea512e6f6b44d3a28)",
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

if (!fs.existsSync("./enumOut")) {
	fs.mkdirSync("./enumOut");
}

make_request("/tag/category", "GET").then((res) => {
	res.json().then((data) => {
		let e = "export enum Category {\n";
		let added = [];

		data.forEach((tagData) => {
			if (added.includes(tagData.name)) {
				return;
			}

			added.push(tagData.name);

			let enumName = tagData.name.replace("-", "_");

			if (/^\d/.test(enumName)) {
				enumName = enumName.slice(0, -1);
				enumName = "x" + enumName;
			}

			e = e + enumName.toUpperCase() + ' = "' + tagData.name + '",\n';
		});

		e += "}";

		fs.writeFileSync("./enumOut/Category.ts", e, {
			flag: "w",
		});

		console.log("Generated category enum.");
	});
});

make_request("/tag/loader", "GET").then((res) => {
	res.json().then((data) => {
		let e = "export enum Loader {\n";
		let added = [];

		data.forEach((tagData) => {
			if (added.includes(tagData.name)) {
				return;
			}

			added.push(tagData.name);

			let enumName = tagData.name.replace("-", "_");

			e = e + enumName.toUpperCase() + ' = "' + tagData.name + '",\n';
		});

		e += "}";

		fs.writeFileSync("./enumOut/Loaders.ts", e, {
			flag: "w",
		});

		console.log("Generated loader enum.");
	});
});

make_request("/tag/game_version", "GET").then((res) => {
	res.json().then((data) => {
		let e = "export enum GameVersion {\n";
		let added = [];

		data.forEach((tagData) => {
			if (added.includes(tagData.version)) {
				return;
			}

			added.push(tagData.version);

			let enumName = tagData.version;
			enumName = enumName.replace(/\./g, "_");
			enumName = enumName.replace(/\-/g, "_");

			e = e + "V" + enumName.toUpperCase() + ' = "' + tagData.version + '",\n';
		});

		e += "}";

		fs.writeFileSync("./enumOut/GameVersion.ts", e, {
			flag: "w",
		});

		console.log("Generated game version enum.");
	});
});

make_request("/tag/project_type", "GET").then((res) => {
	res.json().then((data) => {
		let e = "export enum ProjectType {\n";
		let added = [];

		data.forEach((name) => {
			if (added.includes(name)) {
				return;
			}

			added.push(name);

			let enumName = name;

			e = e + enumName.toUpperCase() + ' = "' + name + '",\n';
		});

		e += "}";

		fs.writeFileSync("./enumOut/ProjectType.ts", e, {
			flag: "w",
		});

		console.log("Generated project type enum.");
	});
});

make_request("/tag/side_type", "GET").then((res) => {
	res.json().then((data) => {
		let e = "export enum SideType {\n";
		let added = [];

		data.forEach((name) => {
			if (added.includes(name)) {
				return;
			}

			added.push(name);

			let enumName = name.replace("-", "_");

			e = e + enumName.toUpperCase() + ' = "' + name + '",\n';
		});

		e += "}";

		fs.writeFileSync("./enumOut/SideType.ts", e, {
			flag: "w",
		});

		console.log("Generated side type enum.");
	});
});

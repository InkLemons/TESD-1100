const projItems = [
	{
		title: "TypeHaven - A typing website concept by InkLemons",
		url: "https://github.com/InkLemons/TypeHaven",
		description:
			"An early attempt at making a full-scale website, I was challenged to do so by my computer science teacher in high school since I needed an extra credit for my CTE Pathway but already knew the material of the class.",
	},
	{
		title: "REAP",
		url: "#",
		description:
			"When Unity first switch to their pay-per-download business model, I took upon myself the challenge of learning godot, and this was the game I had made to learn. The game was a small roguelike where you would fight through a room of enemies and get bonuses at the end of each level. This is also the project that got me into pixel art through aseprite.",
	},
	{
		title: "NecroWear",
		url: "#",
		description:
			"A clothing brand that I helped start with the help of one of my friends, dedicated to making clothing so fresh it could put you in the grave. Although the name could still use some work we came up with a couple of really cool designs that helped kickstart the idea. Although only run in person for now, I would like to one day create the website for it, and use it as a side hustle while also being able to persue my dream of becoming a software engineer.",
	},
];

const projectsUl = document.getElementById("project-list");

projItems.forEach((projItem) => {
	const projTitle = projItem.title;
	const projUrl = projItem.url;
	const projDesc = projItem.description;

	const projectCont = document.createElement("li");

	/* Create Project Title */
	const projectItem = document.createElement("ul");
	projectItem.classList.add("project");
	const titleText = document.createElement("h1");
	titleText.textContent = projTitle;
	projectItem.appendChild(titleText);

	/* Add Description and Link */
	const urlItem = document.createElement("li");
	const urlCont = document.createElement("a");
	urlCont.setAttribute("href", projUrl);
	urlCont.setAttribute("target", "_blank");
	urlCont.textContent = projUrl;
	urlItem.appendChild(urlCont);

	const descItem = document.createElement("li");
	const descCont = document.createElement("p");
	descCont.textContent = projDesc;
	descItem.appendChild(descCont);

	const descLinkContain = document.createElement("div");

	/* Appending elements to each other */
	descLinkContain.appendChild(urlItem);
	descLinkContain.appendChild(descItem);

	projectItem.appendChild(descLinkContain);

	projectCont.appendChild(projectItem);

	projectsUl.appendChild(projectCont);

	projectItem.addEventListener("click", () => {
		descLinkContain.classList.toggle("active");
		projectItem.classList.toggle("active");
	});
});

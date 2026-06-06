import * as Carousel from "./Carousel.js";
import { API_KEY } from "./keys.js";

const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");
const progressBar = document.getElementById("progressBar");
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;

axios.interceptors.request.use((config) => {
	console.log("Request started");

	config.startTime = Date.now();
	progressBar.style.width = "0%";
	document.body.style.cursor = "progress";

	return config;
});

axios.interceptors.response.use((response) => {
	const endTime = Date.now();
	const requestTime = endTime - response.config.startTime;

	console.log(`Request took ${requestTime}ms`);

	progressBar.style.width = "100%";
	document.body.style.cursor = "default";

	return response;
});

function updateProgress(event) {
	console.log(event);

	if (event.total) {
		const percent = Math.round((event.loaded / event.total) * 100);
		progressBar.style.width = `${percent}%`;
	}
}

async function initialLoad() {
	const response = await axios.get("/breeds", {
		onDownloadProgress: updateProgress
	});

	const breeds = response.data;

	breeds.forEach((breed) => {
		const option = document.createElement("option");

		option.value = breed.id;
		option.textContent = breed.name;

		breedSelect.appendChild(option);
	});

	breedSelect.dispatchEvent(new Event("change"));
}

breedSelect.addEventListener("change", async (e) => {
	const breedId = e.target.value;

	const response = await axios.get(`/images/search?breed_ids=${breedId}&limit=10`, {
		onDownloadProgress: updateProgress
	});

	const images = response.data;

	Carousel.clear();
	infoDump.innerHTML = "";

	images.forEach((image) => {
		const item = Carousel.createCarouselItem(
			image.url,
			image.breeds[0]?.name || "Cat image",
			image.id
		);

		Carousel.appendCarousel(item);
	});

	Carousel.start();

	const breed = images[0]?.breeds[0];

	if (breed) {
		infoDump.innerHTML = `
			<h2>${breed.name}</h2>
			<p><strong>Origin:</strong> ${breed.origin || "Unknown"}</p>
			<p><strong>Temperament:</strong> ${breed.temperament || "Unknown"}</p>
			<p><strong>Life span:</strong> ${breed.life_span || "Unknown"} years</p>
			<p><strong>Description:</strong> ${breed.description || "No description available."}</p>
		`;
	} else {
		infoDump.innerHTML = `
			<h2>No breed information found</h2>
			<p>This breed may not have images or full breed data available.</p>
		`;
	}
});

export async function favourite(imgId) {
	const response = await axios.get("/favourites");
	const favourites = response.data;

	const foundFavourite = favourites.find((fav) => {
		return fav.image_id === imgId;
	});

	if (foundFavourite) {
		await axios.delete(`/favourites/${foundFavourite.id}`);
		console.log("Removed from favourites");
	} else {
		await axios.post("/favourites", {
			image_id: imgId
		});

		console.log("Added to favourites");
	}
}

async function getFavourites() {
	const response = await axios.get("/favourites", {
		onDownloadProgress: updateProgress
	});

	const favourites = response.data;

	Carousel.clear();

	infoDump.innerHTML = `
		<h2>Your Favourite Cats</h2>
		<p>These are your saved cat images.</p>
	`;

	favourites.forEach((fav) => {
		const item = Carousel.createCarouselItem(
			fav.image.url,
			"Favourite cat image",
			fav.image_id
		);

		Carousel.appendCarousel(item);
	});

	Carousel.start();
}

getFavouritesBtn.addEventListener("click", getFavourites);

initialLoad();
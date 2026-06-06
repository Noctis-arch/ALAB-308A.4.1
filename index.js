import * as Carousel from './Carousel.js';
import { API_KEY } from './keys.js';

// import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById('breedSelect');
// The information section div element.
const infoDump = document.getElementById('infoDump');
// The progress bar div element.
const progressBar = document.getElementById('progressBar');
// The get favourites button element.
const getFavouritesBtn = document.getElementById('getFavouritesBtn');

// Step 0: Store your API key in the keys.js file.

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

// async function initialLoad() {
// 	const response = await fetch('https://api.thecatapi.com/v1/breeds', {
// 		headers: { 'x-api-key': API_KEY },
// 	});
// 	const breeds = await response.json();
// 	breeds.forEach((breed) => {
// 		const option = document.createElement('option');
// 		option.value = breed.id;
// 		option.textContent = breed.name;
// 		breedSelect.appendChild(option);
// 	});
// 	breedSelect.dispatchEvent(new Event('change'));
// }
// initialLoad();

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

// breedSelect.addEventListener('change', async (e) => {
// 	const breedId = e.target.value;
// 	const response = await fetch(
// 		`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=10`,
// 		{ headers: { 'x-api-key': API_KEY } },
// 	);
// 	const images = await response.json();
// 	Carousel.clear();
// 	images.forEach((image) => {
// 		const item = Carousel.createCarouselItem(image.url, image.id, image.id);
// 		Carousel.appendCarousel(item);
// 	});
// 	Carousel.start();
// 	console.log(images);

// 	const breed = images[0]?.breeds[0];
// 	if (breed) {
// 		infoDump.innerHTML = `
//       <h2>${breed.name}</h2>
//       <p><strong>Origin:</strong> ${breed.origin}</p>
//       <p><strong>Temperament:</strong> ${breed.temperament}</p>
//       <p><strong>Life span:</strong> ${breed.life_span} years</p>
//     `;
// 	}
// });

/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
	// your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */

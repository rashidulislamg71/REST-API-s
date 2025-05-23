// API Lists
// 1. https://random.dog/woof.json
// 2. https://cataas.com/cat
// 3. https://thispersondoesnotexist.com/
// 4. https://goweather.herokuapp.com/weather/toronto
// 5. http://universities.hipolabs.com/search?name=university&country=bangladesh
// 6. https://api.kanye.rest/

// Get Random Dog Image
async function getRandomDogImage() {
  const url = "https://random.dog/woof.json";
  const response = await fetch(url);
  const data = await response.json();

  const isVideo = data.url.endsWith(".mp4");

  const dog_img = document.getElementById("dog_img");
  const dog_video = document.getElementById("dog_video");

  if (isVideo) {
    dog_img.style.display = "none";
    dog_video.style.display = "block";
    dog_video.src = data.url;
  } else {
    dog_img.style.display = "block";
    dog_video.style.display = "none";
    dog_img.src = data.url;
  }
}
setInterval(getRandomDogImage, 3000);

// Get Random Dog Image
async function getRandomCatImage() {
  const data = "https://cataas.com/cat?t=" + new Date().getTime();
  document.getElementById("catImage").src = data;
}
setInterval(getRandomCatImage, 3000);

// get random quotes
async function readRandomQuotes() {
  const url = "https://api.kanye.rest?t=/" + new Date().getTime();
  const response = await axios.get(url);
  const data = response.data;
  document.getElementById("new").innerHTML = `"${data.quote}"`;
}
setInterval(readRandomQuotes, 3000);

// List of Universities in different countries.

const country_name_search = document.getElementById("country_name_search");
const search = document.getElementById("search");
const versity_list = document.getElementById("universitie_list_container");
const total_versity = document.getElementById("universite_number");

// The main function of the show university list in the country
async function universitiesList(countryName = "Bangladesh") {
  const url = `http://universities.hipolabs.com/search?name=university&country=${countryName}`;
  
  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.length === 0) {
      versity_list.innerHTML = `<p class="text-red-500">No universities found for "${capitalize(countryName)}".</p>`;
      total_versity.innerHTML = "";
      return;
    }

    const versity_details = data.map((value) => {
      return ` 
      <li class="p-[10px] border w-[300px]">
        <h3 class="text-[#115940] font-bold text-lg">${value.name}</h3>
        <p><strong>Domain:</strong> ${value.domains.join(", ")}</p>
        <p><strong>Website:</strong> <a href="${value.web_pages[0]}" target="_blank" class="text-blue-500 underline">
          ${value.web_pages[0]}</a></p>
      </li>`;
    });

    versity_list.innerHTML = versity_details.join("");
    total_versity.innerHTML = `<strong>Total Universities of ${capitalize(countryName)}: ${versity_details.length}</strong>`;

  } catch (error) {
    versity_list.innerHTML = `<p class="text-red-500">Something went wrong. Please try again.</p>`;
    total_versity.innerHTML = "";
  }
}

// form submit handler
country_name_search.addEventListener("submit", (e) => {
  e.preventDefault();
  const countryName = search.value.trim();
  if (countryName === "") {
    universitiesList("Bangladesh"); // default will show Bangladesh
  } else {
    universitiesList(countryName);
  }
});

// When the page loads, the default will show Bangladesh. 
window.addEventListener("DOMContentLoaded", () => {
  universitiesList(); 
});

//Capitalize the first letter
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

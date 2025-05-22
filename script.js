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
};
setInterval(getRandomDogImage, 3000)

// Get Random Dog Image
async function getRandomCatImage() {
  const data = "https://cataas.com/cat?t=" + new Date().getTime();
  document.getElementById("catImage").src = data;
};
setInterval(getRandomCatImage, 3000);

// get random quotes
async function readRandomQuotes (){
  const url = "https://api.kanye.rest?t=/" + new Date().getTime();
  const response = await axios.get(url);
  const data = response.data;
  console.log(data)
  document.getElementById("new").innerHTML = `"${data.quote}"`
};
setInterval(readRandomQuotes, 3000);


const key = "yqEbQdLzdWOtrk6-5VUUJ1qhmIj2yIdSZWqy_NcUiNo";
const formEl = document.querySelector("form");
const resultImages = document.querySelector(".result-images");
const inputEl = document.getElementById("search-box");
const showBtnEl = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;
async function searchResults() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`;
}
const response = await fetch(url);
const data = await response.json();

const results = data.results;

if (page == 1) {
  resultImages.innerHTML = "";

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("result-image");
    const image = document.createElement("img");
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.link.innerHTML;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(imageLink);
    imageWrapper.appendChild(image);
    resultImages.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showBtnEl.style.display = "block";
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchResults();
});

showBtnEl.addEventListener("click", () => {
  searchResults();
});

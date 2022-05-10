const newsAPI = 'feaaecacbf0d46b3bc7d60d0f1cecfcb'
const newsURL = 'https://newsapi.org/v2'
const dummyURL = 'http://localhost:3000/articles'

const keyApi = "a128deb2acfa4a31a8ec09a2f4614ccd";

const mediaStackAPI = "f681c422852f5ce7a6841f06c83caa95";
const getData = document.getElementById("getdata");
const URL = "https://newsapi.org/v2";
const btn = document.querySelector("button");
const leftSectionH1 = document.querySelector(".left-section h1");
const rightSectionImg = document.querySelector(".right-section img");
const leftSectionSpan = document.querySelector(".left-section span");
const leftSectionTime = document.querySelector(".time span");
const author = document.querySelector(".author");
const search = document.querySelector("#search");
const searchDisplay = document.querySelector(".search-display");

let currentDate = new Date();

function displaySearch() {
  fetch(`${dummyURL}?_sort=publishedAt&_order=desc`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data[0]);
      //   console.log(search.value);
      leftSectionH1.innerHTML = data[0].title;
      rightSectionImg.src=data[0].urlToImage
      leftSectionSpan.innerHTML = data[0].description;
      leftSectionTime.innerHTML = data[0].publishedAt;
      author.innerHTML = data[0].author;
    });
}
displaySearch();

search.addEventListener("input", (e) => {
    e = event.target.value;
    if (e === "") {
      searchDisplay.setAttribute("data-display", "false");
    } else {
      searchDisplay.setAttribute("data-display", "true");
      fetch(`http://localhost:3000/articles?q=${e}&_order=desc`)
        .then((res) => res.json())
        .then((dataSearch) => {
            searchDisplay.innerHTML=''
            for(let i=0; i<10;i++){
                // console.log(dataSearch);
                searchDisplay.innerHTML+=`<a href="#" target="_blank" data-link><span class="title">${dataSearch[i].publishedAt} ${dataSearch[i].title} </span></a>`
                const linked = document.querySelector('[data-link]')
                linked.href=dataSearch[i].url
            }
        });
    }
  });

  

// search.addEventListener("blur", () => {
//   searchDisplay.setAttribute("data-display", "false");
// });



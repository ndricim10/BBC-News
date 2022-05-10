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
  fetch(`http://api.mediastack.com/v1/news?access_key=${mediaStackAPI}
&languages=en
&sort=published_desc`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.data[0]);
      //   console.log(search.value);
      leftSectionH1.innerHTML = data.data[0].title;
      // rightSectionImg.src=data.data[0].image
      leftSectionSpan.innerHTML = data.data[0].description;
      leftSectionTime.innerHTML = data.data[0].published_at;
      author.innerHTML = data.data[0].author;

     
    });
}
displaySearch();

search.addEventListener("input", (e) => {
    e = event.target.value;
    if (e === "") {
      searchDisplay.setAttribute("data-display", "false");
    } else {
      searchDisplay.setAttribute("data-display", "true");
      fetch(`http://api.mediastack.com/v1/news?access_key=${mediaStackAPI}
&languages=en
&sort=published_desc
&keywords=${e}`)
        .then((res) => res.json())
        .then((dataSearch) => {
            searchDisplay.innerHTML=''
            for(let i=0; i<10;i++){
                console.log(dataSearch.data[i].title);
                searchDisplay.innerHTML+=`<a href="#" target="_blank" data-link><span class="title">${dataSearch.data[i].published_at} ${dataSearch.data[i].title} </span></a>`
                const linked = document.querySelector('[data-link]')
                console.log(linked);
                linked.href=dataSearch.data[i].url
            }

          
        });
    }
  });

  

// search.addEventListener("blur", () => {
//   searchDisplay.setAttribute("data-display", "false");
// });

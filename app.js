const newsAPI = 'feaaecacbf0d46b3bc7d60d0f1cecfcb'
const newsURL = 'https://newsapi.org/v2'
const articlesURL = 'http://localhost:3000/articles'
const adminURL = 'http://localhost:3000/admin'
const bbcLogo = document.querySelector('.bbc-logo')
bbcLogo.href = "./index.html"
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
const dataFirstLink = document.querySelector('[data-first-link]')
const dataSecondLink = document.querySelector('[data-second-link]')
const lgLeft = document.querySelector('.lg3-left')
const lgRight = document.querySelector('.lg3-right')
const dataFirstA = document.querySelector('[data-first-a]')


function displayFirstSection() {
  fetch(`${articlesURL}?_sort=publishedAt&_order=desc&q=u`)
    .then((res) => res.json())
    .then((data) => {
        // console.log(data[0]);
        dataFirstA.href=data[0].url
      leftSectionH1.innerHTML = data[0].title;
      rightSectionImg.src=data[0].urlToImage
      leftSectionSpan.innerHTML = data[0].description;
      leftSectionTime.innerHTML = data[0].publishedAt;
      author.innerHTML = data[0].author;
      

      // RIGHT SECTION
      for(let i=1; i<4; i++){
        var aDay =  new Date(Date.now()) -new Date(`${data[i].publishedAt}`).getTime()
        
        
        // console.log(timeSince(new Date(aDay - Date.now())), aDay);
        lgLeft.innerHTML+=`
        <div>
        <span class="minutes">${timeSince(new Date(Date.now()-aDay))}</span>
    <a href="${data[i].url}" target="_blank"><span class="title-u">${data[i].title}</span></a>
    </div>`
      }


      // lg-3-right

      lgRight.innerHTML=`<a href="${data[4].url}" target="_blank">
      <img src="${data[4].urlToImage}">
  <h4>${data[4].title}</h4>
  <span>${data[4].description}</span>

  <div class="time">
      <i class="fal fa-clock"></i>
      <span class="span-time">${data[4].publishedAt}</span>
      <span class="author">${data[4].author}</span>
  </div>
  </a>`

      // SECOND SECTION
      dataFirstLink.innerText=data[1].title
      dataSecondLink.innerText=data[3].title
    });
}
displayFirstSection();

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
               ;
                searchDisplay.innerHTML+=`<a href="${dataSearch[i].url}" target="_blank" data-link><span class="title">
                ${dataSearch[i].title} </span></a>`
                const linked = document.querySelector('[data-link]')
                linked.href=dataSearch[i].url
            }
        });
    }
  });


// search.addEventListener("focusout", () => {
//   searchDisplay.setAttribute("data-display", "false");
// });



function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}









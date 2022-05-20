const newsAPI = 'feaaecacbf0d46b3bc7d60d0f1cecfcb'
const newsURL = 'https://newsapi.org/v2'
const articlesURL = 'http://localhost:3000/articles'
const adminURL = 'http://localhost:3000/admin'


const bbcLogo = document.querySelector('.bbc-logo')
bbcLogo.href = "./index.html"
const getData = document.getElementById("getdata");
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
const endSection = document.querySelector('.end-section')

const imageSport = document.querySelectorAll('[data-image-sport]')
const titleSport = document.querySelectorAll('[data-title-sport]')

const dataPopular = document.querySelectorAll('[data-popular]')


function displayFirstSection() {
  fetch(`https://newsapi.org/v2/top-headlines?q=ukraine&apiKey=feaaecacbf0d46b3bc7d60d0f1cecfcb&sortby=publishedAt&language=en`)
    .then((res) => res.json())
    .then((data) => {
        // console.log(data.articles[0]);
        let timeAgo =  new Date(Date.now()) -new Date(`${data.articles[0].publishedAt}`).getTime()
      // console.log(timeAgo);
        dataFirstA.href=data.articles[0].url
      leftSectionH1.innerHTML = data.articles[0].title;
      rightSectionImg.src=data.articles[0].urlToImage
      leftSectionSpan.innerHTML = data.articles[0].description;
      leftSectionTime.innerHTML = timeSince(new Date(Date.now()-timeAgo))
      author.innerHTML = data.articles[0].author;
      
      
      // RIGHT SECTION
      for(let i=1; i<4; i++){
        var aDay =  new Date(Date.now()) -new Date(`${data.articles[i].publishedAt}`).getTime()
        
        
        // console.log(timeSince(new Date(aDay - Date.now())), aDay);
        lgLeft.innerHTML+=`
        <div>
        <span class="minutes">${timeSince(new Date(Date.now()-aDay))}</span>
    <a href="${data.articles[i].url}" target="_blank"><span class="title-u">${data.articles[i].title}</span></a>
    </div>`
      }


      // lg-3-right

      lgRight.innerHTML=`<a href="${data.articles[4].url}" target="_blank">
      <img src="${data.articles[4].urlToImage}">
  <h4>${data.articles[4].title}</h4>
  <span>${data.articles[4].description}</span>

  <div class="time">
      <i class="fal fa-clock"></i>
      <span class="span-time">${timeSince(new Date(Date.now()-aDay))}</span>
      <span class="author">${data.articles[4].author}</span>
  </div>
  </a>`

      // SECOND SECTION
      dataFirstLink.innerText=data.articles[1].title
      dataSecondLink.innerText=data.articles[3].title

     
     
    });

    // SPORT SECTION
   
}
displayFirstSection();



const h4Categories = document.querySelectorAll('[data-h4-categories]')
const imageCategories = document.querySelectorAll('[data-image-categories]')

function categories(){
  fetch(`${articlesURL}?q=u`).then(res=>res.json()).then(data=>{
    for(let i=0;i<imageCategories.length;i++){
      imageCategories[i].src=data[i].urlToImage
      h4Categories[i].innerHTML=data[i].title
    }
  })
}
categories()

function sportSection(){
  fetch(`https://newsapi.org/v2/top-headlines?apiKey=feaaecacbf0d46b3bc7d60d0f1cecfcb&language=en&category=sports&sortBy=publishedAt`)
    .then((res) => res.json())
    .then((data) => {
    for(let i=0; i<imageSport.length;i++){
      // console.log(data[i].publishedAt);
      imageSport[i].src=data.articles[i].urlToImage
      titleSport[i].innerHTML=data.articles[i].title
    }
  })
}
sportSection()


function mostPopular(){
  fetch(`https://newsapi.org/v2/everything?apiKey=feaaecacbf0d46b3bc7d60d0f1cecfcb&sortby=popularity&language=en&q=ukraine`)
  .then((res) => res.json())
  .then((data) => {
    for(let i=0;i<dataPopular.length;i++){
      dataPopular[i].innerHTML=data.articles[i].title
    }
  })
  }
mostPopular()

search.addEventListener("input", (e) => {
    e = event.target.value;
    if (e === "") {
      searchDisplay.setAttribute("data-display", "false");
    } else {
      searchDisplay.setAttribute("data-display", "true");
      fetch(`${newsURL}/everything?q=${e}&apiKey=feaaecacbf0d46b3bc7d60d0f1cecfcb&sortBy=publishedAt&language=en`)
        .then((res) => res.json())
        .then((dataSearch) => {
            searchDisplay.innerHTML=''
            for(let i=0; i<dataSearch.articles.length;i++){
                // console.log(dataSearch.articles[i].publishedAt);
                searchDisplay.innerHTML+=`<a href="${dataSearch.articles[i].url}" target="_blank" data-link><span class="title">
                ${dataSearch.articles[i].title} </span></a>`
                const linked = document.querySelector('[data-link]')
                linked.href=dataSearch.articles[i].url
            }
        });
    }
  });

  const titleBusiness = document.querySelectorAll('[data-title-business]')
  const imageBusiness = document.querySelectorAll('[data-image-business]')
  
  function business(){
    fetch(`https://newsapi.org/v2/top-headlines?apiKey=feaaecacbf0d46b3bc7d60d0f1cecfcb&language=en&category=business&sortBy=publishedAt`)
    .then((res) => res.json())
    .then((data) => {
      
    console.log(data);
      for(let i=0; i<titleBusiness.length; i++){
        titleBusiness[i].innerHTML=data.articles[i].title
        imageBusiness[i].src=data.articles[i].urlToImage
      }
      })
  }
business()
// search.addEventListener("focusout", () => {
//   searchDisplay.setAttribute("data-display", "false");
// });



function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + "y";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "min";
  }
  return Math.floor(seconds) + " seconds";
}

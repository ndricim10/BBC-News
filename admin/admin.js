// Declare variables

const viewBtn = document.querySelector(".view");
const remove = document.querySelector(".remove");
const displayView = document.querySelector(".display-view");
const displayEdit = document.querySelector("[data-edit]");
const removeEdit = document.querySelector(".remove-edit");
const titles = document.querySelector(".display-api table");
const EditValues = document.querySelector(".btn-edit");
const createArticle = document.querySelector(".create-article");
const addButton = document.querySelector(".btn-add");
const deleteItem = document.querySelector(".delete-item");
const dataYes = document.querySelector("[data-yes]");
const dataNo = document.querySelector("[data-no]");
const removeAdd = document.querySelector(".remove-add");
const logOut = document.querySelector('[data-go-to-login]'),
filterArticles = document.querySelector('.filter-articles'),
dataFilter = document.querySelector('[data-filter]')
let getFilterAttribute = dataFilter.getAttribute('data-filter')
const dataDivFilter = document.querySelector('[data-div-filter]')

filterArticles.addEventListener('click', ()=>{
  if(getFilterAttribute==='false'){
    dataFilter.setAttribute('data-filter', 'true')
    dataDivFilter.setAttribute('data-div-filter', 'true')
    getFilterAttribute='true'
  }

  else{
    dataFilter.setAttribute('data-filter', 'false')
    dataDivFilter.setAttribute('data-div-filter', 'false')
    getFilterAttribute='false'
  }
})

let currentDate = new Date(Date.now())
let currentFullDate = currentDate.toLocaleDateString()
const searchInput = document.querySelector('[data-admin-search]'),
sortBy = document.querySelector('[data-sort]'),
pageSize = document.querySelector('[data-page-size]'),
dataFrom = document.querySelector('[data-from]'),
dataTo = document.querySelector('[data-to]'),
btnFilter = document.querySelector('[data-btn-filter]')


// Display articles
function displayTitles(pageSize, sort, from, to, search ) {
  fetch(`https://newsapi.org/v2/everything?apiKey=de8ffefdb1c34b05b43ba30cffd9e815&language=en&sortBy=${sort}&q=${search}&pageSize=${pageSize}&from=${from}&to=${to}`)
    .then((res) => res.json())
    .then((data) => {
      titles.innerHTML = ` 
      <span class="number-articles">${data.articles.length} articles</span>
      <tr>
        <th class="first-cell">Source</th>
        <th>Title</th>
        <th></th>
      </tr>`;
      for (let i = 0; i < data.articles.length; i++) {
        const tr = document.createElement("tr");
        titles.appendChild(tr);
        const tdFirst = document.createElement("td");
        tr.appendChild(tdFirst);
        tdFirst.classList.add("first-cell");
        tdFirst.innerHTML = data.articles[i].source.name;

        const tdSecond = document.createElement("td");
        tr.appendChild(tdSecond);
        tdSecond.innerHTML = data.articles[i].title;

        const tdThird = document.createElement("td");
        tr.appendChild(tdThird);
        tdThird.classList.add("edit-delete");

        const spanView = document.createElement("span");
        const spanEdit = document.createElement("span");
        const spanDelete = document.createElement("span");
        tdThird.appendChild(spanView);
        tdThird.appendChild(spanEdit);
        tdThird.appendChild(spanDelete);
        spanView.classList.add("view");
        spanView.innerHTML = "View";
        spanEdit.classList.add("edit");
        spanEdit.innerHTML = "Edit";
        spanDelete.classList.add("delete");
        spanDelete.innerHTML = "Delete";

        // VIEW
        spanView.addEventListener("click", () => {
          displayView.setAttribute("data-view", "true");
          deleteItem.setAttribute("data-delete", "false");
          document.querySelector(".id").innerHTML = data.articles[i].source.name;
          document.querySelector(".author").innerHTML = data.articles[i].author;
          document.querySelector(".description").innerHTML =
            data.articles[i].description;
          document.querySelector(".content").innerHTML = data.articles[i].content;
          document.querySelector(".url").innerHTML = data.articles[i].url;
          document.querySelector(".title").innerHTML = data.articles[i].title;
          document.querySelector(".published").innerHTML = data.articles[i].publishedAt;
          document.querySelector(".img-url").innerHTML = data.articles[i].urlToImage;
        });

        // EDIT
        spanEdit.addEventListener("click", () => {
          displayEdit.setAttribute("data-edit", "true");
          // document.querySelector("[data-id]").value = data.articles[i].source.name;
          document.querySelector("[data-author]").value = data.articles[i].author;
          document.querySelector("[data-description]").value =
            data.articles[i].description;
          document.querySelector("[data-content]").value = data.articles[i].content;
          document.querySelector("[data-title]").value = data.articles[i].title;
          document.querySelector("[data-image-url]").value = data.articles[i].urlToImage;

          EditValues.addEventListener("click", () => {
            fetch(`http://localhost:3000/articles/${data.articles[i].id}`, {
              method: "PUT",
              body: JSON.stringify({
                title: document.querySelector("[data-title]").value,
                content: document.querySelector("[data-content]").value,
                author: document.querySelector("[data-author]").value,
                urlToImage: document.querySelector("[data-image-url]").value,
                description: document.querySelector("[data-description]").value,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                displayTitles();
                displayEdit.setAttribute("data-edit", "true");
              });
          });
        });

        // DELETE

        spanDelete.addEventListener("click", () => {
          deleteItem.setAttribute("data-delete", "true");
          // console.log(data.articles[i].title);
          dataYes.addEventListener("click", () => {
            fetch(`http://localhost:3000/articles/${data.articles[i].id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                displayTitles();
              });
          });
  
          dataNo.addEventListener("click", () => {
            deleteItem.setAttribute("data-delete", "false");
          });
        });
        
        // ADD ARTICLE
        createArticle.addEventListener("click", () => {
          // console.log(document.querySelector("[data-add]"));
          document.querySelector("[data-add]").setAttribute("data-add", "true");

          addButton.addEventListener("click", () => {
            console.log(data.articles[i].id);
            fetch(`http://localhost:3000/articles`, {
              method: "POST",
              body: JSON.stringify({
                id: document.querySelector("[data-id-add]").value,
                author: document.querySelector("[data-author-add]").value,
                title: document.querySelector("[data-title-add]").value,
                description: document.querySelector("[data-description-add]").value,
                urlToImage: document.querySelector("[data-url-add]").value,
                id: document.querySelector("[data-image-url-add]").value,
                publishedAt: document.querySelector("[data-publish-add]").value,
                content: document.querySelector("[data-content-add]").value,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                displayTitles();
              });
          });
        });

        searchInput.addEventListener('input', (e)=>{
          e = event.target.value
          if(e===''){
            displayTitles(20)
          }
          else{
            
            displayTitles(data.articles.length, data.articles[i].publishedAt, dataFrom.value, dataTo.value, e)
          }
        })
      }
      
    });
}
// displayTitles(20);

btnFilter.addEventListener('click', ()=>{
  displayTitles(pageSize.value, sortBy.value, dataFrom.value, dataTo.value)
})


remove.addEventListener("click", () => {
  displayView.setAttribute("data-view", "false");
});

removeEdit.addEventListener("click", () => {
  displayEdit.setAttribute("data-edit", "false");
});

removeAdd.addEventListener("click", () => {
  document.querySelector("[data-add]").setAttribute("data-add", "false");
});

function Login(){
  window.location.href='http://127.0.0.1:5501/admin-login/login.html'
}

logOut.addEventListener('click', Login)



import { postApi, token } from "./api.js"; 
import { renderLogin } from "./login.js";
import { getApiComments } from "./main.js";

const listElement = document.getElementById("list");
const commentElements = document.querySelectorAll(".comment");


export const renderList = (comments, state) => {
  const appElement = document.getElementById("app")

    const formHTML = `
      <div class="add-form" id="addForm">
      <input
        id="name-input"
        type="text"
        class="add-form-name"
        value = "Admin"
        disabled
        placeholder="Введите ваше имя"
      />
      <textarea
        id="text-input"
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button id = "add-button" class="add-form-button">Написать</button>
      </div>
      </div>`

    const loginBtn = `<p class = "login">Пожалуйста авторизуйтесь</p>`  

    const renderComments = comments
      .map((comment, index) => {
        return `<li data-index='${index}' class="comment">
          <div class="comment-header">
            <div class = "comment-name">${comment.name}</div>
            <div>${comment.date}</div>
          </div>
            <div class="comment-body">
            <div class="comment-text">
            ${comment.text.replaceAll("BEGIN_QUOTE", "<div class='quote'>")}
            </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.like}</span>
                <button data-index='${index}' class="like-button ${comment.isLike ? ' -active-like' : ''}"></button>
              </div>
            </div>
          </li>`
            })
            .join('');

    appElement.innerHTML = `
    <div class="container">
      <ul class="comments" id="list">${renderComments}</ul>
      <div id="loading"></div>
      ${token ? formHTML : loginBtn}
    </div> `

    function actionLogin() {
      if (token) return
      const loginBtn = document.querySelector(".login")
      loginBtn.addEventListener("click", () => {
        renderLogin()
      })
    }

    function actionForm () {
      if (!token) return
      const buttonElement = document.getElementById("add-button");
      const nameInputElement = document.getElementById("name-input");
      const textInputElement = document.getElementById("text-input");
      const loaderElement = document.getElementById("loading");
      
      buttonElement.addEventListener("click", () => {
        nameInputElement.classList.remove('error');
        textInputElement.classList.remove('error');
      
        if ((nameInputElement.value || textInputElement.value) === '') {
            nameInputElement.classList.add('error');
            textInputElement.classList.add('error');
            return;
        };
      
      loaderElement.textContent = "Комментарий добавляется...";
      buttonElement.disabled = true;
      
      postApi(textInputElement, nameInputElement).then((response) => {
        if (response.status === 500) {
          loaderElement.textContent = ""; 
          throw new Error("Ошибка сервера");
        } 
        if (response.status === 400) {
          loaderElement.textContent = ""; 
          throw new Error("Неверный запрос");
        }
          return response.json();
        })
        .then((responseData) => {
          nameInputElement.value = '';
          textInputElement.value = '';
          buttonElement.disabled = true;
          return getApiComments();
        })
        .catch((error) => {
          if (error.message === "Ошибка сервера") {
            alert("Сервер сломался, попробуй позже");
          }
      
            if (error.message === "Неверный запрос") {
              alert("Имя и комментарий должны быть не короче 3-х символов");
            } 
            
            if (error.message === "Failed to fetch") {
              loaderElement.textContent = "";
                alert("Кажется, у вас сломался интернет, попробуйте позже");
                console.warn(error);
              } 
            })   
          .finally(() => {
              buttonElement.disabled = false;
          })
        });
    }

    actionLogin();
    actionForm();

}
     // renderComments();
//initLikeButtons(comments, renderComments);
          

//const listElement = document.getElementById("list");
//const commentElements = document.querySelectorAll(".comment");

function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
}
     
export const initLikeButtons = () => {
  const likeButtons = document.querySelectorAll('.like-button');
  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', (event) => {
        console.log(event);
        event.stopPropagation();
        likeButton.classList.add("loading-like");
            delay(2000)
                .then(() => {
                    likeButton.classList.remove("loading-like");
                    const index = likeButton.dataset.index;
                    if (comments[index].isLike) {
                        comments[index].isLike = false;
                        comments[index].like -= 1;
                    } else {
                        comments[index].isLike = true;
                        comments[index].like += 1;
                    }
            renderList();
            //initLikeButtons();
            });
        });
  };
} 
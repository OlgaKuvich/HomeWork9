import { getApi } from "./api.js";
import { postApi } from "./api.js"; 
import { renderForm } from "./render.js";
import { initLikeButtons } from "./render.js";

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const loaderElement = document.getElementById("loading");
const commentElements = document.querySelectorAll(".comment");


 loaderElement.textContent = "Подождите пожалуйста, комментарии загружаются...";

  const getApiComments = () => {
 
    getApi()
        .then((responseData) => {
            const commentsArr = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: new Date(comment.date).toLocaleString(),
                text: comment.text,
                like: 0,
                isLike: comment.like,
            };
            });
            comments = commentsArr;
            renderForm(comments,listElement)
        })
    .then((response) => {
      loaderElement.textContent = "";
      loaderElement.classList.remove("margin");
      });
  };

getApiComments();


let comments = [];

const answerUserComment = () => {
  const userComments = document.querySelectorAll('.comment');
  for (const userComment of userComments) {
      userComment.addEventListener("click", () => {
        //console.log(1);
        const index = userComment.dataset.index;
       // console.log(index);
        textInputElement.value = `> ${comments[index].text} \n ${comments[index].name} `;
      });
  };
}


const initEventListeners = () => {
  const commentElements = document.querySelectorAll(".comment");
  for(const commentElement of commentElements) {
      commentElement.addEventListener('click', () => {
      console.log(commentElement.innerHTML);
    })
  }
}
initEventListeners();
 
buttonElement.disabled = true;
nameInputElement.addEventListener('input', () => {
  if ((nameInputElement.value === '')||(textInputElement.value === '')){
    buttonElement.disabled = true;
    return;
  } else {
    buttonElement.disabled = false;
    return;
  }
});
  
buttonElement.disabled = true;
textInputElement.addEventListener('input', () => {
  if ((textInputElement.value === '')||(nameInputElement.value === '')){
    buttonElement.disabled = true;
    return;
  } else {
    buttonElement.disabled = false;
    return;
  }
});
  
buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove('error');
  textInputElement.classList.remove('error');

  if ((nameInputElement.value || textInputElement.value) === '') {
  nameInputElement.classList.add('error');
  textInputElement.classList.add('error');
  return;
};

let myDate = new Date(); 
let day = myDate.getDate();
let month = myDate.getMonth();
let year = myDate.getFullYear(); 
let hour = myDate.getHours(); 
let minute = myDate.getMinutes(); 

if (day < 10) { 
    day = "0" + day; 
}
if (month < 10) { 
    month = "0" + month; 
}
if (hour < 10) { 
    hour = "0" + hour; 
}
if (minute < 10) { 
    minute = "0" + minute; 
}

let userDate = day + "." + month + "." + year + " " + hour + ":" + minute; 


  loaderElement.textContent = "Комментарий добавляется...";
  buttonElement.disabled = true;

  postApi(textInputElement, nameInputElement).then((response) => {
  console.log(response);
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
    //console.log(responseData);
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

 
renderForm(comments,listElement);
initEventListeners();
initLikeButtons();
answerUserComment();

console.log("It works!");
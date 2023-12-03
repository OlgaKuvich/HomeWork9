import { getApi } from "./api.js";
import { postApi } from "./api.js"; 
import { renderForm } from "./render.js";
import { renderLogin } from "./login.js";

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

//getApiComments();
renderLogin();

let comments = [];

const answerUserComment = ({ comments }) => {
  const userComments = document.querySelectorAll('.comment');
  for (const userComment of userComments) {
      userComment.addEventListener("click", () => {
        const index = userComment.dataset.index;
        textInputElement.value = `> ${comments[index].text} \n ${comments[index].name} `;
        console.log(comments[index]);
      });
  };
}

 
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

 
renderForm(comments,listElement, getApi);
answerUserComment(comments);

console.log("It works!");
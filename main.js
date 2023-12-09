import { getApi } from "./api.js";
import { renderList } from "./render.js";

const listElement = document.getElementById("list");
const textInputElement = document.getElementById("text-input");

export let comments = [];

export const getApiComments = () => {
 
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
      renderList(comments,listElement)
  });
};
getApiComments();

const answerUserComment = () => {
  const userComments = document.querySelectorAll('.comment');
  for (const userComment of userComments) {
      userComment.addEventListener("click", () => {
        const index = userComment.dataset.index;
        textInputElement.value = `> ${comments[index].text} \n ${comments[index].name} `;
        console.log(comments[index]);
      });
  };
}
answerUserComment();
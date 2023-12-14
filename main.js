import { getApi } from "./api.js";
import { renderList } from "./render.js";
import { format } from "date-fns";

const listElement = document.getElementById("list");
const textInputElement = document.getElementById("text-input");

export let comments = [];

export const getApiComments = () => {
 
getApi()
  .then((responseData) => {
      const commentsArr = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: format(new Date(comment.date), "yyyy-MM-dd hh.mm.ss"),
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
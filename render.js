const listElement = document.getElementById("list");

export const renderForm = (comments,listElement) => {
    const renderComments = () => {
        return (listElement.innerHTML = comments
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
            .join(''));
    }
      renderComments();
}

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
        likeButton.classList.add("loadingLike");
            delay(2000)
                .then(() => {
                    likeButton.classList.remove("loadingLike");
                    const index = likeButton.dataset.index;
                    if (comments[index].isLike) {
                        comments[index].isLike = false;
                        comments[index].like -= 1;
                    } else {
                        comments[index].isLike = true;
                        comments[index].like += 1;
                    }
            renderComments();
            initLikeButtons();
            });
        });
  };
  }
  //renderComments();
  initLikeButtons();
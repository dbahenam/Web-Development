const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

function createCommentsList(comments) {
  const commentsListElement = document.createElement("ol");
  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
        <article class="comment-item">
            <h2>${comment.title}</h2>
            <p>${comment.text}</p>
        </article>
        `;
    commentsListElement.appendChild(commentElement);
  }
  return commentsListElement;
}

// when you trigger a function based on an event listener, js gives you an event object
// describing the event
async function fetchCommentsForPost(event) {
  const postId = loadCommentsBtnElement.dataset.postid;
  // by default, fetch sends a GET request
  const response = await fetch(`/posts/${postId}/comments`);

  // client-side json function decodes data from json format to js data values
  const responseData = await response.json(); // parses the response.body for us

  const commentsListElement = createCommentsList(responseData);
  commentsSectionElement.innerHTML = "";
  commentsSectionElement.appendChild(commentsListElement);
  //   console.log(responseData);
}

function saveComment(event) {
  // suppress default browser behavior
  event.preventDefault();
  const postId = commentsFormElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const comment = {
    title: enteredTitle,
    text: enteredText,
  };

  //   console.log(enteredText, enteredTitle);
  fetch(`/posts/${postId}/comments`, {
    // no need to wait since we don't do anything with response
    method: "POST",
    body: JSON.stringify(comment), // convert js object into json
    headers: {
      // meta data
      "Content-Type": "application/json", // lets middleware know this is json
    },
  });
}

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
commentsFormElement.addEventListener("submit", saveComment);

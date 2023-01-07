const addCommentHandler = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#comment-text').value.trim();
  const post_id = document.querySelector('#single-post').dataset.postId;
  console.log("post_id: ", post_id);
  

  // check if 'text' has value
  if (text) {
    // send a POST request to the API endpoint for creating a new comment
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ text, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      const data = await response.json();
      console.log("data: ", data);
      alert(data.errors[0].message || 'Failed to add a comment.');
    }
  }
};

// add event listener to "add a comment" form
document
  .querySelector('.add-comment-form')
  .addEventListener('submit', addCommentHandler);

const updatePostHandler = async (event) => {
  event.preventDefault();

  // get values from form
  const title = document.querySelector('#inputPostTitle').value.trim();
  const content = document.querySelector('#inputPostContent').value.trim();
  const postId = document.querySelector('.edit-form').dataset.postId.trim();

  // check if all fields have values
  if (title && content) {
    // send a PUT request to the API endpoint for updating a post by id
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      const data = await response.json();
      alert(data.errors[0].message || 'Failed to update post.');
    }
  } else {
    alert('Please fill out all fields.');
  }
};

// add event listener to 'edit' form 'update' button
document
  .querySelector('.edit-form')
  .addEventListener('submit', updatePostHandler);

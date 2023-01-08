const newPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#inputPostTitle').value.trim();
  const content = document.querySelector('#inputPostContent').value.trim();
  // check if all fields have values
  if (title && content) {
    // send a POST request to the API endpoint for creating a new post
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      const data = await response.json();
      alert(data.errors[0].message || 'Failed to add new post.');
    }
  }
};

// add event listener to signup form submit button
document
  .querySelector('.new-form')
  .addEventListener('submit', newPostFormHandler);

const logoutHandler = async () => {
  // Send a POST request to the API endpoint for logout
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
console.log(response);
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

// add event listener to logout button on click
document
  .querySelector('#btn-logout')
  .addEventListener('click', logoutHandler);

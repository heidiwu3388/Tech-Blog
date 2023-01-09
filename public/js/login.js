const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const name = document.querySelector('#inputName').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();

  if (name && password) {
    // Send a POST request to login the user
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // If successful, redirect the browser to the user's dashboard
      document.location.replace('/dashboard');
    } else {
      const data = await response.json();
      alert(data.message);
    }
  }
};

// add event listener to login form submit button
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);


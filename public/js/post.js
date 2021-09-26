// this script is loaded when the post selected is not create by the logged in user

// handle create post form

const postFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the comment
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();


  if (title && content ) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/posts/', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  }
};

// grab html elements

document
.querySelector('.post-form')
.addEventListener('submit', postFormHandler);

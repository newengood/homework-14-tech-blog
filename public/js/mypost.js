// this script loads when the post select is create by the logged in user

// handle create post form

const postFormHandler = async (event) => {
  event.preventDefault();

  // Collect values 
  const content = document.querySelector('#update-post').value.trim();
  const post_id = document.getElementById('post_id').innerHTML;

  if (content && post_id) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/posts/${post_id}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
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

// handle delete post form

const deleteFormHandler = async (event) => {
  event.preventDefault();

  const post_id = document.getElementById('post_id').innerHTML;


  if (post_id) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/posts/${post_id}`, {
      method: 'DELETE',
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

document
  .querySelector('.delete-form')
  .addEventListener('submit', deleteFormHandler);

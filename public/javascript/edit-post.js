async function editFormHandler(event) {
  event.preventDefault();
  
  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-content"]').value;

  // get the post id from the browser address
  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          title,
          content
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  });

  if (response.ok) {
      // if successful return to the dashboard
      document.location.replace('/dashboard/');
  } else {
      alert(response.statusText);
  }
}
const id = window.location.toString().split('/')[
  window.location.toString().split('/').length - 1
];

const valueResponse = fetch(`/api/posts/${id}`)
.then(response => response.json())
.then(data => document.querySelector('textarea[name="post-content"]').value = data.content);



document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
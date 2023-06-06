// script.js
document.addEventListener('DOMContentLoaded', getPosts);

function getPosts() {
    
  var v = new XMLHttpRequest();
  v.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
  v.onload = function() {
    if (v.status === 200) {
      var posts = JSON.parse(v.responseText);
      displayPosts(posts);
    } else {
      console.error('Error: ' + v.status);
    }
  };
  v.send();
}

function displayPosts(posts) {
  var tableBody = document.querySelector('#postsTable tbody');
  tableBody.innerHTML = '';

  posts.forEach(function(post) {
    var row = document.createElement('tr');
    var idCell = document.createElement('td');
    var userIdCell = document.createElement('td');
    var titleCell = document.createElement('td');
    var bodyCell = document.createElement('td');

    idCell.innerText = post.id;
    userIdCell.innerText = post.userId;
    titleCell.innerText = post.title;
    bodyCell.innerText = post.body;

    row.appendChild(idCell);
    row.appendChild(userIdCell);
    row.appendChild(titleCell);
    row.appendChild(bodyCell);
    tableBody.appendChild(row);
  });
}

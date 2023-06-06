// script.js
document.addEventListener('DOMContentLoaded', getAllPosts);

function performGetRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var responseData = JSON.parse(xhr.responseText);
      callback(null, responseData);
    } else {
      callback('Error: ' + xhr.status, null);
    }
  };
  xhr.send();
}

function getAllPosts() {
  var url = 'https://jsonplaceholder.typicode.com/posts';
  performGetRequest(url, function(error, responseData) {
    if (error) {
      console.error(error);
    } else {
      displayPosts(responseData);
    }
  });
}

function getPostById() {
  var postIdInput = document.getElementById('postIdInput');
  var postId = postIdInput.value;
  var url = 'https://jsonplaceholder.typicode.com/posts/' + postId;
  performGetRequest(url, function(error, responseData) {
    if (error) {
      console.error(error);
    } else {
      if (responseData.id) {
        displayPosts([responseData]);
      } else {
        console.log('Post not found.');
      }
    }
  });
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

function showCreatePostForm() {
  var createPostFormContainer = document.getElementById('createPostFormContainer');
  createPostFormContainer.style.display = 'block';
}

function createPost(event) {
  event.preventDefault();

  var postId = document.getElementById('postId').value;
  var userId = document.getElementById('userId').value;
  var title = document.getElementById('title').value;
  var body = document.getElementById('body').value;

  var post = {
    id: parseInt(postId),
    userId: parseInt(userId),
    title: title,
    body: body
  };

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 201) {
      var createdPost = JSON.parse(xhr.responseText);
      console.log('Created Post:', createdPost);
      displayNewPost(createdPost); // Display the new post in the table
      resetCreatePostForm();
    } else {
      console.error('Error: ' + xhr.status);
    }
  };
  xhr.send(JSON.stringify(post));
}

function displayNewPost(post) {
  var tableBody = document.querySelector('#postsTable tbody');

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
}

function resetCreatePostForm() {
  var createPostForm = document.getElementById('createPostForm');
  createPostForm.reset();
}

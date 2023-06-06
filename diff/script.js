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
// function createPost(data) {
//     var v = new XMLHttpRequest();
//     v.open('POST', url ,true);
//     v.setRequestHeader('content-Type', 'application/json');
//     v.onreadystatechange = function() {
//         if (v.readyState === 4) {
//             if (v.status === 200){
//                 console.log('post created:',v.responseText);
//             }else {
//                 console.error('error',v.status);
//             }
//         }
//     };
//     var postdata = {
//         id : data.id,
//         userId:data.userId,
//         title: data.title,
//         body: data.body
//     };
//     v.send(JSON, Stringify(postdata));
// }

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

function clearTable() {
  var tableBody = document.querySelector('#postsTable tbody');
  tableBody.innerHTML = '';
}

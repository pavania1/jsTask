// script.js
document.addEventListener('DOMContentLoaded', loadData);

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
var Posts;
function loadData() {
  var url = 'https://jsonplaceholder.typicode.com/posts';
  performGetRequest(url, function(error, responseData) {
    if (error) {
      console.error(error);
    } else {
       Posts=responseData;
      getAllPosts();      
    }
  });
}
function getAllPosts() {
 displayPosts(Posts);
}

function getPostById() {
  let postIdInput = document.getElementById('postIdInput');
  let postId = postIdInput.value;
  console.log(typeof postId);
  // var url = 'https://jsonplaceholder.typicode.com/posts/' + postId;
  // performGetRequest(url, function(error, responseData) {
    // if (error) {
      // console.error(error);
    // } else {
      // if (responseData.id) {
      if (Posts.filter(x=>x.id===parseInt(postId)).length>0) {
        // console.log(Posts[postId-1]);
        displayPosts(Posts.filter(x=>x.id===parseInt(postId)));
      } else {
        console.log('Post not found.');
      }
    }
  // });
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
    var editCell = document.createElement('td');
    var deleteCell = document.createElement('td');

    idCell.innerText = post.id;
    userIdCell.innerText = post.userId;
    titleCell.innerText = post.title;
    bodyCell.innerText = post.body;
    
    var editButton =document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click',function(){
      editPost(post.id);
    });

    var deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click',function(){
      deletePost(post.id);
    });
    deleteCell.appendChild(deleteButton);

    row.appendChild(idCell);
    row.appendChild(userIdCell);
    row.appendChild(titleCell);
    row.appendChild(bodyCell);
    tableBody.appendChild(row);
  });
}
function editPost(postId) {
  var updatePostFormContainer = document.getElementById('updatePostFormContainer');
  updatePostFormContainer.style.display = 'block';
  var post = Posts.find(function(item){
    return item.id === postId;
  });

  if (post) {
    var postIdInput = document.getElementById('updatePostId');
    var userIdInput = document.getElementById('updateUSerId');
    var titleInput = document.getElementById('updateTitle');
    var bodyInput = document.getElementById('updateBody');

    postIdInput.value =post.id;
    userIdInput.value = post.userId;
    titleInput.value = post.title;
    bodyInput.value = post.body;
  }else {
    console.log('Post not found');
  }
}


function deletePost(postId) {
  Posts = Posts.filter(function(post){
    return post.id !== postId;
  });
  displayPosts(Posts);
}

function showCreatePostForm() {
  var createPostFormContainer = document.getElementById('createPostFormContainer');
  createPostFormContainer.style.display = 'block';
}
function showUpdatePostForm() {
  var createPostFormContainer = document.getElementById('updatePostFormContainer');
  createPostFormContainer.style.display = 'block';
}

function createPost(event) {
   event.preventDefault();
  console.log()

  var postId = document.getElementById('postId').value;
  var userId = document.getElementById('userId').value;
  var title = document.getElementById('title').value;
  var body = document.getElementById('body').value;
  console.log(userId, title, body);

  let post = {
    id: parseInt(postId),
    userId: parseInt(userId),
    title: title,
    body: body
  };
  // Posts.push(post);
  // Posts.sort((a,b)=>(a.id-b.id));
  // getAllPosts();
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
function updatePost(event) {
  event.preventDefault();
  delById();
  var postId = document.getElementById('postIdInput').value;
  var userId = document.getElementById('userId').value;
  var title = document.getElementById('title').value;
  var body = document.getElementById('body').value;

  let post = {
    id: parseInt(postId),
    userId: parseInt(userId),
    title: title,
    body: body
  };
  Posts.push(post);
  Posts.sort((a,b)=>(a.id-b.id));
  getAllPosts();
  // var xhr = new XMLHttpRequest();
  // xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
  // xhr.setRequestHeader('Content-Type', 'application/json');
  // xhr.onload = function() {
  //   if (xhr.status === 201) {
  //     var createdPost = JSON.parse(xhr.responseText);
  //     console.log('Created Post:', createdPost);
  //     displayNewPost(createdPost); // Display the new post in the table
  //     resetCreatePostForm();
  //   } else {
  //     console.error('Error: ' + xhr.status);
  //   }
  // };
  // xhr.send(JSON.stringify(post));
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
const clearTable=()=>{
  Posts=[];
  displayPosts();
}
function delById() {
  let postIdInput = document.getElementById('postIdInput');
  let postId = postIdInput.value;
  console.log(typeof postId);
  // var url = 'https://jsonplaceholder.typicode.com/posts/' + postId;
  // performGetRequest(url, function(error, responseData) {
    // if (error) {
      // console.error(error);
    // } else {
      // if (responseData.id) {
      if (Posts.filter(x=>x.id===parseInt(postId)).length>0) {
        // console.log(Posts[postId-1]);
        displayPosts(Posts=Posts.filter(x=>x.id!==parseInt(postId)));
      } else {
        console.log('Post not found to be deleted.');
      }
    }
  // });
// }



var table = document.getElementById("postsTable");

var rowsPerPage = 5;
var rowCount = table.rows.length;

var tableHead = table.rows[0].firstElementChild.tagName === "TH";

var tr = [];
var i,ii,j = (tableHead)? 1:0;

var th = (tableHead ? table.rows[(0)].outerHTML : "");

var pageCount = Math.ceil(table.rows.length / rowsPerPage);



if (pageCount >1) {
  for (i = j, ii=0;i<rowCount; i++, ii++) {
    tr[ii] = table.rows[i].outerHTML;
  }
  table.inertAdjacentHTML ("afterend", "<br><div id='buttons'></div");
  sort(1);
}

functionsort(page) 
  var rows = th, s = ((rowsPerPage * page)- rowsPerPage);
  for (i = s; i <(S +rowsPerPage) && i <tr.length; i++){
    rows += tr[i];
    table.innerHTML = rows;
  }
  document.getElementById("buttons").innerHTML = pageButtons(pageCount,page);



function pageButtons(pageCount, current) {
  var prevButton = (current == 1)? "disabled" : "";
  var nextButton = (current == pageCount)? "disabled" : "";
  var buttons = "<input type='button' value='";
  for (i =1; i <= pageCount; i++){
    buttons += "";
  }
  buttons += "' onclick='sort("+(current +1)+")' " + nextButton +">";
  return buttons;
}
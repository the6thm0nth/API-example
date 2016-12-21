// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
  // Logged into your app and Facebook.
  testAPI();
  } else if (response.status === 'not_authorized') {
  // The person is logged into Facebook, but not your app.
  document.getElementById('status').innerHTML = 'Please log ' +
    'into this app.';
  } else {
  // The person is not logged into Facebook, so we're not sure if
  // they are logged into this app or not.
  document.getElementById('status').innerHTML = 'Please log ' +
    'into Facebook.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
      appId      : '373075459692715',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
  console.log('Successful login for: ' + response.name);
  document.getElementById('status').innerHTML =
    'Thanks for logging in, ' + response.name + '!';
  });
}

function showMyFeed() {
  FB.api('/me?fields=id,name,email,feed', function(res) {
    console.log('My information', res)

    /**
     * Display My Information
     */
    document.getElementById('my-profile').innerHTML = '\
    <p>\
      <li>ID: ' + res.id + '</li>\
      <li>Name: ' + res.name + '</li>\
      <li>email: ' + res.email + '</li>\
    </p>\
    '
    
    /**
     * Display My Feed
     */
    res.feed.data.forEach(function(f) {
      showLikes(f.id, function(likes) {
        showComments(f.id, function(comments) {
          console.log(likes, comments)
          var feed = document.createElement('li')
          feed.attributes.id = f.id
          feed.style.border = '1px solid black'

          var head = document.createElement('h2')
          head.innerHTML = '<h2>' + f.id + '</h2>'
          head.onclick = function() {showLikes(f.id)}
          var content = document.createElement('p')
          content.innerHTML = (f.story || f.message)
          var commentsDom = document.createElement('p')
          commentsDom.innerHTML = 'comments count: ' + comments.data.length
          var likesDom = document.createElement('p')
          likesDom.innerHTML = 'likes count: ' + likes.data.length

          feed.appendChild(head)
          feed.appendChild(content)
          feed.appendChild(likesDom)
          feed.appendChild(commentsDom)

          document.getElementById('feed').appendChild(feed)
        })
      })
    })
  })
}

function showLikes(postId, cb) {
  FB.api('/' + postId + '/likes', function(res) {
    cb(res)
  })
}

function showComments(postId, cb) {
  FB.api('/' + postId + '/comments', function(res) {
    cb(res)
  })
}

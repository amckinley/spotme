
window.fbAsyncInit = function(){
  FB.init({appId:'131327880269835',status:true,cookie:true,xfbml:true});
  go();
};

(function(){
  var e = document.createElement('script');
  e.async = true;
  e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
  document.getElementById('fb-root').appendChild(e);
}()
);

function go(){


FB.getLoginStatus(function(response) {
    if (response.session) {
      show_logout_button();
    } else {
      show_login_button();
    }
});

FB.api('/me', function(user) {
  if(!user.error) {
    var image = document.getElementById('image');
    image.src = 'http://graph.facebook.com/' + user.id + '/picture';
    var name = document.getElementById('name');
    name.innerHTML = user.name;
  }
})
  
}

function show_login_button(){
  document.getElementById('spot_me_login').innerHTML +="<fb:login-button></fb:login-button>";
}

function show_logout_button(){
  document.getElementById('fb-root').innerHTML += "<a>Log Out</a>";
}

function load_search_suggestions(){
  query = document.getElementById('spot_me_search').value;
  document.getElementById('spot_me_search_suggestions').innerHTML = "";

  if (query.length > 8){
    FB.api('search?q=' + query +'&type=user',function(response) {
      for (var i=0, l=response.data.length; i<l; i++) {
        var friend_suggestion = response.data[i];
        var image_source = 'http://graph.facebook.com/' + friend_suggestion.id + '/picture';
        write_suggestions('<img src="'+image_source+'"> -- ' + friend_suggestion.name);
      }
    });
  }
}

function write_suggestions(name){
  document.getElementById('spot_me_search_suggestions').innerHTML += name +'\n';
}

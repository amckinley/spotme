
window.fbAsyncInit = function(){
  FB.init({appId:SPOTME.FACEBOOK_APP_KEY,status:true,cookie:true,xfbml:true});
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
    image.src = SPOTME.FACEBOOK_GRAPH_API_URL + user.id + '/picture';
    var name = document.getElementById('name');
    name.innerHTML = user.name;
    SPOTME.U = user;
    document.getElementById('spot_me_add_me').name= SPOTME.U.id;
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
        var image_source = SPOTME.FACEBOOK_GRAPH_API_URL + friend_suggestion.id + '/picture';
        write_suggestions('<img src="'+image_source+'"> -- ' + friend_suggestion.name + ' <a name="'+friend_suggestion.id+'" rel="add-friend">Add This Friend To Event</a><br />');
      }
    });
  }
}

function write_suggestions(name){
  document.getElementById('spot_me_search_suggestions').innerHTML += name;
}

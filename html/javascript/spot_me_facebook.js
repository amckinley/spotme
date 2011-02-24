function write_suggestions(fbid, name){
  var suggestion_html = "";
  suggestion_html += get_profile_image_tag(fbid);
  suggestion_html += (" Add <a name="+fbid+" rel='add-friend'>" + name + '</a>');
  document.getElementById('spot_me_search_suggestions').innerHTML += suggestion_html;
}

function clear_suggestions(){
  document.getElementById('spot_me_search_suggestions').innerHTML = "";
}

function find_friends(){
  var query = document.getElementById('spot_me_search').value;
  var all_my_friends = SPOTME.U.friends;

  var number_of_friends = all_my_friends.length;

  if (number_of_friends > 30){
    all_my_friends = all_my_friends.splice(30, number_of_friends);
   }
        
  var fql_query = 'select uid, name from user where name = "'+ query + '" and uid in ('+ all_my_friends.toString()+')';
  
  FB.api(
  {
    method:'fql.query',
    query:fql_query
  },
  function(response){
    if (!response.error_code){
      if (response.length > 0 ){
        write_suggestions(response[0].uid,response[0].name);
      }
    }
  });
}

function addLogoutEventHandler(){
  FB.Event.subscribe('auth.logout', function(response){
    window.location.reload();
  });
}

function go(){
  FB.getLoginStatus(function(response) {
      if (response.session) {
        toggle(document.getElementById('logout_button'));
        draw_page();
      } else {
        toggle(document.getElementById('login_button'));
      }
  });

  FB.api('/me', function(user) {
    if(!user.error) {
      SPOTME.U = user;
    }
  });
  
}

function addLoginEventHandler(){
  FB.Event.subscribe('auth.login', function(response){
    toggle(document.getElementById('login_button'));
    go();
  });
}

window.fbAsyncInit = function(){
  FB.init({appId:SPOTME.FACEBOOK_APP_KEY,status:true,cookie:true,xfbml:true});

  addLoginEventHandler();
  addLogoutEventHandler();

  go();
};

(function(){
  var e = document.createElement('script');
  e.async = true;
  e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
  document.getElementById('fb-root').appendChild(e);
}()
);


function load_search_suggestions(){
  document.getElementById('spot_me_search_suggestions').innerHTML = "";
  query = document.getElementById('spot_me_search').value;

  if (query.length > 8){
    if (!SPOTME.U.friends){

    FB.api(
      {
        method: 'friends.get'
      },
       function(response) {
         SPOTME.U.friends = response;
         find_friends();
      }
    );
    } else {
      find_friends();
    }
  }
}


function facebook_log_out(){
  if(FB){
    FB.ui(
       {
           method:'auth.logout',
           display:'hidden'
          },
       function() {
          }
    );
  }
}


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

  write_out_debt();
  

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
    if (response.length != 0){
      clear_suggestions();
      write_suggestions(response[0].uid,response[0].name);
    }
  });
}

function clear_suggestions(){
  document.getElementById('spot_me_search_suggestions').innerHTML = "";
}
function write_suggestions(fbid, name){
  var suggestion_html = "";
  suggestion_html += get_profile_image_tag(fbid);
  suggestion_html += (" Add <a name="+fbid+" rel='add-friend'>" + name + '</a>');

  document.getElementById('spot_me_search_suggestions').innerHTML += suggestion_html;
}

function write_out_debt(){
  var debts = [
    {"uid":"9372641",amount:12.23},
    {"uid":"628368574",amount:15.94},

  ];
  var debt_table_html = "";
  for (i in debts){

    debt_table_html += "<tr>";
    debt_table_html += "<td>";
    debt_table_html += get_profile_image_tag(debts[i].uid);
    debt_table_html += "</td>";
    debt_table_html += "<td>$";
    debt_table_html += debts[i].amount;
    debt_table_html += "</td>";
    debt_table_html += "</tr>";
  }
  document.getElementById('debt_table_body').innerHTML = debt_table_html;
}

function get_profile_image_tag(fbid){
  return '<img src="' + SPOTME.FACEBOOK_GRAPH_API_URL + fbid+'/picture">';
}

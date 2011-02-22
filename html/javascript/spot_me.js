var SPOTME = {};
SPOTME.FACEBOOK_APP_KEY = '131327880269835';
SPOTME.FACEBOOK_GRAPH_API_URL = 'http://graph.facebook.com/';
SPOTME.U = {};


var nearest = function(elm, tag) {
          while (elm && elm.nodeName != tag) {
                      elm = elm.parentNode;
                    }
          return elm;
    };

document.onclick = function(e){
  e = e || window.event;
  lct = e.target || e.srcElement;

  var elem = nearest(lct, 'A') || document.documentElement,
          href = elem.getAttribute('ajaxify') || elem.href;

  if (lct.getAttribute("ajaxify")){
  }

  switch (lct.rel){
    case 'add-friend':
      add_friend(elem.name);
      break;
    case 'remove-friend-from-event':
      remove_friend_from_event(elem.name);
      break;
    case 'who-am-i':
      who_am_i();
      break;
    case 'my-debt':
      my_debt();
      break;
    case 'spot-me':
      spot_me();
      break;
    case 'log-out':
      spot_me_log_out();
      break;
    default:
      return;
  }
}

SPOTME.event_friends = [];
function add_friend(fb_id){
  add_friend_to_event(fb_id);
}

function exist_in_array(item, items){
  var val_exists = false;
  for (i in items){
    if (items[i] == item){
      val_exists = true;
    }
  }
  return val_exists;
}

function add_friend_to_event(fb_id){
  if (!exist_in_array(fb_id, SPOTME.event_friends)){
    SPOTME.event_friends.push(fb_id);
    update_friends_in_event(SPOTME.event_friends);
  }
}

function update_friends_in_event(){
  eraseFriends();
  document.getElementById('debt_friends_involved').value = SPOTME.event_friends.toString();
  var friends = SPOTME.event_friends;
  for (var i = 0; i < friends.length;i++){
    drawFriend(friends[i]); 
  }
}

function eraseFriends(){
  document.getElementById('friends_involved_container').innerHTML = "";
}

function drawFriend(friend_to_draw){

  var image_source = SPOTME.FACEBOOK_GRAPH_API_URL + friend_to_draw + '/picture';
  involved_friend_html = '<img src="'+image_source+'"> <a name="'+friend_to_draw+'" rel="remove-friend-from-event">Remove From Event</a><br />';
  document.getElementById('friends_involved_container').innerHTML += involved_friend_html;

}

function remove_friend_from_event(fb_id){
  var friends = SPOTME.event_friends;
  console.log(friends);
  console.log(fb_id);
  for (i in friends){
    if(friends[i] == fb_id){
      if (friends.length ==1){
        SPOTME.event_friends = [];
      } else {
        SPOTME.event_friends.splice(i,1);
      }
    }
  }
  update_friends_in_event();
}

document.onsubmit = function (e){

  e = e || window.event;
  var elem = e.target || e.srcElement;

  if(!elem || elem.nodeName != 'FORM' || elem.getAttribute('ajaxify')){
    if (validate(elem)){
      save_debt_async();
    }
    return false;
  } 

}

function save_debt_async(){
  var async_request = new XMLHttpRequest();
  async_request.open("POST","spot_me_save.php");
  async_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  var debt_to_save = {};
  debt_to_save.amount = document.getElementById('debt_amount').value;
  debt_to_save.friends_involved = document.getElementById('debt_friends_involved').value;
  debt_to_save.description = document.getElementById('debt_description').value;
  debt_to_save.location = document.getElementById('debt_location').value;
  debt_to_save.date = document.getElementById('debt_date').value;
  async_request.send('data=' + JSON.stringify(debt_to_save));
}

function spot_me(){
  var spot_me_dialog = document.getElementById('spot_me_dialog');
  toggle(spot_me_dialog);
}

function my_debt(){
  toggle(document.getElementById('my_debt_dialog'));
}

function toggle(togglee){
  if (togglee.style.display == 'inline'){
    togglee.style.display = 'none';
  } else {
    togglee.style.display = 'inline';
  }
}

function spot_me_log_out(){
  if(FB){
    FB.ui(
       {
           method:'auth.logout',
           display:'hidden'
          },
       function() {
           alert("you're logged out!");
          }
    );
    //FB.logout(function(response) {
    //  console.log(response);
    //  getLoginStatus();
    //});
  }
}
function getLoginStatus(){

    FB.getLoginStatus(function(response) {
        if (response.session) {
          alert("User Logged In");
        } else {
          alert("User Not Logged IN");
        }
    });
}

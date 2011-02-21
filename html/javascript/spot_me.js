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

function init(){
  
}
window.onload=init;
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
    default:
      return;

  }

}

SPOTME.event_friends = [];
function add_friend(fb_id){
  add_friend_to_event(fb_id);
}

function add_friend_to_event(fb_id){
  SPOTME.event_friends.push(fb_id);
  update_friends_in_event(SPOTME.event_friends);
}

function update_friends_in_event(){
  eraseFriends();
  document.getElementById('friends_involved').value = SPOTME.event_friends.toString();
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
  involved_friend_html = '<img src="'+image_source+'"> <a name="'+SPOTME.U.id+'" rel="remove-friend-from-event">Remove From Event</a><br />';
  document.getElementById('friends_involved_container').innerHTML += involved_friend_html;

}

function remove_friend_from_event(fb_id){
  var friends = SPOTME.event_friends;

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

  validate(e);

  e = e || window.event;
  var elem = e.target || e.srcElement;
  if(!elem || elem.nodeName != 'FORM' || !elem.getAttribute('ajaxify')){
    return false;
  }

  save_debt_async(e);

}

function save_debt_async(e){
  var async_request = new XmlHttpRequest();
  async_request.open("POST","spot_me_save.php");
  async_request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  async_request.send("amount=10");
}

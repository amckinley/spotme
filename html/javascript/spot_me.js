var SPOTME = {};
SPOTME.FACEBOOK_APP_KEY = '131327880269835';
SPOTME.FACEBOOK_GRAPH_API_URL = 'http://graph.facebook.com/';
SPOTME.U = {};
SPOTME.event_friends = [];
SPOTME.TRUST_IMAGES = [
  'images/red-status-button-12x12.png',
  'images/yellow-status-button-12x12.png',
  'images/green-status-button-12x12.png'
];

function eraseFriends(){
  document.getElementById('friends_involved_container').innerHTML = "";
}

function drawFriend(friend_to_draw){
  var remove_friend_link = document.createElement('a');
  remove_friend_link.setAttribute('name',friend_to_draw);
  remove_friend_link.setAttribute('rel',"remove-friend-from-event");
  remove_friend_link.innerHTML = 'Remove From Event';
  var divy_hook_div = document.createElement('span');
  divy_hook_div.setAttribute('id','divy_' + friend_to_draw );
  document.getElementById('friends_involved_container').appendChild(get_profile_image_element(friend_to_draw));
  document.getElementById('friends_involved_container').appendChild(get_spot_me_trust_button());
  document.getElementById('friends_involved_container').appendChild(divy_hook_div);
  document.getElementById('friends_involved_container').appendChild(remove_friend_link);
  document.getElementById('friends_involved_container').appendChild(document.createElement('br'));
}

function update_friends_in_event(){
  eraseFriends();
  document.getElementById('debt_friends_involved').value = '[' + SPOTME.event_friends.toString() + ']';
  var friends = SPOTME.event_friends;
  for (var i = 0; i < friends.length;i++){
    drawFriend(friends[i]); 
  }
  calculateAmount();
}

function remove_friend_from_event(fb_id){
  var friends = SPOTME.event_friends;
  for (var i in friends){
    if(friends.hasOwnProperty(i) && friends[i] == fb_id){
      if (friends.length ==1){
        SPOTME.event_friends = [];
      } else {
        SPOTME.event_friends.splice(i,1);
      }
    }
  }
  update_friends_in_event();
}

function get_spot_me_trust_button_html(){
  var trust_button_html = '';
  trust_button_html += '<img style="padding:25px;" src="';
  trust_button_html += SPOTME.TRUST_IMAGES[Math.floor(Math.random()*3)];
  trust_button_html += '">';
  return trust_button_html;
}

function get_debt_async_callback(response_text){
  var debts = JSON.parse(response_text);
  var my_debts_html = "";
  for (var i in (debts)){
    if (debts.hasOwnProperty(i)){
      my_debts_html += "<tr>";
      my_debts_html += "<td>";
      my_debts_html += get_profile_image_tag(debts[i].uuid2);
      my_debts_html += get_spot_me_trust_button_html();
      my_debts_html += "</td>";
      my_debts_html += "<td>";
      my_debts_html += debts[i].amount;
      my_debts_html += "</td>";
      my_debts_html += "</tr>";
    }
  }
  document.getElementById('debt_table_body').innerHTML = my_debts_html;
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
  http_get('debts.php',get_debt_async_callback);
}

function spot_me_log_out(){
  facebook_log_out();
}

function add_friend_to_event(fb_id){
  if (!exist_in_array(fb_id, SPOTME.event_friends)){
    clear_suggestions();
    SPOTME.event_friends.push(fb_id);
    update_friends_in_event(SPOTME.event_friends);
  }
}

function add_friend(fb_id){
  add_friend_to_event(fb_id);
}

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
};

document.onsubmit = function (e){

  e = e || window.event;
  var elem = e.target || e.srcElement;

  if(!elem || elem.nodeName != 'FORM' || elem.getAttribute('ajaxify')){
    if (validate(elem)){
      save_debt_async();
    }
    return false;
  } 
};

function draw_page(){
  toggle(document.getElementById('spot-me-menu'));
}

function calculateAmount(){
  var amount_value_element = document.getElementById('debt_amount');
  var amount_value = parseFloat(amount_value_element.value);
  if (!isNaN(amount_value)){
    var debt_friends_involved_element = document.getElementById('debt_friends_involved');
    var friends_involved = JSON.parse(debt_friends_involved_element.value);
    if (debt_friends_involved_element.value.length > 0){
      var divy_split = amount_value / (friends_involved.length  + 1 );
      for (var i=0;i < friends_involved.length;i++){
        var divy_id = "divy_" + friends_involved[i].toString();
        document.getElementById(divy_id).innerHTML = ' $' + divy_split.toFixed(2) + ' ';
      }
    }
  }
}

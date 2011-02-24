
function toggle(togglee){
  if (togglee.style){
    if (togglee.style.display == 'inline'){
      togglee.style.display = 'none';
    } else {
      togglee.style.display = 'inline';
    }
  }
}

function http_get(url, fn){
  var get_request = new XMLHttpRequest();
  get_request.open("GET",url);
  get_request.onreadystatechange = function(){
     if(get_request.readyState == 4 && get_request.status == 200){
        fn(get_request.responseText);
     }
  };
  get_request.send(null);
}

function get_profile_image_tag(fbid){
  return '<img src="' + SPOTME.FACEBOOK_GRAPH_API_URL + fbid+'/picture">';
}

function get_profile_image_element(fbid){
  var image_source = SPOTME.FACEBOOK_GRAPH_API_URL + fbid+"/picture";
  var profile_image_element = document.createElement('img');
  profile_image_element.setAttribute('src', image_source);
  return profile_image_element;
}

function exist_in_array(item, items){
  var val_exists = false;
  for (var name in items){
    if (items.hasOwnProperty(name) && items[name] == item){
      val_exists=true;
    }
  }
  return val_exists;
}

/**
* Overloaded*
*/
function toFixed(value, precision) {
      var power = Math.pow(10, precision || 0);
      return String(Math.round(value * power) / power);
}

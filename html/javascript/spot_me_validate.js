
function has_value(string){
  var string_has_value = 1;
  if (string.length ===0){
    has_value = 0;
  }
  return string_has_value;
}

function validate_text(){
  has_value('debt');
}

function add_error_to_page(error_message){
  var error_log = document.getElementById('error_log');
  error_log.style.color = 'red';
  error_log.innerHTML += error_message;  
  error_log.innerHTML += '<br />';
}

function clear_error_log(){
  var error_log = document.getElementById('error_log');
  error_log.innerHTML = "";
}

function validate(form){
  clear_error_log();
  var valid_form = true;
  for (var i in form.elements){
    if (form.elements.hasOwnProperty(i)){
      var form_element = form.elements[i];
      if (form_element.title && form_element.title == 'validate' && !form_element.value){
        valid_form = false;
        add_error_to_page('Form contains an empty value for a required field');
      } else if(form_element.title && form_element.title == 'validate-friends-involved'){
        if( form_element.value.length === 0){
          valid_form = false;
          add_error_to_page('Spot Me transaction must contain at least one friend!');
        } 
      }
    }
  }
  return valid_form;
}

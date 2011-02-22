function validate_text(){
  has_value('debt');
}

function has_value(string){
  var has_value = 1;
  if (string.length ==0){
    has_value = 0;
  }

  return has_value;
}

function validate(form){
  var valid_form = true;
  for (i in form.elements){
    var form_element = form.elements[i];
    if (form_element.title && form_element.title == 'validate' && !form_element.value){
      valid_form = false;
      add_error_to_page('Form contains an empty value for a required field');
    }
  }
  return valid_form;
}

function add_error_to_page(error_message){
  var error_log = document.getElementById('error_log');
  error_log.style.color = 'red';
  error_log.innerHTML += error_message;  
}

function clear_error_log(){
  var error_log = document.getElementById('error_log');
  error_log.innerHTML = "";
}

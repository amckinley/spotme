

function validate_text(){
  has_value('debt');
}

function has_value(string){
  var has_value = 1;
  if (string.length ==0){
    alert('This string has no value')
    has_value = 0;
  }

  return has_value;
}

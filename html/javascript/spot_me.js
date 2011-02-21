
function submit_hook(){
  alert('submitting page');
}

function secure_forms(){

  var page_forms = document.getElementsByTagName("FORM");

  for (var i=0; i < page_forms.length; i++){
    a_form = page_forms[i];
    a_form.addEventListener('submit', submit_hook, false);
  }

}

function init(){
  

}
window.onload=init;
//document.onclick = submit_hook;
document.onclick = function(e){
  alert(e.target);
  the_target = e.target;

  if (the_target.getAttributeByName("ajaxify")){
    alert('this is ajaxified')
  }

}


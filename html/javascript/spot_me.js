
function init(){
  
}
window.onload=init;
document.onclick = function(e){
  e = e || window.event;
  lct = e.target || e.srcElement;

  if (lct.getAttribute("ajaxify")){
  }
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

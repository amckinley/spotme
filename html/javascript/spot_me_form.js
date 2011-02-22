var SPOTME_FORM = {};

SPOTME_FORM.form={
  "name":"name",
  "action":"",
  "method":"POST"
}

function Form(form_id){
  this.name = form_id
  this.action = form_id
  this.method = 'POST'
}

function create_div(div_id){
  
  var new_div = document.createElement('div')
  new_div.setAttribute('id', div_id)
  new_div.style.width = 300
  new_div.style.height = 300
  new_div.innerHtml = 'nothing'
  document.body.appendChild(new_div)
                           
}

function create_form(form_id){
  //Create a Div wrapper for our form
  create_div(form_id)
  var new_form = document.createElement('form')
  new_form.setAttribute('method', 'POST') 
  new_form.setAttribute('path','debt.html') 
  new_form.setAttribute('id', form_id) 
  document.body.appendChild(new_form)
}


function create_text_input(input_name){

  var new_input = document.createElement('input')
  new_input.setAttribute('type','text')
  new_input.setAttribute('name',input_name)
  return new_input
}

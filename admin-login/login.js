// LOGIN PAGE
const loginInput = document.querySelector('[data-email]')
const pass = document.querySelector('[data-psw]')
const errorSpan = document.querySelector('[data-display-span]')
const loginBtn = document.querySelector('[data-btn]')
const visibility = document.querySelector('[data-visible]')

fetch(`${adminURL}`).then(res=>res.json())
.then(data=>{

  loginBtn.addEventListener('click', validate)
  loginInput.addEventListener('keyup', (e)=>{
      e=e.key

      if(validate()){
        goToAdmin()
      }
  })
  pass.addEventListener('keyup', (e)=>{
    e=e.key

    if(e=='Enter'){
        validate()
        if(validate()){
          goToAdmin()
        }
    }
})

pass.addEventListener('input', (e)=>{
  e=event.target.value;
  if(e===''){
    visibility.setAttribute('data-visible', 'false')
  }
  else{
    visibility.setAttribute('data-visible', 'true')
  }
})

visibility.addEventListener('click', ()=>{
  if(pass.type==='password'){
    pass.type='text'
  }
  else{
    pass.type='password'
  }
})
  function validate(){
    if(loginInput.value===data[0].email && pass.value===data[0].password){
        errorSpan.setAttribute('data-display-span', 'false')
        let adminValues = localStorage.setItem('getValues', JSON.stringify(loginInput.value))
        loginInput.value=''
        pass.value=''
        goToAdmin()
      }
  
      else{
        errorSpan.setAttribute('data-display-span', 'true')
      }
}

})

function goToAdmin(){
  window.location.href='http://127.0.0.1:5501/admin/admin.html'
}

function gotoLogin(){
  window.location.href='http://127.0.0.1:5501/admin-login/login.html'
}
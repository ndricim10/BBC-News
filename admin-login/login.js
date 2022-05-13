// LOGIN PAGE
const loginInput = document.querySelector('[data-email]')
const pass = document.querySelector('[data-psw]')
const errorSpan = document.querySelector('[data-display-span]')
const loginBtn = document.querySelector('[data-btn]')


fetch(`${adminURL}`).then(res=>res.json())
.then(data=>{
  console.log(data[0]);

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
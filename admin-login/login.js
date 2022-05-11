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

      if(e=='Enter'){
          validate()
      }
  })

  pass.addEventListener('keyup', (e)=>{
    e=e.key

    if(e=='Enter'){
        validate()
    }
})


  function validate(){
    if(loginInput.value===data[0].email && pass.value===data[0].password){
        alert('congrats!')
        errorSpan.setAttribute('data-display-span', 'false')
        loginInput.value=''
        pass.value=''
        document.querySelector('[data-home]').href='../admin/admin.html'
      }
  
      else{
        errorSpan.setAttribute('data-display-span', 'true')
        
      }
}

})
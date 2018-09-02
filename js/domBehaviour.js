import Worker from "./worker"
import JsonProcessing from './jsonProcessing'
import toArray from './utilitys'


const json = new JsonProcessing()
const worker = new Worker()

const allusers = json.getAllGroups()

let userCard = document.getElementsByClassName('card-wrapper')
let active = 'none'
const userArray = Object.values(allusers)
let cardHtml = ''
let usersChat = []
userArray.forEach(element => {
    cardHtml = `
    <div onclick="showChat('${element.name}')" class="card character-card ${element.name}">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="img/${element.name}.jpg" class="image-character">
        </div>
        <div class="col-md-8">
          <p class="contact-name"><strong>${element.name}</strong></p>
          <p class="contact-last-mensage">Last Mensage</p>
          <p class="typing text-right"> ${element.name} is Typing...</p>
        </div>
      </div>
    </div>`

    userCard[0].innerHTML += cardHtml

    const defaultGroup = json.getMensageGroup(element.name, 'default')

    let mensageHtml = ''
    defaultGroup.forEach((mensage)=>{
      document.querySelector('.'+element.name+' .contact-last-mensage').innerHTML = mensage.msg
      mensageHtml += `<p class="mensage-text other"><strong>${element.name}</strong>: ${mensage.msg}</p>`
    })
    usersChat[element.name] = mensageHtml
});

worker.start('Cibele', 'greeting')

window.showChat = (user) =>{
  active = user
  const box = document.getElementsByClassName('mesage-body')
  box[0].innerHTML = usersChat[user]
}
window.userInput = (text, user , event) =>{
  document.getElementById('choice').remove()
  document.getElementsByClassName('mesage-body')[0].innerHTML += `<p class="mine">${text}</p>` 
  usersChat[user] = document.getElementsByClassName('mesage-body')[0].innerHTML
  worker.start(user, event.target.value)
}
function updateLastMensage(user, mensage){
  document.querySelector('.'+user+' .contact-last-mensage').innerHTML = mensage
}

function addMensage(user, mensage){
  usersChat[user] += `<p class="mensage-text other"><strong>${user}</strong>: ${mensage}</p>`
  if(active == user){
    showChat(user)
  }
  updateLastMensage(user, mensage)
}

function isTyiping(user){
  document.querySelector('.'+user+' .typing').style.display = "block";
}

function stopedTyping(user){
  document.querySelector('.'+user+' .typing').style.display = "none";

}

function showUserInput(user, options){
  const optHtml = `
  <section id='choice'>
    <div class="row">
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div class="text-center">
          <button onclick="userInput('${options.opt1}', '${user}' ,event)" class="center-block" value="${options.val1}">${options.opt1}</button>
        </div>
      </div>
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div class="text-center">
          <button onclick="userInput('${options.opt2}', '${user}' ,event)" class="center-block" value="${options.val2}">${options.opt2}</button>
        </div>    
      </div>
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div class="text-center">
          <button onclick="userInput('${options.opt3}', '${user}' ,event)" class="center-block" value="${options.val3}">${options.opt3}</button>
        </div>
      </div>
    </div>
  </section>
  `
  usersChat[user] += optHtml
  if(active == user){
    showChat(user)
  }
}
export {addMensage, isTyiping, stopedTyping, showUserInput}
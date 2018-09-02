import Worker from "./worker"
import JsonProcessing from './jsonProcessing'
import toArray from './utilitys'


const json = new JsonProcessing()
const worker = new Worker()

const allusers = json.getAllGroups()

let userCard = document.getElementsByClassName('card-wrapper')

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

window.showChat = (user) =>{
  const box = document.getElementsByClassName('mesage-body')
  box[0].innerHTML = usersChat[user]
} 
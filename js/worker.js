import JsonProcessing from './jsonProcessing'
import { getRandomInt } from './utilitys'
import {addMensage, isTyiping, stopedTyping, showUserInput} from './domBehaviour'

export default class Worker {

  constructor() {

  }

  userInputed(){
    userInput = true
  }

  setEvent(newEvent){
    this.event = newEvent
  }

  start(user, group) {
    const data = new JsonProcessing()
    const activeGroup = data.getMensageGroup(user, group)

    
    setInterval(() => { this.watchGroup(activeGroup) }, getRandomInt(1000, 3000))

  }

  watchGroup(group) {
    let userInputIterations = 0
    group.forEach(element => {
      if(!element.done){
        element.done = 1
        switch (element.wait) {
          case 0:
           this.execute(element, group)
          break
          case 'user-input':
            if(userInput){
              userInputIterations++
              userInput = false
              this.execute(element, group)
            }else{
              event.done = 0
            }
          break
          case 'event':
            if(event == element.expectedEvent){
              this.execute(element, group)
            }else{
              event.done = 0
            }
        }
      }
    });
  }

  execute(element, group){
    setTimeout(() => {
      isTyiping(element.user)
      setTimeout(() =>{
        stopedTyping(element.user)
        addMensage(element.user, element.msg)
        if(element.userInput){
          group.forEach((mensage) =>{
            if(mensage.wait == 'options'){
              showUserInput(element.user, mensage)
            }
          })
        }
      }, element.typingDelay)
    }, getRandomInt(element.delayMin, element.delayMax))
  }
}

let userInput = false;
let event = 'none'

import JsonProcessing from './jsonProcessing'
import { getRandomInt } from './utilitys'

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
      console.log('Start Typing')
      setTimeout(() =>{
        console.log("Stoped Typing")
        console.log(element.msg)
        if(element.userInput){
          console.log("Wait for user input from group "+ group.toString())
        }
      }, element.typingDelay)
    }, getRandomInt(element.delayMin, element.delayMax))
  }
}

let userInput = false;
let event = 'none'

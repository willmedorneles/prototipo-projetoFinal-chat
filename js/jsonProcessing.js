import * as data from '../chat.json'

export default class JsonProcessing {
  
  constructor(){

  }
  
  getUserGroup(user) {
    return data.default[user];
  }

  getMensageGroup(user, group){
    return this.getUserGroup(user)[group];
  }

  getAllGroups(){
    return data.default;
  }
  
}
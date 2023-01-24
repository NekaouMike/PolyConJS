const { WebSocket } = require('ws')

class db{
  constructor (con,key){
    this.con = con
    this.ws = new WebSocket("ws://"+con+"/ws");
    this.key = key
  }
open = async function() {
  var ws = this.ws
  return new Promise((resolve, reject) => {
    ws.on('open', () => {
      resolve('READY!')
    })
    ws.on('error', (err) => {
      console.log(err)
      reject('Can not connect to server!')
    })
  })  
}

record = async function(table,location,data){
  var ws = this.ws
  var key = this.key
  return new Promise(function (resolve, reject) {
    console.log(JSON.stringify({action: "record",password: key,dbname: table,location: location,value: data}))
    ws.send(JSON.stringify({action: "record",password: key,dbname: table,location: location,value: data}))
    ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    // if(data.Status.startsWith("Failure.")){
    //   reject(data = "ERROR: "+data.Status.trim().replace("Failure.",""))
    // }
    resolve(data)
  });
})
}
close = function (){
  this.ws.close()
}
}
module.exports = db;
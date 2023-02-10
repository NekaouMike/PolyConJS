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

record = async function(table,row,loc,data){
  var ws = this.ws
  var key = this.key
  return new Promise(async function (resolve, reject) {
    const location = "rows."+row+"."+loc
    console.log(location)
    ws.send(JSON.stringify({action: "record",password: key,dbname: table,location: location,value: data}))
    return resolve(await ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    // if(data.Status.startsWith("Failure.")){
    //   reject(data = "ERROR: "+data.Status.trim().replace("Failure.",""))
    // }
    return(data)
  }))
})
}
getschema = async function(table){
  var ws = this.ws
  var key = this.key
  return new Promise(async function(resolve, reject) {
    ws.send(JSON.stringify({action: "retrieve",password: key,dbname: table,location: "schema"}))
    return resolve(await ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    return(data)
  }))
})
}
retrieve = async function(table,row,loc){
  var ws = this.ws
  var key = this.key
  return new Promise(async function(resolve, reject) {
    var location ="rows"
    if(row == undefined){
      location = "rows"
    }
    else if(loc == undefined){
      location = "rows."+row
    }
    else{
      location = "rows."+row+"."+loc
    }
    ws.send(JSON.stringify({action: "retrieve",password: key,dbname: table,location: location}))
    return resolve(await ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    return(data)
  }))
})
}
search = async function(table,col,val){
  var ws = this.ws
  var key = this.key
  return new Promise(async function(resolve, reject) {
    const query = col+":"+val
    ws.send(JSON.stringify({action: "search",password: key,dbname: table,location: "rows",value: query}))
    return resolve(await ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    return(data)
  }))
})
}
append = async function(table,data){
  var ws = this.ws
  var key = this.key
  return new Promise(async function(resolve, reject) {
    data = JSON.stringify(data)
    ws.send(JSON.stringify({action: "append",password: key,dbname: table,location: "rows",value: data}))
    return resolve(await ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    return(data)
  }))
})
}
close = function (){
  this.ws.close()
}
}
module.exports = db;
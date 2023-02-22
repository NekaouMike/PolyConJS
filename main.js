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
  return new Promise(function (resolve, reject) {
    var location = "rows"
    if(row == "schema"){
      location = "schema"
    } else if(row == "all"){
      location = "rows"
    }
    else{
    if(loc == undefined){
      location = "rows."+row
    }else{
    location = "rows."+row+"."+loc
    }
    }
    ws.send(JSON.stringify({action: "record",password: key,dbname: table,location: location,value: data}))
    ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    // if(data.Status.startsWith("Failure.")){
    //   reject(data = "ERROR: "+data.Status.trim().replace("Failure.",""))
    // }
    resolve(data)
  });
  ws.on('error', async function error(msg) {
    reject(msg)
  });
})
}
getschema = async function(table){
  var ws = this.ws
  var key = this.key
  return new Promise(function (resolve, reject) {
    ws.send(JSON.stringify({action: "retrieve",password: key,dbname: table,location: "schema"}))
    ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    resolve(data)
  });
})
}
retrieve = async function(table,row,loc){
  var ws = this.ws
  var key = this.key
  return new Promise(function (resolve, reject) {
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
    ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    resolve(data)
  });
})
}
search = async function(table,col,val){
  var ws = this.ws
  var key = this.key
  return new Promise(function (resolve, reject) {
    const query = col+":"+val
    ws.send(JSON.stringify({action: "search",password: key,dbname: table,location: "rows",value: query}))
    ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    resolve(data)
  });
})
}
append = async function(table,data){
  var ws = this.ws
  var key = this.key
  return new Promise(function (resolve, reject) {
    data = JSON.stringify(data)
    ws.send(JSON.stringify({action: "append",password: key,dbname: table,location: "rows",value: data}))
    ws.on('message', async function message(msg) {
    var data = JSON.parse(msg)
    resolve(data)
  });
})
}
close = function (){
  this.ws.close()
}
}
module.exports = db;
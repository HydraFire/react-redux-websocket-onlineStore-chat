const express = require("express");


const WebSocketServer = require("ws").Server

const http = require("http")
const exp = express()

const jetpack = require("fs-jetpack");
const jwt = require('jwt-simple');
var secret = jetpack.read('./secret.json','json');

var server2 = http.createServer(exp).listen(333);
exp.use('/public',express.static(__dirname+'/public'));
exp.get('/*', function(req, res){
  res.sendFile(__dirname + '/index.html');
});





var wss = new WebSocketServer({server: server2});

console.log('Server start')

var connections = {}
var conectionIdGenerator = 0
var onlineList = []
wss.on("connection", function(ws){
  ws.id = conectionIdGenerator ++;
  connections[ws.id] = ws
  console.log('connect to server')
  //console.log(connections.length)
  let random = Math.random()*100000|0
  ws.userX = 'Undefined'+random
  //console.log(connections)

  var hendlerOnlineList = function(arr,newload,ws){
    let a = 'none'
    let y = []
    arr.forEach((v)=>{
      console.log(ws.id+' == '+v[1])
      if(ws.id == v[1]){
        //a = v[1]
        y.push(newload)
      }else{
        y.push(v)
      }
    })
    ws.userX = newload[0]
    console.log(y)
    return y
  }
  function sendToConnectionId(connectionID, data) {

    let connection = connections[connectionID];

    if (connection) {
      console.log('SEND'+data)
      connection.send(data);

    }
  }
  var hendlerOnlineRefresh = function(y){
    y.forEach((v)=>{
      let arr_t = []
      y.forEach((zoo)=>{
        let nnn = zoo[0]
        if(nnn.includes('Undefined')){
          nnn = 'Undefined'
        }
        arr_t.push(nnn)
      })
      let objx = {
        type:'NEW_ONLINE',
        data: arr_t
      }
      console.log('MESSAGE_to client'+v[1])
      objx = JSON.stringify(objx)
      sendToConnectionId(v[1],objx)
    })
  }
  var hendlerOnlineListDelete = function(arr,name){
    let a = 'none'
    let y = []
    arr.forEach((v)=>{
      console.log(name+' == '+v[0])
      if(name == v[0]){
        a = v[1]
      }else{
        y.push(v)
      }
    }) 
    hendlerOnlineRefresh(y)
    return y
  }


  onlineList.push([ws.userX,ws.id])
  hendlerOnlineRefresh(onlineList)
  var user_db = jetpack.read('./user_db.json','json');
  if(!user_db){
    user_db=[{
      userName: 'Admin',
      mail:'nesmark3@gmail.com',
      password:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMyI.wPu2TBdO6jDDEJpbtH11c-JVpwrc33ttiPKHYVNHrb4',
      options: {
        img:''
      }
    }];
    jetpack.write('./user_db.json',user_db)
  }



  ws.on('message', function(message,id) {
    if(typeof message != 'string'){
      var buffer = message
      let randomName = Math.random()*100000000|0
      user_db.forEach((v,i)=>{
        if(v.userName == ws.userX){
          if(user_db[i].options.img != ''){
          jetpack.remove(user_db[i].options.img)
          }
          user_db[i].options.img = 'public/img/'+randomName+'.jpg'
        }
      })
      jetpack.write('./user_db.json',user_db)
      jetpack.write('./public/img/'+randomName+'.jpg',message)
      console.log(buffer);
    }else{
      message = JSON.parse(message)
      console.log(message)
      console.log('onlineList '+onlineList)
      switch(message.type) {
        case 'RELOAD_CONNECT':
          console.log(onlineList)
          /*
        let xid = false
        onlineList.forEach((v)=>{
          if(ws.userX == v[0]){
            console.log(v[1])
            xid = v[1]
          }
        })
        //if(xid){
        console.log(xid)
        ws.userX = 'Undefined'
        onlineList.splice(xid,1,[ws.userX,ws.id])
        //}
        //onlineList.push([ws.userX,ws.id])
*/
          let random = Math.random()*100000|0

          onlineList = hendlerOnlineList(onlineList,['Undefined'+random,ws.id],ws)
          hendlerOnlineRefresh(onlineList)
          ws.userX = 'Undefined'+random
          console.log(onlineList)
          console.log('LOG_OUT')

          break;
        case 'HOT_LOGIN':
          user_db.forEach((v)=>{
            console.log(message)
            if(v.password == message.data.password){
              let obj = {type:'LOGIN',data:v}
              ws.send(JSON.stringify(obj))
              console.log('LOGINED'+ws.id)
              //connections[ws.id].userX = v.userName
              //console.log(connections)

              onlineList = hendlerOnlineList(onlineList,[v.userName,ws.id],ws)
              hendlerOnlineRefresh(onlineList)
              //onlineList.push([ws.userX,ws.id])
            }
          })
          case 'FORM_TO_LOGIN':

          user_db.forEach((v)=>{
            if(v.userName == message.data.name){
              let token = jwt.encode(message.data.password,secret[0])
              console.log(token)
              if(v.password == token){
                let obj = {type:'LOGIN',data:v}
                ws.send(JSON.stringify(obj))
                onlineList = hendlerOnlineList(onlineList,[v.userName,ws.id],ws)
                hendlerOnlineRefresh(onlineList)
                ws.userX = message.data.name
                console.log('LOGINED'+ws.id)
                //connections[ws.id].userX = message.data.name

                let userchat = jetpack.read('./JSON/'+ws.userX+'_chat.json','json');
                if(!userchat){
                  userchat = [{
                    "id": 0,
                    "name": "Admin",
                    "message": "Привет",
                    "time": "202020"
                  }]
                  jetpack.write('./JSON/'+ws.userX+'_chat.json',userchat)
                }
              }else{
                let obj = {type:'LOGIN_FALSE'}
                ws.send(JSON.stringify(obj))
              }
            }
          })
          console.log(message.data)
          break;
        case 'FORM_TO_REG':
          console.log(message.data)

          console.log(message.data)
          let token2 = jwt.encode(message.data.password,secret[0])
          let mm = {
            userName:message.data.name,
            mail:message.data.mail,
            password:token2,
            options: {
              img:''
            }
          }
          user_db.push(mm)
          jetpack.write('./user_db.json',user_db)
          //var payload = message.data.password

          //var token = jwt.encode(payload,secret)
          //console.log(token)
          //let ccc = {type:'NEW_TOKEN',data:token}
          break;

          /////////////////////////////////////////////////////////////////////////
        case 'GET_CHAT':
          let dda = []
          user_db.forEach((v,i)=>{
            let ji = false
            onlineList.forEach((tj)=>{
              let nnn = tj[0]
              if(nnn.includes('Undefined')){
                nnn = 'Undefined'
              }
              if(v.userName == nnn){
                ji = true
              }
            })

            dda.push({user:v.userName,visibility:true,online:ji})
          })
          let zzz
          if(ws.userX.includes('Undefined')){
            zzz = jetpack.read('./JSON/Undefined_chat.json','json')
          }else{
            zzz = jetpack.read('./JSON/'+ws.userX+'_chat.json','json')
          }
          if(zzz){
            dda.forEach((v)=>{
              user_db.forEach((vg)=>{
                if(v.user == vg.userName){
                  v.img = vg.options.img
                }
              })
            })
            console.log(zzz)
            let a = {
              type:'USER_CHAT',
              options: dda,
              data: zzz
            }
            //console.log(a)
            ws.send(JSON.stringify(a))
          }
          break;

        case 'MESSAGE_TO_CHAT':
          //console.log(message.options)
          message.options.map((v)=>{
            if(v.visibility){
              let zzz = jetpack.read('./JSON/'+v.user+'_chat.json','json')
              let vobj = {}
              let userN = ws.userX
              if(userN.includes('Undefined')){
                userN = 'Undefined'
              }
              if(v.user == userN ){
                vobj = {
                  "id": zzz.length,
                  "name": userN,
                  "message": message.data,
                  "time":'',
                  "send_to":message.options
                }
              }else{
                vobj = {
                  "id": zzz.length,
                  "name": userN,
                  "message": message.data,
                  "time":''
                }
              }
              zzz.push(vobj)
              console.log('///***/**/*/*/*/**/')
              onlineList.forEach((tv)=>{
                let nnn = tv[0]
                if(nnn.includes('Undefined')){
                  nnn = 'Undefined'
                }
                if(nnn == v.user && v.visibility == true){
                  let objx = {
                    type:'NEW_MESSAGE',
                    data: vobj
                  }
                  //Object.keys(connections).forEach((vz)=>{
                  //   console.log(vz.userX+' == '+v.user)
                  //   if(vz.userX == v.user){
                  console.log('MESSAGE_to client'+tv[1])
                  objx = JSON.stringify(objx)
                  sendToConnectionId(tv[1],objx)
                  //let bb = connections[v.id]
                  //bb.send()
                  //  }
                  // })
                }
              })
              jetpack.write('./JSON/'+v.user+'_chat.json',zzz)
            }
          })


          break;
        case 'LOAD_AVATAR':
          //let zzzz = encodeURI(message.file)
          jetpack.write('img.png',message.file)
          //console.log(zzzz)
          break;
        case 'ADD_TO_SHOP':
          let shop_db = jetpack.read('./shop_db.json','json');
          message.data.id = shop_db.length
          message.data.img = 'public/img/a1.jpg'
          shop_db.push(message.data)
          jetpack.write('./shop_db.json',shop_db)
          break;

        case 'GET_SHOP':
          let shop_db2 = jetpack.read('./shop_db.json','json');
          let obj = {
            type:'ALL_SHOP',
            data: shop_db2
          }
          ws.send(JSON.stringify(obj))
          break;
        case 'ADD_SHOP_LIKE':
          let shop_db3 = jetpack.read('./shop_db.json','json');
          shop_db3.forEach((v)=>{
            if(v.name == message.data){
              let m = parseFloat(v.like)
              m+=1
              v.like = m
            }
          })
          jetpack.write('./shop_db.json',shop_db3)
          break;
      }
    }
  });

  ws.addEventListener("close",()=>{
    console.log('CLOSE CONNECTION')

    //console.log(onlineList.indexOf(ws.userX))
    //onlineList.splice(onlineList.indexOf(ws.userX),1)
    //console.log(onlineList.indexOf(ws.userX))
    console.log('delete '+ws.userX)
    onlineList = hendlerOnlineListDelete(onlineList,ws.userX)
    delete connections[ws.id];
    //console.log(connections)
    console.log(onlineList)
  });
});

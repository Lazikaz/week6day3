const express = require("express")
const path = require("path")

const app = express()

var Rollbar = require('rollbar');
var rollbar = new Rollbar({
  accessToken: '572f10b1affa4fde9e87d17687032568',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    code_version: '1.0.0',
  }
});

rollbar.log("helloworld")

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"))
})

try{
    doSomething()
}
catch(error){
rollbar.error(error)
}

app.listen(process.env.PORT, () => {console.log("running!")}).catch(() => {rollbar.critical("Server failed to launch")})
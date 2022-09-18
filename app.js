const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const PORT = 5000

//Configure Express to use Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configure Express to serve static files
app.use('/public',express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"/public","/html","index.html"))
})
app.post('/input/post',(req,res)=>{
    Email = req.body.Email
    Name = req.body.Name

})
app.get('/data',(req,res)=>{
    data = logincheck().then(function(result){
        result = result.rows
        res.send(result)
    })
})
app.listen(PORT,()=>{console.log("Node Server Started...")})

async function sendData(){
  const {Pool} = require('pg')
  user = 'Tanker'
  database = 'Tanker/ClubInfo'
  password = 'v2_3u4H7_p6gMcjGXdtq4FJ2QK3Bg7ks'
  const pool = new Pool({
      user: user,
      host: 'db.bit.io',
      database: database,
      password: password,
      port: 5432,
      ssl: true
  })
  var res = await pool.query('Select * from "Tanker/ClubInfo".db."login"')
  if (res!==undefined){
  pool.end()
  return res
  }else if (res===undefined){
      return "No Data"
  }
}

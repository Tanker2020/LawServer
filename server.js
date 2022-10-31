const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 5000

//Configure Express to use Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configure Express to serve static files
app.use('/public',express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"/public","/html","index.html"))
})

//All Post requests handled 
app.post('/post/interest',(req,res)=>{
  Email = req.body.Email
  Name = req.body.Name
  Time = new Date().toISOString().slice(0, 10)
  sendDataInterest(Name,Email,Time,'interestinfo')
})
app.post('/post/help',(req,res)=>{
  Email = req.body.Email
  Name = req.body.Name
  Help = req.body.Help
  Time = new Date().toISOString().slice(0, 10) 
  sendDataHelp(Name,Email,Help,Time,'helpdesk')
})
app.post('/post/idea',(req,res)=>{
  Name = req.body.Name
  Summary = req.body.Summary
  Expenses = req.body.Expenses
  Time = new Date().toISOString().slice(0, 10) 
  sendDataIdea(Name,Summary,Expenses,Time,'ideainfo')
})
app.post('/post/sponsor',(req,res)=>{
  Name = req.body.Name
  Email = req.body.Email
  Company = req.body.Company
  if (Company == ''||Company == null||Company == "undefined"){
    Company = 'None'
  }
  Phone = req.body.Phone
  Time = new Date().toISOString().slice(0, 10)
  sendDataSponsor(Name,Email,Company,Phone,Time,'sponsorinfo')
})

//All Get requests Handled
app.get('/data',(req,res)=>{
  querys = req.query
  if (querys.id == '5f4dcc3b5aa765d61d8327deb882cf99'){
    res.sendFile(path.join(__dirname,"/public","/html","data.html"))
  }else{
    res.send("Invalid ID")
  }
})

app.get('/data/interest',(req,res)=>{
  var querys = req.query
  if (querys.id == '5f4dcc3b5aa765d61d8327deb882cf99'){
    data = getData('interestinfo').then(function(result){
      result = result.rows
      var final = `<tr>`
      result.forEach((item)=>{final = final+`<td>`+item.email;final = final+`<td>`+item.name+"<td/>";final = final+item.timesub;final+="</tr>"})
      res.send(`<html><head><style>
      body{
        background-color: black;
        color: white;
      }
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      
      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      
      </style></head><body><h1>Interest Data</h1><header><a href="/data?id=5f4dcc3b5aa765d61d8327deb882cf99" style="color:aqua">Go Back to Database Connection page</a></header><table><tr><th>Email</th><th>Name</th><th>Time</th></tr>${final}</table></body></html>`)
    })
  }else{
    res.send("Invalid ID")
  }
})

app.get('/data/help',(req,res)=>{
  var querys = req.query
  if (querys.id == '5f4dcc3b5aa765d61d8327deb882cf99'){
    data = getData('helpdesk').then(function(result){
      result = result.rows
      var final = `<tr>`
      result.forEach((item)=>{final = final+`<td>`+item.email;final = final+`<td>`+item.name+"<td/>";final = final+item.help+"<td>";final = final+item.timesub;final+="</tr>"})
      res.send(`<html><head><style>
      body{
        background-color: black;
        color: white;
      }
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      
      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      
      </style></head><body><h1>HelpDesk Info</h1><header><a href="/data?id=5f4dcc3b5aa765d61d8327deb882cf99" style="color:aqua">Go Back to Database Connection page</a></header><table><tr><th>Email</th><th>Name</th><th>Content</th><th>Time</th></tr>${final}</table></body></html>`)
    })
  }else{
    res.send("Invalid ID")
  }
})
app.get('/data/idea',(req,res)=>{
  var querys = req.query
  if (querys.id == '5f4dcc3b5aa765d61d8327deb882cf99'){
    data = getData('ideainfo').then(function(result){
      result = result.rows
      var final = `<tr>`
      result.forEach((item)=>{final = final+`<td>`+item.name+"<td/>";final=final+item.summary;final=final+"<td>$"+item.expenses;final = final+"<td>"+item.timesub;final+="</tr>"})
      res.send(`<html><head><style>
      body{
        background-color: black;
        color: white;
      }
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      
      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      
      </style></head><body><h1>Idea Info</h1><header><a href="/data?id=5f4dcc3b5aa765d61d8327deb882cf99" style="color:aqua">Go Back to Database Connection page</a></header><table><tr><th>Name</th><th>Idea</th><th>Expenses</th><th>Time</th></tr>${final}</table></body></html>`)
    })
  }else{
    res.send("Invalid ID")
  }
})
app.get('/data/sponsor',(req,res)=>{
  var querys = req.query
  if (querys.id == '5f4dcc3b5aa765d61d8327deb882cf99'){
    data = getData('sponsorinfo').then(function(result){
      result = result.rows
      var final = `<tr>`
      result.forEach((item)=>{final = final+`<td>`+item.name+"<td/>";final=final+item.mail;final=final+"<td>"+item.company;final+="<td>"+item.phone;final = final+"<td>"+item.timesub;final+="</tr>"})
      res.send(`<html><head><style>
      body{
        background-color: black;
        color: white;
      }
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      
      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      
      </style></head><body><h1>Sponsor Data</h1><header><a href="/data?id=5f4dcc3b5aa765d61d8327deb882cf99" style="color:aqua">Go Back to Database Connection page</a></header><table><tr><th>Name</th><th>Mail</th><th>Company</th><th>Phone</th><th>Time</th></tr>${final}</table></body></html>`)
    })
  }else{
    res.send("Invalid ID")
  }
})

//Start the server
app.listen(PORT,()=>{console.log("Node Server Started...")})

//Postgres Connection
const {Pool} = require('pg');
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

async function getData(table){
  info = await pool.query(`Select * from "Tanker/ClubInfo".db."${table}";`)
  return info
}

async function sendDataSponsor(Name,Email,Company,Phone,Time,table){
  info = await pool.query(`Insert Into "Tanker/ClubInfo".db."${table}"(name,mail,company,phone,timesub) values('${Name}','${Email}','${Company}','${Phone}',${Time});`)
  return info
}

async function sendDataInterest(Name,Email,Time,table){
  info = await pool.query(`Insert Into "Tanker/ClubInfo".db."${table}"(email,name,timesub) values('${Email}','${Name}',${Time});`)
  return info
}

async function sendDataHelp(Name,Email,Help,Time,table){
  info = await pool.query(`Insert Into "Tanker/ClubInfo".db."${table}"(email,name,help,timesub) values('${Email}','${Name}','${Help}',${Time});`)
  return info
}

async function sendDataIdea(Name,Summary,Expenses,Time,table){
  info = await pool.query(`Insert Into "Tanker/ClubInfo".db."${table}"(name,summary,expenses,timesub) values('${Name}','${Summary}','${Expenses}',${Time});`)
  return info
}

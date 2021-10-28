var htttp = require("http");
var fs = require("fs")
var express = require("express");
var bodyParser = require("body-parser");
//var cfenv = require('cfenv');

//var appEnv = cfenv.getAppEnv();
var urlencodedParser = bodyParser.urlencoded({extended:false});
var app = express();

app.use(express.static(__dirname + '/public'));
app.set("view engine","hbs");

var index = 0;
var data2 = [{id:"007",time:"D Time 13:45",location:"Main Gate 1"}];
var data = {'AC':"off",
            'AC_A':"51",

            'FAN':"off",
            'FAN_A':"51",
            
            'FRIDGE':'off',
            'FRIDGE_A':'21',

            'LIGHT':'off',
            'DOOR':'off'};

app.post('/AC',urlencodedParser,function(req,res){ 
  data['AC'] = req.body.AC;
  if(req.body.AC == null){
    data["AC"] = "off"  
   }
  data['AC_A'] = req.body.AC_A;
  console.log(data);
  console.log('AC status updated:');
  res.redirect('/');
});

app.post('/Fan',urlencodedParser,function(req,res){ 
  data['FAN'] = req.body.FAN;
  if(req.body.FAN == null){
    data["FAN"] = "off"  
   }
  data['FAN_A'] = req.body.FAN_A;
  console.log(data);
  console.log('FAN status updated:');
  res.redirect('/');
});

app.post('/Fridge',urlencodedParser,function(req,res){ 
  data['FRIDGE'] = req.body.FRIDGE;
  if(req.body.FRIDGE == null){
    data["FRIDGE"] = "off"  
   }
  data['FRIDGE_A'] = req.body.FRIDGE_A;
  console.log(data);
  console.log('FRIDGE status updated:');
  res.redirect('/');
});

app.post('/Other',urlencodedParser,function(req,res){ 
  data['DOOR'] = req.body.DOOR;
  data['LIGHT'] = req.body.LIGHT;
  if(req.body.DOOR == null){
    data["DOOR"] = "off"  
   }
   if(req.body.LIGHT == null){
    data["LIGHT"] = "off"  
   }
  console.log(data);
  console.log('Door and Light status updated:');
  res.redirect('/');
});

app.post('/form1',urlencodedParser,function(req,res){ 
    let Time = req.body.Time;
    let Location = req.body.Location;
    console.log(Time,Location);
    index += 1;
    data2.push({'id':index,'time':Time,'location':Location});
    res.end("OK");
});

app.get('/form1',function(req,res){
    res.render('form1');
});

app.get('/table',function(req,res){
    res.render('table',{rows:data2});
});

app.get('/img',function(req,res){
  id = req.query.id;
  res.end(id);
});

app.get('/',function(req,res){
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
});

app.get('/data',function(req,res){
  res.end(JSON.stringify(data));
});

/*app.listen(8081, function() {
  console.log("server is running");
  console.log(JSON.stringify(data));
});
*/
app.listen(3100, '127.0.0.1', function(){
//app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on 3000");
});


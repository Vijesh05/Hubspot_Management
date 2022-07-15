var express = require('express');
const https = require('https');
var cors = require('cors');
var app = express();
const axios = require('axios');
const url = require('url');
app.use(cors())

app.get('', function (req, res) {
   https.get('https://api.hubapi.com/crm/v3/objects/contacts?hapikey=52444284-8f0b-448f-86f7-7c2a170819ca', (resp) => {
      let data = '';
      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
          let result = JSON.parse(data).results.map(function(e){ return {name: e.properties.firstname + " "+ e.properties.lastname, 
                                                email : e.properties.email,
                                                id : "https://app.hubspot.com/contacts/22317443/contact/" + e.id,
                                                delId : e.id}})
                                                res.send(result) 
                                                res.end()                                     

      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
})

app.get('/delete',(req,res) => {
  let delurl = req.url
  let qrparam = url.parse(delurl,true).query
  axios.delete('https://api.hubapi.com/crm/v3/objects/contacts/' + qrparam.id +'?hapikey=52444284-8f0b-448f-86f7-7c2a170819ca' ).then((res) => {
    console.log(`Status: ${res.status}`);
    console.log('Body: ', res.data);
}).catch((err) => {
    console.error(err);
})
  res.end()
})

app.post('/payload',(req,res) => {
  let payload = JSON.parse(req.headers.payload)
  axios.post('https://api.hubapi.com/crm/v3/objects/contacts?hapikey=52444284-8f0b-448f-86f7-7c2a170819ca',{"properties" : payload}).then((res) => {
    console.log(`Status: ${res.status}`);
    console.log('Body: ', res.data);
}).catch((err) => {
    console.error(err);
})
  res.end()
})
var server = app.listen(8081)
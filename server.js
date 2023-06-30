const express = require('express');
const app = express();
const fetch = require('node-fetch');
var logger = require('morgan');
var cors = require('cors');
var bodyParser= require('body-parser');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

app.post('/', async (req, res) => { 
    const lpn = req.body.lpn

    console.log("lpn:",lpn);
    const url = 'https://ws.sanmar.com:8080/SanMarWebService/webservices/PackingSlipService?wsdl';

    const data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pac="http://ws.sanmar.com/webservices/PackingSlip">
        <soapenv:Header/>
        <soapenv:Body>
           <pac:GetPackingSlip>
              <pac:wsVersion>1.0.0</pac:wsVersion>
              <pac:UserId>jetcityproducts</pac:UserId>
              <pac:Password>Annaalisa1</pac:Password>
              <pac:PackingSlipId>${lpn}</pac:PackingSlipId> 
           </pac:GetPackingSlip>
        </soapenv:Body>
     </soapenv:Envelope>`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml',
        },
        body: data,
    });
    
    const text = await response.text();
    res.send(text)

});

app.get('/', async (req, res)=>{
    res.send("welcome...")
})

const port = process.env.PORT || 9000;
var server = app.listen(port, function(){
    console.log(`Listening on port ${port}...`);
});

module.exports = app;
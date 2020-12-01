
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(request, response)=>{
    response.sendFile(__dirname + '/index.html');
    //response.send("<h1>OPPA OPPA!</h1>");
});

app.post('/', (request, response) =>{
   let userChoice = request.body.currency;
   console.log(userChoice)

   axios.get('http://api.coindesk.com/v1/bpi/currentprice/eur.json')
   .then(res =>{

       let eur = res.data.bpi.usd.EUR.rate
       let usd = res.data.bpi.usd.USD.rate
       console.log('EUR', eur);
       console.log('USD', usd);
       let message = '';
       if(userChoice === 'EUR'){
           message = 'EUR'+ eur;
       }else {
           message = 'USD'+ usd;
       }
       response.send(message);
   })

});

app.get('/about', (request, response) =>{
    response.send("Arseniy says Hi!")
});

app.get('/contact', (request, response) =>{
    response.send("555555555")
}); 

app.listen(3000, ()=>{
    console.log('Server is running Port 3000')
});
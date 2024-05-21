const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Drift = require('drift-chat');


app.use(bodyParser.json());
app.listen(process.env.PORT || 80, () => console.log('Your first bot is listening on port 80!'));

//shows that your public domain is hooked up
app.get('/', async(request, response) => {
 return response.status(200).send('check it out!!')
})

//printing the message body in terminal when you receive the event
app.post('/', async(request, response) => {
 console.log(request.body);
 if (!data) return response.send(400);

})
var express = require('express');
const { model }= require('./logica')
var server = express();

server.use(express.json());
server.get('/api', (req, res) =>{
    res.json(model.clients)
})
server.get('/api/Appointments/clients', (req, res) =>{
    let resp = model.getClients()
    return res.json(resp)
})
server.post('/api/Appointments', (req, res) =>{
    const {client, appointment} = req.body;
    if(!client){
        res.status(400).send('the body must have a client property')
    }else if(typeof client !== 'string'){
        res.status(400).send('client must be a string')
    }else {
        model.addAppointment(client,appointment)
        res.json(appointment)
    }
})
server.get('/api/Appointments/:name', (req, res) =>{
    let {date, option} = req.query
    let {name} = req.params
    let {appointment} = req.body
    if(!model.clients[name]){
        return res.status(400).send('the client does not exist')
    }
    let dateOfClient = model.clients[name].filter(obj => obj.date === date); 
    if(dateOfClient.length === 0){
        return res.status(400).send('the client does not have a appointment for that date')
    }
    switch(option){
        case 'attend':
            model.attend(name, date)
            return res.json(appointment)
        case 'expire':
            model.expire(name, date)
            return res.json(appointment)
        case 'cancel':
            model.cancel(name, date)
            let dateChange = model.clients[name].find(obj => obj.date ===date)
            return res.json(dateChange)
        default:
            return res.status(400).send('the option must be attend, expire or cancel')
    }
})
server.get('/api/Appointments/:name/erase', (req, res) =>{
    let {name} = req.params;
    let {date} = req.query
    if(!model.clients[name]){
        res.status(400).send('the client does not exist')
    }else{
        let borrado = model.clients[name].filter(c => c.status === date)
        model.erase(name, date)
        res.json(borrado)
    }
})
server.get('/api/Appointments/getAppointments/:name', (req, res) =>{
    let {name} = req.params;
    let {status} = req.query;
    let resp = model.getAppointments(name, status);
    return res.json(resp)
})


server.listen(3000);

module.exports = {model, server}
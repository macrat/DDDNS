import express from 'express';
import bodyParser from 'body-parser';

import Client from './client';


const app = express();
const client = new Client();


app.use(bodyParser.json());


app.get('/records', function(req, res, next) {
    client.getAll()
        .then(data => res.send({data: data}))
        .catch(next);
});


app.put('/records', function(req, res, next) {
    client.setAll(req.body)
        .then(() => res.send({}))
        .catch(next);
});


export const path = '/api';
export const handler = app;

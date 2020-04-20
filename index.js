const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.get('/', (req, res)=>{
    res.json({
        text: 'api works!!!'
    });
});

app.post('/api/login', (req, res)=>{
    const user={id:3};
    const token= jwt.sign({user}, 'secret_key');
    res.json({
        token
    });
});

app.get('/api/protected', ensureToken, (req, res)=>{
    jwt.verify(req.token, 'secret_key', (err, data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                token:'protected',
                data
            });
        }
        }
    });
    /*res.json({
        token:'protected'
    });*/
});

function ensureToken(req, res, next){
    const beareHeader=req.headers['autorization'];
    console.log(beareHeader);
    if(typeof beareHeader!='undefined'){
        const bearer=beareHeader.split(" ");
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(3000, ()=>{
    console.log('listener on port 3000');
});

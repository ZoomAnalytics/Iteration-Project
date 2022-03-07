const { resolve } = require('path/posix');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Class = require('./Model/model');

const serverController = {};

serverController.loginRedirect = (req,res,next) => {
    const url = 'https://zoom.us/oauth/authorize?response_type=code&client_id=150y1dfvSZa9MV9NgIQKwA&redirect_uri=http%3A%2F%2Flocalhost%3A8080';
    return res.redirect(url);
}

serverController.getAuthCode = async (req, res, next) => {
    try {
        res.locals.authCode = req.query.code;
        return next()
    } catch (error) {
        return next(error)
    } 
};

serverController.getAccessToken = async (req, res, next) => {
    try {
        console.log('get token');
        const appAuthorizationString = 'Basic MTUweTFkZnZTWmE5TVY5TmdJUUt3QToyaFdKWnJsazJacElURGoxTkdDWHVQcnBMczdpNlFFUg==';
        const usersAuthorizationCode = res.locals.authCode;
        const redirect_uri = 'http://localhost:8080/api/home';

        const params = new URLSearchParams();
        params.append('code', usersAuthorizationCode);
        params.append('grant_type', 'authorization_code');
        params.append('redirect_uri', redirect_uri);
        
        fetch('https://zoom.us/oauth/token', {
            method: 'post',
            headers: {
                'Authorization': appAuthorizationString,
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: params,
        }).then(response => response.json())
        .then(data => {
            res.locals.accessToken = `Bearer ${data.access_token}`;
            return next();
        });
    } catch (error) {
        console.log(error);
        return next(error)
    } 
};

serverController.getMeetingID = async (req, res, next) => {
    try {
        fetch('https://api.zoom.us/v2/users/me/meetings', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': res.locals.accessToken
            },
        }).then(response => response.json())
        .then(data => {
            const meetings = data.meetings;
            res.locals.meetingID = []
            for (let i = 0; i < meetings.length; i++) {
                if (!meetings[i].pmi) {
                    Class.create({meetingID: meetings[i].id})
                    res.locals.meetingID.push(meetings[i].id)
                }
                else {
                    Class.create({meetingID: meetings[i].pmi})
                    res.locals.meetingID.push(meetings[i].pmi)
                }
            }
            return next();
        })
        .catch(error)
    } catch (error) {
        return next(error)
    } 
};


serverController.getUUID = async (req, res, next) => {
    try {
        
        const meetingID = res.locals.meetingID;

        for (let i = 0; i < meetingID.length; i++) {
                    
            fetch(`https://api.zoom.us/v2/past_meetings/${meetingID[i]}/instances`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': res.locals.accessToken
                },
            },).then(response => response.json())
            .then(data => { 
                const meetings = data.meetings;
                res.locals.UUID = [];
                for (let i = 0; i < meetings.length; i++) {
                    if (!meetings[i].pmi) {
                        Class.findOneAndUpdate({meetingID: `${meetings[i].id}`},{$push : {UUID: meetings[i].uuid}}, (err, lecture) => {
                            if (err) return next(error);
                            res.locals.UUID.push(meetings[i].uuid)
                        })
                    }
                    else {
                        Class.findOneAndUpdate({meetingID: `${meetings[i].pmi}`},{$push : {UUID: meetings[i].uuid}} ,(err, lecture) => {
                            if (err) return next(error);
                            res.locals.UUID.push(meetings[i].uuid)
                        })
                    }
                }
                return next();
            })  
        }
    } catch (error) {
        next(error)
    } 
};

module.exports = serverController;
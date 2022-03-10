/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Class = require('./Model/model');

const serverController = {};

serverController.loginRedirect = (req, res, next) => {
  const url = 'https://zoom.us/oauth/authorize?response_type=code&client_id=ih_6n4W4SuqRMg0qIXoRtQ&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fhome';
  return res.redirect(url);
};

serverController.getAuthCode = async (req, res, next) => {
  try {
    res.locals.authCode = req.query.code;
    return next();
  } catch (error) {
    return next(error);
  }
};

serverController.getAccessToken = async (req, res, next) => {
  try {
    const appAuthorizationString = 'Basic aWhfNm40VzRTdXFSTWcwcUlYb1J0UTpkUnVweXh0N2hmbElpMTZjUU5MZDFRYXV1WHRKUnV3NA==';
    const usersAuthorizationCode = res.locals.authCode;
    const redirect_uri = 'http://localhost:8080/api/home';

    const params = new URLSearchParams();
    params.append('code', usersAuthorizationCode);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', redirect_uri);

    fetch('https://zoom.us/oauth/token', {
      method: 'post',
      headers: {
        Authorization: appAuthorizationString,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    }).then((response) => response.json())
      .then((data) => {
        res.locals.accessToken = `Bearer ${data.access_token}`;
        return next();
      });
  } catch (error) {
    return next(error);
  }
};

serverController.getMeetingID = async (req, res, next) => {
  try {
    const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      headers: {
        'Content-Type': 'application/json',
        authorization: res.locals.accessToken,
      },
    });
    const data = await response.json();
    const { meetings } = data;
    res.locals.classMeeting = {};

    for (let i = 0; i < meetings.length; i += 1) {
      if (meetings[i].pmi) {
        res.locals.classMeeting.pmiVal = meetings[i].pmi;
      }
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

serverController.getUUID = async (req, res, next) => {
  try {
    const { classMeeting } = res.locals;
    let data = await fetch(`https://api.zoom.us/v2/past_meetings/${classMeeting.pmiVal}/instances`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: res.locals.accessToken,
      },
    });
    data = await data.json();
    classMeeting.pmi = [];
    classMeeting.meetingUUIDs = [];
    classMeeting.startTime = [];
    for (let i = 0; i < data.meetings.length; i += 1) {
      classMeeting.pmi.push(res.locals.classMeeting.pmiVal);
      classMeeting.meetingUUIDs.push(data.meetings[i].uuid);
      classMeeting.startTime.push(data.meetings[i].start_time);
    }
    return next();
  } catch (error) {
    next(error);
  }
};
serverController.getParticipants = async (req, res, next) => {
  try {
    const { classMeeting } = res.locals;
    classMeeting.participants = [];
    for (let i = 0; i < classMeeting.meetingUUIDs.length; i += 1) {
      let data = await fetch(`https://api.zoom.us/v2/past_meetings/${classMeeting.meetingUUIDs[i]}/participants`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: res.locals.accessToken,
        },
      });
      data = await data.json();
      const { participants } = data;
      const tempArr = [];
      for (let j = 0; j < participants.length; j += 1) {
        if (!tempArr.includes(participants[j].name)) { tempArr.push(participants[j].name); }
      }
      classMeeting.participants.push(tempArr.sort());
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

serverController.addMeeting = async (req, res, next) => {
  try {
    const { classMeeting } = res.locals;
    for (let i = 0; i < classMeeting.meetingUUIDs.length; i += 1) {
      if (classMeeting.participants[i].length > 0) {
        const foundResult = await Class.findOne({ UUID: classMeeting.meetingUUIDs[i] });
        // console.log('foundClass result: ', data);
        if (foundResult === null) {
          Class.create(
            {
              PMI: classMeeting.pmi[i],
              UUID: classMeeting.meetingUUIDs[i],
              date: classMeeting.startTime[i],
              roster: [],
              attendance: classMeeting.participants[i],
            },
          );
        }
      }
    }
    return next();
  } catch (error) {
    return next(
      {
        log: 'Error occurred in serverController.addMeeting.',
        status: 404,
        message: { err: `An error occurred: ${error}` },
      },
    );
  }
};

module.exports = serverController;

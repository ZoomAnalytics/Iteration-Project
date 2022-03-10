const mongoose = require('mongoose');

// meeting ID
// UID
//

// Enter meeting ID
// post request to server
// server going to use Meeting ID to fetch from ZOOM the UUIDs for that meeting ID
// create new meeting ID in data base with the UUIDs attached in an array.

const classSchema = new mongoose.Schema(
  {
    PMI: { type: String, required: true },
    UUID: { type: String, unique: true },
    date: { type: String, required: true },
    roster: Array,
    attendance: Array,
  },
);



const Class = mongoose.model('class', classSchema);

module.exports = Class;

// {meetid: '222333',
// UUID: ['11223', '33133', '33123'],
// roster: ['mike','joe','jane']}
// attendance: ['mike' 'joe']

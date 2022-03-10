import React from 'react';

//response from backend:
  //meeting date & time
  //roster (empty array for now)
  //attendance list

//card:
  //header w/ Date & maybe time in bold
  //vertical list of names (w/ present/absent if roster used)

export const MeetingResult = (props) => {
  const attendanceArr = props.meeting.attendance;
  const rosterArr = props.meeting.roster;
  const arrToPassDown = [];
  attendanceArr.forEach(elem =>{
    if(rosterArr.includes(elem)){
      arrToPassDown.push(<PersonAttendance person={ {elem: 'present'} } />)
    } else {
      arrToPassDown.push(<PersonAttendance person={ {elem: 'absent'} } />)
    }
  })
  for(let i = 0; i < arrToPassDown.length; i++){}
  return(
    {arrToPassDown}
  )
}

export const PersonAttendance = () => {
  return(
    //person's name: attendance
  )
  //each personAttendance instance will be pushed into an array which is then rendered on meetingResult
  //each meetingResult renders onto App
}



// const testObj ={
//   date: "2022-03-05",
//   roster: ['Alex', 'Louie', 'Ian', 'James'],
//   attendance: ['Alex', 'Louie', 'Ian', 'James'],
// }
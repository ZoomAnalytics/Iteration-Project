import React from 'react';

//response from backend:
//meeting date & time
//roster (empty array for now)
//attendance list

//card:
//header w/ Date & maybe time in bold
//vertical list of names (w/ present/absent if roster used)

function MeetingResult(props) {
  console.log('meetingResult rendering');
  const { meetings } = props;
  // [
  //   {
  //     date: '2022-03-05',
  //     roster: ['Alex', 'Louie', 'Ian', 'James'],
  //     attendance: ['Alex', 'Louie', 'Ian'],
  //   },
  // ]

  //const { date } = props.meetings[0];
  const { attendance, roster } = meetings[0];
  // console.log('meetings: ', meetings);
  // console.log('attendance: ', attendance);
  // console.log('roster: ', roster);
  const arrToPassDown = [];
  roster.forEach((elem) => {
    if (attendance.includes(elem)) {
      arrToPassDown.push(<div>{elem}: present</div>);
    } else {
      arrToPassDown.push(<div>{elem}: absent</div>);
    }
  });

  return (
    <>
      <div>{meetings[0].date}</div>
      <div>{arrToPassDown}</div>
    </>
  );
}

// const testObj ={
//   date: "2022-03-05",
//   roster: ['Alex', 'Louie', 'Ian', 'James'],
//   attendance: ['Alex', 'Louie', 'Ian', 'James'],
// }

export default MeetingResult;

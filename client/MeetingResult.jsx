import React from 'react';

// response from backend:
// meeting date & time
// roster (empty array for now)
// attendance list

// card:
// header w/ Date & maybe time in bold
// vertical list of names (w/ present/absent if roster used)

function MeetingResult({ meetings }) {
  console.log('meetingResult rendering');
  // meetings prop is an array of objects
  console.log('props: ', meetings);

  // const { date, attendance, roster } = props;
  // console.log('props: ', date, attendance, roster);
  const arrToPassDown = [];

  // for (let i = 0; i < meetings.length; i += 1) {

  // }
  // take array of 2 objects and
  console.log(arrToPassDown);
  // let { date, attendance, roster } = meetings[i];
  // if (roster.length === 0) {
  //   roster = attendance;
  // }
  // console.log(meetings[i]);
  // have a parent div that contains the result of this
  // this is iterating through each meeting roster and creating a div for each participant marking them present or absent
  // const rosterArr = [];
  for (let i = 0; i < meetings.length; i += 1) {
    const meetingInstance = [];
    let { date, attendance, roster } = meetings[i];
    if (roster.length === 0) {
      roster = ['Alex Corlin', 'Louie Mendez', 'Ian Madden', 'James Ma', 'Tehya Rassman'];
    }

    roster.forEach((elem) => {
      if (attendance.includes(elem)) {
        meetingInstance.push(<div>
          {elem}
          : present
                             </div>);
      } else {
        meetingInstance.push(<div>
          {elem}
          : absent
                             </div>);
      }
    });
    arrToPassDown.push(meetingInstance);
    console.log('line 55', arrToPassDown);
  }
  // const { meeting } = props;
  // console.log('meeting prop: ', meeting)
  // [
  //   {
  //     date: '2022-03-05',
  //     roster: ['Alex', 'Louie', 'Ian', 'James'],
  //     attendance: ['Alex', 'Louie', 'Ian'],
  //   },
  // ]

  // const { date } = props.meetings[0];
  // const { attendance, roster } = meeting[0];
  // console.log('meetings: ', meetings);
  // console.log('attendance: ', attendance);
  // console.log('roster: ', roster);

  // return (
  //   <>
  //     {/* <div>{meeting[0].date}</div> */}
  //     <div>{arrToPassDown}</div>
  //   </>
  // );
  return (
    <div id="wrapper">
      {arrToPassDown.map((meeting, index) => (
        <div className="meeting" id={index} key={index}>
          <span style={{ color: 'red', fontWeight: 'bold' }}>

            Date:
            {' '}
            {meetings[index].date}
            <br />
            Class:
            {' '}
            {index + 1}

          </span>
          {' '}
          {meeting}
        </div>
      ))}
    </div>
  );
}

// const testObj ={
//   date: "2022-03-05",
//   roster: ['Alex', 'Louie', 'Ian', 'James'],
//   attendance: ['Alex', 'Louie', 'Ian', 'James'],
// }

export default MeetingResult;

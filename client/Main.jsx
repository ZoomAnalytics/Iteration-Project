import React, { useEffect, useState, useRef } from 'react';
import MeetingResult from './MeetingResult';
// let meetingsArr = [{ test: 'test' }];

function Main() {
  const [meetingResult, setMeetingResult] = useState([]);
  // const meetingResultArr = [];
  const shouldStart = useRef(false);
  const buttonClick = () => {
    shouldStart.current = true;
    console.log('button clicked');
    const monthVal = document.getElementById('month').value;
    const dayVal = document.getElementById('day').value;
    const yearVal = document.getElementById('year').value;

    let strForFetch = '';
    strForFetch = strForFetch.concat(yearVal, '-', monthVal, '-', dayVal);

    // fetch(`/classDate/${strForFetch}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     meetingsArr = data.meetings;
    //     for (let i = 0; i < meetingsArr.length; i += 1) {
    //       meetingResultArr.push(<MeetingResult meeting={meetingsArr[i]} />);
    //     }
    //   })
    //   .then((arrComp) => setMeetingResult(arrComp));

    const testResult = [
      {
        date: '2022-03-05',
        roster: ['Alex', 'Louie', 'Ian', 'James'],
        attendance: ['Alex', 'Louie', 'Ian'],
      },
    ];
    // const testComponent = <MeetingResult meeting={testResult[0]} />;
    setMeetingResult(testResult);
    // meetingsArr = [testObj];
    // meetingResultArr.push(<MeetingResult meeting={meetingsArr[0]} />);
    // console.log(meetingResultArr);
    //put logic to make roster = attendance if roster is empty array
  };
  //generate array of MeetingResult components

  return (
    <>
      <p>
        <label htmlFor="month">Date: </label>
        <select id="month">
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <label htmlFor="day"> </label>
        <select id="day">
          <option value="01">1</option>
          <option value="02">2</option>
          <option value="03">3</option>
          <option value="04">4</option>
          <option value="05">5</option>
          <option value="06">6</option>
          <option value="07">7</option>
          <option value="08">8</option>
          <option value="09">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
        </select>
        <label htmlFor="year"> </label>
        <select id="year">
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
        </select>
        <button onClick={buttonClick} id="select">
          Search
        </button>
      </p>
      <div>
        {shouldStart.current && <MeetingResult meetings={meetingResult} />}
      </div>
    </>
  );
}

export default Main;

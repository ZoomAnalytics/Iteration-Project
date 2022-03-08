import React from 'react';

function Sidebar(props) {
    return <div className = "app-sidebar">
        <div className = "app-sidebar-header">
            <h1> Zoom Features for Teachers </h1>    
            <button onClick = {props.addClass}> Add </button>
            <button onClick = {props.deleteClass}> Delete </button>
        </div>
        <div className = "app-sidebar-notes">
            <div className = "app-sidebar-note">
                <div className= "sidebar-note-title">
                    <strong> Import Class Name </strong>
                    {/* send req to backend to grab roster*/}
                    <button onClick = {props.addRoster}> Add Roster </button>
                    </div>
                    {/* <p> {props.importMeetingID} </p> */}

                    <small className = "note-meta">
                        Last modified [date]
                    </small>
                </div>
            </div>     
    </div>
}

export default Sidebar;
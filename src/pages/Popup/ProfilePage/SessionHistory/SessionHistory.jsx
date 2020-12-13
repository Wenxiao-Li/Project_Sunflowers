import React, { Component } from 'react';
import Chart from 'react-google-charts';
import { Button } from 'react-bootstrap';
import './SessionHistory.css';



export default function SessionHistory(props){

  var Date = JSON.parse(localStorage.getItem("Date"));
  var Length = JSON.parse(localStorage.getItem("Length"));
  return (
    <div>
      <div className="SsHis">
          <strong> Session History in Past 7 Days </strong>
        </div>
      
          <Chart
              width={360}
              height={250}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={[
                  ['Day', 'Focus Time'],
                  [Date[Date.length - 1], Number(Length[6])],
                  [Date[Date.length - 2], Number(Length[5])],
                  [Date[Date.length - 3], Number(Length[4])],
                  [Date[Date.length - 4], Number(Length[3])],
                  [Date[Date.length - 5], Number(Length[2])],
                  [Date[Date.length - 6], Number(Length[1])],
                  [Date[Date.length - 7], Number(Length[0])],
                  ]}
  //this.state.lengthOfWeek[0]
              options={{
                  
                  chartArea: { width: '75%' },
                  hAxis: {
                      title: 'Date',
                      minValue: 0,
                  },
                  vAxis: {
                  title: 'Focus Time',
                  },
              }}
              legendToggle
          />
      <div className = 'back'>
      <Button variant = "round" onClick={() => props.toProfile()}> Back </Button>
      </div>
    </div>
  ); 
}
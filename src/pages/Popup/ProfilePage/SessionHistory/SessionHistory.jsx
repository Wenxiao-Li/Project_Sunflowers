import React, { Component } from 'react';
import SunflowerBg from '../../../../assets/img/IMG_1277.jpg';
import firebase, { db } from '../../../Background/modules/firebaseconfig';

import Chart from 'react-google-charts';
class SessionHistory extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      lengthOfWeek: [],
      numberOfWeek: [],
      Date: [],
    };

    let Month = new Map();
    Month.set('Jan', '01');
    Month.set('Feb', '02');
    Month.set('Mar', '03');
    Month.set('Apr', '04');
    Month.set('May', '05');
    Month.set('Jun', '06');
    Month.set('Jul', '07');
    Month.set('Aug', '08');
    Month.set('Sep', '09');
    Month.set('Oct', '10');
    Month.set('Nov', '11');
    Month.set('Dec', '12');

    let Today = firebase.firestore.Timestamp.fromDate(new Date()).toDate();
    Today = Today.toString();
    Today = Today.split(' ');
    let thisDay = Month.get(Today[1]) + '/' + Today[2];

    console.log('load time zone is ' + loadTimeZone.toString());

    var sessionRef = db
      .collection('user')
      .doc(this.props.user.email)
      .collection('sessions');
    if (this.props.user) {
      sessionRef.get().then(
        function (querySnapshot) {
          let dayHistory = new Map(); // date/total session time
          let dayNumber = new Map(); // date/total session number
          let sessionPerDay = [];
          let lengthOfWeek = [];
          let Date = [];
          let Day = 0;
          let Mon = 1;

          //initialize session and length to 0, and initial Date to print
          for (let i = 0; i < 7; i++) {
            sessionPerDay.push(0);
            lengthOfWeek.push(0);

            Day = parseInt(Today[2]) - i;
            Mon = parseInt(Month.get(Today[1]));
            if (Day <= 0) {
              Mon -= 1;
              if (
                ['Jan', 'Mar', 'Mar', 'Jul', 'Aug', 'Oct', 'Dec'].includes(
                  thisDay[1]
                )
              ) {
                Day = 32 + parseInt(Today[2]) - i;
              } else if (['Apr', 'Jun', 'Sep', 'Nov'].includes(thisDay[1])) {
                Day = 31 + parseInt(Today[2]) - i;
              } else {
                if (parseInt(Today[3]) % 4 == 0) {
                  Day = 30 + parseInt(Today[2]) - i;
                } else Day = 29 + parseInt(Today[2]) - i;
              }
            }
            if (i == 0) {
              Date.push(thisDay);
            } else {
              if (Day >= 10) Date.push(Mon.toString() + '/' + Day.toString());
              else Date.push(Mon.toString() + '/0' + Day.toString());
            }
          }

          querySnapshot.forEach(function (doc) {
            let sessionDate = doc.data().start_time.toDate();
            console.log(sessionDate);
            sessionDate = sessionDate.toString();
            sessionDate = sessionDate.split(' ');
            sessionDate = Month.get(sessionDate[1]) + '/' + sessionDate[2];

            if (dayHistory.has(sessionDate) && doc.data().is_complete == true) {
              dayHistory.set(
                sessionDate,
                dayHistory.get(sessionDate) + doc.data().session_length
              );
              dayNumber.set(sessionDate, dayNumber.get(sessionDate) + 1);
            } else if (
              !dayHistory.has(sessionDate) &&
              doc.data().is_complete == true
            ) {
              dayHistory.set(sessionDate, doc.data().session_length);
              dayNumber.set(sessionDate, 1);
            }
          });

          let keyArray = Array.from(dayHistory.keys()); //sort the key by time
          console.log(keyArray);

          for (let i = keyArray.length - 1; i >= 0; i--) {
            if (Date.includes(keyArray[i])) {
              for (let j = 0; j < Date.length; j++) {
                if (keyArray[i] == Date[j]) {
                  lengthOfWeek[j] = dayHistory.get(keyArray[i]);
                  sessionPerDay[j] = dayNumber.get(keyArray[i]);
                }
              }
            }
          }

          console.log(Date);
          console.log(lengthOfWeek);
          console.log(sessionPerDay);

          this.setState({
            user: this.props.user,
            lengthOfWeek: lengthOfWeek,
            numberOfWeek: sessionPerDay,
            Date: Date,
          });
        }.bind(this)
      );

      console.log('constructor done');
    }
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    var email = 'undefined';
    var userName = 'undefined';
    if (this.props.user) {
      email = this.props.user.email;
      userName = this.props.user.displayName;
    }
    return (
      <div>
        <img src={SunflowerBg} />
        <h1 id="page-name">You are signed in</h1>
        <h3> Session History</h3>
        <Chart
          width={400}
          height={250}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Day', 'Focus Time'],
            [
              this.state.Date[this.state.Date.length - 1],
              Number(this.state.lengthOfWeek[6]),
            ],
            [
              this.state.Date[this.state.Date.length - 2],
              Number(this.state.lengthOfWeek[5]),
            ],
            [
              this.state.Date[this.state.Date.length - 3],
              Number(this.state.lengthOfWeek[4]),
            ],
            [
              this.state.Date[this.state.Date.length - 4],
              Number(this.state.lengthOfWeek[3]),
            ],
            [
              this.state.Date[this.state.Date.length - 5],
              Number(this.state.lengthOfWeek[2]),
            ],
            [
              this.state.Date[this.state.Date.length - 6],
              Number(this.state.lengthOfWeek[1]),
            ],
            [
              this.state.Date[this.state.Date.length - 7],
              Number(this.state.lengthOfWeek[0]),
            ],
          ]}
          options={{
            title: this.state.user.displayName + ' Focus History',
            chartArea: { width: '40%' },
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
        <button onClick={() => this.props.toProfile()}> Back </button>
      </div>
    );
  }
}

export default SessionHistory;

import { getSessions, Today } from '../../model/historyDAO';

let DisplayDate = [];
let DisplayLength = [];
let DisplayNum = [];

export const viewHistory = (querySnapshot) => {
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
  console.log('going here!!!!!');

  let CopyToday = Today;
  CopyToday = CopyToday.toString();
  CopyToday = CopyToday.split(' ');
  let thisDay = Month.get(CopyToday[1]) + '/' + CopyToday[2];

  var sessionRef = querySnapshot;
  if (true) {
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

      Day = parseInt(CopyToday[2]) - i;
      Mon = parseInt(Month.get(CopyToday[1]));
      if (Day <= 0) {
        Mon -= 1;
        if (
          ['Jan', 'Mar', 'Mar', 'Jul', 'Aug', 'Oct', 'Dec'].includes(thisDay[1])
        ) {
          Day = 32 + parseInt(CopyToday[2]) - i;
        } else if (['Apr', 'Jun', 'Sep', 'Nov'].includes(thisDay[1])) {
          Day = 31 + parseInt(CopyToday[2]) - i;
        } else {
          if (parseInt(CopyToday[3]) % 4 == 0) {
            Day = 30 + parseInt(CopyToday[2]) - i;
          } else Day = 29 + parseInt(CopyToday[2]) - i;
        }
      }
      if (i == 0) {
        Date.push(thisDay);
      } else {
        if (Day >= 10) Date.push(Mon.toString() + '/' + Day.toString());
        else Date.push(Mon.toString() + '/0' + Day.toString());
      }
    }

    console.log(Date);

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

    DisplayDate = Date;
    DisplayLength = lengthOfWeek;
    DisplayNum = sessionPerDay;

    console.log(DisplayDate);
    console.log(DisplayLength);
    console.log(DisplayNum);

    localStorage.setItem('Date', JSON.stringify(DisplayDate));
    localStorage.setItem('Length', JSON.stringify(DisplayLength));
  }
};

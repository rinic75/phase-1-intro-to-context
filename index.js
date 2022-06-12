// Your code here
function createEmployeeRecord(arr) {
  return {
    firstName : arr[0],
    familyName : arr[1],
    title : arr[2],
    payPerHour : arr[3],
    timeInEvents : [],
    timeOutEvents : []
  }
}

function createEmployeeRecords(arr) {
  return arr.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(record, dataStamp) {
  let [date, hour] = dataStamp.split(' ');
  let realHour = parseInt(hour, 10);

  record.timeInEvents.push({
    type : "TimeIn",
    hour : realHour,
    date
  })
  
  return record;
} 

function createTimeOutEvent(record, dataStamp) {
  let [date, hour] = dataStamp.split(' ');
  let realHour = parseInt(hour, 10);

  record.timeOutEvents.push({
    type : "TimeOut",
    hour : realHour,
    date
  })
  
  return record;
} 

function hoursWorkedOnDate(record, givenDate) {
  let timeIn = record.timeInEvents.find((e) => e.date === givenDate);
  let timeInHour = timeIn.hour;
  let timeOut = record.timeOutEvents.find((e) => e.date === givenDate);
  let timeOutHour = timeOut.hour;

  return (timeOutHour - timeInHour)/100;
}

function wagesEarnedOnDate (record, givenDate) {
  let workedHours = hoursWorkedOnDate(record, givenDate);
  let wage = workedHours * record.payPerHour;
  return wage;
}

function allWagesFor(record) {
  const owedDate = record.timeOutEvents.map(e=> e.date)

  console.log('owedDate: ', owedDate);
  console.log(owedDate instanceof Array);

  const owedWage = owedDate.reduce((init, d) => init + wagesEarnedOnDate(record, d),0)

  return owedWage;
}

function calculatePayroll(arr) {
  return arr.reduce((init, record) => init + allWagesFor(record),0)
}







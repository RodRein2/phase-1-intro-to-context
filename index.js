function createEmployeeRecord(arr) {
    const [firstName, familyName, title, payPerHour] = arr;
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, timestamp) {
    const [date, hour] = timestamp.split(" ");
    const timeInEvent = {
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10),
    };
  
    employee.timeInEvents.push(timeInEvent);
    return employee;
  }
  
  function createTimeOutEvent(employee, timestamp) {
    const [date, hour] = timestamp.split(" ");
    const timeOutEvent = {
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10),
    };
  
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find((event) => event.date === date);
    const timeOut = employee.timeOutEvents.find((event) => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const hourlyRate = employee.payPerHour;
    return hoursWorked * hourlyRate;
  }
  
  function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => total + wagesEarnedOnDate(employee, event.date), 0);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
  }
  
  function findEmployeeByFirstName(employees, firstName) {
    return employees.find((employee) => employee.firstName === firstName);
  }
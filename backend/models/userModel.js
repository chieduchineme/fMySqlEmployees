const {mysqlConnection} = require('../config/db');

exports.registerEmployee = (EmployeeDetails) => {
  return new Promise(function myFn(resolve,reject) {
    let emp = EmployeeDetails; 
    var sql = "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Email = ?; SET @Salary = ?; \
    CALL EmployeeAndOrEdit(@EmpID, @Name, @EmpCode, @Salary);";
    mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Email, emp.Salary], (err, rows, field) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
    })
  })
}

exports.updateEmployee = (EmployeeId, EmployeeDetails) => {
  return new Promise(function myFn(resolve,reject) {
    let emp = EmployeeDetails; 
    var sql = "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Email = ?; SET @Salary = ?; \
    CALL EmployeeAndOrEdit(@EmpID, @Name, @EmpCode, @Salary);";
    mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Email, emp.Salary], [EmployeeId], (err, rows, field) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
    })
  })
}

exports.deleteEmployee = (EmployeeId) => {
  return new Promise(function myFn(resolve,reject) {
    mysqlConnection.query('DELETE FROM Employee WHERE EmpID =?',[EmployeeId], (err, rows, field) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
    })
  })
}

exports.findEmployeeById = (EmployeeId) => {
  return new Promise(function myFn(resolve,reject) {
    mysqlConnection.query('SELECT * FROM Employee WHERE EmpID =? LIMIT 1',[EmployeeId], (err, rows, field) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
    })
  })
}

exports.findEmployeeByName = (EmployeeName) => {
  return new Promise(function myFn(resolve,reject) {
    mysqlConnection.query('SELECT * FROM Employee WHERE Name =? LIMIT 1',[EmployeeName], (err, rows, field) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
    })
  })
}

exports.findEmployeeByEmail = (EmployeeEmail) => {
  return new Promise(function myFn(resolve,reject) {
    mysqlConnection.query('SELECT * FROM Employee WHERE Email =? LIMIT 1',[EmployeeEmail], (err, rows, field) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
    })
  })
}

exports.getEmployees = () => {
  return new Promise(function myFn(resolve,reject) {
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, field) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
    })
  })
}

exports.loginUser = (loginDetails) => {
    return new Promise(function myFn(resolve,reject) {
        const responseArray = [];
        const { input, password } = loginDetails;
        // Determine whether input is an email or a username using regex
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
       
        //  Find user with matching email or username
       if(isEmail) {
          var user = userModel.findEmployeeByEmail(input)
        } else {
          var user = userModel.findEmployeeByName(input)
        }

        if (user) { 
            responseArray.push({"user": user})
            var match = compare(password, user.password);
        }

        if (match) { 
            // Compare password
            responseArray.push({"match": match});
            // Note: Here we use user.email as the email payload because we don't know whether the user entered an email or a username
            const token = sign({ email: user.email, roles: user.roles }, process.env.SECRET_KEY, { expiresIn: '1h' });
            responseArray.push({token: token});
        }

        function getResponseArray() {  return responseArray  }

        getResponseArray()
            .then(function(savedData) {
                resolve(savedData);
            })
            .catch(function(err) {
                reject(err);
            });
        }
)}
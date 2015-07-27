employeeList =  new Mongo.Collection('Employees');

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}

if (Meteor.isClient) {

    //Template.gameboard.employee

/*
    selectedEmployee:function()
    {
        return Session.get('session_employee_selected');
    }
    */

    Template.gameboard.helpers({
        printScore: function()
        {
            return employeeList.find({},{sort:{score:-1,name:1}});
        },

        selectedClass:function() {
            if (this._id == Session.get('session_employee_selected')) {
                return "selected";
            }

        }
    });

    // Events section

    Template.gameboard.events({
        //all client event functions goes here.
        'click .htmlStyle_Employee':function()
        {
            var employeeId = this._id;
            Session.set('session_employee_selected',employeeId);
        },
        'click .addPoints':function()
        {
            employeeList.update(Session.get('session_employee_selected'),{$inc:{score:5}});
        },
        'click .removePoints':function()
        {
            employeeList.update(Session.get('session_employee_selected'),{$inc:{score:-5}});
        }

    })

    //events for addEmployeeForm template
    Template.addEmployeeForm.events({
        "submit form":function(){
            event.preventDefault();
            var employeeName = event.target.empName.value;
            var employeeScore = event.target.empScore.value;
            var employeeTitle = event.target.empTitle.value;
            var employeeSex = event.target.empSex.value;
            var employeeDept = event.target.empDept.value;

            employeeList.insert({
                name:employeeName,
                score:employeeScore,
                title:employeeTitle,
                sex:employeeSex,
                department:employeeDept
            });
        }

    })

    // counter starts at 0
    Session.setDefault('counter', 0);


    Template.hello.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });
}

/**
 * Created by dinesh on 6/26/15.
 */

Router.configure({
        layoutTemplate:'layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'notFound'
        //waitOn: function() { return Meteor.subscribe('employeeList'); }
    }
);

Router.route('/',{name:'gameboard'});


Router.route('/employeeList/:_id', {
    name: 'empDetailsPage',
    data: function() { return employeeList.findOne(this.params._id); }
});

Router.onBeforeAction('dataNotFound', {only: 'empDetailsPage'});

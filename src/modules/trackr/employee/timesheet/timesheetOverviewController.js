define([], function() {
    'use strict';
    return ['$scope', 'Restangular', '$filter', 'base.services.user', function($scope, Restangular, $filter, UserService) {
        var controller = this;
        $scope.month = new Date();
        $scope.month.setDate(1);
        //This needs to be a scope variable because the datepicker changes it, so a constant is not useable in the template.
        $scope.datepickerMode = 'month';

        $scope.monthChange = function() {
            controller.showMonth($scope.month);
        };

        controller.showMonth = function(date) {
            var end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59); //last day of month
            Restangular.allUrl('workTimes', 'api/workTimes/search/findByEmployeeAndDateBetweenOrderByDateAscStartTimeAsc')
                .getList({
                    employee: UserService.getUser().id,
                    start: $filter('date')(date, 'yyyy-MM-dd'),
                    end: $filter('date')(end, 'yyyy-MM-dd'),
                    projection: 'withProject'
                }).then(function(workTimes) {
                    $scope.workTimes = workTimes;
                });
        };

        controller.showMonth($scope.month);
    }];
});
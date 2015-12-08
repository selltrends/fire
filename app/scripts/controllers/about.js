'use strict';

/**
 * @ngdoc function
 * @name fireApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fireApp
 */
angular.module('fireApp')
  .factory("usersMessages", ["$firebaseArray",
    function($firebaseArray) {
    // create a reference to the database location where we will store our data
    //var randomRoomId = Math.round(Math.random() * 100000000);
    //var ref = new Firebase("https://cheok.firebaseio.com/" + randomRoomId);
    var ref = new Firebase("https://cheok.firebaseio.com/users");


    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
    }
  ])
  .controller('AboutCtrl', function ($scope, usersMessages) {
    $scope.user = "Guest " + Math.round(Math.random() * 100);

    // we add chatMessages array to the scope to be used in our ng-repeat
    $scope.messages = usersMessages;

    // a method to create new messages; called by ng-submit
    $scope.addMessage = function() {
      // calling $add on a synchronized array is like Array.push(),
      // except that it saves the changes to our database!
      $scope.messages.$add({
        from: $scope.user,
        content: $scope.message
      });

      // reset the message input
      $scope.message = "";
    };

    // if the messages are empty, add something for fun!
    $scope.messages.$loaded(function() {
      if ($scope.messages.length === 0) {
        $scope.messages.$add({
          from: "Firebase Docs ...",
          content: "Hello world! users test"
        });
      }
    });
  });

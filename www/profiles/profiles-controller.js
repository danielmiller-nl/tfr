angular.module('profile.controllers', [])

.controller('ProfileCtrl', function($scope, $stateParams, $state, User, CandidatesFactory, MatchesFactory) {
  $scope.User = User;

console.log('ProfileCtrl');
console.log($stateParams);
  
  switch($stateParams.type){
    case 'swipe':
      $scope.profile = CandidatesFactory.getFirst();
      break;
    case 'matches':
      $scope.profile = MatchesFactory.get($stateParams.id);
      break;
    default:
      $scope.profile = User.profile;
      break;
  }

  $scope.profile.matched = true;

  //Need to tell the profile which sub-template - "edit my profile" 
  //"like or skip" "contact info" - to render within the profile

  $scope.candidateSwipe =  function (match){

    CandidatesFactory.remove();   

    if (match) {

      //Once server is up, this will be a POST request to the server
      MatchesFactory.add($scope.currentCandidate);
    }

    $state.go('tab.matches');

  };
})
  // $scope.pass = function(profile){
  //   console.log(profile)
  // }

  // // basic match function, example use only
  // $scope.like = function(profile){
  //   profile.matched = true;
  //   console.log(profile)
  //   MatchesFact.add(profile);
  //   $state.go('tab.matches');
  // }



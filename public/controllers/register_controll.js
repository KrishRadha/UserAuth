var registerapp=angular.module('register_app',[]);

registerapp.controller('RegisterCont',['$scope','$http', '$compile','$sce',
                            
                           
    function RegisterCont($scope,$http,$compile,$sce){
    
  $scope.registerNow=function(){  
    
    $http.post('/register',$scope.user).success(function(response){
            
            
             $(document).ready(function(){
             if(response.error)
             {
             var string='';
                 string = '<div class="alert alert-danger">'+response['error']+'</div>';
             $("#error_reg_box").html(string);
             }
                 else if(response.done)
                 {
                     var string='';
                     string='<div class="jumbotron">Please verify your mail now, by visiting your email and click on the Verification link we just mailed to you. We can not wait to see you at Indian Panther. You will be redirected shortly</div>';
                     $("#error_reg_box").html(string);
                     setTimeout(function() { window.location ='/'; }, 5000);
                     
                 }
             
             });
            });
  }
  
    
    }]);
              
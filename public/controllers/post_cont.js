var postapp=angular.module('post_app',[]);



postapp.controller('PostCont',['$scope','$http', '$compile',
                            
                           
    function PostCont($scope,$http,$compile){ 
    
    console.log("post_controller_working");
        
        $http.get('/tags').success(function(response)
             {
        
        
             $scope.tags=response;
                 
                var length= $scope.tags.length;
            var string='';
            
            for(var i=0;i<length;i++)
            {
            string=string+'<option value="'+$scope.tags[i]._id+'">'+$scope.tags[i].name+'</option>';
            }
            
            
            $(document).ready(function(){
                 
                 $("#dyn_select").html($compile(string)($scope));
                 
                 });
            
        });
        
        $scope.PostLink=function(){
            
            
            $http.post('/posts',$scope.post).success(function(response){
            
            
             window.location = location.origin+"/tags.html";
            
            });
            
        }
        
    
    
    
    
    }]);
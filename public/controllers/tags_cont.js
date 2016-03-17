var tagsapp=angular.module('tags_app',[]);



tagsapp.directive('postlist',function(){
    
    
    return {
    
    restrict : 'A',
    templateUrl : 'post-list-template.html'
    
    
    
    };
    
    
    
});


tagsapp.directive('postdesign',function(){
    
    
    return {
    
    restrict : 'A',
    templateUrl : 'post-design-template.html'
    
    
    
    };
    
    
    
});

tagsapp.controller('TagsCont',['$scope','$http', '$compile','$sce',
                            
                           
    function TagsCont($scope,$http,$compile,$sce){
              
              
         console.log("tags_controller_working");
         
          $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
         
        /* --------------------------------------- GETTING THE TAGS AND GENERATING A TABLE -------------------------------------*/
            
             $http.get('/tags').success(function(response)
             {
                 $scope.tags=response;
                 
                var length= $scope.tags.length;
                 var cols=3;
                 
                 var color=Array(2);
                  color[0]='#1abc9c';
                  color[1]='#3498db';
                 
                 var string='';
                 
                 for(var i=0;i<length/cols;i++)
                 {
                     string= string+'<tr style="background-color:'+color[(i)%2]+'">';
                     
                     for(var j=0;j<cols;j++){
                         
                     string=string+'<td><h4><a href ng-click="tagselect('+"'"+$scope.tags[i*cols+j]._id+"'"+')" class="header_butt">'+$scope.tags[i*cols+j].name+'</a></h4></td>';
                     }
                     
                     string= string+'</tr>';
                 }
                 
                 $(document).ready(function(){
                 
                 $("#the_tags").html($compile(string)($scope));
                 
                 });
                 
             });
    
            /*----------------------------------------------------------------------------------------------------------------*/
         
         
       $scope.tagselect=function(id){
           
           
           console.log('selected the' +id);
           
           
           
           $http.get('/tags/'+id).success(function(response){
           
               //console.log('response being logged'+response);
               
               var wtag=response.pop();
             //  console.log(response);
               
               $scope.posts = response;
               
               var string='';
             
           
               
               string ='<div style="color:white" align="center"><h1>'+wtag+'</h1></div><div class="row"><div class="container"><div ng-repeat="post in posts"><div postlist></div></div></div></div>';
            $(document).ready(function(){
                 
                 $("#contain_stuff").html($compile(string)($scope));
                 
                 });
           
           });
       };
        
       
                 $scope.Postopen = function(id){
                 
                      $http.get('/posts/'+id).success(function(response){
                    
                     $scope.post=response;
                          
                 var string='';
                     
                     string='<div postdesign></div>';
                 
                 console.log('opening post' +id);
                     
                 
                 $(document).ready(function(){
                 
                 $("#contain_stuff").html($compile(string)($scope));
                 
                 });
                 });
                 
                 };
                 
                 
                 
                 
             
         
          
         
  }
                               
                               
          
                               
                            
    ]);





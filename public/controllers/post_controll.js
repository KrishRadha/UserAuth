var postapp=angular.module('post_app',[]);

postapp.controller('PostCont',['$scope','$http', '$compile','$sce',
                            
                           
    function PostCont($scope,$http,$compile,$sce){
        
        
      
        
        
              function checkImage(imageSrc, good, bad) {
    var img = new Image();
    img.onload = good; 
    img.onerror = bad;
    img.src = imageSrc;
}
        
        $scope.PostNow=function(){
            
    $(document).ready(function(){
    var markupStr = $('#summernotes').summernote('code');
        $scope.post.matter=markupStr;
         //console.log($("#handlesummer").val());
    
    });
            checkImage($scope.post.featurl,function(){
            
  $http.post('/post',$scope.post).success(function(response){
  
  
  $(document).ready(function(){
             if(response.error)
             {
             var string='';
                 string = '<div class="alert alert-danger">'+response['error']+'</div>';
             $("#error_post_box").html(string);
             }
                 else if(response.done)
                 {
                     var string='';
                     string='<div class="alert alert-success">POSTED.. redirecting</div>';
                     $("#error_post_box").html(string);
                     setTimeout(function() { window.location ='/dashboard'; }, 5000);
                     
                 }
             
             });
  
  
  
  
  });},function(){var string='';
                 string = '<div class="alert alert-danger">Not a valid Feature URL</div>';
             $("#error_post_box").html(string);});
        }
  
    
    }]);
              
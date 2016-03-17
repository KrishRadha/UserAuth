var dashapp=angular.module('dashboardapp',[]);


dashapp.controller('DashCont',['$scope','$http', '$compile','$sce',
                            
                           
    function DashCont($scope,$http,$compile,$sce){
    
//
    
$http.get('/trends').success(function(response){
        
    //trends colors
    $(document).ready(function(){
    
    var color1='#e67e22';
    var color2='#f1c40f';
    
     var string='';
        if(response.error)
        {
           
            string=string+'<tr><td style="background-color:'+color1+'">'+response.error+'</td></tr> ';
            
            $("#trendset").html(string);
        }
            else if(response.done)
            {
                
                var trends=response.done;
                for(i in trends)
                {
                    if(i%2==0)
                    string=string+'<tr><td style="background-color:'+color1+'">'+trends[i]+'</td></tr> ';
                    else
                        string=string+'<tr><td style="background-color:'+color2+'">'+trends[i]+'</td></tr> ';
                   
                        
                }
                 
            $("#trendset").html(string);
            }
        
        });
        });
        
        $http.get('/news').success(function(response){
            
            
            
        });
        
        
    
    }]);
              
module.exports = {
    
  getDateTime: function () {
      
      
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    // whatever
      
      
      return year+month+day+hour+min+sec;
  },
    
    
RandStr:function(len)
    {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567891234567890!@#$%^&*";

    for( var i=0; i < len; i++ )
        text =text+ possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

    },
    
TagSep:function(str)
    {
    
    var len=str.length;
        var rez=[];
        var indexlog=0;
        rez[indexlog]='';
        for(var i=0;i<len;i++)
        {
            
            if(str[i]==',')
            {
                indexlog++;
                rez[indexlog]='';
            }
            else{
                rez[indexlog]=rez[indexlog]+str[i];
            }
        }
        
        return rez;
    
    
    }
 
 
};
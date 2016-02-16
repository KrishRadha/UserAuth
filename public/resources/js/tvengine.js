/* AUTHOR : KAVULURU RADHA KRISHNA */





var SchemaHour ={

    /*  9 AM - 9 PM */

    PL0910 : 'PLDcEtgLwQdoo9DxobB8QDEPyNvbPO1iOy',
    PL1011 :'PLDcEtgLwQdopmvr6Hvw7UEshZTyiXGlXN',
    PL1112 :'PLDcEtgLwQdoqhgidK9qibHppcMuRzWC9F',
    PL1213 :'PLDcEtgLwQdorDcvF9jsITZ7WuVxgzr-nF',
    PL1314 :'PLDcEtgLwQdoq09yF68GK75OV_4PjNwM48',
    PL1415 :'PLDcEtgLwQdooYK7ggVamZz8HUqWaeeaEg',
    PL1516:'PLDcEtgLwQdoqgHdkbPAwOxe0TM-MZ2DxC',
    PL1617 :'PLDcEtgLwQdoo_6WydGh6T17NG7-R0g3uY',
    PL1718 :'PLDcEtgLwQdoreDWKKS1VA-kQYpuVGVNr3',
    PL1819 :'PLDcEtgLwQdoq5m4WU41WClDlSF4Lu6pgV',
    PL1920 :'PLDcEtgLwQdooJ_SwuNfCcHgvslu0mbO0D',
    PL2021 :'PLDcEtgLwQdooC3tNFX1S3iX4n8mLP1_3A',
    
    /*  9 PM - 9 AM */


    PL2122 : 'PLDcEtgLwQdoo9DxobB8QDEPyNvbPO1iOy',
    PL2223 :'PLDcEtgLwQdopmvr6Hvw7UEshZTyiXGlXN',
    PL2324 :'PLDcEtgLwQdoqhgidK9qibHppcMuRzWC9F',
    PL2401 :'PLDcEtgLwQdorDcvF9jsITZ7WuVxgzr-nF',
    PL0102 :'PLDcEtgLwQdoq09yF68GK75OV_4PjNwM48',
    PL0203 :'PLDcEtgLwQdooYK7ggVamZz8HUqWaeeaEg',
    PL0304:'PLDcEtgLwQdoqgHdkbPAwOxe0TM-MZ2DxC',
    PL0405 :'PLDcEtgLwQdoo_6WydGh6T17NG7-R0g3uY',
    PL0506 :'PLDcEtgLwQdoreDWKKS1VA-kQYpuVGVNr3',
    PL0607 :'PLDcEtgLwQdoq5m4WU41WClDlSF4Lu6pgV',
    PL0708 :'PLDcEtgLwQdooJ_SwuNfCcHgvslu0mbO0D',
    PL0809 :'PLDcEtgLwQdooC3tNFX1S3iX4n8mLP1_3A'

};

var date = new Date();

var hour = date.getHours();

 hour = (hour < 10 ? "0" : "") + hour;
var next = parseInt(hour)+1;
 next = (next < 10 ? "0" : "") + next;

var Schema = 'PL'+hour+next;


$(document).ready(function()
{
    console.log(Schema);
    var play = SchemaHour[Schema];
    var sdd=' <iframe width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?list='+play+'&autoplay=1&controls=0&showinfo=0&autohide=1&modestbranding=1" frameborder="0" allowfullscreen></iframe>';
    $("#INDIANPANTHERTV").html(
    
    sdd
    
    );
});
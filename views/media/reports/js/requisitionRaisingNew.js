
function openNav() {
	  document.getElementById("mySidebar").style.width = "250px";
	  document.getElementById("main").style.marginLeft = "0px";
	}

	function closeNav() {
	  document.getElementById("mySidebar").style.width = "0";
	  document.getElementById("main").style.marginLeft= "0";
	}
	
$(function() {    
	  var isXS = false,
	      $accordionXSCollapse = $('.accordion-xs-collapse');

	  // Window resize event (debounced)
	  var timer;
	  $(window).resize(function () {
	      if (timer) { clearTimeout(timer); }
	      timer = setTimeout(function () {
	          isXS = Modernizr.mq('only screen and (max-width: 767px)');
	          
	          // Add/remove collapse class as needed
	          if (isXS) {
	              $accordionXSCollapse.addClass('collapse');               
	          } else {
	              $accordionXSCollapse.removeClass('collapse');
	          }
	      }, 100);
	  }).trigger('resize'); //trigger window resize on pageload    
	  
	  // Initialise the Bootstrap Collapse
	  $accordionXSCollapse.each(function () {
	      $(this).collapse({ toggle: false });
	  });      
	  
	  // <a href="https://www.jqueryscript.net/accordion/">Accordion</a> toggle click event (live)
	  $(document).on('click', '.accordion-xs-toggle', function (e) {
	      e.preventDefault();
	      
	      var $thisToggle = $(this),
	          $targetRow = $thisToggle.parent('.tr'),
	          $targetCollapse = $targetRow.find('.accordion-xs-collapse');            
	    
	      if (isXS && $targetCollapse.length) { 
	          var $siblingRow = $targetRow.siblings('.tr'),
	              $siblingToggle = $siblingRow.find('.accordion-xs-toggle'),
	              $siblingCollapse = $siblingRow.find('.accordion-xs-collapse');
	          
	          $targetCollapse.collapse('toggle'); //toggle this collapse
	          $siblingCollapse.collapse('hide'); //close siblings
	          
	          $thisToggle.toggleClass('collapsed'); //class used for icon marker
	          $siblingToggle.removeClass('collapsed'); //remove sibling marker class
	      }
	  });
	});
	
var selectedtestbills=[];
var selectedtest=[];

var selectedlab=[];

var testfornotaddviews="";

var mymapvalue = new Map();
var newmymapvalue = new Map();
var viewsmymapvalue = new Map();

var newarrayappdatalababsed=[];

if(document.getElementsByName('newlabtestcodearray')!=undefined)
	{

	}
else
	{
	newarrayappdatalababsed=[];

	}


function closeprevreq()
{
	$('#myModalHorizontalprevreq').modal('hide');


	}


function deleteRowPrvReqDtl(labCode,testCode,reqNo,testGroupCode1,testname)

{
	// alert("testGroupCode1"+testGroupCode1);
	var msgg="Are You Sure to Delete Test "+testname+" ?";
	var sumsgg="Test "+testname+" has been Successfully deleted.";
	
	swal({
  title: msgg,
  text: "",
  type: "warning",
  showCancelButton: true,
  confirmButtonClass: "btn-danger",
  confirmButtonText: "Yes, delete it!",
  closeOnConfirm: false
},
function(){

	var isdelete=false;
	  if(checkBillingDetail(labCode,testCode,reqNo) == 1){

		//  alert("checkbill");
  		  isdelete= updateReqTable(labCode,testCode,reqNo,"1",testGroupCode1);

	  }
	  else
  	  {
		 // alert("not checkbill");
		  isdelete= updateReqTable(labCode,testCode,reqNo,"2",testGroupCode1);
  	  }
	 // alert("checkbillfinal"+isdelete);
	  showprevreqmodal(testname);
  swal("Deleted!", sumsgg, "success");
});
	
	 /* var retVal = "";
	 if(testGroupCode1=="0")
		 {
		  retVal = confirm("Are You Sure to Delete it?");
		 }
	 else
		 {
		  retVal = confirm("Are You Sure to Delete Group?");
		 }
		 
	 // var retVal = confirm("Are You Sure to Delete it?");
    if( retVal == true ){

  	  document.getElementsByName('delTestCode')[0].value=testCode;
  	  document.getElementsByName('delLabCode')[0].value=labCode;
  	  if(checkBillingDetail(labCode,testCode,reqNo) == 1){

  		  updateReqTable(labCode,testCode,reqNo,"1",testGroupCode1);
      	  
      	  showPrvDetail(); 
        }
  	  else
      	  {
      	 // alert("The Requisition can be cancelled only if billing has been done.");
  		  updateReqTable(labCode,testCode,reqNo,"2",testGroupCode1);
      	  
      	  showPrvDetail(); 

      	  }

      	
    }
    else{
   	  //alert("User does not want to continue!....");
       return false;
    } */
	 
	   
	  
}

function updateReqTable(labCode,testCode,reqNo,isbilledornot,groupraisedalready)
{

	var flg = false;
	var isRequisitonRaisingPresent = false;
	var _mode = "DELETEREQDTL";  
	var objXHR = {url: "/HISInvestigationG5/new_investigation/investigationReqRaising.cnt?hmode="+_mode+"&delLabCode="+labCode+"&delTestCode="+testCode+"&requisitionNo="+reqNo+"&isbilledornot="+isbilledornot+"&groupraisedalready="+groupraisedalready, sync:true, postData: "", handleAs: "text",
		load: function(data) 
		{
			//alert(data);
			isRequisitonRaisingPresent = data;
			flg = true;
		},
        error: function(error)
        {
            //if(typeof objKitchenList == 'undefined' || objKitchenList==null || objKitchenList=="" || objKitchenList.length==0)
            	//alert("No Kitchen Found");
            //alert(error+"Error while populating Meal Time Information");
            isRequisitonRaisingPresent = false;
            flg = false;
        }};

	var objDojoAjax = dojo.xhrPost(objXHR);
	return flg;
}


 function checkBillingDetail(labCode,testCode,reqNo)
{
	
	var flg = false;
	var isBillingDone = false;
	var _mode = "CHECKBILLDTL";  
	var objXHR = {url: "/HISInvestigationG5/new_investigation/investigationReqRaising.cnt?hmode="+_mode+"&delLabCode="+labCode+"&delTestCode="+testCode+"&requisitionNo="+reqNo, sync:true, postData: "", handleAs: "text",
		load: function(data) 
		{
			//alert(data);
			isBillingDone = data;
			flg = true;
		},
        error: function(error)
        {
            //if(typeof objKitchenList == 'undefined' || objKitchenList==null || objKitchenList=="" || objKitchenList.length==0)
            	//alert("No Kitchen Found");
            //alert(error+"Error while populating Meal Time Information");
            isBillingDone = false;
            flg = false;
        }};

	var objDojoAjax = dojo.xhrPost(objXHR);
	return isBillingDone;
}


 
function settblsearchtest()
{

for(var g=0;g<document.getElementsByName("testshowforadd").length;g++)
{ 

	document.getElementsByName('testshowforadd')[g].checked=false;
	document.getElementsByName('testshowforadd')[g].disabled =false;

}

if(document.getElementsByName("selectedtestdataatrray").length>0)
{
for(var k=0;k<document.getElementsByName('testshowforadd').length;k++)
	{

	var tocheck=document.getElementsByName('testshowforadd')[k].value;




		
	for(var g=0;g<document.getElementsByName("selectedtestdataatrray").length;g++)
	{ 

		var val=document.getElementsByName("selectedtestdataatrray")[g].value;
		
            if(val.includes(tocheck.split("#")[0]))
                {
            	document.getElementsByName('testshowforadd')[k].checked=true;
            	document.getElementsByName('testshowforadd')[k].disabled =true;
                }
            
		
	}
			
	


	
	}

}


	}





function showprevreqmodal(tests)
{

$('#myModalHorizontalprevreq').removeData();

$('#preqvreqtbl').dataTable( {
    "destroy": true,
    "oSearch": {"sSearch": tests },
    "pageLength":25
    
  } );


	}


function showprevreq11()
{

	
}

var $fancyboxWidth = 1350;
var $fancyboxHeight = 470;
//for window smaller than 800px (or else)
if ($(window).width() < 800){


 //$width = "auto";
 //$fancyboxHeight="auto";// or whatever for small devices
}

$(document).ready(function() {
    $(".iframee").fancybox({
        type: 'iframe',
        'autoSize' : false,
        "width":$fancyboxWidth,
        "height":$fancyboxHeight,
        helpers : { 
        overlay: {
           // opacity: 0.8, // or the opacity you want 
            css: {'background-color': 'rgba(0,0,0,0.5)'}// background-color: rgba(0,0,0,0.5); // or your preferred hex color value
           }
        }
    });
});


/* $(document).ready(function() {
    $('#testtable').DataTable( {
    	responsive: true,
       
    	"lengthMenu": [ [5, 10, 15, 20, -1], [5, 10, 15, 20, "All"] ],
        buttons: [ 'pageLength'],
        "language": { "emptyTable": "Please Add Test in Group from above Search Box" },
            });
    $('#testtable').DataTable().page('last').draw('page');
} ); */


function showprevreq()
{
   


$('#preqvreqtbl').dataTable( {
    "destroy": true,
 
    "pageLength":25
    
  } );


	}


function cancel()
{

	document.getElementsByName('hmode')[0].value="NEW";
	document.forms[0].submit();
	
	}


function cancelFunc()
{
	window.parent.closeTab();
}


function setDateInApoitment(patCrNo,paraId,obj,divAptTagRow)
{
	   var date=document.getElementsByName('dateTag')[0].value;

	   var tocheckfromwherecall=paraId;

         if(tocheckfromwherecall.includes("^"))
             {
      	   tocheckfromwherecall=tocheckfromwherecall.split("^");
      	  
             }
		  
	  if(tocheckfromwherecall[1]=="0")
	  {
		  getAptSlotDetails(patCrNo,paraId,date,divAptTagRow,4);
	  }else
     {
		  getAptSlotDetails(patCrNo,paraId,date,divAptTagRow,2);
	      }
    
	  }
	  

function addall()
{

	for(var k=0;k<document.getElementsByName('testshowforadd').length;k++)
	{

		if(document.getElementsByName('testshowforadd')[k].checked==true && document.getElementsByName('testshowforadd')[k].disabled==false)
				{
			
	var tocheck=document.getElementsByName('testshowforadd')[k].value;

	var testdatafinal=  ajaxhitforfetchingtestwisedata(tocheck.split("#")[0]+"^"+tocheck.split("#")[1]);
	
	maktestinrowtable(testdatafinal);


	    
				}
		
	}

	
	$('#myModalHorizontal').modal('hide');
	

	}


function setpriority(obj)
{

	//alert(obj.value);
	document.getElementsByName("prioriotytype")[0].value=obj.value;
}



function save()
{


	if(document.getElementsByName("selectedtestdataatrray")[0]!=undefined)
		{

		for(var g=0;g<document.getElementsByName("selectedtestdataatrray").length;g++)
		{ 

			 if(document.getElementsByName("selectedtestdataatrray")[g].value!="")
			   {
				   
				 if(document.getElementsByName("selectedtestviews")[0]!=undefined)
					{

					for(var g=0;g<document.getElementsByName("selectedtestviews").length;g++)
					{ 
						 if(document.getElementsByName("selectedtestviews")[g].value=="")
						   {
							
							
								swal(
						                '',
						                "Please Select View for Test "+(document.getElementsByName("selectedtestdataatrray")[g].value).split("#")[3],
						                'warning'
						            );

									return null;
						   }
					}
					
					}
				  else
				 {

							
					  swal(
				                '',
				                "Please Select View for Test "+(document.getElementsByName("selectedtestdataatrray")[g].value).split("#")[3],
				                'warning'
				            );
			
					 		return null;
					 }

				   


			   }
			 else
			 {
				    
				 swal(
			                '',
			                'Please Select Test !',
			                'warning'
			            );			
						 		return null;
				 }

   
		}

		}
	else
		{


		//swal("Please Select Test ");
		swal(
                '',
                'Please Select Test !',
                'warning'
            );

		return null;
	}
	

	for(var g=0;g<document.getElementsByName("radioEpisode").length;g++)
	{
	       if(document.getElementsByName("radioEpisode")[g].checked==true)
		   {
		            document.getElementsByName("selectedEpisodedetails")[0].value=document.getElementsByName("radioEpisode")[g].value;
		            
		            document.getElementsByName("selectedEpisode")[0].value=document.getElementsByName("selectedepisodeee")[g].value;
		   }
	}
	

	//alert("aab"+document.getElementsByName("hmode")[0].value);
//	return null;
	
	var today = new Date();
	  		/* var date=convertDateToStr(today,"dd-Mon-yyyy");
	  		var Time=convertDateToStr(today,"hh:mm"); 
	  		var k=0;//variable for appointment array of date,time and refno
	  		 */var aptRefNo=[];
	  		var aptDate=[];
	  		var aptTime=[];

	  		var labCode=applabcode;
	  		var testCode="0";
	  		
			var divId="aptTagRow_"+labCode+"_"+testCode;

			/* if (islababsedapp=='1' && newarrayappdatalababsed.length>0)
			{ */
			if (true)
			{
			for(var g=0;g<newarrayappdatalababsed.length;g++)
				{
				
				var data=newarrayappdatalababsed[g];
				var datalen=data.split("$$");
			    var newdivid1=data.split("$$")[1];

				    var newdivid=data.split("$$")[1];
				  newdivid="aptForDate_"+newdivid;
				  if(typeof document.getElementsByName(newdivid)[0] != 'undefined' )
				{
				if(data.includes(labCode))
					{
					
					if(datalen.length==2)
						{
	  				var aptSatus=createAppointment(newdivid1);
	  				var objaptno=document.getElementsByName('appointmentRefNo')[0].value;
	  				aptRefNo.push(labCode+testCode+"#"+document.getElementsByName('appointmentRefNo')[0].value);
	  			newarrayappdatalababsed[g]=data+"$$"+labCode+testCode+"#"+document.getElementsByName('appointmentRefNo')[0].value;
	  			if(!aptSatus)
				 {
				// alert("returing false 1");
				return false;
				}
						}
					
					else if(datalen.length==3)
						{
						
						var datanew=datalen[2];
						aptRefNo.push(datanew);
						
						}
					
					
					}
				}
				
				 if(typeof document.getElementsByName(newdivid)[0] == 'undefined' && offAptNo=='null')
  					{

					alert("Can't raise Test: "+testName+" for Laboratory: "+labName+", as no slots are available");
					// alert("returing false 2");
					return false;
					 
  					}
				 
				if (typeof document.getElementsByName(newdivid+'')[0] != 'undefined' )
				{
					document.getElementsByName('appointmentTime')[0].value=document.getElementsByName('slotST_'+newdivid1+'')[0].value;
					document.getElementsByName('appointmentDate')[0].value=document.getElementsByName('aptForDate_'+newdivid1+'')[0].value;
					
					aptTime.push(labCode+testCode+"#"+document.getElementsByName('slotST_'+newdivid1+'')[0].value);
					aptDate.push(labCode+testCode+"#"+document.getElementsByName('aptForDate_'+newdivid1+'')[0].value);

				}
				
				
				if( typeof document.getElementsByName(newdivid+'')[0] == 'undefined' && offAptNo=='null' )
				{
				
				alert("Can't raise Test: "+testName+" for Laboratory: "+labName+", as no slots are available");
				// alert("returing false 2");
				return false;
				
				}
				
				
				  
				}
			
			}
	
	
		/* 	 var dateAndTime=document.getElementsByName('offlineAppoitmentDtl')[0].value;
				 var SplitWithSpace=dateAndTime.split(' ');
				 
				 var offlineAptDate=SplitWithSpace[0];
				 var offLineAptTime=SplitWithSpace[1];
			
			
					 document.getElementsByName('appointmentDate')[0].value=offlineAptDate;
			        document.getElementsByName('appointmentTime')[0].value=offLineAptTime;
				 
			        document.getElementsByName('appointmentRefNo')[0].value=document.getElementsByName('offlineAptDtl')[0].value
			        
			        aptTime.push(labCode+testCode+"#"+offLineAptTime);
					aptDate.push(labCode+testCode+"#"+offlineAptDate);
					aptRefNo.push(labCode+testCode+"#"+document.getElementsByName('appointmentRefNo')[0].value);


					
 */

 document.getElementsByName('labTestAptTime')[0].value=aptTime;
	document.getElementsByName('labTestAptDate')[0].value=aptDate;
	//alert("aptRefNo"+aptRefNo);
document.getElementsByName('labTestAptRefNo')[0].value=aptRefNo;

				    //   alert("hmode");
document.getElementsByName('hmode')[0].value="SAVEXRAYPROCESS";
	//alert("aab"+document.getElementsByName("hmode")[0].value);
	//document.forms[0].hmode.value='SAVEXRAYPROCESS';
	document.forms[0].submit();

	
}


function callviews(obj)
{

     var viewid=obj.id+"@";
      var classviews=obj.className;
      classviews = classviews.replace(/!/g, '#');
      classviews=classviews+"view";
var finval=document.getElementById(classviews).value;
      if(obj.checked==true)
          {
          if(finval.includes(viewid)==false)
     document.getElementById(classviews).value+=viewid;
          }
      else if(obj.checked==false)
          {
     var val= document.getElementById(classviews).value;
     val = val.replace(viewid, '');
     document.getElementById(classviews).value=val;
          }


      settestbill();
      
}

function callsite(obj)
{
  
	 var classviews=obj.id;
     classviews = classviews.replace(/box/g, '');
     classviews=classviews+"site";
     
    // alert(classviews);
    	 var siteval=obj.value;
    	 
    	     document.getElementById(classviews).value=siteval;
    	 
        

}

function addbookmark(data)
{
	//alert("addbookmark"+data);
	var labcode= data.split("@")[1];
	
    var testdata=data.split("@")[2];
    var maintestdata=testdata.split("#");
	for(var f=0;f<maintestdata.length;f++)
		{
		var testcode=maintestdata[f];
	//	alert("testciode"+testcode);
        var testdatafinal=  ajaxhitforfetchingtestwisedata(testcode+"^"+labcode);
		
		maktestinrowtable(testdatafinal);
        
		}
	
	}






var isapptshw="false";
var counter=0;
var applabcode="";
function maktestinrowtable(testdata)
{
         //   alert("maktestinrowtable"+testdata);
           //    var billingflag=checkbilling();

             //  alert("maktestinrowtable"+billingflag);
               
            var finaldata=testdata.split("@");
           var combo="";
             if(finaldata.length==2)
                 {
            	 combo=finaldata[1];
                 }
             var datattosave=finaldata[0];

             var tests=finaldata[0].split("#");



        //  alert("rates"+tests[29]);
       if(checktestalreadyraised(tests[2]))
       {

           
         if(tests[29].includes('^'))
           {      
        //     alert("match");  
        //     alert("rates"+tests[29].split('^')[0]);
        //     alert("ee"+document.getElementById("estimaterate").innerHTML);
             var cc=document.getElementById("estimaterate").innerHTML;
             selectedtestbills.push(tests[29].split('^')[0]);
             selectedtest.push(tests[3]);
          //  alert((parseFloat(cc) + parseFloat(tests[29].split('^')[0])).toFixed(2));
             //document.getElementById("estimaterate").innerHTML = (parseFloat(cc) + parseFloat(tests[29].split('^')[0])).toFixed(2);
//alert("aa"+document.getElementById('estimatebtn').title);

             }
         else
             {
        	 selectedtestbills.push('0.00');
             selectedtest.push(tests[3]);
             }

         var dd="";
         for(var f=0;f<selectedtest.length;f++)
       	  {
       	   dd+=""+selectedtest[f]+ ":"+selectedtestbills[f]+" <i class='fa fa-inr' aria-hidden='true'></i><br/>";
             
       	  }

//alert(dd);

       //$('#estimatebtn').attr('data-content', dd);

       
          document.getElementById("labshw").innerHTML = tests[1];
          
          selectedlab.push(tests[0]);
 	        var newRow = $('<tr data-toggle="collapse" data-target="#text-1" class="accordion-toggle collapsed">');
	        var cols = "";

            if(tests[30]!="")
            {
				var fncn="showprevreqmodal("+tests[3]+")";
				var crnos= $('[name="patCrNo"]').val();
				
				 cols += "<td>"+tests[3]+"<br/><a href='/HISInvestigationG5/new_investigation/onlineRequisitionRaisingprevreq.cnt?patCrNo="+crnos+"&searchTestName="+tests[3]+"' class='iframee'>Last Requisition Date: "+tests[30]+"</td>";
            }
            else
                {
				 cols += "<td>"+tests[3]+"</td>";

                }

            
			    	cols += "<td><div> <select  id='"+tests[2]+"#"+tests[0]+"box' onchange='callsite(this)' class='form-control custom'> <option value='1'>NA</option> <option value='3'>Left</option> <option value='4'>Right</option> <option value='2'>Both</option> </select> </div></td>";
	    	cols += "<td>"+combo+"</td>";
	        cols += '<td><input type="text" class="form-control"></td>';
	        cols += "<td><a class='delete' title='Delete' data-toggle='tooltip' ><i class='fa fa-trash' aria-hidden='true'></i></a></td><input id='"+tests[2]+"#"+tests[0]+"' type='hidden' name='selectedtestdataatrray' value='"+datattosave+"'/><input id='"+tests[2]+"charge' type='hidden' name='testcharge' value='"+datattosave+"'/><input id='"+tests[2]+"#"+tests[0]+"view' type='hidden' name='selectedtestviews' value=''/><input id='"+tests[2]+"#"+tests[0]+"site' type='hidden' name='selectedsite' value='1'/>";

	        
	        newRow.append(cols);
	        $("table.order-list").append(newRow);

	        var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

	        
	        counter++;
	    document.getElementById('automplete-testsearch').value="";
	    if(isapptshw=="false" && tests[28]=="1")
	    {
	    	// document.getElementById('isdisapp').style.display=""; //needs to be uncomment for app
	    	
	        // setappointment(tests);
	         isapptshw="true";
	         applabcode=tests[0];

	}
	    settestcount();
       }
       else
           {
          var errmsg="Test "+tests[3]+" is Already Added!";
          document.getElementById('automplete-testsearch').value="";
   	   swal(
	                '',
	                errmsg,
	                'warning'
	            );	
				return false;

				
           }
       
		
}


function checktestalreadyraised(testtocheck)
{

	var flg=true;
	 if(document.getElementsByName("selectedtestdataatrray")!=undefined && document.getElementsByName("selectedtestdataatrray").length>0)
	    {    

  	      for(var f=0;f<document.getElementsByName("selectedtestdataatrray").length;f++)
	    	{

  	    	   var testcountdata=document.getElementsByName("selectedtestdataatrray")[f].value;
  	    	   //testcountdata=testcountdata.split("#");

               if(testcountdata.includes(testtocheck))
               {
            	   flg= false ;
            	   }

               else{
            	   
               }
  	    	  
  	    	  
	    	}

	    }
	 else{
		 
	 }
	 return flg;
	
}



function settestcount()
{

	    var counttest=0;
	    var teststring="";
	    if(document.getElementsByName("selectedtestdataatrray")!=undefined)
	    {    
     	 for(var f=0;f<document.getElementsByName("selectedtestdataatrray").length;f++)
	    	{
   var testcountdata=document.getElementsByName("selectedtestdataatrray")[f].value;
   testcountdata=testcountdata.split("#");
	    	 counttest++;
	    	 if(teststring=="")
	   	  {
	   	  teststring=""+testcountdata[3];
	   	  }
	   	  else
	   	  {
	   	  teststring=""+teststring+","+testcountdata[3];    
	   	  }

		   	  
    		}
          document.getElementById("labshwcount").innerHTML = "<b>\u00A0 \u00A0Test Count: "+counttest+"\u00A0 \u00A0</b>";
		   $('#labshwcount').attr('data-content', "Test:"+teststring+"");
	          
	    }
	    
			
}
	

function setappointment(tests)
{

   //  alert("tests"+tests);
	var labCode=tests[0];
	var testCode="0";

	var divAptTagRow="aptTagRow_"+labCode+"_"+testCode;  //+labCode+testCode
    
	var islabalreadycallapp=labCode+"#"+divAptTagRow+"@";
	
	
	var paraId=labCode+"^"+'0'+"^0^0^0^0^0";
	//document.getElementsByName('islabcallapp')[0].value=islabalreadycallapp;
	document.getElementById("app").innerHTML="<div id='"+divAptTagRow+"'></div> <div  align='left'><input type='hidden' name='dateTag' onchange='setDateInApoitment("+patCrNo+",\""+(paraId)+"\",this,\""+divAptTagRow+"\")' id='datepicker'></div>";
	$( "#datepicker" ).datepicker({
		dateFormat: 'dd-M-yy',
		showOn: "button",
		buttonImage: "/HISInvestigationG5/hisglobal/images/cal.png",
		buttonImageOnly: true,
		buttonText: "Select  "
		}).datepicker("setDate", new Date());
				//alert(td6.innerHTML);
				
						var paraId="";
                              var patCrNo=$('[name="patCrNo"]').val();
//						getAptSlotDetails('"+patCrNo+"','"+paraId+"','',divAptTagRow);
						
						paraId=labCode+"^"+'0'+"^0^0^0^0^0";
				        //alert("lab bsed call paraIdparaId"+paraId);
							getAptSlotDetails("\'"+patCrNo+"\'",paraId,'',divAptTagRow,4);
							
							newarrayappdatalababsed.push(labCode+"$$"+divAptTagRow);


							

	}





function settestbill()
{

	var finalcharge=0.00;

	//var noofviewslength=document.getElementsByName("selectedtestviews").split("@");
    var counternoofviews=0;
	for(var f=0;f<document.getElementsByName("selectedtestviews").length;f++)
	{

	      var viewsforcharge=document.getElementsByName("selectedtestviews")[f].value;
		  var nofviews=viewsforcharge.split("@");
		  var testnotaddcharge=nofviews[0].split("#")[0];
		  if(testfornotaddviews.includes(testnotaddcharge))
		   {

		   }
		  else
			  {
			  counternoofviews+=nofviews.length-1;

			  }

		  


		  var flg="0";
		var  newwcharge="0.0";
		var viewscharge="0";
	       for(var k=0;k<nofviews.length-1;k++)
		   {
		       var newviews=nofviews[k];
			   var newtestview=newviews.split("#")[0];
           

            
			   if(testfornotaddviews.includes(newtestview))
				   {
				   
                        if(flg=="0")
                          {
                        	var newtestviewcharge=newtestview+"charge";
         				   var testviewcharge=document.getElementById(newtestviewcharge).value;
         				   testviewcharge=testviewcharge.split("#")[29];
         					testviewcharge=testviewcharge.split("^")[0];
         					
         				   finalcharge=(parseFloat(finalcharge)+parseFloat(testviewcharge)).toFixed(2);
         				  newwcharge=(parseFloat(newwcharge)+parseFloat(testviewcharge)).toFixed(2);
         
       				   mymapvalue.set(newtestview, newwcharge);
       				   viewsmymapvalue.set(newtestview, "inc. Film");
       				   
         	                  flg="1";
                            }
				   }
			   else
				   {
				  // alert("testcode");

				   if(mymapvalue.get(newtestview)==undefined)
                     {   
					   mymapvalue.set(newtestview, '0.00');
					   newwcharge="0.0";
       				   viewsmymapvalue.set(newtestview, "0	");
       				     viewscharge="0";
	                       }
				   else
					   {    

					   }
				   
                var maptestcode=mymapvalue.get(newtestview);
				   
				   var newtestviewcharge=newtestview+"charge";
				   var testviewcharge=document.getElementById(newtestviewcharge).value;
				   testviewcharge=testviewcharge.split("#")[29];
					testviewcharge=testviewcharge.split("^")[0];
				   finalcharge=(parseFloat(finalcharge)+parseFloat(1)*parseFloat(testviewcharge)).toFixed(2);
				   newwcharge=(parseFloat(newwcharge)+parseFloat(1)*parseFloat(testviewcharge)).toFixed(2);
				   viewscharge++;
				   mymapvalue.set(newtestview, newwcharge);
   				   viewsmymapvalue.set(newtestview, viewscharge);

				   }


			   
			  

			   
			   
		   }
		  
	    //   alert("get key"+mymapvalue.get("12804")); // 3
	    //   alert("get key"+mymapvalue.get("12805")); // 3
	    //   alert("get key skeletal"+mymapvalue.get("12809")); // 3
			  
	}

	 for(var f=0;f<document.getElementsByName("selectedtestviews").length;f++)
	{

		
		      var viewsforcharge=document.getElementsByName("selectedtestviews")[f].value;

		      
              var nofviews=viewsforcharge.split("@");
			  var testnotaddcharge=nofviews[0].split("#")[0];
         var newcharged=mymapvalue.get(testnotaddcharge);
         
         newmymapvalue.set(testnotaddcharge,newcharged);

         if(viewsforcharge=="" && document.getElementsByName("selectedtestviews").length==1)
             {
        	 newmymapvalue=new Map();
        	 viewsmymapvalue=new Map();
        	 
             }
         
             
	}
	
	
   // alert("get key skeletal final map"+newmymapvalue.get("12804")); // 3
   // alert("get key skeletal final view"+viewsmymapvalue.get("12804")); // 3

	
	if(counternoofviews!=0)
		{
		
		   var newaddquot=counternoofviews/4;
		 					var newaddremainder=counternoofviews%4;
		 					if(newaddremainder!=0)
		 					{
		 					newaddquot=parseInt(newaddquot)+1;
		 					}
		 					finalcharge=(parseFloat(finalcharge))+(parseFloat(100))*(parseFloat(newaddquot));
		 					var charged=(parseFloat(100))*(parseFloat(newaddquot));
		 			   //    alert("fims used:"+newaddquot+" charged:"+charged); // 3
		 			      newmymapvalue.set("film",charged);
	       				   viewsmymapvalue.set("film", newaddquot);
			 			      
		}
	else
		{}
	
	document.getElementById("estimaterate").innerHTML=finalcharge;
				      //  $('#estimatebtn').attr('data-content', finalcharge);

				      setpopoversinchargebtn();

}

function setpopoversinchargebtn()
{

     var testsize=newmymapvalue.size;
      var stringg="<table class='table table-condensed table-responsive' >";

 	for(var f=0;f<document.getElementsByName("selectedtestdataatrray").length;f++)
	{

               var dataa=document.getElementsByName("selectedtestdataatrray")[f].value;
               var newdataa=document.getElementsByName("selectedtestdataatrray")[f].value;
               dataa=dataa.split("#")[2];
               var chargee=newmymapvalue.get(dataa);
               var viewss=viewsmymapvalue.get(dataa);

               if(viewss=="0")
               {
            	   viewss="";
               }
               else{

                   if(viewss!="inc. Film")
            	   viewss=viewss+" view";
               }
               

            	


               
               stringg+="<tr><td>"+newdataa.split("#")[3]+"<br/>("+ viewss +") </td><td>"+ Math.floor(chargee)+" INR"+"</td></tr>";

               
	}

    var chargee=newmymapvalue.get("film");
    var viewss=viewsmymapvalue.get("film");

    if(chargee!=undefined && document.getElementsByName("selectedtestdataatrray").length>0)
        {
    stringg+="<tr><td>Film"+"<br/>(Qty. "+ viewss +" ) </td><td>"+ Math.floor(chargee)+" INR"+"</td></tr>";

        }
    stringg+="</table>";
  //  alert("stringg"+stringg);
 	// $('#estimatebtn').attr('data-content', stringg);
    
    
    var buttonTippy = document.querySelector('#estimatebtn');
    tippy(buttonTippy);
    var estimateRateTippyInstance = buttonTippy._tippy;    
    estimateRateTippyInstance.setProps({
    	allowHTML: true,
    	content: stringg
    	});
    estimateRateTippyInstance.show(0);
     
 	
 	
 	

	}


function checkbilling()
{
	//alert("ajaxhit");
      var crnootocheck=$('[name="patCrNo"]').val()
	//testlabcode = testlabcode.replace(/#/g, '^');
	//alert("new"+selectedText+"#"+reqdno);
	
	//alert(tmpSampleCode+"  "+tmpLabCode+"     "+tmpTestCode+"    "+tmpLabTestCodeArray);
	var remarks = "";
	var flg = false;
	var labTestCodeArray = "";
	var _mode = "AJX_CHECKBILLING";
	var objXHR = {url: "/HISInvestigationG5/new_investigation/onlineRequisitionRaisingXray.cnt?hmode="+_mode+"&patCrNo="+crnootocheck, sync:true, postData: "", handleAs: "text",
		load: function(data) 
		{
			remarks = data;
	    // alert(data);
			//labTestCodeArray = data;
			
		},
        error: function(error)
        {
        	
        }};
	var objDojoAjax = dojo.xhrPost(objXHR) ;
	//alert("new"+remarks);
	return remarks; 
	
}


function ajaxhitforfetchingtestwisedata(testlabcode)
{
	//alert("ajaxhit");

	testlabcode = testlabcode.replace(/#/g, '^');
	//alert("new"+selectedText+"#"+reqdno);
	var cr=$('[name="patCrNo"]').val();
	//alert(tmpSampleCode+"  "+tmpLabCode+"     "+tmpTestCode+"    "+tmpLabTestCodeArray);
	var remarks = "";
	var flg = false;
	var labTestCodeArray = "";
	var _mode = "AJX_GETTESTWISEDATA";
	var objXHR = {url: "/HISInvestigationG5/new_investigation/onlineRequisitionRaisingXray.cnt?hmode="+_mode+"&testlabcode="+testlabcode+"&patCrNo="+cr, sync:true, postData: "", handleAs: "text",
		load: function(data) 
		{
			remarks = data;
	    // alert(data);
			//labTestCodeArray = data;
			
		},
        error: function(error)
        {
        	
        }};
	var objDojoAjax = dojo.xhrPost(objXHR) ;
	//alert("new"+remarks);
	return remarks; 
	
}


function ajaxispatexist()
{
	//alert("ajaxhit");

	//alert("new"+selectedText+"#"+reqdno);
	
	//alert(tmpSampleCode+"  "+tmpLabCode+"     "+tmpTestCode+"    "+tmpLabTestCodeArray);
	var remarks = "";
	var flg = false;
	var labTestCodeArray = "";
	var _mode = "AJX_CHECKPATCRNO";
	var patcr=$('[name="patCrNo"]').val();
	var objXHR = {url: "/HISInvestigationG5/new_investigation/onlineRequisitionRaisingXray.cnt?hmode="+_mode+"&patCrNo="+patcr, sync:true, postData: "", handleAs: "text",
		load: function(data) 
		{
			remarks = data;
	  //  alert("isexist"+data);
			//labTestCodeArray = data;
			
		},
        error: function(error)
        {
        	
        }};
	var objDojoAjax = dojo.xhrPost(objXHR) ;
	//alert("new"+remarks);
	return remarks; 
	
}

function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
	{
			return false;
	}
	else if(evt.keyCode==13)
		{

		 showreq();

		
		}
	else
		{
	return true;
		}
	

}  


function isNumberKeytestsearch(evt)
{
	
	 if(evt.keyCode==13)
		{

		return false;

		
		}
	 else
	 {
		 return true;
		 }
	
	

}  

           function showreq()
		  {
		  		      
        	 var isexistt= ajaxispatexist();

        	// alert("isexistt"+isexistt);

        	 var tocheck=isexistt.split("#");
        	// alert("tocheck"+tocheck);

        	 if(tocheck[0]=="1")
        	 {
            	// alert("enter");

        	               if(tocheck[1]=="1")
        	 			  {

        	              	 document.getElementsByName('patCrNo')[0].value="";
             	 			  
        	 			   swal(
        	 			                '',
        	 			                'Patient Category Is Expired.',
        	 			                'warning'
        	 			            );	
        	 						return false;
        	 			  }
        	 			  
        	 			  if(tocheck[2]=="1") //ipd
        	 			  {

            	 			  if(tocheck[3]=="1") //acc doesnt exist
            	 			  {
            	             	 document.getElementsByName('patCrNo')[0].value="";
                                 
            	 			   swal(
        	 			                '',
        	 			                'Patient Account Does Not Exist.',
        	 			                'warning'
        	 			            );	
   	 			            
        	 						return false;
            	 			  }

            	 			  
        	 			  }
        	 			  


        	 	        	
        	         	 
        					document.getElementsByName('hmode')[0].value="GETPATDTL";
        					
        					document.forms[0].submit();	
        					
        	 }
        	 else
        	 {
            	 //alert("not valida");
            	 document.getElementsByName('patCrNo')[0].value="";
            	 
            	  swal(
			                '',
			                'Please Enter Valid CrNo.',
			                'warning'
			            );

     		     return false;
     		     
          	            	 }


        	 
        	 
        	 

				
		  }
 
	function loadDatatable() {
		$('#prevRequisitionDtl').DataTable();
	}

	$(document).ready(function() {
		$('.multiselectt').multiselect({
			enableFiltering : true

		});
	  //  $(".testsearchmodal").prop('checked', $(this).prop("checked"));
	    
		//$('#testtablelistoftest').DataTable();
		
		 $('#testtablelistoftest').dataTable( {
    	   
			 
    	    "dom": '<"row"<"col-12 col-md-6"l><"col-12 col-md-6"f>>rt<"row"<"col-12 col-md-6"i><"col-12 col-md-6"p>><"clear">',
      	    "pageLength":4,
      	    "lengthMenu": [2,4,6,8, 12, 16, 20,50, 100],
      	  "scrollY":        "300px",
          "scrollCollapse": true,
          "pagingType": "simple"
    	  } );
 
	  	  
	});

	$(document).ready(function() {
		$('.multiselectt').multiselect({
			enableFiltering : true

		});
	});

	$(document).ready(function() {

		$(document).on("click", ".delete", function() {
			$(this).parent().parent().remove();
			settestcount();
			settestbill();
		});
	});

	$(document).ready(function() {
		$('[data-toggle="popover"]').popover({
			placement : 'bottom',
			trigger : 'hover'
		});
	});

	$(document).ready(function() {
		$('[data-toggle="popoverselectedtest"]').popover({
			placement : 'left',
			trigger : 'hover'
		});
	});
	
	
	$(document).ready(function(){ 
		tippy('#estimatebtn', {
		    delay: 100,
		    arrow: true,
		    arrowType: 'round',
		    size: 'large',
		    duration: 500,
		    animation: 'perspective-extreme',
		    placement: 'bottom',
		    theme: 'light',
		    allowHTML: true,
		    content: '<strong>No <span style="color: blue;">Test/Group </span>Raised</strong>'
		
		});
		});
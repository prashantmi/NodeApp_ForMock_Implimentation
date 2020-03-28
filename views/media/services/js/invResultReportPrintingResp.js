/*------------------------------------------Set Automaticly---------------------------------------------------------------------------------------------------*/

/*-Set Date time picker on from , to date-*/
$(document).ready(function() {
textFit(document.getElementsByClassName('textFit'), {multiLine: true});
/*textFit($('#textFit'));*/
});


// $(document).ready(function(){
// 	 /* construct manually */
// 	//$('.loadingBar1').removeClass("d-none");
// 	  var loadingBar1 = new ldBar(".loadingBar1");
// 	  /* ldBar stored in the element */
// 	  var loadingBar2 = document.getElementsByClassName('.loadingBar1').ldBar;
// 	  loadingBar1.set(100);
//
// 	$('.ldBar-label').hide();
// });


$(document).ready(function(){
	$(".refreshBtn").click(function(){
		document.getElementsByName('hmode')[0].value="NEW";
		document.forms[0].submit();
	});
	
	$(".closeBtn").click(function(){
		window.parent.closeTab();
	});
	

	/*console.log("pmmm");
	console.log("parentPM: "+window.parent.jQuery("#tabframe").length);
	console.log("parentPM: "+window.parent.jQuery("#tabframe >.tabs-panels").length);
	console.log("parentPM: "+window.parent.jQuery("#tabframe >.tabs-panels >.panel").length);
	console.log("parentPM: "+window.parent.jQuery("#tabframe >.tabs-panels >.panel >.panel-body").length);
	
	window.parent.jQuery("#tabframe")[0].style.cssText+=" height:769px !important;"
	window.parent.jQuery("#tabframe").css({"height":"769px !important"}); 
	window.parent.jQuery("#tabframe >.tabs-panels").css({"height":"100% !important"}); 
	window.parent.jQuery("#tabframe >.tabs-panels >.panel").css({"height":"100% !important"}); 
	window.parent.jQuery("#tabframe >.tabs-panels >.panel >.panel-body").css({"height":"100% !important"});*/ 
	
	
});


$(document).ready(function() {
  $('#datetimepicker-from').datetimepicker({
    format: 'DD-MMM-YYYY',
    showTodayButton: true,
    //showClear: true,
    icons: {
      today: 'fas fa-calendar-day',
      previous: "fa fa-caret-left",
      next: "fa fa-caret-right ",
      //up: "fa fa-arrow-up",
      //down: "fa fa-arrow-down",
      //date: "fa fa-calendar",
      //clear: "fa fa-clear",
      //close: "fa fa-close"
    },
    useCurrent: true //may cause problem see datetimepicker issue #1075
  });

  $('#datetimepicker-to').datetimepicker({
    format: 'DD-MMM-YYYY',
    showTodayButton: true,
    //showClear: true,
    icons: {
      today: 'fas fa-calendar-day',
      previous: "fa fa-caret-left",
      next: "fa fa-caret-right ",
    },
    useCurrent: true
  });

  $("#datetimepicker-from").on("dp.change", function(e) {
    $('#datetimepicker-to').data("DateTimePicker").minDate(e.date);
  });
  $("#datetimepicker-to").on("dp.change", function(e) {
    $('#datetimepicker-from').data("DateTimePicker").maxDate(e.date);
  });
});

/*-Returns system date-*/
function setDate() {
  var today = new Date();
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var DD = today.getDate();
  var M = months[today.getMonth()];
  var YYYY = today.getFullYear();

  today = DD + "-" + M + "-" + YYYY;
  return today;
  //$(".todayDate")[0].val(today);
  //$(".todayDate")[1].val(today);
}

/*-Increased shadow on hover-*/
$(document).ready(function() {
  $('.hover-shadow').hover(
    function() {
      $(this).addClass("shadow-lg");
    },
    function() {
      $(this).removeClass("shadow-lg");
    }
  );
});

/*-Redraw hideen datatables on tab change-*/
$(document).ready(function() {
  $("[aria-controls='sampleBasedTab']").click(function() {
    $('#DataTable4').DataTable().columns.adjust().responsive.recalc();
  });
  $("[aria-controls='patientBasedTab']").click(function() {
    $('#DataTable5').DataTable().columns.adjust().responsive.recalc();
  });
  $("[aria-controls='graphTab']").click(function (){
	 $('#testParamTable').DataTable().columns.adjust().responsive.recalc();
	//$(".graphTab-testBtns")[0].click();
  });
});

/*-Open in new tab on expand btn click-*/
$(document).ready(function(){
	$('.fullScreenBtn').click(function(){

		var crNo=null; crNo=$("#crNoInput")[0].value;
		var billNo=null; billNo=$("#billNoInput")[0].value;
		var strParamBean="";
		if(crNo!=null){ strParamBean="&crNo="+crNo}
		else if(billNo!=null){ strParamBean="&billNo="+billNo;}

		var url="";

		var strHref=window.location.href;
		var strPosition = strHref.search("varSSOTicketGrantingTicket");

		if(strPosition!=null && strPosition>-1){
		    var part1 = strHref.substr(0, strPosition);
		    var part2 = strHref.substr( strPosition);
		    url=part1+strParamBean+"&"+part2;

		  } else if (strPosition!=null && strPosition==-1){
			  if(strHref.endsWith(".cnt?")){ url=strHref+strParamBean; }
			  else if(strHref.endsWith(".cnt")){ url=strHref+"?"+strParamBean;}
			  else { url=strHref; }

		  } else { url=strHref;  }

		var win = window.open(url,'_blank');
		localStorage.setItem('isFullScreen','1');
	});

	if(localStorage.getItem('isFullScreen')=='1')
	{
		//$('.toggleForfullScreenBtn').toggleClass('col-sm-4 col-sm-5');
		$('.fullScreenBtn').hide();
	}
	$(window).on("beforeunload", function() {
	    return localStorage.setItem('isFullScreen','0');
	});

	if(!localStorage.getItem('isFullScreen'))
		$('.fullScreenBtn:first-child').click();
	});

$(document).ready(function(){
	tippy('.fullScreenBtn', {
	    delay: 100,
	    arrow: true,
	    arrowType: 'round',
	    size: 'large',
	    duration: 350,
	    animation: 'perspective-extreme',
	    placement: 'bottom',
	    allowHTML: true,
	    content: '<strong><span style="color: aqua;">Responsive </span> View</strong>',
	});
	});

$(document).ready(function(){
	tippy('#container2ExpandBtn', {
	    delay: 100,
	    arrow: true,
	    arrowType: 'round',
	    size: 'large',
	    duration: 350,
	    animation: 'shift-away-extreme',
	    placement: 'bottom',
	    allowHTML: true,
	    content: '<strong><span style="color: aqua;">Minimize/Maxmize </span> Search Criteria</strong>',
	});
	});


$(document).ready(function(){
	/*var hmode=$('[name="hmode"]')[0].value;
	var crNo=$('[name="crNo"]')[0].value;
	var billNo=$('[name="billNo"]')[0].value;

	if(hmode=="UrlExternalCall"){
		UrlImplicitCallHandler();
	} else {
		UrlImplicitCallHandler();
	}*/
});

function UrlSimpleCallHandler(){

}

var setIntervalTestParamTable1=null;
var setIntervalTestParamTable2=null;
function UrlImplicitCallHandler(){

	var crNo=$('[name="crNo_url"]')[0].value;
	if(crNo.length!="15"){ crNo=$('[name="crNo"]')[0].value;}

	var billNo=$('[name="billNo_url"]')[0].value;
	if(billNo.length!="15"){ billNo=$('[name="billNo"]')[0].value;}

	var searchType=$('[name="searchType_url"]')[0].value;
	var isGroup=$('[name="isGroup_url"]')[0].value;
	var testCode=$('[name="testCode_url"]')[0].value;
	var groupCode=$('[name="groupCode_url"]')[0].value;
	var reqDNo=$('[name="requisitionDNo_url"]')[0].value;
	var reqNo=$('[name="requisitionNo_url"]')[0].value;
	//var showGraph=$('[name="showGraph"]')[0].value;
	var testUniqueCode=null;
	var reqnUniqueCode=null;
	var forTestOrGroupOrAll=null;

	if(searchType==null || searchType==""){
		if(crNo!=null && crNo!="" ){ searchType="1"; }
		else if(billNo!=null && billNo!=""){ searchType="2"; }
	}

	if(isGroup=="1"){ testUniqueCode=groupCode+"_g"; reqnUniqueCode=reqNo+groupCode; }
	else if(isGroup=="0"){ testUniqueCode=testCode+"_t"; reqnUniqueCode=reqDNo+testCode; }

	if(isGroup=="0" && testCode!=null && testCode!=""){ forTestOrGroupOrAll="1" }
	else if(isGroup=="1" && groupCode!=null && groupCode!=""){ forTestOrGroupOrAll="2"; }
	else { forTestOrGroupOrAll="0"; }

	/*---------------------------------------------------*/
	if(searchType=="1" && crNo.length=="15") {

		$('#inputFilterType').val("1");
		$('#inputFilterType').trigger("change");
		$('#crNoInput').val(crNo);

	    showLoding(true);
	    $('#patDetails').removeClass("d-none");
	    $('#patReqnList').removeClass("d-none");

	    var globalSearchParam={ "crNo":crNo, "billNo":billNo, "searchType":searchType,
				 			  "forTestOrGroupOrAll":forTestOrGroupOrAll, "testCode":testCode,
				 			  "groupCode":groupCode}

	     AjaxGetPatDetails(globalSearchParam);
	     AjaxGetReqnList(globalSearchParam);
	     AjaxGetReqnTestParamList(globalSearchParam);

	     var jsonTestKey = { "isGroup": isGroup,"groupCode": groupCode,
		                	  "testCode": testCode, "testUniqueCode": testUniqueCode,
		                	  "reqnUniqueCode": reqnUniqueCode
	        				};

	     $.when( ajaxObjectArr.AjaxGetReqnTestParamList ).then(function( data, textStatus, jqXHR ) {
	    	 if(reqnUniqueCode!=null && reqnUniqueCode!=""){
	    		 modifyTestParamHighchartJson(jsonTestKey);
	    	 }

	    	 if(testUniqueCode!=null && testUniqueCode!=""){
	    	 vm.showGraphTab();
		     for(i=0; i<$(".graphTab-testBtns").length; i++){
		    	 var btnJsonKey = jQuery.parseJSON($(".graphTab-testBtns")[i].getAttribute("key") );
		    	 if(testUniqueCode==btnJsonKey.testUniqueCode){
		    		$(".graphTab-testBtns")[i].click();
		    		 break;
		    	 }}
	    	 }

		     if($("#testParamTable").length){
		    	 if(setIntervalTestParamTable1){clearInterval(setIntervalTestParamTable1)};
		    	 setIntervalTestParamTable1=window.setInterval(redrawTestParamTable1,1000);
		    	 }
	    	});
	/*---------------------------------------------------*/
	} else if (searchType=="2" && billNo.length=="15"){

		$('#inputFilterType').val("2");
		$('#inputFilterType').trigger("change");
		$('#crNoInput').val(billNo);

	    showLoding(true);
	    $('#patDetails').removeClass("d-none");
	    $('#patReqnList').removeClass("d-none");

	    var globalSearchParam={ "crNo":crNo, "billNo":billNo, "searchType":searchType,
	 			  "forTestOrGroupOrAll":forTestOrGroupOrAll, "testCode":testCode,
	 			  "groupCode":groupCode}

		AjaxGetPatDetails(globalSearchParam);
		AjaxGetReqnList(globalSearchParam);
		AjaxGetReqnTestParamList(globalSearchParam);

		var jsonTestKey = { "isGroup": isGroup,"groupCode": groupCode,
		          	  "testCode": testCode, "testUniqueCode": testUniqueCode,
		          	  "reqnUniqueCode": reqnUniqueCode
						};

		$.when( ajaxObjectArr.AjaxGetReqnTestParamList ).then(function( data, textStatus, jqXHR ) {
	    	 if(reqnUniqueCode!=null && reqnUniqueCode!=""){
	    		 modifyTestParamHighchartJson(jsonTestKey);
	    	 }

	    	 if(testUniqueCode!=null && testUniqueCode!=""){
	    	 vm.showGraphTab();
		     for(i=0; i<$(".graphTab-testBtns").length; i++){
		    	 var btnJsonKey = jQuery.parseJSON($(".graphTab-testBtns")[i].getAttribute("key") );
		    	 if(testUniqueCode==btnJsonKey.testUniqueCode){
		    		$(".graphTab-testBtns")[i].click();
		    		 break;
		    	 }}
	    	 }

		if($("#testParamTable").length){
			 if(setIntervalTestParamTable1){clearInterval(setIntervalTestParamTable1)};
			 setIntervalTestParamTable1=window.setInterval(redrawTestParamTable1,1000);
			 }
		});
	}
	/*---------------------------------------------------*/
}

function redrawTestParamTable1(){
	if($("#graphTab").length && $("#graphTab").attr("aria-hidden")=="false"){
		 $('#testParamTable').DataTable().columns.adjust().responsive.recalc();
		 clearInterval(setIntervalTestParamTable1);
	}}

/*------------------------------------------Set Automaticly---------------------------------------------------------------------------------------------------*/


/*------------------------------------------Event Actions starts----------------------------------------------------------------------------------------------*/

/*----------On Change in input type Cr.NO Or Bill No. Or Sample No. starts--------------------*/
$(document).ready(function() {

  $('#inputFilterType').change(function() {
    var inputTypeBCSL = $(this).val();

    /*search made on bill no.*/
    if (inputTypeBCSL == "1") {
    	$('#billNoInput').addClass("d-none");
        $('#crNoInput').removeClass("d-none");
        $('#sampleNoInput').addClass("d-none");
        $('#labNoInput').addClass("d-none");
        $('#inputFilterTypeHelp').html("Search Based On Cr No.");
        showLoding(false);
    }
    /*search made on Cr. no.*/
    else if (inputTypeBCSL == "2") {
    	$('#billNoInput').removeClass("d-none");
        $('#crNoInput').addClass("d-none");
        $('#sampleNoInput').addClass("d-none");
        $('#labNoInput').addClass("d-none");
        $('#inputFilterTypeHelp').html("Search Based On Bill No.");
        showLoding(false);
    }
    /*search made on sample. no.*/
    else if (inputTypeBCSL == "3") {
      $('#billNoInput').addClass("d-none");
      $('#crNoInput').addClass("d-none");
      $('#sampleNoInput').removeClass("d-none");
      $('#labNoInput').addClass("d-none");
      $('#inputFilterTypeHelp').html("Search Based On Sample No.");
      showLoding(false);
    }
    /*search made on sample. no.*/
    else if (inputTypeBCSL == "4") {
      $('#billNoInput').addClass("d-none");
      $('#crNoInput').addClass("d-none");
      $('#sampleNoInput').addClass("d-none");
      $('#labNoInput').removeClass("d-none");
      $('#inputFilterTypeHelp').html("Search Based On Lab No.");
      showLoding(false);
    }
  });
});
/*--------------------------------------------------------------------------------------------*/
/*----------On Click Getdata Button starts----------------------------------------------------*/
$(document).ready(function() {

  $('#getData').click(function() {

    showLoding(true);
    var searchType = $('#inputFilterType').val();
    
    var dateOrFilter="0";
    if($( "input[id=dateOrFilterCheck]:checked" ).length) { dateOrFilter="1" }
    setglobalSearchParam();
    
    var flagGoodToGo = false;
    
    if(dateOrFilter=="1"){
	    /*1 for cr.no.*/
	    if (searchType == 1) {
	    	
	    	var crNo = $('#crNoInput').val();
	        if (crNo.length == 15) {
	        	flagGoodToGo = true;
	        } else {
	        	alert("Cr. No. Should Be Of 15 Digits");
		        $('#crNoInput').focus();
		        flagGoodToGo = false;
		        showLoding(false);
	        }
	    }
	    /*2 for bill.no.*/
	    else if (searchType == 2) {
	    	
	    	var billNo = $('#billNoInput').val();
	        if (billNo.length == 15) {
	        	flagGoodToGo = true;
	        } else {
	          alert("Bill No. Should Be Of 15 Digits");
	          $('#billNoInput').focus();
	          flagGoodToGo = false;
	          showLoding(false);
	        }
	    }
	    /*3 for sample.no.*/
	    else if (searchType == 3) {
	    	
	    	var sampleNo = $('#sampleNoInput').val();
	    	if (sampleNo.length <= 10) {
	    		flagGoodToGo = true;
	    	} else {
	    		alert("Sample No. Should Be Less Then 10 Digits");
	    		$('#sampleNoInput').focus();
	    		flagGoodToGo = false;
	    		showLoding(false);
	    	}
	    }
	    /*4 for Lab.no.*/
	    else if (searchType == 4) {
	    	
	    	var labNo = $('#labNoInput').val();
	    	if (labNo.length <= 10) {
	    		flagGoodToGo = true;
	    	} else {
	    		alert("Lab No. Should Be Less Then 10 Digits");
	    		$('#sampleNoInput').focus();
	    		flagGoodToGo = false;
	    		showLoding(false);
	    	}
	    }
	    
	    if(flagGoodToGo==true){
	    	$('#allValReqnList').addClass("d-none");
	    	
	    	$('#patDetails').removeClass("d-none");
	    	$('#validationReqnListCont').removeClass("d-none");
        	$('#patValReqnList').removeClass("d-none");
        	
        	$('#DataTable11').DataTable().clear().destroy();
        	$('#DataTable12').DataTable().clear().destroy();
        	var table=$('#DataTable12').DataTable({});
        	
	    	AjaxGetPatDetails(globalSearchParam);
        	AjaxGetValidationReqnList(globalSearchParam);
	    }
	    
  	} else {
  		$('#patDetails').addClass("d-none");
  		$('#patValReqnList').addClass("d-none");
  		
  		$('#validationReqnListCont').removeClass("d-none");
  		$('#allValReqnList').removeClass("d-none");
  		
    	$('#DataTable11').DataTable().clear().destroy();
    	$('#DataTable12').DataTable().clear().destroy();
    	var table=$('#DataTable11').DataTable({});
    	
    	AjaxGetValidationReqnList(globalSearchParam);
  	}
  });
});
/*------------------------------------------------------*/

/*----------On Change in Archival Radio Show From to Months for archival search Starts--------*/
$(document).ready(function() {
  $('.dataFromArchival').change(function() {
    var dataFromArchival = $('.dataFromArchival:checked').val();
    if (dataFromArchival == 0) {
      $('.inputDates').addClass("d-none");
    }
    else if (dataFromArchival == 1) {
      $('.inputDates').removeClass("d-none");
    }
  });
  // $("input[name=dataFromMonth]").change(function ()
  // { alert("type2 "+this.value); });
});
/*------------------------------------------------------*/

/*----------On Button Click Show From to Months for archival search Starts--------------------*/
$(document).ready(function() {
  $('#btnDataFromArchival1').click(function (){
      $('.inputDates').removeClass("d-none");
      $('.divArchivalbtn1').addClass("d-none");
      $('.divArchivalbtn2').removeClass("d-none");
  });
  $('#btnDataFromArchival2').click(function (){
      $('.inputDates').addClass("d-none");
      $('.divArchivalbtn2').addClass("d-none");
      $('.divArchivalbtn1').removeClass("d-none");
  });
});
/*------------------------------------------------------*/


$(document).ready(function (){
	$( "input[id=dateOrFilterCheck]" ).off().on("click", function(){
		if($(this).is(":checked")){
			$("#inputFilterType").attr({"disabled":false});
			$("#crNoInput").attr({"disabled":false});
			$("#billNoInput").attr({"disabled":false});
			
			 var inputTypeBCSL =  $('#inputFilterType').val();

			    /*search made on bill no.*/
			if (inputTypeBCSL == "1") {
				$("#inputFilterTypeHelp").html("Search Based On Cr No.");
			} else if (inputTypeBCSL == "2") {
				$("#inputFilterTypeHelp").html("Search Based On Bill No.");
			} else if (inputTypeBCSL == "3") {
				$("#inputFilterTypeHelp").html("Search Based On Sample No.");
			} else if (inputTypeBCSL == "4") {
				$("#inputFilterTypeHelp").html("Search Based On Lab No.");
			}
			//$("#inputFilterTypeHelp").html("Search Based On Bill No.");
			
			//$( "input[id=dateOrFilterCheck]:checked" ).length)
		} else if ($(this).is(":not(:checked)")){
			$("#inputFilterType").attr({"disabled":true}); 
			$("#crNoInput").attr({"disabled":true});
			$("#billNoInput").attr({"disabled":true});
			$("#inputFilterTypeHelp").html("Disabled");
		}
	});
});
/*----------Loding Button Animation On Click Getdata Button starts----------------------------*/
function showLoding(showBoolean) {

  if (showBoolean == true) {
    $('#getData').addClass("d-none");
    $('#getingData').removeClass("d-none");
    $('.rollingCircle').removeClass("d-none");
    $('.lodingText').removeClass("d-none");
    $('#container2Row1').addClass("gradient-border");
    tippyLoadingUtlInstance.getDataBtnDiv.setContent('Loading.. Please Wait');
	tippyLoadingUtlInstance.getDataBtnDiv.enable();
	
	saveBtnsAnimations(false, false);
  } else if (showBoolean == false) {
    $('#getingData').addClass("d-none");
    $('.lodingText').addClass("d-none");
    $('.rollingCircle').addClass("d-none");
    $('#getData').removeClass("d-none");
    $('#container2Row1').removeClass("gradient-border");
	  tippyLoadingUtlInstance.getDataBtnDiv.disable();
  } else {
    $('#getingData').addClass("d-none");
    $('.rollingCircle').addClass("d-none");
    $('.lodingText').addClass("d-none");
    $('#getData').removeClass("d-none");
    $('#container2Row1').removeClass("gradient-border");
    tippyLoadingUtlInstance.getDataBtnDiv.disable();
  }
}
/*--------------------------------------------------------*/

/*----------Ristrict Only Number Input Validation Start---------------------------------------*/
$(document).ready(function() {
  setInputFilter(document.getElementById("billNoInput"), function(value) {
	  return value;
  });
  setInputFilter(document.getElementById("crNoInput"), function(value) {
	  return value;
  });
  setInputFilter(document.getElementById("sampleNoInput"), function(value) {
	  return value;
	  });
  setInputFilter(document.getElementById("labNoInput"), function(value) {
	  return value;
	  });
});

function setInputFilter(textbox, inputFilter) {
  ["input","keypress","keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
    	  var intValue="";
    	  this.value.split("").forEach(function(item){
    		 if(item!="" && item!=" " && !isNaN(item) ){
    			 intValue+=item;
    		 }
    	  });
    	  if(intValue.length>0){
    		  intValue=inputFilter(intValue);
    		  this.value = intValue;
    		  this.oldValue = intValue;
    	  }else{
    		  if (this.hasOwnProperty("oldValue") && this.value!="") { this.value = this.oldValue; }
    		  else{ this.value =""; this.oldValue="";}
    	  }
    });
  });
}


$("#textA").bind('copy', function() {
    $(".spanCopyAlert").text('copy behaviour detected!')
});
$("#textA").bind('paste', function() {
    $(".spanCopyAlert").text('paste behaviour detected!')
});
$("#textA").bind('cut', function() {
    $(".spanCopyAlert").text('cut behaviour detected!')
});

/*-------------------------------------------------------*/

/*----------Function to expand and collapse all DataTable rows on button click Starts---------*/
function expandColapseRow(booleanExpand, table) {
  if (booleanExpand == true) {
    // Expand row details
    table.rows(':not(.parent)').nodes().to$().find('td:first-child').trigger('click');
    //Switch buttons
    $('table .expandButton').addClass("d-none");
    $('table .collapseButton').removeClass("d-none");
  } else {
    // Collapse row details
    table.rows('.parent').nodes().to$().find('td:first-child').trigger('click');
    //Switch buttons
    $('table .collapseButton').addClass('d-none');
    $('table .expandButton').removeClass('d-none');
  }
}

function sellectAllDtCheck(booleanCheck, table){
	if (booleanCheck == true) {
		table.rows().select();
		$('.rowCheckBoxes').prop("checked", true);
		//table.rows().$(tr td:nth-child(2) input).prop("checked", true);
	}
	else {
		table.rows().deselect();
		$('.rowCheckBoxes').prop("checked", false);
	}
}
/*--------------------------------------------------------*/

/*----------Function to Set Events Listeners After Requisition List Table Fetched Starts--------*/

function setEventListenersAfterReqnListTableDrawn(){
	
  if($('.viewTemplBtn').length){
  	$('.viewTemplBtn').off().on("click", function (){
  		var viewTemplBtnVal = jQuery.parseJSON( $(this).attr("key") );
  		 openTemplateIFrame(viewTemplBtnVal);
  	});
  }

  if($('.compareBtn').length){
  	$('.compareBtn').off().on("click", function (){
  		var compareBtnVal = jQuery.parseJSON( $(this).attr("key") );
  		openInvTrackCompareIFrame(compareBtnVal);
  	});
  }
  
  if($('.rowCheckBoxes').length){
	  $('.rowCheckBoxes').off().on("click", function (){
		  if($(".rowCheckBoxes:checked").length){
			  saveBtnsAnimations(true, false);
		  } else {
			  saveBtnsAnimations(false, false);
		  }
	  });
  }
  

}

function saveBtnsAnimations(enableFlag, animateFlag){
	if(enableFlag==true){
		$('#saveValidateBtn').attr({"disabled":false});
		  $('#modifyBtn').attr({"disabled":false});
		  
		  tippyLoadingUtlInstance.saveValBtnDiv.setContent('Click to Validate Selected Requisition');
		  tippyLoadingUtlInstance.modifyValBtnDiv.setContent('Click to Modify Selected Requisition');
	}else{
		$('#saveValidateBtn').attr({"disabled":true});
		  $('#modifyBtn').attr({"disabled":true});
		  
		  tippyLoadingUtlInstance.saveValBtnDiv.setContent('Please select atleast one Requisition to Validate');
		  tippyLoadingUtlInstance.modifyValBtnDiv.setContent('Please select atleast one Requisition to Modify');
	}
}



/*----------Function to Set Events Listeners After Requistion List Table Fetched Starts--------*/
var globalSearchParam={collAreaCode:"", labCode:"", validationStatusCode:"", dateOrFilter:"", dateTypeCode:"",
						searchType:"", fromDate:"", toDate:"", crNo:"", billNo:"", sampleNo:"", labNo:"" };

function setglobalSearchParam(){
	globalSearchParam.collAreaCode = $('#collAreaSelectInput').val();
	globalSearchParam.labCode = $('#labSelectInput').val();
	globalSearchParam.validationStatusCode = $('#valStatusSelectInput').val();

	var dateOrFilter="0";
	if($( "input[id=dateOrFilterCheck]:checked" ).length) { dateOrFilter="1" }
	globalSearchParam.dateOrFilter = dateOrFilter;
	
	globalSearchParam.dateTypeCode = $('#dateTypeSelectInput').val();
	globalSearchParam.searchType = $('#inputFilterType').val();
	globalSearchParam.fromDate = $('.fromDateInput').val();
	globalSearchParam.toDate = $('.toDateInput').val();
	globalSearchParam.crNo = $('#crNoInput').val();

	console.log(globalSearchParam);

}

var tippyLoadingUtlInstance={};

$(document).ready(function(){

	var tippy_labSelectInputGroup=tippy('.labSelectInputGroup', {
					    delay: 100,
					    arrow: true,
					    arrowType: 'round',
					    size: 'large',
					    duration: 500,
					    animation: 'shift-away-extreme',
					    placement: 'bottom',
					    allowHTML: true,
					    content: '',
					});

	var tippy_getDataBtnDiv=tippy('.getDataBtnDiv', {
					    delay: 100,
					    arrow: true,
					    arrowType: 'round',
					    size: 'large',
					    duration: 500,
					    animation: 'shift-away-extreme',
					    placement: 'bottom',
					    allowHTML: true,
					    content: '',
					});
	

	var tippy_saveValBtn=tippy('.saveValidateBtnDiv', {
					    delay: 100,
					    arrow: true,
					    arrowType: 'round',
					    size: 'large',
					    duration: 500,
					    animation: 'shift-away-extreme',
					    placement: 'top',
					    allowHTML: true,
					    content: 'Please select tleast one Requisition to Validate',
					});
	
	var tippy_modifyValBtn=tippy('.modifyBtnDiv', {
					    delay: 100,
					    arrow: true,
					    arrowType: 'round',
					    size: 'large',
					    duration: 500,
					    animation: 'shift-away-extreme',
					    placement: 'top',
					    allowHTML: true,
					    content: 'Please select atleast one Requisition to Modify',
					});
	
	var tippy_dateOrFilterCheck=tippy('.dateOrFilterDiv', {
	    delay: 100,
	    arrow: true,
	    arrowType: 'round',
	    size: 'small',
	    duration: 300,
	    animation: 'shift-away-extreme',
	    placement: 'top',
	    allowHTML: true,
	    content: 'Turn On/Off filtered Search',
	});
	
	
	tippy_labSelectInputGroup[0].disable();
	tippy_getDataBtnDiv[0].disable();

	tippyLoadingUtlInstance.labSelectInputGroup=tippy_labSelectInputGroup[0];
	tippyLoadingUtlInstance.getDataBtnDiv=tippy_getDataBtnDiv[0];
	
	tippyLoadingUtlInstance.saveValBtnDiv=tippy_saveValBtn[0];
	tippyLoadingUtlInstance.modifyValBtnDiv=tippy_modifyValBtn[0];

	//tippyLoadingUtlInstance.tippy_labSelectInputGroup.enable();
	//tippyLoadingUtlInstance.tippy_getDataBtnDiv.enable();
	//tippyLoadingUtlInstance.tippy_labSelectInputGroup.show();

	/*var buttonTippy = document.querySelector('#estimatebtn');
    tippy(buttonTippy);
    var estimateRateTippyInstance = buttonTippy._tippy;
    estimateRateTippyInstance.setProps({
            content: stringg
            });
    estimateRateTippyInstance.show(0);
    instance.disable();*/
});

function getCollAreaNLabListOnLoad(){
	AajaxGetCollAreaNLabList();
}

$(document).ready(function(){
	$('#collAreaSelectInput').change(function(){
		if(globalSearchParam.collAreaCode==$(this).val()){
			$('#labSelectInput').removeAttr("disabled");
			$('#getData').removeAttr("disabled");
			tippyLoadingUtlInstance.labSelectInputGroup.disable();
			tippyLoadingUtlInstance.getDataBtnDiv.disable();
		}else if($(this).val()=="-1"){
			$('#labSelectInput').attr({"disabled":"disabled"});
			$('#getData').attr({"disabled":"disabled"});
			showLoding(false);

			tippyLoadingUtlInstance.labSelectInputGroup.setContent('<strong>Select Any Collection <span style="color: aqua;">Area </span>To Enable This</strong>');
			tippyLoadingUtlInstance.labSelectInputGroup.enable();

			tippyLoadingUtlInstance.getDataBtnDiv.setContent('<strong>Select Any Collection <span style="color: aqua;">Area </span>To Enable This</strong>');
			tippyLoadingUtlInstance.getDataBtnDiv.enable();

		}else{
			$('#labSelectInput').removeAttr("disabled");
			$('#getData').removeAttr("disabled");
			showLoding(true);

			tippyLoadingUtlInstance.labSelectInputGroup.disable();

			$('#labSelectInput').empty();

			globalSearchParam.collAreaCode=$(this).val();
			AjaxGetLabList(globalSearchParam);
		}
	});
});

$(document).ready(function(){
	$('#labSelectInput').change(function(){
		if(globalSearchParam.labCode==$(this).val()){
			$('#getData').removeAttr("disabled");
			tippyLoadingUtlInstance.getDataBtnDiv.disable();
		}else if($(this).val()=="-1"){
			$('#getData').attr({"disabled":"disabled"});
			showLoding(false);
			tippyLoadingUtlInstance.getDataBtnDiv.setContent('<strong>Select Any<span style="color: aqua;"> Lab Name </span>To Enable This</strong>');
			tippyLoadingUtlInstance.getDataBtnDiv.enable();
		}else{
			$('#getData').removeAttr("disabled");
			tippyLoadingUtlInstance.getDataBtnDiv.disable();
			globalSearchParam.labCode=$(this).val();
		}
	});
});



/*------------------------------------------Event Actions Ends------------------------------------------------------------------------------------------------*/


/*------------------------------------------Ajax Calls Starts-------------------------------------------------------------------------------------------------*/


var globalCollAreaList = null;
var globalLabList = null;
var globalDeferredObjectArr =null;
var globalValidationReqnList = null;
var globalAjaxObjectArr ={};

function AajaxGetCollAreaNLabList(){
	globalCollAreaList = null;
	var _mode = "AajaxGetCollAreaNLabList";

	  var url = "/HISInvestigationG5/new_investigation/invResultValidationResp.cnt?hmode=" + _mode;

	  globalAjaxObjectArr.AajaxGetCollAreaList=$.getJSON(url, function(data) {
		  if(!$.isEmptyObject(data)) {

			  if(data.isSuccess=="1"){
				  globalCollAreaList = data.collAreaList;
				  globalLabList = data.labList;

				  setCollAreaList(data);
				  setLabList(data);
			  }else{
				  console.log("%cAajaxGetCollAreaNLabList Failed | ResponseError Is Below", "color:red;");
			      console.log(data.error);
			  }

	      }
	    })
	    .done(function(data) {
	      console.log("%cAajaxGetCollAreaNLabList success | ResponseData Is Below", "color:green;");
	      console.log(data);
	    })
	    .fail(function( jqxhr, textStatus, error ) {
	      console.log("%cAajaxGetCollAreaNLabList Failed | ResponseError Is Below", "color:red;");
	      var err = textStatus + ", " + error;
	      console.log( "Request Failed: " + err );
	    });
}

function AjaxGetLabList(globalSearchParam){
	var collAreaCode=globalSearchParam.collAreaCode;

	globalLabList = null;
	var _mode = "AjaxGetLabList";

	  var url = "/HISInvestigationG5/new_investigation/invResultValidationResp.cnt?hmode=" + _mode + "&collAreaCode=" + collAreaCode;

	  globalAjaxObjectArr.AjaxGetLabList=$.getJSON(url, function(data) {
	    if(!$.isEmptyObject(data)) {

			  if(data.isSuccess=="1"){
				  globalLabList = data.labList;

				  setLabList(data);
			  }else{
				  console.log("%cAjaxGetLabList Failed | ResponseError Is Below", "color:red;");
			      console.log(data.error);
			  }

	      }
	    })
	    .done(function(data) {
	      console.log("%cAjaxGetLabList success | ResponseData Is Below", "color:green;");
	      console.log(data);
	    })
	    .fail(function( jqxhr, textStatus, error ) {
	      console.log("%cAjaxGetLabList Failed | ResponseError Is Below", "color:red;");
	      var err = textStatus + ", " + error;
	      console.log( "Request Failed: " + err );
	    });
}

var globalPatientDetails = null;
function AjaxGetPatDetails(globalSearchParam) {

	globalPatientDetails = null;

	var _mode = "AjaxGetPatDetails";
	
	var crNo=globalSearchParam.crNo;
	var billNo=globalSearchParam.billNo;
	var searchType=globalSearchParam.searchType;
	//var forTestOrGroupOrAll=globalSearchParam.forTestOrGroupOrAll;
	//var testCode=globalSearchParam.testCode;
	//var groupCode=globalSearchParam.groupCode;

  var url = "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode=" + _mode + "&crNo=" + crNo + "&billNo=" + billNo +"&searchType="+searchType;

  globalAjaxObjectArr.AjaxGetPatDetails=$.getJSON(url, function(data) {

		if(!$.isEmptyObject(data)) {
			if(data.isSuccess=="1") {
				
		    	  globalPatientDetails=data.patDetails;

		    	  var patDetails=data.patDetails[0];
		    	  /*----------------------------------------------------*/
		    	  if(patDetails.patGenderCode=="F"){
		    		  if(patDetails.patAge){} //in future implementation
		    		  $('#patDetails-icon-w').removeClass("d-none");
		    		  $('#patDetails-icon-m').addClass("d-none");
		    		  $('#patDetails-icon-t').addClass("d-none");
		    	  }
		    	  else if(patDetails.patGenderCode=="M") {
		    		  $('#patDetails-icon-w').addClass("d-none");
		    		  $('#patDetails-icon-m').removeClass("d-none");
		    		  $('#patDetails-icon-t').addClass("d-none");
		    	  }
		    	  else if(patDetails.patGenderCode=="T") {
		    		  $('#patDetails-icon-w').addClass("d-none");
		    		  $('#patDetails-icon-m').addClass("d-none");
		    		  $('#patDetails-icon-t').removeClass("d-none");
		    	  }
		    	  /*----------------------------------------------------*/
		    	  
		    	  $('.opdSpan').addClass("d-none");
		    	  $('.admittedSpan').addClass("d-none");
				  $('.UnknownSpan').addClass("d-none");
				  $('.deadSpan').addClass("d-none");
				  $('.mlcSpan').addClass("d-none");
		    	  if(patDetails.patStatusCode=="2"){
		    		  $('.admittedSpan').removeClass("d-none");
		    	  } else if (patDetails.patStatusCode=="1"){
		    		  $('.opdSpan').removeClass("d-none");
		    	  }
		    	  if(patDetails.isUnknown=="1"){
		    		  $('.UnknownSpan').removeClass("d-none");
		    		  }
		    	  if(patDetails.isDead=="1"){
		    		  $('.deadSpan').removeClass("d-none");
		    		  }
		    	  if(patDetails.isMlc=="1"){
		    		  $('.mlcSpan').removeClass("d-none");
		    		  }
		    	  /*----------------------------------------------------*/
		    	  if(patDetails.patStatusCode=="2"){
		    		  $('#patDetails-table-Opd').addClass("d-none");
		    		  $('#patDetails-table-Ipd').removeClass("d-none");
		    		  dataTableIPDPatDetails(data.patDetails);
		    		  }
		    	  else{
		    		  $('#patDetails-table-Opd').removeClass("d-none");
		    		  $('#patDetails-table-Ipd').addClass("d-none");
		  		   dataTableOPDPatDetails(data.patDetails);
		  		  }
		    	  /*----------------------------------------------------*/
				
			} else {
			  console.log("%cAjaxGetPatDetails Failed | ResponseError Is Below", "color:red;");
			  console.log(data.error);
			}
		}
	})
	.done(function(data) {
	  console.log("%cAjaxGetPatDetails success | ResponseData Is Below", "color:green;");
	  console.log(data);
	})
	.fail(function( jqxhr, textStatus, error ) {
	  console.log("%cAjaxGetPatDetails Failed | ResponseError Is Below", "color:red;");
	  var err = textStatus + ", " + error;
	  console.log( "Request Failed: " + err );
	});
  
}


function AjaxGetValidationReqnList(globalSearchParam){
	var collAreaCode=globalSearchParam.collAreaCode;
	var labCode = globalSearchParam.labCode;
	var validationStatusCode = globalSearchParam.validationStatusCode
	var dateOrFilter= globalSearchParam.dateOrFilter
	var dateTypeCode= globalSearchParam.dateTypeCode
	var fromDate= globalSearchParam.fromDate
	var toDate= globalSearchParam.toDate
	var crNo= globalSearchParam.crNo

	globalValidationReqnList = null;
	var _mode = "AjaxGetValidationReqnList";

	  var url = "/HISInvestigationG5/new_investigation/invResultValidationResp.cnt?hmode=" + _mode + "&collAreaCode=" + collAreaCode + "&labCode="
	  + labCode + "&validationStatusCode=" + validationStatusCode + "&dateOrFilter=" + dateOrFilter + "&dateTypeCode=" + dateTypeCode + "&fromDate=" + fromDate
	  + "&toDate=" + toDate + "&crNo=" + crNo;

	  globalAjaxObjectArr.AjaxGetValidationReqnList=$.getJSON(url, function(data) {
	    if(!$.isEmptyObject(data)) {

			  if(data.isSuccess=="1"){
				  globalValidationReqnList = data.validationReqnList;
				  
				  if(globalSearchParam.dateOrFilter=="1"){
					  dataTablePatValidationReqnList(data.validationReqnList);
				  } else {
					  dataTableValidationReqnList( data.validationReqnList);  
				  }
			  }else{
				  console.log("%cAjaxGetValidationReqnList Failed | ResponseError Is Below", "color:red;");
			      console.log(data.error);
			  }

	      }
	    })
	    .done(function(data) {
	      console.log("%cAjaxGetValidationReqnList success | ResponseData Is Below", "color:green;");
	      console.log(data);
	    })
	    .fail(function( jqxhr, textStatus, error ) {
	      console.log("%cAjaxGetValidationReqnList Failed | ResponseError Is Below", "color:red;");
	      var err = textStatus + ", " + error;
	      console.log( "Request Failed: " + err );
	    });
}


function AjaxValidateReqnResult(globalSelectedReqnData){
	var concatSelectedReqnData = globalSelectedReqnData.concatSelectedReqnData;
	var concatChkSendToMachine = globalSelectedReqnData.concatChkSendToMachine;
	//var isPatDetailPage = "1";
	
	var requestData = {hmode:"AjaxValidateReqnResult", selectedCheckbox:concatSelectedReqnData, chkSendToMachine:concatChkSendToMachine}
			
	var url = "/HISInvestigationG5/new_investigation/invResultValidationResp.cnt?";
	
	  globalAjaxObjectArr.AjaxValidateReqnResult=$.getJSON(url, requestData, function(data) {
	    if(!$.isEmptyObject(data)) {

			  if(data.isSuccess=="1") {
				  removeDatatableRowsOnSave();
				  showToastifyMsg("Test Result Validated", true, 4000);
				 
			  } else {
				  showToastifyMsg("Test Result Validation Failed", false, 4000);
				  console.log("%cAjaxValidateReqnResult Failed | ResponseError Is Below", "color:red;");
			      console.log(data.error);
			  }

	      }
	    })
	    .done(function(data) {
	      console.log("%cAjaxValidateReqnResult success | ResponseData Is Below", "color:green;");
	      console.log(data);
	    })
	    .fail(function( jqxhr, textStatus, error ) {
	      console.log("%cAjaxValidateReqnResult Failed | ResponseError Is Below", "color:red;");
	      var err = textStatus + ", " + error;
	      console.log( "Request Failed: " + err );
	    });
	  
}


function openInvTrackCompareIFrame(compareBtnVal){
	var crNo=compareBtnVal.crNo;
	var requisitionNo=compareBtnVal.requisitionNo;
	var requisitionDNo=compareBtnVal.requisitionDNo;
	var testCode=compareBtnVal.testCode;
	var groupCode=compareBtnVal.groupCode;

	var isGroup="0";
  if(groupCode!="" && groupCode!=null && groupCode!="null"){isGroup="1"}

  var _mode = "UrlExternalCall";
  var url="/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode="+_mode+"&crNo="+crNo+"&searchType=1"+"&isGroup="+isGroup
  +"&testCode="+testCode+"&groupCode="+groupCode+"&requisitionDNo="+requisitionDNo+"&requisitionNo="+requisitionNo+"&showGraph=0";
  $.fancybox.destroy();
  $(".fancyBoxIFrame").attr({"href":url});
  $(".fancyBoxIFrame").click();

}

function openTemplateIFrame(viewTemplBtnVal){
	var crNo=viewTemplBtnVal.crNo;
	var requisitionNo=viewTemplBtnVal.requisitionNo;
	var requisitionDNo=viewTemplBtnVal.requisitionDNo;
	var testCode=viewTemplBtnVal.testCode;
	var groupCode=viewTemplBtnVal.groupCode;

	var isGroup="0";
	if(groupCode!="" && groupCode!=null && groupCode!="null"){isGroup="1"}

	var res = crNo+"%23"+requisitionNo+"%23"+requisitionDNo+"%23"+groupCode;
 	var hmode="GetReqnDetailsNonEditable";
	var isPatDetailPage="1";
	var ispreview="2";
	var url="/HISInvestigationG5/new_investigation/invResultValidationResp.cnt?hmode="+hmode+"&isPatDetailPage="+isPatDetailPage+"&selectedCheckbox="+res+"&ispreview="+ispreview;
	$.fancybox.destroy();
  $(".fancyBoxIFrame").attr({"href":url});
  $(".fancyBoxIFrame").click();

}

function openModifyResultIFrame(globalSelectedReqnData){
	var concatSelectedReqnData = globalSelectedReqnData.concatSelectedReqnData;
	var concatChkSendToMachine= globalSelectedReqnData.concatChkSendToMachine;
	
	var valstusCod = globalSearchParam.validationStatusCode;
	var requestData = {hmode:"GetReqnDetailsEditable", selectedCheckbox:concatSelectedReqnData, chkSendToMachine:concatChkSendToMachine, newEntry:valstusCod};
	var requestDataStrlUrlEncoded = $.param(requestData);
	//alert(requestDataStrlUrlEncoded);
	var url = "/HISInvestigationG5/new_investigation/invResultValidationResp.cnt?";
	url += requestDataStrlUrlEncoded;
	$.fancybox.destroy();
  $(".fancyBoxIFrame").attr({"href":url});
  $(".fancyBoxIFrame").click();

}


$(document).ready(function() {
    $(".fancyBoxIFrame").fancybox({
    	//closeExisting: false,
    	type: 'iframe',
    	toolbar  : false,
    	smallBtn : true,
    	transitionEffect: "zoom-in-out",
    	transitionDuration: 366,
    	iframe : {
    		// Iframe template
    	    //tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen allow="autoplay; fullscreen" src=""></iframe>',
    		preload : true,
    		css : {
//    			'width':$fancyboxWidth,
//    	        'height':$fancyboxHeight,
    	        'width'  : '100%',
    	        'height' : '100%',
            	}
    	},
    	btnTpl: {
    		    close:
    		      '<button data-fancybox-close type="button"  class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
    		      '<i class="far fa-window-close fa-w-16 fa-2x" style=" color: #82C91E;"></i>' +
    		      "</button>",

    		      smallBtn:
    		          '<button data-fancybox-close type="button"  class="fancybox-button fancybox-close-small " title="{{CLOSE}}">' +
    		          '<i class="far fa-window-close fa-w-16 fa-2x" style=" color: #82C91E;"></i>' +
    		          "</button>"
    	},
    	afterClose: function( instance, current ) {
    		actionOnFancyClose();
    	}
    });
});
/*------------------------------------------Ajax Calls Ends---------------------------------------------------------------------------------------------------*/



/*------------------------------------------DataTables Initialization starts----------------------------------------------------------------------------------*/

function setCollAreaList(data){
	var collAreaList=data.collAreaList;

	$('#collAreaSelectInput').empty();

	var collectionAreaCount = Object.keys(collAreaList).length;

	if(collectionAreaCount=="1"){
		for(i in collAreaList){
			for(key in collAreaList[i]){
				$('#collAreaSelectInput').append('<option selected value="'+key+'">'+collAreaList[i][key]+'</option>');
			}
		}
	}else{
		$('#collAreaSelectInput').append('<option value="-1">Choose Collection Area</option>');
		$('#collAreaSelectInput').append('<option selected value="0">All Collection Area</option>');

		for(i in collAreaList){
			for(key in collAreaList[i]){
				$('#collAreaSelectInput').append('<option value="'+key+'">'+collAreaList[i][key]+'</option>');
		}}
	}
}

function setLabList(data){
	var labList = data.labList;

	$('#labSelectInput').empty();

	//var labCount = Object.keys(labList).length;
	var labCount = labList.length;

	if(labCount=="1"){
		for(i in labList){
			for(key in labList[i]){
				$('#labSelectInput').append('<option selected value="'+key+'">'+labList[i][key]+'</option>');
			}
		}
	}else{
		$('#labSelectInput').append('<option value="-1">Choose Lab</option>');
		$('#labSelectInput').append('<option selected value="0">All Labs</option>');

		for(i in labList){
			for(key in labList[i]){
				$('#labSelectInput').append('<option value="'+key+'">'+labList[i][key]+'</option>');
		}}
	}
	showLoding(false);
}


function dataTableOPDPatDetails(patDetailsOPD){

	$('#DataTable1').DataTable().clear().destroy();
	  var table = $('#DataTable1').DataTable({

	    responsive: true,
	    "ordering": false,
	    "dom": "t",
	    lengthChange: false,
	    "language": { "emptyTable": "No Data Is Available " },
	    "aaData": patDetailsOPD,
	    "columns": [
	    	/*isUnknown isDead isMlc isCatExpired isActualDob
	    	--patStatusCode patCategoryCode patGenderCode
			--patHusbandName patEmailId */
	    	{ "data": 'patientName' },
	    	{ "data": 'crNumber' },
	    	{ "data": 'patStatus' },
	    	{ "data": 'patGender' },
	    	{ "data": 'patAge' },
	    	{ "data": 'patGuardianName' },
	    	{ "data": 'patCategory' },
	    	{ "data": 'patDOB' },
	    	{ "data": 'patMobileNo' },
	    	{ "data": 'patAddress' }
	    ],
	    responsive: {
	    	details: {
	    		renderer: function(api, rowIdx, columns) {
	    			var data = $.map(columns, function(col, i) {
	    				return col.hidden ? customeRowType1(col) : '';
	    				}).join('');
	    			return data ? customeRowDataAppend(data) : false;
	    		}
	    	}
	    },
	    "initComplete": function(settings, json) {    }
	  });
}

function dataTableIPDPatDetails(patDetailsIPD){

	$('#DataTable8').DataTable().clear().destroy();
	  var table = $('#DataTable8').DataTable({

		responsive: true,
		"ordering": false,
		"dom": "t",
		lengthChange: false,
		"language": {
		  "emptyTable": "No Data Is Available "
		},
	    "aaData": patDetailsIPD,
	    "columns": [
	    	/*isUnknown isDead isMlc isCatExpired isActualDob
	    	--patStatusCode patCategoryCode patGenderCode
	    	--patHusbandName patEmailId
	    	--//ipd// patDeptUnitCode patVisitNo patEpisodeCode admittedDepartmentCode
			patDeptUnit patWardCode admittedDepartmentCode patRoomNo bedCode hospitalCode
			patAccNo patMlcNo */
	    	{ "data": 'patientName' },
		    { "data": 'crNumber' },
		    { "data": 'patStatus' },
		    { "data": 'patGender' },
		    { "data": 'patAge' },
		    { "data": 'patGuardianName' },
		    { "data": 'patCategory' },
		    { "data": 'patDOB' },
		    { "data": 'admissionDate' },
		    { "data": 'patAdmissionNo' },
		    { "data": 'admittedDepartmentName' },
		    { "data": 'patWardName' },
		    { "data": 'patRoomName' },
		    { "data": 'bedName' },
		    { "data": 'diagnosis' },
		    { "data": 'consultantName' },
		    { "data": 'patMobileNo' },
			{ "data": 'patAddress' },
	    ],
	    "columnDefs": [
	    	{ "render": function ( data, type, row ) {
	    		return customAddressData(data, type, row);
	    	    },
	    	  "targets": 17
	    	},
	    	{ "width": "250px", "targets": 17 },
	     ],
	    responsive: {
	    	details: {
	    		renderer: function(api, rowIdx, columns) {
	    			var data = $.map(columns, function(col, i) {
	    				return col.hidden ? customeRowType1(col) : '';
	    				}).join('');
	    			return data ? customeRowDataAppend(data) : false;
	    		}
	    	}
	    },
	    "initComplete": function(settings, json) {    }
	  });
}

var globalDatablesObject ={};
function dataTableValidationReqnList(validationReqnList) {
	  var groupColumn = 2;
	  $('#DataTable11').DataTable().clear().destroy();

	  $.fn.dataTable.moment('DD-MMM-YYYY HH:mm');
var table = $('#DataTable11').DataTable({

		  "dom": '<"row"<"col-6 col-sm-5 col-lg-2 "l><"col-6 col-sm-2 col-lg-1"B><"col-6 col-sm-5 col-lg-3 "f><"col-6 col-sm-12 col-lg-6"p>>rt<"row"<"col-12"i>><"clear">',
      processing: true,
		  "scrollY":        "450px",
		  "scrollCollapse": true,
		  "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
	    "language": { "emptyTable": "No Data Is Available " },
      "select": {
          style:    'multi', /*multi+shift | single | api | os | multi*/
          selector: 'td:nth-child(2) .rowCheckBoxes',
          blurable: true,
        },
      "sPaginationType": "full_numbers",
		  "bJQueryUI": true,
      buttons: [{
	    	  extend: 'collection',
	    	  text: '',
	    	  className: "fas fa-cogs text-primary btn-lg bg-white btn-outline-light",
	    	  buttons: [
	    		  { extend: 'excel',
	    			  title: 'Investigation Tracking Report',
	    			  text: ' Download Excel',
	    			  className: "fas fa-file-excel text-primary bg-white btn-outline-light"
	    		  },
	    		  { extend: 'pdfHtml5',
	    			  className: "fas fa-file-pdf text-primary bg-white btn-outline-light",
	    			  title: 'Investigation Tracking Report',
	    			  text: ' Download Pdf',
	    			  pageMargins: [0, 0, 0, 0],
	    			  margin: [0, 0, 0, 0],
	    			  alignment: 'center',
	    			  exportOptions: {
	    				  columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]
	    			      },
	    			  orientation: 'landscape',
	    			  pageSize: 'A3',
	    			  customize: function(doc) {
	    				  doc.styles.tableHeader.fontSize = 6;
	    				  doc.defaultStyle.fontSize = 5;
	    				  doc.defaultStyle.alignment = 'left';
	    			      }
	    		  }
	    	  ]
	      }],
        "aaData": validationReqnList,
	      "columns": [
    	  	/*requisitionNo requisitionDNo testCode
			groupCode testName groupName accessionNo
			tempSampleNo isMachineBasedTest testParameterName
			finalRemarkReqd finalRemarkString reportChangeFlag
			isRepeat patAge patGender machineCode*/
    	  { "data": 'sno' },
    	  { "data": 'reqnCheckBox' },
          { "data": 'crNo' },
          { "data": 'patName' },
          { "data": 'patAgeGender'},
          { "data": 'patUnitName' },
          { "data": 'testNameOrGroupName' },
          { "data": 'patLabName' },
          { "data": 'tempSampleOrAccessionNo' },
          { "data": 'patStatus' },
          { "data": 'sendToMachineCheckBox' },
          { "data": 'view' },
          { "data": 'compareBtn' }
		    ],
		  "order": [[ 0, "asc" ]],
	      "columnDefs":
					[ { "targets": 0, "orderable": true},
					  { "targets": 1, "orderable": false},
					  { "targets": 1,
						"render": function ( data, type, row )
									{ return rowCheckBox(data, type, row); },
					  },
					  { "targets": 5,
						"render": function ( data, type, row )
									{ return customDepartment(data, type, row); },
					  },
					  { "targets": 10,
	    				"createdCell": function (td, cellData, rowData, rowIndex, collIndex)
                             			{ $(td).attr('data-search', rowData.machineCode); },//$(td).css('color', 'red');
					  },
					  { "targets": 10,
	  					"render": function ( data, type, row )
									{ return sendToMachineCheckBox(data, type, row); },
					  },
					  { "targets": 11,
						 "render": function ( data, type, row )
									{ return setVewTemplateVal(data, type, row); },
					  },
					  { "targets": 12,
						 "render": function ( data, type, row )
									{ return setInTrackingCompareBtnVal(data, type, row); },
					  },
					],
	      "drawCallback": function(settings) {
	    	  var api = this.api();
	    	  var rows = api.rows({page: 'current'}).nodes();

	    	  //set events active on every table draw event
	    	  setEventListenersAfterReqnListTableDrawn();
	      },
	      "rowCallback" : function( row, data, displayNum, displayIndex, dataIndex ) { 
	    	  var index = displayIndex +1;
	    	if(updateRowFlag){
    		  var oSettings = this.fnSettings ();
    		    // $('td:first', row).html(oSettings._iDisplayStart+displayIndex +1);
    		    // $('td:eq(0)',row).html(index);
	      		}
	    	  return row;
	      },
	      
	      responsive: {
	    	  details: {
  	    		renderer: function(api, rowIdx, columns) {
	  	    			var data = $.map(columns, function(col, i) {
	  	    				return col.hidden ? customeRowType1(col) : '';
	  	    				}).join('');
	  	    			  return data ? customeRowDataAppend(api, rowIdx, columns, data) : false;
  	    		  }
  	    	}
	      },
  		  "initComplete": function(settings, json) {
  			  showLoding(false);
  			  $('#container2ExpandBtn').click();
  			  //$("#container1Row1").collapse('hide');
  		  }
    });

    table.on( 'responsive-display', function ( e, datatable, row, showHide, update ) {
      setEventListenersAfterReqnListTableDrawn();
      //console.log( 'Details for row '+row.index()+' '+(showHide ? 'shown' : 'hidden') );
      
      if(showHide){
    	  var testParamTableID= "#testParamTable"+row.index();
    	  //console.log(testParamTableID);
    	  $(testParamTableID).DataTable().columns.adjust().responsive.recalc();
      }
      
    });
	  //Set Tab Notification Badge
	  //$('.patientTestBadgeCount').text(table.rows().count());

	  // Handle click on "Epand All" button
	  $('table .expandButton').on('click', function() {
	    expandColapseRow(true, table);
	  });

	  // Handle click on "Collapse All" button
	  $('table .collapseButton').on('click', function() {
	    expandColapseRow(false, table);
	  });

	  $("#selectAllDtCheck1").off().on( "change", function(e) {
		    if ($(this).is( ":checked" )) {
		    	sellectAllDtCheck(true, table);
		    } else {
		    	sellectAllDtCheck(false, table);
		    }
		    
			if($(".rowCheckBoxes:checked").length){
				 saveBtnsAnimations(true, false);
			} else {
				saveBtnsAnimations(false, false);
			}
		});
	  
	  globalDatablesObject.dataTableValidationReqnList = table;

	}



var updateRowFlag=false;
function dataTablePatValidationReqnList(patValidationReqnList) {
	  $('#DataTable12').DataTable().clear().destroy();

	  $.fn.dataTable.moment('DD-MMM-YYYY HH:mm');
	  var table = $('#DataTable12').DataTable({

		  "dom": '<"row"<"col-6 col-sm-5 col-lg-2 "l><"col-6 col-sm-2 col-lg-1"B><"col-6 col-sm-5 col-lg-3 "f><"col-6 col-sm-12 col-lg-6"p>>rt<"row"<"col-12"i>><"clear">',
		  processing: true,
		  "scrollY":        "350px",
		  "scrollCollapse": true,
		  "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
		  "language": { "emptyTable": "No Data Is Available " },
		  "select": {
	        style:    'multi', /*multi+shift | single | api | os | multi*/
	        selector: 'td:nth-child(2) .rowCheckBoxes',
	        blurable: true,
	      },
	      "sPaginationType": "full_numbers",
		  "bJQueryUI": true,
		  buttons: [{
			    	  extend: 'collection',
			    	  text: '',
			    	  className: "fas fa-cogs text-primary btn-lg bg-white btn-outline-light",
			    	  buttons: [
			    		  { extend: 'excel',
			    			  title: 'Investigation Tracking Report',
			    			  text: ' Download Excel',
			    			  className: "fas fa-file-excel text-primary bg-white btn-outline-light"
			    		  },
			    		  { extend: 'pdfHtml5',
			    			  className: "fas fa-file-pdf text-primary bg-white btn-outline-light",
			    			  title: 'Investigation Tracking Report',
			    			  text: ' Download Pdf',
			    			  pageMargins: [0, 0, 0, 0],
			    			  margin: [0, 0, 0, 0],
			    			  alignment: 'center',
			    			  exportOptions: {
			    				  columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]
			    			      },
			    			  orientation: 'landscape',
			    			  pageSize: 'A3',
			    			  customize: function(doc) {
			    				  doc.styles.tableHeader.fontSize = 6;
			    				  doc.defaultStyle.fontSize = 5;
			    				  doc.defaultStyle.alignment = 'left';
			    			      }
			    		  }
			    	  ]
		  }],
		  "aaData": patValidationReqnList,
		  "columns": [
	    	  /*requisitionNo requisitionDNo testCode
				groupCode testName groupName accessionNo
				tempSampleNo isMachineBasedTest testParameterName
				finalRemarkReqd finalRemarkString reportChangeFlag
				isRepeat patAge patGender machineCode
	    	  */
	    	  { "data": 'sno' },
	    	  { "data": 'reqnCheckBox' },
	    	  { "data": 'patUnitName' },
	    	  { "data": 'testNameOrGroupName' },
	    	  { "data": 'patLabName' },
	    	  { "data": 'tempSampleOrAccessionNo' },
	    	  { "data": 'sendToMachineCheckBox' },
	    	  { "data": 'view' },
	    	  { "data": 'compareBtn' },
	    	  { "data": null, 'defaultContent': 'extraTd'}
	    	],
	    	"order": [[ 0, "asc" ]],
	    	"columnDefs":
	    		[ { "orderable": false, "targets": 0 },
	    		  { "orderable": false, "targets": 1 },
				  { "targets": 1,
					"render": function ( data, type, row )
								{ return rowCheckBox(data, type, row); },
				  },
				  { "targets": 2,
					"render": function ( data, type, row )
								{ return customDepartment(data, type, row); },
				  },
				  { "targets": 6,
    				"createdCell": function (td, cellData, rowData, rowIndex, collIndex)
                       			{ $(td).attr('data-search', rowData.machineCode); },//$(td).css('color', 'red');
				  },
				  { "targets": 6,
  					"render": function ( data, type, row )
								{ return sendToMachineCheckBox(data, type, row); },
				  },
				  { "targets": 7,
					 "render": function ( data, type, row )
								{ return setVewTemplateVal(data, type, row); },
				  },
				  { "targets": 8,
					 "render": function ( data, type, row )
								{ return setInTrackingCompareBtnVal(data, type, row); },
				  },
				],
			"drawCallback": function(settings) {
	    	  var api = this.api();
	    	  var rows = api.rows({
	    		  page: 'current'
	    	  }).nodes();
	    	  var last = null;
	    	  //set events active on every table draw event
	    	  setEventListenersAfterReqnListTableDrawn();
			},
	      	responsive: {
		    	details: {
		    		renderer: function(api, rowIdx, columns) {
		    			var data = $.map(columns, function(col, i) {
		    				return col.hidden ? customeRowType1(col) : '';
		    				}).join('');
		    			  return data ? customeRowDataAppend(api, rowIdx, columns, data) : customeRowDataAppend(api, rowIdx, columns, data);
		    		  }
		    	}
	      	},
	      	"initComplete": function(settings, json) {
				  showLoding(false);
				  $('#container2ExpandBtn').click();
				  //$("#container1Row1").collapse('hide');
			 }
  });

  table.on( 'responsive-display', function ( e, datatable, row, showHide, update ) {
    setEventListenersAfterReqnListTableDrawn();
    //console.log( 'Details for row '+row.index()+' '+(showHide ? 'shown' : 'hidden') );
    
    if(showHide){
  	  var testParamTableID= "#testParamTable"+row.index();
  	  //console.log(testParamTableID);
  	  $(testParamTableID).DataTable().columns.adjust().responsive.recalc();
    }
    
  });
	  //Set Tab Notification Badge
	  //$('.patientTestBadgeCount').text(table.rows().count());

	  // Handle click on "Epand All" button
	  $('table .expandButton').on('click', function() {
	    expandColapseRow(true, table);
	  });

	  // Handle click on "Collapse All" button
	  $('table .collapseButton').on('click', function() {
	    expandColapseRow(false, table);
	  });

	  $("#selectAllDtCheck2").off().on( "change", function(e) {
		    if ($(this).is( ":checked" )) {
		    	sellectAllDtCheck(true, table);
		    } else {
		    	sellectAllDtCheck(false, table);
		    }
		    
		    if($(".rowCheckBoxes:checked").length){
				 saveBtnsAnimations(true, false);
			} else {
				saveBtnsAnimations(false, false);
			}
		});
	  globalDatablesObject.dataTableValidationReqnList = table;
	}



/*------------------------------------------DataTables Initialization Ends------------------------------------------------------------------------------------*/


/*------------------------------------------DataTables Custom Rows Creation Starts----------------------------------------------------------------------------*/
/*var rowSerialNoCount=0;
function rowSerialNo(data, type, row){
	return ++rowSerialNoCount;
}
*/

function customAddressData(data, type, row){
	var addressData='<span class="text-wrap" style="width:250px;" }">'+data+'</span>';
	return addressData;
}


var rowChkCount=0;
function rowCheckBox(data, type, row){
	//console.log(row.reqnTestParamJson);
	rowChkCount++;
	var rowChkVal= {"crNo":row.crNo, "requisitionNo":row.requisitionNo, "requisitionDNo":row.requisitionDNo,
	   										"testCode":row.testCode, "groupCode":row.groupCode };

	var rowChkData='<div class="custom-control custom-checkbox ">';
			rowChkData+='<input type="checkbox" class="custom-control-input rowCheckBoxes" value='+JSON.stringify(rowChkVal)+' id="rowCheck'+rowChkCount+'">';
			rowChkData+='<label class="custom-control-label" for="rowCheck'+rowChkCount+'"></label>';
			rowChkData+='</div>';
	return rowChkData;
}


var sndToMachineChkCount=0;
function sendToMachineCheckBox(data, type, row){

	var isMachineBasedTest = row.isMachineBasedTest;
	var sndToMachineChkVal= {"crNo":row.crNo, "requisitionNo":row.requisitionNo, "requisitionDNo":row.requisitionDNo,
	   											"testCode":row.testCode, "groupCode":row.groupCode, "tempSampleNo":row.tempSampleNo, "machineCode":row.machineCode };
	var sndToMachineChkData = '';
	if(isMachineBasedTest=="1") {
		sndToMachineChkCount++;
		sndToMachineChkData='<div class="custom-control custom-checkbox ">';
		sndToMachineChkData+='<input type="checkbox" class="custom-control-input machineCheckBoxes" value='+JSON.stringify(sndToMachineChkVal)+' id="machineCheck'+sndToMachineChkCount+'">';
		sndToMachineChkData+='<label class="custom-control-label" for="machineCheck'+sndToMachineChkCount+'">'+row.machineCode+'</label>';
		sndToMachineChkData+='</div>';
	 } else {
	 	sndToMachineChkData = '--';
	 }
	return sndToMachineChkData;
}

function setVewTemplateVal(data, type, row){

	var viewTemplateVal = {"crNo":row.crNo, "requisitionNo":row.requisitionNo, "requisitionDNo":row.requisitionDNo,
	   										"testCode":row.testCode, "groupCode":row.groupCode };
	var viewTemplateData = '<a href="#" class=" text-decoration-none viewTemplBtn" key='+JSON.stringify(viewTemplateVal)+'>';
	viewTemplateData += '<span class=""><img height="25" width="25" src="media/images/report2.svg"></span></a>';
	return viewTemplateData;
}

function setInTrackingCompareBtnVal(data, type, row){

	var inTrackingCompareBtnVal = {"crNo":row.crNo, "requisitionNo":row.requisitionNo, "requisitionDNo":row.requisitionDNo,
	   										"testCode":row.testCode, "groupCode":row.groupCode };
	var inTrackingCompareBtnData = '<a class="text-decoration-none compareBtn" key='+JSON.stringify(inTrackingCompareBtnVal)+'>';
	    inTrackingCompareBtnData += '<span class=""><img height="25" width="25" src="media/images/compare.svg"></span></a>';
	return inTrackingCompareBtnData;
}

function customDepartment(data, type, row){
	var departName='<span class="text-wrap">'+data+'</span>';
	return departName;
}
/*--Functions For Returning custom Cell with css color class Ends-----------------*/

/*--Functions For Returning custom Table Rows According To Screen Size Type1 patientDetails Starts---*/


var crcount = 0;
var crcount2 = 0;

function customeRowType1(col) {
	var tbdat = '';
	if(col.data!="extraTd"){
		  var w = window.innerWidth;
		  var h = window.innerHeight;
		  if (w >= 1100) {
		    tbdat = customeRowType11(col, 5);
		  } else if (w < 1100 && w > 880) {
		    tbdat = customeRowType11(col, 3);
		  } else if (w < 880 && w > 600) {
		    tbdat = customeRowType11(col, 2);
		  } else if (w <= 600) {
		    tbdat = customeRowType11(col, 1);
		  }
	}
	 return tbdat;
}

function customeRowType11(col, noOfThPairInOneRow) {
	  var tbdat = '';
		if (crcount2 >= noOfThPairInOneRow) {
	    tbdat = '</tr>'; crcount2 = 0; crcount = 0;
	  }
		if (crcount == 0) {
	    tbdat = '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">';
	    crcount++;
	  }
	  tbdat += '<th>' + col.title + ':' + '</th> ' +
	    			 '<td>' + col.data + '</td>';
	  crcount2++;
	  return tbdat;
	}
/*--Functions For Returning custom Table Rows According To Screen Size Type1 patientDetails Ends-----*/



function customeRowDataAppend(api, rowIdx, columns, data) {
	
  crcount = 0;
  crcount2 = 0;
  //data+='</tr>';
  var rowChildRow = $('<table></table>').append(data);
  
  var testParamTbl=customRowTestParameter(api, rowIdx, columns);
 
  rowChildRow = $(rowChildRow).add($(testParamTbl));
  
	if(data==""){
		return testParamTbl;
	}
	return rowChildRow;
}

function customRowTestParameter(api, rowIdx, columns){
	
	var testPramTableHead='<thead><tr><th>Test Param Name</th><th>Test Param Value</th><th>Reference Range</th></tr></thead>';
	testPramTableHead+='<tbody></tbody>';
	
	var testParamTable = document.createElement("table");
	$(testParamTable).addClass("table table-bordered dt-responsive table-sm rounded-lg shadow-lg testParamTables");
	$(testParamTable).attr({"id":"testParamTable"+rowIdx});
	$(testParamTable).css({"width":"100%"});  //,"background":"#89D0FF"
	$(testParamTable).append(testPramTableHead);

var testParamDataTable = $(testParamTable).DataTable({
	    "dom": "t",
	    responsive: true,
	    "ordering": false,
	    lengthChange: false,
	    "language": { "emptyTable": "No Data Is Available " },
	    "aaData": globalValidationReqnList[rowIdx].reqnTestParamJson,
	    "columns": [
	    	  { "data": 'paraName' },
	    	  { "data": 'paraValue' },
	    	  { "data": 'refRange' },
	    	  ]
	  }); 
	
	return testParamTable;
}

$(document).ready(function (){
	$('#saveValidateBtn').off().on("click", function (){
		validateReqnResult();
	});
	$('#modifyBtn').off().on("click", function (){
		modifyReqnResult();
	});
});


function validateReqnResult() {
	if($( ".rowCheckBoxes:checked" ).length){
		setGlobalSelectedReqnData();
		AjaxValidateReqnResult(globalSelectedReqnData);
	}
}


function modifyReqnResult() {	
	if($( ".rowCheckBoxes:checked" ).length){
		setGlobalSelectedReqnData();
		openModifyResultIFrame(globalSelectedReqnData);
	}
}

var globalSelectedReqnData= {selectedReqnDataJson:[], selectedReqnElement:[], concatSelectedReqnData:"", chkSendToMachineJson:[], concatChkSendToMachine:""};

function setGlobalSelectedReqnData(){
	globalSelectedReqnData.concatSelectedReqnData= "";
	globalSelectedReqnData.selectedReqnDataJson.length=0;
	
	globalSelectedReqnData.concatChkSendToMachine= "";
	globalSelectedReqnData.chkSendToMachineJson.length=0;
	
	/*--------------------------------------------------*/
	var concatSelectedReqnData=""; 
	var rcbs = $( ".rowCheckBoxes:checked" );
	for(var i=0; i < rcbs.length; i++) {	
    	var rowChkBoxKeyJson=jQuery.parseJSON($(rcbs[i]).val());
    	globalSelectedReqnData.selectedReqnDataJson.push(rowChkBoxKeyJson);
    	globalSelectedReqnData.selectedReqnElement.push((rcbs[i]));
    	
    	concatSelectedReqnData += rowChkBoxKeyJson.crNo+"#"+rowChkBoxKeyJson.requisitionNo+"#"+rowChkBoxKeyJson.requisitionDNo+"#"+rowChkBoxKeyJson.groupCode;
    	concatSelectedReqnData   +='@';
      }
	
	globalSelectedReqnData.concatSelectedReqnData=concatSelectedReqnData;
	
	/*--------------------------------------------------*/
	var concatChkSendToMachine="";
	var mcbs = $( ".machineCheckBoxes:checked" );
	for(var i=0; i < mcbs.length; i++) {	
    	var mchnChkBoxKeyJson=jQuery.parseJSON($(mcbs[i]).val());
    	globalSelectedReqnData.chkSendToMachineJson.push(mchnChkBoxKeyJson);
    	
    	concatChkSendToMachine += mchnChkBoxKeyJson.crNo+"#"+mchnChkBoxKeyJson.requisitionNo+"#"+mchnChkBoxKeyJson.requisitionDNo+"#"+mchnChkBoxKeyJson.groupCode;
    	concatChkSendToMachine   +='@';
      }
	
	globalSelectedReqnData.concatChkSendToMachine=concatChkSendToMachine;
	
}



function removeDatatableRowsOnSave() {
var savedReqnElmList = globalSelectedReqnData.selectedReqnElement;
var selectedReqnDataTable = null;
if(savedReqnElmList.length){
	selectedReqnDataTable = $(savedReqnElmList[0].closest(".dataTable")).DataTable();
}

for(var i=0; i < savedReqnElmList.length; i++) {
	  $(savedReqnElmList[i]).closest("tr").addClass("animation-target");
	  //globalDatablesObject.dataTableValidationReqnList.row( $(".animation-target") ).remove();
	  //globalDatablesObject.dataTableValidationReqnList.column(0).nodes()
	  selectedReqnDataTable.row( $(".animation-target") ).remove();
	  selectedReqnDataTable.column(0).nodes()
	  .each( function (cell, k) { cell.innerHTML = k+1; });
	
	  setTimeout(function() {
		  $(".animation-target").remove();
		  //globalDatablesObject.dataTableValidationReqnList.draw();
		  selectedReqnDataTable.draw();
	  }, 1500);
}

tableId="."+$(savedReqnElmList[0].closest(".dataTable")).attr("id")+"Caption";
$(tableId).html('<span class="py-2 px-4 rounded validatedGradient">Test Result Validated</span>');
globalSelectedReqnData.selectedReqnElement.length=0;
}


//addEventListener support for IE8
function bindEvent(eventName, eventHandler) {
    if (window.document.addEventListener){
    	window.document.addEventListener(eventName, eventHandler, false);
    } else if (window.document.attachEvent) {
    	window.document.attachEvent('on' + eventName, eventHandler);
    }
}

//Listen to message from child window
bindEvent('validatedResponse', function (e) {
	$("[name=jsonResponse]").val(JSON.stringify(e.detail));
});




function actionOnFancyClose(){
	var jsonResponse = jQuery.parseJSON($("[name=jsonResponse]").val());
	if(jsonResponse != null && jsonResponse.isValidationResponse=="1") {
		
		if(jsonResponse.isValidationResponse=="1" && jsonResponse.isValidated=="1"){
			removeDatatableRowsOnSave();
			showToastifyMsg("Test Result Validated", true,  4000);
		} else if (jsonResponse.isValidationResponse=="1" && jsonResponse.isValidated=="0"){
			showToastifyMsg("Test Result Validation Failed", false, 4000);
		}
		$("[name=jsonResponse]").val('{"isValidated":"0","isValidationResponse":"0","errorMsg":" "}');
	}
}


function showToastifyMsg(msgText, successFlag, timeOut){
	
	if(successFlag){
		Toastify({
			  text: msgText,
			  duration: timeOut,
			  destination: "",
			  newWindow: true,
			  close: true,
			  gravity: "bottom", // `top` or `bottom`
			  position: 'right', // `left`, `center` or `right`
			  backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
			  className: "info",
			  stopOnFocus: true, // Prevents dismissing of toast on hover
			  onClick: function(){} // Callback after click
			}).showToast();
	} else {
		Toastify({
			  text: msgText,
			  duration: timeOut,
			  destination: "",
			  newWindow: true,
			  close: true,
			  gravity: "bottom", // `top` or `bottom`
			  position: 'right', // `left`, `center` or `right`
			  backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
			  className: "info",
			  stopOnFocus: true, // Prevents dismissing of toast on hover
			  onClick: function(){} // Callback after click
			}).showToast();
	}
	
}
/*--Functions For Returning custom Table Rows According To Screen Size Type1,2 Ends-----------------*/


/*--------------------------------------------DataTables Custom Rows Creation Ends----------------------------------------------------------------------------*/

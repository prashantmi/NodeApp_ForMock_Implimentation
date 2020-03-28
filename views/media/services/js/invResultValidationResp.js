/*------------------------------------------Set Automaticly---------------------------------------------------------------------------------------------------*/

/*-Set Date time picker on from , to date-*/

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



/*------------------------------------------Set Automaticly---------------------------------------------------------------------------------------------------*/

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
        showLoading(false);
    }
    /*search made on Cr. no.*/
    else if (inputTypeBCSL == "2") {
    	$('#billNoInput').removeClass("d-none");
        $('#crNoInput').addClass("d-none");
        $('#sampleNoInput').addClass("d-none");
        $('#labNoInput').addClass("d-none");
        $('#inputFilterTypeHelp').html("Search Based On Bill No.");
        showLoading(false);
    }
    /*search made on sample. no.*/
    else if (inputTypeBCSL == "3") {
      $('#billNoInput').addClass("d-none");
      $('#crNoInput').addClass("d-none");
      $('#sampleNoInput').removeClass("d-none");
      $('#labNoInput').addClass("d-none");
      $('#inputFilterTypeHelp').html("Search Based On Sample No.");
      showLoading(false);
    }
    /*search made on sample. no.*/
    else if (inputTypeBCSL == "4") {
      $('#billNoInput').addClass("d-none");
      $('#crNoInput').addClass("d-none");
      $('#sampleNoInput').addClass("d-none");
      $('#labNoInput').removeClass("d-none");
      $('#inputFilterTypeHelp').html("Search Based On Lab No.");
      showLoading(false);
    }
  });
});

/*------------------------------------------Event Actions starts----------------------------------------------------------------------------------------------*/

/*----------On Button Click Show From to Months for archival search Starts--------------------*/
$(document).ready(function() {
  $('#btnDataFromArchival1').click(function (){
	  $(".dateTypeSelectDiv").removeClass("d-none");
      $('.inputDates').removeClass("d-none");
  });
  $('#btnDataFromArchival2').click(function (){
	  $(".dateTypeSelectDiv").addClass("d-none");
      $('.inputDates').addClass("d-none");
  });
});

/*----------On Click Getdata Button starts----------------------------------------------------*/
$(document).ready(function() {

	$('#getData').click(function() {

		showLoading(true);
		saveBtnsAnimations(false, false);
		var searchType = $('#inputFilterType').val();

		var dateFiltersOrBoth=$(".dateFiltersOrBothRange").val();
		
		setglobalSearchParam();

		var flagGoodToGo = false;

		if(dateFiltersOrBoth=="1" || dateFiltersOrBoth=="2"){
			/*1 for cr.no.*/
			if (searchType == 1) {

				var crNo = $('#crNoInput').val();
				if (crNo.length == 15) {
					flagGoodToGo = true;
				} else {
					alert("Cr. No. Should Be Of 15 Digits");
					$('#crNoInput').focus();
					flagGoodToGo = false;
					showLoading(false);
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
					showLoading(false);
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
					showLoading(false);
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
					showLoading(false);
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


$(document).ready(function () {
	$( ".dateFiltersOrBothRange" ).off().on("click", function(){
		if($(this).val()=="0") {
			$("#inputFilterType").attr({"disabled":true}); 
			$("#crNoInput").attr({"disabled":true});
			tippyLoadingUtlInstance.inputFilterType.enable();
			//$("#billNoInput").attr({"disabled":true});
			//$("#sampleNoInput").attr({"disabled":true});
			//$("#labNoInput").attr({"disabled":true});
			$("#inputFilterTypeHelp").html("Disabled");
			
			$(".dateTypeSelectDiv").removeClass("d-none");
			$(".inputDates").removeClass("d-none");
			
			$(".divArchivalmsgCol").addClass("d-none");

		} else if ($(this).val()=="1") {
			
			$(".dateTypeSelectDiv").removeClass("d-none");
			$(".inputDates").removeClass("d-none");
			
			$("#inputFilterType").attr({"disabled":false});
			$("#crNoInput").attr({"disabled":false});
			tippyLoadingUtlInstance.inputFilterType.disable();
			//$("#billNoInput").attr({"disabled":false});
			//$("#sampleNoInput").attr({"disabled":false});
			//$("#labNoInput").attr({"disabled":false});

			var inputTypeBCSL =  $('#inputFilterType').val();;

			if (inputTypeBCSL == "1") {
				$("#inputFilterTypeHelp").html("Search Based On Cr No.");
			} else if (inputTypeBCSL == "2") {
				$("#inputFilterTypeHelp").html("Search Based On Bill No.");
			} else if (inputTypeBCSL == "3") {
				$("#inputFilterTypeHelp").html("Search Based On Sample No.");
			} else if (inputTypeBCSL == "4") {
				$("#inputFilterTypeHelp").html("Search Based On Lab No.");
			}
			
			$(".divArchivalmsgCol").addClass("d-none");

		} else if ($(this).val()=="2") {
			
			$("#inputFilterType").attr({"disabled":false});
			$("#crNoInput").attr({"disabled":false});
			tippyLoadingUtlInstance.inputFilterType.disable();
			//$("#billNoInput").attr({"disabled":false});
			//$("#sampleNoInput").attr({"disabled":false});
			//$("#labNoInput").attr({"disabled":false});

			var inputTypeBCSL =  $('#inputFilterType').val();;

			if (inputTypeBCSL == "1") {
				$("#inputFilterTypeHelp").html("Search Based On Cr No.");
			} else if (inputTypeBCSL == "2") {
				$("#inputFilterTypeHelp").html("Search Based On Bill No.");
			} else if (inputTypeBCSL == "3") {
				$("#inputFilterTypeHelp").html("Search Based On Sample No.");
			} else if (inputTypeBCSL == "4") {
				$("#inputFilterTypeHelp").html("Search Based On Lab No.");
			}
			
			$(".dateTypeSelectDiv").addClass("d-none");
			$(".inputDates").addClass("d-none");
			
			$(".divArchivalmsgCol").removeClass("d-none");			
		}
		
	});
});


/*----------Function to Set Events Listeners After Requisition List Table Fetched Starts--------*/

function setEventListenersAfterReqnListTableDrawn(datatableTable, groupOrderOnColumn){
	
	if($('.invTrackingByCrNoBtn').length){
		$('.invTrackingByCrNoBtn').off().on("click", function (){
			var invTrackingByCrNoBtnVal = jQuery.parseJSON( $(this).attr("key") );
			openInvTrackingByCrNoIFrame(invTrackingByCrNoBtnVal);
		});
		
		//if(tippyLoadingUtlInstance.invTrackingByCrNoBtn){ tippyLoadingUtlInstance.invTrackingByCrNoBtn.destroy(); }
		if(tippyLoadingUtlInstance.invTrackingByCrNoBtn){ } else {
		const tippy_invTrackingByCrNoBtn=tippy('.invTrackingByCrNoBtn',{
			delay: 100,
			arrow: true,
			arrowType: 'round',
			size: 'small',
			duration: 300,
			animation: 'shift-away-extreme',
			placement: 'top',
			allowHTML: true,
			content: '<span>Open<span style="color: aqua;"> Investigation Tracking </span></span>',
		});
		
		tippyLoadingUtlInstance.invTrackingByCrNoBtn=tippy_invTrackingByCrNoBtn[0];
		}
	}
	
	
	if($('.viewTemplBtn').length){
		$('.viewTemplBtn').off().on("click", function (){
			var viewTemplBtnVal = jQuery.parseJSON( $(this).attr("key") );
			openTemplateIFrame(viewTemplBtnVal);
		});
		
		if(tippyLoadingUtlInstance.viewTemplBtn){ tippyLoadingUtlInstance.viewTemplBtn.destroy(); }
		const tippy_viewTemplBtn=tippy('.viewTemplBtn',{
			delay: 100,
			arrow: true,
			arrowType: 'round',
			size: 'small',
			duration: 300,
			animation: 'shift-away-extreme',
			placement: 'top',
			allowHTML: true,
			content: '<span>View<span style="color: aqua;"> Template </span></span>',
		});

		tippyLoadingUtlInstance.viewTemplBtn=tippy_viewTemplBtn[0];
	}

	if($('.invTrackingTestCompareBtn').length){
		$('.invTrackingTestCompareBtn').off().on("click", function (){
			var invTrackingTestCompareBtnVal = jQuery.parseJSON( $(this).attr("key") );
			openInvTrackingTestCompareIFrame(invTrackingTestCompareBtnVal);
		});
		
		//if(tippyLoadingUtlInstance.invTrackingTestCompareBtn){ tippyLoadingUtlInstance.invTrackingTestCompareBtn.destroy(); }
		if(tippyLoadingUtlInstance.invTrackingTestCompareBtn){ } else {
		const tippy_invTrackingTestCompareBtn=tippy('.invTrackingTestCompareBtn',{
			delay: 100,
			arrow: true,
			arrowType: 'round',
			size: 'small',
			duration: 300,
			animation: 'shift-away-extreme',
			placement: 'top',
			allowHTML: true,
			content: '<span><span style="color: aqua;"> Repeated Test </span>compare with previous  <span style="color: aqua;">Parameters</span></span>',
		});

		tippyLoadingUtlInstance.invTrackingTestCompareBtn=tippy_invTrackingTestCompareBtn[0];
		}
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
	
	
	//Order by the grouping
	if($('button.rowGroupReqnDateSort').length){
		$('button.rowGroupReqnDateSort').on('click', function() {
			if(datatableTable) {
				var currentOrder = datatableTable.order()[0];
				if(currentOrder=="undefined" || currentOrder==undefined) {
					datatableTable.order([groupOrderOnColumn, 'desc']).draw();
					$(".reqnDtGrupSortUp").removeClass("d-none");
					$(".reqnDtGrupSortDown").addClass("d-none");
				}else{
					if (currentOrder[0] === groupOrderOnColumn && currentOrder[1] === 'asc') {
						datatableTable.order([groupOrderOnColumn, 'desc']).draw();
						$(".reqnDtGrupSortDown").removeClass("d-none");
						$(".reqnDtGrupSortUp").addClass("d-none");
					} else {
						datatableTable.order([groupOrderOnColumn, 'asc']).draw();
						$(".reqnDtGrupSortUp").removeClass("d-none");
						$(".reqnDtGrupSortDown").addClass("d-none");
					}
				}
			}
		});
	}
	
	
	
	if($('.showAdvisedNotes').length){
		$('.showAdvisedNotes').off().on("click", function (){

			var reqnAdvisedNotes = JSON.parse($(this).attr("key"));
			
			$(".instrucGenTr td").empty().append(reqnAdvisedNotes.instructionGeneric);
			$(".instrucFlgTr td").empty().append(reqnAdvisedNotes.instructionFlag);
			$(".chfComplntTr td").empty().append(reqnAdvisedNotes.chiefComplaintsName);
			$(".diagnosisTr td").empty().append(reqnAdvisedNotes.diagnosisName);
			$(".notesTr td").empty().append(reqnAdvisedNotes.advisedNote);
			$(".advisedByTr td").empty().append(reqnAdvisedNotes.advisedByDocName);
			
			$.fancybox.destroy();
			$(".fancyBoxAdvisedNotes").click();
		});
		
		//if(tippyLoadingUtlInstance.showAdvisedNotes){ tippyLoadingUtlInstance.showAdvisedNotes.destroy(); }
		if(tippyLoadingUtlInstance.showAdvisedNotes){ } else {
		const tippy_showAdvisedNotes=tippy('.showAdvisedNotes',{
			delay: 100,
			arrow: true,
			arrowType: 'round',
			size: 'small',
			duration: 300,
			animation: 'shift-away-extreme',
			placement: 'top',
			allowHTML: true,
			content: '<span>Advised<span style="color: aqua;"> Notes </span></span>',
		});
		
		tippyLoadingUtlInstance.showAdvisedNotes=tippy_showAdvisedNotes[0];
		}
	}
	


}

function saveBtnsAnimations(enableFlag, animateFlag){
	if(enableFlag==true && animateFlag==false){
		$('#saveValidateBtn').attr({"disabled":false});
		$('#modifyBtn').attr({"disabled":false});
		
		$('.saveValidateBtnSpan').removeClass("d-none");
		$('.validatingBtnSpan').addClass("d-none");
		
		tippyLoadingUtlInstance.saveValBtnDiv.setContent('Click to Validate Selected Requisition');
		tippyLoadingUtlInstance.modifyValBtnDiv.setContent('Click to Modify Selected Requisition');
		
		enableRowCheckBoxes(true);

	}else if (enableFlag==false && animateFlag==false){
		$('#saveValidateBtn').attr({"disabled":true});
		$('#modifyBtn').attr({"disabled":true});
		
		$('.saveValidateBtnSpan').removeClass("d-none");
		$('.validatingBtnSpan').addClass("d-none");
		
		tippyLoadingUtlInstance.saveValBtnDiv.setContent('Please select atleast one Requisition to Validate');
		tippyLoadingUtlInstance.modifyValBtnDiv.setContent('Please select atleast one Requisition to Modify');
		
		enableRowCheckBoxes(true);
		
	}else if (enableFlag==false && animateFlag==true){
		$('#saveValidateBtn').attr({"disabled":true});
		$('#modifyBtn').attr({"disabled":true});
		
		$('.saveValidateBtnSpan').addClass("d-none");
		$('.validatingBtnSpan').removeClass("d-none");
		
		tippyLoadingUtlInstance.saveValBtnDiv.setContent('Please wait while current Requisition is Validated');
		tippyLoadingUtlInstance.modifyValBtnDiv.setContent('Please wait while current Requisition is Validated');
		
		enableRowCheckBoxes(false);
	}
}


function enableRowCheckBoxes(enableRowChkBxFlag){
	if(enableRowChkBxFlag==true){
		if($('.rowCheckBoxes').length){$('.rowCheckBoxes').attr({"disabled":false});}
		if($('.selectAllDtCheck1').length){$('.rowCheckBoxes').attr({"disabled":false});}
		if($('.selectAllDtCheck2').length){$('.rowCheckBoxes').attr({"disabled":false});}
	} else {
		if($('.rowCheckBoxes').length){$('.rowCheckBoxes').attr({"disabled":true});}
		if($('.selectAllDtCheck1').length){$('.rowCheckBoxes').attr({"disabled":true});}
		if($('.selectAllDtCheck2').length){$('.rowCheckBoxes').attr({"disabled":true});}
	}
}

/*----------Function to Set Events Listeners After Requistion List Table Fetched Starts--------*/
var globalSearchParam={collAreaCode:"", labCode:"", validationStatusCode:"", dateFiltersOrBoth:"", dateTypeCode:"",
		searchType:"", fromDate:"", toDate:"", crNo:"", billNo:"", sampleNo:"", labNo:"" };

function setglobalSearchParam(){
	globalSearchParam.collAreaCode = $('#collAreaSelectInput').val();
	globalSearchParam.labCode = $('#labSelectInput').val();
	globalSearchParam.validationStatusCode = $('#valStatusSelectInput').val();	
	globalSearchParam.dateFiltersOrBoth = $('.dateFiltersOrBothRange').val();
	globalSearchParam.dateTypeCode = $('#dateTypeSelectInput').val();
	globalSearchParam.searchType = $('#inputFilterType').val();
	globalSearchParam.fromDate = $('.fromDateInput').val();
	globalSearchParam.toDate = $('.toDateInput').val();
	globalSearchParam.crNo = $('#crNoInput').val();

	console.log(globalSearchParam);

}

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

	var tippy_dateFiltersOrBothRange=tippy('.custom-range-container', {
		delay: 100,
		arrow: true,
		arrowType: 'round',
		size: 'small',
		duration: 300,
		animation: 'shift-away-extreme',
		placement: 'top',
		allowHTML: true,
		content: 'Search Criteria <span style="color: aqua;"> Date| Both| CR.NO.</span>',
	});

	var tippy_inputFilterType=tippy('.input-group_inputFilterType',{
		delay: 100,
		arrow: true,
		arrowType: 'round',
		size: 'small',
		duration: 300,
		animation: 'shift-away-extreme',
		placement: 'top',
		allowHTML: true,
		content: '<span>Drop slider on the left to enable<span style="color: aqua;"> Cr. No Filter </span></span>',
	});

	tippy_labSelectInputGroup[0].disable();

	tippyLoadingUtlInstance.labSelectInputGroup=tippy_labSelectInputGroup[0];
	tippyLoadingUtlInstance.saveValBtnDiv=tippy_saveValBtn[0];
	tippyLoadingUtlInstance.modifyValBtnDiv=tippy_modifyValBtn[0];
	tippyLoadingUtlInstance.inputFilterType=tippy_inputFilterType[0];

	//tippyLoadingUtlInstance.tippy_labSelectInputGroup.enable();
	//tippyLoadingUtlInstance.tippy_getDataBtnDiv.enable();
	//tippyLoadingUtlInstance.tippy_labSelectInputGroup.show();
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
			showLoading(false);

			tippyLoadingUtlInstance.labSelectInputGroup.setContent('<strong>Select Any Collection <span style="color: aqua;">Area </span>To Enable This</strong>');
			tippyLoadingUtlInstance.labSelectInputGroup.enable();

			tippyLoadingUtlInstance.getDataBtnDiv.setContent('<strong>Select Any Collection <span style="color: aqua;">Area </span>To Enable This</strong>');
			tippyLoadingUtlInstance.getDataBtnDiv.enable();

		}else{
			$('#labSelectInput').removeAttr("disabled");
			$('#getData').removeAttr("disabled");
			showLoading(true);
			saveBtnsAnimations(false, false);

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
			showLoading(false);
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


function AjaxGetValidationReqnList(globalSearchParam){
	var collAreaCode=globalSearchParam.collAreaCode;
	var labCode = globalSearchParam.labCode;
	var validationStatusCode = globalSearchParam.validationStatusCode
	var dateFiltersOrBoth= globalSearchParam.dateFiltersOrBoth
	var dateTypeCode= globalSearchParam.dateTypeCode
	var fromDate= globalSearchParam.fromDate
	var toDate= globalSearchParam.toDate
	var crNo= globalSearchParam.crNo

	globalValidationReqnList = null;
	var _mode = "AjaxGetValidationReqnList";

	var url = "/HISInvestigationG5/new_investigation/invResultValidationResp.cnt?hmode=" + _mode + "&collAreaCode=" + collAreaCode + "&labCode="
	+ labCode + "&validationStatusCode=" + validationStatusCode + "&dateFiltersOrBoth=" + dateFiltersOrBoth + "&dateTypeCode=" + dateTypeCode + "&fromDate=" + fromDate
	+ "&toDate=" + toDate + "&crNo=" + crNo;

	globalAjaxObjectArr.AjaxGetValidationReqnList=$.getJSON(url, function(data) {
		if(!$.isEmptyObject(data)) {

			if(data.isSuccess=="1"){
				globalValidationReqnList = data.validationReqnList;

				if(globalSearchParam.dateFiltersOrBoth=="1" || globalSearchParam.dateFiltersOrBoth=="2" ){
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
		saveBtnsAnimations(false, false);
	})
	.fail(function( jqxhr, textStatus, error ) {
		console.log("%cAjaxValidateReqnResult Failed | ResponseError Is Below", "color:red;");
		var err = textStatus + ", " + error;
		console.log( "Request Failed: " + err );
		saveBtnsAnimations(true, false);
	});

}


function openInvTrackingByCrNoIFrame(invTrackingByCrNoBtnVal){
	var crNo=invTrackingByCrNoBtnVal.crNo;
	var requisitionNo=invTrackingByCrNoBtnVal.requisitionNo;
	var requisitionDNo=invTrackingByCrNoBtnVal.requisitionDNo;
	var testCode=invTrackingByCrNoBtnVal.testCode;
	var groupCode=invTrackingByCrNoBtnVal.groupCode;

	var _mode = "UrlExternalCall";
	var url="/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode="+_mode+"&crNo="+crNo+"&searchType=1";
	$.fancybox.destroy();
	$(".fancyBoxIFrame").attr({"href":url});
	$(".fancyBoxIFrame").click();

}

function openInvTrackingTestCompareIFrame(invTrackingTestCompareBtnVal){
	var crNo=invTrackingTestCompareBtnVal.crNo;
	var requisitionNo=invTrackingTestCompareBtnVal.requisitionNo;
	var requisitionDNo=invTrackingTestCompareBtnVal.requisitionDNo;
	var testCode=invTrackingTestCompareBtnVal.testCode;
	var groupCode=invTrackingTestCompareBtnVal.groupCode;

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
//				'width':$fancyboxWidth,
//				'height':$fancyboxHeight,
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


$(document).ready(function() {
	$(".fancyBoxAdvisedNotes").fancybox({
		src  : '.advisedNotesContainer',
	    type : 'inline',
		toolbar  : false,
		smallBtn : true,
		transitionEffect: "zoom-in-out",
		
		//transitionDuration: 366,
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
	showLoading(false);
}



var globalDatablesObject ={};
function dataTableValidationReqnList(validationReqnList) {
	var groupColumn = 3;
	var groupOrderOnColumn = 2;
	$('#DataTable11').DataTable().clear().destroy();

	$.fn.dataTable.moment('DD-MMM-YYYY');
	var table = $('#DataTable11').DataTable({
		"dom": '<"row"<"col-6 col-sm-5 col-lg-2 "l><"col-6 col-sm-2 col-lg-1"B><"col-6 col-sm-5 col-lg-3 "f><"col-6 col-sm-12 col-lg-6"p>>rt<"row"<"col-12"i>><"clear">',
		processing: true,
		"scrollY":        "450px",
		"scrollCollapse": true,
		"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
		"language": { "emptyTable": "No Data Is Available " },
		"select": {
			style:    'multi', /*multi+shift | single | api | os | multi*/
			selector: 'td:nth-child(4) .rowCheckBoxes',
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
					title: 'Investigation Result Validation',
					text: ' Download Excel',
					className: "fas fa-file-excel text-primary bg-white btn-outline-light",
					exportOptions: {
						columns: [1, 2, 5, 6, 7, 8, 9, 10, 11, 12 ]
					},
				},
				{ extend: 'pdfHtml5',
					className: "fas fa-file-pdf text-primary bg-white btn-outline-light",
					title: 'Investigation Result Validation',
					text: ' Download Pdf',
					pageMargins: [0, 0, 0, 0],
					margin: [0, 0, 0, 0],
					alignment: 'center',
					exportOptions: {
						columns: [1, 2, 5, 6, 7, 8, 9, 10, 11, 12 ]
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
			/*requisitionNo requisitionDate requisitionDNo testCode
			groupCode testName groupName accessionNo
			tempSampleNo isMachineBasedTest testParameterName
			finalRemarkReqd finalRemarkString reportChangeFlag
			isRepeatCount patAge patGender machineCode*/
			{ "className":'control details-control', "orderable":false, "data":null, "defaultContent":'' }, /*details-control*/
			{ "data": 'sno' },
			{ "data": 'requisitionDate' },
			{ "data": 'reqnDataForGrouping' },
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
			{ "data": 'reqnPriority' },
			
			{ "data": 'sampleCollDate' },
			{ "data": 'sampleAccepDate' },
			{ "data": 'patAccepDate' },
			{ "data": 'resultEntryDate' },

			{ "data": null, 'defaultContent': 'extraTd'}
			],
			"order": [[ 1, 'asc' ]],
			"columnDefs":
				[   { "targets": 0, "orderable": false, className: "control details-control"},
					{ "targets": groupColumn, "visible": false },
					{ "targets": 2, "visible": false },
					{ "targets": 4, "orderable": false},
					{ "targets": 4,
						"render": function ( data, type, row )
						{ return rowCheckBox(data, type, row); },
					},
					{ "targets": 5,
						"createdCell": function (td, cellData, rowData, rowIndex, collIndex)
						{ $(td).attr('data-search', rowData.crNo);
						  $(td).attr('data-order', rowData.crNo); },
						"render": function ( data, type, row )
						{ return setInvTrackingByCrNoBtnData(data, type, row); },
					},
					{ "targets": 8,
						"render": function ( data, type, row )
						{ return customDepartment(data, type, row); },
					},
					{ "targets": 9,
						"createdCell": function (td, cellData, rowData, rowIndex, collIndex)
						{ $(td).attr('data-search', rowData.testNameOrGroupName);
						  $(td).attr('data-order', rowData.testNameOrGroupName); },
						"render": function ( data, type, row )
						{ return setInvTrackingTestCompareBtnData(data, type, row); },
					},
					{ "targets": 13,
						"createdCell": function (td, cellData, rowData, rowIndex, collIndex)
						{ $(td).attr('data-search', rowData.machineCode); },//$(td).css('color', 'red');
					},
					{ "targets": 13,
						"render": function ( data, type, row )
						{ return sendToMachineCheckBox(data, type, row); },
					},
					{ "targets": 14,
						"render": function ( data, type, row )
						{ return setVewTemplateVal(data, type, row); },
					},
					{ "targets": 15, "visible": false },
					
					{ "targets": 16, "visible": false },
					{ "targets": 17, "visible": false },
					{ "targets": 18, "visible": false },
					{ "targets": 19, "visible": false },
					],
					"drawCallback": function(settings) {
						var api = this.api();
						var rows = api.rows({ page: 'current' }).nodes();
						var last = null;

						//Group rows On every table draw event
						api.column(groupColumn, { page: 'current' }).data().each(function(reqnDataForGroupn, i) {
							if (last !== reqnDataForGroupn.requisitionNo) {
								var priorityElmnt = "";
								if(reqnDataForGroupn.priorityCode=="4"){
									priorityElmnt='<span class="urgentGradient">Urgent</span>'
								}
								var keyStr=JSON.stringify(reqnDataForGroupn.reqnAdvisedNotes);
								
								var rowGroupElmnt = '<tr class="group"><td colspan="12" class="rowGroupReqnDate"><span>'+reqnDataForGroupn.filterDateTypeName+' : </span>' +  reqnDataForGroupn.filterDateTypeDate
								+'<button type="button" class="btn btn-light btn-circle btn-circle-reqnGroupRowSort ml-1 rowGroupReqnDateSort ">'
								+'<i class="fas fa-sort-amount-up reqnDtGrupSortUp" ></i>'
								+'<i class="fas fa-sort-amount-down-alt reqnDtGrupSortDown d-none" ></i>'
								+'</button>'
								+'<button type="button" class="btn btn-light btn-circle btn-circle-comment ml-auto ml-md-1  showAdvisedNotes " key='+keyStr+'>'
								+'<i class="far fa-comment-alt" style="color:#FD7E14;"></i>'
								+'</button>'
								+priorityElmnt
								+ '</td></tr>';
								
								$(rows).eq(i).before(rowGroupElmnt); last = reqnDataForGroupn.requisitionNo;
							}
							
							//not need of writing this cose in loope but no option for now
							if(reqnDataForGroupn.filterDateTypeCode=="1"){
								groupOrderOnColumn=2
							} else if (reqnDataForGroupn.filterDateTypeCode=="2") {
								groupOrderOnColumn=16
							} else if (reqnDataForGroupn.filterDateTypeCode=="3"){
								groupOrderOnColumn=18
							} else if (reqnDataForGroupn.filterDateTypeCode=="4") {
								groupOrderOnColumn=19
							}
							
						});

						//set events active on every table draw event
						setEventListenersAfterReqnListTableDrawn(table, groupOrderOnColumn);
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
									return col.hidden ? valiCustomDataOnScreenSize(col) : '';
								}).join('');
								return data ? valiCustomRowAppend(api, rowIdx, columns, data) : false;
							}
						}
					},
					"initComplete": function(settings, json) {
						
						$(".departNameFilter").removeClass("d-none");
						$(".groupTestFilter").removeClass("d-none");
						$(".labNameFilter").removeClass("d-none");
						$(".patStatusFilter").removeClass("d-none");
						$(".machineNameFilter").removeClass("d-none");
						$(".priorityFilter").removeClass("d-none");
						
						this.api().columns([8]).every( function () {
			                var column = this;
			                var departFltrCount=0;
			                //var select = $('<select class="form-control custom-select" ><option class="text-light bg-dark" value="" selected >Department Filter</option></select>').appendTo( $(column.footer()).empty() )
			                var select = $(".departNameFilter").empty().off().on( 'change', function () {
			                        //var val = $.fn.dataTable.util.escapeRegex( $(this).val() );
			                        //column.search( val ? '^'+val+'$' : '', true, false ).draw();
			                		var val = $(this).val();
			                        column.search(val).draw();
			                    } );
			                
			                select.append( '<option class="text-light bg-dark" value="" selected>Department Filter</option>' );
			                column.data().unique().sort().each( function ( d, j ) {
			                			select.append( '<option value="'+d+'">'+d+'</option>' ) 
			                			departFltrCount++;
			                		} );
			                if(departFltrCount<=1){
			                	$(".departNameFilter").addClass("d-none");
			                }
			            } );
						
						this.api().columns([9]).every( function () {
			                var column = this;
			                var groupTestFltrCount=0;
			                //var select = $('<select class="form-control custom-select" ><option class="text-light bg-dark" value="" selected >Test|Group Filter</option></select>').appendTo( $(column.footer()).empty() )
			                var select = $(".groupTestFilter").empty().off().on( 'change', function () {
			                        //var val = $.fn.dataTable.util.escapeRegex( $(this).val() );
			                        //column.search( val ? '^'+val+'$' : '', true, false ).draw();
			                		var val = $(this).val();
			                        column.search(val).draw();
			                    } );
			                
			                select.append( '<option class="text-light bg-dark" value="" selected>Test|Group Filter</option>' );
			                column.data().unique().sort().each( function ( d, j ) {
	                			select.append( '<option value="'+d+'">'+d+'</option>' ) 
	                			groupTestFltrCount++;
	                		} );
			                if(groupTestFltrCount<=1){
			                	$(".groupTestFilter").addClass("d-none");
			                }
			            } );
						
						this.api().columns([10]).every( function () {
			                var column = this;
			                var labNameFltrCount=0;
			                //var select = $('<select class="form-control custom-select" ><option class="text-light bg-dark" value="" selected >Lab Filter</option></select>').appendTo( $(column.footer()).empty() )
			                var select = $(".labNameFilter").empty().off().on( 'change', function () {
			                        //var val = $.fn.dataTable.util.escapeRegex( $(this).val() );
			                        //column.search( val ? '^'+val+'$' : '', true, false ).draw();
			                		var val = $(this).val();
			                        column.search(val).draw();
			                    } );
			                
			                select.append( '<option class="text-light bg-dark" value="" selected>Lab Filter</option>' );
			                column.data().unique().sort().each( function ( d, j ) {
	                			select.append( '<option value="'+d+'">'+d+'</option>' ) 
	                			labNameFltrCount++;
	                		} );
			                if(labNameFltrCount<=1){
			                	$(".labNameFilter").addClass("d-none");
			                }
			            } );
						
						this.api().columns([12]).every( function () {
			                var column = this;
			                var patStatusFltrCount=0;
			                //var select = $('<select class="form-control custom-select" ><option class="text-light bg-dark" value="" selected >Patient Status</option></select>').appendTo( $(column.footer()).empty() )
			                    var select = $(".patStatusFilter").empty().off().on( 'change', function () {
			                        //var val = $.fn.dataTable.util.escapeRegex( $(this).val() );
			                        //column.search( val ? '^'+val+'$' : '', true, false ).draw();
			                    	var val = $(this).val();
			                        column.search(val).draw();
			                    } );
			                    
			                    select.append( '<option class="text-light bg-dark" value="" selected>Patient Status</option>' );
			                    column.data().unique().sort().each( function ( d, j ) {
		                			select.append( '<option value="'+d+'">'+d+'</option>' ) 
		                			patStatusFltrCount++;
		                		} );
				                if(patStatusFltrCount<=1){
				                	$(".patStatusFilter").addClass("d-none");
				                }
				            } );
						
						this.api().columns([13]).every( function () {
			                var column = this;
			                var machineNameFltrCount=0;
			                //var select = $('<select class="form-control custom-select" ><option class="text-light bg-dark" value="" selected disabled>Machine</option></select>').appendTo( $(column.footer()).empty() )
			                var select = $(".machineNameFilter").empty().off().on( 'change', function () {
			                        //var val = $.fn.dataTable.util.escapeRegex( $(this).val() );
			                        //column.search( val ? '^'+val+'$' : '', true, false ).draw();
			                        var val = $(this).val();
			                        column.search(val).draw();
			                    } );
			                
			                select.append( '<option class="text-light bg-dark" value="" selected>Machine</option>' );
			                column.data().unique().sort().each( function ( d, j ) {
	                			select.append( '<option value="'+d+'">'+d+'</option>' ) 
	                			machineNameFltrCount++;
	                		} );
			                if(machineNameFltrCount<=1){
			                	$(".machineNameFilter").addClass("d-none");
			                }
			            } );
						
						
						this.api().columns([15]).every( function () {
			                var column = this;
			                var priorityFltrCount=0;
			                var select = $(".priorityFilter").empty().off().on( 'change', function () {
			                        //var val = $.fn.dataTable.util.escapeRegex( $(this).val() );
			                        //column.search( val ? '^'+val+'$' : '', true, false ).draw();
			                		var val = $(this).val();
			                        column.search(val).draw();
			                    } );
			                
			                select.append( '<option class="text-light bg-dark" value="" selected>Priority</option>' );
			                column.data().unique().sort().each( function ( d, j ) {
	                			select.append( '<option value="'+d+'">'+d+'</option>' ) 
	                			priorityFltrCount++;
	                		} );
			                if(priorityFltrCount<=1){
			                	$(".priorityFilter").addClass("d-none");
			                }
			            } );
						
						showLoading(false);
						$('#container2ExpandBtn').click();
						//$("#container1Row1").collapse('hide');
					}
	});

	table.on( 'responsive-display', function ( e, datatable, row, showHide, update ) {
		setEventListenersAfterReqnListTableDrawn(table, groupOrderOnColumn);
		//console.log( 'Details for row '+row.index()+' '+(showHide ? 'shown' : 'hidden') );

		if(showHide){
			var testParamTableID= "#testParamTable"+row.index();
			//console.log(testParamTableID);
			$(testParamTableID).DataTable().columns.adjust().responsive.recalc();
		}

	});
	//Set Tab Notification Badge
	//$('.patientTestBadgeCount').text(table.rows().count());

	
	//Add event listener for opening and closing details
   /* $('DataTable11 tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();

        	//  row.child().show();
            tr.addClass('shown');
        }
    } );*/
	setEventListenersAfterReqnListTableDrawn(table, groupOrderOnColumn);
    
	// Handle click on "Epand All" button
	$('table .expandButton').on('click', function() {
		expandColapseRow(true, table);
	});

	// Handle click on "Collapse All" button
	$('table .collapseButton').on('click', function() {
		expandColapseRow(false, table);
	});

	//Select all check box
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
	var groupColumn = 3;
	var groupOrderOnColumn = 2;
	$('#DataTable12').DataTable().clear().destroy();

	$.fn.dataTable.moment('DD-MMM-YYYY');
	var table = $('#DataTable12').DataTable({

		"dom": '<"row"<"col-6 col-sm-5 col-lg-2 "l><"col-6 col-sm-2 col-lg-1"B><"col-6 col-sm-5 col-lg-3 "f><"col-6 col-sm-12 col-lg-6"p>>rt<"row"<"col-12"i>><"clear">',
		processing: true,
		"scrollY":        "350px",
		"scrollCollapse": true,
		"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
		"language": { "emptyTable": "No Data Is Available " },
		"select": {
			style:    'multi', /*multi+shift | single | api | os | multi*/
			selector: 'td:nth-child(4) .rowCheckBoxes',
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
					title: 'Investigation Result Validation',
					text: ' Download Excel',
					className: "fas fa-file-excel text-primary bg-white btn-outline-light",
					exportOptions: {
						columns: [1, 2, 5, 6, 7, 8 ]
					},
				},
				{ extend: 'pdfHtml5',
					className: "fas fa-file-pdf text-primary bg-white btn-outline-light",
					title: 'Investigation Result Validation',
					text: ' Download Pdf',
					pageMargins: [0, 0, 0, 0],
					margin: [0, 0, 0, 0],
					alignment: 'center',
					exportOptions: {
						columns: [1, 2, 5, 6, 7, 8 ]
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
			/*requisitionNo requisitionDate requisitionDNo testCode
				groupCode testName groupName accessionNo
				tempSampleNo isMachineBasedTest testParameterName
				finalRemarkReqd finalRemarkString reportChangeFlag
				isRepeatCount patAge patGender machineCode
			 */
			{ "className":'control details-control', "orderable":false, "data":null, "defaultContent":'' }, /*details-control*/
			{ "data": 'sno' },
			{ "data": 'requisitionDate' },
			{ "data": 'reqnDataForGrouping' },
			{ "data": 'reqnCheckBox' },
			{ "data": 'patUnitName' },
			{ "data": 'testNameOrGroupName' },
			{ "data": 'patLabName' },
			{ "data": 'tempSampleOrAccessionNo' },
			{ "data": 'sendToMachineCheckBox' },
			{ "data": 'view' },
			
			{ "data": 'reqnPriority' },
			
			{ "data": 'sampleCollDate' },
			{ "data": 'sampleAccepDate' },
			{ "data": 'patAccepDate' },
			{ "data": 'resultEntryDate' },
			
			{ "data": null, 'defaultContent': 'extraTd'}
			],
			"order": [[ 1, 'asc' ]],
			"columnDefs":
				[ { "targets": 0, "orderable": false, className: "control details-control"},
				  { "targets": groupColumn, "visible": false },
				  { "targets": 2, "visible": false },
				  { "targets": 4, "orderable": false},
				  { "targets": 4,
					"render": function ( data, type, row )
						{ return rowCheckBox(data, type, row); },
				  },
				  { "targets": 5,
					"render": function ( data, type, row )
						{ return customDepartment(data, type, row); },
				  },
				  { "targets": 6,
					  "createdCell": function (td, cellData, rowData, rowIndex, collIndex)
						{ $(td).attr('data-search', rowData.testNameOrGroupName);
						  $(td).attr('data-order', rowData.testNameOrGroupName);
						},
						"render": function ( data, type, row )
						{ return setInvTrackingTestCompareBtnData(data, type, row); },
				  },
				  { "targets": 9,
					 "createdCell": function (td, cellData, rowData, rowIndex, collIndex)
					 	{ $(td).attr('data-search', rowData.machineCode); },//$(td).css('color', 'red');
				  },
				  { "targets": 9,
					"render": function ( data, type, row )
						{ return sendToMachineCheckBox(data, type, row); },
				  },
				  { "targets": 10,
					"render": function ( data, type, row )
						{ return setVewTemplateVal(data, type, row); },
				  },
				  { "targets": 11, "visible": false },
				  
				  { "targets": 12, "visible": false },
				  { "targets": 13, "visible": false },
				  { "targets": 14, "visible": false },
				  { "targets": 15, "visible": false },
				  
				],
				"drawCallback": function(settings) {
					var api = this.api();
					var rows = api.rows({ page: 'current' }).nodes();
					var last = null;

					//Group rows On every table draw event
					api.column(groupColumn, { page: 'current' }).data().each(function(reqnDataForGroupn, i) {
						if (last !== reqnDataForGroupn.requisitionNo) {
							var priorityElmnt = "";
							if(reqnDataForGroupn.priorityCode=="4"){
								priorityElmnt='<span class="urgentGradient ml-1">Urgent</span>'
							}
							var keyStr=JSON.stringify(reqnDataForGroupn.reqnAdvisedNotes);

							var rowGroupElmnt = '<tr class="group"><td colspan="12" class="rowGroupReqnDate"><span>'+reqnDataForGroupn.filterDateTypeName+' : </span>' +  reqnDataForGroupn.filterDateTypeDate
							+'<button type="button" class="btn btn-light btn-circle btn-circle-reqnGroupRowSort ml-1 rowGroupReqnDateSort ">'
							+'<i class="fas fa-sort-amount-up reqnDtGrupSortUp" ></i>'
							+'<i class="fas fa-sort-amount-down-alt reqnDtGrupSortDown d-none" ></i>'
							+'</button>'
							+'<button type="button" class="btn btn-light btn-circle btn-circle-comment ml-auto ml-md-1  showAdvisedNotes " key='+keyStr+'>'
							+'<i class="far fa-comment-alt" style="color:#FD7E14;"></i>'
							+'</button>'
							+priorityElmnt
							+ '</td></tr>';
							
							$(rows).eq(i).before(rowGroupElmnt); last = reqnDataForGroupn.requisitionNo;
						}
						
						//not need of writing this cose in loope but no option for now
						if(reqnDataForGroupn.filterDateTypeCode=="1"){
							groupOrderOnColumn=2
						} else if (reqnDataForGroupn.filterDateTypeCode=="2") {
							groupOrderOnColumn=12
						} else if (reqnDataForGroupn.filterDateTypeCode=="3"){
							groupOrderOnColumn=14
						} else if (reqnDataForGroupn.filterDateTypeCode=="4") {
							groupOrderOnColumn=15
						}
					});
					
					
					//set events active on every table draw event
					setEventListenersAfterReqnListTableDrawn(table, groupOrderOnColumn);
					},
					responsive: {
						details: {
							renderer: function(api, rowIdx, columns) {
								var data = $.map(columns, function(col, i) {
									return col.hidden ? valiCustomDataOnScreenSize(col) : '';
								}).join('');
								return data ? valiCustomRowAppend(api, rowIdx, columns, data) : valiCustomRowAppend(api, rowIdx, columns, data);
							}
						}
					},
					"initComplete": function(settings, json) {
						
						$(".departNameFilter").removeClass("d-none");
						$(".groupTestFilter").removeClass("d-none");
						$(".labNameFilter").removeClass("d-none");
						$(".patStatusFilter").addClass("d-none");
						$(".machineNameFilter").removeClass("d-none");
						$(".priorityFilter").removeClass("d-none");
						
						this.api().columns([5]).every( function () {
			                var column = this;
			                var departNameFltrCount=0;
			                //var select = $('<select class="form-control custom-select"><option class="text-light bg-dark" value="" selected>Department Filter</option></select>').appendTo( $(column.footer()).empty() )
			                    var select = $(".departNameFilter").empty().off().on( 'change', function () {
			                        //var val = $.fn.dataTable.util.escapeRegex( $(this).val() );
			                        //column.search( val ? '^'+val+'$' : '', true, false ).draw();
			                    	var val = $(this).val();
			                        column.search(val).draw();
			                    } );
			                    
			                    select.append( '<option class="text-light bg-dark" value="" selected>Department Filter</option>' );
			                    column.data().unique().sort().each( function ( d, j ) {
		                			select.append( '<option value="'+d+'">'+d+'</option>' ) 
		                			departNameFltrCount++;
		                		} );
				                if(departNameFltrCount<=1){
				                	$(".departNameFilter").addClass("d-none");
				                }
				            } );
						
						this.api().columns([6]).every( function () {
			                var column = this;
			                var groupTestFltrCount=0;
			                //var select = $('<select class="form-control custom-select" ><option class="text-light bg-dark" value="" selected>Test|Group Filter</option></select>').appendTo( $(column.footer()).empty() )
			                var select = $(".groupTestFilter").empty().off().on( 'change', function () {
			                        //var val = $.fn.dataTable.util.escapeRegex( $(this).val() );
			                        //column.search( val ? '^'+val+'$' : '', true, false ).draw();
			                		var val = $(this).val();
			                        column.search(val).draw();
			                    } );
			                
			                select.append( '<option class="text-light bg-dark" value="" selected>Test|Group Filter</option>' );
			                column.data().unique().sort().each( function ( d, j ) {
	                			select.append( '<option value="'+d+'">'+d+'</option>' ) 
	                			groupTestFltrCount++;
	                		} );
			                if(groupTestFltrCount<=1){
			                	$(".groupTestFilter").addClass("d-none");
			                }
			            } );
						
						this.api().columns([7]).every( function () {
			                var column = this;
			                var labNameFltrCount=0;
			                //var select = $('<select class="form-control custom-select" ><option class="text-light bg-dark" value="" selected>Lab Filter</option></select>').appendTo( $(column.footer()).empty() )
			                var select = $(".labNameFilter").empty().off().on( 'change', function () {
			                        //var val = $.fn.dataTable.util.escapeRegex( $(this).val() );
			                        //column.search( val ? '^'+val+'$' : '', true, false ).draw();
			                		var val = $(this).val();
			                        column.search(val).draw();
			                    } );
			                
			                select.append( '<option class="text-light bg-dark" value="" selected>Lab Filter</option>' );
			                column.data().unique().sort().each( function ( d, j ) {
	                			select.append( '<option value="'+d+'">'+d+'</option>' ) 
	                			labNameFltrCount++;
	                		} );
			                if(labNameFltrCount<=1){
			                	$(".labNameFilter").addClass("d-none");
			                }
			            } );

						this.api().columns([9]).every( function () {
			                var column = this;
			                var machineNameFltrCount=0;
			               // var select = $('<select class="form-control custom-select" ><option class="text-light bg-dark" value="" selected>Machine</option></select>').appendTo( $(column.footer()).empty() )
			                var select = $(".machineNameFilter").empty().off().on( 'change', function () {
			                        //var val = $.fn.dataTable.util.escapeRegex( $(this).val() );
			                        //column.search( val ? '^'+val+'$' : '', true, false ).draw();
			                		var val = $(this).val();
			                        column.search(val).draw();
			                    } );
			                
			                select.append( '<option class="text-light bg-dark" value="" selected>Machine</option>' );
			                column.data().unique().sort().each( function ( d, j ) {
	                			select.append( '<option value="'+d+'">'+d+'</option>' ) 
	                			machineNameFltrCount++;
	                		} );
			                if(machineNameFltrCount<=1){
			                	$(".machineNameFilter").addClass("d-none");
			                }
			            } );
						
						this.api().columns([11]).every( function () {
			                var column = this;
			                var priorityFltrCount=0;
			                var select = $(".priorityFilter").empty().off().on( 'change', function () {
			                        //var val = $.fn.dataTable.util.escapeRegex( $(this).val() );
			                        //column.search( val ? '^'+val+'$' : '', true, false ).draw();
			                		var val = $(this).val();
			                        column.search(val).draw();
			                    } );
			                
			                select.append( '<option class="text-light bg-dark" value="" selected>Priority</option>' );
			                column.data().unique().sort().each( function ( d, j ) {
	                			select.append( '<option value="'+d+'">'+d+'</option>' ) 
	                			priorityFltrCount++;
	                		} );
			                if(priorityFltrCount<=1){
			                	$(".priorityFilter").addClass("d-none");
			                }
			            } );
						
						showLoading(false);
						$('#container2ExpandBtn').click();
						//$("#container1Row1").collapse('hide');
					}
	});

	table.on( 'responsive-display', function ( e, datatable, row, showHide, update ) {
		setEventListenersAfterReqnListTableDrawn(table, groupOrderOnColumn);
		//console.log( 'Details for row '+row.index()+' '+(showHide ? 'shown' : 'hidden') );

		if(showHide){
			var testParamTableID= "#testParamTable"+row.index();
			//console.log(testParamTableID);
			$(testParamTableID).DataTable().columns.adjust().responsive.recalc();
		}

	});
	
	setEventListenersAfterReqnListTableDrawn(table, groupOrderOnColumn);
	
	//Set Tab Notification Badge
	//$('.patientTestBadgeCount').text(table.rows().count());
	
	
	//Add event listener for opening and closing details
   /* $('DataTable11 tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();

        	//  row.child().show();
            tr.addClass('shown');
        }
    } );*/
    
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



var rowChkCount=0;
function rowCheckBox(data, type, row){
	//console.log(row.reqnTestParamJson);
	rowChkCount++;
	var rowChkVal= {"crNo":row.crNo, "requisitionNo":row.requisitionNo, "requisitionDNo":row.requisitionDNo,
			"testCode":row.testCode, "groupCode":row.groupCode };

	var rowChkData='<div class="custom-control custom-checkbox ">';
	rowChkData+='<input type="checkbox" class="custom-control-input rowCheckBoxes d-none" value='+JSON.stringify(rowChkVal)+' id="rowCheck'+rowChkCount+'">';
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


function setInvTrackingByCrNoBtnData(data, type, row){

	var invTrackingByCrNoBtnVal = {"crNo":row.crNo, "requisitionNo":row.requisitionNo };
	
	var invTrackingByCrNoBtnData = "";
	
	invTrackingByCrNoBtnData += '<a class=" invTrackingByCrNoBtn btn btn-outline-info d-flex" key='+JSON.stringify(invTrackingByCrNoBtnVal)+'>';
	invTrackingByCrNoBtnData +='<span class="text-wrap">'+data +'&nbsp;</span>';
	invTrackingByCrNoBtnData += '<span class="btn btn-light btn-circle btn-circle-comparebtn ml-auto"><img height="15" width="15" src="media/images/reportGradiant.svg"></span>&nbsp;</a>';

	
	return invTrackingByCrNoBtnData;
}

function setInvTrackingTestCompareBtnData(data, type, row){

	var invTrackingTestCompareBtnVal = {"crNo":row.crNo, "requisitionNo":row.requisitionNo, "requisitionDNo":row.requisitionDNo,
			"testCode":row.testCode, "groupCode":row.groupCode };
	var invTrackingTestCompareBtnData = "";
	
	if(row.isRepeatCount=="0" || row.isRepeatCount=="1"){
		//invTrackingCompareBtnData +='<span class="text-wrap">'+data+'</span>';
		invTrackingTestCompareBtnData +='<span class="">'+data+'</span>';
	} else {
		invTrackingTestCompareBtnData += '<a class=" invTrackingTestCompareBtn btn btn-outline-info d-flex" key='+JSON.stringify(invTrackingTestCompareBtnVal)+'>';
		invTrackingTestCompareBtnData +='<span class="text-wrap">'+data +'&nbsp;</span>';
		invTrackingTestCompareBtnData += '<span class="btn btn-light btn-circle btn-circle-comparebtn ml-auto"><img height="15" width="15" src="media/images/compare.svg"></span>&nbsp;</a>';
	}
	
	return invTrackingTestCompareBtnData;
}

function customDepartment(data, type, row){
	var departName='<span class="text-wrap">'+data+'</span>';
	return departName;
}
/*--Functions For Returning custom Cell with css color class Ends-----------------*/

/*--Functions For Returning custom Table Rows According To Screen Size Type1 patientDetails Starts---*/


var isValiFirstRow = 0;
var valiCellCount = 0;

function valiCustomDataOnScreenSize(col) {
	var tbdat = '';
	if(col.data!="extraTd"){
		var w = window.innerWidth;
		var h = window.innerHeight;
		if (w >= 1100) {
			tbdat = valiCustomData(col, 5);
		} else if (w < 1100 && w > 880) {
			tbdat = valiCustomData(col, 3);
		} else if (w < 880 && w > 600) {
			tbdat = valiCustomData(col, 2);
		} else if (w <= 600) {
			tbdat = valiCustomData(col, 1);
		}
	}
	return tbdat;
}

function valiCustomData(col, noOfThPairInOneRow) {
	var tbdat = '';
	if (valiCellCount >= noOfThPairInOneRow) {
		tbdat = '</tr>'; valiCellCount = 0; isValiFirstRow = 0;
	}
	if (isValiFirstRow == 0) {
		tbdat = '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">';
		isValiFirstRow++;
	}
	tbdat += '<th>' + col.title + ':' + '</th> ' +
	'<td>' + col.data + '</td>';
	valiCellCount++;
	return tbdat;
}
/*--Functions For Returning custom Table Rows According To Screen Size Type1 patientDetails Ends-----*/



function valiCustomRowAppend(api, rowIdx, columns, data) {

	isValiFirstRow = 0;
	valiCellCount = 0;
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
	$(testParamTable).addClass("table  dt-responsive table-sm rounded-lg overflow-hidden shadow border border-primary testParamTables"); /*table-bordered*/
	$(testParamTable).attr({"id":"testParamTable"+rowIdx});
	$(testParamTable).css({"width":"100%"});  //,"background":"#89D0FF"
	$(testParamTable).append(testPramTableHead);

	var testParamDataTable = $(testParamTable).DataTable({
		"dom": "t",
		responsive: true,
		"ordering": false,
		lengthChange: false,
		"language": { "emptyTable": "No Data Is Available " },
		"aaData": api.context[0].aoData[rowIdx]._aData.reqnTestParamJson,
		/*"aaData": globalValidationReqnList[rowIdx].reqnTestParamJson,*/
		"columns": [
			{ "data": 'paraName' },
			{ "data": 'paraValue' },
			{ "data": 'refRange' },
			],
			
		"columnDefs":[   
			{ "targets": 0,
				"render": function ( data, type, row )
				{ return customTestParaName(data, type, row); },
			},
			{ "targets": 1,
				"render": function ( data, type, row )
				{ return customTestParaValue(data, type, row); },
			},
			{ "targets": 2,
				"render": function ( data, type, row )
				{ return customTestParaRef(data, type, row); },
			},
			]
	}); 

	return testParamTable;
}


var testParamChkCount=0;
function customTestParaName(data, type, row){
	testParamChkCount++;
	
	var isShowCheckBox = row.isShowCheckBox;
	var testParamChkVal= {paramCode:row.paramCode, paraName:row.paraName, paramRequisitionNo:row.paramRequisitionNo,
			paramRequisitionDNo:row.paramRequisitionDNo, paramTestCode:row.paramTestCode };
	var customTestParaNameData ="";
	
	if(isShowCheckBox=="1") {
		customTestParaNameData+='<div class="custom-control custom-checkbox ">';
		customTestParaNameData+='<input type="checkbox" class="custom-control-input testParamChkBoxes d-none" value=\''+JSON.stringify(testParamChkVal)+'\' id="testParamChk'+testParamChkCount+'">';
		customTestParaNameData+='<label class="custom-control-label" for="testParamChk'+testParamChkCount+'"></label>';
		customTestParaNameData+='<span class="">'+data+'</span>';
		customTestParaNameData+='</div>';
	} else {
		customTestParaNameData = '<div class="">'+data+'</div>';
	}
	 
	var div = document.createElement('div');
	div.innerHTML=customTestParaNameData
	  
	return  div.innerHTML;
}



function customTestParaValue(data, type, row){

	var strParamOutOfBound = row.outOfBound;
	var testParaValueColor ="";
	
	if(strParamOutOfBound=="1") {
		testParaValueColor="text-danger";
	} else { testParaValueColor = ""; }
	var customTestParaValueData = '<div class="'+testParaValueColor+'">'+data+'</div>';
	
	var div = document.createElement('div');
	div.innerHTML=customTestParaValueData
	  
	return  div.innerHTML;
}

function customTestParaRef(data, type, row){
		  
	var customTestParaRefData = '<div class="">'+data+'</div>';
	
	var div = document.createElement('div');
	div.innerHTML=customTestParaRefData
	  
	return  div.innerHTML;
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
		saveBtnsAnimations(false, true);
		AjaxValidateReqnResult(globalSelectedReqnData);
	}
}


function modifyReqnResult() {	
	if($( ".rowCheckBoxes:checked" ).length){
		setGlobalSelectedReqnData();
		saveBtnsAnimations(false, false);
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
		$(savedReqnElmList[i]).closest("tr").addClass("slideRemove-anime");
		//globalDatablesObject.dataTableValidationReqnList.row( $(".slideRemove-anime") ).remove();
		//globalDatablesObject.dataTableValidationReqnList.column(0).nodes()
		selectedReqnDataTable.row( $(".slideRemove-anime") ).remove();
		selectedReqnDataTable.column(1).nodes()
		.each( function (cell, k) { cell.innerHTML = k+1; });

		setTimeout(function() {
			$(".slideRemove-anime").remove();
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

/*
Project Name	: eSushrut
Author          : github.com/prashantmi
Module Name		: INVESTIGATION
*/

/*------------------------------------------Ajax Calls Starts-------------------------------------------------------------------------------------------------*/
/*var globalSearchParam={collAreaCode:"", labCode:"", validationStatusCode:"",
						dateOrFilter:"", dateTypeCode:"", searchType:"", 
						fromDate:"", toDate:"", crNo:"", billNo:"", 
						sampleNo:"", labNo:"" 
					   };*/

var globalAjaxGetPatDtlObj =null;
var globalPatientDetails = null;
function AjaxGetPatDetails(globalSearchParam) {

	globalPatientDetails = null;

	var _mode = "AjaxGetPatDetails";
	
	var crNo=globalSearchParam.crNo;
	var billNo=globalSearchParam.billNo;
	var searchType=globalSearchParam.searchType;

	var url = "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode=" + _mode + "&crNo=" + crNo + "&billNo=" + billNo +"&searchType="+searchType;
	//globalAjaxObjectArr.AjaxGetPatDetails=
	globalAjaxGetPatDtlObj= $.getJSON(url, function(data) {

		if(!$.isEmptyObject(data)) {
			if(data.isSuccess=="1") {
				
		    	  globalPatientDetails=data.patDetails;

		    	  var patDetails=data.patDetails[0];
		    	  
		    	  /*----------------------------------------------------*/
		    	  //Default
		    	  $('#patDetails-icon-m').addClass("d-none");
		    	  $('#patDetails-icon-b').addClass("d-none");
		    	  $('#patDetails-icon-bc').addClass("d-none");
		    	  $('#patDetails-icon-w').addClass("d-none");
		    	  $('#patDetails-icon-g').addClass("d-none");
		    	  $('#patDetails-icon-gc').addClass("d-none");
	    		  $('#patDetails-icon-t').addClass("d-none");
	    		  
	    		  var patAgeYrInt=NaN;
	    		  if(patDetails.patAge.toLowerCase().includes("yr")){
	    			  patAgeYrInt=parseInt(patDetails.patAge);
	    		  } else if (patDetails.patAge.toLowerCase().includes("mth")){
	    			  patAgeYrInt=0;
	    		  }
	    		  
		    	  if(patDetails.patGenderCode=="F"){
		    		  if(patAgeYrInt<=3){
		    			  $('#patDetails-icon-gc').removeClass("d-none");
		    		  } else if (4<=patAgeYrInt && patAgeYrInt<=12){
		    			  $('#patDetails-icon-g').removeClass("d-none");
		    		  } else {
		    			  $('#patDetails-icon-w').removeClass("d-none");
		    		  }
		    	  }
		    	  else if(patDetails.patGenderCode=="M") {
		    		  if(patAgeYrInt<=3){
		    			  $('#patDetails-icon-bc').removeClass("d-none");
		    		  } else if (4<=patAgeYrInt && patAgeYrInt<=12){
		    			  $('#patDetails-icon-b').removeClass("d-none");
		    		  } else {
		    			  $('#patDetails-icon-m').removeClass("d-none");
		    		  }
		    	  }
		    	  else if(patDetails.patGenderCode=="T") {
		    		  if(patDetails.patAge){} //in future implementation
		    		  $('#patDetails-icon-t').removeClass("d-none");
		    	  }
		    	  /*----------------------------------------------------*/
		    	  //Default
				  $('.opdSpan').addClass("d-none");
		    	  $('.ipdSpan').addClass("d-none");
		    	  $('.emgcOpdSpan').addClass("d-none");
		    	  $('.spclOpdSpan').addClass("d-none");
		    	  
		    	  if(patDetails.patStatusCode=="1"){
		    		  $('.opdSpan').removeClass("d-none");
		    	  } else if (patDetails.patStatusCode=="2") {
		    		  $('.ipdSpan').removeClass("d-none");
		    	  } else if (patDetails.patStatusCode=="3") {
		    		  $('.emgcOpdSpan').removeClass("d-none");
		    	  } else if (patDetails.patStatusCode=="4") {
		    		  $('.spclOpdSpan').removeClass("d-none");
		    	  }
		    	  /*----------------------------------------------------*/
		    	  //Default
		    	  $('.newBornSpan').addClass("d-none");
		    	  $('.pregnantSpan').addClass("d-none");
		    	  $('.vipSpan').addClass("d-none");
		    	  $('.confidentialSpan').addClass("d-none");
				  $('.unknownSpan').addClass("d-none");
				  $('.deadSpan').addClass("d-none");
				  $('.mlcSpan').addClass("d-none");
				  var flagNewRow=false;
				  
				  if(patDetails.isNewBorn=="1"){
		    		  flagNewRow=true;
		    		  $('.newBornSpan').removeClass("d-none");
		    	  }
				  if(patDetails.isPregnant=="1"){
		    		  flagNewRow=true;
		    		  $('.pregnantSpan').removeClass("d-none");
		    	  }
				  if(patDetails.isVip=="1"){
		    		  flagNewRow=true;
		    		  $('.vipSpan').removeClass("d-none");
		    	  }
				  if(patDetails.isConfidential=="1"){
		    		  flagNewRow=true;
		    		  $('.confidentialSpan').removeClass("d-none");
		    	  }
		    	  if(patDetails.isUnknown=="1"){
		    		  flagNewRow=true;
		    		  $('.unknownSpan').removeClass("d-none");
		    	  }
		    	  if(patDetails.isDead=="1"){
		    		  flagNewRow=true;
		    		  $('.deadSpan').removeClass("d-none");
		    	  }
		    	  if(patDetails.isMlc=="1"){
		    		  flagNewRow=true;
		    		  $('.mlcSpan').removeClass("d-none");
		    	  }
		    	  /*----------------------------------------------------*/
		    	  //Default
		    	  $("#patDetails-icon").removeClass("col-md-12");
				  $("#patDetails-table-Opd").removeClass("col-md-12");
				  $("#patDetails-table-Ipd").removeClass("col-md-12");
				  
				  $("#patDetails-icon-p").addClass("col-md-12");
				  $("#patDetails-icon-status").addClass("col-md-12");
				  
				  $("#patDetails-icon").addClass("col-md-1");
				  $("#patDetails-table-Opd").addClass("col-md-11");
				  $("#patDetails-table-Ipd").addClass("col-md-11");
				  
		    	  if(flagNewRow){
		    		  var w = window.innerWidth;
					  var h = window.innerHeight;
					  if (w >= 768) {
						  $("#patDetails-icon").addClass("col-md-12");
						  $("#patDetails-table-Opd").addClass("col-md-12");
						  $("#patDetails-table-Ipd").addClass("col-md-12");
						  
						  $("#patDetails-icon-p").removeClass("col-md-12");
						  $("#patDetails-icon-status").removeClass("col-md-12");
					 }}
		    	  
		    	  /*----------------------------------------------------*/
		    	  $('#patDetails-table-Opd').addClass("d-none");
		    	  $('#patDetails-table-Ipd').addClass("d-none");
		    	  
		    	  if(patDetails.patStatusCode=="2"){
		    		  $('#patDetails-table-Ipd').removeClass("d-none");
		    		  dataTableIPDPatDetails(data.patDetails);
		    	  } else{
		    		  $('#patDetails-table-Opd').removeClass("d-none");
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

/*------------------------------------------DataTables Initialization starts----------------------------------------------------------------------------------*/

function dataTableOPDPatDetails(patDetailsOPD){

	$('#DataTableOPD').DataTable().clear().destroy();
	  var table = $('#DataTableOPD').DataTable({

	    responsive: true,
	    "ordering": false,
	    "dom": "t",
	    lengthChange: false,
	    "language": { "emptyTable": "No Data Is Available " },
	    "aaData": patDetailsOPD,
	    "columns": [
	    	/*isUnknown isDead isMlc isCatExpired isActualDob
	    	--patStatusCode patCategoryCode patGenderCode
			--patHusbandName patEmailId 
			--patMlcNo isNewBorn isPregnant isVip  isConfidential*/
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
	    				return col.hidden ? patCustomDataOnScreenSize(col) : '';
	    				}).join('');
	    			return data ? patCustomRowAppend(api, rowIdx, columns, data) : false;
	    		}
	    	}
	    },
	    "initComplete": function(settings, json) {    }
	  });
}

function dataTableIPDPatDetails(patDetailsIPD){

	$('#DataTableIPD').DataTable().clear().destroy();
	  var table = $('#DataTableIPD').DataTable({

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
	    	--//ipd
	    	// patDeptUnitCode patVisitNo patEpisodeCode admittedDepartmentCode
			patDeptUnit patWardCode admittedDepartmentCode patRoomNo bedCode hospitalCode
			patAccNo*/
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
	    				return col.hidden ? patCustomDataOnScreenSize(col) : '';
	    				}).join('');
	    			return data ? patCustomRowAppend(api, rowIdx, columns, data) : false;
	    		}
	    	}
	    },
	    "initComplete": function(settings, json) {    }
	  });
}

/*------------------------------------------DataTables Custom Rows Creation Starts----------------------------------------------------------------------------*/

function customAddressData(data, type, row){
	var addressData='<span class="text-wrap" style="width:250px;" }">'+data+'</span>';
	return addressData;
}

/*--Functions For Returning custom Table Rows According To Screen Size Type1 patientDetails Starts---*/

var isPatFirstRow = 0;
var patCellCount = 0;

function patCustomDataOnScreenSize(col) {
	var tbdat = '';
	if(col.data!="extraTd"){
		  var w = window.innerWidth;
		  var h = window.innerHeight;
		  if (w >= 1100) {
		    tbdat = patCustomData(col, 5);
		  } else if (w < 1100 && w > 880) {
		    tbdat = patCustomData(col, 3);
		  } else if (w < 880 && w > 600) {
		    tbdat = patCustomData(col, 2);
		  } else if (w <= 600) {
		    tbdat = patCustomData(col, 1);
		  }
	}
	 return tbdat;
}

function patCustomData(col, noOfThPairInOneRow) {
	  var tbdat = '';
		if (patCellCount >= noOfThPairInOneRow) {
	    tbdat = '</tr>'; patCellCount = 0; isPatFirstRow = 0;
	  }
		if (isPatFirstRow == 0) {
	    tbdat = '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">';
	    isPatFirstRow++;
	  }
	  tbdat += '<th>' + col.title + ':' + '</th> ' + '<td>' + col.data + '</td>';
	  patCellCount++;
return tbdat;
	}
/*--Functions For Returning custom Table Rows According To Screen Size Type1 patientDetails Ends-----*/

function patCustomRowAppend(api, rowIdx, columns, data) {
	
  isPatFirstRow = 0;
  patCellCount = 0;
  //data+='</tr>';
  var patChildRow = $('<table></table>').append(data);
  
  var patAddiDt=patAdditionalRow(api, rowIdx, columns);
  
  if(patAddiDt!=""){
	  patChildRow = $(patChildRow).add($(patAddiDt));
  } 

  if(data==""){
		return patAddiDt;
  }
  
	return patChildRow;
}

function patAdditionalRow(api, rowIdx, columns){
	//addCode to return additional Row
	return "";
}
/*--------------------------------------------DataTables Custom Rows Creation Ends----------------------------------------------------------------------------*/

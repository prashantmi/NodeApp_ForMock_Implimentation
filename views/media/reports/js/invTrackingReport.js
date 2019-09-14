/*------------------------------------------Set Automaticly------------------------------------------------*/

$(document).ready(function () {
        $('#datetimepicker-from').datetimepicker({
            format: 'DD-MMM-YYYY',
            showTodayButton: true,
            //showClear: true,
            icons: { today: 'fas fa-calendar-day',
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
            icons: { today: 'fas fa-calendar-day',
            	 	 previous: "fa fa-caret-left",
            		 next: "fa fa-caret-right ", },
            useCurrent: true //may cause problem see datetimepicker issue #1075
        });

        $("#datetimepicker-from").on("dp.change", function (e) {
            $('#datetimepicker-to').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker-to").on("dp.change", function (e) {
            $('#datetimepicker-from').data("DateTimePicker").maxDate(e.date);
        });
    });


function setDate() {

    var today = new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var DD = today.getDate();
    var M = months[today.getMonth()];
    var YYYY = today.getFullYear();

    today=DD+"-"+M+"-"+YYYY;
    return today;
    //$(".todayDate")[0].val(today);
    //$(".todayDate")[1].val(today);
    //alert(DD+"-"+M+"-"+YYYY);
}


$(document).ready(function(){
	var table = $('#DataTable1').DataTable( {
	responsive: true,
	"ordering": false,
	"dom": "t",
	lengthChange: false,
	});
});



$(document).ready(function(){
	  $('.hover-shadow').hover(
	  function(){ $(this).addClass("shadow-lg"); },
	  function(){ $(this).removeClass("shadow-lg"); }
	);
});



/*------------------------------------------Event Actions------------------------------------------------*/



$(document).ready(function(){

/*----------On Change in input type Cr.NO Or Bill No. starts---------------------------------*/
  $('#inputTypeBC').change(function() {
      var inputTypeBC = $(this).val();

      /*inputTypeBC 1 is that search made on bill no.*/
      if(inputTypeBC==1){

        $('#crNoInput').css({"display": "none"});
        $('#billNoInput').css({"display": ""});

        $('.inputDates').css({"display": "none"});
        showHideLoding("no");
      }

      /*inputTypeBC 2 that is search made on Cr. no.*/
      else if (inputTypeBC==2){

        $('#billNoInput').css({"display": "none"});
        $('#crNoInput').css({"display": ""});

        $('.inputDates').css({"display": ""});
        showHideLoding("no");
      }

  });

 /*----------On Change in input type Cr.NO Or Bill No. Ends---------------------------------*/


/*----------On Click Getdata Button starts---------------------------------*/
  $('#getData').click( function(){

	//show loding animation
	  showHideLoding("yes");

    var inputTypeBC=$('#inputTypeBC').val();

    /*inputTypeBC 1 is that search made on bill no.*/
    if(inputTypeBC==1){

    var billNo=$('#billNoInput').val();

    if(billNo.length==15) {
    	$('#patDetails').css({"display": ""});
    	$('#patReqnListOnCrNo').css({"display": "none"});
    	$('#patReqnListOnBillNo').css({"display": ""});

    	AjaxGetPatDetailsOnBillNo(billNo);
    	AjaxGetPatReqnListOnBillNo(billNo);
    } else {

    	alert("Bill No. Should Be Of 15 Digits");
    	$('#billNoInput').focus();
    	showHideLoding("no");
     	}

    }

    /*inputTypeBC 2 that is search made on Cr. no.*/
    else if (inputTypeBC==2){

    var crNo=$('#crNoInput').val();

    if(crNo.length==15) {
    	$('#patDetails').css({"display": ""});
    	$('#patReqnListOnBillNo').css({"display": "none"});
    	$('#patReqnListOnCrNo').css({"display": ""});

    	AjaxGetPatDetailsOnCrNo(crNo);
    	AjaxGetPatReqnListOnCrNo(crNo);
     } else {

    	alert("Cr. No. Should Be Of 15 Digits");
    	$('#crNoInput').focus();
    	showHideLoding("no");
     	}
    }



  });

/*----------On Click Getdata Button Ends---------------------------------*/

});



/*----------Loding Button Animation On Click Getdata Button starts----------------*/
function showHideLoding(showBoolean){

	if(showBoolean=="yes"){
		$('#getData').css({"display":"none"});
		$('#getingData').css({"display":""});
	}
	else if(showBoolean=="no"){
		$('#getingData').css({"display":"none"});
		$('#getData').css({"display":""});
	}
	else {
		$('#getingData').css({"display":"none"});
		$('#getData').css({"display":""});
	}
}
/*----------Loding Button Animation On Click Getdata Button starts----------------*/



/*------------Ristrict Only Number Input Validation Start---------------------------------*/
function setInputFilter(textbox, inputFilter) {
	  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
	    textbox.addEventListener(event, function() {
	      if (inputFilter(this.value)) {
	        this.oldValue = this.value;
	        this.oldSelectionStart = this.selectionStart;
	        this.oldSelectionEnd = this.selectionEnd;
	      } else if (this.hasOwnProperty("oldValue")) {
	        this.value = this.oldValue;
	        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
	      }
	    });
	  });
	}

$(document).ready(function(){
setInputFilter(document.getElementById("billNoInput"), function(value) {
	  return /^\d*$/.test(value); });

setInputFilter(document.getElementById("crNoInput"), function(value) {
	  return /^\d*$/.test(value); });
});
/*------------Ristrict Only Number Input Validation End-------------------------------*/



/*---function to expand and collapse all rows on button click Starts--------------*/
/*---Call this method for any data table to epand and collapse rows with right argument--*/
function expandColapseRow(booleanExpand, table){

	if(booleanExpand=="yes"){
		// Expand row details
 	    table.rows(':not(.parent)').nodes().to$().find('td:first-child').trigger('click');

 	    //Switch buttons
 	    $('table .expandButton').addClass('d-none');
 	    $('table .collapseButton').removeClass('d-none');

	} else {
		 // Collapse row details
	 	 table.rows('.parent').nodes().to$().find('td:first-child').trigger('click');

	 	 //Switch buttons
	 	 $('table .collapseButton').addClass('d-none');
	 	 $('table .expandButton').removeClass('d-none');
	}
}
/*---function to expand and collapse all rows on button click Ends--------------*/


/*------------------------------------------Ajax Calls Starts------------------------------------------------*/

function AjaxGetPatDetailsOnBillNo(billNo){

  var _mode = "AjaxGetPatDetailsOnBillNo";

  $('#DataTable1').DataTable().clear().destroy();
  var table = $('#DataTable1').DataTable( {

	 responsive: true,
    "ordering": false,
    //"dom": "lftipr", //show all features of dattatables
    "dom": "t", //show only table row
    lengthChange: false,

	  "language": {
	      "emptyTable": "No Data Is Available "
	    },

    "ajax": {
      "url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode="+_mode+"&billNo="+billNo, sync:true, postData: "", handleAs: "text",
			//"url": "/data", sync:true, postData: "", handleAs: "text",
			error: function (jqXHR, statusText, errorThrown) {
    	  console.log(jqXHR.responseText);
    	  console.log(statusText);
    	  console.log(errorThrown);
      },
      dataSrc: "patDetailsOnBillNo"
      },
      "columns": [
          { "data": 'patientName' },
          { "data": 'crNumber' },
          { "data": 'patientStatus' },
          { "data": 'ageGender' },
          { "data": 'phoneNo' },
          { "data": 'emailId' },
          { "data": 'latestBillNo' },
          { "data": 'memberSince' },
          { "data": 'totalPaymentsDone' },
          { "data": 'pendingPayments' },
          { "data": 'address' },
          { "data": 'note' }

          ],

          responsive: {
              details: {
                renderer: function ( api, rowIdx, columns )
                           {
                             var data = $.map( columns, function ( col, i )
                               {
                                 return col.hidden ? customeRowData(col) : '';
                               } ).join('');
                             return data ? customeRowDataAppend(data) : false;
                           }
                         }
                       },

      "initComplete": function(settings, json) {
    	  //show loding animation
    	  //showHideLoding("no");
    	  //console.log(settings);
    	  //console.log(json);
    	  }
    });


}

function AjaxGetPatDetailsOnCrNo(crNo){

  var _mode = "AjaxGetPatDetailsOnCrNo";

  $('#DataTable1').DataTable().clear().destroy();
  var table = $('#DataTable1').DataTable( {

	  responsive: true,
	  "ordering": false,
	  /*"dom": "lftipr", /*show all features of dattatables*/
	  "dom": "t", /*show only table row*/
	  lengthChange: false,

	  "language": {
	      "emptyTable": "No Data Is Available "
	    },

	  "ajax": {
      "url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode="+_mode+"&crNo="+crNo, sync:true, postData: "", handleAs: "text",
			//"url": "/data", sync:true, postData: "", handleAs: "text",
			error: function (jqXHR, statusText, errorThrown) {
    	  console.log(jqXHR.responseText);
    	  console.log(statusText);
    	  console.log(errorThrown);
      },
			dataSrc: "patDetailsOnCrNo"
     },
     "columns": [
    	 { "data": 'patientName' },
         { "data": 'crNumber' },
         { "data": 'patientStatus' },
         { "data": 'ageGender' },
         { "data": 'phoneNo' },
         { "data": 'emailId' },
         { "data": 'latestBillNo' },
         { "data": 'memberSince' },
         { "data": 'totalPaymentsDone' },
         { "data": 'pendingPayments' },
         { "data": 'address' },
         { "data": 'note' }
       ],

       responsive: {
           details: {
             renderer: function ( api, rowIdx, columns )
                        {
                          var data = $.map( columns, function ( col, i )
                            {
                              return col.hidden ? customeRowData(col) : '';
                            } ).join('');
                          return data ? customeRowDataAppend(data) : false;
                        }
                      }
                    },

     "initComplete": function(settings, json) {
   	  //show loding animation
   	  //showHideLoding("no");
   	  }

    });


}


function AjaxGetPatReqnListOnBillNo(billNo){


   var _mode = "AjaxGetPatReqnListOnBillNo";

   $('#DataTable2').DataTable().clear().destroy();

   $.fn.dataTable.moment( 'DD-MMM-YYYY' );
   var table = $('#DataTable2').DataTable( {

     dom: 'Bfrtip',
     "columnDefs": [
    	    { "orderable": false, "targets": 0 }
    	  ],

     "language": {
    	      "emptyTable": "No Data Is Available "
    	    },

      buttons: [
    	 {
    		 extend: 'collection',
    		 text: 'Trigger Tools',
    		 className: "btn-dark",
    		 buttons: [
    			 { extend: 'colvis', className: "bg-dark text-white" },
    			 { extend: 'excel', className: "bg-dark text-white"  },
    			 { extend: 'pdfHtml5', className: "bg-dark text-white",
    				 title: 'Investigation Tracking Report', text: 'PDF',
    				 pageMargins: [ 0, 0, 0, 0 ], // try #1 setting margins
    				 margin: [ 0, 0, 0, 0 ], // try #2 setting margins
    				 alignment: 'center',
    				 exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] }
    			 }
    			 ]
    	 },
    	/* {
    		 extend: 'colvisGroup',
    		 className: "btn-light"
         },*/
         {
    		 extend: 'collection',
    		 text: 'Show Related Columns',
    		 className: "btn-success",
    		 buttons: [
    			 {
    	             extend: 'colvisGroup',
    	             className: "bg-dark text-white",
    	             text: 'Show All',
    	             show: ':hidden'
    	           },
    			 {
    	    		 extend: 'colvisGroup',
    	             className: "bg-dark text-white ",
    	             text: 'Requisition Raising',
    	             show: [ 1, 2, 3 ],
    	             hide: [ 4, 5, 6 ]
    	         },
    	         {
    	             extend: 'colvisGroup',
    	             className: "bg-dark text-white ",
    	             text: 'Sample Collection',
    	             show: [ 3, 4, 5 ],
    	             hide: [ 1, 2 ]
    	         },
    	         {
    	             extend: 'colvisGroup',
    	             className: "bg-dark text-white",
    	             text: 'Sample Acceptance',
    	             show: ':hidden'
    	         },
    	         {
    	             extend: 'colvisGroup',
    	             className: "bg-dark text-white ",
    	             text: 'Patient Acceptance',
    	             show: ':hidden'
    	         },
    	         {
    	             extend: 'colvisGroup',
    	             className: "bg-dark text-white ",
    	             text: 'Result Entry',
    	             show: ':hidden'
    	         },
    	         {
    	             extend: 'colvisGroup',
    	             className: "bg-dark text-white ",
    	             text: 'Result Validation',
    	             show: ':hidden'
    	          },
    	          {
    	             extend: 'colvisGroup',
    	             className: "bg-dark text-white ",
    	             text: 'Report Printing',
    	             show: ':hidden'
    	          },
    	          {
    	             extend: 'colvisGroup',
    	             className: "bg-dark text-white ",
    	             text: 'Addendum And Amendment',
    	             show: ':hidden'
    	          }

    		 ]
         },
          ],


       "ajax": {
        "url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode="+_mode+"&billNo="+billNo, sync:true, postData: "", handleAs: "text",
			 //"url": "/data", sync:true, postData: "", handleAs: "text",
			 error: function (jqXHR, statusText, errorThrown) {
    	  console.log(jqXHR.responseText);
    	  console.log(statusText);
    	  console.log(errorThrown);
      },
				dataSrc: "patReqnListOnBillNo"
         },
    "columns": [
         { "data": 'sno' },
         { "data": 'reportStatus' },
         { "data": 'groupName' },
         { "data": 'testName' },
         { "data": 'sampleName' },
         { "data": 'sampleNum' },
         { "data": 'labNum' },
         { "data": 'status' },
         { "data": 'labName' },
         { "data": 'reqDate' },
         { "data": 'department' },
         { "data": 'wardName' },
         { "data": 'labName' },
         { "data": 'reqDate' },
         { "data": 'department' },
         { "data": 'wardName' }
        ],


       "sPaginationType": "full_numbers",
       "bJQueryUI": true,
       //"scrollX": true,
       responsive: {
         details: {
           renderer: function ( api, rowIdx, columns )
                      {
                        var data = $.map( columns, function ( col, i )
                          {
                            return col.hidden ? customeRowData(col) : '';
                          } ).join('');
                        return data ? customeRowDataAppend(data) : false;
                      }
                    }
                  },

       "initComplete": function(settings, json) {
     	  //show loding animation
     	  showHideLoding("no");
     	  }

   } );


   // Handle click on "Epand All" button
   $('table .expandButton').on('click', function(){
	   expandColapseRow("yes", table);
 	});

 	// Handle click on "Collapse All" button
 	$('table .collapseButton').on('click', function(){
 		expandColapseRow("no", table);
 	});

}




function AjaxGetPatReqnListOnCrNo(crNo){

  var _mode = "AjaxGetPatReqnListOnCrNo";
  //var fromDate=document.getElementsByName("fromDate")[0].value;
  //var toDate=document.getElementsByName("toDate")[0].value;

  var fromDate=document.getElementsByClassName("fromDateInput")[0].value;
  var toDate=document.getElementsByClassName("toDateInput")[0].value;

  $('#DataTable3').DataTable().clear().destroy();

  $.fn.dataTable.moment( 'DD-MMM-YYYY' );
  var table = $('#DataTable3').DataTable( {

	  dom: 'Bfrtip',
	  "columnDefs": [
  	    { "orderable": false, "targets": 0 }
  	  ],

  	  "language": {
	      "emptyTable": "No Data Is Available "
	    },

  	  buttons: [
	    	 {
	    		 extend: 'collection',
	    		 text: 'Trigger Tools',
	    		 className: "btn-dark",
	    		 buttons: [
	    			 { extend: 'colvis', className: "bg-dark text-white" },
	    			 { extend: 'excel', className: "bg-dark text-white"  },
	    			 { extend: 'pdfHtml5', className: "bg-dark text-white",
	    				 title: 'Investigation Tracking Report', text: 'PDF',
	    				 pageMargins: [ 0, 0, 0, 0 ], // try #1 setting margins
	    				 margin: [ 0, 0, 0, 0 ], // try #2 setting margins
	    				 alignment: 'center',
	    				 exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] }
	    			 }
	    			 ]
	    	 },
	    /*	 {
	    		 extend: 'colvisGroup',
	    		 className: "btn-light"
	         },*/
	    	 {
	    		 extend: 'collection',
	    		 text: 'Show Related Columns',
	    		 className: "btn-success",
	    		 buttons: [
	    			 {
	    	             extend: 'colvisGroup',
	    	             className: "bg-dark text-white ",
	    	             text: 'Show All',
	    	             show: ':hidden'
	    	           },
	    			 {
	    	    		 extend: 'colvisGroup',
	    	             className: "bg-dark text-white ",
	    	             text: 'Requisition Raising',
	    	             show: [ 1, 2, 3 ],
	    	             hide: [ 4, 5, 6 ]
	    	         },
	    	         {
	    	             extend: 'colvisGroup',
	    	             className: "bg-dark text-white ",
	    	             text: 'Sample Collection',
	    	             show: [ 3, 4, 5 ],
	    	             hide: [ 1, 2 ]
	    	         },
	    	         {
	    	             extend: 'colvisGroup',
	    	             className: "bg-dark text-white ",
	    	             text: 'Sample Acceptance',
	    	             show: ':hidden'
	    	         },
	    	         {
	    	             extend: 'colvisGroup',
	    	             className: "bg-dark text-white ",
	    	             text: 'Patient Acceptance',
	    	             show: ':hidden'
	    	         },
	    	         {
	    	             extend: 'colvisGroup',
	    	             className: "bg-dark text-white ",
	    	             text: 'Result Entry',
	    	             show: ':hidden'
	    	         },
	    	         {
	    	             extend: 'colvisGroup',
	    	             className: "bg-dark text-white ",
	    	             text: 'Result Validation',
	    	             show: ':hidden'
	    	          },
	    	          {
	    	             extend: 'colvisGroup',
	    	             className: "bg-dark text-white ",
	    	             text: 'Report Printing',
	    	             show: ':hidden'
	    	          },
	    	          {
	    	             extend: 'colvisGroup',
	    	             className: "bg-dark text-white ",
	    	             text: 'Addendum And Amendment',
	    	             show: ':hidden'
	    	          }

	    		 ]
	         },

	        ],

      "ajax": {
       "url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode="+_mode+"&crNo="+crNo+"&fromDate="+fromDate+"&toDate="+toDate, sync:true, postData: "", handleAs: "text",
			//"url": "/data", sync:true, postData: "", handleAs: "text",
			error: function (jqXHR, statusText, errorThrown) {
    	  console.log(jqXHR.responseText);
    	  console.log(statusText);
    	  console.log(errorThrown);
      },
			 dataSrc: "patReqnListOnCrNo"
        },
        "columns": [
            { "data": 'sno' },
            { "data": 'billNo' },
            { "data": 'reportStatus' },
            { "data": 'groupName' },
            { "data": 'testName' },
            { "data": 'sampleName' },
            { "data": 'sampleNum' },
            { "data": 'labNum' },
            { "data": 'status' },
            { "data": 'labName' },
            { "data": 'reqDate' },
            { "data": 'department' },
            { "data": 'wardName' },
            { "data": 'reqDate' },
            { "data": 'department' },
            { "data": 'wardName' }
           ],
          "sPaginationType": "full_numbers",
          "bJQueryUI": true,
          "scrollX": true,

          responsive: {
              details: {
                renderer: function ( api, rowIdx, columns )
                           {
                             var data = $.map( columns, function ( col, i )
                               {
                                 return col.hidden ? customeRowData(col) : '';
                               } ).join('');
                             return data ? customeRowDataAppend(data) : false;
                           }
                         }
                       },

          "initComplete": function(settings, json) {
         	  //show loding animation
         	  showHideLoding("no");
         	  }

  } );


  // Handle click on "Epand All" button
  $('table .expandButton').on('click', function(){
	   expandColapseRow("yes", table);
	});

	// Handle click on "Collapse All" button
	$('table .collapseButton').on('click', function(){
		expandColapseRow("no", table);
	});

}


function AjaxGetReqDetails() {
	var _mode = "AjaxGetReqDetails";
}




/*----Responsive Table Rows According To Screen Size Starts--------------------*/

var crcount=0;
var crcount2=0;

function customeRowData (col) {
  var tbdat='';
  var w = window.innerWidth;
  var h = window.innerHeight;
  if(w>=1100){
    tbdat=customeRowData1 (col);
  }  else if (w<1100 && w>800) {
    tbdat=customeRowData2 (col);
  } else if (w<800 && w>600) {
    tbdat=customeRowData3 (col);
  } else if (w<=600) {
    tbdat=customeRowData4 (col);
  }
return tbdat;
}

function customeRowData1 (col) {
  var tbdat='';
  if(crcount==0){
    tbdat='<tr data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">';
    crcount++;
  }
tbdat+='<th>'+col.title+':'+'</th> '+
      '<td>'+col.data+'</td>';
  return tbdat;
}


function customeRowData2 (col) {
  var tbdat='';
  if(crcount==0){
    tbdat='<tr data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">';
    crcount++;
  }

  if(crcount2 >=3){
    tbdat='</tr><tr data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">';
    crcount2=0;
    //crcount++;
  }

  tbdat+='<th>'+col.title+':'+'</th> '+
      '<td>'+col.data+'</td>';
  crcount2++;

  return tbdat;
}


function customeRowData3 (col) {
  var tbdat='';
  if(crcount==0){
    tbdat='<tr data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">';
    crcount++;
  }

  if(crcount2 >=2){
    tbdat='</tr><tr data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">';
    crcount2=0;
    //crcount++;
  }

  tbdat+='<th>'+col.title+':'+'</th> '+
      '<td>'+col.data+'</td>';
  crcount2++;

  return tbdat;
}



function customeRowData4 (col) {
var tbdat=  '<tr data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">'+
      '<th>'+col.title+':'+'</th> '+
      '<td>'+col.data+'</td>'+
  '</tr>';
  return tbdat;
}


function customeRowDataAppend(data) {
crcount=0;
crcount2=0;
//data+='</tr>';
var rt= $('<table/>').append( data ) ;
return rt;
}

/*----Responsive Table Rows According To Screen Size Ends--------------------*/

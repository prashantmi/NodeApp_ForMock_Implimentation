/*------------------------------------------Set Automaticly------------------------------------------------*/

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
    useCurrent: true //may cause problem see datetimepicker issue #1075
  });

  $("#datetimepicker-from").on("dp.change", function(e) {
    $('#datetimepicker-to').data("DateTimePicker").minDate(e.date);
  });
  $("#datetimepicker-to").on("dp.change", function(e) {
    $('#datetimepicker-from').data("DateTimePicker").maxDate(e.date);
  });
});


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
  //alert(DD+"-"+M+"-"+YYYY);
}


$(document).ready(function() {
  var table = $('#DataTable1').DataTable({
    responsive: true,
    "ordering": false,
    "dom": "t",
    lengthChange: false,
  });
});



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



/*------------------------------------------Event Actions------------------------------------------------*/



$(document).ready(function() {

  /*----------On Change in input type Cr.NO Or Bill No. starts---------------------------------*/
  $('#inputTypeBC').change(function() {
    var inputTypeBC = $(this).val();

    /*inputTypeBC 1 is that search made on bill no.*/
    if (inputTypeBC == 1) {

      $('#crNoInput').css({
        "display": "none"
      });
      $('#billNoInput').css({
        "display": ""
      });

      $('.inputDates').css({
        "display": "none"
      });
      showHideLoding("no");
    }

    /*inputTypeBC 2 that is search made on Cr. no.*/
    else if (inputTypeBC == 2) {

      $('#billNoInput').css({
        "display": "none"
      });
      $('#crNoInput').css({
        "display": ""
      });

      $('.inputDates').css({
        "display": ""
      });
      showHideLoding("no");
    }

  });

  /*----------On Change in input type Cr.NO Or Bill No. Ends---------------------------------*/


  /*----------On Click Getdata Button starts---------------------------------*/
  $('#getData').click(function() {

    //show loding animation
    showHideLoding("yes");

    var inputTypeBC = $('#inputTypeBC').val();

    /*inputTypeBC 1 is that search made on bill no.*/
    if (inputTypeBC == 1) {

      var billNo = $('#billNoInput').val();

      if (billNo.length == 15) {
        $('#patDetails').css({
          "display": ""
        });
        $('#patReqnListOnCrNo').css({
          "display": "none"
        });
        $('#patReqnListOnBillNo').css({
          "display": ""
        });

        AjaxGetPatDetailsOnBillNo(billNo);
        AjaxGetReqnListOnBillNo(billNo);
        //  AjaxGetPatientBasedReqnListOnBillNo(billNo);
      } else {

        alert("Bill No. Should Be Of 15 Digits");
        $('#billNoInput').focus();
        showHideLoding("no");
      }

    }

    /*inputTypeBC 2 that is search made on Cr. no.*/
    else if (inputTypeBC == 2) {

      var crNo = $('#crNoInput').val();

      if (crNo.length == 15) {
        $('#patDetails').css({
          "display": ""
        });
        $('#patReqnListOnBillNo').css({
          "display": "none"
        });
        $('#patReqnListOnCrNo').css({
          "display": ""
        });

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
function showHideLoding(showBoolean) {

  if (showBoolean == "yes") {
    $('#getData').css({
      "display": "none"
    });
    $('#getingData').css({
      "display": ""
    });
  } else if (showBoolean == "no") {
    $('#getingData').css({
      "display": "none"
    });
    $('#getData').css({
      "display": ""
    });
  } else {
    $('#getingData').css({
      "display": "none"
    });
    $('#getData').css({
      "display": ""
    });
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

$(document).ready(function() {
  setInputFilter(document.getElementById("billNoInput"), function(value) {
    return /^\d*$/.test(value);
  });

  setInputFilter(document.getElementById("crNoInput"), function(value) {
    return /^\d*$/.test(value);
  });
});
/*------------Ristrict Only Number Input Validation End-------------------------------*/



/*---function to expand and collapse all rows on button click Starts
    Call this method for any data table to epand and collapse rows with right argument--*/
function expandColapseRow(booleanExpand, table) {

  if (booleanExpand == "yes") {
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

function AjaxGetPatDetailsOnBillNo(billNo) {

  var _mode = "AjaxGetPatDetailsOnBillNo";

  $('#DataTable1').DataTable().clear().destroy();
  var table = $('#DataTable1').DataTable({

    responsive: true,
    "ordering": false,
    //"dom": "lftipr", //show all features of dattatables
    "dom": "t", //show only table row
    lengthChange: false,

    "language": {
      "emptyTable": "No Data Is Available "
    },

    "ajax": {
      //"url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode="+_mode+"&billNo="+billNo, sync:true, postData: "", handleAs: "text",
      "url": "/data",
      sync: true,
      postData: "",
      handleAs: "text",
      error: function(jqXHR, statusText, errorThrown) {
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
        renderer: function(api, rowIdx, columns) {
          var data = $.map(columns, function(col, i) {
            return col.hidden ? customeRowDataType1(col) : '';
          }).join('');
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

function AjaxGetPatDetailsOnCrNo(crNo) {

  var _mode = "AjaxGetPatDetailsOnCrNo";

  $('#DataTable1').DataTable().clear().destroy();
  var table = $('#DataTable1').DataTable({

    responsive: true,
    "ordering": false,
    /*"dom": "lftipr", /*show all features of dattatables*/
    "dom": "t",
    /*show only table row*/
    lengthChange: false,

    "language": {
      "emptyTable": "No Data Is Available "
    },

    "ajax": {
      //"url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode="+_mode+"&crNo="+crNo, sync:true, postData: "", handleAs: "text",
      "url": "/data",
      sync: true,
      postData: "",
      handleAs: "text",
      error: function(jqXHR, statusText, errorThrown) {
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
        renderer: function(api, rowIdx, columns) {
          var data = $.map(columns, function(col, i) {
            return col.hidden ? customeRowDataType1(col) : '';
          }).join('');
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


// function AjaxGetPatReqnListOnBillNo(billNo){
function AjaxGetReqnListOnBillNo(billNo) {

  var url = "/data";
  $.getJSON(url, function(data) {
      if (data) {
        dataTableSampleBasedReqnListOnBillNo(data.sampleBasedReqnListOnBillNo);
        dataTablePatientBasedReqnListOnBillNo(data.patientBasedReqnListOnBillNo);
      }
    })
    .done(function() {
      console.log("AjaxGetMachineList success");
    })
    .fail(function() {
      console.log("AjaxGetMachineList error");
    });
}


function dataTableSampleBasedReqnListOnBillNo(sampleBasedReqnListOnBillNo) {

  $('#DataTable2').DataTable().clear().destroy();

  $.fn.dataTable.moment('DD-MMM-YYYY');
  var table = $('#DataTable2').DataTable({
    dom: 'lBfrtip',
    processing: true,

    "columnDefs": [{
      "orderable": false,
      "targets": 0
    }],

    "language": {
      "emptyTable": "No Data Is Available "
    },

    buttons: [{
        extend: 'collection',
        text: 'Trigger Tools',
        className: "btn-dark",
        buttons: [{
            extend: 'colvis',
            className: "bg-dark text-white"
          },
          {
            extend: 'excel',
            className: "bg-dark text-white"
          },
          {
            extend: 'pdfHtml5',
            className: "bg-dark text-white",
            title: 'Investigation Tracking Report',
            text: 'PDF',
            pageMargins: [0, 0, 0, 0],
            margin: [0, 0, 0, 0],
            alignment: 'center',
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
            }
          }
        ]
      },
      {
        extend: 'collection',
        text: 'Show Related Columns',
        className: "btn-success",
        buttons: [{
            extend: 'colvisGroup',
            className: "bg-dark text-white",
            text: 'Show All',
            show: ':hidden'
          },
          {
            extend: 'colvisGroup',
            className: "bg-dark text-white ",
            text: 'Requisition Raising',
            show: [1, 2, 3],
            hide: [4, 5, 6]
          },
          {
            extend: 'colvisGroup',
            className: "bg-dark text-white ",
            text: 'Sample Collection',
            show: [3, 4, 5],
            hide: [1, 2]
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

    //  "ajax": {
    //   //"url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode="+_mode+"&billNo="+billNo, sync:true, postData: "", handleAs: "text",
    //  "url": "/data", sync:true, postData: "", handleAs: "text",
    //  error: function (jqXHR, statusText, errorThrown) {
    //   console.log(jqXHR.responseText);
    //   console.log(statusText);
    //   console.log(errorThrown);
    // },
    // 	dataSrc: "patientBasedReqnListOnBillNo"
    //    },
    "aaData": sampleBasedReqnListOnBillNo,
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
    responsive: {
      details: {
        renderer: function(api, rowIdx, columns) {
          var data = customeRowDataType2(api, rowIdx, columns);
          return data ? customeRowDataAppend(data) : false;
        }
      }
    },
    "initComplete": function(settings, json) {
      //show loding animation
      showHideLoding("no");
    }
  });
  // if(sampleBasedReqnListOnBillNo!=null){
  // table.processing( false );
  // }else{
  //   table.rows().remove().draw();
  //   table.processing( true );
  // }
  // Handle click on "Epand All" button
  $('table .expandButton').on('click', function() {
    expandColapseRow("yes", table);
  });

  // Handle click on "Collapse All" button
  $('table .collapseButton').on('click', function() {
    expandColapseRow("no", table);
  });

}



function dataTablePatientBasedReqnListOnBillNo(patientBasedReqnListOnBillNo) {
  $('#DataTable3').DataTable().clear().destroy();

  $.fn.dataTable.moment('DD-MMM-YYYY');
  var table = $('#DataTable3').DataTable({

    dom: 'Bfrtip',
    "columnDefs": [{
      "orderable": false,
      "targets": 0
    }],

    "language": {
      "emptyTable": "No Data Is Available "
    },

    buttons: [{
        extend: 'collection',
        text: 'Trigger Tools',
        className: "btn-dark",
        buttons: [{
            extend: 'colvis',
            className: "bg-dark text-white"
          },
          {
            extend: 'excel',
            className: "bg-dark text-white"
          },
          {
            extend: 'pdfHtml5',
            className: "bg-dark text-white",
            title: 'Investigation Tracking Report',
            text: 'PDF',
            pageMargins: [0, 0, 0, 0],
            margin: [0, 0, 0, 0],
            alignment: 'center',
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
            }
          }
        ]
      },
      {
        extend: 'collection',
        text: 'Show Related Columns',
        className: "btn-success",
        buttons: [{
            extend: 'colvisGroup',
            className: "bg-dark text-white",
            text: 'Show All',
            show: ':hidden'
          },
          {
            extend: 'colvisGroup',
            className: "bg-dark text-white ",
            text: 'Requisition Raising',
            show: [1, 2, 3],
            hide: [4, 5, 6]
          },
          {
            extend: 'colvisGroup',
            className: "bg-dark text-white ",
            text: 'Sample Collection',
            show: [3, 4, 5],
            hide: [1, 2]
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

    //  "ajax": {
    //   //"url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode="+_mode+"&billNo="+billNo, sync:true, postData: "", handleAs: "text",
    //  "url": "/data", sync:true, postData: "", handleAs: "text",
    //  error: function (jqXHR, statusText, errorThrown) {
    //   console.log(jqXHR.responseText);
    //   console.log(statusText);
    //   console.log(errorThrown);
    // },
    // 	dataSrc: "patientBasedReqnListOnBillNo"
    //    },
    "aaData": patientBasedReqnListOnBillNo,
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
    responsive: {
      details: {
        renderer: function(api, rowIdx, columns) {
          var data = customeRowDataType2(api, rowIdx, columns);
          return data ? customeRowDataAppend(data) : false;
        }
      }
    },
    "initComplete": function(settings, json) {
      //show loding animation
      showHideLoding("no");
    }
  });

  // Handle click on "Epand All" button
  $('table .expandButton').on('click', function() {
    expandColapseRow("yes", table);
  });

  // Handle click on "Collapse All" button
  $('table .collapseButton').on('click', function() {
    expandColapseRow("no", table);
  });

}

function AjaxGetPatReqnListOnCrNo(crNo) {

  var _mode = "AjaxGetPatReqnListOnCrNo";

  var fromDate = document.getElementsByClassName("fromDateInput")[0].value;
  var toDate = document.getElementsByClassName("toDateInput")[0].value;

  $('#DataTable4').DataTable().clear().destroy();

  $.fn.dataTable.moment('DD-MMM-YYYY');
  var table = $('#DataTable4').DataTable({

    dom: 'Bfrtip',
    "columnDefs": [{
      "orderable": false,
      "targets": 0
    }],

    "language": {
      "emptyTable": "No Data Is Available "
    },

    buttons: [{
        extend: 'collection',
        text: 'Trigger Tools',
        className: "btn-dark",
        buttons: [{
            extend: 'colvis',
            className: "bg-dark text-white"
          },
          {
            extend: 'excel',
            className: "bg-dark text-white"
          },
          {
            extend: 'pdfHtml5',
            className: "bg-dark text-white",
            title: 'Investigation Tracking Report',
            text: 'PDF',
            pageMargins: [0, 0, 0, 0],
            margin: [0, 0, 0, 0],
            alignment: 'center',
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
            }
          }
        ]
      },
      {
        extend: 'collection',
        text: 'Show Related Columns',
        className: "btn-success",
        buttons: [{
            extend: 'colvisGroup',
            className: "bg-dark text-white ",
            text: 'Show All',
            show: ':hidden'
          },
          {
            extend: 'colvisGroup',
            className: "bg-dark text-white ",
            text: 'Requisition Raising',
            show: [1, 2, 3],
            hide: [4, 5, 6]
          },
          {
            extend: 'colvisGroup',
            className: "bg-dark text-white ",
            text: 'Sample Collection',
            show: [3, 4, 5],
            hide: [1, 2]
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
      //"url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode="+_mode+"&crNo="+crNo+"&fromDate="+fromDate+"&toDate="+toDate, sync:true, postData: "", handleAs: "text",
      "url": "/data",
      sync: true,
      postData: "",
      handleAs: "text",
      error: function(jqXHR, statusText, errorThrown) {
        console.log(jqXHR.responseText);
        console.log(statusText);
        console.log(errorThrown);
      },
      dataSrc: "patReqnListOnCrNo"
    },
    "columns": [{
        "data": 'sno'
      },
      {
        "data": 'billNo'
      },
      {
        "data": 'reportStatus'
      },
      {
        "data": 'groupName'
      },
      {
        "data": 'testName'
      },
      {
        "data": 'sampleName'
      },
      {
        "data": 'sampleNum'
      },
      {
        "data": 'labNum'
      },
      {
        "data": 'status'
      },
      {
        "data": 'labName'
      },
      {
        "data": 'reqDate'
      },
      {
        "data": 'department'
      },
      {
        "data": 'wardName'
      },
      {
        "data": 'reqDate'
      },
      {
        "data": 'department'
      },
      {
        "data": 'wardName'
      }
    ],
    "sPaginationType": "full_numbers",
    "bJQueryUI": true,
    "scrollX": true,

    responsive: {
      details: {
        renderer: function(api, rowIdx, columns) {
          var data = customeRowDataType2(api, rowIdx, columns);
          return data ? customeRowDataAppend(data) : false;
        }
      }
    },
    "initComplete": function(settings, json) {
      //show loding animation
      showHideLoding("no");
    }
  });


  // Handle click on "Epand All" button
  $('table .expandButton').on('click', function() {
    expandColapseRow("yes", table);
  });

  // Handle click on "Collapse All" button
  $('table .collapseButton').on('click', function() {
    expandColapseRow("no", table);
  });

}

function AjaxGetReqDetails() {
  var _mode = "AjaxGetReqDetails";
}

/*------------------------------------------Ajax Calls Ends------------------------------------------------*/

/*----Responsive Table Rows According To Screen Size Type 1 Starts--------------------*/
var crcount = 0;
var crcount2 = 0;

function customeRowDataType1(col) {
  var tbdat = '';
  var w = window.innerWidth;
  var h = window.innerHeight;
  if (w >= 1100) {
    tbdat = customeRowDataType11(col);
  } else if (w < 1100 && w > 800) {
    tbdat = customeRowDataType12(col);
  } else if (w < 800 && w > 600) {
    tbdat = customeRowDataType13(col);
  } else if (w <= 600) {
    tbdat = customeRowDataType14(col);
  }
  return tbdat;
}

function customeRowDataType11(col) {
  var tbdat = '';
  if (crcount == 0) {
    tbdat = '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">';
    crcount++;
  }
  tbdat += '<th>' + col.title + ':' + '</th> ' +
    '<td>' + col.data + '</td>';
  return tbdat;
}

function customeRowDataType12(col) {
  var tbdat = '';
  if (crcount == 0) {
    tbdat = '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">';
    crcount++;
  }

  if (crcount2 >= 3) {
    tbdat = '</tr><tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">';
    crcount2 = 0;
    //crcount++;
  }

  tbdat += '<th>' + col.title + ':' + '</th> ' +
    '<td>' + col.data + '</td>';
  crcount2++;

  return tbdat;
}

function customeRowDataType13(col) {
  var tbdat = '';
  if (crcount == 0) {
    tbdat = '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">';
    crcount++;
  }

  if (crcount2 >= 2) {
    tbdat = '</tr><tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">';
    crcount2 = 0;
    //crcount++;
  }

  tbdat += '<th>' + col.title + ':' + '</th> ' +
    '<td>' + col.data + '</td>';
  crcount2++;

  return tbdat;
}

function customeRowDataType14(col) {
  var tbdat = '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
    '<th>' + col.title + ':' + '</th> ' +
    '<td>' + col.data + '</td>' +
    '</tr>';
  return tbdat;
}
/*----Responsive Table Rows According To Screen Size Type 1 Ends--------------------*/


/*------Responsive Table Rows According To Screen Size Type 2 Ends------------*/
function customeRowDataType2(api, rowIdx, columns) {
  var tbdat = '';
  var w = window.innerWidth;
  var h = window.innerHeight;
  if (w >= 1100) {
    tbdat = customeRowDataType21(api, rowIdx, columns);
  } else if (w < 1100 && w > 800) {
    tbdat = customeRowDataType22(api, rowIdx, columns);
  } else if (w < 800 && w > 600) {
    tbdat = customeRowDataType23(api, rowIdx, columns);
  } else if (w <= 600) {
    tbdat = customeRowDataType24(api, rowIdx, columns);
  }
  return tbdat;
}

function customeRowDataType21(api, rowIdx, columns) {
  var tbdat = '';

  tbdat = '<tr>'
  tbdat += '<td class="rounded "><div class="vertical-text">Requisition Raising</div></td>';
  tbdat += '<td class=""><table>' + dataRow(columns, 6, 8) + '</table></td>';

  tbdat += '<td class="rounded "><div class="vertical-text">Sample Collection</div></td>';
  tbdat += '<td class=""><table>' + dataRow(columns, 8, 10) + '</table></td>';

  tbdat += '<td class="rounded "><div class="vertical-text">Sample Acceptance</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 10, 12) + '</table></td>';

  tbdat += '<td class="rounded "><div class="vertical-text">Patient Acceptance</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 12, 14) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded "><div class="vertical-text">Result Entry</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 13, 15) + '</table></td>';

  tbdat += '<td class="rounded "><div class="vertical-text">Result Validation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 13, 15) + '</table></td>';
  tbdat += '</tr>'

  return tbdat;
}

function customeRowDataType22(api, rowIdx, columns) {
  var tbdat = '';

  tbdat = '<tr>'
  tbdat += '<td class="rounded "><div class="vertical-text">Requisition Raising</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 6, 8) + '</table></td>';

  tbdat += '<td class="rounded "><div class="vertical-text">Sample Collection</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 8, 10) + '</table></td>';

  tbdat += '<td class="rounded "><div class="vertical-text">Sample Acceptance</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 10, 12) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded "><div class="vertical-text">Patient Acceptance</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 12, 14) + '</table></td>';

  tbdat += '<td class="rounded "><div class="vertical-text">Result Entry</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 13, 15) + '</table></td>';

  tbdat += '<td class="rounded "><div class="vertical-text">Result Validation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 13, 15) + '</table></td>';
  tbdat += '</tr>'

  return tbdat;
}

function customeRowDataType23(api, rowIdx, columns) {
  var tbdat = '';

  /*0 to 5 as columns 0 to 5 are the columns with class not having none and
  are the max. columns defined to shown on full width screen*/
  var colHidArray = [];
  var colHidStart = "";
  var colHidEnd = "";
  var colHidBoolean = false;
  for (i = 0; i <= 5; i++) {
    if (columns[i].hidden) {
      colHidBoolean = true;
      colHidArray.push(i);
    }
  }
  colHidStart = colHidArray[0];
  colHidEnd = colHidArray[colHidArray.length - 1];

  if (colHidBoolean) {
    tbdat += '<tr>'
    tbdat += '<td class="rounded "><div class="vertical-text">Essential Data</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, colHidStart, colHidEnd) + '</table></td>';

    tbdat += '<td class="rounded "><div class="vertical-text">Requisition Raising</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 6, 8) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded "><div class="vertical-text">Sample Collection</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 8, 10) + '</table></td>';

    tbdat += '<td class="rounded "><div class="vertical-text">Sample Acceptance</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 10, 12) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded "><div class="vertical-text">Patient Acceptance</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 12, 14) + '</table></td>';

    tbdat += '<td class="rounded "><div class="vertical-text">Result Entry</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 13, 15) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded "><div class="vertical-text">Result Validation</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 13, 15) + '</table></td>';
    tbdat += '</tr>'

  } else {
    /*case when none of the default Essential columns are hidden*/

    tbdat += '<tr>'
    tbdat += '<td class="rounded "><div class="vertical-text">Requisition Raising</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 6, 8) + '</table></td>';

    tbdat += '<td class="rounded "><div class="vertical-text">Sample Collection</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 8, 10) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded "><div class="vertical-text">Sample Acceptance</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 10, 12) + '</table></td>';

    tbdat += '<td class="rounded "><div class="vertical-text">Patient Acceptance</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 12, 14) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded "><div class="vertical-text">Result Entry</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 13, 15) + '</table></td>';

    tbdat += '<td class="rounded "><div class="vertical-text">Result Validation</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 13, 15) + '</table></td>';
    tbdat += '</tr>'
  }
  return tbdat;
}

function customeRowDataType24(api, rowIdx, columns) {
  var tbdat = '';

  /*0 to 5 as columns 0 to 5 are the columns with class not having none and
  are the max. columns defined to shown on full width screen*/
  var colHidArray = [];
  var colHidStart = "";
  var colHidEnd = "";
  var colHidBoolean = false;
  for (i = 0; i <= 5; i++) {
    if (columns[i].hidden) {
      colHidBoolean = true;
      colHidArray.push(i);
    }
  }
  colHidStart = colHidArray[0];
  colHidEnd = colHidArray[colHidArray.length - 1];

  if (colHidBoolean) {
    tbdat += '<tr>'
    tbdat += '<td class="rounded "><div class="vertical-text">Essential Data</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, colHidStart, colHidEnd) + '</table></td>';
    tbdat += '</tr>'
  }

  tbdat += '<tr>'
  tbdat += '<td class="rounded "><div class="vertical-text">Requisition Raising</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 6, 8) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded "><div class="vertical-text">Sample Collection</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 8, 10) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded "><div class="vertical-text">Sample Acceptance</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 10, 12) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded "><div class="vertical-text">Patient Acceptance</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 12, 14) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded "><div class="vertical-text">Result Entry</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 13, 15) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded "><div class="vertical-text">Result Validation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 13, 15) + '</table></td>';
  tbdat += '</tr>'

  return tbdat;
}

function dataRow(columns, iStart, iEnd) {
  var dataRow = '';

  for (i = iStart; i <= iEnd; i++) {
    var col = columns[i];

    dataRow += '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">';
    dataRow += '<th>' + col.title + ':' + '</th> ' + '<td>' + col.data + '</td>';
    dataRow += '</tr>';
  }
  return dataRow;
}
/*------Responsive Table Rows According To Screen Size Type 2 Ends------------*/

function customeRowDataAppend(data) {
  crcount = 0;
  crcount2 = 0;
  //data+='</tr>';
  var rt = $('<table/>').append(data);
  return rt;
}
/*----Responsive Table Rows According To Screen Size final return type1,2 Ends--------------------*/

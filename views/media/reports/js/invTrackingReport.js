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
  //alert(DD+"-"+M+"-"+YYYY);
}

/*-Initialise patient deatils datatable before ajax response-*/
$(document).ready(function() {
  var table = $('#DataTable1').DataTable({
    responsive: true,
    "ordering": false,
    "dom": "t",
    lengthChange: false,
  });
});

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
  $("[aria-controls='sampleBasedTabBillNo']").click(function() {
    $('#DataTable2').DataTable().columns.adjust().responsive.recalc();
  });
  $("[aria-controls='patientBasedTabBillNo']").click(function() {
    $('#DataTable3').DataTable().columns.adjust().responsive.recalc();
  });
  $("[aria-controls='sampleBasedTabCrNo']").click(function() {
    $('#DataTable4').DataTable().columns.adjust().responsive.recalc();
  });
  $("[aria-controls='patientBasedTabCrNo']").click(function() {
    $('#DataTable5').DataTable().columns.adjust().responsive.recalc();
  });
});

/*------------------------------------------Set Automaticly---------------------------------------------------------------------------------------------------*/


/*------------------------------------------Event Actions starts----------------------------------------------------------------------------------------------*/

/*----------On Change in input type Cr.NO Or Bill No. Or Sample No. starts--------------------*/
$(document).ready(function() {

  $('#inputTypeBC').change(function() {
    var inputTypeBCSL = $(this).val();

    /*inputTypeBC 1 is that search made on bill no.*/
    if (inputTypeBC == 1) {

      $('#billNoInput').css({
        "display": ""
      });

      $('#crNoInput').css({
        "display": "none"
      });

      $('#sampleNoInput').css({
        "display": "none"
      });

      $('#labNoInput').css({
        "display": "none"
      });

      showHideLoding("no");
    }

    /*inputTypeBC 2 that is search made on Cr. no.*/
    else if (inputTypeBCSL == 2) {

      $('#billNoInput').css({
        "display": "none"
      });

      $('#crNoInput').css({
        "display": ""
      });

      $('#sampleNoInput').css({
        "display": "none"
      });

      $('#labNoInput').css({
        "display": "none"
      });

      showHideLoding("no");
    }

    /*inputTypeBC 3 that is search made on sample. no.*/
    else if (inputTypeBCSL == 3) {

      $('#billNoInput').css({
        "display": "none"
      });

      $('#crNoInput').css({
        "display": "none"
      });

      $('#sampleNoInput').css({
        "display": ""
      });

      $('#labNoInput').css({
        "display": "none"
      });

      showHideLoding("no");
    }

    /*inputTypeBC 3 that is search made on sample. no.*/
    else if (inputTypeBCSL == 4) {

      $('#billNoInput').css({
        "display": "none"
      });

      $('#crNoInput').css({
        "display": "none"
      });

      $('#sampleNoInput').css({
        "display": "none"
      });

      $('#labNoInput').css({
        "display": ""
      });

      showHideLoding("no");
    }

  });
});
/*----------On Change in input type Cr.NO Or Bill No. Or Sample No.Ends-----------------------*/

/*----------On Click Getdata Button starts----------------------------------------------------*/
$(document).ready(function() {

  $('#getData').click(function() {

    //show loding animation
    showHideLoding("yes");

    var inputTypeBC = $('#inputTypeBC').val();

    /*inputTypeBC 1 search made on bill no.*/
    if (inputTypeBC == 1) {

      var billNo = $('#billNoInput').val();

      if (billNo.length == 15) {
        $('#patDetails').css({
          "display": ""
        });
        $('#patReqnListOnCrNo').css({
          "display": "none"
        });
        $('#patReqnListOnSampleORLabNo').css({
          "display": "none"
        });
        $('#patReqnListOnBillNo').css({
          "display": ""
        });

        AjaxGetPatDetailsOnBillNo(billNo);
        AjaxGetReqnListOnBillNo(billNo);
      } else {

        alert("Bill No. Should Be Of 15 Digits");
        $('#billNoInput').focus();
        showHideLoding("no");
      }

    }

    /*inputTypeBC 2 search made on Cr. no.*/
    else if (inputTypeBC == 2) {

      var crNo = $('#crNoInput').val();

      if (crNo.length == 15) {
        $('#patDetails').css({
          "display": ""
        });
        $('#patReqnListOnBillNo').css({
          "display": "none"
        });
        $('#patReqnListOnSampleORLabNo').css({
          "display": "none"
        });
        $('#patReqnListOnCrNo').css({
          "display": ""
        });

        AjaxGetPatDetailsOnCrNo(crNo);
        AjaxGetReqnListOnCrNo(crNo);
      } else {

        alert("Cr. No. Should Be Of 15 Digits");
        $('#crNoInput').focus();
        showHideLoding("no");
      }
    }

    /*inputTypeBC 3 search made on sample. no.*/
    else if (inputTypeBC == 3) {

      var sampleNo = $('#sampleNoInput').val();

      if (sampleNo.length <= 10) {
        $('#patDetails').css({
          "display": ""
        });
        $('#patReqnListOnBillNo').css({
          "display": "none"
        });
        $('#patReqnListOnSampleORLabNo').css({
          "display": ""
        });
        $('#patReqnListOnCrNo').css({
          "display": "none"
        });

        AjaxGetPatDetailsOnSampleNo(sampleNo);
        AjaxGetReqnListOnSampleNo(sampleNo);

      } else {

        alert("Sample No. Should Be Less Then 10 Digits");
        $('#sampleNoInput').focus();
        showHideLoding("no");
      }
    }

    /*inputTypeBC 4 search made on Lab. no.*/
    else if (inputTypeBC == 4) {

      var labNo = $('#labNoInput').val();

      if (labNo.length <= 10) {
        $('#patDetails').css({
          "display": ""
        });
        $('#patReqnListOnBillNo').css({
          "display": "none"
        });
        $('#patReqnListOnSampleORLabNo').css({
          "display": ""
        });
        $('#patReqnListOnCrNo').css({
          "display": "none"
        });

        AjaxGetPatDetailsOnLabNo(labNo);
        AjaxGetReqnListOnLabNo(labNo);

      } else {

        alert("Lab No. Should Be Less Then 10 Digits");
        $('#sampleNoInput').focus();
        showHideLoding("no");
      }
    }

  });
});
/*----------On Click Getdata Button Ends------------------------------------------------------*/

/*----------On Change in Archival Radio Show From to Months for archival search Starts--------*/
$(document).ready(function() {
  $('.dataFromArchival').change(function() {
    var dataFromArchival = $('.dataFromArchival:checked').val();
    if (dataFromArchival == 0) {
      $('.inputDates').css({
        "display": "none"
      });
    }
    else if (dataFromArchival == 1) {
      $('.inputDates').css({
        "display": ""
      });
    }
  });

  // $("input[name=dataFromMonth]").change(function ()
  // { alert("type2 "+this.value); });
});
/*----------On Change in Archival Radio Show From to Months for archival search Ends----------*/

/*----------On Button Click Show From to Months for archival search Starts--------------------*/
$(document).ready(function() {
  $('#btnDataFromArchival1').click(function (){
      $('.inputDates').css({
        "display": ""
      });
      $('.divArchivalbtn1').css({
        "display": "none"
      });
      $('.divArchivalbtn2').css({
        "display": ""
      });
  });
  $('#btnDataFromArchival2').click(function (){
      $('.inputDates').css({
        "display": "none"
      });
      $('.divArchivalbtn2').css({
        "display": "none"
      });
      $('.divArchivalbtn1').css({
        "display": ""
      });
  });
});
/*----------On Button Click Show From to Months for archival search Ends----------------------*/

/*----------Loding Button Animation On Click Getdata Button starts----------------------------*/
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
/*----------Loding Button Animation On Click Getdata Button starts----------------------------*/

/*----------Ristrict Only Number Input Validation Start---------------------------------------*/
$(document).ready(function() {
  setInputFilter(document.getElementById("billNoInput"), function(value) {
    return /^\d*$/.test(value);
  });

  setInputFilter(document.getElementById("crNoInput"), function(value) {
    return /^\d*$/.test(value);
  });
});

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
/*----------Ristrict Only Number Input Validation End-----------------------------------------*/

/*----------Function to expand and collapse all DataTable rows on button click Starts---------*/
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
/*----------Function to expand and collapse all rows on button click Ends---------------------*/

/*------------------------------------------Event Actions Ends------------------------------------------------------------------------------------------------*/


/*------------------------------------------Ajax Calls Starts-------------------------------------------------------------------------------------------------*/

var globalPatientDetailsOnBillNo = null;
var globalPatientDetailsOnCrNo = null;
var globalPatientDetailsOnSampleNo = null;
var globalPatientDetailsOnLabNo = null;

var globalSampleBasedReqnListOnBillNo = null;
var globalPatientBasedReqnListOnBillNo = null;

var globalSampleBasedReqnListOnCrNo = null;
var globalPatientBasedReqnListOnCrNo = null;

var globalSampleBasedReqnListOnSampleNo = null;
var globalPatientBasedReqnListOnLabNo = null;

function AjaxGetPatDetailsOnBillNo(billNo) {

  var _mode = "AjaxGetPatDetailsOnBillNo";

  $('#DataTable1').DataTable().clear().destroy();
  var table = $('#DataTable1').DataTable({

    responsive: true,
    "ordering": false,
    "dom": "t", //show only table row
    lengthChange: false,

    "language": {
      "emptyTable": "No Data Is Available "
    },

    "ajax": {
      "url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode=" + _mode + "&billNo=" + billNo,
      sync: true,
      postData: "",
      handleAs: "text",
      //"url": "/data",
      sync: true,
      postData: "",
      handleAs: "text",
      error: function( jqxhr, textStatus, error ) {
      console.log("AjaxGetPatDetailsOnBillNo Failed | ResponseError Is Below");
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
      },
      dataSrc: "patDetailsOnBillNo"
    },
    "columns": [{
        "data": 'patientName'
      },
      {
        "data": 'crNumber'
      },
      {
        "data": 'patientStatus'
      },
      {
        "data": 'patientStatus'
      },
      {
        "data": 'ageGender'
      },
      {
        "data": 'phoneNo'
      },
      {
        "data": 'emailId'
      },
      {
        "data": 'latestBillNo'
      },
      {
        "data": 'memberSince'
      },
      {
        "data": 'totalPaymentsDone'
      },
      {
        "data": 'pendingPayments'
      },
      {
        "data": 'address'
      },
      {
        "data": 'note'
      }
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

    "initComplete": function(settings, json) {
      globalPatientDetailsOnBillNo=json;
      console.log("AjaxGetPatDetailsOnBillNo success | ResponseData Is Below");
      console.log(json);
      //show loding animation
      //showHideLoding("no");
    }
  });


}

function AjaxGetPatDetailsOnCrNo(crNo) {

  var _mode = "AjaxGetPatDetailsOnCrNo";

  $('#DataTable1').DataTable().clear().destroy();
  var table = $('#DataTable1').DataTable({

    responsive: true,
    "ordering": false,
    "dom": "t",
    /*show only table row*/
    lengthChange: false,

    "language": {
      "emptyTable": "No Data Is Available "
    },

    "ajax": {
      "url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode=" + _mode + "&crNo=" + crNo,
      sync: true,
      postData: "",
      handleAs: "text",
      //"url": "/data",
      sync: true,
      postData: "",
      handleAs: "text",
      error: function( jqxhr, textStatus, error ) {
      console.log("AjaxGetPatDetailsOnCrNo Failed | ResponseError Is Below");
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
      },
      dataSrc: "patDetailsOnCrNo"
    },
    "columns": [{
        "data": 'patientName'
      },
      {
        "data": 'crNumber'
      },
      {
        "data": 'patientStatus'
      },
      {
        "data": 'patientStatus'
      },
      {
        "data": 'ageGender'
      },
      {
        "data": 'phoneNo'
      },
      {
        "data": 'emailId'
      },
      {
        "data": 'latestBillNo'
      },
      {
        "data": 'memberSince'
      },
      {
        "data": 'totalPaymentsDone'
      },
      {
        "data": 'pendingPayments'
      },
      {
        "data": 'address'
      },
      {
        "data": 'note'
      }
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

    "initComplete": function(settings, json) {
      globalPatientDetailsOnCrNo=json;
      console.log("AjaxGetPatDetailsOnCrNo success | ResponseData Is Below");
      console.log(json);
      //show loding animation
      //showHideLoding("no");
    }

  });

}

function AjaxGetPatDetailsOnSampleNo(sampleNo) {

  var _mode = "AjaxGetPatDetailsOnSampleNo";

  $('#DataTable1').DataTable().clear().destroy();
  var table = $('#DataTable1').DataTable({

    responsive: true,
    "ordering": false,
    "dom": "t",
    /*show only table row*/
    lengthChange: false,

    "language": {
      "emptyTable": "No Data Is Available "
    },

    "ajax": {
      "url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode=" + _mode + "&sampleNo=" + sampleNo,
      sync: true,
      postData: "",
      handleAs: "text",
      //"url": "/data",
      sync: true,
      postData: "",
      handleAs: "text",
      error: function( jqxhr, textStatus, error ) {
        console.log("AjaxGetPatDetailsOnSampleNo Failed | ResponseError Is Below");
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
      },
      dataSrc: "patDetailsOnSampleNo"
    },
    "columns": [{
        "data": 'patientName'
      },
      {
        "data": 'crNumber'
      },
      {
        "data": 'patientStatus'
      },
      {
        "data": 'patientStatus'
      },
      {
        "data": 'ageGender'
      },
      {
        "data": 'phoneNo'
      },
      {
        "data": 'emailId'
      },
      {
        "data": 'latestBillNo'
      },
      {
        "data": 'memberSince'
      },
      {
        "data": 'totalPaymentsDone'
      },
      {
        "data": 'pendingPayments'
      },
      {
        "data": 'address'
      },
      {
        "data": 'note'
      }
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

    "initComplete": function(settings, json) {
      globalPatientDetailsOnSampleNo=json;
      console.log("AjaxGetPatDetailsOnSampleNo success | ResponseData Is Below");
      console.log(json);
      //show loding animation
      //showHideLoding("no");
    }

  });

}

function AjaxGetPatDetailsOnLabNo(labNo) {

  var _mode = "AjaxGetPatDetailsOnLabNo";

  $('#DataTable1').DataTable().clear().destroy();
  var table = $('#DataTable1').DataTable({

    responsive: true,
    "ordering": false,
    "dom": "t",
    /*show only table row*/
    lengthChange: false,

    "language": {
      "emptyTable": "No Data Is Available "
    },

    "ajax": {
      "url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode=" + _mode + "&labNo=" + labNo,
      sync: true,
      postData: "",
      handleAs: "text",
      //"url": "/data",
      sync: true,
      postData: "",
      handleAs: "text",
      error: function( jqxhr, textStatus, error ) {
        console.log("AjaxGetPatDetailsOnLabNo Failed | ResponseError Is Below");
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
      },
      dataSrc: "patDetailsOnSampleNo"
    },
    "columns": [{
        "data": 'patientName'
      },
      {
        "data": 'crNumber'
      },
      {
        "data": 'patientStatus'
      },
      {
        "data": 'patientStatus'
      },
      {
        "data": 'ageGender'
      },
      {
        "data": 'phoneNo'
      },
      {
        "data": 'emailId'
      },
      {
        "data": 'latestBillNo'
      },
      {
        "data": 'memberSince'
      },
      {
        "data": 'totalPaymentsDone'
      },
      {
        "data": 'pendingPayments'
      },
      {
        "data": 'address'
      },
      {
        "data": 'note'
      }
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

    "initComplete": function(settings, json) {
      globalPatientDetailsOnLabNo=json;
      console.log("AjaxGetPatDetailsOnLabNo success | ResponseData Is Below");
      console.log(json);
      //show loding animation
      //showHideLoding("no");
    }

  });

}


function AjaxGetReqnListOnBillNo(billNo) {
  globalSampleBasedReqnListOnBillNo = null;
  globalPatientBasedReqnListOnBillNo = null;
  var _mode = "AjaxGetReqnListOnBillNo";
  var dataFromArchival = $('.dataFromArchival:checked').val();
  var fromDate = document.getElementsByClassName("fromDateInput")[0].value;
  var toDate = document.getElementsByClassName("toDateInput")[0].value;

  var url = "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode=" +_mode+ "&billNo=" +billNo+ "&dataFromArchival=" +dataFromArchival+
  "&fromDate=" +fromDate+ "&toDate=" +toDate;
  //var url = "/data";

  $.getJSON(url, function(data) {
      if (data) {
        globalSampleBasedReqnListOnBillNo = data.sampleBasedReqnListOnBillNo;
        globalPatientBasedReqnListOnBillNo = data.patientBasedReqnListOnBillNo;

        dataTableSampleBasedReqnListOnBillNo(data.sampleBasedReqnListOnBillNo);
        dataTablePatientBasedReqnListOnBillNo(data.patientBasedReqnListOnBillNo);
      }
    })
    .done(function(data) {
      console.log("AjaxGetReqnListOnBillNo success | ResponseData Is Below");
      console.log(data);
    })
    .fail(function( jqxhr, textStatus, error ) {
      console.log("AjaxGetReqnListOnBillNo Failed | ResponseError Is Below");
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    });
}

function AjaxGetReqnListOnCrNo(crNo) {
  globalSampleBasedReqnListOnCrNo = null;
  globalPatientBasedReqnListOnCrNo = null;
  var _mode = "AjaxGetReqnListOnCrNo";
  //var dataFromArchival = $('.dataFromArchival:checked').val();
  var dataFromArchival="0";
  if($('.inputDates').is(":hidden")){
    dataFromArchival="0";
  } else {
    dataFromArchival="1";
  }

  var fromDate = document.getElementsByClassName("fromDateInput")[0].value;
  var toDate = document.getElementsByClassName("toDateInput")[0].value;

  var url = "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode=" + _mode + "&crNo=" + crNo + "&dataFromArchival=" +dataFromArchival+
  "&fromDate=" +fromDate+ "&toDate=" +toDate;
  //var url = "/data";
  $.getJSON(url, function(data) {
      if (data) {
        globalSampleBasedReqnListOnCrNo = data.sampleBasedReqnListOnCrNo;
        globalPatientBasedReqnListOnCrNo = data.patientBasedReqnListOnCrNo;

        dataTableSampleBasedReqnListOnCrNo(data.sampleBasedReqnListOnCrNo);
        dataTablePatientBasedReqnListOnCrNo(data.patientBasedReqnListOnCrNo);
      }
    })
    .done(function(data) {
      console.log("AjaxGetReqnListOnCrNo success | ResponseData Is Below");
      console.log(data);
    })
    .fail(function( jqxhr, textStatus, error ) {
      console.log("AjaxGetReqnListOnCrNo Failed | ResponseError Is Below");
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    });
}

function AjaxGetReqnListOnSampleNo(sampleNo) {
  globalSampleBasedReqnListOnSampleNo = null;
  var _mode = "AjaxGetReqnListOnSampleNo";
  var dataFromArchival = $('.dataFromArchival:checked').val();
  var fromDate = document.getElementsByClassName("fromDateInput")[0].value;
  var toDate = document.getElementsByClassName("toDateInput")[0].value;

  var url = "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode=" + _mode + "&sampleNo=" + sampleNo + "&dataFromArchival=" +dataFromArchival+
  "&fromDate=" +fromDate+ "&toDate=" +toDate;
  //var url = "/data";

  $.getJSON(url, function(data) {
      if (data) {
        globalSampleBasedReqnListOnSampleNo = data.sampleBasedReqnListOnSampleNo;

        dataTableSampleBasedReqnListOnSampleNo(data.sampleBasedReqnListOnSampleNo);
      }
    })
    .done(function(data) {
      console.log("AjaxGetReqnListOnSampleNo success | ResponseData Is Below");
      console.log(data);
    })
    .fail(function( jqxhr, textStatus, error ) {
      console.log("AjaxGetReqnListOnSampleNo Failed | ResponseError Is Below");
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    });
}

function AjaxGetReqnListOnLabNo(labNo) {
  globalPatientBasedReqnListOnLabNo = null;
  var _mode = "AjaxGetReqnListOnLabNo";
  var dataFromArchival = $('.dataFromArchival:checked').val();
  var fromDate = document.getElementsByClassName("fromDateInput")[0].value;
  var toDate = document.getElementsByClassName("toDateInput")[0].value;

  var url = "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode=" + _mode + "&labNo=" + labNo + "&dataFromArchival=" +dataFromArchival+
  "&fromDate=" +fromDate+ "&toDate=" +toDate;
  //var url = "/data";

  $.getJSON(url, function(data) {
      if (data) {
        globalPatientBasedReqnListOnLabNo = data.patientBasedReqnListOnlabNo;

        dataTablePatientBasedReqnListOnlabNo(data.patientBasedReqnListOnlabNo);
      }
    })
    .done(function(data) {
      console.log("AjaxGetReqnListOnLabNo success | ResponseData Is Below");
      console.log(data);
    })
    .fail(function( jqxhr, textStatus, error ) {
      console.log("AjaxGetReqnListOnLabNo Failed | ResponseError Is Below");
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    });
}

function AjaxGetReqDetails() {
  var _mode = "AjaxGetReqDetails";
}

/*------------------------------------------Ajax Calls Ends---------------------------------------------------------------------------------------------------*/



/*------------------------------------------DataTables Initialization starts----------------------------------------------------------------------------------*/

function dataTableSampleBasedReqnListOnBillNo(sampleBasedReqnListOnBillNo) {

  var groupColumn = 1;

  $('#DataTable2').DataTable().clear().destroy();

  $.fn.dataTable.moment('DD-MMM-YYYY HH:mm');
  var table = $('#DataTable2').DataTable({
    //dom: 'lBfrtip',
    "dom": '<"row no-gutters row-no-gutters"<"col-md-4"l><"col-md-4 "B><"col-md-4 "f>>rt<"row"<"col-md-6"i><"col-md-6"p>><"clear">',
    processing: true,

    "columnDefs": [{
        "orderable": false,
        "targets": 0
      },
      {
        "visible": false,
        "targets": groupColumn
      }
    ],
    "order": [[ 1, "desc" ]],
    "language": {
      "emptyTable": "No Data Is Available "
    },
    "order": [
      [groupColumn, 'asc']
    ],
    "drawCallback": function(settings) {
      var api = this.api();
      var rows = api.rows({
        page: 'current'
      }).nodes();
      var last = null;

      api.column(groupColumn, {
        page: 'current'
      }).data().each(function(group, i) {
        if (last !== group) {
          $(rows).eq(i).before(
            '<tr class="group"><td colspan="6" class="ctmBorderBottom"><strong>Requisition Date : </strong>' + group + '</td></tr>'
          );

          last = group;
        }
      });
    },
    buttons: [{
      extend: 'collection',
      text: '',
      className: "fas fa-cogs text-primary btn-lg bg-white btn-outline-light",
      buttons: [{
          extend: 'excel',
          title: 'Investigation Tracking Report',
          text: ' Excel',
          className: "fas fa-file-excel text-primary bg-white btn-outline-light"
        },
        {
          extend: 'pdfHtml5',
          className: "fas fa-file-pdf text-primary bg-white btn-outline-light",
          title: 'Investigation Tracking Report',
          text: ' Pdf',
          pageMargins: [0, 0, 0, 0],
          margin: [0, 0, 0, 0],
          alignment: 'center',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
              17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
            ]
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
    }, ],

    //  "ajax": {
    //   //"url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode="+_mode+"&billNo="+billNo, sync:true, postData: "", handleAs: "text",
    //  "url": "/data", sync:true, postData: "", handleAs: "text",
    //  error: function (jqXHR, statusText, errorThrown) {
    //   console.log(jqXHR.responseText);
    //   console.log(statusText);
    //   console.log(errorThrown);
    // },
    // 	dataSrc: "sampleBasedReqnListOnBillNo"
    //    },
    "aaData": sampleBasedReqnListOnBillNo,
    "columns": [{
        "data": 'sno'
      },
      {
        "data": 'requisitionDate'
      },
      {
        "data": 'labName'
      },
      {
        "data": 'groupNameTestName'
      },
      {
        "data": 'advisedByDoc'
      },
      {
        "data": 'billDate'
      },
      {
        "data": 'requisitionStatus'
      },

      {
        "data": 'requisitionDate'
      },
      {
        "data": 'requisitionBy'
      },
      {
        "data": 'groupNameTestName'
      },
      {

        "data": 'appointmentDate'
      },
      {
        "data": 'billNo'
      },

      {
        "data": 'sampleName'
      },
      {
        "data": 'sampleNo'
      },
      {
        "data": 'sampleCollDate'
      },
      {
        "data": 'sampleCollBy'
      },

      {
        "data": 'packingListNo'
      },
      {
        "data": 'labNo'
      },
      {
        "data": 'packingListDateTime'
      },
      {
        "data": 'packingListBy'
      },

      {
        "data": 'labNo'
      },
      {
        "data": 'sampleAccepDate'
      },
      {
        "data": 'sampleAccepBy'
      },
      {
        "data": 'sampleAccepMode'
      },
      {
        "data": 'machineName'
      },

      {
        "data": 'sampleRejecDate'
      },
      {
        "data": 'sampleRejecBy'
      },
      {
        "data": 'sampleRejecReason'
      },

      {
        "data": 'resultEntryDate'
      },
      {
        "data": 'resultEntryBy'
      },
      {
        "data": 'resultEntryParam'
      },
      {
        "data": 'resultValidDate'
      },
      {
        "data": 'resultValidBy'
      },

      {
        "data": 'reportGenerationDate'
      },
      {
        "data": 'reportPrintDate'
      },
      {
        "data": 'reportPrintBy'
      }
    ],

    "sPaginationType": "full_numbers",
    "bJQueryUI": true,
    responsive: {
      details: {
        renderer: function(api, rowIdx, columns) {
          var data = customeRowSmType2(api, rowIdx, columns);
          return data ? customeRowDataAppend(data) : false;
        }
      }
    },
    "initComplete": function(settings, json) {
      //show loding animation
      showHideLoding("no");
    }
  });

  //show hide processing message
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

  // Order by the grouping
  $('#DataTable2 tbody').on('click', 'tr.group', function() {
    var currentOrder = table.order()[0];
    if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
      table.order([groupColumn, 'desc']).draw();
    } else {
      table.order([groupColumn, 'asc']).draw();
    }
  });

}

function dataTablePatientBasedReqnListOnBillNo(patientBasedReqnListOnBillNo) {
  var groupColumn = 1;
  $('#DataTable3').DataTable().clear().destroy();

  $.fn.dataTable.moment('DD-MMM-YYYY HH:mm');
  var table = $('#DataTable3').DataTable({

    //dom: 'lBfrtip',
    "dom": '<"row"<"col-md-4"l><"col-md-4"B><"col-md-4"f>>rt<"row"<"col-md-6"i><"col-md-6"p>><"clear">',
    processing: true,

    "columnDefs": [{
        "orderable": false,
        "targets": 0
      },
      {
        "visible": false,
        "targets": groupColumn
      }
    ],
    "order": [[ 1, "desc" ]],
    "language": {
      "emptyTable": "No Data Is Available "
    },
    "order": [
      [groupColumn, 'asc']
    ],
    "drawCallback": function(settings) {
      var api = this.api();
      var rows = api.rows({
        page: 'current'
      }).nodes();
      var last = null;

      api.column(groupColumn, {
        page: 'current'
      }).data().each(function(group, i) {
        if (last !== group) {
          $(rows).eq(i).before(
            '<tr class="group"><td colspan="6" class="ctmBorderBottom"><strong>Requisition Date : </strong>' + group + '</td></tr>'
          );

          last = group;
        }
      });
    },
    buttons: [{
      extend: 'collection',
      text: '',
      className: "fas fa-cogs text-primary btn-lg bg-white btn-outline-light",
      buttons: [{
          extend: 'excel',
          title: 'Investigation Tracking Report',
          text: ' Excel',
          className: "fas fa-file-excel text-primary bg-white btn-outline-light"
        },
        {
          extend: 'pdfHtml5',
          className: "fas fa-file-pdf text-primary bg-white btn-outline-light",
          title: 'Investigation Tracking Report',
          text: ' Pdf',
          pageMargins: [0, 0, 0, 0],
          margin: [0, 0, 0, 0],
          alignment: 'center',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
              17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
            ]
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
    }, ],
    "aaData": patientBasedReqnListOnBillNo,
    "columns": [{
        "data": 'sno'
      },
      {
        "data": 'requisitionDate'
      },
      {
        "data": 'labName'
      },
      {
        "data": 'groupNameTestName'
      },
      {
        "data": 'advisedByDoc'
      },
      {
        "data": 'billDate'
      },
      {
        "data": 'requisitionStatus'
      },

      {
        "data": 'requisitionDate'
      },
      {
        "data": 'requisitionBy'
      },
      {
        "data": 'groupNameTestName'
      },
      {
        "data": 'appointmentDate'
      },
      {
        "data": 'billNo'
      },

      {
        "data": 'accessionNo'
      },
      {
        "data": 'patientAccepDate'
      },
      {
        "data": 'patientAccepBy'
      },
      {
        "data": 'patientAccepMode'
      },
      {
        "data": 'machineName'
      },

      {
        "data": 'patientRejecDate'
      },
      {
        "data": 'patientRejecBy'
      },
      {
        "data": 'patientRejecReason'
      },

      {
        "data": 'resultEntryDate'
      },
      {
        "data": 'resultEntryBy'
      },
      {
        "data": 'resultEntryParam'
      },
      {
        "data": 'resultValidDate'
      },
      {
        "data": 'resultValidBy'
      },

      {
        "data": 'reportGenerationDate'
      },
      {
        "data": 'reportPrintDate'
      },
      {
        "data": 'reportPrintBy'
      }
    ],

    "sPaginationType": "full_numbers",
    "bJQueryUI": true,
    responsive: {
      details: {
        renderer: function(api, rowIdx, columns) {
          var data = customeRowPtType2(api, rowIdx, columns);
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

  // Order by the grouping
  $('#DataTable3 tbody').on('click', 'tr.group', function() {
    var currentOrder = table.order()[0];
    if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
      table.order([groupColumn, 'desc']).draw();
    } else {
      table.order([groupColumn, 'asc']).draw();
    }
  });
}


function dataTableSampleBasedReqnListOnCrNo(sampleBasedReqnListOnCrNo) {
  var groupColumn = 1;
  $('#DataTable4').DataTable().clear().destroy();

  $.fn.dataTable.moment('DD-MMM-YYYY HH:mm');
  var table = $('#DataTable4').DataTable({

    //dom: 'lBfrtip',
    "dom": '<"row"<"col-md-4"l><"col-md-4"B><"col-md-4"f>>rt<"row"<"col-md-6"i><"col-md-6"p>><"clear">',
    processing: true,

    "columnDefs": [{
        "orderable": false,
        "targets": 0
      },
      {
        "visible": false,
        "targets": groupColumn
      }
    ],
    "order": [[ 1, "desc" ]],
    "language": {
      "emptyTable": "No Data Is Available "
    },
    "order": [
      [groupColumn, 'asc']
    ],
    "drawCallback": function(settings) {
      var api = this.api();
      var rows = api.rows({
        page: 'current'
      }).nodes();
      var last = null;

      api.column(groupColumn, {
        page: 'current'
      }).data().each(function(group, i) {
        if (last !== group) {
          $(rows).eq(i).before(
            '<tr class="group"><td colspan="6" class="ctmBorderBottom"><strong>Requisition Date : </strong>' + group + '</td></tr>'
          );

          last = group;
        }
      });
    },
    buttons: [{
      extend: 'collection',
      text: '',
      className: "fas fa-cogs text-primary btn-lg bg-white btn-outline-light",
      buttons: [{
          extend: 'excel',
          title: 'Investigation Tracking Report',
          text: ' Excel',
          className: "fas fa-file-excel text-primary bg-white btn-outline-light"
        },
        {
          extend: 'pdfHtml5',
          className: "fas fa-file-pdf text-primary bg-white btn-outline-light",
          title: 'Investigation Tracking Report',
          text: ' Pdf',
          pageMargins: [0, 0, 0, 0],
          margin: [0, 0, 0, 0],
          alignment: 'center',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
              17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
            ]
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
    }, ],

    "aaData": sampleBasedReqnListOnCrNo,
    "columns": [{
        "data": 'sno'
      },
      {
        "data": 'requisitionDate'
      },
      {
        "data": 'labName'
      },
      {
        "data": 'groupNameTestName'
      },
      {
        "data": 'advisedByDoc'
      },
      {
        "data": 'billDate'
      },
      {
        "data": 'requisitionStatus'
      },

      {
        "data": 'requisitionDate'
      },
      {
        "data": 'requisitionBy'
      },
      {
        "data": 'groupNameTestName'
      },
      {
        "data": 'appointmentDate'
      },
      {
        "data": 'billNo'
      },

      {
        "data": 'sampleName'
      },
      {
        "data": 'sampleNo'
      },
      {
        "data": 'sampleCollDate'
      },
      {
        "data": 'sampleCollBy'
      },

      {
        "data": 'packingListNo'
      },
      {
        "data": 'labNo'
      },
      {
        "data": 'packingListDateTime'
      },
      {
        "data": 'packingListBy'
      },

      {
        "data": 'labNo'
      },
      {
        "data": 'sampleAccepDate'
      },
      {
        "data": 'sampleAccepBy'
      },
      {
        "data": 'sampleAccepMode'
      },
      {
        "data": 'machineName'
      },

      {
        "data": 'sampleRejecDate'
      },
      {
        "data": 'sampleRejecBy'
      },
      {
        "data": 'sampleRejecReason'
      },

      {
        "data": 'resultEntryDate'
      },
      {
        "data": 'resultEntryBy'
      },
      {
        "data": 'resultEntryParam'
      },
      {
        "data": 'resultValidDate'
      },
      {
        "data": 'resultValidBy'
      },

      {
        "data": 'reportGenerationDate'
      },
      {
        "data": 'reportPrintDate'
      },
      {
        "data": 'reportPrintBy'
      }
    ],

    "sPaginationType": "full_numbers",
    "bJQueryUI": true,
    responsive: {
      details: {
        renderer: function(api, rowIdx, columns) {
          var data = customeRowSmType2(api, rowIdx, columns);
          return data ? customeRowDataAppend(data) : false;
        }
      }
    },
    "initComplete": function(settings, json) {
      //show loding animation
      showHideLoding("no");
    }
  });

  //show hide processing message
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

  // Order by the grouping
  $('#DataTable4 tbody').on('click', 'tr.group', function() {
    var currentOrder = table.order()[0];
    if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
      table.order([groupColumn, 'desc']).draw();
    } else {
      table.order([groupColumn, 'asc']).draw();
    }
  });

}

function dataTablePatientBasedReqnListOnCrNo(patientBasedReqnListOnCrNo) {
  var groupColumn = 1;
  $('#DataTable5').DataTable().clear().destroy();

  $.fn.dataTable.moment('DD-MMM-YYYY HH:mm');
  var table = $('#DataTable5').DataTable({

    //dom: 'lBfrtip',
    "dom": '<"row"<"col-md-4"l><"col-md-4"B><"col-md-4"f>>rt<"row"<"col-md-6"i><"col-md-6"p>><"clear">',
    processing: true,

    "columnDefs": [{
        "orderable": false,
        "targets": 0
      },
      {
        "visible": false,
        "targets": groupColumn
      }
    ],
    "order": [[ 1, "desc" ]],
    "language": {
      "emptyTable": "No Data Is Available "
    },
    "order": [
      [groupColumn, 'asc']
    ],
    "drawCallback": function(settings) {
      var api = this.api();
      var rows = api.rows({
        page: 'current'
      }).nodes();
      var last = null;

      api.column(groupColumn, {
        page: 'current'
      }).data().each(function(group, i) {
        if (last !== group) {
          $(rows).eq(i).before(
            '<tr class="group"><td colspan="6" class="ctmBorderBottom"><strong>Requisition Date : </strong>' + group + '</td></tr>'
          );

          last = group;
        }
      });
    },
    buttons: [{
      extend: 'collection',
      text: '',
      className: "fas fa-cogs text-primary btn-lg bg-white btn-outline-light",
      buttons: [{
          extend: 'excel',
          title: 'Investigation Tracking Report',
          text: ' Excel',
          className: "fas fa-file-excel text-primary bg-white btn-outline-light"
        },
        {
          extend: 'pdfHtml5',
          className: "fas fa-file-pdf text-primary bg-white btn-outline-light",
          title: 'Investigation Tracking Report',
          text: ' Pdf',
          pageMargins: [0, 0, 0, 0],
          margin: [0, 0, 0, 0],
          alignment: 'center',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
              17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
            ]
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
    }, ],
    "aaData": patientBasedReqnListOnCrNo,
    "columns": [{
        "data": 'sno'
      },
      {
        "data": 'requisitionDate'
      },
      {
        "data": 'labName'
      },
      {
        "data": 'groupNameTestName'
      },
      {
        "data": 'advisedByDoc'
      },
      {
        "data": 'billDate'
      },
      {
        "data": 'requisitionStatus'
      },

      {
        "data": 'requisitionDate'
      },
      {
        "data": 'requisitionBy'
      },
      {
        "data": 'groupNameTestName'
      },
      {
        "data": 'appointmentDate'
      },
      {
        "data": 'billNo'
      },

      {
        "data": 'accessionNo'
      },
      {
        "data": 'patientAccepDate'
      },
      {
        "data": 'patientAccepBy'
      },
      {
        "data": 'patientAccepMode'
      },
      {
        "data": 'machineName'
      },

      {
        "data": 'patientRejecDate'
      },
      {
        "data": 'patientRejecBy'
      },
      {
        "data": 'patientRejecReason'
      },

      {
        "data": 'resultEntryDate'
      },
      {
        "data": 'resultEntryBy'
      },
      {
        "data": 'resultEntryParam'
      },
      {
        "data": 'resultValidDate'
      },
      {
        "data": 'resultValidBy'
      },

      {
        "data": 'reportGenerationDate'
      },
      {
        "data": 'reportPrintDate'
      },
      {
        "data": 'reportPrintBy'
      }
    ],

    "sPaginationType": "full_numbers",
    "bJQueryUI": true,
    responsive: {
      details: {
        renderer: function(api, rowIdx, columns) {
          var data = customeRowPtType2(api, rowIdx, columns);
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

  // Order by the grouping
  $('#DataTable5 tbody').on('click', 'tr.group', function() {
    var currentOrder = table.order()[0];
    if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
      table.order([groupColumn, 'desc']).draw();
    } else {
      table.order([groupColumn, 'asc']).draw();
    }
  });

}


function dataTableSampleBasedReqnListOnSampleNo(sampleBasedReqnListOnSampleNo) {
  var groupColumn = 1;
  $('#DataTable6').DataTable().clear().destroy();

  $.fn.dataTable.moment('DD-MMM-YYYY HH:mm');
  var table = $('#DataTable6').DataTable({

    //dom: 'lBfrtip',
    "dom": '<"row"<"col-md-4"l><"col-md-4"B><"col-md-4"f>>rt<"row"<"col-md-6"i><"col-md-6"p>><"clear">',
    processing: true,

    "columnDefs": [{
        "orderable": false,
        "targets": 0
      },
      {
        "visible": false,
        "targets": groupColumn
      }
    ],
    "order": [[ 1, "desc" ]],
    "language": {
      "emptyTable": "No Data Is Available "
    },
    "order": [
      [groupColumn, 'asc']
    ],
    "drawCallback": function(settings) {
      var api = this.api();
      var rows = api.rows({
        page: 'current'
      }).nodes();
      var last = null;

      api.column(groupColumn, {
        page: 'current'
      }).data().each(function(group, i) {
        if (last !== group) {
          $(rows).eq(i).before(
            '<tr class="group"><td colspan="6" class="ctmBorderBottom"><strong>Requisition Date : </strong>' + group + '</td></tr>'
          );

          last = group;
        }
      });
    },
    buttons: [{
      extend: 'collection',
      text: '',
      className: "fas fa-cogs text-primary btn-lg bg-white btn-outline-light",
      buttons: [{
          extend: 'excel',
          title: 'Investigation Tracking Report',
          text: ' Excel',
          className: "fas fa-file-excel text-primary bg-white btn-outline-light"
        },
        {
          extend: 'pdfHtml5',
          className: "fas fa-file-pdf text-primary bg-white btn-outline-light",
          title: 'Investigation Tracking Report',
          text: ' Pdf',
          pageMargins: [0, 0, 0, 0],
          margin: [0, 0, 0, 0],
          alignment: 'center',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
              17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
            ]
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
    }, ],
    // "ajax": {
    //   "url": "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode="+_mode+"&crNo="+crNo+"&fromDate="+fromDate+"&toDate="+toDate, sync:true, postData: "", handleAs: "text",
    //   sync: true,
    //   postData: "",
    //   handleAs: "text",
    //   error: function(jqXHR, statusText, errorThrown) {
    //     console.log(jqXHR.responseText);
    //     console.log(statusText);
    //     console.log(errorThrown);
    //   },
    //   dataSrc: "patReqnListOnCrNo"
    // },
    "aaData": sampleBasedReqnListOnSampleNo,
    "columns": [{
        "data": 'sno'
      },
      {
        "data": 'requisitionDate'
      },
      {
        "data": 'labName'
      },
      {
        "data": 'groupNameTestName'
      },
      {
        "data": 'advisedByDoc'
      },
      {
        "data": 'billDate'
      },
      {
        "data": 'requisitionStatus'
      },

      {
        "data": 'requisitionDate'
      },
      {
        "data": 'requisitionBy'
      },
      {
        "data": 'groupNameTestName'
      },
      {
        "data": 'appointmentDate'
      },
      {
        "data": 'billNo'
      },

      {
        "data": 'sampleName'
      },
      {
        "data": 'sampleNo'
      },
      {
        "data": 'sampleCollDate'
      },
      {
        "data": 'sampleCollBy'
      },

      {
        "data": 'packingListNo'
      },
      {
        "data": 'labNo'
      },
      {
        "data": 'packingListDateTime'
      },
      {
        "data": 'packingListBy'
      },

      {
        "data": 'labNo'
      },
      {
        "data": 'sampleAccepDate'
      },
      {
        "data": 'sampleAccepBy'
      },
      {
        "data": 'sampleAccepMode'
      },
      {
        "data": 'machineName'
      },

      {
        "data": 'sampleRejecDate'
      },
      {
        "data": 'sampleRejecBy'
      },
      {
        "data": 'sampleRejecReason'
      },

      {
        "data": 'resultEntryDate'
      },
      {
        "data": 'resultEntryBy'
      },
      {
        "data": 'resultEntryParam'
      },
      {
        "data": 'resultValidDate'
      },
      {
        "data": 'resultValidBy'
      },

      {
        "data": 'reportGenerationDate'
      },
      {
        "data": 'reportPrintDate'
      },
      {
        "data": 'reportPrintBy'
      }
    ],

    "sPaginationType": "full_numbers",
    "bJQueryUI": true,
    responsive: {
      details: {
        renderer: function(api, rowIdx, columns) {
          var data = customeRowSmType2(api, rowIdx, columns);
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

  // Order by the grouping
  $('#DataTable6 tbody').on('click', 'tr.group', function() {
    var currentOrder = table.order()[0];
    if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
      table.order([groupColumn, 'desc']).draw();
    } else {
      table.order([groupColumn, 'asc']).draw();
    }
  });

}

function dataTablePatientBasedReqnListOnLabNo(patientBasedReqnListOnLabNo) {
  var groupColumn = 1;
  $('#DataTable7').DataTable().clear().destroy();

  $.fn.dataTable.moment('DD-MMM-YYYY HH:mm');
  var table = $('#DataTable7').DataTable({

    //dom: 'lBfrtip',
    "dom": '<"row"<"col-md-4"l><"col-md-4"B><"col-md-4"f>>rt<"row"<"col-md-6"i><"col-md-6"p>><"clear">',
    processing: true,

    "columnDefs": [{
        "orderable": false,
        "targets": 0
      },
      {
        "visible": false,
        "targets": groupColumn
      }
    ],
    "order": [[ 1, "desc" ]],
    "order": [[ 1, "desc" ]],
    "language": {
      "emptyTable": "No Data Is Available "
    },
    "order": [
      [groupColumn, 'asc']
    ],
    "drawCallback": function(settings) {
      var api = this.api();
      var rows = api.rows({
        page: 'current'
      }).nodes();
      var last = null;

      api.column(groupColumn, {
        page: 'current'
      }).data().each(function(group, i) {
        if (last !== group) {
          $(rows).eq(i).before(
            '<tr class="group"><td colspan="6" class="ctmBorderBottom"><strong>Requisition Date : </strong>' + group + '</td></tr>'
          );

          last = group;
        }
      });
    },
    buttons: [{
      extend: 'collection',
      text: '',
      className: "fas fa-cogs text-primary btn-lg bg-white btn-outline-light",
      buttons: [{
          extend: 'excel',
          title: 'Investigation Tracking Report',
          text: ' Excel',
          className: "fas fa-file-excel text-primary bg-white btn-outline-light"
        },
        {
          extend: 'pdfHtml5',
          className: "fas fa-file-pdf text-primary bg-white btn-outline-light",
          title: 'Investigation Tracking Report',
          text: ' Pdf',
          pageMargins: [0, 0, 0, 0],
          margin: [0, 0, 0, 0],
          alignment: 'center',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
              17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
            ]
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
    }, ],
    "aaData": patientBasedReqnListOnLabNo,
    "columns": [{
        "data": 'sno'
      },
      {
        "data": 'requisitionDate'
      },
      {
        "data": 'labName'
      },
      {
        "data": 'groupNameTestName'
      },
      {
        "data": 'advisedByDoc'
      },
      {
        "data": 'billDate'
      },
      {
        "data": 'requisitionStatus'
      },

      {
        "data": 'requisitionDate'
      },
      {
        "data": 'requisitionBy'
      },
      {
        "data": 'groupNameTestName'
      },
      {
        "data": 'appointmentDate'
      },
      {
        "data": 'billNo'
      },

      {
        "data": 'accessionNo'
      },
      {
        "data": 'patientAccepDate'
      },
      {
        "data": 'patientAccepBy'
      },
      {
        "data": 'patientAccepMode'
      },
      {
        "data": 'machineName'
      },

      {
        "data": 'patientRejecDate'
      },
      {
        "data": 'patientRejecBy'
      },
      {
        "data": 'patientRejecReason'
      },

      {
        "data": 'resultEntryDate'
      },
      {
        "data": 'resultEntryBy'
      },
      {
        "data": 'resultEntryParam'
      },
      {
        "data": 'resultValidDate'
      },
      {
        "data": 'resultValidBy'
      },

      {
        "data": 'reportGenerationDate'
      },
      {
        "data": 'reportPrintDate'
      },
      {
        "data": 'reportPrintBy'
      }
    ],

    "sPaginationType": "full_numbers",
    "bJQueryUI": true,
    responsive: {
      details: {
        renderer: function(api, rowIdx, columns) {
          var data = customeRowPtType2(api, rowIdx, columns);
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

  // Order by the grouping
  $('#DataTable7 tbody').on('click', 'tr.group', function() {
    var currentOrder = table.order()[0];
    if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
      table.order([groupColumn, 'desc']).draw();
    } else {
      table.order([groupColumn, 'asc']).draw();
    }
  });

}
/*------------------------------------------DataTables Initialization Ends------------------------------------------------------------------------------------*/


/*------------------------------------------DataTables Custom Rows Creation Starts----------------------------------------------------------------------------*/

/*--Functions For Returning custom Table Rows According To Screen Size Type1 patientDetails Starts---*/
var crcount = 0;
var crcount2 = 0;

function customeRowType1(col) {
  var tbdat = '';
  var w = window.innerWidth;
  var h = window.innerHeight;
  if (w >= 1100) {
    tbdat = customeRowType11(col);
  } else if (w < 1100 && w > 800) {
    tbdat = customeRowType12(col);
  } else if (w < 800 && w > 600) {
    tbdat = customeRowType13(col);
  } else if (w <= 600) {
    tbdat = customeRowType14(col);
  }
  return tbdat;
}

function customeRowType11(col) {
  var tbdat = '';
  if (crcount == 0) {
    tbdat = '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">';
    crcount++;
  }
  tbdat += '<th>' + col.title + ':' + '</th> ' +
    '<td>' + col.data + '</td>';
  return tbdat;
}

function customeRowType12(col) {
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

function customeRowType13(col) {
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

function customeRowType14(col) {
  var tbdat = '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
    '<th>' + col.title + ':' + '</th> ' +
    '<td>' + col.data + '</td>' +
    '</tr>';
  return tbdat;
}
/*--Functions For Returning custom Table Rows According To Screen Size Type1 patientDetails Ends-----*/


/*--Functions For Returning custom Table Rows According To Screen Size Type2 SampleBasedReqn Starts--*/
function customeRowSmType2(api, rowIdx, columns) {
  var tbdat = '';
  var w = window.innerWidth;
  var h = window.innerHeight;
  if (w >= 1100) {
    tbdat = customeRowSmType21(api, rowIdx, columns);
  } else if (w < 1100 && w > 800) {
    tbdat = customeRowSmType22(api, rowIdx, columns);
  } else if (w < 800 && w > 600) {
    tbdat = customeRowSmType23(api, rowIdx, columns);
  } else if (w <= 600) {
    tbdat = customeRowSmType24(api, rowIdx, columns);
  }
  return tbdat;
}

function customeRowPtType2(api, rowIdx, columns) {
  var tbdat = '';
  var w = window.innerWidth;
  var h = window.innerHeight;
  if (w >= 1100) {
    tbdat = customeRowPtType21(api, rowIdx, columns);
  } else if (w < 1100 && w > 800) {
    tbdat = customeRowPtType22(api, rowIdx, columns);
  } else if (w < 800 && w > 600) {
    tbdat = customeRowPtType23(api, rowIdx, columns);
  } else if (w <= 600) {
    tbdat = customeRowPtType24(api, rowIdx, columns);
  }
  return tbdat;
}

function customeRowSmType21(api, rowIdx, columns) {
  var tbdat = '';

  tbdat += '<tr>'
  tbdat += '<td class="rounded reqnRaisingColor"><div class="vertical-text">Requisition Raising</div></td>';
  tbdat += '<td class=""><table>' + dataRow(columns, 7, 11) + '</table></td>';

  tbdat += '<td class="rounded sampleCollColor"><div class="vertical-text">Sample Collection</div></td>';
  tbdat += '<td class=""><table>' + dataRow(columns, 12, 15) + '</table></td>';

  tbdat += '<td class="rounded packListGenColor"><div class="vertical-text">PackingList Generation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 16, 19) + '</table></td>';

  tbdat += '<td class="rounded sampleAccepColor"><div class="vertical-text">Sample Acceptance</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 20, 24) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded sampleRejeColor"><div class="vertical-text">Sample Rejection</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 25, 27) + '</table></td>';

  tbdat += '<td class="rounded resultEntColor"><div class="vertical-text">Result Entry/Validation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 28, 32) + '</table></td>';

  tbdat += '<td class="rounded reportGenColor"><div class="vertical-text">Report Generation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 33, 35) + '</table></td>';
  tbdat += '</tr>'

  return tbdat;
}

function customeRowSmType22(api, rowIdx, columns) {
  var tbdat = '';

  tbdat += '<tr>'
  tbdat += '<td class="rounded reqnRaisingColor"><div class="vertical-text">Requisition Raising</div></td>';
  tbdat += '<td class=""><table>' + dataRow(columns, 7, 11) + '</table></td>';

  tbdat += '<td class="rounded sampleCollColor"><div class="vertical-text">Sample Collection</div></td>';
  tbdat += '<td class=""><table>' + dataRow(columns, 12, 15) + '</table></td>';

  tbdat += '<td class="rounded packListGenColor"><div class="vertical-text">PackingList Generation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 16, 19) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded sampleAccepColor"><div class="vertical-text">Sample Acceptance</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 20, 24) + '</table></td>';

  tbdat += '<td class="rounded sampleRejeColor"><div class="vertical-text">Sample Rejection</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 25, 27) + '</table></td>';

  tbdat += '<td class="rounded resultEntColor"><div class="vertical-text">Result Entry/Validation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 28, 32) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded reportGenColor"><div class="vertical-text">Report Generation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 33, 35) + '</table></td>';
  tbdat += '</tr>'

  return tbdat;
}

function customeRowSmType23(api, rowIdx, columns) {
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
    tbdat += '<td class="rounded essenDataColor"><div class="vertical-text">Essential Data</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, colHidStart, colHidEnd) + '</table></td>';

    tbdat += '<td class="rounded reqnRaisingColor"><div class="vertical-text">Requisition Raising</div></td>';
    tbdat += '<td class=""><table>' + dataRow(columns, 7, 11) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded sampleCollColor"><div class="vertical-text">Sample Collection</div></td>';
    tbdat += '<td class=""><table>' + dataRow(columns, 12, 15) + '</table></td>';

    tbdat += '<td class="rounded packListGenColor"><div class="vertical-text">PackingList Generation</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 16, 19) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded sampleAccepColor"><div class="vertical-text">Sample Acceptance</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 20, 24) + '</table></td>';

    tbdat += '<td class="rounded sampleRejeColor"><div class="vertical-text">Sample Rejection</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 25, 27) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded resultEntColor"><div class="vertical-text">Result Entry/Validation</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 30, 32) + '</table></td>';

    tbdat += '<td class="rounded reportGenColor"><div class="vertical-text">Report Generation</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 33, 35) + '</table></td>';
    tbdat += '</tr>'

  } else {
    /*case when none of the default Essential columns are hidden*/

    tbdat += '<tr>'
    tbdat += '<td class="rounded reqnRaisingColor"><div class="vertical-text">Requisition Raising</div></td>';
    tbdat += '<td class=""><table>' + dataRow(columns, 7, 11) + '</table></td>';

    tbdat += '<td class="rounded sampleCollColor"><div class="vertical-text">Sample Collection</div></td>';
    tbdat += '<td class=""><table>' + dataRow(columns, 12, 15) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded packListGenColor"><div class="vertical-text">PackingList Generation</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 16, 19) + '</table></td>';

    tbdat += '<td class="rounded sampleAccepColor"><div class="vertical-text">Sample Acceptance</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 20, 24) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded sampleRejeColor"><div class="vertical-text">Sample Rejection</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 25, 27) + '</table></td>';

    tbdat += '<td class="rounded resultEntColor"><div class="vertical-text">Result Entry/Validation</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 28, 32) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded reportGenColor"><div class="vertical-text">Report Generation</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 33, 35) + '</table></td>';
    tbdat += '</tr>'
  }
  return tbdat;
}

function customeRowSmType24(api, rowIdx, columns) {
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
    tbdat += '<td class="rounded essenDataColor"><div class="vertical-text">Essential Data</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, colHidStart, colHidEnd) + '</table></td>';
    tbdat += '</tr>'
  }

  tbdat += '<tr>'
  tbdat += '<td class="rounded reqnRaisingColor"><div class="vertical-text">Requisition Raising</div></td>';
  tbdat += '<td class=""><table>' + dataRow(columns, 7, 11) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded sampleCollColor"><div class="vertical-text">Sample Collection</div></td>';
  tbdat += '<td class=""><table>' + dataRow(columns, 12, 15) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded packListGenColor"><div class="vertical-text">PackingList Generation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 16, 19) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded sampleAccepColor"><div class="vertical-text">Sample Acceptance</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 20, 24) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded sampleRejeColor"><div class="vertical-text">Sample Rejection</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 25, 27) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded resultEntColor"><div class="vertical-text">Result Entry/Validation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 28, 32) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded reportGenColor"><div class="vertical-text">Report Generation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 33, 35) + '</table></td>';
  tbdat += '</tr>'

  return tbdat;
}
/*--Functions For Returning custom Table Rows According To Screen Size Type2 SampleBasedReqn Ends----*/

/*--Functions For Returning custom Table Rows According To Screen Size Type2 PatientBasedReqn Starts-*/
function customeRowPtType21(api, rowIdx, columns) {
  var tbdat = '';

  tbdat += '<tr>'
  tbdat += '<td class="rounded reqnRaisingColor"><div class="vertical-text">Requisition Raising</div></td>';
  tbdat += '<td class=""><table>' + dataRow(columns, 7, 11) + '</table></td>';

  tbdat += '<td class="rounded patAccepColor"><div class="vertical-text">Patient Acceptance</div></td>';
  tbdat += '<td class=""><table>' + dataRow(columns, 12, 16) + '</table></td>';

  tbdat += '<td class="rounded patRejeColor"><div class="vertical-text">Patient Rejection</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 17, 19) + '</table></td>';

  tbdat += '<td class="rounded resultEntColor"><div class="vertical-text">Result Entry/Validation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 20, 24) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded reportGenColor"><div class="vertical-text">Report Generation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 25, 26) + '</table></td>';
  tbdat += '</tr>'

  return tbdat;
}

function customeRowPtType22(api, rowIdx, columns) {
  var tbdat = '';

  tbdat += '<tr>'
  tbdat += '<td class="rounded reqnRaisingColor"><div class="vertical-text">Requisition Raising</div></td>';
  tbdat += '<td class=""><table>' + dataRow(columns, 7, 11) + '</table></td>';

  tbdat += '<td class="rounded patAccepColor"><div class="vertical-text">Patient Acceptance</div></td>';
  tbdat += '<td class=""><table>' + dataRow(columns, 12, 16) + '</table></td>';

  tbdat += '<td class="rounded patRejeColor"><div class="vertical-text">Patient Rejection</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 17, 19) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded resultEntColor"><div class="vertical-text">Result Entry/Validation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 20, 24) + '</table></td>';

  tbdat += '<td class="rounded reportGenColor"><div class="vertical-text">Report Generation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 25, 26) + '</table></td>';
  tbdat += '</tr>'

  return tbdat;
}

function customeRowPtType23(api, rowIdx, columns) {
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
    tbdat += '<td class="rounded essenDataColor"><div class="vertical-text">Essential Data</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, colHidStart, colHidEnd) + '</table></td>';

    tbdat += '<td class="rounded reqnRaisingColor"><div class="vertical-text">Requisition Raising</div></td>';
    tbdat += '<td class=""><table>' + dataRow(columns, 7, 11) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded patAccepColor"><div class="vertical-text">Patient Acceptance</div></td>';
    tbdat += '<td class=""><table>' + dataRow(columns, 12, 16) + '</table></td>';

    tbdat += '<td class="rounded patRejeColor"><div class="vertical-text">Patient Rejection</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 17, 19) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded resultEntColor"><div class="vertical-text">Result Entry/Validation</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 20, 24) + '</table></td>';

    tbdat += '<td class="rounded reportGenColor"><div class="vertical-text">Report Generation</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 25, 26) + '</table></td>';
    tbdat += '</tr>'

  } else {
    /*case when none of the default Essential columns are hidden*/
    tbdat += '<tr>'
    tbdat += '<td class="rounded reqnRaisingColor"><div class="vertical-text">Requisition Raising</div></td>';
    tbdat += '<td class=""><table>' + dataRow(columns, 7, 11) + '</table></td>';

    tbdat += '<td class="rounded patAccepColor"><div class="vertical-text">Patient Acceptance</div></td>';
    tbdat += '<td class=""><table>' + dataRow(columns, 12, 16) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded patRejeColor"><div class="vertical-text">Patient Rejection</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 17, 19) + '</table></td>';

    tbdat += '<td class="rounded resultEntColor"><div class="vertical-text">Result Entry/Validation</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 20, 24) + '</table></td>';
    tbdat += '</tr>'

    tbdat += '<tr>'
    tbdat += '<td class="rounded reportGenColor"><div class="vertical-text">Report Generation</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, 25, 26) + '</table></td>';
    tbdat += '</tr>'
  }
  return tbdat;
}

function customeRowPtType24(api, rowIdx, columns) {
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
    tbdat += '<td class="rounded essenDataColor"><div class="vertical-text">Essential Data</div></td>';
    tbdat += '<td class="rounded "><table>' + dataRow(columns, colHidStart, colHidEnd) + '</table></td>';
    tbdat += '</tr>'
  }

  tbdat += '<tr>'
  tbdat += '<td class="rounded reqnRaisingColor"><div class="vertical-text">Requisition Raising</div></td>';
  tbdat += '<td class=""><table>' + dataRow(columns, 7, 11) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded patAccepColor"><div class="vertical-text">Patient Acceptance</div></td>';
  tbdat += '<td class=""><table>' + dataRow(columns, 12, 16) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded patRejeColor"><div class="vertical-text">Patient Rejection</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 17, 19) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded "><div class="vertical-text">Result Entry/Validation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 20, 24) + '</table></td>';
  tbdat += '</tr>'

  tbdat += '<tr>'
  tbdat += '<td class="rounded reportGenColor"><div class="vertical-text">Report Generation</div></td>';
  tbdat += '<td class="rounded "><table>' + dataRow(columns, 25, 26) + '</table></td>';
  tbdat += '</tr>'

  return tbdat;
}


function dataRow(columns, iStart, iEnd) {
  var dataRow = '';

  for (i = iStart; i <= iEnd; i++) {
    var col = columns[i];

    dataRow += '<tr class="rowhover" data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">';
    dataRow += '<th>' + col.title + ':' + '</th> ' + '<td>' + col.data + '</td>';
    dataRow += '</tr>';
  }
  return dataRow;
}
/*--Functions For Returning custom Table Rows According To Screen Size Type2 PatientBasedReqn Ends--*/

function customeRowDataAppend(data) {
  crcount = 0;
  crcount2 = 0;
  //data+='</tr>';
  var rt = $('<table/>').append(data);
  return rt;
}
/*--Functions For Returning custom Table Rows According To Screen Size Type1,2 Ends-----------------*/

/*--------------------------------------------DataTables Custom Rows Creation Ends----------------------------------------------------------------------------*/

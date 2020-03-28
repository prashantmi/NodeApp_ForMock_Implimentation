/*------------------------------------------Set Automaticly------------------------------------------------*/
function setDate() {
  var today = new Date();
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var DD = today.getDate();
  var M = months[today.getMonth()];
  var YYYY = today.getFullYear();

  today = DD + "-" + M + "-" + YYYY;
  return today;
}

function setTime() {
  var today = new Date();
  var tH = today.getHours();
  var tM = today.getMinutes();

  var time = tH + ":" + tM;
  return time;
}


$(document).ready(function() {

  //Date Picker Date
  $('#datetimepicker-from').datetimepicker({
    format: 'DD-MMM-YYYY',
    showTodayButton: true,
    //showClear: true,
    icons: {
      today: 'fas fa-calendar-day',
      previous: "fa fa-caret-left",
      next: "fa fa-caret-right ",
      up: "fa fa-caret-up",
      down: "fa fa-caret-down",
      date: "fas fa-calendar-alt",
      time: "far fa-clock",
      clear: "fas fa-trash-restore",
      close: "far fa-window-close"
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
      up: "fa fa-caret-up",
      down: "fa fa-caret-down",
      date: "fas fa-calendar-alt",
      time: "far fa-clock",
      clear: "fas fa-trash-restore",
      close: "far fa-window-close"
    },
    useCurrent: true //may cause problem see datetimepicker issue #1075
  });

  $("#datetimepicker-from").on("dp.change", function(e) {
    $('#datetimepicker-to').data("DateTimePicker").minDate(e.date);
  });
  $("#datetimepicker-to").on("dp.change", function(e) {
    $('#datetimepicker-from').data("DateTimePicker").maxDate(e.date);
  });


  //Date Picker Time
  $('#datetimepicker-fromTime').datetimepicker({
    format: 'HH:mm',
    showClear: true,
    icons: { //today: 'fas fa-calendar-day',
      //previous: "fa fa-caret-left",
      //next: "fa fa-caret-right ",
      up: "fa fa-caret-up",
      down: "fa fa-caret-down",
      //date: "fas fa-calendar-alt",
      time: "far fa-clock",
      clear: "fas fa-trash-restore"
      //close: "far fa-window-close"
    }
  });

  $('#datetimepicker-toTime').datetimepicker({
    format: 'HH:mm',
    showClear: true,
    icons: { //today: 'fas fa-calendar-day',
      //previous: "fa fa-caret-left",
      //next: "fa fa-caret-right ",
      up: "fa fa-caret-up",
      down: "fa fa-caret-down",
      //date: "fas fa-calendar-alt",
      time: "far fa-clock",
      clear: "fas fa-trash-restore"
      //close: "far fa-window-close"
    }
  });

  $("#datetimepicker-fromTime").on("dp.change", function(e) {
    $('#datetimepicker-toTime').data("DateTimePicker").minDate(e.time);
  });
  $("#datetimepicker-toTime").on("dp.change", function(e) {
    $('#datetimepicker-fromTime').data("DateTimePicker").maxDate(e.time);
  });

});


$(document).ready(function() {
  var fromDateInput;
  var toDateInput;
  fromDateInput = toDateInput = setDate();
  $('.fromDateInput').val(fromDateInput);
  $('.toDateInput').val(toDateInput);

  $('.fromTimeInput').val("00:00");
  $('.toTimeInput').val("23:59");

})


$(document).ready(function() {
  AjaxGetLabList();
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


//js when date and time is cleared
$(document).ready(function() {
  $('.fromTimeInput').on("change click blur", function() {
    if ($('.fromTimeInput').val() == null || $('.fromTimeInput').val() == "")
      $('.fromTimeInput').val("00:00");
  });


  $('.toTimeInput').on("change click blur", function() {
    if ($('.toTimeInput').val() == null || $('.toTimeInput').val() == "")
      $('.toTimeInput').val("23:59");
  });

});



/*------------------------------------------Event Actions------------------------------------------------*/



$(document).ready(function() {
  /*document.ready starts here*/

  /*----------On Change in lab Name starts---------------------------------*/
  $('#labName').change(function() {
    var labCode = $(this).val();

    if (labCode == 0) {
      $('#machineNameDiv').css({
        "display": "none"
      });
      $('#getData').css({
        "display": "none"
      });
      $('#machineTestReportList').css({
        "display": "none"
      });
      showHideLoding("no");
    } else {
      $('#machineNameDiv').css({
        "display": ""
      });
      $('#getData').css({
        "display": ""
      });
      showHideLoding("yes");
      AjaxGetMachineList(labCode);
      //showHideLoding("no");
    }

  });

  /*----------On Change in lab Name starts---------------------------------*/



  /*----------On Click Getdata Button starts---------------------------------*/
  $('#getData').click(function() {

    var labCode = $('#labName').val();
    var machineId = $('#machineName').val();

    var labName = $('#labName option:selected').text();
    var machineName = $('#machineName option:selected').text();

    var fromDate = document.getElementsByClassName("fromDateInput")[0].value;
    var toDate = document.getElementsByClassName("toDateInput")[0].value;

    var fromTime = $('.fromTimeInput').val();
    var toTime = $('.toTimeInput').val();

    var acceptedByUser= $('.acceptedByUser:checked' ).val();

    if (labCode == 0 || labCode == null || labCode == "") {
      alert("Please Select Any Lab");
      $('#labName').focus();
      //$('#getData').css({"display": "none"});
    }

    if (machineId == 0 || machineId == null || machineId == "") {
      alert("Please Select Any Machine");
      $('#machineName').focus();
      //$('#getData').css({"display": "none"});
    }


    if (fromTime == null || fromTime == "")
      fromTime = "00:00";
    if (toTime == null || toTime == "")
      toTime = "23:59";

    fromDate += " " + fromTime;
    toDate += " " + toTime;


    if (labCode != 0 && labCode != null && labCode != "" && labCode != 0 && machineId != 0 && machineId != null && machineId != "") {
      //show loding animation
      showHideLoding("yes");
      $('#machineTestReportList').css({
        "display": ""
      });
      AjaxGetMachineTestReportList(labCode, labName, machineId, machineName, acceptedByUser, fromDate, toDate);
    }

  });

  /*----------On Click Getdata Button Ends---------------------------------*/

}); /*document.ready ends here*/



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



/*---function to expand and collapse all rows on button click Starts--------------*/
/*---Call this method for any data table to epand and collapse rows with right argument--*/
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

function AjaxGetLabList() {

  var _mode = "AjaxGetLabList";

  var url = "/HISInvestigationG5/new_investigation/MachineTestReport.cnt?hmode=" + _mode;
  $.getJSON(url, function(data) {
      //alert("Data: " + data + "\nStatus: " + status);


      if (data) {
        showHideLoding("no");

        var labList = data.labList;
        let dropdown = $('#labName');

        if (labList.length > 0) {
          dropdown.empty();
          dropdown.append('<option selected="true" value="0" disabled>Select Lab</option>');
          dropdown.prop('selectedIndex', 0);

          $.each(labList, function(index, value) {
            dropdown.append($('<option></option>').attr('value', value.labCode).text(value.labName));
          })
        } else {

          dropdown.empty();
          dropdown.append('<option selected="true" value="0" disabled>No Labs</option>');
          dropdown.prop('selectedIndex', 0);
        }
      }
    })

    .done(function() {
      console.log("second success");
    })
    .fail(function() {
      console.log("error");
    });

}

function AjaxGetMachineList(labCode) {

  var _mode = "AjaxGetMachineList";

  var url = "/HISInvestigationG5/new_investigation/MachineTestReport.cnt?hmode=" + _mode + "&labCode=" + labCode;

  $.getJSON(url, function(data) {

      if (data) {
        showHideLoding("no");

        var machineList = data.machineList;
        let dropdown = $('#machineName');

        if (machineList.length > 0) {

          dropdown.empty();
          dropdown.append('<option selected="true" value="0" disabled>Select Machine</option>');
          dropdown.prop('selectedIndex', 0);

          $.each(machineList, function(index, value) {
            dropdown.append($('<option></option>').attr('value', value.machineId).text(value.machineName));
          })

        } else {
          dropdown.empty();
          dropdown.append('<option selected="true" value="0" disabled>No Machines</option>');
          dropdown.prop('selectedIndex', 0);
        }


      }
    })

    .done(function() {
      console.log("AjaxGetMachineList success");
    })
    .fail(function() {
      console.log("AjaxGetMachineList error");
    });
}


function AjaxGetMachineTestReportList(labCode, labName, machineId, machineName, acceptedByUser, fromDate, toDate) {


  var _mode = "AjaxGetMachineTestReportList";

  $('#DataTable1').DataTable().clear().destroy();

  $.fn.dataTable.moment('DD - MMM - YYYY HH: mm');
  var table = $('#DataTable1').DataTable({

    dom: 'Bflrtip',
    responsive: true,
    pageLength: 20,
    lengthMenu: [
      [10, 20, 40, -1],
      ['10 rows', '20 rows', '40 rows', 'Show all']
    ],

    "columnDefs": [{
      "orderable": false,
      "targets": 0
    }],

    "language": {
      "emptyTable": "No Data Is Available "
    },
    buttons: [
      //{ extend: 'colvis', className: "bg-dark text-white" },
      {
        extend: 'excel',
        className: "bg-dark text-white"
      },
      {
        extend: 'pdfHtml5',
        className: "bg-dark text-white",
        title: 'Machine WorkList Report',
        text: 'PDF',
        pageMargins: [0, 0, 0, 0],
        margin: [0, 0, 0, 0],
        alignment: 'center',
        orientation: 'landscape',
        //pageSize : 'A0',

        exportOptions: {
          columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        customize: function(doc) {
          //doc.styles.tableHeader.fontSize = 12;
          doc['header'] = (function() {
            return {
              columns: [{
                alignment: 'center',
                italics: true,
                text: 'Lab Name :' + labName + " |   Machine Name : " + machineName + " |   From Date : " + fromDate + " |   To Date " + toDate + '',
                fontSize: 10,
              }],
              margin: [0, 20, 0, 0]
            }
          });
          doc.styles['td:nth-child(2)'] = {
            'text-align': 'right'
          };
          doc.styles['td:nth-child(10)'] = {
            'white-space': 'nowrap'
          };
          doc.styles['td:nth-child(9)'] = {
            'white-space': 'nowrap'
          };
          doc.styles['td:nth-child(10)'] = {
            'white-space': 'nowrap'
          };
          doc.defaultStyle.fontSize = 7;

          doc['footer'] = (function(page, pages) {
            return {
              columns: [
                'Machine WorkList Report',
                {
                  alignment: 'right',
                  text: [{
                      text: page.toString(),
                      italics: true
                    }, ' of ',
                    {
                      text: pages.toString(),
                      italics: true
                    }
                  ]
                }
              ],
              fontSize: 7,
              margin: [8, 0]
            }
          });


        }
      }
    ],

    "ajax": {
      "url": "/HISInvestigationG5/new_investigation/MachineTestReport.cnt?hmode=" + _mode + "&labCode=" + labCode + "&machineId=" + machineId + "&acceptedByUser=" + acceptedByUser + "&fromDate=" + fromDate + "&toDate=" + toDate,
      sync: true,
      postData: "",
      handleAs: "text",
      error: function(jqXHR, statusText, errorThrown) {
        console.log(jqXHR.responseText);
        console.log(statusText);
        console.log(errorThrown);
      },
      dataSrc: "machineTestList"
    },
    "columns": [{
        "data": 'sno'
      },
      {
        "data": 'crNo'
      },
      {
        "data": 'sampleNo'
      },
      //added by shashi kant rawat on 28.01.2020
      {
    	  "data" : 'testName'
      
      },
      //added by shashi kant rawat on 28.01.2020
      {
          "data": 'groupName'
      },
      //added by shashi kant rawat on 28.01.2020
      {
          "data": 'sampleName'
      },
      //added by shashi kant rawat on 28.01.2020
      {
          "data": 'acceptance'
      },
      //added by shashi kant rawat on 28.01.2020
      {
          "data": 'collectionDateTime'
      },
      {
        "data": 'patientName'
      },
      {
        "data": 'ageGender'
      }
      /*commented by shashi kant rawat on 28.01.2020
      {
        "data": 'sampleName'
      },
      
   
      {
     	"data": 'groupName'
      },
      {
        "data": 'testName'
      },
      {
        "data": 'acceptance'
      },
      {
        "data": 'collectionDateTime'
      }*/
    ],


    "sPaginationType": "full_numbers",
    "bJQueryUI": true,

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

var globalSampleBasedReqnListOnSampleNo = null;
var globalPatientBasedReqnListOnLabNo = null;

function AjaxGetPatDetailsOnSampleNo(sampleNo) {

  globalPatientDetailsOnSampleNo = null;

  var _mode = "AjaxGetPatDetailsOnSampleNo";
  var url = "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode=" + _mode + "&sampleNo=" + sampleNo;
  //var url = "/data";

  $.getJSON(url, function(data) {
      if (data) {

    	  globalPatientDetailsOnSampleNo=data;

    	  dataTableCrNoBasedPatDetails(data);
      }
    })
    .done(function(data) {
    	console.log("AjaxGetPatDetailsOnSampleNo success | ResponseData Is Below");
        console.log(data);
    })
    .fail(function( jqxhr, textStatus, error ) {
      console.log("AjaxGetPatDetailsOnSampleNo Failed | ResponseError Is Below");
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    });
     //dataSrc: "patDetailsOnSampleNo";
}

function AjaxGetPatDetailsOnLabNo(labNo) {

  globalPatientDetailsOnLabNo = null;
  var _mode = "AjaxGetPatDetailsOnLabNo";
  var url = "/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode=" + _mode + "&labNo=" + labNo;
  //var url = "/data";

  $.getJSON(url, function(data) {
      if (data) {

    	  globalPatientDetailsOnLabNo=data;

    	  dataTableCrNoBasedPatDetails(data);
      }
    })
    .done(function(data) {
    	console.log("AjaxGetPatDetailsOnLabNo success | ResponseData Is Below");
        console.log(data);
    })
    .fail(function( jqxhr, textStatus, error ) {
      console.log("AjaxGetPatDetailsOnLabNo Failed | ResponseError Is Below");
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    });
      //dataSrc: "patDetailsOnSampleNo";
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
        },
        {
      	"render": function ( data, type, row )
            { return decideReqnStatusColor(data, type, row); },
           className: "reqnStaus",
           "targets": 5
       },
       {
       	"render": function ( data, type, row )
             { return decideTurnAroundTimeIcon(data, type, row); },
            className: "reqnTat",
            "targets": 6
        },
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
            '<tr class="group"><td colspan="10" class="rowGroupReqnDate"><strong>Requisition Date : </strong>' + group + '</td></tr>'
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
    "columns": [
    	{
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
            "data": 'requisitionStatus'
          },
          {
            "data": 'turnAroundTime.turnAroundTime'
          },
          {
            "data": 'testNote'
          },
          {
            "data": 'requisitionDate'
          },
          {
            "data": 'requisitionBy'
          },
          {
            "data": 'advisedByDoc'
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
            "data": 'billDate'
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
        },
        {
      	"render": function ( data, type, row )
            { return decideReqnStatusColor(data, type, row); },
           className: "reqnStaus",
           "targets": 5
       },
       {
       	"render": function ( data, type, row )
             { return decideTurnAroundTimeIcon(data, type, row); },
            className: "reqnTat",
            "targets": 6
        },
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
            '<tr class="group"><td colspan="10" class="rowGroupReqnDate"><strong>Requisition Date : </strong>' + group + '</td></tr>'
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
    "columns": [
    	{
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
            "data": 'requisitionStatus'
          },
          {
            "data": 'turnAroundTime.turnAroundTime'
          },
          {
            "data": 'testNote'
          },
          {
            "data": 'requisitionDate'
          },
          {
            "data": 'requisitionBy'
          },
          {
            "data": 'advisedByDoc'
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
            "data": 'billDate'
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

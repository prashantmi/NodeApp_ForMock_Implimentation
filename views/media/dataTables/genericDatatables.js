/* Generic Function For DataTables By PrashantMi */


/*
 * Add below code to ypur jsp
<!-- Added by PrashantMi dataTables dataTables-->
<script type="text/javascript" src="media/dataTables/datatables.min.js"></script>
<link rel="stylesheet" type="text/css" href="media/dataTables/datatables.min.css"/>
<!-- Added by PrashantMi dataTables generic-->
<script type="text/javascript" src="media/dataTables/genericDatatables.js"></script>


<script type="text/javascript" language="javascript" class="init">
$(document).ready(function() {
	UseDataTables("tableid");
});
</script>

*/

/*function UseDataTables(tableId) {
	tableId = "#"+tableId;
     $(tableId).dataTable(
       {//'iDisplayLength': 7,//Set Row Per Page
       //"bFilter": false,//Remove Search
       //"bPaginate" : false,//Remove Pagination
      // "bInfo": false,//Remove Page Info
       //"bLengthChange":false,//Show per Page Dropdown Remove
       "columnDefs": [ { "targets": 0, "orderable": false } ]//,//Remove Colum Orderable(Here Col 0 Remove)
      // "aoColumns": [{ "asSorting": [] },{ "asSorting": [ "asc" ] },{ "asSorting": [ "desc", "asc" ] },{ "asSorting": [ "desc" ] },null],//Set Colum Order By ASC Or DSC
      // "sPaginationType": "full_numbers"//Full Pagination
      } 
      );
    }*/

function UseDataTables(tableId) {
	tableId = "#"+tableId;
     $(tableId).dataTable(
       {//'iDisplayLength': 7,//Set Row Per Page
       //"bFilter": false,//Remove Search
       //"bPaginate" : false,//Remove Pagination
      // "bInfo": false,//Remove Page Info
       //"bLengthChange":false,//Show per Page Dropdown Remove
       "columnDefs": [ { "targets": 0, "orderable": false } ]//,//Remove Colum Orderable(Here Col 0 Remove)
      // "aoColumns": [{ "asSorting": [] },{ "asSorting": [ "asc" ] },{ "asSorting": [ "desc", "asc" ] },{ "asSorting": [ "desc" ] },null],//Set Colum Order By ASC Or DSC
      // "sPaginationType": "full_numbers"//Full Pagination
      } 
      );
    }

function UseDataTablesAearchAutoComplete(tableId) {
	tableId = "#"+tableId;
	 var dataSrc = [];
	  var table =  $(tableId).dataTable({
		       
	'columnDefs': [ { "targets": 0, "orderable": false } ],
	  'initComplete': function(){
	         var api = this.api();

	         // Populate a dataset for autocomplete functionality
	         // using data from first, second and third columns
	         api.cells('tr', [0, 1, 2]).every(function(){
	            // Get cell data as plain text
	            var data = $('<div>').html(this.data()).text();           
	            if(dataSrc.indexOf(data) === -1){ dataSrc.push(data); }
	         });
	         
	         // Sort dataset alphabetically
	         dataSrc.sort();
	        
	         // Initialize Typeahead plug-in
	         $('.dataTables_filter input[type="search"]', api.table().container()).typeahead({
	               source: dataSrc,
	               afterSelect: function(value){
	                  api.search(value).draw();
	               }
	            });
	      } 
       
      });

		
    }



function UseDataTablesWithTfoot (tableId,tableFootId) {
	tableId = "#"+tableId;
	tableIdTr = tableId+" tr";
tableFootId = "#"+tableFootId;

     $(tableId).dataTable(
       {//'iDisplayLength': 7,//Set Row Per Page
       //"bFilter": false,//Remove Search
       //"bPaginate" : false,//Remove Pagination
      // "bInfo": false,//Remove Page Info
       //"bLengthChange":false,//Show per Page Dropdown Remove
       "columnDefs": [ { "targets": 0, "orderable": false } ]//,//Remove Colum Orderable(Here Col 0 Remove)
      // "aoColumns": [{ "asSorting": [] },{ "asSorting": [ "asc" ] },{ "asSorting": [ "desc", "asc" ] },{ "asSorting": [ "desc" ] },null],//Set Colum Order By ASC Or DSC
      // "sPaginationType": "full_numbers"//Full Pagination
      } 
      );

      if($(tableId).length && $(tableIdTr).length && $(tableIdTr).length>=10){
        //alert($('#tableList tr').length);
        $(tableFootId).show();}
      else{$(tableFootId).hide();}

      $('#tableList_filter input').on('click change focus blur keyup', function(e){
        if($(tableId).length && $(tableIdTr).length && $(tableIdTr).length>=10){
          //alert($('#tableList tr').length);
          $(tableFootId).show();}
        else{$(tableFootId).hide();}
        
        });
    }
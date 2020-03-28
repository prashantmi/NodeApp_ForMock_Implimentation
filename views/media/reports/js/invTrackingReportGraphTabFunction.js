/*------------------------------------------Event Actions Starts-----------------------------------------------------------------------------------------------*/

/*----------Function to Set Events Listeners After Graph Tab Test List Added Starts-----------*/
function setEventListenersAfterTestListAdded (){
	if($('.graphTab-testBtns').length){
		$('.graphTab-testBtns').click(function (){ 
			$('.graphTab-testBtns').removeClass("border border-primary");
			$(this).addClass("border border-primary");
			var jsonTestKey = jQuery.parseJSON( $(this).attr("key") );
			drawTestParamGraph (jsonTestKey);
			drawTestParamTable (jsonTestKey);
			
			if($("#testParamTable").length){ 
				 if(setIntervalTestParamTable2){clearInterval(setIntervalTestParamTable2)};
			   	 setIntervalTestParamTable2=setInterval(redrawTestParamTable2,1000);
			   	 }
		});
	}
	
	if($("#showGraphBtn").length){
		$("#showGraphBtn").off().click(function (){
			var expanded= $("#showGraphBtn").attr("aria-expanded");			
			if(expanded=="true"){
				$('.graphTabTestOrGroupTable-col').addClass("col-md-12");
				$('.graphTabTestGraph-col').addClass("d-none");
			}else{
				$('.graphTabTestOrGroupTable-col').removeClass("col-md-12");
				$('.graphTabTestGraph-col').removeClass("d-none");
				$('#testParamTable').DataTable().columns.adjust().responsive.recalc();
				
			}
		});
	}
}


/*------------------------------------------Event Actions Ends------------------------------------------------------------------------------------------------*/


/*------------------------------------------Ajax Calls Starts---------------------------------------------------------------------------------------------------*/

var globalReqnTestParamList = null;

function AjaxGetReqnTestParamList(ajaxSearchAttr){
	globalReqnTestParamList = null;
	
	var _mode = "AjaxGetReqnTestParamList";
	
	var crNo=ajaxSearchAttr.crNo;
	var billNo=ajaxSearchAttr.billNo;
	var searchType=ajaxSearchAttr.searchType;
	var forTestOrGroupOrAll=ajaxSearchAttr.forTestOrGroupOrAll;
	var testCode=ajaxSearchAttr.testCode;
	var groupCode=ajaxSearchAttr.groupCode;
	
	var dataFromArchival="0";
	  if($('.inputDates').is(":hidden")){
	    dataFromArchival="0";
	  } else {
	    dataFromArchival="1";
	  }
	  
	  var fromDate = document.getElementsByClassName("fromDateInput")[0].value;
	  var toDate = document.getElementsByClassName("toDateInput")[0].value;
	  
	 var url="/HISInvestigationG5/new_investigation/InvestigationTrackingReport.cnt?hmode=" + _mode + "&crNo=" + crNo + "&billNo=" + billNo + "&dataFromArchival=" +dataFromArchival+
	  "&fromDate=" +fromDate+ "&toDate=" +toDate+"&searchType="+searchType
	  +"&forTestOrGroupOrAll="+forTestOrGroupOrAll+"&testCode="+testCode+"&groupCode="+groupCode;
	  
	 ajaxObjectArr.AjaxGetReqnTestParamList=$.getJSON(url, function(data) {
			if(!$.isEmptyObject(data)) {
				if(data.isSuccess=="1") {
					globalReqnTestParamList = data.reqnTestParamList;
		    	  	//console.log(JSON.stringify(globalReqnTestParamList));
				  	addTestListInGraphTab(data.reqnTestParamList);
				  	buildTestParamHighChartJson(data.reqnTestParamList);
				    //Draw automatically click 1st graph button to graph  so previous graph can be distroyed
					if($('.graphTab-testBtns').length){
						$('.graphTab-testBtns')[0].click();
					}
				} else {
				  console.log("%cAjaxGetReqnResultEntryParam Failed | ResponseError Is Below", "color:red;");
				  console.log(data.error);
				}
			}
		})
		.done(function(data) {
		  console.log("%cAjaxGetReqnResultEntryParam success | ResponseData Is Below", "color:green;");
		  console.log(data);
		})
		.fail(function( jqxhr, textStatus, error ) {
		  console.log("%cAjaxGetReqnResultEntryParam Failed | ResponseError Is Below", "color:red;");
		  var err = textStatus + ", " + error;
		  console.log( "Request Failed: " + err );
		});
	  
}

/*------------------------------------------Ajax Calls Ends---------------------------------------------------------------------------------------------------*/


function addTestListInGraphTab(reqnTestParamListJson){
	

	$('.graphTab-testLabel').addClass("d-none");
	$('.graphTab-groupLabel').addClass("d-none");
	$('.graphTab-testList').empty();
	$('.graphTab-goupList').empty();
	
	var i=0;
	
	for(key in reqnTestParamListJson.testCodeWise){
		i++;
		var testData = reqnTestParamListJson.testCodeWise[key];
		var testName = testData.testName;
		var testCode = testData.testCode;
		
		var jsonTestKey='{"testCode":"'+testCode+'", "testUniqueCode":"'+testCode+'_t", "isGroup":"0", "groupCode":"-"}';
		
		var btnElements = document.createElement("button");
		
		$(btnElements).addClass("graphTab-testBtns list-group-item list-group-item-action btn btn-outline-primary");
		$(btnElements).text(testName);
		$(btnElements).attr({"type":"button", "id":"graphTab-testBtns"+i, "key":jsonTestKey})
		
		$('.graphTab-testLabel').removeClass("d-none");
		$('.graphTab-testList').append(btnElements);
	}
	
	for(key in reqnTestParamListJson.groupCodeWise){
		i++;
		var groupData = reqnTestParamListJson.groupCodeWise[key];
		var groupName = groupData.groupName;
		var groupCode = groupData.groupCode;
		
		var jsonTestKey='{"testCode":"-", "testUniqueCode":"'+groupCode+'_g", "isGroup":"1", "groupCode":"'+groupCode+'"}';
		
		var btnElements = document.createElement("button");
		
		$(btnElements).addClass("graphTab-testBtns list-group-item list-group-item-action btn btn-outline-primary");
		$(btnElements).text(groupName);
		$(btnElements).attr({"type":"button", "id":"graphTab-testBtns"+i, "key":jsonTestKey})
		
		$('.graphTab-groupLabel').removeClass("d-none");
		$('.graphTab-goupList').append(btnElements);
	}
	
	//Set Graph Tab Notification Badge
	$('.graphBadgeCount').text($('.graphTab-testBtns').length);
  
	setEventListenersAfterTestListAdded();
	
}

var globalTestParamChartJson= null;
var globalTestParamChartJsonMod= null;
function buildTestParamHighChartJson(reqnTestParamListJson){
	globalTestParamChartJson= null;
	globalTestParamChartJsonMod= null;
	
	globalTestParamChartJson=  new Object();
	var graphTitle = null;
	
	for (key in reqnTestParamListJson.testCodeWise){
		var categories = [];
		var reqnUniqueCode = [];
		var series = [];
		var tableSeries = [];
		//var paramCodeArr = [];
		var k=0;
		var j=0;

		var testData = reqnTestParamListJson.testCodeWise[key];
		graphTitle = testData.testName;
		var testCode = testData.testCode;
		testCode+="_t";

	 for (reqnDnoPlusTestCode in testData.reqnDnoPlusTestCode){
		  var reqnDnoTests = testData.reqnDnoPlusTestCode[reqnDnoPlusTestCode];

		  categories.push(reqnDnoTests[0].dateTime);
		  reqnUniqueCode.push(reqnDnoPlusTestCode);
		  j++; k=0; var newReqnFloat = true; var paramChangedArr = [];


		for (key3 in reqnDnoTests){

			 var testParamData = reqnDnoTests[key3];

			 var testName = testParamData.testName;
			 var paramName = testParamData.paraName;
			 var paramCode = testParamData.paramCode;
			 var paraValue = testParamData.paraValue;
			 var refRange = testParamData.refRange;
			 if(refRange!=null && refRange.trim()!="")
			 paramName+=" ["+refRange+"]";
			 var outOfBound = testParamData.outOfBound;
			 var dateTime = testParamData.dateTime;
			 var isInteger = testParamData.isInteger;
			 var paraValueFloat = parseFloat(paraValue);

			 if(j==1){
				 series.push(new Object());
				 series[k].name=paramName;
				 series[k].data=[];
				 series[k].data.push(paraValueFloat);
				 
				 tableSeries.push(new Object());
				 tableSeries[k].name=paramName;
				 tableSeries[k].code = paramCode;
				 
				 tableSeries[k].data=[];
				 tableSeries[k].data.push(paraValue);
				 
				 tableSeries[k].isOutOfBound=[];
				 tableSeries[k].isOutOfBound.push(outOfBound);
				 
				 /*paramCodeArr.push(new Object());
				 paramCodeArr[k].name = paramName;
				 paramCodeArr[k].code = paramCode;*/
				 paramChangedArr.push(k);

				 k++;

			 } else {
				 var flag = false;
				 for(l in tableSeries){

					 if(paramCode==tableSeries[l].code){
						 series[l].data.push(paraValueFloat);
						 tableSeries[l].data.push(paraValue);
						 tableSeries[l].isOutOfBound.push(outOfBound);
						 paramChangedArr.push(l);
						 k++;
						 flag = true;
						 break;
						}
				 	}

				   if(flag==false){
					     var m = tableSeries.length;

					   	 /*paramCodeArr.push(new Object());
						 paramCodeArr[m].name = paramName;
						 paramCodeArr[m].code = paramCode;*/

						 series.push(new Object());
						 series[m].name=paramName;
						 series[m].data=[];
						 
						 tableSeries.push(new Object());
						 tableSeries[m].name=paramName;
						 tableSeries[m].code = paramCode;
						 tableSeries[m].data=[];
						 tableSeries[m].isOutOfBound=[];
						 
						 
						 for(var x=0; x<j-1; x++){
							 series[m].data[x]=NaN; 
							 tableSeries[m].data[x]=NaN; 
							 tableSeries[m].isOutOfBound[x]="0";
							 }
						 
						 series[m].data[j-1]=paraValueFloat;
						 tableSeries[m].data[j-1]=paraValue;
						 tableSeries[m].isOutOfBound[j-1]=outOfBound;

						 paramChangedArr.push(m);
						 k++;
				   }

			 }

		}

		for(y in series){
			if( series[y].data.length < categories.length){
				series[y].data.push(NaN);
				tableSeries[y].data.push(NaN);
				tableSeries[y].isOutOfBound.push("0");
			}
		}


	}

	 var graphDataExist="0"; var tableDataExist="0";
	 if(categories.length>0 && series.length>0 ){graphDataExist="1"}
	 if(tableSeries.length>0 ){tableDataExist="1"}
	 
	 globalTestParamChartJson[testCode] = {	"graphDataExist":graphDataExist, "categories":categories, 
			 								"reqnUniqueCode":reqnUniqueCode, "series":series, 
			 								"tableSeries":tableSeries, "graphTitle":graphTitle, 
			 								"tableDataExist":tableDataExist	
			 							   };
	}
/*----------------------------------------------------------------------------------------------------------------------*/

	for (key in reqnTestParamListJson.groupCodeWise){
		var categories = [];
		var reqnUniqueCode = [];
		var series = [];
		var tableSeries = [];
		var k=0;
		var j=0;
		
		var groupData = reqnTestParamListJson.groupCodeWise[key];
		graphTitle = groupData.groupName;
		var groupCode = groupData.groupCode;
		groupCode+="_g";
		
	 for (reqnNoPlusGroupCode in groupData.reqnNoPlusGroupCode){
		  var reqnNoTests = groupData.reqnNoPlusGroupCode[reqnNoPlusGroupCode];
		  
		  categories.push(reqnNoTests[0].dateTime);
		  reqnUniqueCode.push(reqnNoPlusGroupCode);
		  j++; k=0; var newReqnFloat = true; var paramChangedArr = [];

		for (key3 in reqnNoTests){ 
			
			 var testParamData = reqnNoTests[key3];
			
			 var testName = testParamData.testName;
			 var paramName = testParamData.paraName;
			 if(testName!=null && testName!="" && testName.toLowerCase().trim()!=paramName.toLowerCase().trim())
			 paramName=testName+":"+paramName;
			 var paramCode = testParamData.paramCode;
			 var paraValue = testParamData.paraValue;
			 var refRange = testParamData.refRange;
			 if(refRange!=null && refRange!="")
			 paramName+=" ["+refRange+"]";
			 var outOfBound = testParamData.outOfBound;
			 var dateTime = testParamData.dateTime;
			 var isInteger = testParamData.isInteger;
			 var paraValueFloat = parseFloat(paraValue);
       
       if(j==1){
				 series.push(new Object());
				 series[k].name=paramName;
				 series[k].data=[]
				 series[k].data.push(paraValueFloat);
				 
				 tableSeries.push(new Object());
				 tableSeries[k].name=paramName;
				 tableSeries[k].code = paramCode;
				 
				 tableSeries[k].data=[]
				 tableSeries[k].data.push(paraValue);
				 
				 tableSeries[k].isOutOfBound=[]
				 tableSeries[k].isOutOfBound.push(outOfBound);
				 
				 paramChangedArr.push(k);

				 k++;

			 } else {
				 var flag = false;
				 for(l in tableSeries){

					 if(paramCode==tableSeries[l].code){
						 series[l].data.push(paraValueFloat);
						 tableSeries[l].data.push(paraValue);
						 tableSeries[l].isOutOfBound.push(outOfBound);
						 paramChangedArr.push(l);
						 k++;
						 flag = true;
						 break;
						}
				 	}

				   if(flag==false){
					     var m = tableSeries.length;

						 series.push(new Object());
						 series[m].name=paramName;
						 series[m].data=[];
						 
						 tableSeries.push(new Object());
						 tableSeries[m].name=paramName;
						 tableSeries[m].code = paramCode;
						 tableSeries[m].data=[];
						 tableSeries[m].isOutOfBound=[];

						 for(var x=0; x<j-1; x++){
							 series[m].data[x]=NaN; 
							 tableSeries[m].data[x]=NaN;
							 tableSeries[m].isOutOfBound[x]="0";
							 }
						 series[m].data[j-1]=paraValueFloat;
						 tableSeries[m].data[j-1]=paraValue;
						 tableSeries[m].isOutOfBound[j-1]=outOfBound;

						 paramChangedArr.push(m);
						 k++;
				   }

			 }

		}

    for(y in series){
      if( series[y].data.length < categories.length){
        series[y].data.push(NaN);
        tableSeries[y].data.push(NaN);
        tableSeries[y].isOutOfBound.push("0");
      }
    }
  
  
  }

	 var graphDataExist="0"; var tableDataExist="0";
	 if(categories.length>0 && series.length>0 ){var graphDataExist="1"}
	 if(tableSeries.length>0 ){tableDataExist="1"}
	 
   globalTestParamChartJson[groupCode] = {	"graphDataExist":graphDataExist, "categories":categories, 
		   									"reqnUniqueCode":reqnUniqueCode, "series":series, 
		   									"tableSeries":tableSeries, "graphTitle":graphTitle, 
		   									"tableDataExist":tableDataExist	
		   								  };
	}
}

function removeNullLedgends (chart) {
	var flag = true;
    
    $.each(chart.series,function(i,series){
        flag = true;
        $.each(series.data,function(j,data){
            if(!isNaN(data.y)){
                flag=false;
            }
        });
        
        if(flag)
        { series.legendGroup.destroy(); }
    });
    }

function drawTestParamGraph(jsonTestKey){
	var chartAttrbJson=null;
	
	if(globalTestParamChartJsonMod!=null){
		chartAttrbJson = $.extend( true, {}, globalTestParamChartJsonMod[jsonTestKey.testUniqueCode] );
	} else {
		chartAttrbJson = $.extend( true, {},  globalTestParamChartJson[jsonTestKey.testUniqueCode] );
	}
	
	
	if(chartAttrbJson!=null && chartAttrbJson.graphDataExist=="1"){
		
		/*-----------------------------------*/
		if(chartAttrbJson.categories.length>3){
			chartAttrbJson.categories.length=3;
			chartAttrbJson.reqnUniqueCode.length=3;
		}
		
		for (key in chartAttrbJson.series){
			if(chartAttrbJson.series[key].data.length>3)
				chartAttrbJson.series[key].data.length=3;
		}
		/*-----------------------------------*/
		
		var spliceArr=[];
		for (var key1=0; key1<chartAttrbJson.series.length; key1++){
			var flag = true;
			for(key2 in chartAttrbJson.series[key1].data){
				var data=chartAttrbJson.series[key1].data[key2]
				if(!isNaN(data)){ flag=false; }
			}
			 if(flag){ 
				 spliceArr.push(key1); 
				 chartAttrbJson.series.splice(key1, 1);
				 key1--}
			}	
		
		
		if(chartAttrbJson.series.length){
			var highChartJson ={ chart: { type: 'line' },
								 title: { text: chartAttrbJson.graphTitle },
								 subtitle: { text: 'Source: HIS' },
								 xAxis: { categories: chartAttrbJson.categories },
								 yAxis: { title: { text: 'Values' } },
								 plotOptions: { line: { dataLabels: { enabled: true },
								 enableMouseTracking: true } },
								 series: chartAttrbJson.series,
								 exporting: {
									    buttons: {
									      contextButton: {
									        menuItems: ['viewFullscreen','printChart','separator','downloadPNG','downloadJPEG','downloadPDF',
									        	'downloadSVG','separator','downloadCSV','downloadXLS'] /*viewData*/
									      }
									    }
									  }
							   };
			
			$('.showGraphBtnRow').removeClass("d-none");
			
			var showGraph=$('[name="showGraph"]')[0].value;
			if(showGraph=="0"){
				$("#showGraphBtn").attr({"aria-expanded":"false"});	
				$("#showGraphBtn").removeAttr("checked");	
				$('.graphTabTestGraph-col').removeClass("show");
			}else {
				$('.graphTabTestOrGroupTable-col').removeClass("col-md-12");
				$('.graphTabTestGraph-col').removeClass("d-none");
			}
			/*if(testChart.length) testChart.destroy();*/
			var testChart = new Highcharts.chart('testParamChart', highChartJson);
			//testChart=removeNullLedgends(testChart);
		} else {
			$('.showGraphBtnRow').addClass("d-none");
			$('.graphTabTestGraph-col').addClass("d-none");
			$('.graphTabTestOrGroupTable-col').addClass("col-md-12");
			
		}
		
	}
	else {
		$('.showGraphBtnRow').addClass("d-none");
		$('.graphTabTestGraph-col').addClass("d-none");
		$('.graphTabTestOrGroupTable-col').addClass("col-md-12");
	}
	
	if($('.highcharts-credits').length)
	$('.highcharts-credits').hide();
}


function drawTestParamTable(jsonTestKey){
	var chartAttrbJson=null;
	var highLightColumn=null;
	
	if(globalTestParamChartJsonMod!=null){
		chartAttrbJson =  $.extend( true, {}, globalTestParamChartJsonMod[jsonTestKey.testUniqueCode]);
		highLightColumn=chartAttrbJson.highLightColumn;
	} else {
		chartAttrbJson =  $.extend( true, {}, globalTestParamChartJson[jsonTestKey.testUniqueCode]);
	}
	
	if(chartAttrbJson!=null && chartAttrbJson.tableDataExist=="1"){

		/*-----------------------------------*/
		if(chartAttrbJson.categories.length>3){
			chartAttrbJson.categories.length=3;
			chartAttrbJson.reqnUniqueCode.length=3;
		}
		
		for (x in chartAttrbJson.series){
			if(chartAttrbJson.series[x].data.length>3)
				chartAttrbJson.series[x].data.length=3;
		}
		
		for (x in chartAttrbJson.tableSeries){
			if(chartAttrbJson.tableSeries[x].data.length>3)
				chartAttrbJson.tableSeries[x].data.length=3;
		}
		/*-----------------------------------*/
		
		var tHeadTr=document.createElement("tr");
		
		$(tHeadTr).append("<th>Parameter Name</th>"); 
		for(y in chartAttrbJson.categories){ 
			
			var cssClass1="";
			var cssClass2="";
			if(highLightColumn!=null && highLightColumn==y){
				cssClass1+="highLightColumnColor";
				cssClass2+="highLightSpanColor";
			}
				
			$(tHeadTr).append("<th class='"+cssClass1+"'><span class='"+cssClass2+"'>"+chartAttrbJson.categories[y]+"</span></th>"); 
		}
		
		var tBody=document.createElement("tbody");
		for(i in chartAttrbJson.tableSeries){ 
			var tBodyTr=document.createElement("tr");
			var jsonParamData = chartAttrbJson.tableSeries[i].data;
			var isOutOfBound = chartAttrbJson.tableSeries[i].isOutOfBound;
			
			$(tBodyTr).append("<td>"+chartAttrbJson.tableSeries[i].name+"</td>");
			for (j in jsonParamData){

				var cssClass1="";
				var cssClass2="";
				if(isOutOfBound[j]=="1"){cssClass1+="text-danger "; cssClass2+="text-danger ";}
				if(highLightColumn!=null && highLightColumn==j){
					cssClass1+="highLightColumnColor";
					cssClass2+="highLightSpanColor";
				}
				
				$(tBodyTr).append("<td class='"+cssClass1+"'><span class='"+cssClass2+"'>"+jsonParamData[j]+"</span></td>");
			}
			 $(tBody).append(tBodyTr);
		}
		
		var tHead = document.createElement("thead");
		tHead=$(tHead).append(tHeadTr);
	
	
		
		$('#testParamTable-Div').empty();
		$('#testParamTable-Div').removeClass("d-none");
		var testParamTable = document.createElement("table");
		$(testParamTable).addClass("table table-striped table-bordered dt-responsive nowrap table-sm   rounded bg-white testParamTable");
		$(testParamTable).attr({"id":"testParamTable"});
		$(testParamTable).css({"width":"100%"});
		$('#testParamTable-Div').append(testParamTable);


		$('#testParamTable').append(tHead);
		$('#testParamTable').append(tBody);
		
		$('#testParamTable').DataTable({
		    "dom": "t",
		    responsive: true,
		    "ordering": false,
		    lengthChange: false,
		    "language": {
		      "emptyTable": "No Data Is Available "
		    }
		  }); 
	} else {
		$('#testParamTable-Div').addClass("d-none");
		$('#testParamTable-Div').empty();
	}
	
}

function redrawTestParamTable2(){
	if($("#graphTab").length && $("#graphTab").attr("aria-hidden")=="false"){
		 $('#testParamTable').DataTable().columns.adjust().responsive.recalc();
		 clearInterval(setIntervalTestParamTable2);
	}}

function modifyTestParamHighchartJson(jsonTestKey){


	var isGroup=jsonTestKey.isGroup;
	var testUniqueCode=jsonTestKey.testUniqueCode;
	var reqnUniqueCode = jsonTestKey.reqnUniqueCode;
	var reqnUniqueCodeIndex=null;
	
	 for (i in globalTestParamChartJson[testUniqueCode].reqnUniqueCode){
		 if(reqnUniqueCode==globalTestParamChartJson[testUniqueCode].reqnUniqueCode[i]){
			 reqnUniqueCodeIndex = i;
			 break;
		 };
	 }
	 
	/* -------------------------------------------------------------*/
	 if(reqnUniqueCodeIndex!=null){
		 if(globalTestParamChartJsonMod == null)
		 globalTestParamChartJsonMod =  $.extend( true, {},globalTestParamChartJson);
			 
			 var modTestJson = globalTestParamChartJsonMod[testUniqueCode];
			 
			 if(i>2){
				 
				 var tempCG = modTestJson.categories[2];
				 modTestJson.categories[2] = modTestJson.categories[i];
				 modTestJson.categories[i] = tempCG;
				 
				 var tempRUC = modTestJson.reqnUniqueCode[2];
				 modTestJson.reqnUniqueCode[2] = modTestJson.reqnUniqueCode[i];
				 modTestJson.reqnUniqueCode[i] = tempRUC;
				 
				 for(j in modTestJson.series){
					var tempSD = modTestJson.series[j].data[2];
					modTestJson.series[j].data[2] = modTestJson.series[j].data[i];
					modTestJson.series[j].data[i] = tempSD;
				 }
				 
				 for(j in modTestJson.tableSeries){
						var tempTS = modTestJson.tableSeries[j].data[2];
						modTestJson.tableSeries[j].data[2] = modTestJson.tableSeries[j].data[i];
						modTestJson.tableSeries[j].data[i] = tempTS;
						
						var tempOB = modTestJson.tableSeries[j].isOutOfBound[2];
						modTestJson.tableSeries[j].isOutOfBound[2] = modTestJson.tableSeries[j].isOutOfBound[i];
						modTestJson.tableSeries[j].isOutOfBound[i] = tempOB;
				 }

				 modTestJson.highLightColumn="2"; 
			 }
			 else if(i<=2){
				 modTestJson.highLightColumn=i;
			 }
			 
			 globalTestParamChartJsonMod[testUniqueCode] = modTestJson;
			 
	 } else {
		 alert("No Data Found For This Requisition");
	 }
	 /*  ---------------------------------------------------------------------------*/
}
for (key in reqnTestParamListJson.testCodeWise){
		var categories = [];
		var series = [];
		var paramCodeArr = [];
		var k=0;
		var j=0;

		var testData = reqnTestParamListJson.testCodeWise[key];
		graphTitle = testData.testName;
		var testCode = testData.testCode;
		testCode+="_t";

		/*-------------------------------TableJson-----------------------------------*/
	    var paramTableData={}; var tBoady = [];  var tHead=[]; tHead[0]="Requistion Date";
	    /*-------------------------------TableJson------------------------------------*/

	 for (reqnDnoPlusTestCode in testData.reqnDnoPlusTestCode){
		  var reqnDnoTests = testData.reqnDnoPlusTestCode[reqnDnoPlusTestCode];

		  categories.push(reqnDnoTests[0].dateTime);
		  j++; k=0; var newReqnFloat = true; var paramChangedArr = [];

		  /*----------------------------TableJson-------------------------*/
		  var i=1;  var tBoadyTr= []; tBoadyTr[0]=reqnDnoTests[0].dateTime;
		  /*----------------------------TableJson-------------------------*/

		for (key3 in reqnDnoTests){

			 var testParamData = reqnDnoTests[key3];

			 var testName = testParamData.testName;
			 var paramName = testParamData.paraName;
			 var paramCode = testParamData.paramCode;
			 var paraValue = testParamData.paraValue;
			 var refRange = testParamData.refRange;
			 var outOfBound = testParamData.outOfBound;
			 var dateTime = testParamData.dateTime;
			 var isInteger = testParamData.isInteger;
			 var paraValueFloat = parseFloat(paraValue);

			 if(j==1){
				 series.push(new Object());
				 series[k].name=paramName;
				 series[k].data=[]

				 paramCodeArr.push(new Object());
				 paramCodeArr[k].name = paramName;
				 paramCodeArr[k].code = paramCode;
				 paramChangedArr.push(k);
				 k++;

			 } else {
				 var flag = false;
				 for(l in paramCodeArr){

					 if(paramCode==paramCodeArr[l].code){
						 series[l].data.push(paraValueFloat);
						 paramChangedArr.push(l);
						 k++;
						 flag = true;
						}
				 	}

				   if(flag==false){
					     var m = paramCodeArr.length;

					   	 paramCodeArr.push(new Object());
						 paramCodeArr[m].name = paramName;
						 paramCodeArr[m].code = paramCode;

						 series.push(new Object());
						 series[m].name=paramName;
						 series[m].data=[];

						 for(var x=0; x<j; x++){series[m].data[x]=NaN;}
						 series[m].data[j]=paraValueFloat;

						 paramChangedArr.push(m);
						 k++;
				   }

			 }



			 /*---------------TableJson---------------*/
			 if(j==1){tHead[i]=paramName+"|"+refRange;}
			 tBoadyTr[i]=paraValue; i++;
			 /*---------------TableJson---------------*/
		}

		for(y in series){
			if( series[y].data.length < categories.length)
				series[y].data.push(NaN);
		}

		tBoady.push(tBoadyTr);

	 } paramTableData.title = graphTitle; paramTableData.tHead = tHead;  paramTableData.tBoady = tBoady;

	 var graphDataExist="0"; var tableDataExist="0";
	 if(categories.length>0 && series.length>0 ){var graphDataExist="1"}
	 if(tHead.length>0 && tBoady.length>0 ){var tableDataExist="1"}
	 testParamHighchartAttrbJson[testCode] = {"graphDataExist":graphDataExist, "categories":categories,"series":series, "graphTitle":graphTitle, "tableDataExist":tableDataExist, "paramTableData":paramTableData};
	}

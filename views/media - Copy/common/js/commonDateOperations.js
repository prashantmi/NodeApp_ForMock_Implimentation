/*Created By PrashantMi
* Java Script Methods For Common Date Operations
*/


function getIndexOfStringMonth(mon){

	mon=mon.toLowerCase();
	var index=0;
	var months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
	for (var i=0; i<months.length; i++){

	if(months[i].startsWith(mon))
	{ index=i+1;	}
	
	}
	return index
}


function stringToDate(_date,_format,_delimiter)
{
    var formatLowerCase=_format.toLowerCase();
    var formatItems=formatLowerCase.split(_delimiter);
    var dateItems=_date.split(_delimiter);

    var dateFormate="";
	var monthformat="";
	var yearFormat="";

for (var i=0; i<formatItems.length; i++){
	
	dateFormate=formatItems[i].startsWith("dd")?formatItems[i]:dateFormate;
	monthformat=formatItems[i].startsWith("mm")?formatItems[i]:monthformat;
	yearFormat=formatItems[i].startsWith("yy")?formatItems[i]:yearFormat;
}


 var dateIndex=formatItems.indexOf("dd");
 var dt=dateItems[dateIndex];

 var yearIndex=formatItems.indexOf("yyyy");
 var year=dateItems[yearIndex];

 var monthIndex="";
 var month="";

 if (monthformat=="mm"){
	monthIndex=formatItems.indexOf(monthformat);
	month=parseInt(dateItems[monthIndex])-1;
 }
 else if(monthformat=="mmm" || monthformat=="mmmm"){
	monthIndex=formatItems.indexOf(monthformat);
	month=parseInt(getIndexOfStringMonth(dateItems[monthIndex]))-1;
 }

 var formatedDate = new Date(year,month,dt);
	return formatedDate;
}





function diffDates(_fromDate, _toDate){

	var diffMilliseconds=_toDate -_fromDate

	var returnObject = {response:"false", reason:"", dates:0, months:0, years:0}

	if (diffMilliseconds>=0){
		var dateDiff=_toDate.getDate() - _fromDate.getDate();
		//var monthDiff=_toDate.getMonth()+1 - _fromDate.getMonth()+1;// Pluse 1 bcoz getMonth() method returns the month of a date as a number from 0 to 11.
		//var yearDiff = _toDate.getYear()+1900 - _fromDate.getYear()+1900 // Pluse 19900 bcoz getYear method returns year minus 1900.
		var monthDiff=_toDate.getMonth() - _fromDate.getMonth();
		var yearDiff = _toDate.getYear() - _fromDate.getYear();
		
		returnObject.response="true";
		returnObject.reason=yearDiff+" Years "+monthDiff+" Months and "+dateDiff+" Days";
		returnObject.dates=dateDiff;
		returnObject.months=monthDiff;
		returnObject.years=yearDiff;

		return returnObject;
	}
	else if (diffMilliseconds<0){
		returnObject.response="false";
		returnObject.reason="From Date can not be greater than To Date"
		return returnObject;
	}
	
	else{
		returnObject.response="false";
		returnObject.reason="Please select a valid"
		return returnObject;
	}
}



/*
stringToDate("17/9/2014","dd/MM/yyyy","/");
stringToDate("9/17/2014","mm/dd/yyyy","/")
stringToDate("9-17-2014","mm-dd-yyyy","-")
stringToDate("10-jan-2014","dd-mmm-yyyy","-")
stringToDate("10-january-2014","dd-mm-yy","-")
*/

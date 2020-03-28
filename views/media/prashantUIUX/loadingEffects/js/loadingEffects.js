

$(document).ready(function() {

	$('#container2Row1').on('hidden.bs.collapse', function () {
		  //$('#container1').removeClass("d-none");
		  //textFit(document.getElementsByClassName('textFit')[0], {multiLine: true});
		});

	$('#container2Row1').on('show.bs.collapse', function () {
		//$('#container1').addClass("d-none");
	});
	/*$('#container2ExpandBtn').click(function (){

	});*/
});

var tippyLoadingUtlInstance={};

$(document).ready(function(){

	var tippy_getDataBtnDiv=tippy('.getDataBtnDiv', {
	    delay: 100,
	    arrow: true,
	    arrowType: 'round',
	    size: 'large',
	    duration: 500,
	    animation: 'shift-away-extreme',
	    placement: 'bottom',
	    allowHTML: true,
	    content: '',
	});
	
	tippy_getDataBtnDiv[0].disable();

	tippyLoadingUtlInstance.getDataBtnDiv=tippy_getDataBtnDiv[0];

	/*var buttonTippy = document.querySelector('#estimatebtn');
    tippy(buttonTippy);
    var estimateRateTippyInstance = buttonTippy._tippy;
    estimateRateTippyInstance.setProps({
            content: stringg
            });
    estimateRateTippyInstance.show(0);
    instance.disable();*/
});



/*----------Loding Button Animation On Click Getdata Button starts----------------------------*/
function showLoading(showBoolean) {

  if (showBoolean == true) {
    $('#getData').addClass("d-none");
    $('#getingData').removeClass("d-none");
    $('.rollingCircle').removeClass("d-none");
    $('.lodingText').removeClass("d-none");
    $('#container2Row1').addClass("gradient-border");
    tippyLoadingUtlInstance.getDataBtnDiv.setContent('Loading.. Please Wait');
	tippyLoadingUtlInstance.getDataBtnDiv.enable();
	
  } else if (showBoolean == false) {
    $('#getingData').addClass("d-none");
    $('.lodingText').addClass("d-none");
    $('.rollingCircle').addClass("d-none");
    $('#getData').removeClass("d-none");
    $('#container2Row1').removeClass("gradient-border");
	  tippyLoadingUtlInstance.getDataBtnDiv.disable();
  } else {
    $('#getingData').addClass("d-none");
    $('.rollingCircle').addClass("d-none");
    $('.lodingText').addClass("d-none");
    $('#getData').removeClass("d-none");
    $('#container2Row1').removeClass("gradient-border");
    tippyLoadingUtlInstance.getDataBtnDiv.disable();
  }
}
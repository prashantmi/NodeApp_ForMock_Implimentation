//1st moves content

function callMenu(url, menu) {
	var selMenu = menu;
	parent.ajaxStartMenu();
	menu = menu.toString().replace(/_/g, ' ').replace(/XXY/g, '/').replace(
			/XXX/g, '&');
	parent.callMenu(url, menu);
	$("#" + selMenu).css("color", "#6D00D5");
	parent.ajaxCompleteMenu();

}

function getechodata(reqdno) {
	var remarks = "";
	var flg = false;
	var labTestCodeArray = "";
	var _mode = "GETECHODATA";
	var objXHR = {
		url : "/HISInvestigationG5/new_investigation/invResultValidationTemplateTile.cnt?hmode="
				+ _mode + "&ECHODNO=" + reqdno,
		sync : true,
		postData : "",
		handleAs : "text",
		load : function(data) {
			remarks = data;
		},
		error : function(error) {

		}
	};
	var objDojoAjax = dojo.xhrPost(objXHR);
	return remarks;

}

function hyper(thiss, url1) {
	var matchid = thiss.id;
	var values = matchid.split('#');

	var echodata = getechodata(values[0]);

	mywindow = window
			.open(url1 + "?requisitionDNo=" + values[0] + "&showStatus="
					+ status + "&testParaCode=" + values[3] + "&echodata="
					+ echodata, "_blank",
					"scrollbars=1,directories=no, status=no,width=1000, height=550,top=150");
}

function callOnClick(obj) {

	if (obj.checked == true) {
		showInstructions5canned(obj);
	}

}

function deleteTableInstcanned() {
	document.getElementsByName('cannedCode')[0].value = '';
	document.getElementsByName('cannedName')[0].value = '';

}

function showInstructions5canned(obj) {
	deleteTableInstcanned();
	addRowToTableInstcanned(obj);

	popup("popUpDiv5canned");

}

function closeInstructionscanned() {

	if (document.getElementsByName('cannedCode')[0].value == '') {
		alert("Enter Code");
	} else if (document.getElementsByName('cannedName')[0].value == '') {
		alert("Enter Name");
	} else {
		var code = document.getElementsByName('cannedCode')[0].value;
		var name = document.getElementsByName('cannedName')[0].value;
		var val = document.getElementsByName('cannedvall')[0].value;

		//ajax fire save modify canned but check code n name if already exist code set -1 n name set -2 in bo    
		var valuee = insertcanneddetailsAjax(val, code, name);

		if (valuee == "-1") {
			alert("Code Already Exist");
		}
		if (valuee == "-2") {
			alert("Name Already Exist.");
		}
		if (valuee == "-3") {
			alert("Name and Code Already Exist.");
		}
		if (valuee == "1") {

			val = val + "#chkbox"
			document.getElementById(val).checked = false;
			deleteTableInstcanned();
			popup("popUpDiv5canned");
		}

	}
}

function closecanned()

{
	var val = document.getElementsByName('cannedvall')[0].value;
	val = val + "#chkbox"
	document.getElementById(val).checked = false;
	popup("popUpDiv5canned");
}

function addRowToTableInstcanned(obj) {

	document.getElementsByName('cannedvall')[0].value = obj.name;

}

function insertcanneddetailsAjax(val, code, name) {
	var autoGenFormate = "";
	var resultEntryTemplateValue;

	var cbs = document.getElementsByName('chkResultValidationPatient');
	for (var i = 0; i < cbs.length; i++) {
		var values = document.getElementsByName('chkResultValidationPatient')[i].value;

		var labcode = values.split("#")[5];
		var checkBoxId = cbs[i].id;
		var splitTheCheckBoxId = checkBoxId.replace('chkBOx', '');

		var n = 0;
		for (n; n < document.getElementById(
				splitTheCheckBoxId + 'templateValue').getElementsByTagName(
				"textarea").length; n++) {
			get_tags = document.getElementById(
					splitTheCheckBoxId + 'templateValue').getElementsByTagName(
					"textarea");
			var name1 = get_tags[n].name;
			if (val == name1) {
				var id1 = document.getElementById(
						splitTheCheckBoxId + 'templateValue')
						.getElementsByTagName("textarea")[n].id;
				var editor = CKEDITOR.instances[id1];

				if (editor != null) {

					resultEntryTemplateValue = editor.getData();
					if (resultEntryTemplateValue.length > 12000) {
						alert("Editor Data limit is 12000, including spaces. Please don't exceed the limit");
						return false;

					}
				}
			}
		}
	}

	val = val.split("#")[3];
	var flg = false;
	resultEntryTemplateValue = resultEntryTemplateValue.replace(/&/g, "$");
	var _mode = "AJX_INSERT_MODIFY_CANNEDDETAILS";
	var objXHR = {
		url : "/HISInvestigationG5/new_investigation/invResultEntryTemplateTile.cnt?hmode="
				+ _mode
				+ "&cannedCode="
				+ code
				+ "&cannedName="
				+ name
				+ "&cannedValue="
				+ val
				+ "&cannedContent="
				+ resultEntryTemplateValue + "&modifycannedLabCode=" + labcode,
		sync : true,
		postData : "",
		handleAs : "text",
		load : function(data) {
			autoGenFormate = data;
			flg = true;
		},
		error : function(error) {
			labTestCodeArray = tmpLabTestCodeArray;
			flg = false;
		}
	};

	var objDojoAjax = dojo.xhrPost(objXHR);
	return autoGenFormate;

}

function showInstructions5(inst) {
	deleteTableInst();
	if (inst == "NA" || inst == "null")
		addRowToTableInst("No Instruction Available");
	else
		addRowToTableInst(inst);

	popup("popUpDiv5");

}

function closeInstructions() {
	popup("popUpDiv5");

}

function addRowToTableInst(inst) {

	var nRow = 0;
	var tableObj = document.getElementById('allInstructions');

	var tr = document.createElement("TR");

	tableObj.appendChild(tr);
	var numRows = tableObj.rows.length;
	nRow = numRows;

	var tabRow = tableObj.insertRow(numRows);
	tabRow.id = parseInt(nRow);

	var td1 = document.createElement("TD");

	td1.innerHTML = "<div  align='left' >" + inst + "</div>";
	td1.className = 'tdfont';
	td1.width = "1";

	tabRow.appendChild(td1);
}

function deleteTableInst() {

	for (var i = document.getElementById("allInstructions").rows.length - 1; i > 0; i--) {
		document.getElementById("allInstructions").deleteRow(i);

	}

}
function labBased() {
	if (!validateTodayOrDate()) {
		return false;
	}
	if (document.getElementsByName != "-1") {
		document.getElementsByName('onLoadValue')[0].value = "ONLOAD";
		document.getElementsByName('hmode')[0].value = "GETDETAILS";
		document.forms[0].submit();

	}
}

function doPagination(e, p) {
	document.getElementsByName('currentPage')[0].value = p;
	document.getElementsByName('hmode')[0].value = 'PAGINATION';
	document.forms[0].submit();
}
function onClickGO(hospitalCode) {
	var crno = document.getElementsByName("tempPatCRNo")[0].value;
	var textLength = crno.length;
	var hosCodeLen = hospitalCode.length;
	document.getElementsByName('onLoadValue')[0].value = "";

	if (!validateTodayOrDate()) {
		return false;
	}

	if (document.getElementsByName("searchBy")[0].checked == true) {
		showReqDate();

	} else {
		showCollDate();
	}

	if (hosCodeLen == 3) {
		if (textLength == 5 || textLength == 13 || textLength == 0) {
			document.getElementsByName("patCRNo")[0].value = "";
			if (textLength == 13) {
				document.getElementsByName("patCRNo")[0].value = crno;
			}

			if (document.getElementsByName("labCode")[0].value == "-1") {
				alert("Select Lab   Name ... ");
				document.getElementsByName("labCode")[0].focus();
				return false;
			}

			var genTypeValue = document.getElementsByName('generationType')[0].value;

			if (genTypeValue == "P") {
				if (document.getElementsByName("tempPatCRNo")[0].value == "-1") {
					alert("Select    Name ... ");
					document.getElementsByName("tempPatCRNo")[0].focus();
					return false;
				}

			}
			if (genTypeValue == "T") {
				if (document.getElementsByName("testWiseCode")[0].value == "-1") {
					alert("Select Test   Name ... ");
					document.getElementsByName("testWiseCode")[0].focus();
					return false;
				}

			}
			if (genTypeValue == "L") {
				if (document.getElementsByName("fromLabNo")[0].value == "-1") {
					alert("Select From Lab No ... ");
					document.getElementsByName("fromLabNo")[0].focus();
					return false;
				}

				if (document.getElementsByName("toLabNo")[0].value == "-1") {
					alert("Select To Lab No ... ");
					document.getElementsByName("toLabNo")[0].focus();
					return false;
				}
			}
			if (genTypeValue == "S") {

				if (document.getElementsByName("fromSampleNo")[0].value == "-1") {
					alert("Select From Sample No ... ");
					document.getElementsByName("fromSampleNo")[0].focus();
					return false;
				}

				if (document.getElementsByName("toSampleNo")[0].value == "-1") {
					alert("Select To Sample No ... ");
					document.getElementsByName("toSampleNo")[0].focus();
					return false;
				}

			}

			if (genTypeValue == "TG") {
				if (document.getElementsByName("testGroupCodeWise")[0].value == "-1") {
					alert("Select Test Group  Name ... ");
					document.getElementsByName("testGroupCodeWise")[0].focus();
					return false;
				}

			}
			document.getElementsByName('hmode')[0].value = "GETDETAILS";
			document.forms[0].submit();

		}

		else {
			alert("InValid CR No");
			if (document.getElementsByName("tempPatCRNo")[0]) {
				document.getElementsByName("tempPatCRNo")[0].focus()
			}

		}
	}
	if (hosCodeLen == 5) {
		if (textLength == 7 || textLength == 15 || textLength == 0) {
			document.getElementsByName("patCRNo")[0].value = "";
			if (textLength == 15) {
				document.getElementsByName("patCRNo")[0].value = crno;
			}
			if (document.getElementsByName("labCode")[0].value == "-1") {
				alert("Select Lab   Name ... ");

				document.getElementsByName("labCode")[0].focus();
				return false;
			}

			var genTypeValue = document.getElementsByName('generationType')[0].value;

			if (genTypeValue == "P") {
				if (document.getElementsByName("tempPatCRNo")[0].value == "-1") {
					alert("Select    Name ... ");
					document.getElementsByName("tempPatCRNo")[0].focus();
					return false;
				}

			}
			if (genTypeValue == "T") {
				if (document.getElementsByName("testWiseCode")[0].value == "-1") {
					alert("Select Test   Name ... ");
					document.getElementsByName("testWiseCode")[0].focus();
					return false;
				}

			}
			if (genTypeValue == "L") {
				if (document.getElementsByName("fromLabNo")[0].value == "-1") {
					alert("Select From Lab No ... ");
					document.getElementsByName("fromLabNo")[0].focus();
					return false;
				}

				if (document.getElementsByName("toLabNo")[0].value == "-1") {
					alert("Select To Lab No ... ");
					document.getElementsByName("toLabNo")[0].focus();
					return false;
				}
			}
			if (genTypeValue == "S") {

				if (document.getElementsByName("fromSampleNo")[0].value == "-1") {
					alert("Select From Sample No ... ");
					document.getElementsByName("fromSampleNo")[0].focus();
					return false;
				}

				if (document.getElementsByName("toSampleNo")[0].value == "-1") {
					alert("Select To Sample No ... ");
					document.getElementsByName("toSampleNo")[0].focus();
					return false;
				}

			}

			if (genTypeValue == "TG") {
				if (document.getElementsByName("testGroupCodeWise")[0].value == "-1") {
					alert("Select Test Group  Name ... ");
					document.getElementsByName("testGroupCodeWise")[0].focus();
					return false;
				}

			}
			document.getElementsByName('hmode')[0].value = "GETDETAILS";
			document.forms[0].submit();

		}

		else {
			alert("InValid CR No");
			if (document.getElementsByName("tempPatCRNo")[0]) {
				document.getElementsByName("tempPatCRNo")[0].focus()
			}

		}
	}
	return true;
}

//call this function to generate auto complete lists in runtime by passing the value of object list, id of the input tag and hidden tag. puneet.
function generateAuto(objList, autoId, hiddenId) {
	setInterval(function() {
		$(autoId).autocomplete({
			source : objList,
			select : function(event, ui) {
				$(hiddenId).val(ui.item.value);
				event.preventDefault();
				$(autoId).val(ui.item.label);
			},

			focus : function(event, ui) {
				event.preventDefault();
				$(autoId).val(ui.item.label);
			}
		});
	}, 1000);

}

//2rd moved content

function displaySamplePatDetails() {
	var count = 0;
	document.getElementsByName('isPatDetailPage')[0].value = "1";

	var concatenateChkBoxVal = "";
	var cbs = document.getElementsByName('chkSamplePatient');
	for (var i = 0; i < cbs.length; i++) {

		if (cbs[i].checked) {

			count++;
			concatenateChkBoxVal = concatenateChkBoxVal.concat(cbs[i].value);
			concatenateChkBoxVal += '@';
		}

	}

	if (count == 0) {
		alert("please select a record");
		return false;
	}

	document.getElementsByName('selectedCheckbox')[0].value = concatenateChkBoxVal;
	document.getElementsByName('hmode')[0].value = 'SHOWPATDETAILS';

	document.forms[0].submit();

}

function revalidateSamplePatDetails() {
	var count = 0;
	document.getElementsByName('isPatDetailPage')[0].value = "1";

	var concatenateChkBoxVal = "";
	var cbs = document.getElementsByName('chkSamplePatient');
	for (var i = 0; i < cbs.length; i++) {

		if (cbs[i].checked) {

			count++;
			concatenateChkBoxVal = concatenateChkBoxVal.concat(cbs[i].value);
			concatenateChkBoxVal += '@';
		}

	}

	if (count == 0) {
		alert("please select a record");
		return false;
	}

	document.getElementsByName('selectedCheckbox')[0].value = concatenateChkBoxVal;
	document.getElementsByName('hmode')[0].value = 'REVALIDATE';

	document.forms[0].submit();

}

function ValidateSameCrNo(obj) {

	if (obj.checked) {
		document.getElementById('nextDiv').style.display = "";
		document.getElementById('nextDiv1').style.display = "";
	} else {
		document.getElementById('gob').style.display = "";
		document.getElementById('cancel').style.display = "";

	}

	var objCurrentCheckBox = obj.value;
	if (obj.checked) {

		var cbs = document.getElementsByTagName('input');
		for (var i = 0; i < cbs.length; i++) {
			if (cbs[i].type == 'checkbox') {

				if (cbs[i].checked
						&& (cbs[i].value.split("#")[0] != objCurrentCheckBox
								.split("#")[0])) {

				}
			}
		}
	}

}

function displayAllTest(size) {
	var k = 0;
	for (k = 0; k < size; k++) {
		if (document.getElementById("headings" + k) != null)
			document.getElementById("headings" + k).style.display = "";
		if (document.getElementById("hideTest" + k) != null)
			document.getElementById("hideTest" + k).style.display = "";
		if (document.getElementById("showTest" + k) != null)
			document.getElementById("showTest" + k).style.display = "none";

		document.getElementById("showAllTest").style.display = "none";
		document.getElementById("hideAllTest").style.display = "";
	}
}

function hideAllTests(size) {
	var k = 0;
	for (k = 0; k < size; k++) {

		if (document.getElementById("headings" + k) != null)
			document.getElementById("headings" + k).style.display = "none";
		if (document.getElementById("hideTest" + k) != null)
			document.getElementById("hideTest" + k).style.display = "none";
		if (document.getElementById("showTest" + k) != null)
			document.getElementById("showTest" + k).style.display = "";

		document.getElementById("showAllTest").style.display = "";

		document.getElementById("hideAllTest").style.display = "none";

	}
}

function showTestDetails(k, val) {
	var val1 = k;

	var chkValue = document.getElementsByName("chkValue")[0].value.split("&");
	for (i = 0; i < chkValue.length; i++) {
		if (val == chkValue[i]) {
			val1++;
		}

	}
	if (k != val1) {
		for (j = k; j < val1; j++) {

			document.getElementById("headings" + j).style.display = "";
		}
	} else {
		document.getElementById("headings" + k).style.display = "";

	}

	document.getElementById("hideTest" + k).style.display = "";
	document.getElementById("showTest" + k).style.display = "none";

}

function hideTestDetails(k, val) {
	var val1 = k;
	var chkValue = document.getElementsByName("chkValue")[0].value.split("&");
	for (i = 0; i < chkValue.length; i++) {
		if (val == chkValue[i]) {
			val1++;
		}

	}
	if (k != val1) {
		for (j = k; j < val1; j++) {

			document.getElementById("headings" + j).style.display = "none";
		}
	} else {
		document.getElementById("headings" + k).style.display = "none";

	}
	document.getElementById("hideTest" + k).style.display = "none";
	document.getElementById("showTest" + k).style.display = "";
}

function showPatDetails(k) {
	document.getElementById("showhide" + k).style.display = "";
	document.getElementById("hide" + k).style.display = "";
	document.getElementById("show" + k).style.display = "none";

}

function hidePatDetails(k) {
	document.getElementById("showhide" + k).style.display = "none";
	document.getElementById("hide" + k).style.display = "none";
	document.getElementById("show" + k).style.display = "";
}

function submitFor() {
	document.getElementsByName('showStatus')[0].value = '0';
	document.getElementsByName('hmode')[0].value = 'NEW';
	document.forms[0].submit();
}

function selectAll() {
	var cbs = document.getElementsByName('chkResultValidationPatient');

	for (var i = 0; i < cbs.length; i++)
		cbs[i].checked = true;

	onSave();
}

function onSave() {
	var count = 0;
	var concatenateChkBoxVal = "";
	var cbs = document.getElementsByName('chkResultValidationPatient');
	var name;
	var splitTemplateValue;
	var reqNO = [];
	var parameterValue = [];
	var parameterCode = [];
	var parantParameter = [];
	var resultValidationTemplateValue = [];
	for (var i = 0; i < cbs.length; i++) {
		if (cbs[i].checked) {

			var commentsboxdata = cbs[i].value;

			if (commentsboxdata.split("#")[19] != "NA") {
				var sampleid = commentsboxdata.split("#")[20];
				sampleid = sampleid.split("/")[0];
				commentsboxdata = commentsboxdata.split("#")[0] + "#"
						+ commentsboxdata.split("#")[1] + "#" + sampleid;
			} else
				commentsboxdata = commentsboxdata.split("#")[0] + "#"
						+ commentsboxdata.split("#")[1] + "#";

			if (document.getElementById(commentsboxdata) != null) {

				var commentBoxEditedValue = "";
				if (document.getElementById(commentsboxdata).value == "") {
					document.getElementById(commentsboxdata).value = " ";
				} else {
					commentBoxEditedValue = document
							.getElementById(commentsboxdata).value;
					var check23 = checkReservedCahracters(commentBoxEditedValue);
					if (check23 == true) {
						alert("Document contains one of the reserved characters '@!#$^|\\`' which is not allowed. Please remove them.");
						return;
					} else {

					}
					commentBoxEditedValue = removeSpecialCharacter(commentBoxEditedValue);
					document.getElementById(commentsboxdata).value = commentBoxEditedValue;
				}

				cbs[i].value = cbs[i].value + "#"
						+ document.getElementById(commentsboxdata).value;

			} else {

				cbs[i].value = cbs[i].value + "#" + " ";

			}

			/* Added By prashant For Indication */
			var indicationInputId = "indicationInput#"
					+ document.getElementsByName('chkResultValidationPatient')[i].value
							.split("#")[1];

			var indicationInputElement = document
					.getElementById(indicationInputId);

			if (indicationInputElement && indicationInputElement.value != null
					&& indicationInputElement.value != "") {
				var checkspes = checkReservedCahracters(indicationInputElement.value);
				if (checkspes == true) {
					alert("Indication contains one of the reserved characters '@!#$^|\\`' which is not allowed. Please remove them.");
					return;
				} else {
				}
				indicationInputElement.value = removeSpecialCharacter(indicationInputElement.value);
				document.getElementsByName('chkResultValidationPatient')[i].value = document
						.getElementsByName('chkResultValidationPatient')[i].value
						+ "#" + indicationInputElement.value;
			} else {

				document.getElementsByName('chkResultValidationPatient')[i].value = document
						.getElementsByName('chkResultValidationPatient')[i].value
						+ "#" + " "
			}

			count++;
			var k = 0;

			var checkBoxId = cbs[i].id;

			var splitTheCheckBoxId = checkBoxId.replace('chkBOx', '');

			for (k; k < document.getElementById(
					splitTheCheckBoxId + 'templateValue').getElementsByTagName(
					"input").length; k++) {

				var values = document.getElementById(splitTheCheckBoxId
						+ "chkBOx").value;

				get_tags = document.getElementById(
						splitTheCheckBoxId + 'templateValue')
						.getElementsByTagName("input");
				name = get_tags[k].name;
				id = get_tags[k].id;
				hiddenid = "hiddenid" + id;
				defaultid = "default" + hiddenid;
				typ = get_tags[k].type;
				hidddentext = "hidden";

				if (typ != hidddentext) {

					splitTemplateValue = name.split("#");
					reqNO.push(splitTemplateValue[0]);
					parameterValue = splitTemplateValue[3];
					parameterCode.push(parameterValue.substring(0, 5));
					parantParameter.push(parameterValue.substring(9, 18));

					var resultValidationTemplateValue = "";

					if (id.indexOf('auto') != -1) {

						if (document.getElementById(hiddenid).value != null
								&& document.getElementById(hiddenid).value != "")
							resultValidationTemplateValue = document
									.getElementById(hiddenid).value;
						else
							resultValidationTemplateValue = document
									.getElementById(defaultid).value;
					} else {
						if (id.indexOf('chkbox') == -1) {

							if (typ == 'checkbox') {

								if (document.getElementById(id).checked == true) {

									resultValidationTemplateValue = "1";
								}
								if (document.getElementById(id).checked == false) {
									resultValidationTemplateValue = "0";
								}
							} else if (typ == 'file') {

								var x = document.getElementById(name);
								var file = x.files[0];

								var uploadid = "view@@" + name;

								if (file != undefined)
									resultValidationTemplateValue = "File Uploaded";
								else if (document.getElementById(uploadid) != null
										&& document.getElementById(uploadid).className != null)
									resultValidationTemplateValue = "File Uploaded";

							}

							else
								resultValidationTemplateValue = document
										.getElementById(
												splitTheCheckBoxId
														+ 'templateValue')
										.getElementsByTagName("input")[k].value;

							var check23 = checkReservedCahracters(resultValidationTemplateValue);
							if (check23 == true) {
								alert("Document contains one of the reserved characters '@!#$^|\\`' which is not allowed. Please remove them.");
								return;
							} else {

							}

							resultValidationTemplateValue = removeSpecialCharacter(resultValidationTemplateValue);

							name += '#' + resultValidationTemplateValue + '#'
									+ values + "#" + "-";
							;

							concatenateChkBoxVal = concatenateChkBoxVal
									.concat(name);
							concatenateChkBoxVal += '@';
						}
					}
				}

			}

			var j = 0;
			for (j; j < document.getElementById(
					splitTheCheckBoxId + 'templateValue').getElementsByTagName(
					"select").length; j++) {
				var values = document.getElementById(splitTheCheckBoxId
						+ "chkBOx").value;

				get_tags = document.getElementById(
						splitTheCheckBoxId + 'templateValue')
						.getElementsByTagName("select");
				name = get_tags[j].name;

				var multiValue = "";
				var resultEntryTemplateValue;
				if (document.getElementById(
						splitTheCheckBoxId + 'templateValue')
						.getElementsByTagName("select")[j].options[0].value != "-1")
					for (var kk = 0; kk < document.getElementById(
							splitTheCheckBoxId + 'templateValue')
							.getElementsByTagName("select")[j].length; kk++) {
						if (document.getElementById(
								splitTheCheckBoxId + 'templateValue')
								.getElementsByTagName("select")[j].options[kk].selected == true) {
							multiValue += document.getElementById(
									splitTheCheckBoxId + 'templateValue')
									.getElementsByTagName("select")[j].options[kk].value;
							multiValue += "$";

						}
						resultEntryTemplateValue = multiValue
					}

				else
					resultEntryTemplateValue = document.getElementById(
							splitTheCheckBoxId + 'templateValue')
							.getElementsByTagName("select")[j].value;

				name += '#' + resultEntryTemplateValue + '#' + values + "#"
						+ "-";

				concatenateChkBoxVal = concatenateChkBoxVal.concat(name);
				concatenateChkBoxVal += '@';

			}

			var n = 0;
			for (n; n < document.getElementById(
					splitTheCheckBoxId + 'templateValue').getElementsByTagName(
					"textarea").length; n++) {

				var values = document.getElementById(splitTheCheckBoxId
						+ "chkBOx").value;

				get_tags = document.getElementById(
						splitTheCheckBoxId + 'templateValue')
						.getElementsByTagName("textarea");
				name = get_tags[n].name;

				var id1 = document.getElementById(
						splitTheCheckBoxId + 'templateValue')
						.getElementsByTagName("textarea")[n].id;
				var editor = CKEDITOR.instances[id1];

				if (editor != null) {

					var resultEntryTemplateValue = editor.getData();

					resultEntryTemplateValue = resultEntryTemplateValue
							.replace(
									"&#39;",
									"<img id='base64image'src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAMCAIAAADONVt5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAlSURBVBhXY/iPAUgSur8gKmrBfQgbr1DdQQiTNOORAZlC//8DADcC0LbmFlSzAAAAAElFTkSuQmCC' />",
									true);

					var check23 = checkReservedCahracters(resultEntryTemplateValue);
					if (check23 == true) {
						alert("Document contains one of the reserved characters '@!#$^|\\`' which is not allowed. Please remove them.");
						return;
					} else {

					}
					resultEntryTemplateValue = removeSpecialCharacterEditor(resultEntryTemplateValue);

					if (resultEntryTemplateValue.length > 12000) {
						alert("Editor Data limit is 12000, including spaces. Please don't exceed the limit");
						return false;

					}
					name += '#' + resultEntryTemplateValue + '#' + values + "#"
							+ "-";

				}

				else {
					var resultEntryTemplateValue = document.getElementById(
							splitTheCheckBoxId + 'templateValue')
							.getElementsByTagName("textarea")[n].value;

					var check23 = checkReservedCahracters(resultEntryTemplateValue);
					if (check23 == true) {
						alert("Document contains one of the reserved characters '@!#$^|\\`' which is not allowed. Please remove them.");
						return;
					} else {

					}

					resultEntryTemplateValue = removeSpecialCharacter(resultEntryTemplateValue);

					name += '#' + resultEntryTemplateValue + '#' + values + "#"
							+ "-";

				}
				concatenateChkBoxVal = concatenateChkBoxVal.concat(name);
				concatenateChkBoxVal += '@';

			}

			/* added by chandan */
			k = 0;
			for (k; k < document.getElementById(
					splitTheCheckBoxId + 'templateValue').getElementsByTagName(
					"a").length; k++) {

				var values = document.getElementById(splitTheCheckBoxId
						+ "chkBOx").value;
				get_tags = document.getElementById(
						splitTheCheckBoxId + 'templateValue')
						.getElementsByTagName("a");
				name = get_tags[k].name;
				id = get_tags[k].id;
				if (id.includes("view@@") == false) // not to add file upload view hyperlink option by chandan 
				{
					if (id.indexOf("template") != -1) {
						splitTemplateValue = id.split("#");
						reqNO.push(splitTemplateValue[0])
						parameterValue = splitTemplateValue[3];

						var resultEntryTemplateValue = document
								.getElementsByName('hyperLinkTableSession')[0].value;

						if (document.getElementsByName('hyperLinkTableSession')[0].value == "") {
							var ide = id;
							ide = "divId_" + id;
							var ider = "idd" + id;
							if (document.getElementById(ider) != null
									&& document.getElementById(ider).innerHTML != '') {
								var idee1 = id.split("#")[0] + "$$";
								idee1 += id.split("#")[3] + "$$";
								resultEntryTemplateValue = "hyperchanks";

							}

							else if (document.getElementById(ide) != null
									&& document.getElementById(ide).innerHTML != '') {
								var idee = id.split("#")[0] + "$$";
								idee += id.split("#")[3] + "$$";
								resultEntryTemplateValue = "hyperchanks";

							} else if (document.getElementById(ide) != null
									&& document.getElementById(ide).innerHTML != '') {

								var idee = id.split("#")[0] + "$$";
								idee += id.split("#")[3] + "$$";
								resultEntryTemplateValue = "hyperchanks";

							}

						}
						if (id.includes("view@@") == false) // not to add file upload view hyperlink option by chandan 
						{

							var tocheckfnctn = document.getElementById(id).onclick;
							var valuoffuncntn = tocheckfnctn;
							valuoffuncntn = valuoffuncntn.toString();

							if (valuoffuncntn.includes("echo")) {

								name += id + "#" + resultEntryTemplateValue
										+ "#" + values + "#-";

							} else {
								name += id + "#" + resultEntryTemplateValue
										+ "#" + values + "#hyperlink";

							}
							concatenateChkBoxVal = concatenateChkBoxVal
									.concat(name);
							concatenateChkBoxVal += '@';
						}

					}
				}
			}

		}

	}

	document.getElementsByName('resultValidationTemplateValueWithHash')[0].value = concatenateChkBoxVal;

	if (count == 0) {
		alert("please select a Atleast One record");
		return false;
	}

	document.getElementsByName('showStatus')[0].value = '0';
	document.getElementsByName('hmode')[0].value = "SAVE";
	document.forms[0].submit();

	return false;

}

function modifyAll() {
	var cbs = document.getElementsByName('chkResultValidationPatient');

	for (var i = 0; i < cbs.length; i++)
		cbs[i].checked = true;

	onModify();
}

function onModify() {
	var count = 0;
	var concatenateChkBoxVal = "";
	var cbs = document.getElementsByName('chkResultValidationPatient');
	var name;
	var splitTemplateValue;
	var reqNO = [];
	var parameterValue = [];
	var parameterCode = [];
	var parantParameter = [];
	var resultValidationTemplateValue = [];
	for (var i = 0; i < cbs.length; i++) {
		if (cbs[i].checked) {

			var commentsboxdata = cbs[i].value;

			if (commentsboxdata.split("#")[19] != "NA") {
				var sampleid = commentsboxdata.split("#")[20];
				sampleid = sampleid.split("/")[0];
				commentsboxdata = commentsboxdata.split("#")[0] + "#"
						+ commentsboxdata.split("#")[1] + "#" + sampleid;
			} else
				commentsboxdata = commentsboxdata.split("#")[0] + "#"
						+ commentsboxdata.split("#")[1] + "#";

			if (document.getElementById(commentsboxdata) != null) {
				var commentBoxEditedValue = "";
				if (document.getElementById(commentsboxdata).value == "") {
					document.getElementById(commentsboxdata).value = " ";
				} else {
					commentBoxEditedValue = document
							.getElementById(commentsboxdata).value;
					var check23 = checkReservedCahracters(commentBoxEditedValue);
					if (check23 == true) {
						alert("Document contains one of the reserved characters '@!#$^|\\`' which is not allowed. Please remove them.");
						return;
					} else {

					}
					commentBoxEditedValue = removeSpecialCharacter(commentBoxEditedValue);
					document.getElementById(commentsboxdata).value = commentBoxEditedValue;
				}

				cbs[i].value = cbs[i].value + "#"
						+ document.getElementById(commentsboxdata).value;

			} else {

				cbs[i].value = cbs[i].value + "#" + " ";

			}

			/* Added By prashant For Indication */
			var indicationInputId = "indicationInput#"
					+ document.getElementsByName('chkResultValidationPatient')[i].value
							.split("#")[1];
			var indicationInputElement = document
					.getElementById(indicationInputId);

			if (indicationInputElement && indicationInputElement.value != null
					&& indicationInputElement.value != "") {
				var checkspes = checkReservedCahracters(indicationInputElement.value);
				if (checkspes == true) {
					alert("Indication contains one of the reserved characters '@!#$^|\\`' which is not allowed. Please remove them.");
					return;
				} else {
				}
				indicationInputElement.value = removeSpecialCharacter(indicationInputElement.value);
				document.getElementsByName('chkResultValidationPatient')[i].value = document
						.getElementsByName('chkResultValidationPatient')[i].value
						+ "#" + indicationInputElement.value;
			} else {

				document.getElementsByName('chkResultValidationPatient')[i].value = document
						.getElementsByName('chkResultValidationPatient')[i].value
						+ "#" + " "
			}

			count++;
			var k = 0;

			var checkBoxId = cbs[i].id;

			var splitTheCheckBoxId = checkBoxId.replace('chkBOx', '');

			for (k; k < document.getElementById(
					splitTheCheckBoxId + 'templateValue').getElementsByTagName(
					"input").length; k++) {

				var values = document.getElementById(splitTheCheckBoxId
						+ "chkBOx").value;

				get_tags = document.getElementById(
						splitTheCheckBoxId + 'templateValue')
						.getElementsByTagName("input");
				name = get_tags[k].name;
				id = get_tags[k].id;
				hiddenid = "hiddenid" + id;
				defaultid = "default" + hiddenid;
				typ = get_tags[k].type;
				hidddentext = "hidden";

				if (typ != hidddentext) {

					splitTemplateValue = name.split("#");
					reqNO.push(splitTemplateValue[0]);
					parameterValue = splitTemplateValue[3];
					parameterCode.push(parameterValue.substring(0, 5));
					parantParameter.push(parameterValue.substring(9, 18));

					var resultValidationTemplateValue = "";

					if (id.indexOf('auto') != -1) {

						if (document.getElementById(hiddenid).value != null
								&& document.getElementById(hiddenid).value != "")
							resultValidationTemplateValue = document
									.getElementById(hiddenid).value;
						else
							resultValidationTemplateValue = document
									.getElementById(defaultid).value;
					} else {
						if (id.indexOf('chkbox') == -1) {

							if (typ == 'checkbox') {
								if (document.getElementById(id).checked == true) {
									resultValidationTemplateValue = "1";
								}
								if (document.getElementById(id).checked == false) {
									resultValidationTemplateValue = "0";
								}
							}

							else if (typ == 'file') {

								var x = document.getElementById(name);
								var file = x.files[0];

								var uploadid = "view@@" + name;
								if (file != undefined)
									resultValidationTemplateValue = "File Uploaded";
								else if (document.getElementById(uploadid) != null
										&& document.getElementById(uploadid).className != null)
									resultValidationTemplateValue = "File Uploaded";

							}

							else
								resultValidationTemplateValue = document
										.getElementById(
												splitTheCheckBoxId
														+ 'templateValue')
										.getElementsByTagName("input")[k].value;

							var check23 = checkReservedCahracters(resultValidationTemplateValue);
							if (check23 == true) {
								alert("Document contains one of the reserved characters '@!#$^|\\`' which is not allowed. Please remove them.");
								return;
							} else {

							}

							resultValidationTemplateValue = removeSpecialCharacter(resultValidationTemplateValue);

							name += '#' + resultValidationTemplateValue + '#'
									+ values + "#" + "-";

							concatenateChkBoxVal = concatenateChkBoxVal
									.concat(name);
							concatenateChkBoxVal += '@';
						}
					}
				}

			}
			var j = 0;
			for (j; j < document.getElementById(
					splitTheCheckBoxId + 'templateValue').getElementsByTagName(
					"select").length; j++) {
				var values = document.getElementById(splitTheCheckBoxId
						+ "chkBOx").value;
				get_tags = document.getElementById(
						splitTheCheckBoxId + 'templateValue')
						.getElementsByTagName("select");
				name = get_tags[j].name;

				var multiValue = "";
				var resultEntryTemplateValue;
				if (document.getElementById(
						splitTheCheckBoxId + 'templateValue')
						.getElementsByTagName("select")[j].options[0].value != "-1")
					for (var kk = 0; kk < document.getElementById(
							splitTheCheckBoxId + 'templateValue')
							.getElementsByTagName("select")[j].length; kk++) {

						if (document.getElementById(
								splitTheCheckBoxId + 'templateValue')
								.getElementsByTagName("select")[j].options[kk].selected == true) {
							multiValue += document.getElementById(
									splitTheCheckBoxId + 'templateValue')
									.getElementsByTagName("select")[j].options[kk].value;
							multiValue += "$";

						}
						resultEntryTemplateValue = multiValue
					}

				else
					resultEntryTemplateValue = document.getElementById(
							splitTheCheckBoxId + 'templateValue')
							.getElementsByTagName("select")[j].value;

				name += '#' + resultEntryTemplateValue + '#' + values + "#"
						+ "-";

				concatenateChkBoxVal = concatenateChkBoxVal.concat(name);
				concatenateChkBoxVal += '@';

			}

			var n = 0;
			for (n; n < document.getElementById(
					splitTheCheckBoxId + 'templateValue').getElementsByTagName(
					"textarea").length; n++) {

				var values = document.getElementById(splitTheCheckBoxId
						+ "chkBOx").value;

				get_tags = document.getElementById(
						splitTheCheckBoxId + 'templateValue')
						.getElementsByTagName("textarea");
				name = get_tags[n].name;

				var id1 = document.getElementById(
						splitTheCheckBoxId + 'templateValue')
						.getElementsByTagName("textarea")[n].id;
				var editor = CKEDITOR.instances[id1];

				if (editor != null) {

					var resultEntryTemplateValue = editor.getData();
					resultEntryTemplateValue = resultEntryTemplateValue
							.replace(
									"&#39;",
									"<img id='base64image'src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAMCAIAAADONVt5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAlSURBVBhXY/iPAUgSur8gKmrBfQgbr1DdQQiTNOORAZlC//8DADcC0LbmFlSzAAAAAElFTkSuQmCC' />",
									true);

					var check23 = checkReservedCahracters(resultEntryTemplateValue);
					if (check23 == true) {
						alert("Document contains one of the reserved characters '@!#$^|\\`' which is not allowed. Please remove them.");
						return;
					} else {

					}
					resultEntryTemplateValue = removeSpecialCharacterEditor(resultEntryTemplateValue);

					if (resultEntryTemplateValue.length > 12000) {
						alert("Editor Data limit is 12000, including spaces. Please don't exceed the limit");
						return false;

					}
					name += '#' + resultEntryTemplateValue + '#' + values + "#"
							+ "-";

				}

				else {
					var resultEntryTemplateValue = document.getElementById(
							splitTheCheckBoxId + 'templateValue')
							.getElementsByTagName("textarea")[n].value;

					var check23 = checkReservedCahracters(resultEntryTemplateValue);
					if (check23 == true) {
						alert("Document contains one of the reserved characters '@!#$^|\\`' which is not allowed. Please remove them.");
						return;
					} else {

					}

					resultEntryTemplateValue = removeSpecialCharacter(resultEntryTemplateValue);

					name += '#' + resultEntryTemplateValue + '#' + values + "#"
							+ "-";

				}
				concatenateChkBoxVal = concatenateChkBoxVal.concat(name);
				concatenateChkBoxVal += '@';

			}

			/* added by chandan */
			k = 0;
			for (k; k < document.getElementById(
					splitTheCheckBoxId + 'templateValue').getElementsByTagName(
					"a").length; k++) {

				var values = document.getElementById(splitTheCheckBoxId
						+ "chkBOx").value;
				get_tags = document.getElementById(
						splitTheCheckBoxId + 'templateValue')
						.getElementsByTagName("a");
				name = get_tags[k].name;
				id = get_tags[k].id;
				if (id.indexOf("template") != -1) {
					splitTemplateValue = id.split("#");
					reqNO.push(splitTemplateValue[0])
					parameterValue = splitTemplateValue[3];

					var resultEntryTemplateValue = document
							.getElementsByName('hyperLinkTableSession')[0].value;

					if (id.includes("view@@") == false) // not to add file upload view hyperlink option by chandan 
					{
						name += id + "#" + resultEntryTemplateValue + "#"
								+ values + "#hyperlink";
						concatenateChkBoxVal = concatenateChkBoxVal
								.concat(name);
						concatenateChkBoxVal += '@';
					}

				}
			}

		}

	}

	document.getElementsByName('resultValidationTemplateValueWithHash')[0].value = concatenateChkBoxVal;

	if (count == 0) {
		alert("please select a Atleast One record");
		return false;
	}

	document.getElementsByName('showStatus')[0].value = '0';
	document.getElementsByName('hmode')[0].value = "MODIFY";
	document.forms[0].submit();

	return false;

}

function getDetails(obj) {

	document.getElementsByName('generationType')[0].value = obj.value;

	if (document.getElementsByName("labCode")[0].value == "-1") {//testGroupWise
		alert("Select Lab   Name ... ");
		document.getElementsByName("patientWise")[0].checked = true;
		document.getElementsByName("allPatient")[0].checked = false;
		document.getElementsByName("testGroupWise")[0].checked = false;
		document.getElementsByName("testWise")[0].checked = false;
		document.getElementsByName("sampleNoWise")[0].checked = false;
		document.getElementsByName("labNoWise")[0].checked = false;
		document.getElementsByName("labCode")[0].focus();
		return false;
	}
	document.getElementsByName('hmode')[0].value = 'GETDETAILS';
	document.forms[0].submit();
	if (obj.value == "P") {

		document.getElementById("patientwise").style.display = "";
		document.getElementById("patientwisename").style.display = "";
		document.getElementById("testwise").style.display = "none";
		document.getElementById("labnowise").style.display = "none";
		document.getElementById("labnowise2").style.display = "none";
		document.getElementById("samplenowise").style.display = "none";
	}
	if (obj.value == "T") {

		document.getElementById("testwise").style.display = "";
		document.getElementById("patientwise").style.display = "none";
		document.getElementById("patientwisename").style.display = "none";
		document.getElementById("labnowise").style.display = "none";
		document.getElementById("labnowise2").style.display = "none";
		document.getElementById("samplenowise").style.display = "none";
	}
	if (obj.value == "L") {

		document.getElementById("labnowise").style.display = "";
		document.getElementById("labnowise2").style.display = "";
		document.getElementById("patientwise").style.display = "none";
		document.getElementById("patientwisename").style.display = "none";
		document.getElementById("testwise").style.display = "none";
		document.getElementById("samplenowise").style.display = "none";
	}
	if (obj.value == "S") {
		document.getElementById("samplenowise").style.display = "";
		document.getElementById("patientwise").style.display = "none";
		document.getElementById("patientwisename").style.display = "none";
		document.getElementById("testwise").style.display = "none";
		document.getElementById("labnowise").style.display = "none";
		document.getElementById("labnowise2").style.display = "none";

	}

	if (obj.value == "TG") {

		document.getElementById("testGrpWise").style.display = "";
		document.getElementById("samplenowise").style.display = "none";
		document.getElementById("samplenowise2").style.display = "none";
		document.getElementById("toLabSampleNo").style.display = "none";
		document.getElementById("patientwise").style.display = "none";
		document.getElementById("patientwisename").style.display = "none";
		document.getElementById("testwise").style.display = "none";
		document.getElementById("labnowise").style.display = "none";
		document.getElementById("labnowise2").style.display = "none";

	}

	if (obj.value == "AP") {

		document.getElementById("testGrpWise").style.display = "none";
		document.getElementById("samplenowise").style.display = "none";
		document.getElementById("samplenowise2").style.display = "none";
		document.getElementById("toLabSampleNo").style.display = "none";
		document.getElementById("patientwise").style.display = "none";
		document.getElementById("patientwisename").style.display = "none";
		document.getElementById("testwise").style.display = "none";
		document.getElementById("labnowise").style.display = "none";
		document.getElementById("labnowise2").style.display = "none";

		labBased();
	}
}

//3rd moved code

function checkEntryType() {

	if (refrenceRangeColorCde != "") {

		for (var k = 0; k < refrenceRangeColorCde.split("@@@").length; k++) {
			document.getElementsByName(refrenceRangeColorCde.split("@@@")[k])[0].style.color = "red";
		}
	}

	var selectedCheckbox = document.getElementsByName('selectedCheckbox')[0].value;

	var reqdno = selectedCheckbox.split("#")[2];

	call();
	if (document.getElementsByName("ispreview")[0].value == "2") // this check for preview only disable all inputs by chandan
	{

		$("a").attr('onclick', false);
		$('input').attr('disabled', true);

		$('select').attr('disabled', true);
		$('textarea').attr('disabled', true);
		// 
	}
	if (document.getElementsByName("searchBy").length) {
		if (document.getElementsByName("searchBy")[0].checked == true) {
			document.getElementsByName("searchBy")[0].value == "1";
			document.getElementsByName("searchBy")[1].checked = false;
			showReqDate();
		} else {
			document.getElementsByName("searchBy")[0].value == "0";
			document.getElementsByName("searchBy")[0].checked = false;
			showCollDate();
		}
	}

	var genTypeValue = document.getElementsByName('generationType')[0].value;
	if (genTypeValue == '') {
		if ($("#showOnLoad").length)
			document.getElementById("showOnLoad").style.display = "";
		if ($("#patient").length)
			document.getElementById("patient").checked = true;
	}

	if (genTypeValue == "P") {

		document.getElementById("patientwise").style.display = "";
		document.getElementById("patientwisename").style.display = "";
		document.getElementById("testwise").style.display = "none";
		document.getElementById("labnowise").style.display = "none";
		document.getElementById("labnowise2").style.display = "none";
		document.getElementById("samplenowise").style.display = "none";
		document.getElementById("samplenowise2").style.display = "none";
		document.getElementById("toLabSampleNo").style.display = "none";
	}
	if (genTypeValue == "T") {

		document.getElementById("testwise").style.display = "";
		document.getElementById("patientwise").style.display = "none";
		document.getElementById("patientwisename").style.display = "none";
		document.getElementById("labnowise").style.display = "none";
		document.getElementById("labnowise2").style.display = "none";
		document.getElementById("samplenowise").style.display = "none";
		document.getElementById("samplenowise2").style.display = "none";
		document.getElementById("toLabSampleNo").style.display = "none";
	}
	if (genTypeValue == "L") {

		document.getElementById("labnowise").style.display = "";
		document.getElementById("labnowise2").style.display = "";
		document.getElementById("patientwise").style.display = "none";
		document.getElementById("patientwisename").style.display = "none";
		document.getElementById("testwise").style.display = "none";
		document.getElementById("samplenowise").style.display = "none";
		document.getElementById("samplenowise2").style.display = "none";
		document.getElementById("toLabSampleNo").style.display = "";
	}
	if (genTypeValue == "S") {

		document.getElementById("samplenowise").style.display = "";
		document.getElementById("samplenowise2").style.display = "";
		document.getElementById("toLabSampleNo").style.display = "";
		document.getElementById("patientwise").style.display = "none";
		document.getElementById("patientwisename").style.display = "none";
		document.getElementById("testwise").style.display = "none";
		document.getElementById("labnowise").style.display = "none";
		document.getElementById("labnowise2").style.display = "none";

	}

	if (genTypeValue == "TG") {

		document.getElementById("testGrpWise").style.display = "";
		document.getElementById("samplenowise").style.display = "none";
		document.getElementById("samplenowise2").style.display = "none";
		document.getElementById("toLabSampleNo").style.display = "none";
		document.getElementById("patientwise").style.display = "none";
		document.getElementById("patientwisename").style.display = "none";
		document.getElementById("testwise").style.display = "none";
		document.getElementById("labnowise").style.display = "none";
		document.getElementById("labnowise2").style.display = "none";

	}

	if (genTypeValue == "AP") {

		document.getElementById("testGrpWise").style.display = "none";
		document.getElementById("samplenowise").style.display = "none";
		document.getElementById("samplenowise2").style.display = "none";
		document.getElementById("toLabSampleNo").style.display = "none";
		document.getElementById("patientwise").style.display = "none";
		document.getElementById("patientwisename").style.display = "none";
		document.getElementById("testwise").style.display = "none";
		document.getElementById("labnowise").style.display = "none";
		document.getElementById("labnowise2").style.display = "none";
	}
}

function popupCallCanned() {

	openAutocompletePopup('CANNED');
	var data = getTheLabCannedList('CANNED');
	callCannedList(data);
	document.getElementById("automplete-4").focus();
}

function popupCallMacro() {

	openAutocompletePopup('MACRO');
	var data = getTheLabCannedList('MACRO');
	callMacroList(data);
	document.getElementById("automplete-m").focus();

}

function cancelFunc() {
	window.parent.closeTab();
}


/*keypad shortcut functionality*/
//4th code moved

var isChecked = false;
function allSelected() 
{
	
	// this line is for toggle the check
    isChecked = !isChecked;
    
    //below line refers to 'jpCheckbox' class
    $('input:checkbox.jpCheckbox').prop('checked',isChecked);
    
    document.getElementById("nextDiv").style.display=""; 
	document.getElementById("nextDiv1").style.display=""; 
}
isChecked=false;



//5th code moved


$(document).ready(function() {

	var isCtrl=false;
	var isShift=false;
	
	$(document).keydown(function(e)
			{

		
		if(e.which==16)
			isShift=true;
		if(e.which==17)
			isCtrl=true;
	
	if(e.which!=17 && e.which!=120 && e.which!=123)//120 f9 key
		isCtrl=false;
	
	if(e.which!=16 && e.which!=120 && e.which!=123)//120 f9 key
		isShift=false;
	
	

	
	if(isCtrl && e.which==120)
		{
		
		popupCallCanned();
		
		isCtrl=false;
		isShift=false;
		
		}
		
	if(isShift && e.which==120)
	{
	
		popupCallMacro();
		
	isCtrl=false;
	isShift=false;
	
	}
	
	
	if(isCtrl && e.which==123)
	{
	
	autocompleteBox_close();
	
	isCtrl=false;
	isShift=false;
	
	}
	
if(isShift && e.which==123)
{

	autocompleteBox_close_macro();
	
isCtrl=false;
isShift=false;

}
		});
});



//autocomplete functions for canned and macro
function callCannedList(data){

//canned
 $(function() {
 	      
 	        var cannedCodes=data;
            var splitCannedDetails=cannedCodes.split("@");
            var cannedDetails="";
            
            if(splitCannedDetails.length-1!=0)
   		 { 
            	 document.getElementsByName("cannedDataCount")[0].value=splitCannedDetails.length-1;
            	 deleteTableCanned();
            	for(i=0;i<splitCannedDetails.length-2;i++)
   		 {
   		
   		
   	
   		 AddRowToTableAddMoreValue(splitCannedDetails[i]);
   		cannedDetails+="{\"label\":\""+splitCannedDetails[i].split("#")[0]+"\" ,  \"value\": \""+splitCannedDetails[i].split("#")[0]+"\" }";
   		cannedDetails+=","; 
   		
   		  }
            	
            	
            	 AddRowToTableAddMoreValue(splitCannedDetails[i]);
            		cannedDetails+="{\"label\":\""+splitCannedDetails[i].split("#")[0]+"\" ,  \"value\": \""+splitCannedDetails[i].split("#")[0]+"\" }";
            	
            	cannedDetails="["+cannedDetails.toString()+"]";
            	cannedDetails=cannedDetails.toString();
           
            	
            	
   		 }
   	 else
   		 {
   		
   			 alert("No Canned Data Is Mapped For  "+document.getElementsByName("chkLabName")[0].value+"   Lab");
   		
   		 
   		 }
            
            var obj= JSON.parse(cannedDetails);
            cannedCodes=obj;
            
       
        	
        	
 	           setInterval(function() {
             $( "#automplete-4" ).autocomplete({
                 source: cannedCodes,
                 select: function(event, ui) { 
                     $('#hiddenid4').val(ui.item.value); 
                     event.preventDefault(); 
                     $("#automplete-4").val(ui.item.label); 
                 },

             focus: function(event, ui) { 
                    event.preventDefault(); 
                    $("#automplete-4").val(ui.item.label);}
              });
             }, 1000);
          });
         
}
         
//macro
function callMacroList(data){
 $(function() {
 	      
 	           var macroCodes=data;
 	           
                      
            var splitCannedDetails=macroCodes.split("@");
             var cannedDetails="";
        	 if(splitCannedDetails.length-1!=0)
        		 { 
        		 document.getElementsByName("macroDataCount")[0].value=splitCannedDetails.length-1;
        		 deleteTableMacro();
        	 for(i=0;i<splitCannedDetails.length-2;i++)
        		 {  		    
        		
        		    	AddRowToTableAddMoreValueMacro(splitCannedDetails[i]);
        		   
        		    	
        		    	cannedDetails+="{\"label\":\""+splitCannedDetails[i].split("#")[0]+"\" ,  \"value\": \""+splitCannedDetails[i].split("#")[1]+"\" }";
        		   		cannedDetails+=","; 
        		 	  
        		 }
        	 
        	 AddRowToTableAddMoreValueMacro(splitCannedDetails[i]);
        	 cannedDetails+="{\"label\":\""+splitCannedDetails[i].split("#")[0]+"\" ,  \"value\": \""+splitCannedDetails[i].split("#")[1]+"\" }";
        	
         	cannedDetails="["+cannedDetails.toString()+"]";
         	
         	
        		 }
        	 else
        		 {
        		
        		
        			 alert("No Macro Data Is Mapped For  "+document.getElementsByName("chkLabName")[0].value+"   Lab");
        		 
        		 }
        	 
        	         	 
        	   var obj= JSON.parse(cannedDetails);
        	   macroCodes=obj;
        	 
        	 
        	 
            
 	           setInterval(function() {
             $( "#automplete-m" ).autocomplete({
                 source: macroCodes,
                 select: function(event, ui) { 
                     $('#hiddenidm').val(ui.item.value); 
                     event.preventDefault(); 
                     $("#automplete-m").val(ui.item.label); 
                 },

             focus: function(event, ui) { 
                    event.preventDefault(); 
                    $("#automplete-m").val(ui.item.label);}
              });
             }, 1000);
          });
         
}



function showLegends(){
	  document.getElementById("divLegends").style.display="block"; 
}
function showLegendsNone(){
  document.getElementById("divLegends").style.display="none";
}

function showLegends1(){
	  document.getElementById("divLegends1").style.display="block"; 
}
function showLegendsNone1(){
document.getElementById("divLegends1").style.display="none";
}

$(document).ready(function()
		{
for(var inst in CKEDITOR.instances) {


CKEDITOR.instances[inst].on("focus",function()
	{
	document.getElementsByName("currentElement")[0].value="ckeditor";
	document.getElementsByName("currentElementName")[0].value=this.name;
	document.getElementsByName("editorName")[0].value=this.name;
	}
		)



}
		});

function selectSaveReVal(obj)
{
	
	
 	if(obj.checked)
		{
		for(var i=0;i<document.getElementsByName("saveReVal").length;i++)
			if(obj.value==document.getElementsByName("saveReVal")[i].value)
				document.getElementsByName("saveReVal")[i].checked=true;
			
		}
	else
		{
		
		for(var i=0;i<document.getElementsByName("saveReVal").length;i++)
			if(obj.value==document.getElementsByName("saveReVal")[i].value)
				document.getElementsByName("saveReVal")[i].checked=false;
		
		
		
		}
	
	}


function printReport(name)
{
	
	document.getElementsByName('fileName')[0].value=name;

var mode='PRINTREPORT';
var reportName = name;


var url = '/HISInvestigationG5/new_investigation/invResultEntryTemplateTile.cnt?hmode='+mode+"&fileName="+name;

AddRowToTableAddReportValues(url);
popup('popUpDiv');



}




function AddRowToTableAddReportValues(fileurl) {

var nRow = 0;
var tableObj = document.getElementById('reportTable');
var numRows = tableObj.rows.length;
if (document.getElementById("setPdf") != null) {

document.getElementById("setPdf").remove();
}

nRow = numRows;

var tabRow = tableObj.insertRow(numRows);
tabRow.id = parseInt(nRow);

var td1 = document.createElement("TD");

td1.innerHTML = "<iframe id='setPdf' src='"+ fileurl + "' width='100%' height='450px' type='application/pdf'    ></iframe> ";
td1.className = 'tdfont';
td1.colspan = "1";

tabRow.appendChild(td1);

}

function showReqDate()
{
	document.getElementById("divfromDateControl").style.display="";
	document.getElementById("divfromDate").style.display="";
	document.getElementById("divToDate").style.display="";
	document.getElementById("divToDateControl").style.display="";
	
	document.getElementById("divfromCollDateControl").style.display="none";
	document.getElementById("divfromCollDate").style.display="none";
	document.getElementById("divToCollDateControl").style.display="none";
	document.getElementById("divToCollDate").style.display="none";

	
}

function showCollDate()
{
	document.getElementById("divfromDateControl").style.display="none";
	document.getElementById("divfromDate").style.display="none";
	document.getElementById("divToDate").style.display="none";
	document.getElementById("divToDateControl").style.display="none";
	
	document.getElementById("divfromCollDateControl").style.display="";
	document.getElementById("divfromCollDate").style.display="";
	document.getElementById("divToCollDateControl").style.display="";
	document.getElementById("divToCollDate").style.display="";
}


function callGetDetails()
{
	 document.getElementsByName('hmode')[0].value='GETDETAILS';
	 document.forms[0].submit();
}



/*6th code moved*/

/* added by prashant */
function setIndication(){
	 return;
		 }

/* added by prashant */
function indicationInputChange(obj){
	var inputval=obj.value;
	var indicationClassName = obj.className;
		var indicationInputC = document.getElementsByClassName(indicationClassName);
		for (var i=0; i<indicationInputC.length; i++)
		{	indicationInputC[i].value=inputval;
		} 
}



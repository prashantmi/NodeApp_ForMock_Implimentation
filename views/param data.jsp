

concatstring(   'Select k.hivnum_parameter_code||''#''||  (select INITCAP(hgstr_parameter) from hivt_parameter_mst where gnum_isvalid=1 and hgnum_parameter_id=k.hivnum_parameter_code)||''#''||k.hivtstr_value  from  hivt_parameter_dtl k  where  k.gnum_isvalid=1 and k.hivtnum_test_code = '''||a.gnum_test_code ||'''   and k.hivtnum_req_dno='''|| a.hivtnum_req_dno ||''' and k.gnum_hospital_code=''' || a.gnum_hospital_code||'''' ,  ',' ) AS testParameterName



"1003#Result:#ty,1004#Commnets:#yt,3590#Hiv1#3"

"1001#Test#66,1004#Commnets:#--,1005#Chikunguniya Lgg -Elisa#-1,1007#Bone Narrow Test Sample Overlapping #--,3607#Short#cdcdcdcdcdcdcdcdcccdcdcdc<br />
cdcdcdcdcdcdcdcdc<br />
cdcdcdcdcdcdcdcdc,3608#Centi#--"


"1001#Test#hnhg,1004#Commnets:#hnhn,1005#Chikunguniya Lgg -Elisa#-1,1007#Bone Narrow Test Sample Overlapping #--,3607#Short#cdcdcdcdcdcdcdcdcccdcdcdc<br />
cdcdcdcdcdcdcdcdc<br />
cdcdcdcdcdcdcdcdc,3608#Centi#--"


										<!-- to display test and its value -->

										<%

					String[] parameters=voPat.getTestParameterName().split("`");
					int paraSize=parameters.length;

					System.out.println("reqdno"+voPat.getRequisitionDNo()+"testcode"+voPat.getTestCode());

					for(int iterate=0;iterate<paraSize;iterate++)
					{
						String[] paraValues=parameters[iterate].split("#@");
						String paracode=paraValues[0];
						String paraName=paraValues[1];
						String refRange="";
						if(paraValues.length>2)
						 refRange=paraValues[2];
						String displayRef="";
						String rangeTypeFinal = "";
						String[] refreValueFinal = null;

						//updated by krishnan nema on 17/10/2018
						String paraEntry="";
						if(paraValues.length>3)
						{
							paraEntry=paraValues[3];
						if(paraValues[3].equals("--")  )
						{
							 paraEntry="";
						}
						else
						{

						}
						}

						if(!paraEntry.contains("<"))
						paraEntry=paraEntry.replace("\r\n","<br>");
						if(paraEntry.contains("$"))
							paraEntry=paraEntry.replace("$","<br>");

						boolean flagg=false;
						 if(refRange!=null||!refRange.equals(""))
						{
						refRange=refRange.replace("$", "@");
						String[] refValues=refRange.split("@");
						refreValueFinal = refValues;
						 if(refValues.length>1)
						 {
							 String checkRangetyp=refValues[0];
							 rangeTypeFinal = checkRangetyp;
							 if(checkRangetyp.equals("1"))
							 {
								 String highValue=refValues[1];

									String lowValue=refValues[2];

									if((highValue.matches("\\d*\\.?\\d+") ) && (lowValue.matches("\\d*\\.?\\d+") ))
									{

										flagg=true;
									}
									String highValueUom=refValues[3];
									String lowValueUom=refValues[4];
									 displayRef=lowValue+" "+lowValueUom+" - "+highValue+" "+highValueUom;
							 }
							 else if(checkRangetyp.equals("2"))
							 {

								 String rangetyp=">";

									String tovalue=refValues[2];
									String tovalueunit=refValues[1];

									if( (tovalue.matches("\\d*\\.?\\d+") ))
									{

										flagg=true;
									}

									 displayRef=rangetyp+" "+tovalue+"  "+tovalueunit;

							 }

							 else if(checkRangetyp.equals("3"))
							 {
								 String rangetyp=">=";

									String tovalue="";
											if(refValues.length>2)
											tovalue=refValues[2];
									String tovalueunit="";
									if(refValues.length>1)
											tovalueunit=	refValues[1];

									if( (tovalue.matches("\\d*\\.?\\d+") ))
									{

										flagg=true;
									}

									 displayRef=rangetyp+" "+tovalue+"  "+tovalueunit;

							 }
							 else if(checkRangetyp.equals("4"))
							 {
								 String rangetyp="<";

								 String tovalue="";
									if(refValues.length>2)
									tovalue=refValues[2];
							String tovalueunit="";
							if(refValues.length>1)
									tovalueunit=	refValues[1];
									if( (tovalue.matches("\\d*\\.?\\d+") ))
									{

										flagg=true;
									}
									 displayRef=rangetyp+" "+tovalue+"  "+tovalueunit;

							 }
							 else if(checkRangetyp.equals("5"))
							 {
								 String rangetyp="<=";

								 String tovalue="";
									if(refValues.length>2)
									tovalue=refValues[2];
							String tovalueunit="";
							if(refValues.length>1)
									tovalueunit=	refValues[1];
									if( (tovalue.matches("\\d*\\.?\\d+") ))
									{

										flagg=true;
									}
									 displayRef=rangetyp+" "+tovalue+"  "+tovalueunit;

							 }

						 }
						}
						else
							displayRef="";

						/*  String paraEntry=paraValues[3];
						if(paraValues[3].equals("--")  )
						{
							 paraEntry="";
						}
						else
						{

						}


						if(!paraEntry.contains("<"))
						paraEntry=paraEntry.replace("\r\n","<br>");
						if(paraEntry.contains("$"))
							paraEntry=paraEntry.replace("$","<br>"); */


							//updated by krishnan nema on 17/10/2018

							boolean numeric = false;
						//	try {
            					//Double num = Double.parseDouble(paraEntry);
            					if (paraEntry.matches("\\d*\\.?\\d+") )
            			        {
            						numeric = true;
            			        }
        					//} catch (NumberFormatException e)
        					else	{
            				numeric = false;
        					}

						if(numeric && flagg)
						{

							if(refreValueFinal!=null)
							{
								if(rangeTypeFinal.equals("1")){

									 String highValue="";
											 if(refreValueFinal.length>1)
									 highValue= refreValueFinal[1];
									 String lowValue="";
									 if(refreValueFinal.length>2)
									 lowValue= refreValueFinal[2];


									 if((Float.valueOf(paraEntry) > Float.valueOf(highValue)) || (Float.valueOf(paraEntry) < Float.valueOf(lowValue))){
										 String valu = voPat.getRequisitionDNo() + "#" + "null" + "#template#" + voPat.getTestCode() +paracode;
											mapList.add(valu);
										 %>

										 <tr>

											<th width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraName%></font>

											</th>

											<th id="paraEntryColor" width="20%"><font color="#FF0000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraEntry%></font>

											</th>

											<th width="20%"><%=displayRef%></th>
											<!-- 	<th width="20%">ml</th> -->
										</tr>

										<%
									 }else{
										 %>

										 <tr>

											<th width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraName%></font>

											</th>

											<th id="paraEntryColor" width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraEntry%></font>

											</th>
											<th width="20%"><%=displayRef%></th>
											<!-- 	<th width="20%">ml</th> -->
										</tr>

										<%
									 }


								}else if(rangeTypeFinal.equals("2")){

									String tovalue=refreValueFinal[2];
									if((Float.valueOf(paraEntry) < Float.valueOf(tovalue))){
										 String valu = voPat.getRequisitionDNo() + "#" + "null" + "#template#" + voPat.getTestCode() +paracode;
											mapList.add(valu);
										 %>

										 <tr>

											<th width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraName%></font>

											</th>

											<th id="paraEntryColor" width="20%"><font color="#FF0000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraEntry%></font>

											</th>

											<th width="20%"><%=displayRef%></th>
											<!-- 	<th width="20%">ml</th> -->
										</tr>

										<%
									 }else{
										 %>

										 <tr>

											<th width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraName%></font>

											</th>

											<th id="paraEntryColor" width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraEntry%></font>

											</th>
											<th width="20%"><%=displayRef%></th>
											<!-- 	<th width="20%">ml</th> -->
										</tr>

										<%


									}

								}else if(rangeTypeFinal.equals("3")){

									String tovalue=refreValueFinal[2];
									if((Float.valueOf(paraEntry) <= Float.valueOf(tovalue))){
										 String valu = voPat.getRequisitionDNo() + "#" + "null" + "#template#" + voPat.getTestCode() +paracode;
											mapList.add(valu);
										 %>

										 <tr>

											<th width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraName%></font>

											</th>

											<th id="paraEntryColor" width="20%"><font color="#FF0000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraEntry%></font>

											</th>

											<th width="20%"><%=displayRef%></th>
											<!-- 	<th width="20%">ml</th> -->
										</tr>

										<%
									 }else{
										 %>

										 <tr>

											<th width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraName%></font>

											</th>

											<th id="paraEntryColor" width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraEntry%></font>

											</th>
											<th width="20%"><%=displayRef%></th>
											<!-- 	<th width="20%">ml</th> -->
										</tr>

										<%
									}


								}else if(rangeTypeFinal.equals("4")){


									String tovalue=refreValueFinal[2];
									if((Float.valueOf(paraEntry) > Float.valueOf(tovalue))){
										 String valu = voPat.getRequisitionDNo() + "#" + "null" + "#template#" + voPat.getTestCode() +paracode;
											mapList.add(valu);
										 %>

										 <tr>

											<th width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraName%></font>

											</th>

											<th id="paraEntryColor" width="20%"><font color="#FF0000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraEntry%></font>

											</th>

											<th width="20%"><%=displayRef%></th>
											<!-- 	<th width="20%">ml</th> -->
										</tr>

										<%
									 }else{
										 %>

										 <tr>

											<th width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraName%></font>

											</th>

											<th id="paraEntryColor" width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraEntry%></font>

											</th>
											<th width="20%"><%=displayRef%></th>
											<!-- 	<th width="20%">ml</th> -->
										</tr>

										<%
									}

								}else if(rangeTypeFinal.equals("5")){

									String tovalue=refreValueFinal[2];
									if((Float.valueOf(paraEntry) >= Float.valueOf(tovalue))){
										 String valu = voPat.getRequisitionDNo() + "#" + "null" + "#template#" + voPat.getTestCode() +paracode;
											mapList.add(valu);
										 %>

										 <tr>

											<th width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraName%></font>

											</th>

											<th id="paraEntryColor" width="20%"><font color="#FF0000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraEntry%></font>

											</th>

											<th width="20%"><%=displayRef%></th>
											<!-- 	<th width="20%">ml</th> -->
										</tr>

										<%
									 }else{
										 %>

										 <tr>

											<th width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraName%></font>

											</th>

											<th id="paraEntryColor" width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraEntry%></font>

											</th>
											<th width="20%"><%=displayRef%></th>
											<!-- 	<th width="20%">ml</th> -->
										</tr>

										<%
									}


								}
								else
								{%>
									<tr>

									<th width="20%"><font color="#000000" size="2"
										face="Verdana, Arial, Helvetica, sans-serif"> <%=paraName%></font>

									</th>

									<th id="paraEntryColor" width="20%"><font color="#000000" size="2"
										face="Verdana, Arial, Helvetica, sans-serif"> <%=paraEntry%></font>

									</th>
									<th width="20%"><%=displayRef%></th>
									<!-- 	<th width="20%">ml</th> -->
								</tr>

							<%	}


							}else{


					%>

										<tr>

											<th width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraName%></font>

											</th>

											<th id="paraEntryColor" width="20%"><font color="#000000" size="2"
												face="Verdana, Arial, Helvetica, sans-serif"> <%=paraEntry%></font>

											</th>
											<th width="20%"><%=displayRef%></th>
											<!-- 	<th width="20%">ml</th> -->
										</tr>


										<%
										}
							}else{
								%>

								<tr>

									<th width="20%"><font color="#000000" size="2"
										face="Verdana, Arial, Helvetica, sans-serif"> <%=paraName%></font>

									</th>

									<th id="paraEntryColor" width="20%"><font color="#000000" size="2"
										face="Verdana, Arial, Helvetica, sans-serif"> <%=paraEntry%>

										<%if(paraEntry.equals("File Uploaded")){
											 String valu1 = voPat.getRequisitionDNo() + "#" + "null" + "#template#" + voPat.getTestCode() +paracode;

										%>
									<a

		                         id="view<%=valu1 %>" class="view@@<%=valu1 %>" href="#" onclick="myuploadFunction(this)">
		                               View File</a>
									<%} %>
										</font>

									</th>
									<th width="20%"><%=displayRef%></th>
									<!-- 	<th width="20%">ml</th> -->
								</tr>




								<%

							}
							}



								dnoMap.put(voPat.getRequisitionDNo(),mapList);

										%>
					<% if(voPat.getFinalRemarkReqd()!=null && voPat.getFinalRemarkReqd().equals("1")){ %>
					 <tr>

									<th width="20%"><font color="#000000" size="2"
										face="Verdana, Arial, Helvetica, sans-serif"> Comments</font>

									</th>

									<th id="paraEntryColor" width="20%"><font color="#FF0000" size="2"
										face="Verdana, Arial, Helvetica, sans-serif"> <%=voPat.getFinalRemarkString()==null?"":voPat.getFinalRemarkString() %></font>

									</th>

									<th width="20%"></th>
									<!-- 	<th width="20%">ml</th> -->
								</tr>
								<%} %>
									</table>




					

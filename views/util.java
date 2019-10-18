package new_investigation.reports.controller.utl;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import javax.jms.Session;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ibm.icu.text.SimpleDateFormat;

import hisglobal.exceptions.HisApplicationExecutionException;
import hisglobal.exceptions.HisDataAccessException;
import hisglobal.exceptions.HisException;
import hisglobal.exceptions.HisRecordNotFoundException;
import hisglobal.presentation.ControllerUTIL;
import hisglobal.presentation.Status;
import hisglobal.presentation.WebUTIL;
import hisglobal.utility.HelperMethods;
import hisglobal.vo.UserVO;
import new_investigation.InvestigationConfig;
import new_investigation.reports.controller.data.InvTrackingReportDATA;
import new_investigation.reports.controller.fb.InvTrackingReportFB;
import new_investigation.transactions.controller.fb.InvResultReportPrintingNewFB;
import new_investigation.transactions.controller.utl.MergeAllPdfNewInv;
import new_investigation.transactions.controller.utl.MongoXmlHandler;
import new_investigation.vo.InvTrackingReportVO;
import new_investigation.vo.InvTrackingReportVO;

@SuppressWarnings({ "rawtypes", "unchecked", "unused" })
public class InvTrackingReportUTIL {


	public static JsonObject AjaxGetPatDetailsOnBillNo(InvTrackingReportFB fb, HttpServletRequest request) {

		Status objStatus = new Status();
		InvTrackingReportVO vo = new InvTrackingReportVO();
		Map mp=new HashMap();

		JsonObject jsonResponse = new JsonObject();
		JsonArray patDetailsObjectRowContainer = new JsonArray();

		try {

			UserVO userVO = ControllerUTIL.getUserVO(request);
			HelperMethods.populate(vo, fb);
			ControllerUTIL.setSysdate(request);

			mp=InvTrackingReportDATA.AjaxGetPatDetailsOnBillNo(vo, userVO);
			InvTrackingReportVO vo2 = (InvTrackingReportVO) mp.get("patDetailsOnBillNo");

			if(vo2!=null) {
			JsonObject objectRow = new JsonObject();

			/*OP Patient Data*/
			objectRow.addProperty("patientName", vo2.getPatName()==null?"":vo2.getPatName());
			objectRow.addProperty("crNumber", vo2.getCrNumber()==null?"":vo2.getCrNumber());
			objectRow.addProperty("isUnknown", vo2.getIsUnknown()==null?"":vo2.getIsUnknown());
			objectRow.addProperty("isDead", vo2.getIsDead()==null?"":vo2.getIsDead());
			objectRow.addProperty("isMlc", vo2.getIsMlc()==null?"":vo2.getIsMlc());
			objectRow.addProperty("patFirstName", vo2.getPatFirstName()==null?"":vo2.getPatFirstName());
			objectRow.addProperty("patMiddleName", vo2.getPatMiddleName()==null?"":vo2.getPatMiddleName());
			objectRow.addProperty("patLastName", vo2.getPatLastName()==null?"":vo2.getPatLastName());
			objectRow.addProperty("patGuardianName", vo2.getPatGuardianName()==null?"":vo2.getPatGuardianName());
			objectRow.addProperty("patCategoryCode", vo2.getPatCategoryCode()==null?"":vo2.getPatCategoryCode());
			objectRow.addProperty("patAge", vo2.getPatAge()==null?"":vo2.getPatAge());
			objectRow.addProperty("patHusbandName", vo2.getPatHusbandName()==null?"":vo2.getPatHusbandName());
			objectRow.addProperty("patGenderCode", vo2.getPatGenderCode()==null?"":vo2.getPatGenderCode());
			objectRow.addProperty("patCategory", vo2.getPatCategory()==null?"":vo2.getPatCategory());
			objectRow.addProperty("patDOB", vo2.getPatDOB()==null?"":vo2.getPatDOB());
			objectRow.addProperty("isActualDob", vo2.getIsActualDob()==null?"":vo2.getIsActualDob());
			objectRow.addProperty("patGender", vo2.getPatGender()==null?"":vo2.getPatGender());
			objectRow.addProperty("patStatusCode", vo2.getPatStatusCode()==null?"":vo2.getPatStatusCode());
			objectRow.addProperty("patStatus", vo2.getPatStatus()==null?"":vo2.getPatStatus());
			objectRow.addProperty("patMobileNo", vo2.getPatMobileNo()==null?"":vo2.getPatMobileNo());
			objectRow.addProperty("patAddress", vo2.getPatAddress()==null?"":vo2.getPatAddress());
			objectRow.addProperty("isCatExpired", vo2.getIsCatExpired()==null?"":vo2.getIsCatExpired());
			objectRow.addProperty("patEmailId", vo2.getPatEmailId()==null?"":vo2.getPatEmailId());
			 /*IPD Patient Data*/
			objectRow.addProperty("admissionDate", vo2.getAdmissionDate()==null?"":vo2.getAdmissionDate());
			objectRow.addProperty("patDeptUnitCode", vo2.getPatDeptUnitCode()==null?"":vo2.getPatDeptUnitCode());
			objectRow.addProperty("patVisitNo", vo2.getPatVisitNo()==null?"":vo2.getPatVisitNo());
			objectRow.addProperty("patEpisodeCode", vo2.getPatEpisodeCode()==null?"":vo2.getPatEpisodeCode());
			objectRow.addProperty("admittedDepartmentCode", vo2.getAdmittedDepartmentCode()==null?"":vo2.getAdmittedDepartmentCode());
			objectRow.addProperty("patAdmissionNo", vo2.getPatAdmissionNo()==null?"":vo2.getPatAdmissionNo());
			objectRow.addProperty("patDeptUnit", vo2.getPatDeptUnit()==null?"":vo2.getPatDeptUnit());
			objectRow.addProperty("admittedDepartmentName", vo2.getAdmittedDepartmentName()==null?"":vo2.getAdmittedDepartmentName());
			objectRow.addProperty("patWardCode", vo2.getPatWardCode()==null?"":vo2.getPatWardCode());
			objectRow.addProperty("admittedDepartmentCode", vo2.getAdmittedDepartmentCode()==null?"":vo2.getAdmittedDepartmentCode());
			objectRow.addProperty("patWardName", vo2.getPatWardName()==null?"":vo2.getPatWardName());
			objectRow.addProperty("patRoomNo", vo2.getPatRoomNo()==null?"":vo2.getPatRoomNo());
			objectRow.addProperty("patRoomName", vo2.getPatRoomName()==null?"":vo2.getPatRoomName());
			objectRow.addProperty("bedCode", vo2.getBedCode()==null?"":vo2.getBedCode());
			objectRow.addProperty("bedName", vo2.getBedName()==null?"":vo2.getBedName());
			objectRow.addProperty("hospitalCode", vo2.getHospitalCode()==null?"":vo2.getHospitalCode());
			objectRow.addProperty("consultantName", vo2.getConsultantName()==null?"":vo2.getConsultantName());
			objectRow.addProperty("patMlcNo", vo2.getPatMlcNo()==null?"":vo2.getPatMlcNo());
			objectRow.addProperty("diagnosis", vo2.getDiagnosis()==null?"":vo2.getDiagnosis());
			objectRow.addProperty("patAccNo", vo2.getPatAccNo()==null?"":vo2.getPatAccNo());



			patDetailsObjectRowContainer.add(objectRow);
			}
			jsonResponse.add("patDetailsOnBillNo", patDetailsObjectRowContainer);

			objStatus.add(Status.TRANSINPROCESS);
		}
		catch(HisDataAccessException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR_DA,"","Data Access Error");
		}
		catch(HisApplicationExecutionException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR_AE,"","Application Execution Error");
		}
		catch(HisException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR,"","Error");
		}
		return jsonResponse;
	}



	public static JsonObject AjaxGetPatDetailsOnCrNo(InvTrackingReportFB fb, HttpServletRequest request) {

		Status objStatus = new Status();
		InvTrackingReportVO vo = new InvTrackingReportVO();
		Map mp=new HashMap();

		JsonObject jsonResponse = new JsonObject();
		JsonArray patDetailsObjectRowContainer = new JsonArray();

		try {

			UserVO userVO = ControllerUTIL.getUserVO(request);
			HelperMethods.populate(vo, fb);
			ControllerUTIL.setSysdate(request);

			mp=InvTrackingReportDATA.AjaxGetPatDetailsOnCrNo(vo, userVO);
			InvTrackingReportVO vo2 = (InvTrackingReportVO) mp.get("patDetailsOnCrNo");

			if(vo2!=null) {
			JsonObject objectRow = new JsonObject();

			/*OP Patient Data*/
			objectRow.addProperty("patientName", vo2.getPatName()==null?"":vo2.getPatName());
			objectRow.addProperty("crNumber", vo2.getCrNumber()==null?"":vo2.getCrNumber());
			objectRow.addProperty("isUnknown", vo2.getIsUnknown()==null?"":vo2.getIsUnknown());
			objectRow.addProperty("isDead", vo2.getIsDead()==null?"":vo2.getIsDead());
			objectRow.addProperty("isMlc", vo2.getIsMlc()==null?"":vo2.getIsMlc());
			objectRow.addProperty("patFirstName", vo2.getPatFirstName()==null?"":vo2.getPatFirstName());
			objectRow.addProperty("patMiddleName", vo2.getPatMiddleName()==null?"":vo2.getPatMiddleName());
			objectRow.addProperty("patLastName", vo2.getPatLastName()==null?"":vo2.getPatLastName());
			objectRow.addProperty("patGuardianName", vo2.getPatGuardianName()==null?"":vo2.getPatGuardianName());
			objectRow.addProperty("patCategoryCode", vo2.getPatCategoryCode()==null?"":vo2.getPatCategoryCode());
			objectRow.addProperty("patAge", vo2.getPatAge()==null?"":vo2.getPatAge());
			objectRow.addProperty("patHusbandName", vo2.getPatHusbandName()==null?"":vo2.getPatHusbandName());
			objectRow.addProperty("patGenderCode", vo2.getPatGenderCode()==null?"":vo2.getPatGenderCode());
			objectRow.addProperty("patCategory", vo2.getPatCategory()==null?"":vo2.getPatCategory());
			objectRow.addProperty("patDOB", vo2.getPatDOB()==null?"":vo2.getPatDOB());
			objectRow.addProperty("isActualDob", vo2.getIsActualDob()==null?"":vo2.getIsActualDob());
			objectRow.addProperty("patGender", vo2.getPatGender()==null?"":vo2.getPatGender());
			objectRow.addProperty("patStatusCode", vo2.getPatStatusCode()==null?"":vo2.getPatStatusCode());
			objectRow.addProperty("patStatus", vo2.getPatStatus()==null?"":vo2.getPatStatus());
			objectRow.addProperty("patMobileNo", vo2.getPatMobileNo()==null?"":vo2.getPatMobileNo());
			objectRow.addProperty("patAddress", vo2.getPatAddress()==null?"":vo2.getPatAddress());
			objectRow.addProperty("isCatExpired", vo2.getIsCatExpired()==null?"":vo2.getIsCatExpired());
			objectRow.addProperty("patEmailId", vo2.getPatEmailId()==null?"":vo2.getPatEmailId());
			 /*IPD Patient Data*/
			objectRow.addProperty("admissionDate", vo2.getAdmissionDate()==null?"":vo2.getAdmissionDate());
			objectRow.addProperty("patDeptUnitCode", vo2.getPatDeptUnitCode()==null?"":vo2.getPatDeptUnitCode());
			objectRow.addProperty("patVisitNo", vo2.getPatVisitNo()==null?"":vo2.getPatVisitNo());
			objectRow.addProperty("patEpisodeCode", vo2.getPatEpisodeCode()==null?"":vo2.getPatEpisodeCode());
			objectRow.addProperty("admittedDepartmentCode", vo2.getAdmittedDepartmentCode()==null?"":vo2.getAdmittedDepartmentCode());
			objectRow.addProperty("patAdmissionNo", vo2.getPatAdmissionNo()==null?"":vo2.getPatAdmissionNo());
			objectRow.addProperty("patDeptUnit", vo2.getPatDeptUnit()==null?"":vo2.getPatDeptUnit());
			objectRow.addProperty("admittedDepartmentName", vo2.getAdmittedDepartmentName()==null?"":vo2.getAdmittedDepartmentName());
			objectRow.addProperty("patWardCode", vo2.getPatWardCode()==null?"":vo2.getPatWardCode());
			objectRow.addProperty("admittedDepartmentCode", vo2.getAdmittedDepartmentCode()==null?"":vo2.getAdmittedDepartmentCode());
			objectRow.addProperty("patWardName", vo2.getPatWardName()==null?"":vo2.getPatWardName());
			objectRow.addProperty("patRoomNo", vo2.getPatRoomNo()==null?"":vo2.getPatRoomNo());
			objectRow.addProperty("patRoomName", vo2.getPatRoomName()==null?"":vo2.getPatRoomName());
			objectRow.addProperty("bedCode", vo2.getBedCode()==null?"":vo2.getBedCode());
			objectRow.addProperty("bedName", vo2.getBedName()==null?"":vo2.getBedName());
			objectRow.addProperty("hospitalCode", vo2.getHospitalCode()==null?"":vo2.getHospitalCode());
			objectRow.addProperty("consultantName", vo2.getConsultantName()==null?"":vo2.getConsultantName());
			objectRow.addProperty("patMlcNo", vo2.getPatMlcNo()==null?"":vo2.getPatMlcNo());
			objectRow.addProperty("diagnosis", vo2.getDiagnosis()==null?"":vo2.getDiagnosis());
			objectRow.addProperty("patAccNo", vo2.getPatAccNo()==null?"":vo2.getPatAccNo());

			patDetailsObjectRowContainer.add(objectRow);
			}
			jsonResponse.add("patDetailsOnCrNo", patDetailsObjectRowContainer);

			objStatus.add(Status.TRANSINPROCESS);
		}
		catch(HisDataAccessException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR_DA,"","Data Access Error");
		}
		catch(HisApplicationExecutionException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR_AE,"","Application Execution Error");
		}
		catch(HisException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR,"","Error");
		}
		return jsonResponse;

	}

	public static JsonObject AjaxGetPatReqnListOnBillNo(InvTrackingReportFB fb, HttpServletRequest request) {

		Status objStatus= new Status();

		InvTrackingReportVO vo = new InvTrackingReportVO();
		List<InvTrackingReportVO> sampleBasedReqnListInvTrackingReportVO = new ArrayList<InvTrackingReportVO>();
		List<InvTrackingReportVO> patientBasedReqnListInvTrackingReportVO = new ArrayList<InvTrackingReportVO>();

		Map mp=new HashMap();

		JsonObject jsonResponse = new JsonObject();
		JsonArray patBasedReqnListObjectRowsContainer= new JsonArray();
		JsonArray samBasedReqnListObjectRowsContainer= new JsonArray();

		try {

			UserVO userVO = ControllerUTIL.getUserVO(request);
			HelperMethods.populate(vo, fb);
			ControllerUTIL.setSysdate(request);

			mp=InvTrackingReportDATA.AjaxGetPatReqnListOnBillNo(vo, userVO);
			sampleBasedReqnListInvTrackingReportVO=(List<InvTrackingReportVO>) mp.get("sampleBasedReqnListOnBillNo");
			patientBasedReqnListInvTrackingReportVO=(List<InvTrackingReportVO>) mp.get("patientBasedReqnListOnBillNo");

			int i=0;
			for(InvTrackingReportVO vo2 : sampleBasedReqnListInvTrackingReportVO) {
				i++;

				String groupNameTestName=vo2.getGroupName()==null || vo2.getGroupName().equals("")?"":vo2.getGroupName()+" | ";
				groupNameTestName+=vo2.getTestName()==null?"":vo2.getTestName();

				JsonObject turnAroundTime=CompareTestTurnAroundTime(vo2.getSampleCollDate(), vo2.getReportGenerationDate(), vo2.getTestCode(),vo, request);

				String testRateDetail=vo2.getTestRateDetail()==null?"-":vo2.getTestRateDetail();
				String testRate=testRateDetail.contains("^")?testRateDetail.split("\\^")[0]:"0";
				try { testRate=Double.parseDouble(testRate)>0?testRate:"Free"; }
				catch(NumberFormatException e) { testRate="Free"; }

				String billedUnbilled=vo2.getBillDetail()==null?"-":vo2.getBillDetail().contains("^")?vo2.getBillDetail().split("\\^")[0]:"-";
				billedUnbilled=billedUnbilled.equals("0")?"UnBilled":"Billed";


				JsonObject objectRow = new JsonObject();

				objectRow.addProperty("sno", i);
				objectRow.addProperty("requisitionDate", vo2.getRequisitionDate()==null?"-":vo2.getBillNo() );
				objectRow.addProperty("labName", vo2.getLabName()==null?"-":vo2.getLabName() );
				objectRow.addProperty("advisedByDept", vo2.getAdvisedByDept()==null?"-":vo2.getAdvisedByDept() );
				objectRow.addProperty("groupNameTestName",  groupNameTestName);
				objectRow.addProperty("requisitionStatus", vo2.getRequisitionStatus()==null?"-":vo2.getRequisitionStatus() );
				objectRow.addProperty("requisitionStatusCode", vo2.getRequisitionStatusCode()==null?"-":vo2.getRequisitionStatusCode() );
				objectRow.add("turnAroundTime", turnAroundTime);
				objectRow.addProperty("testRate", testRate);
				objectRow.addProperty("billedUnbilled", billedUnbilled);
				objectRow.addProperty("testNote", turnAroundTime.get("totNote").getAsString());

				objectRow.addProperty("requisitionDate", vo2.getRequisitionDate()==null?"-":vo2.getRequisitionDate() );
				objectRow.addProperty("requisitionBy", vo2.getRequisitionBy()==null?"-":vo2.getRequisitionBy() );
				objectRow.addProperty("advisedByDoc", vo2.getAdvisedByDoc()==null?"-":vo2.getAdvisedByDoc() );
				objectRow.addProperty("groupNameTestName", groupNameTestName);
				objectRow.addProperty("appointmentDate", vo2.getAppointmentDate()==null?"-":vo2.getAppointmentDate() );
				objectRow.addProperty("billNo", vo2.getBillNo()==null?"-":vo2.getBillNo() );
				objectRow.addProperty("billDate", vo2.getBillDate()==null?"-":vo2.getBillDate() );

				objectRow.addProperty("sampleName", vo2.getSampleName()==null?"-":vo2.getSampleName() );
				objectRow.addProperty("sampleNo", vo2.getSampleNo()==null?"-":vo2.getSampleNo() );
				objectRow.addProperty("sampleCollDate", vo2.getSampleCollDate()==null?"-":vo2.getSampleCollDate() );
				objectRow.addProperty("sampleCollBy", vo2.getSampleCollBy()==null?"-":vo2.getSampleCollBy() );
				objectRow.addProperty("labNo", vo2.getLabNo()==null?"-":vo2.getLabNo() );

				objectRow.addProperty("packingListNo", vo2.getPackingListNo()==null?"-":vo2.getPackingListNo() );
				objectRow.addProperty("packingListBy", vo2.getPackingListBy()==null?"-":vo2.getPackingListBy() );
				objectRow.addProperty("packingListDateTime", vo2.getPackingListDateTime()==null?"-":vo2.getPackingListDateTime() );

				objectRow.addProperty("sampleAccepDate", vo2.getSampleAccepDate()==null?"-":vo2.getSampleAccepDate() );
				objectRow.addProperty("sampleAccepBy", vo2.getSampleAccepBy()==null?"-":vo2.getSampleAccepBy() );
				objectRow.addProperty("sampleAccepMode", vo2.getMachineName()==null?"Manual":"Machine" );
				objectRow.addProperty("machineName", vo2.getMachineName()==null?"-":vo2.getMachineName() );

				objectRow.addProperty("sampleRejecDate", vo2.getSampleRejecDate()==null?"-":vo2.getSampleRejecDate() );
				objectRow.addProperty("sampleRejecBy", vo2.getSampleRejecBy()==null?"-":vo2.getSampleRejecBy() );
				objectRow.addProperty("sampleRejecReason", vo2.getSampleRejecReason()==null?"-":vo2.getBillNo() );

				objectRow.addProperty("resultEntryDate", vo2.getResultEntryDate()==null?"-":vo2.getResultEntryDate() );
				objectRow.addProperty("resultEntryBy", vo2.getResultEntryBy()==null?"-":vo2.getResultEntryBy() );
				objectRow.addProperty("resultEntryParam", vo2.getResultEntryParam()==null?"-":vo2.getResultEntryParam() );
				objectRow.addProperty("resultValidDate", vo2.getResultValidDate()==null?"-":vo2.getResultValidDate() );
				objectRow.addProperty("resultValidBy", vo2.getResultValidBy()==null?"-":vo2.getResultValidBy() );

				objectRow.addProperty("reportGenerationDate", vo2.getReportGenerationDate()==null?"-":vo2.getReportGenerationDate() );
				objectRow.addProperty("reportPrintDate", vo2.getReportPrintDate()==null?"-":vo2.getReportPrintDate() );
				objectRow.addProperty("reportPrintBy", vo2.getReportPrintBy()==null?"-":vo2.getReportPrintBy() );
				objectRow.addProperty("reportURL", vo2.getReportURL()==null?"-":vo2.getReportURL() );

		        samBasedReqnListObjectRowsContainer.add(objectRow);
			}

			i=0;
			for(InvTrackingReportVO vo2 : patientBasedReqnListInvTrackingReportVO) {
				i++;

				String groupNameTestName=vo2.getGroupName()==null || vo2.getGroupName().equals("")?"":vo2.getGroupName()+" | ";
				groupNameTestName+=vo2.getTestName()==null?"":vo2.getTestName();

				JsonObject turnAroundTime=CompareTestTurnAroundTime(vo2.getPatientAccepDate(), vo2.getReportGenerationDate(), vo2.getTestCode(), vo, request);

				String testRateDetail=vo2.getTestRateDetail()==null?"-":vo2.getTestRateDetail();
				String testRate=testRateDetail.contains("^")?testRateDetail.split("\\^")[0]:"0";
				try { testRate=Double.parseDouble(testRate)>0?testRate:"Free"; }
				catch(NumberFormatException e) { testRate="Free"; }

				String billedUnbilled=vo2.getBillDetail()==null?"-":vo2.getBillDetail().contains("^")?vo2.getBillDetail().split("\\^")[0]:"-";
				billedUnbilled=billedUnbilled.equals("0")?"UnBilled":"Billed";

				JsonObject objectRow = new JsonObject();

				objectRow.addProperty("sno", i);
				objectRow.addProperty("requisitionDate", vo2.getRequisitionDate()==null?"-":vo2.getBillNo() );
				objectRow.addProperty("labName", vo2.getLabName()==null?"-":vo2.getLabName() );
				objectRow.addProperty("advisedByDept", vo2.getAdvisedByDept()==null?"-":vo2.getAdvisedByDept() );
				objectRow.addProperty("groupNameTestName",  groupNameTestName);
				objectRow.addProperty("requisitionStatus", vo2.getRequisitionStatus()==null?"-":vo2.getRequisitionStatus() );
				objectRow.addProperty("requisitionStatusCode", vo2.getRequisitionStatusCode()==null?"-":vo2.getRequisitionStatusCode() );
				objectRow.add("turnAroundTime", turnAroundTime);
				objectRow.addProperty("testRate", testRate);
				objectRow.addProperty("billedUnbilled", billedUnbilled);
				objectRow.addProperty("testNote", turnAroundTime.get("totNote").getAsString());

				objectRow.addProperty("requisitionDate", vo2.getRequisitionDate()==null?"-":vo2.getRequisitionDate() );
				objectRow.addProperty("requisitionBy", vo2.getRequisitionBy()==null?"-":vo2.getRequisitionBy() );
				objectRow.addProperty("advisedByDoc", vo2.getAdvisedByDoc()==null?"-":vo2.getAdvisedByDoc() );
				objectRow.addProperty("groupNameTestName", groupNameTestName);
				objectRow.addProperty("appointmentDate", vo2.getAppointmentDate()==null?"-":vo2.getAppointmentDate() );
				objectRow.addProperty("billNo", vo2.getBillNo()==null?"-":vo2.getBillNo() );
				objectRow.addProperty("billDate", vo2.getBillDate()==null?"-":vo2.getBillDate() );

				objectRow.addProperty("accessionNo", vo2.getAccessionNo()==null?"-":vo2.getAccessionNo() );
				objectRow.addProperty("patientAccepDate", vo2.getPatientAccepDate()==null?"-":vo2.getPatientAccepDate() );
				objectRow.addProperty("patientAccepBy", vo2.getPatientAccepBy()==null?"-":vo2.getPatientAccepBy() );
				objectRow.addProperty("patientAccepMode", vo2.getMachineName()==null?"Manual":"Machine" );
				objectRow.addProperty("machineName", vo2.getMachineName()==null?"-":vo2.getMachineName() );

				objectRow.addProperty("patientRejecDate", vo2.getPatientRejecDate()==null?"-":vo2.getPatientRejecDate() );
				objectRow.addProperty("patientRejecBy", vo2.getPatientRejecBy()==null?"-":vo2.getPatientRejecBy() );
				objectRow.addProperty("patientRejecReason", vo2.getPatientRejecReason()==null?"-":vo2.getPatientRejecReason() );

				objectRow.addProperty("resultEntryDate", vo2.getResultEntryDate()==null?"-":vo2.getResultEntryDate() );
				objectRow.addProperty("resultEntryBy", vo2.getResultEntryBy()==null?"-":vo2.getResultEntryBy() );
				objectRow.addProperty("resultEntryParam", vo2.getResultEntryParam()==null?"-":vo2.getResultEntryParam() );
				objectRow.addProperty("resultValidDate", vo2.getResultValidDate()==null?"-":vo2.getResultValidDate() );
				objectRow.addProperty("resultValidBy", vo2.getResultValidBy()==null?"-":vo2.getResultValidBy() );

				objectRow.addProperty("reportGenerationDate", vo2.getReportGenerationDate()==null?"-":vo2.getReportGenerationDate() );
				objectRow.addProperty("reportPrintDate", vo2.getReportPrintDate()==null?"-":vo2.getReportPrintDate() );
				objectRow.addProperty("reportPrintBy", vo2.getReportPrintBy()==null?"-":vo2.getReportPrintBy() );
				objectRow.addProperty("reportURL", vo2.getReportURL()==null?"-":vo2.getReportURL() );

		        patBasedReqnListObjectRowsContainer.add(objectRow);
			}
			jsonResponse.add("sampleBasedReqnListOnBillNo", samBasedReqnListObjectRowsContainer);
			jsonResponse.add("patientBasedReqnListOnBillNo", patBasedReqnListObjectRowsContainer);

			objStatus.add(Status.TRANSINPROCESS);
		}
		catch(HisDataAccessException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR_DA,"","Data Access Error");
		}
		catch(HisApplicationExecutionException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR_AE,"","Application Execution Error");
		}
		catch(HisException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR,"","Error");
		}
		return jsonResponse;

	}


	public static JsonObject AjaxGetPatReqnListOnCrNo(InvTrackingReportFB fb, HttpServletRequest request) {

		Status objStatus= new Status();

		InvTrackingReportVO vo = new InvTrackingReportVO();
		List<InvTrackingReportVO> sampleBasedReqnListInvTrackingReportVO = new ArrayList<InvTrackingReportVO>();
		List<InvTrackingReportVO> patientBasedReqnListInvTrackingReportVO = new ArrayList<InvTrackingReportVO>();
		Map mp=new HashMap();

		JsonObject jsonResponse = new JsonObject();
		JsonArray patBasedReqnListObjectRowsContainer= new JsonArray();
		JsonArray samBasedReqnListObjectRowsContainer= new JsonArray();

		try {

			UserVO userVO = ControllerUTIL.getUserVO(request);
			HelperMethods.populate(vo, fb);
			ControllerUTIL.setSysdate(request);

			mp=InvTrackingReportDATA.AjaxGetPatReqnListOnCrNo(vo, userVO);
			sampleBasedReqnListInvTrackingReportVO=(List<InvTrackingReportVO>) mp.get("sampleBasedReqnListOnCrNo");
			patientBasedReqnListInvTrackingReportVO=(List<InvTrackingReportVO>) mp.get("patientBasedReqnListOnCrNo");

			int i=0;
			for(InvTrackingReportVO vo2 : sampleBasedReqnListInvTrackingReportVO) {
				i++;

				String groupNameTestName=vo2.getGroupName()==null || vo2.getGroupName().equals("")?"":vo2.getGroupName()+" | ";
				groupNameTestName+=vo2.getTestName()==null?"":vo2.getTestName();

				JsonObject turnAroundTime=CompareTestTurnAroundTime(vo2.getSampleCollDate(), vo2.getReportGenerationDate(), vo2.getTestCode(), vo, request);

				String testRateDetail=vo2.getTestRateDetail()==null?"-":vo2.getTestRateDetail();
				String testRate=testRateDetail.contains("^")?testRateDetail.split("\\^")[0]:"0";
				try { testRate=Double.parseDouble(testRate)>0?testRate:"Free"; }
				catch(NumberFormatException e) { testRate="Free"; }

				String billedUnbilled=vo2.getBillDetail()==null?"-":vo2.getBillDetail().contains("^")?vo2.getBillDetail().split("\\^")[0]:"-";
				billedUnbilled=billedUnbilled.equals("0")?"UnBilled":"Billed";

				JsonObject objectRow = new JsonObject();

				objectRow.addProperty("sno", i);
				objectRow.addProperty("requisitionDate", vo2.getRequisitionDate()==null?"-":vo2.getBillNo() );
				objectRow.addProperty("labName", vo2.getLabName()==null?"-":vo2.getLabName() );
				objectRow.addProperty("advisedByDept", vo2.getAdvisedByDept()==null?"-":vo2.getAdvisedByDept() );
				objectRow.addProperty("groupNameTestName",  groupNameTestName);
				objectRow.addProperty("requisitionStatus", vo2.getRequisitionStatus()==null?"-":vo2.getRequisitionStatus() );
				objectRow.addProperty("requisitionStatusCode", vo2.getRequisitionStatusCode()==null?"-":vo2.getRequisitionStatusCode() );
				objectRow.add("turnAroundTime", turnAroundTime);
				objectRow.addProperty("testRate", testRate);
				objectRow.addProperty("billedUnbilled", billedUnbilled);
				objectRow.addProperty("testNote", turnAroundTime.get("totNote").getAsString());

				objectRow.addProperty("requisitionDate", vo2.getRequisitionDate()==null?"-":vo2.getRequisitionDate() );
				objectRow.addProperty("requisitionBy", vo2.getRequisitionBy()==null?"-":vo2.getRequisitionBy() );
				objectRow.addProperty("advisedByDoc", vo2.getAdvisedByDoc()==null?"-":vo2.getAdvisedByDoc() );
				objectRow.addProperty("groupNameTestName", groupNameTestName);
				objectRow.addProperty("appointmentDate", vo2.getAppointmentDate()==null?"-":vo2.getAppointmentDate() );
				objectRow.addProperty("billNo", vo2.getBillNo()==null?"-":vo2.getBillNo() );
				objectRow.addProperty("billDate", vo2.getBillDate()==null?"-":vo2.getBillDate() );

				objectRow.addProperty("sampleName", vo2.getSampleName()==null?"-":vo2.getSampleName() );
				objectRow.addProperty("sampleNo", vo2.getSampleNo()==null?"-":vo2.getSampleNo() );
				objectRow.addProperty("sampleCollDate", vo2.getSampleCollDate()==null?"-":vo2.getSampleCollDate() );
				objectRow.addProperty("sampleCollBy", vo2.getSampleCollBy()==null?"-":vo2.getSampleCollBy() );
				objectRow.addProperty("labNo", vo2.getLabNo()==null?"-":vo2.getLabNo() );

				objectRow.addProperty("packingListNo", vo2.getPackingListNo()==null?"-":vo2.getPackingListNo() );
				objectRow.addProperty("packingListBy", vo2.getPackingListBy()==null?"-":vo2.getPackingListBy() );
				objectRow.addProperty("packingListDateTime", vo2.getPackingListDateTime()==null?"-":vo2.getPackingListDateTime() );

				objectRow.addProperty("sampleAccepDate", vo2.getSampleAccepDate()==null?"-":vo2.getSampleAccepDate() );
				objectRow.addProperty("sampleAccepBy", vo2.getSampleAccepBy()==null?"-":vo2.getSampleAccepBy() );
				objectRow.addProperty("sampleAccepMode", vo2.getMachineName()==null?"Manual":"Machine" );
				objectRow.addProperty("machineName", vo2.getMachineName()==null?"-":vo2.getMachineName() );

				objectRow.addProperty("sampleRejecDate", vo2.getSampleRejecDate()==null?"-":vo2.getSampleRejecDate() );
				objectRow.addProperty("sampleRejecBy", vo2.getSampleRejecBy()==null?"-":vo2.getSampleRejecBy() );
				objectRow.addProperty("sampleRejecReason", vo2.getSampleRejecReason()==null?"-":vo2.getBillNo() );

				objectRow.addProperty("resultEntryDate", vo2.getResultEntryDate()==null?"-":vo2.getResultEntryDate() );
				objectRow.addProperty("resultEntryBy", vo2.getResultEntryBy()==null?"-":vo2.getResultEntryBy() );
				objectRow.addProperty("resultEntryParam", vo2.getResultEntryParam()==null?"-":vo2.getResultEntryParam() );
				objectRow.addProperty("resultValidDate", vo2.getResultValidDate()==null?"-":vo2.getResultValidDate() );
				objectRow.addProperty("resultValidBy", vo2.getResultValidBy()==null?"-":vo2.getResultValidBy() );

				objectRow.addProperty("reportGenerationDate", vo2.getReportGenerationDate()==null?"-":vo2.getReportGenerationDate() );
				objectRow.addProperty("reportPrintDate", vo2.getReportPrintDate()==null?"-":vo2.getReportPrintDate() );
				objectRow.addProperty("reportPrintBy", vo2.getReportPrintBy()==null?"-":vo2.getReportPrintBy() );
				objectRow.addProperty("reportURL", vo2.getReportURL()==null?"-":vo2.getReportURL() );


		        samBasedReqnListObjectRowsContainer.add(objectRow);
			}

			i=0;
			for(InvTrackingReportVO vo2 : patientBasedReqnListInvTrackingReportVO) {
				i++;

				String groupNameTestName=vo2.getGroupName()==null || vo2.getGroupName().equals("")?"":vo2.getGroupName()+" | ";
				groupNameTestName+=vo2.getTestName()==null?"":vo2.getTestName();

				JsonObject turnAroundTime=CompareTestTurnAroundTime(vo2.getPatientAccepDate(), vo2.getReportGenerationDate(), vo2.getTestCode(), vo, request);

				String testRateDetail=vo2.getTestRateDetail()==null?"-":vo2.getTestRateDetail();
				String testRate=testRateDetail.contains("^")?testRateDetail.split("\\^")[0]:"0";
				try { testRate=Double.parseDouble(testRate)>0?testRate:"Free"; }
				catch(NumberFormatException e) { testRate="Free"; }

				String billedUnbilled=vo2.getBillDetail()==null?"-":vo2.getBillDetail().contains("^")?vo2.getBillDetail().split("\\^")[0]:"-";
				billedUnbilled=billedUnbilled.equals("0")?"UnBilled":"Billed";

				JsonObject objectRow = new JsonObject();

				objectRow.addProperty("sno", i);
				objectRow.addProperty("requisitionDate", vo2.getRequisitionDate()==null?"-":vo2.getBillNo() );
				objectRow.addProperty("labName", vo2.getLabName()==null?"-":vo2.getLabName() );
				objectRow.addProperty("advisedByDept", vo2.getAdvisedByDept()==null?"-":vo2.getAdvisedByDept() );
				objectRow.addProperty("groupNameTestName",  groupNameTestName);
				objectRow.addProperty("requisitionStatus", vo2.getRequisitionStatus()==null?"-":vo2.getRequisitionStatus() );
				objectRow.addProperty("requisitionStatusCode", vo2.getRequisitionStatusCode()==null?"-":vo2.getRequisitionStatusCode() );
				objectRow.add("turnAroundTime", turnAroundTime);
				objectRow.addProperty("testRate", testRate);
				objectRow.addProperty("billedUnbilled", billedUnbilled);
				objectRow.addProperty("testNote", turnAroundTime.get("totNote").getAsString());

				objectRow.addProperty("requisitionDate", vo2.getRequisitionDate()==null?"-":vo2.getRequisitionDate() );
				objectRow.addProperty("requisitionBy", vo2.getRequisitionBy()==null?"-":vo2.getRequisitionBy() );
				objectRow.addProperty("advisedByDoc", vo2.getAdvisedByDoc()==null?"-":vo2.getAdvisedByDoc() );
				objectRow.addProperty("groupNameTestName", groupNameTestName);
				objectRow.addProperty("appointmentDate", vo2.getAppointmentDate()==null?"-":vo2.getAppointmentDate() );
				objectRow.addProperty("billNo", vo2.getBillNo()==null?"-":vo2.getBillNo() );
				objectRow.addProperty("billDate", vo2.getBillDate()==null?"-":vo2.getBillDate() );

				objectRow.addProperty("accessionNo", vo2.getAccessionNo()==null?"-":vo2.getAccessionNo() );
				objectRow.addProperty("patientAccepDate", vo2.getPatientAccepDate()==null?"-":vo2.getPatientAccepDate() );
				objectRow.addProperty("patientAccepBy", vo2.getPatientAccepBy()==null?"-":vo2.getPatientAccepBy() );
				objectRow.addProperty("patientAccepMode", vo2.getMachineName()==null?"Manual":"Machine" );
				objectRow.addProperty("machineName", vo2.getMachineName()==null?"-":vo2.getMachineName() );

				objectRow.addProperty("patientRejecDate", vo2.getPatientRejecDate()==null?"-":vo2.getPatientRejecDate() );
				objectRow.addProperty("patientRejecBy", vo2.getPatientRejecBy()==null?"-":vo2.getPatientRejecBy() );
				objectRow.addProperty("patientRejecReason", vo2.getPatientRejecReason()==null?"-":vo2.getPatientRejecReason() );

				objectRow.addProperty("resultEntryDate", vo2.getResultEntryDate()==null?"-":vo2.getResultEntryDate() );
				objectRow.addProperty("resultEntryBy", vo2.getResultEntryBy()==null?"-":vo2.getResultEntryBy() );
				objectRow.addProperty("resultEntryParam", vo2.getResultEntryParam()==null?"-":vo2.getResultEntryParam() );
				objectRow.addProperty("resultValidDate", vo2.getResultValidDate()==null?"-":vo2.getResultValidDate() );
				objectRow.addProperty("resultValidBy", vo2.getResultValidBy()==null?"-":vo2.getResultValidBy() );

				objectRow.addProperty("reportGenerationDate", vo2.getReportGenerationDate()==null?"-":vo2.getReportGenerationDate() );
				objectRow.addProperty("reportPrintDate", vo2.getReportPrintDate()==null?"-":vo2.getReportPrintDate() );
				objectRow.addProperty("reportPrintBy", vo2.getReportPrintBy()==null?"-":vo2.getReportPrintBy() );
				objectRow.addProperty("reportURL", vo2.getReportURL()==null?"-":vo2.getReportURL() );

		        patBasedReqnListObjectRowsContainer.add(objectRow);
			}

			jsonResponse.add("sampleBasedReqnListOnCrNo", samBasedReqnListObjectRowsContainer);
			jsonResponse.add("patientBasedReqnListOnCrNo", patBasedReqnListObjectRowsContainer);


			objStatus.add(Status.TRANSINPROCESS);
		}
		catch(HisDataAccessException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR_DA,"","Data Access Error");
		}
		catch(HisApplicationExecutionException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR_AE,"","Application Execution Error");
		}
		catch(HisException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR,"","Error");
		}
		return jsonResponse;

	}

	public static String isfromFTPorMONGO(HttpServletRequest request,HttpServletResponse response)
	{
		String flg="";
		UserVO userVO = ControllerUTIL.getUserVO(request);

		if(userVO==null)
		{

			String hospitalcode=(String)request.getAttribute("hosptialcode");
			userVO =new UserVO();
			userVO.setHospitalCode(hospitalcode);
		}

		flg=InvTrackingReportDATA.isfromFTPorMONGO( userVO);

		return flg;

	}

	public static void AjaxGetPDFReportMongo(InvTrackingReportFB fb,HttpServletRequest request,HttpServletResponse response)
	{
		Status status = new Status();
		HttpSession session=request.getSession();
		StringBuffer sbAjaxRes = new StringBuffer();
		Map mp=new HashMap();
		boolean flag=false;
		String filename="";
		try{

			//String reporturl=(String)request.getParameter("reporturl");
			String selectedPDFName= fb.getSelectedPDFName();
			List<InvTrackingReportVO> InvResultReportPrintingVO=null;
			InvTrackingReportVO invresultentryv = new InvTrackingReportVO();
			List<InvTrackingReportVO> lstInvResultReportPrintingVO=new ArrayList<InvTrackingReportVO>();
			List<String> reqList=new ArrayList();
			//fb.setisPatDetailPage("1");
			UserVO userVO = ControllerUTIL.getUserVO(request);
			//InvResultReportPrintingVO=(List<InvTrackingReportVO>)session.getAttribute(InvestigationConfig.LIST_RESULT_REPORT_PRINTING_ESSENTIALS_VO);
			//String selectedCheckBoxValue=fb.getSelectedCheckbox();

			String[] arrSelectedPDFName=selectedPDFName.split("@@");



			for(int i=0;i<arrSelectedPDFName.length;i++)
			 {
				}


				List<InvTrackingReportVO> lstInvResultEntryTemplateVO=null;
				WebUTIL.setMapInSession(mp, request);

				List<byte[]> pdfs = new ArrayList<byte[]>();


				Map<String,String> objMapSamAcc= new HashMap<String,String>();




				for(int i=0;i<arrSelectedPDFName.length;i++)
				{
					String strPdfName = arrSelectedPDFName[i];

					objMapSamAcc.put(strPdfName,"1");

				}
				Set setPdfName=objMapSamAcc.keySet();

				Iterator itrPdfName=setPdfName.iterator();

				//iterate over Crno's
				while(itrPdfName.hasNext())
				{


					  String strPdfName=(String)itrPdfName.next();

					byte[] Pdf=MongoXmlHandler.getInstance().latestFetchFile(strPdfName);


					 pdfs.add(Pdf);
			}


				filename=filename+".pdf";
					 response.setContentType("application/pdf");
					 response.setHeader("content-disposition", "inline; filename="+filename);
						OutputStream output = response.getOutputStream();
						System.out.println("concatallPDFsconcatallPDFsconcatallPDFsconcatallPDFs chandannn");
						MergeAllPdfNewInv.concatallPDFs(pdfs, output, null,request);

		}
		catch(Exception e){
			status.add(Status.ERROR_AE,"Application Execution Exception", "");
			e.printStackTrace();
		}
		finally{
		}

	}




	public static void AjaxGetPDFReportFTP(InvTrackingReportFB fb,HttpServletRequest request,HttpServletResponse response)
	{
		Status status = new Status();
		HttpSession session=request.getSession();
		StringBuffer sbAjaxRes = new StringBuffer();
		Map mp=new HashMap();
		boolean flag=false;
		String filename="";
		try{
			List<InvTrackingReportVO> InvTrackingReportVO=null;
			InvTrackingReportVO invresultentryv = new InvTrackingReportVO();
			List<InvTrackingReportVO> lstInvTrackingReportVO=new ArrayList<InvTrackingReportVO>();
			List<String> reqList=new ArrayList();
			//fb.setisPatDetailPage("1");
			UserVO userVO = ControllerUTIL.getUserVO(request);
			lstInvTrackingReportVO=(List<InvTrackingReportVO>)session.getAttribute(InvestigationConfig.LIST_RESULT_REPORT_PRINTING_ESSENTIALS_VO);
			String selectedPDFName= fb.getSelectedPDFName();

			String[] arrSelectedPDFName=selectedPDFName.split("@");


				Map<String,String> objMapSamAcc= new HashMap<String,String>();
				List<InputStream> pdfs = new ArrayList<InputStream>();

				for(int i1=0;i1<arrSelectedPDFName.length;i1++)
				 {


					String pdfname=arrSelectedPDFName[i1];
					objMapSamAcc.put(pdfname,"12");

				 }

				Set setPdfName=objMapSamAcc.keySet();

				Iterator itrPdfName=setPdfName.iterator();

				String patientcreatefileftpaddress= fb.getFtpserver();

				//iterate over Crno's
				while(itrPdfName.hasNext())
				{
					  String strPdfName=(String)itrPdfName.next();

					  String crNo=strPdfName.substring(0,15);
						System.out.println(strPdfName.substring(5,7));
						String year=    crNo.substring(5,7); //MergeAllPdfNewInv.getYear(crNo);
					    String insideyear=MergeAllPdfNewInv.getInsideYear(crNo);
					    String count=MergeAllPdfNewInv.getcount(crNo);


						  String strPdfPath = patientcreatefileftpaddress+"/"+strPdfName.substring(0,5)+"/"+ "20"+year+"/"+insideyear+"/"+count+"/"+strPdfName.substring(0,15)+"/"+strPdfName;


						  System.out.println("strPdfPath : "+strPdfPath);

						//ByteArrayOutputStream Pdf;

						  URL urlftp=new URL(strPdfPath);
							URLConnection urlcon=urlftp.openConnection();


					 //pdfs.add(Pdf);	changed ftp by chnadan
							pdfs.add(urlcon.getInputStream());

				  }

				filename=filename+".pdf";
					 response.setContentType("application/pdf");
					 response.setHeader("content-disposition", "inline; filename="+filename);
						OutputStream output = response.getOutputStream();
						System.out.println("concatallPDFsconcatallPDFsconcatallPDFsconcatallPDFs chandannn");
						MergeAllPdfNewInv.concatallPDFsFTP(pdfs, output, null,request);

		}

		catch(Exception e){
			status.add(Status.ERROR_AE,"Application Execution Exception", "");
			e.printStackTrace();
		}
		finally{
		}

	}

	public static JsonObject AjaxGetReqnTestParamListOnCrNo(InvTrackingReportFB fb, HttpServletRequest request) {
		Status objStatus= new Status();

		InvTrackingReportVO vo = new InvTrackingReportVO();
		List<InvTrackingReportVO> reqnTestParamListInvTrackingReportVO = new ArrayList<InvTrackingReportVO>();
		Map mp=new HashMap();

		JsonObject jsonResponse = new JsonObject();



		try {

			UserVO userVO = ControllerUTIL.getUserVO(request);
			HelperMethods.populate(vo, fb);
			ControllerUTIL.setSysdate(request);

			mp=InvTrackingReportDATA.AjaxGetReqnTestParamListOnCrNo(vo, userVO);
			reqnTestParamListInvTrackingReportVO=(List<InvTrackingReportVO>) mp.get("reqnTestParamListOnCrNo");

			JsonObject testCodeWiseArray = new JsonObject();
			JsonObject groupCodeWiseArray = new JsonObject();


			for(InvTrackingReportVO vo2 : reqnTestParamListInvTrackingReportVO) {
			//	i++;
				JsonObject testParamObjectArrayContainer  = new JsonObject();
				JsonObject reqnDnoPlusTestCodeArrayContainer = new JsonObject();


				HashMap<Integer, List<Integer>> objGroupMap = new HashMap<Integer, List<Integer>>();
				if(vo2.getIsGroup().equals("0")) {

					String strTestParameterName = vo2.getTestParameterName();
					String[] strTestParaList = strTestParameterName.split(",");
					if(strTestParaList!=null )
					{
						JsonArray testParamObjectArray= new JsonArray();
						int noOfParameter = strTestParaList.length;
						for(int i=0;i<noOfParameter;i++)
						{
							JsonObject paramObject = new JsonObject();
							String testParam = strTestParaList[i];
							String[] strParamValue = testParam.split("#");

							String strparaCode = strParamValue[0] ;
							String strParaName = strParamValue[1];
							String strParaRefRange=strParamValue[2];
							String strValue = strParamValue[3];
							String strOutOfBound = strParamValue[4];


							paramObject.addProperty("paramCode", strparaCode);
							paramObject.addProperty("paraName", strParaName);
							paramObject.addProperty("paraValue", strValue);
							paramObject.addProperty("testName", vo2.getTestName());
							paramObject.addProperty("refRange", strParaRefRange);
							paramObject.addProperty("outOfBound", strOutOfBound);
							paramObject.addProperty("dateTime", vo2.getRequisitionDate());
							paramObject.addProperty("isInteger", strOutOfBound);

							testParamObjectArray.add(paramObject);

						}
						String reqnDnoPlusTestCode = vo2.getRequisitionDNo().concat(vo2.getTestCode());
						testParamObjectArrayContainer.add(reqnDnoPlusTestCode, testParamObjectArray);

						JsonObject reqnDnoPlusTestCodeArray= new JsonObject();
						reqnDnoPlusTestCodeArray.add("reqnDnoPlusTestCode", testParamObjectArrayContainer);
						reqnDnoPlusTestCodeArray.addProperty("isGroup", vo2.getIsGroup());
						reqnDnoPlusTestCodeArray.addProperty("testCode", vo2.getTestCode());
						reqnDnoPlusTestCodeArray.addProperty("testName", vo2.getTestName());
						reqnDnoPlusTestCodeArray.addProperty("Note", "Comments");
						reqnDnoPlusTestCodeArrayContainer.add(vo2.getTestCode(), reqnDnoPlusTestCodeArray);
					}

					testCodeWiseArray.add("testCodeWise", testCodeWiseArray);
				}
				else if (vo2.getIsGroup().equals("1")){

					//Get the groupCode,testcode

					List<Integer> objTestList = objGroupMap.get(vo2.getGroupCode());




					JsonArray testParamObjectArray= new JsonArray();

					for (int i1=5; i1<10 ; i1++) {  /*Number of TesParams*/
						JsonObject paramObject = new JsonObject();

						double paraValue;
						String isInteger="";
						try { paraValue=Double.parseDouble(vo2.getTestParamRefRange());  isInteger="1";}
						catch(NumberFormatException e) { isInteger="0"; }

						paramObject.addProperty("paramCode", vo2.getTestParamRefRange());
						paramObject.addProperty("paraName", vo2.getTestParamName());
						paramObject.addProperty("paraValue", vo2.getTestParamValue());
						paramObject.addProperty("testName", vo2.getTestName());
						paramObject.addProperty("refRange", vo2.getTestParamRefRange());
						paramObject.addProperty("outOfBound", vo2.getTestParamOutOfBound());
						paramObject.addProperty("dateTime", vo2.getRequisitionDate());
						paramObject.addProperty("isInteger", isInteger);

						testParamObjectArray.add(paramObject);
					}

					String reqnNoPlusGroupCode = vo2.getRequisitionNo().concat(vo2.getGroupCode());

					JsonObject testParamObjectArrayContainer  = new JsonObject();
					testParamObjectArrayContainer.add(reqnNoPlusGroupCode, testParamObjectArray);

					JsonObject reqnNoPlusTestCodeArray= new JsonObject();
					reqnNoPlusTestCodeArray.add("reqnDnoPlusTestCode", testParamObjectArrayContainer);
					reqnNoPlusTestCodeArray.addProperty("isGroup", vo2.getIsGroup());
					reqnNoPlusTestCodeArray.addProperty("groupCode", vo2.getGroupCode());
					reqnNoPlusTestCodeArray.addProperty("groupName", vo2.getGroupName());
					reqnNoPlusTestCodeArray.addProperty("Note", "Note");

					JsonObject reqnDnoPlusTestCodeArrayContainer = new JsonObject();
					reqnDnoPlusTestCodeArrayContainer.add(vo2.getTestCode(), reqnNoPlusTestCodeArray);

					groupCodeWiseArray.add("groupCodeWise", groupCodeWiseArray);
				}

			}

			jsonResponse.add("reqnTestParamListOnCrNo", testCodeWiseArray);
			jsonResponse.add("reqnTestParamListOnCrNo", groupCodeWiseArray);


			objStatus.add(Status.TRANSINPROCESS);
		}
		catch(HisDataAccessException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR_DA,"","Data Access Error");
		}
		catch(HisApplicationExecutionException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR_AE,"","Application Execution Error");
		}
		catch(HisException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR,"","Error");
		}
		return jsonResponse;
	}

	public static JsonObject AjaxGetReqDetails(InvTrackingReportFB fb, HttpServletRequest request) {
		return null;

	}

	public static JsonObject GetDateDiffs(String a, String b) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy H:mm", Locale.ENGLISH);
		JsonObject DiffDateTimeJson = new JsonObject();
		String diffDateTime="-";
		//default values so that there is no possibility fo rerror
		DiffDateTimeJson.addProperty("totalInDays", 0);
	    DiffDateTimeJson.addProperty("totalInHours", 0);
	    DiffDateTimeJson.addProperty("totalInMinutes", 0);
	    DiffDateTimeJson.addProperty("totalInSeconds", 0);
	    DiffDateTimeJson.addProperty("diffDateTime", diffDateTime);

		try {
		if(a!=null && b!=null) {

		    Date firstDate = sdf.parse(a);
		    Date secondDate = sdf.parse(b);

		    long diffInMillies = Math.abs(secondDate.getTime() - firstDate.getTime());
		    long d=diffInMillies / (1000 * 60 * 60 * 24);
		    long days = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
		    long hours =TimeUnit.HOURS.convert(diffInMillies, TimeUnit.MILLISECONDS) - days*24;
		    long minutes =(TimeUnit.MINUTES.convert(diffInMillies, TimeUnit.MILLISECONDS) -(hours+days*24)*60);
		    long seconds =TimeUnit.SECONDS.convert(diffInMillies, TimeUnit.MILLISECONDS) -(minutes+(hours+days*24)*60)*60;

		    if(days>0) {
		    	diffDateTime = days + " Days ";
		    	if(hours>0)
		    		diffDateTime +=hours +" Hrs ";
		    }
		    else if(hours>0) {
		    	diffDateTime = hours + " hrs ";
		    	if(minutes>0)
		    		diffDateTime += minutes +" Min ";
		    }
		    else if(minutes>0) {
		    	diffDateTime = minutes +" Min ";
		    	if(seconds>0)
		    		diffDateTime +=seconds+" ss";
		    }
		    else if(seconds>0) {
		    	diffDateTime = seconds+" ss";
		    }
		    DiffDateTimeJson.addProperty("totalInDays", days);
		    DiffDateTimeJson.addProperty("totalInHours", hours+days*24);
		    DiffDateTimeJson.addProperty("totalInMinutes", minutes+(hours+days*24)*60);
		    DiffDateTimeJson.addProperty("totalInSeconds", seconds+(minutes+(hours+days*24)*60)*60);
		    DiffDateTimeJson.addProperty("diffDateTime", diffDateTime);
		}
		else if(a!=null && b==null) {

		    Date firstDate = sdf.parse(a);
		    Date sysDate = new Date(System.currentTimeMillis());

		    long diffInMillies = Math.abs(sysDate.getTime() - firstDate.getTime());

		    long days = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
		    long hours =TimeUnit.HOURS.convert(diffInMillies, TimeUnit.MILLISECONDS) - days*24;
		    long minutes =TimeUnit.MINUTES.convert(diffInMillies, TimeUnit.MILLISECONDS) - hours*60;
		    long seconds =TimeUnit.SECONDS.convert(diffInMillies, TimeUnit.MILLISECONDS) - minutes*60;

		    if(days>0) {
		    	diffDateTime = days + " Days ";
		    	if(hours>0)
		    		diffDateTime +=hours +" Hrs ";
		    }
		    else if(hours>0) {
		    	diffDateTime = hours + " hrs ";
		    	if(minutes>0)
		    		diffDateTime += minutes +" Min ";
		    }
		    else if(minutes>0) {
		    	diffDateTime = minutes +" Min ";
		    	if(seconds>0)
		    		diffDateTime +=seconds+" ss";
		    }
		    else if(seconds>0) {
		    	diffDateTime = seconds+" ss";
		    }
		    DiffDateTimeJson.addProperty("totalInDays", days);
		    DiffDateTimeJson.addProperty("totalInHours", hours*24);
		    DiffDateTimeJson.addProperty("totalInMinutes", minutes*60);
		    DiffDateTimeJson.addProperty("totalInSeconds", seconds*60);
		    DiffDateTimeJson.addProperty("diffDateTime", diffDateTime);
		}
		else {

		}


		} catch (ParseException e) {
			e.printStackTrace();
			return DiffDateTimeJson;
		}
		return DiffDateTimeJson;

	}

	public static JsonObject CompareTestTurnAroundTime(String samOrPatAccepDate, String reportGenDate, String testCode, InvTrackingReportVO vo, HttpServletRequest request) {
		Map mapAvgTurnAroundTime = new HashMap();
		InvTrackingReportFB fb = new InvTrackingReportFB();
		JsonObject jsonTurnAroundTimeObject = new JsonObject();

		//default values so that there is no possibility fo rerror
		jsonTurnAroundTimeObject.addProperty("turnAroundTime", "-");
		jsonTurnAroundTimeObject.addProperty("totDecisionCode", "0");
		jsonTurnAroundTimeObject.addProperty("totNote", "-");

		try {

			HelperMethods.populate(fb, vo);
			UserVO userVO = ControllerUTIL.getUserVO(request);

			mapAvgTurnAroundTime=(Map)request.getSession().getAttribute("mapAvgTurnAroundTime");

			if(mapAvgTurnAroundTime==null || mapAvgTurnAroundTime.get(testCode)==null)
			{
				mapAvgTurnAroundTime=InvTrackingReportDATA.GetTestTurnAroundTime(vo, userVO);
				request.getSession().setAttribute("mapAvgTurnAroundTime", mapAvgTurnAroundTime);
				//mapAvgTurnAroundTime=GetTestTurnAroundTime(fb, request);
			}

			int avgTurnAroundTime=(int) Long.parseLong(mapAvgTurnAroundTime.get(testCode).toString()==null ? "0":mapAvgTurnAroundTime.get(testCode).toString());

			JsonObject DiffDateTimeJson = new JsonObject();
			DiffDateTimeJson=GetDateDiffs(samOrPatAccepDate, reportGenDate);

			int totalInHours=(int) DiffDateTimeJson.get("totalInHours").getAsLong();

			String totNote="-";
			String totDecisionCode="0";

			if(samOrPatAccepDate!=null && reportGenDate!=null && avgTurnAroundTime>0) {
				if( totalInHours<avgTurnAroundTime) {
					totDecisionCode="1"; totNote="Test before | TAT("+avgTurnAroundTime+"hrs)";
					}
				if( totalInHours==avgTurnAroundTime) {
					totDecisionCode="2"; totNote="Test within | TAT("+avgTurnAroundTime+"hrs)";
					}
				if(totalInHours>avgTurnAroundTime) {
					totDecisionCode="3"; totNote="Test delayed "+(totalInHours-avgTurnAroundTime)+"hrs above | TAT("+avgTurnAroundTime+"hrs)";
					}
			}
			else if(samOrPatAccepDate!=null && reportGenDate==null && avgTurnAroundTime>0) {
				if(totalInHours<avgTurnAroundTime) {
					totDecisionCode="4"; totNote="Test within | TAT("+avgTurnAroundTime+"hrs)";
					}
				if(totalInHours>avgTurnAroundTime) {
					totDecisionCode="5"; totNote="Test delayed "+(totalInHours-avgTurnAroundTime)+"hrs above | TAT("+avgTurnAroundTime+"hrs)";
					}
			}

			jsonTurnAroundTimeObject.addProperty("turnAroundTime", DiffDateTimeJson.get("diffDateTime").toString().replaceAll("\"", ""));
			jsonTurnAroundTimeObject.addProperty("totDecisionCode", totDecisionCode);
			jsonTurnAroundTimeObject.addProperty("totNote", totNote);
		}
		catch(Exception e){
			System.out.println(e.getMessage());
			return jsonTurnAroundTimeObject;
		}
		return jsonTurnAroundTimeObject;

	}


public static Map GetTestTurnAroundTime(InvTrackingReportFB fb, HttpServletRequest request) {

		Status objStatus = new Status();
		InvTrackingReportVO vo = new InvTrackingReportVO();
		Map mp=new HashMap();
		Map mapAvgTurnAroundTime = new HashMap();
		try {

			UserVO userVO = ControllerUTIL.getUserVO(request);
			HelperMethods.populate(vo, fb);
			ControllerUTIL.setSysdate(request);

			mapAvgTurnAroundTime=(Map)request.getSession().getAttribute("mapAvgTurnAroundTime");

			if(mapAvgTurnAroundTime==null)
			{
				mapAvgTurnAroundTime=InvTrackingReportDATA.GetTestTurnAroundTime(vo, userVO);
				request.getSession().setAttribute("mapAvgTurnAroundTime", mapAvgTurnAroundTime);
			}
		}
		catch(HisDataAccessException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR_DA,"","Data Access Error");
		}
		catch(HisApplicationExecutionException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR_AE,"","Application Execution Error");
		}
		catch(HisException e)
		{
			System.out.println(e.getMessage());
			objStatus.add(Status.ERROR,"","Error");
		}

		return mapAvgTurnAroundTime;
	}

}

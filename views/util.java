package new_investigation.reports.controller.utl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.jms.Session;
import javax.servlet.http.HttpServletRequest;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ibm.icu.text.SimpleDateFormat;

import hisglobal.exceptions.HisApplicationExecutionException;
import hisglobal.exceptions.HisDataAccessException;
import hisglobal.exceptions.HisException;
import hisglobal.exceptions.HisRecordNotFoundException;
import hisglobal.presentation.ControllerUTIL;
import hisglobal.presentation.Status;
import hisglobal.utility.HelperMethods;
import hisglobal.vo.UserVO;
import new_investigation.reports.controller.data.InvTrackingReportDATA;
import new_investigation.reports.controller.fb.InvTrackingReportFB;
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

			objectRow.addProperty("patientName", vo2.getPatName()==null?"":vo2.getPatName());
			objectRow.addProperty("crNumber", vo2.getCrNo()==null?"":vo2.getCrNo());
			objectRow.addProperty("patientStatus", vo2.getPatType()==null?"":vo2.getPatType());
			objectRow.addProperty("ageGender", vo2.getAge_gender()==null?"":vo2.getAge_gender());
			objectRow.addProperty("phoneNo", vo2.getPhoneNo()==null?"":vo2.getPhoneNo());
			objectRow.addProperty("emailId", vo2.getEmailId()==null?"":vo2.getEmailId());
			objectRow.addProperty("latestBillNo", vo2.getLatestBillNo()==null?"":vo2.getLatestBillNo());
			objectRow.addProperty("memberSince", vo2.getMemberSince()==null?"":vo2.getMemberSince());
			objectRow.addProperty("totalPaymentsDone", vo2.getTotalPaymentsDone()==null?"":vo2.getTotalPaymentsDone());
			objectRow.addProperty("pendingPayments", vo2.getPendingPayments()==null?"":vo2.getPendingPayments());
			objectRow.addProperty("address", vo2.getAddress()==null?"":vo2.getAddress());
			objectRow.addProperty("note", vo2.getNote()==null?"":vo2.getNote());

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

			objectRow.addProperty("patientName", vo2.getPatName()==null?"":vo2.getPatName());
			objectRow.addProperty("crNumber", vo2.getCrNo()==null?"":vo2.getCrNo());
			objectRow.addProperty("patientStatus", vo2.getPatType()==null?"":vo2.getPatType());
			objectRow.addProperty("ageGender", vo2.getAge_gender()==null?"":vo2.getAge_gender());
			objectRow.addProperty("phoneNo", vo2.getPhoneNo()==null?"":vo2.getPhoneNo());
			objectRow.addProperty("emailId", vo2.getEmailId()==null?"":vo2.getEmailId());
			objectRow.addProperty("latestBillNo", vo2.getLatestBillNo()==null?"":vo2.getLatestBillNo());
			objectRow.addProperty("memberSince", vo2.getMemberSince()==null?"":vo2.getMemberSince());
			objectRow.addProperty("totalPaymentsDone", vo2.getTotalPaymentsDone()==null?"":vo2.getTotalPaymentsDone());
			objectRow.addProperty("pendingPayments", vo2.getPendingPayments()==null?"":vo2.getPendingPayments());
			objectRow.addProperty("address", vo2.getAddress()==null?"":vo2.getAddress());
			objectRow.addProperty("note", vo2.getNote()==null?"":vo2.getNote());

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


				JsonObject objectRow = new JsonObject();

				objectRow.addProperty("sno", i);
				objectRow.addProperty("requisitionDate", vo2.getRequisitionDate()==null?"-":vo2.getBillNo() );
				objectRow.addProperty("labName", vo2.getLabName()==null?"-":vo2.getLabName() );

				objectRow.addProperty("groupNameTestName",  groupNameTestName);
				objectRow.addProperty("requisitionStatus", vo2.getRequisitionStatus()==null?"-":vo2.getRequisitionStatus() );
				objectRow.addProperty("requisitionStatusCode", vo2.getRequisitionStatusCode()==null?"-":vo2.getRequisitionStatusCode() );
				objectRow.add("turnAroundTime", turnAroundTime);
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

		        samBasedReqnListObjectRowsContainer.add(objectRow);
			}

			i=0;
			for(InvTrackingReportVO vo2 : patientBasedReqnListInvTrackingReportVO) {
				i++;

				String groupNameTestName=vo2.getGroupName()==null || vo2.getGroupName().equals("")?"":vo2.getGroupName()+" | ";
				groupNameTestName+=vo2.getTestName()==null?"":vo2.getTestName();

				JsonObject turnAroundTime=CompareTestTurnAroundTime(vo2.getPatientAccepDate(), vo2.getReportGenerationDate(), vo2.getTestCode(), vo, request);

				JsonObject objectRow = new JsonObject();

				objectRow.addProperty("sno", i);
				objectRow.addProperty("requisitionDate", vo2.getRequisitionDate()==null?"-":vo2.getBillNo() );
				objectRow.addProperty("labName", vo2.getLabName()==null?"-":vo2.getLabName() );

				objectRow.addProperty("groupNameTestName",  groupNameTestName);
				objectRow.addProperty("requisitionStatus", vo2.getRequisitionStatus()==null?"-":vo2.getRequisitionStatus() );
				objectRow.addProperty("requisitionStatusCode", vo2.getRequisitionStatusCode()==null?"-":vo2.getRequisitionStatusCode() );
				objectRow.add("turnAroundTime", turnAroundTime);
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

				JsonObject objectRow = new JsonObject();

				objectRow.addProperty("sno", i);
				objectRow.addProperty("requisitionDate", vo2.getRequisitionDate()==null?"-":vo2.getBillNo() );
				objectRow.addProperty("labName", vo2.getLabName()==null?"-":vo2.getLabName() );

				objectRow.addProperty("groupNameTestName",  groupNameTestName);
				objectRow.addProperty("requisitionStatus", vo2.getRequisitionStatus()==null?"-":vo2.getRequisitionStatus() );
				objectRow.addProperty("requisitionStatusCode", vo2.getRequisitionStatusCode()==null?"-":vo2.getRequisitionStatusCode() );
				objectRow.add("turnAroundTime", turnAroundTime);
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

		        samBasedReqnListObjectRowsContainer.add(objectRow);
			}

			i=0;
			for(InvTrackingReportVO vo2 : patientBasedReqnListInvTrackingReportVO) {
				i++;

				String groupNameTestName=vo2.getGroupName()==null || vo2.getGroupName().equals("")?"":vo2.getGroupName()+" | ";
				groupNameTestName+=vo2.getTestName()==null?"":vo2.getTestName();

				JsonObject turnAroundTime=CompareTestTurnAroundTime(vo2.getPatientAccepDate(), vo2.getReportGenerationDate(), vo2.getTestCode(), vo, request);

				JsonObject objectRow = new JsonObject();

				objectRow.addProperty("sno", i);
				objectRow.addProperty("requisitionDate", vo2.getRequisitionDate()==null?"-":vo2.getBillNo() );
				objectRow.addProperty("labName", vo2.getLabName()==null?"-":vo2.getLabName() );

				objectRow.addProperty("groupNameTestName",  groupNameTestName);
				objectRow.addProperty("requisitionStatus", vo2.getRequisitionStatus()==null?"-":vo2.getRequisitionStatus() );
				objectRow.addProperty("requisitionStatusCode", vo2.getRequisitionStatusCode()==null?"-":vo2.getRequisitionStatusCode() );
				objectRow.add("turnAroundTime", turnAroundTime);
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

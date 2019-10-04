package new_investigation.reports.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import hisglobal.exceptions.HisDataAccessException;
import hisglobal.exceptions.HisRecordNotFoundException;
import hisglobal.persistence.DataAccessObject;
import hisglobal.persistence.HelperMethodsDAO;
import hisglobal.persistence.JDBCTransactionContext;
import hisglobal.utility.HelperMethods;
import hisglobal.utility.Sequence;
import hisglobal.vo.UserVO;
import new_investigation.InvestigationConfig;
import new_investigation.vo.InvTrackingReportVO;

@SuppressWarnings({ "rawtypes", "unchecked" })
public class InvTrackingReportDAO extends DataAccessObject implements InvTrackingReportDAOI {

	public InvTrackingReportDAO(JDBCTransactionContext tx) {
		super(tx);
	}


	public InvTrackingReportVO AjaxGetPatDetailsOnBillNo(InvTrackingReportVO vo, UserVO userVO) {

		String filename=InvestigationConfig.QUERY_FILE_FOR_INVESTIGATION_REPORTSDAO;
		String queryKey="SELECT_INV_TRACKING_PAT_DETAILS_ONBILLNO_HIVT_REQUISITION_DTL";
		String query="";

		ResultSet rs = null;
		Connection conn=super.getTransactionContext().getConnection();

		Map populateMap = new HashMap<>();
		Sequence sq= new Sequence();
		InvTrackingReportVO vo2 = null;

		try
		{
			query = HelperMethodsDAO.getQuery(filename,queryKey);
		}
		catch(Exception e)
		{
			throw new HisDataAccessException("HelperMethodsDAO.loadPropertiesFile(filename)OR getting query out of property file::"+e);
		}

		try
		{
			populateMap.put(sq.next(),vo.getBillNo());
			populateMap.put(sq.next(), userVO.getHospitalCode());

			rs = HelperMethodsDAO.executeQuery(conn, query, populateMap);

			if (!rs.next()) { }
			else
			{
				rs.beforeFirst();
				while(rs.next()){
					vo2 = new InvTrackingReportVO();
					HelperMethods.populateVOfrmRS(vo2, rs);
				}
			}
		}
		catch(Exception e)
		{
			 throw new HisDataAccessException("HisDataAccessException:: "+e);
		 }
		return vo2;
	}

	public InvTrackingReportVO AjaxGetPatDetailsOnCrNo(InvTrackingReportVO vo, UserVO userVO) {


		String filename=InvestigationConfig.QUERY_FILE_FOR_INVESTIGATION_REPORTSDAO;
		String queryKey="SELECT_INV_TRACKING_PAT_DETAILS_ONCRNO_HIVT_REQUISITION_DTL";
		String query="";

		ResultSet rs=null;
		Connection conn=super.getTransactionContext().getConnection();

		Map populateMap = new HashMap();
		Sequence sq = new Sequence();
		InvTrackingReportVO vo2 = null;

		try
		{
			query = HelperMethodsDAO.getQuery(filename, queryKey);

		} catch (Exception e) {
			throw new HisDataAccessException("HelperMethodsDAO.loadPropertiesFile(filename)OR getting query out of property file::"+e);
		}

		try
		{
			populateMap.put(sq.next(), vo.getCrNo());
			populateMap.put(sq.next(), userVO.getHospitalCode());

			rs = HelperMethodsDAO.executeQuery(conn, query, populateMap);

			if(!rs.next()) { }
			else {
				rs.beforeFirst();
				while(rs.next()) {
					vo2 = new InvTrackingReportVO();
					HelperMethods.populateVOfrmRS(vo2, rs);
				}
			}

		}
		catch (Exception e)
		{
			 throw new HisDataAccessException("HisDataAccessException:: "+e);
		}
		return vo2;
	}

	public InvTrackingReportVO AjaxGetPatDetailsOnSampleNo(InvTrackingReportVO vo, UserVO userVO) {


		String filename=InvestigationConfig.QUERY_FILE_FOR_INVESTIGATION_REPORTSDAO;
		String queryKey="SELECT_INV_TRACKING_PAT_DETAILS_ONSAMPLENO_HIVT_REQUISITION_DTL";
		String query="";

		ResultSet rs=null;
		Connection conn=super.getTransactionContext().getConnection();

		Map populateMap = new HashMap();
		Sequence sq = new Sequence();
		InvTrackingReportVO vo2 = null;

		try
		{
			query = HelperMethodsDAO.getQuery(filename, queryKey);

		} catch (Exception e) {
			throw new HisDataAccessException("HelperMethodsDAO.loadPropertiesFile(filename)OR getting query out of property file::"+e);
		}

		try
		{
			populateMap.put(sq.next(), vo.getSampleNo());
			populateMap.put(sq.next(), userVO.getHospitalCode());

			rs = HelperMethodsDAO.executeQuery(conn, query, populateMap);

			if(!rs.next()) { }
			else {
				rs.beforeFirst();
				while(rs.next()) {
					vo2 = new InvTrackingReportVO();
					HelperMethods.populateVOfrmRS(vo2, rs);
				}
			}
		}
		catch (Exception e)
		{
			 throw new HisDataAccessException("HisDataAccessException:: "+e);
		}
		return vo2;
	}


	public List<InvTrackingReportVO> AjaxGetPatSampleReqnListOnBillNo(InvTrackingReportVO vo, UserVO userVO) {

		String filename= InvestigationConfig.QUERY_FILE_FOR_INVESTIGATION_REPORTSDAO;
		String queryKey1="SELECT_INV_TRACKING_REPORT_SAMPLEBASED_TEST_ONBILLNO_HIVT_REQUISITION_DTL";
		String queryKey2="SELECT_INV_TRACKING_REPORT_SAMPLEBASED_TEST_ONBILLNO_ARCHIVAL_HIVT_REQUISITION_DTL";
		String query="";

		ResultSet rs=null;
		Connection conn=super.getTransactionContext().getConnection();

		Map populateMap= new HashMap();
		Sequence sq= new Sequence();
		List<InvTrackingReportVO> listInvTrackingReportVO=new ArrayList<InvTrackingReportVO>();

		try
		{	if(vo.getDataFromArchival().equals("0"))
			query = HelperMethodsDAO.getQuery(filename,queryKey1);

			if(vo.getDataFromArchival().equals("1"))
			query = HelperMethodsDAO.getQuery(filename,queryKey2);
		}
		catch(Exception e)
		{
			throw new HisDataAccessException("HelperMethodsDAO.loadPropertiesFile(filename)OR getting query out of property file::"+e);
		}

		try
		{	if(vo.getDataFromArchival().equals("0")) {
				populateMap.put(sq.next(),vo.getBillNo());
				populateMap.put(sq.next(), userVO.getHospitalCode());
			}
			else if(vo.getDataFromArchival().equals("1")) {
				populateMap.put(sq.next(),vo.getBillNo());
				populateMap.put(sq.next(), userVO.getHospitalCode());
				populateMap.put(sq.next(), vo.getFromDate());
				populateMap.put(sq.next(), vo.getToDate());
			}

			rs = HelperMethodsDAO.executeQuery(conn, query, populateMap);

			if (!rs.next()) {  }
			else
			{
				rs.beforeFirst();
				while(rs.next()){
					InvTrackingReportVO vo2 = new InvTrackingReportVO();
					HelperMethods.populateVOfrmRS(vo2, rs);

					listInvTrackingReportVO.add(vo2);
				}
			}
		}
		catch(Exception e)
		{
			 throw new HisDataAccessException("HisDataAccessException:: "+e);
		 }

		return listInvTrackingReportVO;
	}

	public List<InvTrackingReportVO> AjaxGetPatPatientReqnListOnBillNo(InvTrackingReportVO vo, UserVO userVO) {

		String filename= InvestigationConfig.QUERY_FILE_FOR_INVESTIGATION_REPORTSDAO;
		String queryKey1="SELECT_INV_TRACKING_REPORT_PATIENTBASED_TEST_ONBILLNO_HIVT_REQUISITION_DTL";
		String queryKey2="SELECT_INV_TRACKING_REPORT_PATIENTBASED_TEST_ONBILLNO_ARCHIVAL_HIVT_REQUISITION_DTL";
		String query="";

		ResultSet rs=null;
		Connection conn=super.getTransactionContext().getConnection();

		Map populateMap= new HashMap();
		Sequence sq= new Sequence();
		List<InvTrackingReportVO> listInvTrackingReportVO=new ArrayList<InvTrackingReportVO>();

		try
		{	if(vo.getDataFromArchival().equals("0"))
			query = HelperMethodsDAO.getQuery(filename,queryKey1);

			if(vo.getDataFromArchival().equals("1"))
			query = HelperMethodsDAO.getQuery(filename,queryKey2);
		}
		catch(Exception e)
		{
			throw new HisDataAccessException("HelperMethodsDAO.loadPropertiesFile(filename)OR getting query out of property file::"+e);
		}

		try
		{
			if(vo.getDataFromArchival().equals("0")) {
				populateMap.put(sq.next(),vo.getBillNo());
				populateMap.put(sq.next(), userVO.getHospitalCode());
			}
			else if(vo.getDataFromArchival().equals("1")) {
				populateMap.put(sq.next(),vo.getBillNo());
				populateMap.put(sq.next(), userVO.getHospitalCode());
				populateMap.put(sq.next(), vo.getFromDate());
				populateMap.put(sq.next(), vo.getToDate());
			}

			rs = HelperMethodsDAO.executeQuery(conn, query, populateMap);

			if (!rs.next()) {  }
			else
			{
				rs.beforeFirst();
				while(rs.next()){
					InvTrackingReportVO vo2 = new InvTrackingReportVO();
					HelperMethods.populateVOfrmRS(vo2, rs);

					listInvTrackingReportVO.add(vo2);
				}
			}
		}
		catch(Exception e)
		{
			 throw new HisDataAccessException("HisDataAccessException:: "+e);
		 }

		return listInvTrackingReportVO;
	}


	public List<InvTrackingReportVO> AjaxGetPatSampleReqnListOnCrNo(InvTrackingReportVO vo, UserVO userVO) {

		String filename= InvestigationConfig.QUERY_FILE_FOR_INVESTIGATION_REPORTSDAO;
		String queryKey1="SELECT_INV_TRACKING_REPORT_SAMPLEBASED_TEST_ONCRNO_HIVT_REQUISITION_DTL";
		String queryKey2="SELECT_INV_TRACKING_REPORT_SAMPLEBASED_TEST_ONCRNO_ARCHIVAL_HIVT_REQUISITION_DTL";
		String query="";

		ResultSet rs=null;
		Connection conn=super.getTransactionContext().getConnection();

		Map populateMap= new HashMap();
		Sequence sq= new Sequence();
		List<InvTrackingReportVO> listInvTrackingReportVO=new ArrayList<InvTrackingReportVO>();

		try
		{
			if(vo.getDataFromArchival().equals("0"))
			query = HelperMethodsDAO.getQuery(filename,queryKey1);

			if(vo.getDataFromArchival().equals("1"))
			query = HelperMethodsDAO.getQuery(filename,queryKey2);
		}
		catch(Exception e)
		{
			throw new HisDataAccessException("HelperMethodsDAO.loadPropertiesFile(filename)OR getting query out of property file::"+e);
		}


		try
		{
			if(vo.getDataFromArchival().equals("0")) {
				populateMap.put(sq.next(), vo.getCrNo());
				populateMap.put(sq.next(), userVO.getHospitalCode());
			}
			else if(vo.getDataFromArchival().equals("1")) {
				populateMap.put(sq.next(), vo.getCrNo());
				populateMap.put(sq.next(), userVO.getHospitalCode());
				populateMap.put(sq.next(), vo.getFromDate());
				populateMap.put(sq.next(), vo.getToDate());
			}

			rs=HelperMethodsDAO.executeQuery(conn, query, populateMap);

			if(!rs.next()) { }
			else {
				rs.beforeFirst();
				while(rs.next()) {
					InvTrackingReportVO vo2 = new InvTrackingReportVO();
					HelperMethods.populateVOfrmRS(vo2, rs);

					listInvTrackingReportVO.add(vo2);
				}
			}

		}
		catch (Exception e)
		{
			 throw new HisDataAccessException("HisDataAccessException:: "+e);
		 }

		return listInvTrackingReportVO;
	}

	public List<InvTrackingReportVO> AjaxGetPatPatientReqnListOnCrNo(InvTrackingReportVO vo, UserVO userVO) {

		String filename= InvestigationConfig.QUERY_FILE_FOR_INVESTIGATION_REPORTSDAO;
		String queryKey1="SELECT_INV_TRACKING_REPORT_PATIENTBASED_TEST_ONCRNO_HIVT_REQUISITION_DTL";
		String queryKey2="SELECT_INV_TRACKING_REPORT_PATIENTBASED_TEST_ONCRNO_ARCHIVAL_HIVT_REQUISITION_DTL";
		String query="";

		ResultSet rs=null;
		Connection conn=super.getTransactionContext().getConnection();

		Map populateMap= new HashMap();
		Sequence sq= new Sequence();
		List<InvTrackingReportVO> listInvTrackingReportVO=new ArrayList<InvTrackingReportVO>();

		try
		{
			if(vo.getDataFromArchival().equals("0"))
			query = HelperMethodsDAO.getQuery(filename,queryKey1);

			if(vo.getDataFromArchival().equals("1"))
			query = HelperMethodsDAO.getQuery(filename,queryKey2);
		}
		catch(Exception e)
		{
			throw new HisDataAccessException("HelperMethodsDAO.loadPropertiesFile(filename)OR getting query out of property file::"+e);
		}


		try
		{

			if(vo.getDataFromArchival().equals("0")) {
				populateMap.put(sq.next(), vo.getCrNo());
				populateMap.put(sq.next(), userVO.getHospitalCode());
			}
			else if(vo.getDataFromArchival().equals("1")) {
				populateMap.put(sq.next(), vo.getCrNo());
				populateMap.put(sq.next(), userVO.getHospitalCode());
				populateMap.put(sq.next(), vo.getFromDate());
				populateMap.put(sq.next(), vo.getToDate());
			}

			rs=HelperMethodsDAO.executeQuery(conn, query, populateMap);

			if(!rs.next()) { }
			else {
				rs.beforeFirst();
				while(rs.next()) {
					InvTrackingReportVO vo2 = new InvTrackingReportVO();
					HelperMethods.populateVOfrmRS(vo2, rs);

					listInvTrackingReportVO.add(vo2);
				}
			}

		}
		catch (Exception e)
		{
			 throw new HisDataAccessException("HisDataAccessException:: "+e);
		 }

		return listInvTrackingReportVO;
	}


	public List<InvTrackingReportVO> AjaxGetPatSampleReqnListOnSampleNo(InvTrackingReportVO vo, UserVO userVO) {

		String filename= InvestigationConfig.QUERY_FILE_FOR_INVESTIGATION_REPORTSDAO;
		String queryKey1="SELECT_INV_TRACKING_REPORT_SAMPLEBASED_TEST_ONSAMPLENO_HIVT_REQUISITION_DTL";
		String queryKey2="SELECT_INV_TRACKING_REPORT_SAMPLEBASED_TEST_ONSAMPLENO_ARCHIVAL_HIVT_REQUISITION_DTL";
		String query="";

		ResultSet rs=null;
		Connection conn=super.getTransactionContext().getConnection();

		Map populateMap= new HashMap();
		Sequence sq= new Sequence();
		List<InvTrackingReportVO> listInvTrackingReportVO=new ArrayList<InvTrackingReportVO>();

		try
		{
			if(vo.getDataFromArchival().equals("0"))
			query = HelperMethodsDAO.getQuery(filename,queryKey1);

			if(vo.getDataFromArchival().equals("1"))
			query = HelperMethodsDAO.getQuery(filename,queryKey2);
		}
		catch(Exception e)
		{
			throw new HisDataAccessException("HelperMethodsDAO.loadPropertiesFile(filename)OR getting query out of property file::"+e);
		}


		try
		{
			if(vo.getDataFromArchival().equals("0")) {
				populateMap.put(sq.next(), vo.getSampleNo());
				populateMap.put(sq.next(), userVO.getHospitalCode());
			}
			else if(vo.getDataFromArchival().equals("1")) {
				populateMap.put(sq.next(), vo.getSampleNo());
				populateMap.put(sq.next(), userVO.getHospitalCode());
				populateMap.put(sq.next(), vo.getFromDate());
				populateMap.put(sq.next(), vo.getToDate());
			}

			rs=HelperMethodsDAO.executeQuery(conn, query, populateMap);

			if(!rs.next()) { }
			else {
				rs.beforeFirst();
				while(rs.next()) {
					InvTrackingReportVO vo2 = new InvTrackingReportVO();
					HelperMethods.populateVOfrmRS(vo2, rs);

					listInvTrackingReportVO.add(vo2);
				}
			}

		}
		catch (Exception e)
		{
			 throw new HisDataAccessException("HisDataAccessException:: "+e);
		 }

		return listInvTrackingReportVO;
	}

	public List<InvTrackingReportVO> AjaxGetPatPatientReqnListOnLabNo(InvTrackingReportVO vo, UserVO userVO) {

		String filename= InvestigationConfig.QUERY_FILE_FOR_INVESTIGATION_REPORTSDAO;
		String queryKey1="SELECT_INV_TRACKING_REPORT_PATIENTBASED_TEST_ONLABNO_HIVT_REQUISITION_DTL";
		String queryKey2="SELECT_INV_TRACKING_REPORT_PATIENTBASED_TEST_ONLABNO_ARCHIVAL_HIVT_REQUISITION_DTL";
		String query="";

		ResultSet rs=null;
		Connection conn=super.getTransactionContext().getConnection();

		Map populateMap= new HashMap();
		Sequence sq= new Sequence();
		List<InvTrackingReportVO> listInvTrackingReportVO=new ArrayList<InvTrackingReportVO>();

		try
		{
			if(vo.getDataFromArchival().equals("0"))
			query = HelperMethodsDAO.getQuery(filename,queryKey1);

			if(vo.getDataFromArchival().equals("1"))
			query = HelperMethodsDAO.getQuery(filename,queryKey2);
		}
		catch(Exception e)
		{
			throw new HisDataAccessException("HelperMethodsDAO.loadPropertiesFile(filename)OR getting query out of property file::"+e);
		}


		try
		{
			if(vo.getDataFromArchival().equals("0")) {
				populateMap.put(sq.next(), vo.getLabNo());
				populateMap.put(sq.next(), userVO.getHospitalCode());
			}
			else if(vo.getDataFromArchival().equals("1")) {
				populateMap.put(sq.next(), vo.getLabNo());
				populateMap.put(sq.next(), userVO.getHospitalCode());
				populateMap.put(sq.next(), vo.getFromDate());
				populateMap.put(sq.next(), vo.getToDate());
			}

			rs=HelperMethodsDAO.executeQuery(conn, query, populateMap);

			if(!rs.next()) { }
			else {
				rs.beforeFirst();
				while(rs.next()) {
					InvTrackingReportVO vo2 = new InvTrackingReportVO();
					HelperMethods.populateVOfrmRS(vo2, rs);

					listInvTrackingReportVO.add(vo2);
				}
			}

		}
		catch (Exception e)
		{
			 throw new HisDataAccessException("HisDataAccessException:: "+e);
		 }

		return listInvTrackingReportVO;
	}

	public Map<String, String> GetTestTurnAroundTime(InvTrackingReportVO vo, UserVO userVO) {

		String filename= InvestigationConfig.QUERY_FILE_FOR_INVESTIGATION_REPORTSDAO;
		String queryKey="SELECT_INV_TRACKING_REPORT.TURN_AROUND_TIME.HIVT_TEST_MST";
		String query="";

		Map<String, String> mp = new HashMap<String, String>();
		ResultSet rs=null;
		Connection conn=super.getTransactionContext().getConnection();

		Map populateMap= new HashMap();
		Sequence sq= new Sequence();

		try
		{
			query = HelperMethodsDAO.getQuery(filename,queryKey);
		}
		catch(Exception e)
		{
			throw new HisDataAccessException("HelperMethodsDAO.loadPropertiesFile(filename)OR getting query out of property file::"+e);
		}

		try
		{
			//populateMap.put(sq.next(), userVO.getHospitalCode());

			rs = HelperMethodsDAO.executeQuery(conn, query, populateMap);

			if (!rs.next()) {  }
			else
			{
				rs.beforeFirst();
				while(rs.next()){

					mp.put(rs.getString(1), rs.getString(2));
				}
			}
		}
		catch(Exception e)
		{
			 throw new HisDataAccessException("HisDataAccessException:: "+e);
		 }

		return mp;
	}
}

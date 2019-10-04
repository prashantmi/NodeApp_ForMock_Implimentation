package new_investigation.reports.bo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import hisglobal.exceptions.HisApplicationExecutionException;
import hisglobal.exceptions.HisDataAccessException;
import hisglobal.exceptions.HisException;
import hisglobal.exceptions.HisRecordNotFoundException;
import hisglobal.persistence.JDBCTransactionContext;
import hisglobal.vo.UserVO;
import new_investigation.reports.dao.InvTrackingReportDAO;
import new_investigation.vo.InvTrackingReportVO;

@SuppressWarnings( "rawtypes")
public class InvTrackingReportBO implements InvTrackingReportBOI{

	public Map AjaxGetPatDetailsOnBillNo(InvTrackingReportVO vo, UserVO userVO) {

		JDBCTransactionContext tx = new JDBCTransactionContext();
		Map<String, InvTrackingReportVO> mp = new HashMap<String, InvTrackingReportVO>();
		InvTrackingReportVO vo2 = new InvTrackingReportVO();

		try {
			tx.begin();
			InvTrackingReportDAO invTrackingReportDAO = new InvTrackingReportDAO(tx);

			vo2=invTrackingReportDAO.AjaxGetPatDetailsOnBillNo(vo, userVO);

			mp.put("patDetailsOnBillNo", vo2);
		}
		catch (HisApplicationExecutionException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisApplicationExecutionException();
		}
		catch (HisDataAccessException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisDataAccessException();
		}
		catch (HisException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisException();
		}
		catch (Exception e)
		{
			System.out.println(e.getMessage());
			//tx.rollback();
			throw new HisApplicationExecutionException();
		}
		finally
		{
			tx.close();
		}
		return mp;
	}


	public Map AjaxGetPatDetailsOnCrNo(InvTrackingReportVO vo, UserVO userVO) {

		JDBCTransactionContext tx = new JDBCTransactionContext();
		Map<String, InvTrackingReportVO> mp = new HashMap<String, InvTrackingReportVO>();
		InvTrackingReportVO vo2 = new InvTrackingReportVO();

		try {
			tx.begin();
			InvTrackingReportDAO invTrackingReportDAO = new InvTrackingReportDAO(tx);
			vo2=invTrackingReportDAO.AjaxGetPatDetailsOnCrNo(vo, userVO);

			mp.put("patDetailsOnCrNo", vo2);
		}
		catch (HisRecordNotFoundException e)
		{
			//tx.rollback();
			throw new HisRecordNotFoundException(e.getMessage());
		}
		catch (HisApplicationExecutionException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisApplicationExecutionException();
		}
		catch (HisDataAccessException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisDataAccessException();
		}
		catch (HisException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisException();
		}
		catch (Exception e)
		{
			System.out.println(e.getMessage());
			//tx.rollback();
			throw new HisApplicationExecutionException();
		}
		finally
		{
			tx.close();
		}

		return mp;
	}

	public Map AjaxGetPatReqnListOnBillNo(InvTrackingReportVO vo, UserVO userVO) {

		JDBCTransactionContext tx = new JDBCTransactionContext();
		Map<String, List<InvTrackingReportVO>> mp=new HashMap<String, List<InvTrackingReportVO>>();
		List<InvTrackingReportVO> sampleBasedReqnListInvTrackingReportVO=new ArrayList<InvTrackingReportVO>();
		List<InvTrackingReportVO> patientBasedReqnListInvTrackingReportVO=new ArrayList<InvTrackingReportVO>();

		try {
			tx.begin();
			InvTrackingReportDAO invTrackingReportDAO = new InvTrackingReportDAO (tx);

			sampleBasedReqnListInvTrackingReportVO=invTrackingReportDAO.AjaxGetPatSampleReqnListOnBillNo(vo, userVO);
			patientBasedReqnListInvTrackingReportVO=invTrackingReportDAO.AjaxGetPatPatientReqnListOnBillNo(vo, userVO);

			mp.put("sampleBasedReqnListOnBillNo", sampleBasedReqnListInvTrackingReportVO);
			mp.put("patientBasedReqnListOnBillNo", patientBasedReqnListInvTrackingReportVO);

		}
		catch (HisRecordNotFoundException e)
		{
			//tx.rollback();
			throw new HisRecordNotFoundException(e.getMessage());
		}
		catch (HisApplicationExecutionException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisApplicationExecutionException();
		}
		catch (HisDataAccessException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisDataAccessException();
		}
		catch (HisException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisException();
		}
		catch (Exception e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisApplicationExecutionException();
		}
		finally
		{
			tx.close();
		}
		return mp;
	}


	public Map AjaxGetPatReqnListOnCrNo(InvTrackingReportVO vo, UserVO userVO) {

		JDBCTransactionContext tx = new JDBCTransactionContext();
		Map<String, List<InvTrackingReportVO>> mp = new HashMap<String, List<InvTrackingReportVO>>();
		List<InvTrackingReportVO> sampleBasedReqnListInvTrackingReportVO = new ArrayList<InvTrackingReportVO>();
		List<InvTrackingReportVO> patientBasedReqnListInvTrackingReportVO = new ArrayList<InvTrackingReportVO>();

		try {
			tx.begin();

			InvTrackingReportDAO invTrackingReportDAO = new InvTrackingReportDAO(tx);
			sampleBasedReqnListInvTrackingReportVO = invTrackingReportDAO.AjaxGetPatSampleReqnListOnCrNo(vo, userVO);
			patientBasedReqnListInvTrackingReportVO = invTrackingReportDAO.AjaxGetPatPatientReqnListOnCrNo(vo, userVO);

			mp.put("sampleBasedReqnListOnCrNo", sampleBasedReqnListInvTrackingReportVO);
			mp.put("patientBasedReqnListOnCrNo", patientBasedReqnListInvTrackingReportVO);
		}
		catch (HisRecordNotFoundException e)
		{
			//tx.rollback();
			throw new HisRecordNotFoundException(e.getMessage());
		}
		catch (HisApplicationExecutionException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisApplicationExecutionException();
		}
		catch (HisDataAccessException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisDataAccessException();
		}
		catch (HisException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisException();
		}
		catch (Exception e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisApplicationExecutionException();
		}
		finally
		{
			tx.close();
		}

		return mp;
	}


public Map GetTestTurnAroundTime(InvTrackingReportVO vo, UserVO userVO) {

		JDBCTransactionContext tx = new JDBCTransactionContext();
		Map<String, String> mp = new HashMap<String, String>();

		try {
			tx.begin();

			InvTrackingReportDAO invTrackingReportDAO = new InvTrackingReportDAO(tx);
			mp = invTrackingReportDAO.GetTestTurnAroundTime(vo, userVO);

		}
		catch (HisRecordNotFoundException e)
		{
			//tx.rollback();
			throw new HisRecordNotFoundException(e.getMessage());
		}
		catch (HisApplicationExecutionException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisApplicationExecutionException();
		}
		catch (HisDataAccessException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisDataAccessException();
		}
		catch (HisException e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisException();
		}
		catch (Exception e)
		{
			//tx.rollback();
			System.out.println(e.getMessage());
			throw new HisApplicationExecutionException();
		}
		finally
		{
			tx.close();
		}

		return mp;
	}


}

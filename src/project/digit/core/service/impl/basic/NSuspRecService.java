package project.digit.core.service.impl.basic;

import java.util.ArrayList;
import java.util.List;

import project.digit.core.model.basic.Manage;
import project.digit.core.model.basic.Suspect;
import project.digit.core.model.basic.Dao.IManageDAO;
import project.digit.core.model.basic.Dao.ISuspectDAO;
import project.digit.core.model.basic.DaoImpl.ManageDAO;
import project.digit.core.model.basic.DaoImpl.SuspectDAO;
import project.digit.core.service.JqGridService;
import project.digit.core.service.PagerService;
import project.digit.core.vo.QueryOptions;
import project.digit.utils.hibernate.TransactionManager;

public class NSuspRecService extends PagerService implements JqGridService {
	
	private static NSuspRecService service	=	null;
	private ISuspectDAO	suspDao	=	TransactionManager.getProxy((ISuspectDAO)new SuspectDAO());
	private IManageDAO manageDao	=	TransactionManager.getProxy((IManageDAO)new ManageDAO());
	
	public static NSuspRecService getService() {
		if(service==null) {
			service	=	new NSuspRecService();
		}
		return service;
	}

	public List<Suspect> doSearchQuery(QueryOptions opts) {
		// TODO Auto-generated method stub
		return null;
	}

	@SuppressWarnings("unchecked")
	public List<Suspect> doRegularQuery(QueryOptions opts) {
		// TODO Auto-generated method stub
		String userId	=	opts.getQueryId();
		List<Manage> list	=	manageDao.findByProperty("id.userId",userId);
		List<Suspect> susplist	=	new ArrayList<Suspect>();
		for(Manage m : list) {
			String suspId	=	m.getId().getSuspectId();
			susplist.add((Suspect)suspDao.findByProperty("suspectId", suspId).get(0));
		}
		return susplist;
	}
	
	public static void main(String[] args) {
		QueryOptions opt	=	new QueryOptions();
		opt.set_search("false");
		opt.setPage(1);
		opt.setQueryId("0136AAA418A34C52B2261EB0E9090ABC");
		opt.setRows(10);
		NSuspRecService.getService().doRegularQuery(opt);
	}
}

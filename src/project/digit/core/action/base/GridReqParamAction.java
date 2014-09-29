package project.digit.core.action.base;

import project.digit.core.service.PagerService;
import project.digit.core.vo.QueryOptions;
import com.opensymphony.xwork2.ActionSupport;

public class GridReqParamAction extends ActionSupport {

	private static final long serialVersionUID = 8887472905762009811L;
	
	protected QueryOptions opts	=	new QueryOptions();
	protected PagerService pagerServ	=	PagerService.getPagerService();
	
	protected void setGridPagerParam(QueryOptions opts) {
		pagerServ.setCurPage(opts.getPage()).setItemPerPage(opts.getRows());
	}
	
}

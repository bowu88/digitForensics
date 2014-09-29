package project.digit.core.service;

import project.digit.core.vo.PagerVo;

public class PagerService {
	
	private static PagerService pagerServ	=	null;
	
	public static PagerService getPagerService() {
		if(pagerServ==null) {
			pagerServ	=	new PagerService(); 
		}
		return pagerServ;
	}
	
	public PagerService setItemPerPage(Integer number) {
		PagerVo.itemPerPage	=	number;
		return this;
	} 
	
	public PagerService setCurPage(Integer number) {
		PagerVo.curPage	=	number;
		return this;
	} 
	
	public void setPagerParam() {
		
	}
}

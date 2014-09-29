package project.digit.core.service.impl;

import project.digit.core.enumeration.SearchOperEnum;
import project.digit.core.service.JqGridHandler;
import project.digit.core.vo.SingleSearchVo;

public class JqGridHandlerImpl implements JqGridHandler {

	private String processClz;
	
	public JqGridHandlerImpl(String processClz) {
		this.processClz	=	processClz;
	}
	
	public Integer getStartPosNumber(Integer page, Integer rows) {
		// TODO Auto-generated method stub
		return (page-1)*rows;
	}
	
	public String getWhereCriteria(SingleSearchVo sOpt) {
		// TODO Auto-generated method stub
		String oper	=	SearchOperEnum.valueOf(sOpt.getSearchOper()).toString();
		String val	=	sOpt.getSearchString();
		return "where "+this.processClz+"."+sOpt.getSearchField()
				+oper+(oper.equals("like")?"'%"+val+"%'":"'"+val+"'");
	}

	public String getOrderCriteria(String sidx, String sord) {
		// TODO Auto-generated method stub
		return "order by "+this.processClz+"."+sidx+" "+sord;
	}
	
}

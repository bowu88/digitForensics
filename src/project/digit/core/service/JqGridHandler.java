package project.digit.core.service;

import project.digit.core.vo.SingleSearchVo;

/**
 * 
 * @author hale
 * description:
 * 		这个接口以QueryOptions作为入口参数， 处理解析这些参数，得到DAO可用的中间值，返回
 * 		接下来由相应Service处理。这个接口服务于对应Service.分析需要转换做处理的数据有:
 * 		1.page+rows:计算接下来需要显示那些数据
 * 		2.sidx+sord:sidx为前台column的name，与后台POJO对应，无需转换，这个两个组合起来产生排序语句。
 * 		3._search+sOpt：搜索标志与搜索条件，解析处理
 * 	
 */
public interface JqGridHandler {
	//get start position
	public Integer getStartPosNumber(Integer page, Integer rows);
	//parse sOpt to hql where string
	public String getWhereCriteria(SingleSearchVo sOpt);
	//parse sidx+sord to hql order by string
	public String getOrderCriteria(String sidx, String sord);
}

package project.digit.core.service;

import java.util.Map;

/**
 * 
 * @author hale
 * Description: 这个接口服务用于所有数据库信息的展示，供相应的Action调用
 * 			           所有需要展示的信息对应的服务类必须实现这个接口
 * 
 */
public interface DataDisplayService {	
	/**
	 * 
	 * @param startNum 用于限制查询数据库语句
	 * @return 返回查询到的结果列表
	 *
	 */
	public Map<String, Object> getObjectList4Display(Integer startNum);
	
	/**
	 * 
	 * @param startNum 用户给构建的Json结构中的id赋值。
	 * @param dataMap 函数getObjectList4Display返回的查询结果
	 * @return 将dataMap中的list转换为JSONString返回
	 */
	public String translate2JsonStr(Integer startNum, Map<String, Object> dataMap);
}

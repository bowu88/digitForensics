package project.digit.core.service;

import java.util.List;
import project.digit.core.vo.QueryOptions;

public interface JqGridService {
	//if _search:true, call this to process query
	@SuppressWarnings("rawtypes")
	public List doSearchQuery(QueryOptions opts);
	//if _search:false, call this to process regular query
	@SuppressWarnings("rawtypes")
	public List doRegularQuery(QueryOptions opts);
}

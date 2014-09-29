package project.digit.core.vo;

public class QueryOptions {
	private Integer page	=	1;		//需要查询第几页的数据
	private Integer rows	=	10;		//每页显示的条数
	private String  sidx;				//查询排序的条件，这是一个字符串，可能是数据库表字段或者是POJO对象的属性名。这需要程序来处理。
	private String  sord	=	"desc";	//查询排序的方式，可能的值是ASC和DESC;
	private String  _search	=	"false";//指示是否是查询，值是true或者false。
	private SingleSearchVo sOpt;	    //搜索选项。
	private String  queryId;			//如suspId, browserId等,可以从前端获得或者从session获得userId作为queryId
	
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getRows() {
		return rows;
	}
	public void setRows(Integer rows) {
		this.rows = rows;
	}
	public String getSidx() {
		return sidx;
	}
	public void setSidx(String sidx) {
		this.sidx = sidx;
	}
	public String getSord() {
		return sord;
	}
	public void setSord(String sord) {
		this.sord = sord;
	}
	public String get_search() {
		return _search;
	}
	public void set_search(String _search) {
		this._search = _search;
	}
	public String getQueryId() {
		return queryId;
	}
	public void setQueryId(String queryId) {
		this.queryId = queryId;
	}
	public SingleSearchVo getsOpt() {
		return sOpt;
	}
	public void setsOpt(SingleSearchVo sOpt) {
		this.sOpt = sOpt;
	}
}

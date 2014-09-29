package project.digit.core.vo;

public class SingleSearchVo {
	private String searchField;	//查询的字段名，与后台POJO对应，无需转换
	private String searchOper;	//查询符号，如大于，等于，小于等...
	private String searchString;//查询值，与field组成键值对。
	
	//getter/setter
	public String getSearchField() {
		return searchField;
	}
	public void setSearchField(String searchField) {
		this.searchField = searchField;
	}
	public String getSearchOper() {
		return searchOper;
	}
	public void setSearchOper(String searchOper) {
		this.searchOper = searchOper;
	}
	public String getSearchString() {
		return searchString;
	}
	public void setSearchString(String searchString) {
		this.searchString = searchString;
	}
}

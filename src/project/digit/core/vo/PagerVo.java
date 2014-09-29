package project.digit.core.vo;

public class PagerVo {
	//get from QueryOptions
	public static Integer itemPerPage	=	10;
	public static Integer curPage	=	1;
	//computing from QueryOptions
	public static Integer totalPage	=	1;
	public static Integer totalNumber	=	0;
	public static Integer firstResult	=	0;
	
	public static void setPagerVo(QueryOptions opts) {
		itemPerPage	=	opts.getRows();
		curPage	=	opts.getPage();
	}
	
	public static void setTotalNumber(Integer number) {
		totalNumber	=	number;
	}
	
	public static Integer getFirstResult() {
		return itemPerPage*(curPage-1);
	}
	
	public static Integer getTotalPage() {
		return totalNumber/10+(totalNumber%10==0?0:1);
	}
}

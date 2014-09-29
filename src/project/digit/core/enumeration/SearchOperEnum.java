package project.digit.core.enumeration;

public enum SearchOperEnum {
	等于("="), 不等于("!="), 包含("like");
	
	private final String text;
	
	private SearchOperEnum(String text) {
		this.text	=	text;
	}
	
	public String toString() {
		return this.text;
	}
	
	public static void main(String[] args) {
		//output :　"="
		System.out.println(SearchOperEnum.valueOf("等于"));
	}
}

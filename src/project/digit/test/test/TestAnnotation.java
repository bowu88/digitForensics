package project.digit.test.test;

@MyAnnotation
public class TestAnnotation {
	@MyAnnotation(name="hale")
	public String username;
	
	@MyAnnotation(name="method")
	public void method() {
		
	}
}

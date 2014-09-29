package project.digit.test.test;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class TestClassLoader {
	private String color;
	protected void drive() {
		System.out.println("drive private car the color is "+color);
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException, SecurityException, NoSuchFieldException, NoSuchMethodException, IllegalArgumentException, InvocationTargetException {
		ClassLoader loader	=	Thread.currentThread().getContextClassLoader();
		Class clazz	=	loader.loadClass("project.digit.test.test.TestClassLoader");
		TestClassLoader tcl	=	(TestClassLoader)clazz.newInstance();
		
		Field fi	=	clazz.getDeclaredField("color");
		fi.setAccessible(true);
		fi.set(tcl, "red");
		
		Method method	=	clazz.getDeclaredMethod("drive", (Class[])null);
		method.setAccessible(true);
		method.invoke(tcl, (Object[])null);
	}
}

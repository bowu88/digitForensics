package project.digit.test.test;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class MyAnnotationClient {
	@SuppressWarnings("unchecked")
	public static void main(String[] args) {
		try {
			// @java.lang.SuppressWarnings(value = { "" })
			@SuppressWarnings("rawtypes")
			Class clazz = Class
					.forName("project.digit.test.test.TestAnnotation");
			MyAnnotation an	=	(MyAnnotation) clazz.getAnnotation(MyAnnotation.class);
			if(an !=null) {
				System.out.println(an.name());
			}
			
			
			Field[] fs = clazz.getFields();
			for (Field f : fs) {
				MyAnnotation ma = f.getAnnotation(MyAnnotation.class);
				if (ma != null) {
					System.out.println(ma.name());
				}
			}

			Method ms = clazz.getDeclaredMethod("method", (Class[])null);
			MyAnnotation ma = ms.getAnnotation(MyAnnotation.class);
			if (ma != null) {
				System.out.println(ma.name());
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}

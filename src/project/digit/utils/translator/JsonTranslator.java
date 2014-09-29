package project.digit.utils.translator;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import project.digit.core.model.basic.Suspect;
import project.digit.util.annotation.MyJson;

public class JsonTranslator {
	
	@SuppressWarnings({ "rawtypes" })
	public static JSONArray trans2JsonArray(List datalist, Class clz) {
		JSONArray array	=	new JSONArray();
		for(Object obj : datalist) {
			array.add(trans2JsonObject(obj, clz));
		}
		return array;
	} 
	
	@SuppressWarnings("rawtypes")
	private static JSONObject trans2JsonObject(Object obj, Class clz) {
		JSONObject jsonObj	=	new JSONObject();
		
		String transId;
		String fieldName;
		String val;
		
		for(Field field : clz.getFields()) {
			MyJson myJson	=	field.getAnnotation(MyJson.class);
			if(myJson!=null) {
				transId	=	myJson.id();
				fieldName	=	field.getName();
				val	=	invokeBeanGetterMethod(clz, getBeanMethodName(fieldName), obj);
				if(transId!=null) {
					
				}
				jsonObj.put(field.getName(), val);
			}
		}
		return jsonObj;
	}
	
	private static String getBeanMethodName(String fieldName) {
		return "get"+Character.toUpperCase(fieldName.charAt(0))+fieldName.substring(1);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static String invokeBeanGetterMethod(Class clz, String methodName, Object obj) {
		Method method;
		String val	=	"";
		try {
			method = clz.getMethod(methodName, (Class[])null);
			val	=	method.invoke(obj, (Object[])null).toString();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return val;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void main(String[] args) throws ClassNotFoundException {
		List list	=	new ArrayList();	
		for(Integer i=0; i<10; i++) {
			Suspect suspect	=	new Suspect();
			suspect.setIdno(i.toString());
			suspect.setNotes(i.toString());
			suspect.setSuspectId(i.toString());
			suspect.setSuspectname(i.toString());
			list.add(suspect);
		}
//		Class clz	=	Class.forName("project.digit.core.model.basic.Suspect");
		//JsonTranslator.trans2Json(list, new Suspect().getClass());
	}
}

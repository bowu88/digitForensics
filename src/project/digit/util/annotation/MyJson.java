package project.digit.util.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 
 * @author hale
 *	this annotation is used 4 assembling jsonObj and 
 *	also used 4 marking Chinese Charactor need 2 be encoded/decoded  
 *  id: need to be transfered to user-friendly data, like suspId 2 suspName etc...
 *  encode: mark this attri need to be encoded or decoded be4 the next process.
 *  
 */

@Target({ ElementType.TYPE, ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface MyJson {
	public String id() default "none";
	public boolean isEncode() default false;
}

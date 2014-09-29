package project.digit.utils.hibernate;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TransactionManager extends HibernateDAOSupport implements InvocationHandler {
	private static final Logger log = LoggerFactory.getLogger(TransactionManager.class);
	private Object target;
	
	public TransactionManager(Object target) {
		this.target	=	target;
	}
	
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
		// TODO Auto-generated method stub
		Transaction tx	=	null;
		Object obj	=	null;
		try {
			tx	=	getSession().beginTransaction();
			obj	=	method.invoke(target, args);
			tx.commit();
		} catch(RuntimeException e) {
			if(tx!=null) {
				try {
					tx.rollback();
				} catch(RuntimeException ex) {
					log.error("无法撤消事务", ex);
				}
			}
		}
		return obj;
	}
	
	@SuppressWarnings("unchecked")
	public static <T> T getProxy(T target) {
		TransactionManager handler	=	new TransactionManager(target);
		return (T)Proxy.newProxyInstance(target.getClass().getClassLoader(), target.getClass().getInterfaces(), handler);
	}
 
}

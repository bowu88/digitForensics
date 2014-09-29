package project.digit.utils.hibernate;

import org.hibernate.Session;


/**
 * Data access object (DAO) for domain model
 * @author MyEclipse Persistence Tools
 */
public class HibernateDAOSupport implements IHibernateDAOSupport {
	
	public Session getSession() {
		return HibernateSessionFactory.getSessionFactory().getCurrentSession();
	}
	
}
package project.digit.utils.hibernate;

import org.hibernate.Session;


/**
 * Data access interface for domain model
 * @author MyEclipse Persistence Tools
 */
public interface IHibernateDAOSupport {
	public Session getSession();
}
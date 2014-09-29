package project.digit.core.model.basic.DaoImpl;
// default package

import java.util.List;

import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import project.digit.core.model.basic.Manage;
import project.digit.core.model.basic.ManageId;
import project.digit.core.model.basic.Dao.IManageDAO;
import project.digit.core.vo.PagerVo;
import project.digit.utils.hibernate.HibernateDAOSupport;

/**
 * A data access object (DAO) providing persistence and search support for
 * Manage entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see .Manage
 * @author MyEclipse Persistence Tools
 */

public class ManageDAO extends HibernateDAOSupport implements IManageDAO {
	private static final Logger log = LoggerFactory.getLogger(ManageDAO.class);
	// property constants

	public void save(Manage transientInstance) {
		log.debug("saving Manage instance");
		try {
			getSession().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(Manage persistentInstance) {
		log.debug("deleting Manage instance");
		try {
			getSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public Manage findById(ManageId id) {
		log.debug("getting Manage instance with id: " + id);
		try {
			Manage instance = (Manage) getSession().get("Manage", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	@SuppressWarnings("rawtypes")
	public List findByExample(Manage instance) {
		log.debug("finding Manage instance by example");
		try {
			List results = getSession().createCriteria("Manage")
					.add(Example.create(instance)).list();
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	@SuppressWarnings("rawtypes")
	public List findByProperty(String propertyName, Object value) {
		log.debug("finding Manage instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from Manage as model where model."
					+ propertyName + "= ?";
			Query queryObject = getSession().createQuery(queryString);
			queryObject.setParameter(0, value);
			queryObject.setFirstResult(PagerVo.getFirstResult()).setMaxResults(PagerVo.itemPerPage);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	@SuppressWarnings("rawtypes")
	public List findAll() {
		log.debug("finding all Manage instances");
		try {
			String queryString = "from Manage";
			Query queryObject = getSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public Manage merge(Manage detachedInstance) {
		log.debug("merging Manage instance");
		try {
			Manage result = (Manage) getSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(Manage instance) {
		log.debug("attaching dirty Manage instance");
		try {
			getSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(Manage instance) {
		log.debug("attaching clean Manage instance");
		try {
			getSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}
}
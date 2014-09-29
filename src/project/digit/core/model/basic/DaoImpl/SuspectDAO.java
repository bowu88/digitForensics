package project.digit.core.model.basic.DaoImpl;
// default package

import java.util.List;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import project.digit.core.model.basic.Suspect;
import project.digit.core.model.basic.Dao.ISuspectDAO;
import project.digit.core.vo.PagerVo;
import project.digit.utils.hibernate.HibernateDAOSupport;

/**
 * A data access object (DAO) providing persistence and search support for
 * Suspect entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see .Suspect
 * @author MyEclipse Persistence Tools
 */

public class SuspectDAO extends HibernateDAOSupport implements ISuspectDAO {
	private static final Logger log = LoggerFactory.getLogger(SuspectDAO.class);
	// property constants
	public static final String SUSPECTNAME = "suspectname";
	public static final String IDNO = "idno";
	public static final String NOTES = "notes";

	public void save(Suspect transientInstance) {
		log.debug("saving Suspect instance");
		try {
			getSession().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(Suspect persistentInstance) {
		log.debug("deleting Suspect instance");
		try {
			getSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public Suspect findById(java.lang.String id) {
		log.debug("getting Suspect instance with id: " + id);
		try {
			Suspect instance = (Suspect) getSession().get("Suspect", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	@SuppressWarnings("rawtypes")
	public List findByExample(Suspect instance) {
		log.debug("finding Suspect instance by example");
		try {
			List results = getSession().createCriteria("Suspect")
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
		log.debug("finding Suspect instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from Suspect as model where model."
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
	public List findBySuspectname(Object suspectname) {
		return findByProperty(SUSPECTNAME, suspectname);
	}

	@SuppressWarnings("rawtypes")
	public List findByIdno(Object idno) {
		return findByProperty(IDNO, idno);
	}

	@SuppressWarnings("rawtypes")
	public List findByNotes(Object notes) {
		return findByProperty(NOTES, notes);
	}

	@SuppressWarnings("rawtypes")
	public List findAll() {
		log.debug("finding all Suspect instances");
		try {
			String queryString = "from Suspect";
			Query queryObject = getSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public Suspect merge(Suspect detachedInstance) {
		log.debug("merging Suspect instance");
		try {
			Suspect result = (Suspect) getSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(Suspect instance) {
		log.debug("attaching dirty Suspect instance");
		try {
			getSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(Suspect instance) {
		log.debug("attaching clean Suspect instance");
		try {
			getSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}
}
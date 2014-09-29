package project.digit.core.model.basic.Dao;

import java.util.List;

import project.digit.core.model.basic.User;

public interface IUserDAO {
	
	public void save(User transientInstance);
	
	public void delete(User persistentInstance);
	
	public User findById(java.lang.String id);
	
	@SuppressWarnings("rawtypes")
	public List findByExample(User instance);
	
	@SuppressWarnings("rawtypes")
	public List findByProperty(String propertyName, Object value);
	
	@SuppressWarnings("rawtypes")
	public List findByUsername(Object username);
	
	@SuppressWarnings("rawtypes")
	public List findByPassword(Object password);
	
	@SuppressWarnings("rawtypes")
	public List findAll();
	
	public User merge(User detachedInstance);
	
	public void attachDirty(User instance);
	
	public void attachClean(User instance);
}

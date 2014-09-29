package project.digit.core.model.basic.Dao;

import java.util.List;

import project.digit.core.model.basic.Suspect;

public interface ISuspectDAO {
	
	public void save(Suspect transientInstance);
	
	public void delete(Suspect persistentInstance);
	
	public Suspect findById(java.lang.String id);
	
	@SuppressWarnings("rawtypes")
	public List findByExample(Suspect instance);
	
	@SuppressWarnings("rawtypes")
	public List findByProperty(String propertyName, Object value);
	
	@SuppressWarnings("rawtypes")
	public List findBySuspectname(Object Suspectname);
	
	@SuppressWarnings("rawtypes")
	public List findByIdno(Object idno);
	
	@SuppressWarnings("rawtypes")
	public List findByNotes(Object notes);
	
	@SuppressWarnings("rawtypes")
	public List findAll();
	
	public Suspect merge(Suspect detachedInstance);
	
	public void attachDirty(Suspect instance);
	
	public void attachClean(Suspect instance);
}

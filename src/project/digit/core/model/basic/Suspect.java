package project.digit.core.model.basic;

import project.digit.util.annotation.MyJson;
// default package

/**
 * Suspect entity. @author MyEclipse Persistence Tools
 */

public class Suspect implements java.io.Serializable {

	private static final long serialVersionUID = 7621303500857103507L;

	@MyJson
	public String suspectId;
	@MyJson
	public String suspectname;
	@MyJson
	public String idno;
	@MyJson
	public String notes;

	// Constructors

	/** default constructor */
	public Suspect() {
	}

	/** minimal constructor */
	public Suspect(String suspectname, String idno) {
		this.suspectname = suspectname;
		this.idno = idno;
	}

	/** full constructor */
	public Suspect(String suspectname, String idno, String notes) {
		this.suspectname = suspectname;
		this.idno = idno;
		this.notes = notes;
	}

	// Property accessors

	public String getSuspectId() {
		return this.suspectId;
	}

	public void setSuspectId(String suspectId) {
		this.suspectId = suspectId;
	}

	public String getSuspectname() {
		return this.suspectname;
	}

	public void setSuspectname(String suspectname) {
		this.suspectname = suspectname;
	}

	public String getIdno() {
		return this.idno;
	}

	public void setIdno(String idno) {
		this.idno = idno;
	}

	public String getNotes() {
		return this.notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

}
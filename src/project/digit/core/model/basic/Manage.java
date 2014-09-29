package project.digit.core.model.basic;
// default package

/**
 * Manage entity. @author MyEclipse Persistence Tools
 */

public class Manage implements java.io.Serializable {

	private static final long serialVersionUID = -2302954257627190618L;
	private ManageId id;

	// Constructors

	/** default constructor */
	public Manage() {
	}

	/** full constructor */
	public Manage(ManageId id) {
		this.id = id;
	}

	// Property accessors

	public ManageId getId() {
		return this.id;
	}

	public void setId(ManageId id) {
		this.id = id;
	}

}
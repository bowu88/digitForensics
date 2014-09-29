package project.digit.core.model.basic;
// default package

/**
 * ManageId entity. @author MyEclipse Persistence Tools
 */

public class ManageId implements java.io.Serializable {

	private static final long serialVersionUID = 8326631796704568364L;
	private String userId;
	private String suspectId;

	// Constructors

	/** default constructor */
	public ManageId() {
	}

	/** full constructor */
	public ManageId(String userId, String suspectId) {
		this.userId = userId;
		this.suspectId = suspectId;
	}

	// Property accessors

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getSuspectId() {
		return this.suspectId;
	}

	public void setSuspectId(String suspectId) {
		this.suspectId = suspectId;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof ManageId))
			return false;
		ManageId castOther = (ManageId) other;

		return ((this.getUserId() == castOther.getUserId()) || (this
				.getUserId() != null && castOther.getUserId() != null && this
				.getUserId().equals(castOther.getUserId())))
				&& ((this.getSuspectId() == castOther.getSuspectId()) || (this
						.getSuspectId() != null
						&& castOther.getSuspectId() != null && this
						.getSuspectId().equals(castOther.getSuspectId())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getUserId() == null ? 0 : this.getUserId().hashCode());
		result = 37 * result
				+ (getSuspectId() == null ? 0 : this.getSuspectId().hashCode());
		return result;
	}

}
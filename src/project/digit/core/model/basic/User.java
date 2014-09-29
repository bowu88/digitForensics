package project.digit.core.model.basic;

// default package


/**
 * User entity. @author MyEclipse Persistence Tools
 */

@SuppressWarnings("serial")
public class User implements java.io.Serializable {
	// Fields

	private String userId;
	private String username;
	private String password;
	private Integer authority;
	private String createdTime;

	// Constructors

	/** default constructor */
	public User() {
	}

	/** minimal constructor */
	public User(String username, String password, Integer authority) {
		this.username = username;
		this.password = password;
		this.authority = authority;
	}

	/** full constructor */
	public User(String username, String password, Integer authority,
			String createdTime) {
		this.username = username;
		this.password = password;
		this.authority = authority;
		this.createdTime = createdTime;
	}

	// Property accessors

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getAuthority() {
		return this.authority;
	}

	public void setAuthority(Integer authority) {
		this.authority = authority;
	}

	public String getCreatedTime() {
		return this.createdTime;
	}

	public void setCreatedTime(String createdTime) {
		this.createdTime = createdTime;
	}

}
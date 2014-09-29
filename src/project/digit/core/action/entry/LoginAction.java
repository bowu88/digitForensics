package project.digit.core.action.entry;

import project.digit.core.model.basic.User;
import project.digit.security.service.impl.AuthenticationServiceImpl;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

public class LoginAction extends ActionSupport implements ModelDriven<User> {
	private static final long serialVersionUID = -7686743294199399201L;
	private User user	=	new User();
	private AuthenticationServiceImpl service	=	AuthenticationServiceImpl.getService();
	
	private void setSessionContext(int flag) {
		if(flag!=0) {
			ActionContext ctx	=	ActionContext.getContext();
			ctx.getSession().put("userId", service.getCorrespUserId(user.getUsername()));
		}
	}
	
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		int flag	=	service.loginAndPriviledgeValidation(getModel());
		setSessionContext(flag);
		return flag==0?"error":(flag==1?"user":"admin");
	}

	public User getModel() {
		// TODO Auto-generated method stub
		return user;
	}
}

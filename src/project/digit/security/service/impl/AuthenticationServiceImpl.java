package project.digit.security.service.impl;

import java.util.List;

import project.digit.core.model.basic.User;
import project.digit.core.model.basic.Dao.IUserDAO;
import project.digit.core.model.basic.DaoImpl.UserDAO;
import project.digit.security.service.AuthenticationService;
import project.digit.utils.hibernate.TransactionManager;

public class AuthenticationServiceImpl implements AuthenticationService {
	
	private static AuthenticationServiceImpl service	=	null;
	
	public static AuthenticationServiceImpl getService() {
		if(service==null) {
			service	=	new AuthenticationServiceImpl();
		}
		return service;
	}
	
	private IUserDAO dao	=	TransactionManager.getProxy((IUserDAO)new UserDAO());
	
	public int loginAndPriviledgeValidation(User user) {
		// TODO Auto-generated method stub
		User curUser	=	user;
		User poUser	=	this.isUserExist(curUser);
		if(poUser != null) {
			return this.isPasswdCorrect(curUser, poUser)?(poUser.getAuthority()==100?1:2):0;
		} else {
			return 0;
		}
	}
	
	public int securityAuthenBe4LoginIn() {
		return 0;
	}
	
	/*
	 * 查询结果，如果查得到，则证明存在,如果存在，将查出的对象返回，否则不存在
	 */
	@SuppressWarnings("unchecked")
	public User isUserExist(User user) {
		List<User> list	=	dao.findByProperty("username", user.getUsername());
		int exist	=	list.size();
		return exist==0?null:list.get(0);
	}
	
	/*
	 * 验证用户密码是否正确，如果正确，返回true,否则false;
	 */
	public boolean isPasswdCorrect(User loginUser, User poUser) {
		return loginUser.getPassword().equalsIgnoreCase(poUser.getPassword())?true:false;
	}

	public String getCorrespUserId(String username) {
		// TODO Auto-generated method stub
		User user	=	(User)dao.findByUsername(username).get(0);
		return user.getUserId();
	}
}

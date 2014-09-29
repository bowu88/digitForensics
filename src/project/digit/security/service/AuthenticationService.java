package project.digit.security.service;

import project.digit.core.model.basic.User;

public interface AuthenticationService {
	
	/*
	 * 验证用户名密码
	 * 返回值： 
	 * 		   0:验证失败
	 * 		   1:验证成功，权限：普通用户
	 * 		   2:验证成功， 权限：管理员
	 */
	public int loginAndPriviledgeValidation(User user);
	
	/*
	 * 除登录页面外的其余页面转入前，必须通过读session查看是否已登录，
	 * 如果未登陆，转入登录页面。
	 * 返回值：
	 * 		   0:未登录
	 *         1:已登录， 权限：普通用户
	 *         2:已登录， 权限：管理员
	 */
	public int securityAuthenBe4LoginIn();
	
	public String getCorrespUserId(String username);
}

package cn.xmy.goods.admin.admin.service;

import java.sql.SQLException;

import cn.xmy.goods.admin.admin.dao.AdminDao;
import cn.xmy.goods.admin.admin.domain.Admin;

public class AdminService {
	private AdminDao adminDao = new AdminDao();
	
	/**
	 * author：zhangguopeng
	 * 用于登录判断, 返回值应该为布尔值（异常就当是false了（^_^））
	 * 登录功能
	 * @param admin
	 * @return
	 */
	public Admin login(Admin admin) {
		try {
			return adminDao.find(admin.getAdminname(), admin.getAdminpwd());
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
}

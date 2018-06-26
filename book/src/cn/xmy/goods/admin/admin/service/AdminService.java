package cn.xmy.goods.admin.admin.service;

import java.sql.SQLException;

import cn.xmy.goods.admin.admin.dao.AdminDao;
import cn.xmy.goods.admin.admin.domain.Admin;

public class AdminService {
	private AdminDao adminDao = new AdminDao();
	
	/**
	 * author��zhangguopeng
	 * ���ڵ�¼�ж�, ����ֵӦ��Ϊ����ֵ���쳣�͵���false�ˣ�^_^����
	 * ��¼����
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

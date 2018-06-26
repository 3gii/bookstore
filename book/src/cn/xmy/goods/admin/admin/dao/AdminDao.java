package cn.xmy.goods.admin.admin.dao;

import java.sql.SQLException;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;

import cn.xmy.goods.admin.admin.domain.Admin;
import cn.itcast.jdbc.TxQueryRunner;
/*
 * author:zhangguopeng
 */
public class AdminDao {
	private QueryRunner qr = new TxQueryRunner();
	
	/**
	 * author:zhangguopeng
	 * ͨ������Ա��¼���͵�¼�����ѯ
	 * @param adminname
	 * @param adminpwd
	 * @return
	 * @throws SQLException
	 */
	public Admin find(String adminname, String adminpwd) throws SQLException {
		String sql = "select * from t_admin where adminname=? and adminpwd=?";
		//�˴��ο�user ��������BeanHandler��
		return qr.query(sql, new BeanHandler<Admin>(Admin.class), adminname, adminpwd);
	}
}

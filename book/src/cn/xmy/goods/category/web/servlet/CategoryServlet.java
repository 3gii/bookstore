package cn.xmy.goods.category.web.servlet;

/*
 * author��zhangguopeng
 * 
 * edittime: 2017.11.17
 */

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.xmy.goods.category.domain.Category;
import cn.xmy.goods.category.service.CategoryService;
import cn.itcast.servlet.BaseServlet;

/**
 * ����ģ��WEB��
 * @author qdmmy6
 *
 */
public class CategoryServlet extends BaseServlet {
	private CategoryService categoryService = new CategoryService();	
	
	/**
	 * ��ѯ���з���
	 * @throws SQLException 
	 */
	public String findAll(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException, SQLException {
		/*
		 * 1. ͨ��service�õ����еķ���
		 * 2. ���浽request�У�ת����left.jsp
		 */
		List<Category> parents = categoryService.findAll();
		req.setAttribute("parents", parents);
		return "f:/jsps/left.jsp";
	}
 }

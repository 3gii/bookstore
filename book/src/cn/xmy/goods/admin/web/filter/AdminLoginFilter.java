package cn.xmy.goods.admin.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
/*
 * author：zhangguopeng
 * 这个就来检测整个操作中是否已经登录(^_^)
 * edittime: 2017.11.17
 */

public class AdminLoginFilter implements Filter {
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		Object admin = req.getSession().getAttribute("admin");
		if(admin == null) {
			request.setAttribute("msg", "您还没有登录哦，请重新登录！");
			request.getRequestDispatcher("/adminjsps/login.jsp").forward(request, response);
		} else {
			chain.doFilter(request, response);
		}
	}  

	public void init(FilterConfig fConfig) throws ServletException {
	}

	public void destroy() {
	}
}

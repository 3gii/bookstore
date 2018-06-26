<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>top</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<meta http-equiv="content-type" content="text/html;charset=utf-8">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style type="text/css">
	.title {
		background: #15B69A;
		margin: 0px;
		color: #ffffff;
		text-align: center;
		margin-top: 18px;
		font-size: 28px;
		font-weight: bold;
	}
	.nav{
		font-size: 20px;
		margin: 10px 0 0 0;
		
	}
	a {
	
		display: block;
		float: left;
		text-transform:none;
		text-decoration:none;
		color: #ffffff;
		font-weight: 900;
		padding-left:25.609px;
		height:40px;
		width: 207px;
		text-align: center;
		line-height: 40px;
		background-color: #056455;
	} 
	a:hover {
		background-color: #056444;
		color:#fffffa;
	}
</style>
  </head>
  
  <body>
<div class="title">网上书城系统</div>
<div class="nav">
<%-- 根据用户是否登录，显示不同的链接 --%>
<c:choose>
	<c:when test="${empty sessionScope.sessionUser }">
		  <a href="<c:url value='/jsps/user/login.jsp'/>" target="_parent">会员登录</a> |&nbsp; 
		  <a href="<c:url value='/jsps/user/regist.jsp'/>" target="_parent">注册会员</a>	
	</c:when>
	<c:otherwise>
		    <a>  ${sessionScope.sessionUser.loginname }</a>
		  <a href="<c:url value='/CartItemServlet?method=myCart'/>" target="body">我的购物车</a>
		  <a href="<c:url value='/OrderServlet?method=myOrders'/>" target="body">我的订单</a>
		  <a href="<c:url value='/jsps/user/pwd.jsp'/>" target="body">修改密码</a>
		  <a href="<c:url value='/UserServlet?method=quit'/>" target="_parent">退出</a>
		  
	</c:otherwise>
</c:choose>

</div>
  </body>
</html>

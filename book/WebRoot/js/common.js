function _change() {
	$("#vCode").attr("src", "/testshop/VerifyCodeServlet?" + new Date().getTime());
}
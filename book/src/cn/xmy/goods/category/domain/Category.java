package cn.xmy.goods.category.domain;


import java.util.List;
/*
 * author��zhangguopeng
 * 
 * edittime: 2017.11.17
 */

/**
 * ����ģ���ʵ����
 * 
 * @author qdmmy6
 * 
 */
public class Category {
	private String cid;// ����
	private String cname;// ��������
	private Category parent;// ������
	private String desc;// ��������
	private List<Category> children;// �ӷ���

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getCname() {
		return cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}

	public Category getParent() {
		return parent;
	}

	public void setParent(Category parent) {
		this.parent = parent;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public List<Category> getChildren() {
		return children;
	}

	public void setChildren(List<Category> children) {
		this.children = children;
	}
}
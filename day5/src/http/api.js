import { method } from 'lodash'
import request from './request'

// 登录
export function LoginApi(data) {
	return request({
		url: '/login',
		method: 'POST',
		data
	})
}

// 左侧菜单导航
export function leftMenu() {
	return request({
		url: 'menus',
		method: "GET"
	})
}

// 首页用户列表
export function usersList(params) {
	return request({
		url: 'users',
		method: "GET",
		params
	})
}

// 添加用户
export function addUser(data) {
	return request({
		url: "users",
		method: "POST",
		data
	})
}

// 删除
export function getUserdelet(id) { //单个删除
	return request({
		url: '/users/' + id,
		method: 'DELETE',
	})
}

// 编辑
export function getEdit(data) { //编辑
	return request({
		url: '/users/' + data.id,
		method: 'PUT',
		data
	})
}

// 角色列表
export function jueseList() {
	return request({
		url: '/roles',
		method: "GET"
	})
}

// 添加角色
export function addRole(data) {
	return request({
		url: "roles",
		method: "POST",
		data
	})
}

// 角色删除
export function deleRole(id) {
	return request({
		url: "roles/" + id,
		method: "DELETE"
	})
}


// 编辑角色
export function editRoeles(data) {
	return request({
		url: 'roles/' + data.id,
		method: "PUT",
		data
	})
}

// 	权限列表
export function quanxainList(type = 'list') {
	return request({
		url: `rights/${type}`,
		method: "GET"
	})
}


// 商品管理 商品分类
export function shopList(params) {
	return request({
		url: "goods",
		method: "GET",
		params
	})
}


// 商品删除
export function deleShop(id) {
	return request({
		url: "goods/" + id,
		method: "DELETE"
	})
}


// 商品编辑
export function editGoods(id) {
	return request({
		url: "goods/" + id,
		method: "PUT"
	})
}


// 获取商品动态或者静态参数列表接口
export function getMoveQuietList(id, sel = 'many') {
	return request({
		url: '/categories/' + id + '/attributes',
		method: 'GET',
		params: {
			sel
		}
	})
}


export function getrid() {
	return request({
		url: '/roles',
		method: 'GET'
	})
}

export function jsqd(id, rid) {
	return request({
		url: `users/${id}/role`,
		method: 'PUT',
		data: {
			rid
		}
	})
}
export function getsqjs(roleId, rids) {
	return request({
		url: `roles/${roleId}/rights`,
		method: 'POST',
		data: {
			rids
		}
	})
}

export function getspfl(type = 3) {
	return request({
		url: 'categories',
		method: 'GET',
		params: {
			type
		}
	})
}


export function addGoodsApi(data) {
	return request({
		url: 'categories',
		method: 'POST',
		data
	})
}


export function getflList(params) {
	return request({
		url: 'categories',
		method: 'GET',
		params
	})
}
import request from './request'
export function LoginApi(data) {
    return request({
        url: '/login',
        method: 'POST',
        data
    })
}
export function getMenusApi() { //左侧菜单栏
    return request({
        url: '/menus',
        method: 'GET'
    })
}

export function getUserListApi(params) { //总数据
    return request({
        url: '/users',
        method: 'GET',
        params
    })
}

export function getUserdelet(id) { //单个删除
    return request({
        url: '/users/' + id,
        method: 'DELETE',
    })
}

export function getUseradd(data) { //添加
    return request({
        url: '/users',
        method: 'POST',
        data
    })
}

export function getbg(data) { //编辑
    return request({
        url: '/users/' + data.id,
        method: 'PUT',
        data
    })
}
// 改变用户的状态
export function getstate(data) {
    return request({
        url: '/users/' + data.uid + '/state/' + data.type,
        method: 'PUT',
        data
    })
}

export function getrid() {
    return request({
        url: '/roles',
        method: 'GET'
    })
}


// 分配角色
export function jsqd(id, rid) {
    return request({
        url: `users/${id}/role`,
        method: 'PUT',
        data: {
            rid
        }
    })
}

// 角色列表
export function getRoles() {
    return request({
        url: '/roles',
        method: "GET"
    })
}

// 添加角色
export function Addroles(data) {
    return request({
        url: "/roles",
        method: "POST",
        data
    })
}

// 删除角色列表
export function deleRoles(id) {
    return request({
        url: 'roles/' + id,
        method: "DELETE"
    })
}

// 修改角色列表
export function exitRole(data) {
    return request({
        url: "/roles/" + data.id,
        method: "PUT",
        data
    })
}

// 分配权限列表
export function getRights(type = 'list') {
    return request({
        url: `/rights/${type}`,
        method: "GET"
    })
}

// 角色授权接口
export function setReightRole(roleId, rids) {
    return request({
        url: `roles/${roleId}/rights`,
        method: "POST",
        data: { rids }
    })
}

// 删除权限的id
export function deleRole(roleId, rightId) {
    return request({
        url: `roles/${roleId}/rights/${rightId}`,
        method: "DELETE"
    })
}

// 商品列表数据
export function getGoods(params) {
    return request({
        url: '/goods',
        params
    })
}
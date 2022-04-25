import request from './request'
// 登录的接口
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

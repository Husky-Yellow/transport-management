import request from "@/utils/request";

/** 登陆
 * @param {String} data.phonenum 手机号
 * @param {String} data.password 密码
 */
 export const cangKuUserLogin = data => request({
    url: '/api/login/cangKuUserLogin',
    method: "POST",
    data
})

/** 登陆
 * @param {String} data.phonenum 手机号
 * @param {String} data.password 密码
 */
 export const login = data => request({
    url: '/api/login/gongYingShangUserLogin',
    method: "POST",
    data
})

/** 供应商展示人员信息
 * @param {Number} data.type 1:货车驾驶员;2:返修
 * @param {String} data.page 分页
 * @param {String} data.num 分页
 * @link https://www.showdoc.com.cn/1905271757088925/8705220544635051
 */
 export const gysUserStaffShow = data => request({
    url: "/api/gys/userStaff/show",
    method: "POST",
    data
})

/** 供应商端展示人员添加和修改
 * @param {String} data.type 1:货车驾驶员;2:返修
 * @param {String} data.id id存在修改接口,不存在添加接口
 * @param {String} data.tel 电话号
 * @param {String} data.name 姓名
 * @param {String} data.license_plate 车牌照 当添加驾驶员才传
 * @link https://www.showdoc.com.cn/1905271757088925/8705231215525608
 */
export const userStaffEditPost = data => request({
    url: '/api/gys/userStaff/editPost',
    method: "POST",
    data
})

/** 供应商撤单
 * @param {String} data.id 订单id
 * @link https://www.showdoc.com.cn/1905271757088925/8705277575299433
 */
export const ordeUuserCancel = data => request({
    url: '/api/gys/order/userCancel',
    method: "POST",
    data
})

/** 供应商生成单
 * @param {String} data.type 1预约2取货3维修
 * @param {String} data.date 2022-04-13
 * @param {String} data.time 09:00-10:00 (间隔一个小时,整点)
 * @param {String} data.num 数量
 * @param {String} data.personnel 人员列表在上面接口,多个传id=1,2,3,4,单个传id=1
 * @link https://www.showdoc.com.cn/1905271757088925/8705306629161523
 */
export const orderOrderAdd = data => request({
    url: '/api/gys/order/orderAdd',
    method: "POST",
    data
})

/** 供应商预约时间展示,仓库也是
 * @link https://www.showdoc.com.cn/1905271757088925/8942306832145789
 */
export const orderShow = data => request({
    url: '/api/order/show',
    method: "POST",
    data
})

/** 仓库修改预约时间
 * @param {String} data.id 当前数据id信息
 * @param {String} data.time_str 参考格式11:00-12:00,13:00-14:00,14:00:15:00
 * @link https://www.showdoc.com.cn/1905271757088925/8942309070319069
 */
export const warehouseOrderEditTime = data => request({
    url: '/api/warehouse/order/editTime',
    method: "POST",
    data
})

/** 仓库端展示时间和统计
 * @link https://www.showdoc.com.cn/1905271757088925/8942313075240911
 */
export const warehouseOrderCount = data => request({
    url: '/api/warehouse/order/count',
    method: "POST",
    data
})

/** 管理端操作
 * @param {String} data.type 2仓库审核通过3仓库审核拒绝4仓库接受成功5仓库拒绝接受6撤销(包括自己撤销,和仓库端改预约时间强制的撤销,让供应商线下和仓库联系)
 * @param {String} data.id 订单id
 * @link https://www.showdoc.com.cn/1905271757088925/8942313553915558
 */
export const orderWarehouse = data => request({
    url: '/api/order/warehouse',
    method: "POST",
    data
})

/** 仓库端操作
 * @param {String} data.type 2仓库审核通过3仓库审核拒绝4仓库接受成功5仓库拒绝接受6撤销(包括自己撤销,和仓库端改预约时间强制的撤销,让供应商线下和仓库联系)
 * @param {String} data.id 订单id
 * @link https://www.showdoc.com.cn/1905271757088925/8942313553915558
 */
export const warehouseOrderWarehouse = data => request({
    url: '/api/warehouse/order/warehouse ',
    method: "POST",
    data
})

/** 仓库端的获取订单
 * @param {String} data.type 1:预约;2:取货;3:维修
 * @param {String} data.status 1:生成订单->仓库端待审核;2:仓库审核通过;3:仓库审核拒绝;4:仓库接受成功;5:仓库拒绝接受6撤销
 * @param {String} data.page 分页
 * @param {String} data.num 分页
 * @link
 */
export const warehouseOrderCommonOrder = data => request({
    url: '/api/warehouse/order/commonOrder',
    method: "POST",
    data
})

/** 供应商端的获取订单
 * @param {String} data.type 1:预约;2:取货;3:维修
 * @param {String} data.status 1:生成订单->仓库端待审核;2:仓库审核通过;3:仓库审核拒绝;4:仓库接受成功;5:仓库拒绝接受6撤销
 * @param {String} data.page 分页
 * @param {String} data.num 分页
 * @link
 */
export const gysOrderCommonOrder = data => request({
    url: '/api/gys/order/commonOrder',
    method: "POST",
    data
})

/** 供应商端的获取订单
 * @param {String} data.type 1:预约;2:取货;3:维修
 * @param {String} data.status 1:生成订单->仓库端待审核;2:仓库审核通过;3:仓库审核拒绝;4:仓库接受成功;5:仓库拒绝接受6撤销
 * @param {String} data.page 分页
 * @param {String} data.num 分页
 * @link
 */
export const warehouseOrderCountText = data => request({
    url: '/api/warehouse/order/count___',
    method: "POST",
    data
})
import request from "@/utils/request";

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
export const warehouseOrderCountText = data => request({
    url: '/api/warehouse/order/count___',
    method: "POST",
    data
})
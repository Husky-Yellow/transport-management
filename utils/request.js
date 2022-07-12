import { getBaseUrl } from './index';

/**
 * @param {String} config.url
 * @param {Object} config.data
 * @param {String} config.method
 * @returns
 */
const service = async (config = {}) => {
	return new Promise(async (resolve, reject) => {
		const referrerInfo = uni.getStorageSync('referrerInfo') || null
        // console.log('%cconfig拦截, 拦截: ', 'color:blue', '', config);
        const { url, data = {}, method } = config;
		if (!referrerInfo || (!referrerInfo.id && !referrerInfo.no_status && !referrerInfo.status)) {
			uni.showToast({
				title: '身份认证失效,请重新跳转至本小程序',
				icon: 'none',
			})
			return reject({errMsg: '身份认证失效,请重新跳转至本小程序'})
		}
		data['token_isset'] = '7788521a'
		uni.showLoading({
			mask: true
		});
		await uni.getNetworkType({
			async complete(res) {
				if (res.networkType === 'none') {
					uni.showToast({
						title: '网络较差，请检查网络',
						icon: 'none'
					})
					return reject({errMsg: '网络较差，请检查网络'})
				} else {
					console.log('参数',{
						data
					});
                    await uni.request({
						url: `${getBaseUrl()}${url}`,
						data,
						method,
						complete(res) {
                            console.log('%c请求成功: ', 'color:green', res);
							uni.hideLoading()
                            if (res.statusCode === 200) {
								if (res.data.code === 969) {
									uni.showToast({
										title: '身份认证失效,请重新跳转至本小程序',
										icon: 'none',
									})
									return reject('身份认证失效,请重新跳转至本小程序')
								} else if (res.data.code !== 200) {
									return reject(res.data.message)
								} else {
									return resolve(res.data)
								}
                            } else if (res.statusCode === 405) {
								uni.showToast({
									title: '身份认证失效,请重新跳转至本小程序',
									icon: 'none',
								})
								return reject('身份认证失效,请重新跳转至本小程序')
							} else if (res.statusCode === 500) {
								uni.showToast({
									title: '接口报错,请联系管理员',
									icon: 'none',
								})
								return reject(res)
							}else if (res.errMsg === 'request:fail timeout' || res.errMsg === 'request:fail abort statusCode:-1 timeout') {
								uni.showToast({
									title: '接口超时',
									icon: 'none'
								})
								return reject('接口超时')
							}
						}
					})
				}
			}
		})
	})
}
export default service
import Vue from 'vue'
import App from './App'
import Flyio from 'flyio/dist/npm/wx'
import {
	tips_msg
} from '@/const'
import {
	api
} from '@/const'

Vue.prototype.$http = function(data, successFunction, failFunction) {
	uni.request({
		url: api,
		data: data,
		success: function(res) {
			if (res.data.code == null) {
				successFunction(res);
			} else {
				uni.showToast({
					title: tips_msg.server_error + "code=(" + res.data.code + ")",
					icon: 'none',
					duration: 2000
				})
			}
		},
		fail: function(res) {
			uni.showToast({
				title: tips_msg.server_error,
				icon: 'none',
				duration: 2000
			})
			failFunction(res);
		}
	});

}
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

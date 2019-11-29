import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
Vue.config.productionTip = false

const qf = {
	toast: function(text, duration, success) {
		uni.showToast({
			title: text,
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
	},
	setToken: function(token) {
		uni.setStorageSync("token", token)
	},
	getToken: function() {
		return uni.getStorageSync("token")
	},
}

Vue.prototype.qf = qf;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

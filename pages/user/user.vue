<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">我的小商城</block>
		</cu-custom>
		<!-- #ifdef MP-WEIXIN -->
			<view v-if="!isCanUse">
				<view class='header'>
					<image src='../../static/logo.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>
				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
			</view>
			<view class="header" v-else>
				{{nickName}}
				<image :src="avatarUrl" mode=""></image>
			</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName: '',
				avatarUrl: '',
				isCanUse: uni.getStorage('isCanUse')//默认为true
			}
		},
		onLoad() {
			// this.login();
			console.log(uni.getStorage('isCanUse'));
		},
		onShow() {
			
		},
		components: {

		},
		computed: {

		},
		methods: {
			wxGetUserInfo(info) {
				let _this = this;
				const { detail } = info;
				this.nickName = detail.userInfo.nickName;
				this.avatarUrl = detail.userInfo.avatarUrl;
				uni.setStorage('isCanUse', true);//记录是否第一次授权  false:表示不是第一次授权
				console.log(uni.getStorage('isCanUse'));
				console.log(this.isCanUse)
				// uni.getUserInfo({
				// 	provider: 'weixin',
				// 	success: function(infoRes) {
				// 		let nickName = infoRes.userInfo.nickName; //昵称
				// 		let avatarUrl = infoRes.userInfo.avatarUrl; //头像
				// 		try {
				// 			uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
				// 			// _this.updateUserInfo();
				// 		} catch (e) {}
				// 	},
				// 	fail(res) {}
				// });
			},
			login() {
				let _this = this;
								uni.showLoading({
									title: '登录中...'
								});
							   // 1.wx获取登录用户code
								uni.login({
									provider: 'weixin',
									success: function(loginRes) {
										let code = loginRes.code;
										if (!_this.isCanUse) {
											//非第一次授权获取用户信息
											uni.getUserInfo({
												provider: 'weixin',
												success: function(infoRes) {
				　　　　　　　　　　　　　　　　　　　　//获取用户信息后向调用信息更新方法
													console.log(infoRes)
													let nickName = infoRes.userInfo.nickName; //昵称
													let avatarUrl = infoRes.userInfo.avatarUrl; //头像
													// _this.updateUserInfo();//调用更新信息方法
												}
											});
										}
										uni.hideLoading();
										// //2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
										// uni.request({
										// 	url: '服务器地址',
										// 	data: {
										// 		code: code,
										// 	},
										// 	method: 'GET',
										// 	header: {
										// 		'content-type': 'application/json'
										// 	},
										// 	success: (res) => {
										// 		//openId、或SessionKdy存储//隐藏loading
										// 		uni.hideLoading();
										// 	}
										// });
									},
								});
			},
		},
		created() {
			
		},
		mounted() {
			
		},
	}
</script>

<style scoped>
	.header {
	    margin: 90rpx 0 90rpx 50rpx;
	    border-bottom: 1px solid #ccc;
	    text-align: center;
	    width: 650rpx;
	    height: 300rpx;
	    line-height: 450rpx;
	}
	
	.header image {
	    width: 200rpx;
	    height: 200rpx;
	}
	
	.content {
	    margin-left: 50rpx;
	    margin-bottom: 90rpx;
	}
	
	.content text {
	    display: block;
	    color: #9d9d9d;
	    margin-top: 40rpx;
	}
	
	.bottom {
	    border-radius: 80rpx;
	    margin: 70rpx 50rpx;
	    font-size: 35rpx;
	}
</style>
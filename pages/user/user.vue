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
			<view class="user" v-else>
				<view class="user-section bg-cyan">
					<view class="user-info-box">
						<view class="portrait" @tap="upDateUserInfo">
							<open-data type="userAvatarUrl"></open-data>
							<!-- <image class="portrait" :src="avatarUrl || '../../static/images/user/weixin-default.png'"></image> -->
						</view>
						<view class="username">
							<open-data type="userNickName"></open-data>
							<!-- <text class="username">{{nickName || '游客'}}</text> -->
						</view>
					</view>
				</view>
				<view class="content-manage">
					<view class="coupon-manage">
						<view class="coupon-header little-solid-bottom-black">
							<view class="coupon-text coupon-ticket">劵管理</view>
							<view class="coupon-section" @tap="navTo('/pages/coupon/coupon?type=0')">
								<text class="coupon-text">全部</text>
								<text class="qficon qf-arrow_right" style="font-size: 40rpx;"></text>
							</view>
						</view>
						<view class="coupon-list">
							<view class="coupon-item" v-for="(item,index) in couponList" :key="index" @tap="navTo(`/pages/coupon/coupon?type=${item.type}`)" hover-class="common-hover"  :hover-stay-time="50">
								<image :src="item.imgSrc" />
								<text>{{item.name}}</text>
							</view>
						</view>
					</view>
					<view class="contact">
						<list-cell title="手机号码" :tips="phone" @eventClick="openModal"></list-cell>
						<list-cell title="联系客服" border="" @eventClick="makePhoneService"></list-cell>
					</view>
				</view>
				<view class="content-bottom">
					<text>©我的小商城</text>
				</view>
			</view>
			<qf-modal :show="modal" @click="handleClick" closeIcon="true" :maskClosable="false" :custom="true" :fadein="true">
				<view class="qf-modal-custom">
					<view class="qf-modal-title">修改手机号</view>
					<view class="qf-modal-title">为了您的账号安全，请及时更新手机号</view>
					<form class="qf-form" @submit="formSubmit">
						<view class="qf-form-item box-raduis" v-if="phone">
							<input class="qf-input" name="oldPhone" :value="phone" disabled/>
						</view>
						<view class="qf-form-item box-raduis">
							<input class="qf-input" name="newPhone" v-model="newPhone" placeholder="请输入新手机号" />
						</view> 
						<view class="qf-form-item box-raduis column-with-btn">
							<input class="qf-input" :class="{'code-solid' : disableCodeBtn}" name="code" v-model="code" maxlength="6" type="number" placeholder="请输入验证码" />
							<button :class="{active : !disableCodeBtn}" :disabled="disableCodeBtn" @tap="sendCode">{{codeBtn.text}}</button>
						</view>
						<button class="cu-btn bg-blue round" style="width: 180rpx;" form-type="submit">确定</button>
					</form>
				</view>
			</qf-modal>
		<!-- #endif -->
	</view>
</template>

<script>
	const form = require("../../common/utils/formValidation.js")
	import listCell from '@/components/mix-list-cell';
	import qfModal from "../../components/modal/modal";
	export default {
		data() {
			return {
				nickName: '', //微信用户名
				avatarUrl: '', //用户头像
				phone: '18452774144', //用户手机号
				newPhone: '', //新手机号
				code: '', //短信验证码
				isCanUse: false, //默认为false
				couponList: [
					{name: "未使用", imgSrc: "/static/images/user/default-img.png", type: "0"},
					{name: "已使用", imgSrc: "/static/images/user/default-img.png", type: "1"},
					{name: "已过期", imgSrc: "/static/images/user/default-img.png", type: "2"}
				],
				modal: false,
				seconds: 10,
				codeBtn: {
					text: '获取验证码',
					waitingCode: false,
					count: this.seconds
				}
			}
		},
		onLoad() {
			// this.login();
		},
		onShow() {
			this.isCanUse = uni.getStorageSync('isCanUse');
		},
		components: {
			listCell,
			qfModal
		},
		computed: {
			disableCodeBtn: function (){
				return this.codeBtn.waitingCode;
			}
		},
		methods: {
			//获取最新的昵称、头像
			upDateUserInfo(){
				
			},
			wxGetUserInfo(info) {
				let _this = this;
				const { detail } = info;
				this.nickName = detail.userInfo.nickName;
				this.avatarUrl = detail.userInfo.avatarUrl;
				try {
					uni.setStorageSync('isCanUse', true);
				} catch (e) {}
				this.isCanUse = uni.getStorageSync('isCanUse')
				//记录是否第一次授权  false:表示不是第一次授权
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
			navTo(url) {
				// console.log(this.isCanUse)
				// if(!this.isCanUse){
				// 	// url = '/pages/public/login';
				// }
				uni.navigateTo({  
					url
				})
			},
			makePhoneService() {
				uni.makePhoneCall({
				    phoneNumber: this.phone
				});
			},
			openModal() {
				this.modal = !this.modal;
			},
			handleClick(e) {
				let index = e.index;
				// if (index === 0) {
				// 	this.qf.toast("你点击了取消按钮")
				// } else {
				// 	this.qf.toast("你点击了确定按钮")
				// }
				this.modal = false
			},	
			formSubmit(e) {
				let rules = [
					{
						name: 'newPhone',
						rule: ["required", "isMobile"],
						msg: ["请输入手机号", "请输入正确的手机号"]
					},
					{
						name: 'code',
						rule: ["required", "isNum", "minLength:6"],
						msg: ["请输入验证码", "请输入正确的数字", "请输入完整的验证码"]
					}
				]
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules)
				if (!checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
					this.phone = formData.newPhone;
					this.newPhone = "";
					this.code = "";
					this.modal = false;
				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
			},
			sendCode() {
				let rules = [
					{
						name: 'newPhone',
						rule: ["required", "isMobile"],
						msg: ["请输入手机号", "请输入正确的手机号"]
					},
				]
				let checkRes = form.validation({newPhone: this.newPhone}, rules)
				if (checkRes) {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
					return;
				}
				this.codeBtn.waitingCode = true;
				this.codeBtn.count = this.seconds;
				this.codeBtn.text = this.codeBtn.count + 's';
				
				let countdown = setInterval( () => {
					this.codeBtn.count--;
					this.codeBtn.text = this.codeBtn.count + 's';
					if( this.codeBtn.count < 0 ){
						clearInterval(countdown);
						this.codeBtn.text = '重新发送';
						this.codeBtn.waitingCode = false;
					}
				},1000);
			}
		},
		created() {
			
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang='scss'>
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}
	%flex-item{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
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
	
	.user-section{
		height: 300rpx;
		background-image: url("../../static/images/user/beijing_bolang.png");
		background-size: cover;
		background-position: center;
		/* position: relative; */
		/* z-index: 1; */
	}
	.user-info-box{
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.portrait{
			width: 130rpx;
			height: 130rpx;
			overflow:hidden;  
			display: block;
			border: 4rpx solid #fff;
			border-radius: 50%;
			display: block;
		}
		.username{
			font-size: $font-lg;
			font-weight: 300;
		}
	}
	.content-manage{
		padding: 0 30rpx;
		position: relative;
		/* background: #f5f5f5; */
		margin-top: 20rpx;
		padding-bottom: 20upx;
	}
	.coupon-manage{
		background: #fff;
		border-radius: 10upx;
		.coupon-header{
			display:flex;
			align-items: center;
			line-height: 80rpx;
			padding: 0px 20rpx;
			.coupon-ticket{
				flex: 1;
			}
			.coupon-text{
				font-size: $font-base;
			}
			.coupon-section{
				display: flex;
				align-items: center;
				/* .coupon-right{
					align-self: center;
				} */
			}
		}
	}
	.little-solid-bottom-black{
		position: relative;
		&::after{
			content: " ";
			width: 200%;
			height: 200%;
			position: absolute;
			top: 0;
			left: 0;
			border-radius: inherit;
			transform: scale(0.5);
			transform-origin: 0 0;
			pointer-events: none;
			box-sizing: border-box;
		}
	}
	.little-solid-bottom-black::after{
		border-bottom: 1rpx solid rgba(0, 0, 0, 1);
	}
	.coupon-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap:wrap;
		padding: 25rpx 35rpx; 
		.coupon-item {
			@extend %flex-item;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		image {
			width: 88rpx;
			height: 88rpx;
			margin-bottom: 10rpx;
		}
	}
	.contact{
		margin-top: 20rpx;
		background: #fff;
		border-radius:10upx;
	}
	.content-bottom{
		font-size: $font-lg;
		position: absolute;
		bottom: calc(var(--window-bottom) + 10px);
		width: 100%;
		text-align: center;
	}
	.qf-modal-custom{
		text-align: center;
	}
	.qf-modal-title{
		font-size: $font-base;
		margin-bottom: 8px;
	}
	
	.qf-form-item{
		display:flex;
		align-items: center;
		justify-content: space-between;
		width:100%;
		margin-bottom: 14px;
	}
	.box-raduis{
		border: 1px solid #C0C0C0;
		border-radius: 20px;
	}
	.qf-input{
		font-size: 14px;
		height: 76rpx;
		padding: 0 25rpx;
		flex: 1;
		vertical-align: middle;
	}
	.column-with-btn{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		button{
			font-size: 28rpx;
			margin: 0;
			width: 180rpx;
			text-align: center;
			height: 76rpx;
			line-height: 76rpx;
			border-radius: 20px;
			border-bottom-left-radius: 0px;
			border-top-left-radius: 0px;
			padding-left: 8px;
			padding-right: 8px;
			&:after{
				border: none;
			}
			&.active{
				background-color: $uni-color-primary;
				color: $uni-text-color-inverse;
			}
		}
	}
	.code-solid{
		position: relative;
		&:after{
			content: " ";
			width: 200%;
			height: 200%;
			position: absolute;
			top: 0;
			left: 0;
			border-radius: inherit;
			transform: scale(0.5);
			transform-origin: 0 0;
			pointer-events: none;
			box-sizing: border-box;
			border-right: 4rpx solid #000000;
		}
	}
</style>
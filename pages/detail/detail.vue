<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">我的小商城</block>
		</cu-custom>
		<!-- banner轮播 -->
		<view class="qf-banner-swiper">
			<swiper :autoplay="true" :interval="5000" :duration="150" :circular="true" :style="{height:scrollH + 'px'}" @change="bannerChange">
				<block v-for="(item,index) in banner" :key="index">
					<swiper-item :data-index="index" @tap.stop="previewImage">
						<image :src="item" class="qf-slide-image" :style="{height:scrollH+'px'}" />
					</swiper-item>
				</block>
			</swiper>
			<view class='cu-tag qf-tag-class'>
				{{bannerIndex+1}}/{{banner.length}}
			</view>
		</view>
		<!-- banner轮播 -->
		
		<!-- detail区域 -->
		<view class="qf-product-info">
			<view class="qf-product-title qf-border-radius margin-bottom-sm">
				<view class="qf-product-content">
					<view class="qf-pro-title">
						谈判官明星同款耳坠韩国气质简约显脸瘦的耳环女百搭个性长款耳钉 个性水滴耳环【A2】
					</view>
					<view class="qf-price-box">
						<view class="qf-product-price">
							<text class="qf-sale-price">￥{{getRndInteger(150,300)}}.00</text>
							<text class="qf-factory-price">￥{{getRndInteger(200,500)}}.00</text>
						</view>
						<view class="qf-sold-num">已被抢:{{getRndInteger(500,2000)}}人</view>
						<view class="qf-sold-num">已浏览:{{getRndInteger(200,5000)}}人</view>
					</view>
					<view class="qf-product-share align-center justify-between">
						<view class="cu-avatar-group qf-avatar-group">
							<view class="cu-avatar round lg" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
						</view>
						<button class="cu-btn bg-cyan qf-share-btn" open-type="share">
							分享给好友
						</button>
					</view>
				</view>
			</view>
			
			<!-- 商家信息 -->
			<view class="qf-business-info qf-radius-all margin-bottom-sm">
				<view class="qf-title-btn">
					<view class="cu-tag line-black round">商家信息</view>
				</view>
				<view class="business-info-box">
					<view class="business-title">京华城RMall店（CatFamily）</view>
					<view class="business-title">营业时间：10:30-22:30</view>
					<view class="busine-between">
						<view class="nav-addr between-left">扬州市邗江区迎新路天宝物华备份199号</view>
						<button class="cu-btn round bg-cyan shadow" @tap="navigation">导航</button>
					</view>
					<view class="busine-between">
						<view class="telephone-text between-left">商家电话：{{businPhone}}</view>
						<button class="cu-btn round bg-cyan shadow" @tap="callUp">拨打</button>
					</view>
					<view class="busine-between">
						<view class="nick-text between-left">商家昵称：{{businNickname}}</view>
						<button class="cu-btn round bg-cyan shadow">添加</button>
					</view>
				</view>
			</view>
			<!-- 商家信息 -->
			
			<!-- 购买须知 -->
			<view class="qf-purchase-notice qf-radius-all margin-bottom-sm">
				<view class="qf-title-btn">
					<view class="cu-tag line-black round">购买须知</view>
				</view>
				<view class="qf-notice-box">
					<view class="qf-notice-item" v-for="(i, index) in purchaseData" :key="index">
						{{i}}
					</view>
				</view>
			</view>
			<!-- 购买须知 -->
			
			<!-- 商品详情 -->
			<view class="qf-product-detail">
				<view class="qf-title-btn">
					<view class="cu-tag line-black round">商品详情</view>
				</view>
				
			</view>
			<!-- 商品详情 -->
		</view>
		
		<!-- title区域 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollH: 0, //滚动总高度
				banner: [
					"https://www.thorui.cn/img/product/11.jpg",
					"https://www.thorui.cn/img/product/2.png",
					"https://www.thorui.cn/img/product/33.jpg",
					"https://www.thorui.cn/img/product/4.png",
					"https://www.thorui.cn/img/product/55.jpg",
					"https://www.thorui.cn/img/product/6.png",
					"https://www.thorui.cn/img/product/7.jpg",
					"https://www.thorui.cn/img/product/8.jpg"
				],
				bannerIndex: 0,
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10003.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
				],
				businPhone: "18452774144",
				businNickname: "智障二百五",
				purchaseData: [
					"一、当您在选择我店产品的同时请仔细了解产品是否适合您真实需要。",
					"二、在确定购买产品前或还找不到适合自己的产品时请及时和我们沟通，以便可以买到最适合自己的产品；",
					"三、掌柜相信您是位诚信的买家，拍下宝贝后，请各位及时付款，未及时付款的，掌柜会关闭交易，有特殊情况的请与掌柜联系沟通；",
					"四、拍下您需要的产品后请确定您的支付方式及详细的联系方式和发货地址；",
					"五、买家完成付款后,正常情况下我们会在24小时内发货，发货后所有的货单号会及时上传至网上以便你可以随时跟踪货物派送情况；",
					"六、货品签收：店里所有出售的商品发出前我们都会检查，一般核对两次商品数量和质量，无误后才会打包，破损的商品我们不会发出。但是由于货品的长途运输(快递)，是在本店的控制范围之外，所以请买家朋友在收到快递送货时，要在快递人员面前验货，如不当面验货的，快递将不负责商品的完好，本店无法要求快递索赔；如您的包裹由您的家人、朋友、同事、门卫等人签收，视为您已经签收，签字后再提出异议，恕本店无法解决，请大家注意！请在签收后第一时间上网确认。"
				]
			}
		},
		onLoad(option) {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			setTimeout(() => {
				uni.getSystemInfo({
					success: (res) => {
						this.scrollH = res.windowWidth
					}
				})
			}, 50)
		},
		onShow() {

		},
		components: {

		},
		computed: {

		},
		methods: {
			/* 生成随机id数 */
			getRndInteger(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			bannerChange: function(e) {
				this.bannerIndex = e.detail.current
			},
			previewImage: function(e) {
				let index = e.currentTarget.dataset.index;
				uni.previewImage({
					current: this.banner[index],
					urls: this.banner
				})
			},
			/* 分享给好友 */
			btnShare() {
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: "http://uniapp.dcloud.io/",
				    title: "uni-app分享",
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			/* 拨打 */
			callUp() {
				uni.makePhoneCall({
				    phoneNumber: this.businPhone
				});
			},
			/* 导航 */
			navigation() {
				const latitude = 30.668568;
				const longitude = 104.112282;
				uni.openLocation({
					name: "成都成华SM广场",
					address: "四川省成都市成华区二环路东二段29号",
					latitude,
					longitude,
					scale: 18
				})
			},
		},
		/* 小程序中右上角分享 */
		onShareAppMessage(res) {
			if (res.from === 'button') {
				console.log(res)
			}
			return {
			  title: '自定义分享标题',
			  path: '/pages/detail/detail?id=123'
			}
		}
	}
</script>

<style lang="scss">
	.qf-banner-swiper {
		position: relative;
	}
	.qf-banner-swiper {
		.qf-tag-class {
			position: absolute;
			color: #fff;
			bottom: 30rpx;
			right: 0;
			background-color: rgba(51,51,51,.7) !important;
			color: #ffffff;
			border-top-left-radius: 200rpx;
			border-bottom-left-radius: 200rpx;
		}
	}
	.qf-slide-image {
		width: 100%;
		display: block;
	}
	
	/* detail区域 */
	.qf-border-radius {
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
		overflow: hidden;
	}
	.qf-product-title {
		background: #FFFFFF;
		padding: 25rpx 0;
	}
	.qf-product-content {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		padding: 0 20rpx;
	}
	.qf-pro-title {
		color: #2e2e2e;
		font-size: $font-base - 2;
		word-break: break-all;
	}
	.qf-price-box {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		justify-content: space-between;
	}
	.qf-product-price {
		padding-top: 15rpx;
	}
	.qf-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}
	.qf-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}
	.qf-sold-num {
		padding-top: 15rpx;
		font-size: 26rpx;
		color: #656565;
	}
	
	.qf-product-share {
		display: flex;
		padding-top: 20rpx;
	}
	.qf-avatar-group {
		flex: 1;
		text-align: left;
	}
	.qf-share-btn {
		height: 96rpx;
	}
	
	/* 商家信息 */
	.qf-business-info{
		background: #fff;
		padding: 0 30rpx 0 15rpx;
	}
	.business-info-box{
		display: flex;
		flex-direction: column;
	}
	.business-title{
		margin-bottom: 20rpx;
	}
	.busine-between{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: $font-base;
		margin-bottom: 20rpx;
		.between-left{
			flex: 1;
		}
		.cu-btn{
			height: 52rpx;
			font-size: 26rpx;
		}
	}
	/* 购买须知 */
	.qf-purchase-notice{
		background: #fff;
		padding: 0 15rpx;
	}
	.qf-notice-box{
		margin-bottom: 10rpx;
	}
	.qf-notice-item{
		margin-bottom: 15rpx;
	}
	/* 商品详情 */
	.qf-product-detail {
		@extend .qf-purchase-notice;
	}
	
	.qf-radius-all {
		border-radius: 24rpx;
		overflow: hidden;
	}
	.qf-title-btn{
		text-align: center;
		padding: 20rpx 0;
		.line-black{
			padding: 0 30rpx;
			font-size: 28rpx;
			line-height: 1;
		}
	}
</style>
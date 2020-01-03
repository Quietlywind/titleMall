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
							<text class="qf-sale-price">￥{{proDetail.price}}.00</text>
							<text class="qf-factory-price">￥{{proDetail.factory}}.00</text>
						</view>
						<view class="qf-sold-num">已被抢:{{proDetail.coverNum}}人</view>
						<view class="qf-sold-num">已浏览:{{proDetail.browseNum}}人</view>
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
				<view class="qf-detail-content">
					<rich-text :nodes="descriptionStr"></rich-text>
				</view>
			</view>
			<!-- 商品详情 -->
			
			<!-- 价格说明 -->
			<view class="qf-price-description margin-bottom-sm">
				<view class="qf-descr-title">价格说明</view>
				<view class="qf-descr-item padding-bottom-sm" v-for="(item, index) in descriptionText" :key="index">
					<view class="">*{{item.title}}</view>
					<view class="">{{item.desc}}</view>
				</view>
			</view>
			<!-- 价格说明 -->
			
			<!-- 广告展示 -->
			<view class="qf-advertising-display margin-bottom-sm">
				<view class="qf-title-btn">
					<view class="cu-tag line-black round">广告展示</view>
				</view>
				<video class="qf-advertising-video" src="https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/3c37c862239695555860176897/v.f30.mp4" controls page-gesture></video>
				<view class="qf-advertising-image">
					<image :src="'https://www.thorui.cn/img/detail/'+(index+1)+'.jpg'" v-for="(img,index) in 20" :key="index" mode="widthFix"></image>
				</view>
			</view>
			<!-- 广告展示 -->
			
			<!-- 为您推荐 -->
			<view class="qf-give-recommend">
				<view class="qf-title-btn bg-white">
					<view class="cu-tag line-black round">为您推荐</view>
				</view>
				<view class="qf-recommend-list">
					<block v-for="(item, index) in productList" :key="index">
						<view class="qf-recommend-item" hover-class="hover" :hover-start-time="150" @tap="gotoDetail('/pages/detail/detail?id='+getRndInteger(1,3),1)">
							<image :src="'../../static/images/product/'+item.img+'.jpg'" class="qf-recommend-img" mode="widthFix"></image>
							<view class="qf-recommend-content">
								<view class="qf-recommend-title text-ellipsis-more">{{item.name}}</view>
								<view>
									<view class="qf-recommend-price">
										<text class="qf-sale-price">￥{{item.price}}.00</text>
										<text class="qf-factory-price">￥{{item.factory}}.00</text>
									</view>
									<view class="qf-sold-num">
										已抢:{{item.sale}}件
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
			<!-- 为您推荐 -->
		</view>
		<!-- detail区域 -->
		
		<!-- 底部操作区域 -->
		<view class="qf-bottom-operation">
			<view class="cu-bar bg-white tabbar border shop">
				<view class="action text-orange" @tap="gotoPage('/pages/index/index')">
					<view class="cuIcon-homefill"></view>首页
				</view>
				<button class="action text-orange" @tap="togglePopup('bottom', 'share')">
					<view class="cuIcon-share"></view>分享
				</button>
				<view class="action text-orange" @tap="gotoPage('/pages/user/user')">
					<view class="cuIcon-my"></view>我的
				</view>
				<view class="submit qf-operation-btn" :class="[type != 1 ? 'light bg-grey' : 'bg-red']" @tap="gotoDetail('/pages/grabtickets/grabtickets?id='+getRndInteger(1,3)+'&type='+getRndInteger(1,2),2)">
					<block v-if="type == 1">
						<text>￥{{proDetail.price}}.00</text>
						<text>立即抢券</text>
					</block>
					<block v-else-if="type == 0">
						已抢完
					</block>
					<block v-else-if="type == 2">
						已结束
					</block>
					<block v-else-if="type == 3">
						已下架
					</block>
				</view>
			</view>
		</view>
		<!-- 底部操作区域 -->
		
		<!-- 底部share分享 -->
		<uni-popup :show="showshare" :type="'bottom'" @change="change" class="uni-share-box">
			<view class="uni-share">
				<text class="uni-share-title">分享给朋友</text>
				<view class="uni-share-content">
					<button class="uni-share-content-box uni-share-content-btn" open-type="share">
						<view class="uni-share-content-image">
							<image src="https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png" class="content-image" mode="widthFix" />
						</view>
						<text class="uni-share-content-text">发给朋友</text>
					</button>
					<view class="uni-share-content-box" @tap="gotoDetail('/pages/canvas/canvas?id='+getRndInteger(1,3),1)">
						<view class="uni-share-content-image">
							<image src="https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png" class="content-image" mode="widthFix" />
						</view>
						<text class="uni-share-content-text">生成图片</text>
					</view>
				</view>
				<text class="uni-share-btn" @click="cancel('share')">取消分享</text>
			</view>
		</uni-popup>
		<!-- 底部share分享 -->
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup'
	export default {
		data() {
			let that = this;
			return {
				type: 1,
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
				],
				//商品描述html
				descriptionStr:'<div style="text-align:center;"><img width="100%" src="https://ae01.alicdn.com/kf/HTB1t0fUl_Zmx1VjSZFGq6yx2XXa5.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB1LzkjThTpK1RjSZFKq6y2wXXaT.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB18dkiTbvpK1RjSZPiq6zmwXXa8.jpg"/></div>',
				descriptionText: [
					{ title: "商城价", desc: "商城价为商品的销售价，是您最终决定是否购买商品的依据。"},
					{ title: "划线价", desc: "商品展示的划横线价格为参考价，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在京东平台上曾经展示过的销售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考。" },
					{ title: "折扣", desc: "如无特殊说明，折扣指销售商在原价、或划线价（如品牌专柜标价、商品吊牌价、厂商指导价、厂商建议零售价）等某一价格基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系销售商进行咨询。"},
					{ title: "异常问题", desc: "商品促销信息以商品详情页“促销”栏中的信息为准；商品的具体售价以订单结算页价格为准；如您发现活动商品售价或促销信息有异常，建议购买前先联系销售商咨询。"},
				],
				productList: [
					{
						id: that.getRndInteger(1100000000, 1199999999),
						img: 1,
						name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）',
						price: that.getRndInteger(150,300),
						sale: that.getRndInteger(0,1000),
						factory: that.getRndInteger(200,500),
						coverNum: that.getRndInteger(500,2000),
						browseNum: that.getRndInteger(500,5000)
					},
					{
						id: that.getRndInteger(1100000000, 1199999999),
						img: 2,
						name: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',
						price: that.getRndInteger(150,300),
						sale: that.getRndInteger(0,1000),
						factory: that.getRndInteger(200,500),
						coverNum: that.getRndInteger(500,2000),
						browseNum: that.getRndInteger(500,5000)
					},
					{
						id: that.getRndInteger(1100000000, 1199999999),
						img: 3,
						name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
						price: that.getRndInteger(150,300),
						sale: that.getRndInteger(0,1000),
						factory: that.getRndInteger(200,500),
						coverNum: that.getRndInteger(500,2000),
						browseNum: that.getRndInteger(500,5000)
					},
					{
						id: that.getRndInteger(1100000000, 1199999999),
						img: 4,
						name: '百雀羚套装女补水保湿护肤品',
						price: that.getRndInteger(150,300),
						sale: that.getRndInteger(0,1000),
						factory: that.getRndInteger(200,500),
						coverNum: that.getRndInteger(500,2000),
						browseNum: that.getRndInteger(500,5000)
					},
					{
						id: that.getRndInteger(1100000000, 1199999999),
						img: 5,
						name: '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋',
						price: that.getRndInteger(150,300),
						sale: that.getRndInteger(0,1000),
						factory: that.getRndInteger(200,500),
						coverNum: that.getRndInteger(500,2000),
						browseNum: that.getRndInteger(500,5000)
					},
					{
						id: that.getRndInteger(1100000000, 1199999999),
						img: 6,
						name: '短袖睡衣女夏季薄款休闲家居服短裤套装女可爱韩版清新学生两件套 短袖粉色长颈鹿 M码75-95斤',
						price: that.getRndInteger(150,300),
						sale: that.getRndInteger(0,1000),
						factory: that.getRndInteger(200,500),
						coverNum: that.getRndInteger(500,2000),
						browseNum: that.getRndInteger(500,5000)
					}
				],
				showshare: false,
				bottomData: [
					{
						text: '微信',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png',
						name: 'wx'
					},
					{
						text: '支付宝',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png',
						name: 'wx'
					},
					{
						text: 'QQ',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png',
						name: 'qq'
					},
					{
						text: '新浪',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-1.png',
						name: 'sina'
					},
					{
						text: '百度',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-7.png',
						name: 'copy'
					},
					{
						text: '其他',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png',
						name: 'more'
					}
				]
			}
		},
		onLoad(option) {
			// this.type = option.id;
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
			uniPopup
		},
		computed: {
			proDetail() {
				return {
					price: this.getRndInteger(150,300),
					factory: this.getRndInteger(200,500),
					coverNum: this.getRndInteger(500,2000),
					browseNum: this.getRndInteger(500,5000)
				}
			}
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
			/* 为您推荐中商品详情跳转 */
			gotoDetail(url,val) {
				if (this.type != 1 && val == 2) return
				uni.navigateTo({
					url
				})
			},
			/* 底部操作栏跳转 */
			gotoPage(url) {
				uni.switchTab({
					url
				})
			},
			/* 底部share分享改变事件 */
			change(e) {
				console.log('是否打开:' + e.show)
				if (!e.show) {
					this.showshare = false
				}
			},
			togglePopup(type, open) {
				this['show' + open] = true
			},
			cancel(type) {
				this['show' + type] = false
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
		},
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
	.qf-product-info {
		margin-bottom: calc(100upx + env(safe-area-inset-bottom) / 2);
	}
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
		background: #fff;
	}
	/* 价格说明 */
	.qf-price-description {
		@extend .qf-purchase-notice;
		color: #666666;
	}
	.qf-descr-title {
		padding: 10rpx 0;
	}
	.qf-descr-item {
		font-size: 26rpx;
	}
	/* 广告展示 */
	.qf-advertising-display {
		@extend .qf-purchase-notice;
	}
	.qf-advertising-video {
		width: 100%;
		height: 400rpx;
		margin: 10rpx 0;
	}
	.qf-advertising-image image {
		width: 100%;
		display: block;
	}
	/* 为您推荐 */
	.qf-give-recommend {
		.qf-recommend-list {
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			flex-wrap: wrap;
		} 
		.qf-recommend-item {
			width: 49%;
			margin-bottom: 15rpx;
			background: #fff;
			border-radius: 12rpx;
			overflow: hidden;
			transition: all 0.15s ease-in-out;
		}
		.qf-recommend-img {
			width: 100%;
			display: block;
		}
		.qf-recommend-content {
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			padding: 20rpx;
		}
		.qf-recomment-title {
			color: #2e2e2e;
			font-size: $font-base - 2;
			word-break: break-all;
		}
		.qf-recommend-price {
			padding-top: 10rpx;
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
			padding-top: 10rpx;
			font-size: 26rpx;
			color: #656565;
		}
	}
	/* 底部操作栏 */
	.qf-bottom-operation {
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 2;
		background-color: #fff;
	}
	.qf-operation-btn {
		flex-direction: column;
	}
	/* 底部share分享弹窗 */
	.uni-share-box {
		.uni-popup {
			z-index: 10;
		}
	}
	.uni-share {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		background-color: #fff;
	}
	
	.uni-share-title {
		line-height: 60rpx;
		font-size: 24rpx;
		padding: 15rpx 0;
		text-align: center;
	}
	
	.uni-share-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 10px 15px;
	}
	
	.uni-share-content-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		// width: 200rpx;
		flex: 1;
		line-height: 1;
	}
	.uni-share-content-btn {
		position: relative;
		text-align: center;
		padding: 0;
		display: block;
		height: auto;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 100%;
		background: #FFFFFF;
		&::after {
			border: 0;
		}
	}
	
	.uni-share-content-image {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 60rpx;
		height: 60rpx;
		overflow: hidden;
		border-radius: 10rpx;
	}
	
	.content-image {
		width: 60rpx;
		height: 60rpx;
	}
	
	.uni-share-content-text {
		font-size: 26rpx;
		color: #333;
		padding-top: 5px;
		padding-bottom: 10px;
	}
	
	.uni-share-btn {
		height: 90rpx;
		line-height: 90rpx;
		font-size: 14px;
		border-top-color: #f5f5f5;
		border-top-width: 1px;
		border-top-style: solid;
		text-align: center;
		color: #666;
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
<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">我的小商城</block>
		</cu-custom>
		<!-- header-搜索框 -->
		<view class="qf-header-box flxed" :style="[{top:CustomBar + 'px'}]">
			<view class="qf-searchbox full-frame">
				<icon type="search" :size='13' color='#999'></icon>
				<input type="text" placeholder="输入关键字,我们帮您找" confirm-type="search" @input="searchIcon"></input>
			</view>
		</view>
		<!-- header-搜索框 -->
		
		<!-- screen-筛选区域 -->
		<view class="qf-header-screen flxed" :style="{top:CustomBar + 50 + 'px' }">
			<view class="qf-screen-bottom">
				<view class="qf-bottom-item qf-icon-ml" v-for="(item, index) in attrArray" :key="index"
					:class="[item.isActive?'qf-active qf-bold':'']"
					:data-index="index" 
					:data-isactive="item.isActive"
					@tap="screen">
					<view class="qf-bottom-text">
						{{item.selectName}}
					</view>
					<text class="qficon qf-icon-class" 
						:class="[item.isActive?'qf-arrow_up':'qf-arrow_down']"
						:style="{color:item.isActive?'#e41ef19':'#444'}"></text>
				</view>
				<!-- 下拉选择列表-综合 -->
				<view class="qf-dropdownlist" :class="[dropScreenShow?'qf-dropdownlist-show':'']" :style="{height:selectH+'rpx'}">
					<scroll-view class="qf-scroll-box" scroll-y>
						<view class="qf-dropdownlist-item qf-icon-middle" :class="[item.selected?'qf-bold qf-active':'']" v-for="(item,index) in attrData"
						 :key="index" @tap.stop="dropdownItem" :data-index="index">
							<text class="qf-ml qf-middle">{{item.name}}</text>
						</view>
					</scroll-view>
				</view>
				<view class="qf-dropdownlist-mask" :class="[dropScreenShow?'qf-mask-show':'']" @tap.stop="hideDropdownList"></view>
				<!-- 下拉选择列表-综合 -->
			</view>
			<view class="qf-screen-top">
				<view class="qf-top-item">
					<view>全部</view>
				</view>
				<view class="qf-top-item">
					<view>吃喝</view>
				</view>
				<view class="qf-top-item">
					<view>玩乐</view>
				</view>
				<view class="qf-top-item">
					<view>生活</view>
				</view>
				<view class="qf-top-item">
					<view>配件</view>
				</view>
				<view class="qf-top-item qficon" :class="[show?'qf-arrow_up':'qf-arrow_down']" style="font-size: 16px;" @tap="iconDropChange">
				</view>
			</view>
		</view>
		<!-- screen-筛选区域 -->
		
		<!-- list-列表 -->
		<view class="qf-product-list" :style="{marginTop:dropScreenH - CustomBar + px(18) + 'px'}">
			<block v-for="(item, index) in productList" :key="index">
				<view :class="[isBigMode?'qf-product-item':'qf-product-item-small']" hover-class="hover" :hover-start-time="150" @tap="checkDetail">
					<image :src="'../../static/images/product/'+item.img+'.jpg'" class="qf-product-img" mode="widthFix"></image>
					<view class="qf-product-content">
						<view class="qf-product-title text-ellipsis-more">{{item.name}}</view>
						<view :class="[isBigMode?'qf-price-box':'']">
							<view class="qf-product-price">
								<text class="qf-sale-price">￥{{item.price}}.00</text>
								<text class="qf-factory-price">￥{{item.factory}}.00</text>
							</view>
							<view class="qf-sold-num">
								<block v-if="isBigMode">
									已被抢:{{item.coverNum}}人
								</block>
								<block v-else>
									已抢:{{item.sale}}件
								</block>
							</view>
							<view class="qf-sold-num" v-if="isBigMode">已浏览:{{item.browseNum}}人</view>
						</view>
					</view>
				</view>
			</block>
			<!-- <view class="qf-product-container">
				<block v-for="(item, index) in productList" :key="index" v-if="(index+1)%2!=0 || isBigMode">
					<view class="qf-product-item" :class="[isBigMode?'qf-flex-list':'']"
						hover-class="hover" :hover-start-time="150" @tap="checkDetail">
						<image :src="'../../static/images/product/'+item.img+'.jpg'" 
							class="qf-product-img" :class="[isBigMode?'qf-product-imgItem':'']" mode="widthFix"></image>
						<view class="qf-product-content">
							<view class="qf-product-title text-ellipsis-more">
								{{item.name}}
							</view>
							<view class="qf-product-price">
								<text class="qf-sale-price">￥{{item.price}}.00</text>
							</view>
							<view class="qf-sold-num">
								已抢：{{item.sale}}件
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="qf-product-container" v-if="!isBigMode">
				<block v-for="(item,index) in productList" :key="index" v-if="(index+1)%2==0">
					<view class="qf-product-item" :class="[isBigMode?'qf-flex-list':'']"
						hover-class="hover" :hover-start-time="150" @tap="checkDetail">
						<image :src="'../../static/images/product/'+item.img+'.jpg'" 
							class="qf-product-img" :class="[isBigMode?'qf-product-imgItem':'']" mode="widthFix"></image>
						<view class="qf-product-content">
							<view class="qf-product-title text-ellipsis-more">
								{{item.name}}
							</view>
							<view class="qf-product-price">
								<text class="qf-sale-price">￥{{item.price}}.00</text>
							</view>
							<view class="qf-sold-num">
								已抢：{{item.sale}}件
							</view>
						</view>
					</view>
				</block>
			</view> -->
		</view>
		<!-- list-列表 -->
		
		<!-- 顶部下拉筛选弹层 属性 -->
		<view class="qf-top-dropdown qf-dropdown-box" :class="[show?'qf-dropdown-show':'']"
			:style="{transform: 'translateZ(0) translateY('+(show?dropScreenH+'px':'-100%')+')'}">
			
		</view>
		<view class="qf-dropdown-mask" :class="[show?'qf-dropmask-show':'']" @tap="handleClose"></view>
		<!-- 顶部下拉筛选弹层 属性 -->
	</view>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				CustomBar: this.CustomBar,
				pageIndex: 1,
				selectedName1: "全城",
				selectedName2: "默认推荐",
				selectedName3: "小图模式",
				show: false,
				dropScreenH: 0, //下拉筛选框距顶部距离
				tabIndex: null, //顶部筛选索引
				selectH: 0,
				attrData: [],
				attrIndex: -1,
				dropScreenShow: false,
				isBigMode: false, //是否以大图或小图模式展示
				attrArray: [
					{ name: "全城", selectName: "全城", isActive: false, 
						list: [
							{ name: "全城", selected: true },
							{ name: "京华城广场",selected: false },
							{ name: "昌建广场",selected: false },
							{ name: "SM广场",selected: false },
							{ name: "香年广场",selected: false },
							{ name: "银泰城",selected: false },
							{ name: "砖石广场",selected: false },
							{ name: "中环广场",selected: false }
						],
					},
					{ name: "默认推荐", selectName: "默认推荐", isActive: false,
						list: [
							{ name: "默认推荐", selected: true },
							{ name: "附近优先", selected: false },
							{ name: "最新上架", selected: false },
							{ name: "最新排名", selected: false}
						],
					},
					{ name: "小图模式", selectName: "小图模式", isActive: false,
						list: [
							{ name: "小图模式", selected: true },
							{ name: "大图模式",selected: false }
						],
					}
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
					},
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
					}
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
			uni.getSystemInfo({
				success: (res) => {
					this.dropScreenH = this.CustomBar + 50 + uni.upx2px(168)
				}
			})
		},
		onShow() {

		},
		components: {

		},
		computed: {

		},
		methods: {
			/* 转换px */
			px(num) {
				return uni.upx2px(num)
			},
			/* 生成随机id数 */
			getRndInteger(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			/* 搜索框事件 */
			searchIcon(e) {
				let key = e.detail.value;
			},
			
			/* 判断数据显示个数 */
			numSwitch(val) {
				switch (true){
					case val<3:
						return 160
						break;
					case val>=4:
						return 320
						break;
					default:
						return 320
						break;
				}
			},

			/* 筛选下拉打开事件 */
			screen(e) {
				this.attrArray.forEach(i => {
					i.isActive = false;
				})
				let index = e.currentTarget.dataset.index;
				let isActive = e.currentTarget.dataset.isactive;
				this.attrData = this.attrArray[index].list;		
				this.attrIndex = index;
				this.dropScreenShow = true;
				this.selectH = this.dropScreenShow ? this.numSwitch(this.attrData.length) : 0;
				this.$set(this.attrArray[index], "isActive", !this.attrArray[index].isActive)
				// this.scrollTop = 1;
				// this.$nextTick(() => {
				// 	this.scrollTop = 0
				// });
				if (isActive) {
					this.$set(this.attrArray[index], "isActive", false)
					this.selectH = 0;
					this.dropScreenShow = false;
				}
			},
			
			/* 筛选下拉关闭事件 */
			hideDropdownList() {
				let obj = this.attrArray[this.attrIndex]
				this.$set(obj,"isActive", false)
				this.attrIndex = -1;
				this.selectH = 0;
				this.dropScreenShow = false;
			},
			/* 筛选下来子项选择事件 */
			dropdownItem(e) {
				let attrindex = this.attrIndex;
				let index = e.currentTarget.dataset.index;
				let attrName = "";
				for (let i = 0;i < this.attrData.length; i++) {
					if (i == index) {
						this.attrData[i].selected = true;
						attrName = this.attrData[i].name;
					} else {
						this.attrData[i].selected = false;
					}
				}
				let obj = this.attrArray[attrindex]
				if (obj.selectName == attrName) {
					return false;
				}
				if (attrindex == 2) {
					switch (attrName){
						case '大图模式':
							this.isBigMode = true;
							break;
						case '小图模式':
							this.isBigMode = false;
							break;
						default:
							break;
					}
				}
				this.$set(obj,"selectName", attrName)
				this.$set(obj,"isActive", false)
				this.attrIndex = -1;
				this.selectH = 0;
				this.dropScreenShow = false;
			},
			
			/* 顶部筛选下拉展开事件 */
			iconDropChange() {
				this.show = !this.show;
			},
			/* 顶部筛选下拉关闭事件 */
			handleClose() {
				this.show = false;
			},
			/* 查看产品详情 */
			checkDetail() {
				uni.navigateTo({
					url: '/pages/detail/detail'
				})
			}
		},
		created() {

		},
		mounted() {

		},
	}
</script>

<style lang="scss">
	page {
		background: #f7f7f7;
	}
	
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	/* 隐藏scroll-view滚动条*/
	
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
	
	.qf-header-box {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		background: #fff;
		z-index: 99998;
	}
	.qf-header-box.flxed,.qf-header-screen.flxed{
		width: 100%;
		position: fixed;
		top: 0;
	}
	.qf-searchbox{
		width: 100%;
		height: 32px;
		font-size: 14px;
		color: #999;
		flex: 1;
		display: flex;
		align-items: center;
		margin: 0 30rpx;
	}
	.qf-searchbox icon {
		margin: 0 12rpx;
	}
	.qf-searchbox input {
		flex: 1;
		padding-right: 30rpx;
		background-color: transparent;
	}
	
	/* screen */
	.qf-header-screen{
		z-index: 1024;
		background: #fff;
	}
	.qf-screen-top,.qf-screen-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		color: #333;
	}
	.qf-screen-top {
		height: 80rpx;
		padding: 0 30rpx;
		background: #fff;
		position: relative;
	}
	.qf-top-item {
		flex: 1;
		width: 0;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top: 1px solid #999;
		border-bottom: 1px solid #999;
		border-right: 1px solid #999;
		&:first-child {
			border-left: 1px solid #999;
		}
	}
	
	.qf-screen-bottom {
		height: 88rpx;
		padding: 0 30rpx;
		background: #fff;
		position: relative;
	}
	.qf-bottom-item {
		flex: 1;
		width: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 12rpx;
		background: #f7f7f7;
		margin-right: 20rpx;
		height: 60rpx;
		border-radius: 40rpx;
	}
	.qf-bottom-item:last-child {
		margin-right: 0;
	}
	.qf-bottom-text{
		// line-height: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.qf-bottomitem-active {
		color: #e41f19;
	}
	
	/* 中部筛选下拉选择器 */
	.qf-dropdownlist{
		position: absolute;
		left: 0;
		top: 88rpx;
		width: 100%;
		background: #fff;
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
		overflow: hidden;
		visibility: hidden;
		transition: all 0.2s ease-in-out;
		z-index: 999;
	}
	.qf-dropdownlist-show {
		visibility: visible;
	}
	.qf-scroll-box{
		width: 100%;
		height: 100%;
	}
	.qf-dropdownlist-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: -1;
		transition: all 0.2s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}
	.qf-mask-show {
		opacity: 1;
		visibility: visible;
	}
	.qf-dropdownlist-item{
		color: #333;
		height: 80rpx;
		font-size: 28rpx;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	/* 顶部下来筛选选择器 */
	.qf-top-dropdown {
		height: 480rpx;
		background: #f7f7f7;
	}
	.qf-dropdown-box {
		width: 100%;
		position: fixed;
		box-sizing: border-box;
		border-bottom-right-radius: 24upx;
		border-bottom-left-radius: 24upx;
		transform: translateZ(0);
		overflow: hidden;
		visibility: hidden;
		transition: all 0.3s ease-in-out;
		z-index: 989;
		top: 0;
	}
	.qf-dropdown-show {
		visibility: visible;
	}
	.qf-dropdown-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 986;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}
	.qf-dropmask-show{
		opacity: 1;
		visibility: visible;
	}
	
	.qf-bold {
		font-weight: bold;
	}
	.qf-active {
		color: #e41f19;
	}
	.qf-icon-ml .qf-icon-class{
		margin-left: 6rpx;
		font-size: 28rpx;
		line-height: 1;
	}
	.qf-icon-middle .qf-icon-class {
		vertical-align: middle;
	}
	.qf-ml {
		margin-left: 6rpx;
	}
	
	/* 商品列表 */
	.qf-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.qf-product-container {
		flex: 1;
		margin-right: 10rpx;
		&:last-child {
			margin-right: 0;
		}
	}
	.qf-product-item {
		width: 100%;
		margin-bottom: 15rpx;
		background: #fff;
		border-radius: 12rpx;
		overflow: hidden;
		transition: all 0.15s ease-in-out;
	}
	.qf-product-item-small {
		width: 49%;
		margin-bottom: 15rpx;
		background: #fff;
		border-radius: 12rpx;
		overflow: hidden;
		transition: all 0.15s ease-in-out;
		margin-right: 2%;
		&:nth-child(even) {
			margin-right: 0;
		}
	}
	.qf-flex-list {
		display: flex;
		margin-bottom: 1rpx !important;
	}
	.qf-product-img {
		width: 100%;
		display: block;
	}
	.qf-product-imgItem {
		width: 240rpx;
		height: 240rpx !important;
		flex-shrink: 0;
		border-radius: 12rpx;
	}
	.qf-product-content {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		padding: 20rpx;
	}
	.qf-product-title {
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
</style>
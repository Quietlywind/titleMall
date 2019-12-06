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
			<view class="qf-screen-top">
				
			</view>
			<view class="qf-screen-bottom">
				<view class="qf-bottom-item qf-icon-ml" v-for="(item, index) in attrArray" :key="index"
					:class="[item.isActive?'qf-active qf-bold':'']"
					:data-index="index" 
					:data-isactive="item.isActive"
					@tap="screen">
					<view class="qf-bottom-text">
						{{item.selectName}}
						<!-- {{item.isActive?item.selectName:item.name}} -->
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
		</view>
		<!-- screen-筛选区域 -->
		
		<!-- list-列表 -->
		
		<!-- list-列表 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				pageIndex: 1,
				selectedName1: "全城",
				selectedName2: "默认推荐",
				selectedName3: "小图模式",
				tabIndex: null, //顶部筛选索引
				selectH: 0,
				attrData: [],
				attrIndex: -1,
				dropScreenShow: false,
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
							{ name: "附近优先",selected: false },
							{ name: "最新上架",selected: false }
						],
					},
					{ name: "小图模式", selectName: "小图模式", isActive: false,
						list: [
							{ name: "小图模式", selected: true },
							{ name: "大图模式",selected: false }
						],
					}
				]
			}
		},
		onLoad() {
		},
		onShow() {

		},
		components: {

		},
		computed: {

		},
		methods: {
			/* 搜索框事件 */
			searchIcon(e) {
				let key = e.detail.value;
			},
			
			/* 筛选下拉打开事件 */
			screen(e) {
				this.attrArray.forEach(i => {
					i.isActive = false;
				})
				let index = e.currentTarget.dataset.index;
				let isActive = e.currentTarget.dataset.isactive;
				// let arr = JSON.parse(JSON.stringify(this.attrArray[index].list));
				this.attrData = this.attrArray[index].list;		
				this.attrIndex = index;
				this.dropScreenShow = !this.dropScreenShow;
				this.selectH = this.dropScreenShow ? 246 : 0;
				this.$set(this.attrArray[index], "isActive", !this.attrArray[index].isActive)
				if (isActive) {
					this.$set(this.attrArray[index], "isActive", false)
					this.dropScreenShow = false;
				}
			},
			/* 筛选下拉关闭事件 */
			hideDropdownList() {
				this.dropScreenShow = false;
				this.attrIndex = -1;
				this.selectH = 0
			},
			/* 筛选下来子项选择事件 */
			dropdownItem(e) {
				let attrindex = this.attrIndex;
				let index = e.currentTarget.dataset.index;
				let attrName = "";e;
				for (let i = 0;i < this.attrData.length; i++) {
					if (i == index) {
						this.attrData[i].selected = true;
						attrName = this.attrData[i].name;
					} else {
						this.attrData[i].selected = false;
					}
				}
				let obj = this.attrArray[attrindex]
				this.$set(obj,"selectName", attrName)
				this.$set(obj,"isActive", false)
				this.selectH = 0;
				this.dropScreenShow = false;
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
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.qf-bottomitem-active {
		color: #e41f19;
	}
	
	/* 顶部筛选下拉选择器 */
	.qf-dropdownlist{
		position: absolute;
		left: 0;
		top: 88rpx;
		width: 100%;
		// height: 246rpx;
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
		height: 60rpx;
		font-size: 28rpx;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	
	.qf-bold {
		font-weight: bold;
	}
	.qf-active {
		color: #e41f19;
	}
	.qf-icon-ml .qf-icon-class{
		line-height: 1;
		margin-left: 6rpx;
		font-size: 28rpx;
	}
	.qf-icon-middle .qf-icon-class {
		vertical-align: middle;
	}
	.qf-ml {
		margin-left: 6rpx;
	}
</style>
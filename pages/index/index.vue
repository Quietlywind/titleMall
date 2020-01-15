<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">我的小商城</block>
		</cu-custom>
		<!-- <view class="content">
			<image class="logo" src="/static/logo.png"></image>
			<view class="text-area">
				<text class="title">{{title}}</text>
			</view>
		</view> -->
		<view class="container">
			<view class="banner-swiper">
				<swiper class="banner" :interval="5000" :duration="800" 
				autoplay circular indicator-dots indicator-color="rgba(245,245,245,.5)"
				indicator-active-color="#e54d42" @change="swiperChange">
					<swiper-item v-for="(item, index) in bannerList" :key="index" class="banner-item">
						<image :src="item.pic" />
						<view class="banner-item-type" :style="{backgroundColor: item.titleColor == 'blue' ? 'SteelBlue' : item.titleColor }">
							{{swiperTitle}}
						</view>
					</swiper-item>
				</swiper>
			</view>
			
			<view class="cate-section b-b">
				<view class="cate-item" @tap="goDetailPage('every-recommend')">
					<view class="cate-item-radius text-center qficon qf-rili">
						<text class="now-today">{{new Date().getDate()}}</text>
					</view>
					<text class="cate-item-text">每日推荐</text>
				</view>
				<view class="cate-item" @tap="goDetailPage('playlist')">
					<view class="cate-item-radius text-center qficon qf-gedan"></view>
					<text class="cate-item-text">歌单</text>
				</view>
				<view class="cate-item" @tap="goDetailPage('rank-list')">
					<view class="cate-item-radius text-center qficon qf-paixingbang"></view>
					<text class="cate-item-text">排行榜</text>
				</view>
				<view class="cate-item" @tap="goDetailPage('radio')">
					<view class="cate-item-radius text-center qficon qf-yinle"></view>
					<text class="cate-item-text">电台</text>
				</view>
				<view class="cate-item" @tap="goDetailPage('live')">
					<view class="cate-item-radius text-center qficon qf-zhibohuifang"></view>
					<text class="cate-item-text">直播</text>
				</view>
			</view>
			
			<view class="recommend">
				<view class="recommend-sction margin-bottom-sm">
					<view class="text-black text-bold">推荐歌单</view>
					<button hover-class="none" class="cu-btn round sm line-gray">
						<text class="text-black">歌单广场</text>
					</button>
				</view>
				<view class="recommend-list">
					<view class="recommend-item padding-bottom" v-for="(i,index) in recommendList" :key="index">
						<view class="recommend-item-img">
							<image :src="i.picUrl"></image>
						</view>
						<view class="padding-top-xs">
							<text class="text-ellipsis-more text-xs">{{i.name}}</text>
						</view>
						<view class="recommend-item-statistics">
							<text class="text-bold statistics-icon">▷</text>
							<text>{{transformNum(i.playCount)}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="new-dish">
				<view class="grid justify-between align-center margin-bottom-sm">
					<view class="flex align-end">
						<view :class="[dishFlag ? 'dish-type' : 'dish-default']" @tap="dishChange">新碟</view>
						<text class="action-line"></text>
						<view :class="[!dishFlag ? 'dish-type' : 'dish-default','self-end']" @tap="dishChange">新歌</view>
					</view>
					<button hover-class="none" class="cu-btn round sm line-gray">
						<text class="text-black">{{dishFlag ? '更多新碟' : '新歌推荐'}}</text>
					</button>
				</view>
				<view class="recommend-list" v-show="dishFlag">
					<view class="recommend-item padding-bottom" v-for="(i,index) in 3" :key="index">
						<view class="recommend-item-img">
							<image :src="albumsList[i].picUrl"></image>
						</view>
						<view class="padding-top-xs">
							<view class="text-ellipsis text-xs" style="line-height: 1.5;">{{albumsList[i].name}}</view>
							<view class="text-cut text-gray atrists-name">
								<text v-for="(j,idx) in albumsList[i].artists">
									{{j.name}}
								</text>
							</view>
						</view>
					</view>
				</view>
				<view class="recommend-list" v-show="!dishFlag">
					<view class="recommend-item padding-bottom" v-for="(i,index) in 3" :key="index">
						<view class="recommend-item-img">
							<image :src="newsongList[i].picUrl"></image>
						</view>
						<view class="padding-top-xs">
							<view class="text-cut text-xs" style="line-height: 1.5;">{{newsongList[i].name}}</view>
							<view class="text-cut text-gray atrists-name">
								{{newsongList[i].authors}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view> 
</template>

<script>
	import { baseUrl } from "../../common/api";
	export default {
		data() {
			return {
				title: 'Hello',
				bannerList: [],
				swiperTitle: '',
				swiperColor: '',
				recommendList: [],
				dishFlag: true,
				albumsList:[],
				newsongList: [],
				navigateFlag: false,
			}
		},
		onLoad() {
			uni.request({
				url: baseUrl+"/banner",
				data:{
					type: 1
				},
				success: (res) => {
					let { data } = res;
					if (data.code == 200) {
						// console.log(data.banners)
						this.bannerList = data.banners;
						this.swiperTitle = data.banners[0].typeTitle;
						this.swiperColor = data.banners[0].titleColor;
					}
				},
				fail: (err) => {
					// console.log(err)
				},
				complete: (res) => {
					// console.log(res)
				}
			})
			this.recommendSel()
			this.albumNew()
			this.songNew()
		},
		methods: {
			transformNum(val) {
				let value = val.toString().length
				switch (true){
					case value<=5:
						return val
						break;
					case value==6:
						return val.toString().substr(0,2)+"万"
						break;
					case value==7:
						return val.toString().substr(0,3)+"万"
						break;
					case value==8:
						return val.toString().substr(0,4)+"万"
						break;
					case value==9:
						return val.toString().substr(0,1)+"."+val.toString().substr(1,1)+"亿"
						break;
					case value==10:
						return val.toString().substr(0,2)+"亿"
						break;
					default:
						break;
				}
			},
			
			/* banner切换监听 */
			swiperChange(e) {
				let index = e.detail.current;
				this.swiperTitle = this.bannerList[index].typeTitle;
				this.swiperColor = this.bannerList[index].titleColor;
			},
			
			/* 推荐歌单请求 */
			recommendSel() {
				uni.request({
					url: baseUrl+"/personalized",
					data:{
						limit: 6
					},
					success: (res) => {
						let { data } = res;
						if (data.code == 200) {
							this.recommendList = data.result;
						}
					},
					fail: (err) => {
						// console.log(err)
					},
					complete: (res) => {
						// console.log(res)
					}
				})
			},
			
			/* 新碟/新歌切换 */
			dishChange() {
				this.dishFlag = !this.dishFlag;
			},
			
			/* 获取最新专辑 */
			albumNew() {
				uni.request({
					url: baseUrl+"/album/newest",
					data:{},
					success: (res) => {
						let { data } = res;
						if (data.code == 200) {
							this.albumsList = data.albums
							// console.log(data.albums)
						}
					},
					fail: (err) => {
						// console.log(err)
					},
					complete: (res) => {
						// console.log(res)
					}
				})
			},
			
			/* 获取新歌 */
			songNew() {
				uni.request({
					url: baseUrl+"/personalized/newsong",
					data:{},
					success: (res) => {
						let { data } = res;
						if (data.code == 200) {
							data.result.map((i, index) => {
								i.authors = "";
								i.song.artists.forEach((j ,idx) => {
									i.authors += j.name+ '/';
								})
								i.authors = i.authors.substr(0,i.authors.length - 1)
							})
							this.newsongList = data.result
							// console.log(data.result)
						}
					},
					fail: (err) => {
						// console.log(err)
					},
					complete: (res) => {
						// console.log(res)
					}
				})
			},
			
			/* gotoPage */
			goDetailPage(path) {
				if (this.navigateFlag) {
					return;
				}
				this.navigateFlag = true;
				uni.navigateTo({
					url: '/pages/cloud-music/' + path + '/' + path
				});
				setTimeout(() => {
					this.navigateFlag = false;
				}, 200)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
	
	.banner-swiper {
		position: relative;
		padding-top: 10px;
	}
	.banner {
		width: 100%;
		height: 270rpx;
		&-item {
			width: 100%;
			height: 100%;
			padding: 0 30rpx;
			overflow: hidden;
		}
		image {
			width: 100%;
			height: 100%;
			border-radius: 15rpx;
		}
	}
	.banner-item-type {
		position: absolute;
		right: 30rpx;
		bottom: 0;
		padding: 8rpx 12rpx;
		color: #FFFFFF;
		font-size: $font-sm - 4;
		border-top-left-radius: 15rpx;
		border-bottom-right-radius: 15rpx;
	}
	.cate-section {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 30rpx;
		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.cate-item-radius {
			position: relative;
			width: 86rpx;
			height: 86rpx;
			line-height: 86rpx;
			border-radius: 50%;
			font-size: 44rpx;
			color: #FFFFFF;
			background-color: #FF382B;
			.now-today {
				font-size: 19rpx;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -44%);
			}
		}
		.cate-item-text {
			font-size: 20rpx;
			padding-top: 15rpx;
		}
	}
	.recommend {
		padding: 30rpx;
	}
	.recommend-sction {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.song-square {			
			color: #000000;
		}
		.cu-btn.sm {
			height: 38rpx;
			line-height: 38rpx;
		}
	}
	.recommend-list {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.recommend-item {
			position: relative;
			display: flex;
			flex-direction: column;
			width: calc((100% - 40rpx)/3);
		}
		.recommend-item-img {
			width: 100%;
			height: 220rpx;
			image {
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
		}
		.recommend-item-statistics {
			position: absolute;
			top: 5rpx;
			right: 10rpx;
			color: #FFFFFF;
			font-size: 20rpx;
			.statistics-icon {
				padding-right: 5rpx;
				font-size: 16rpx;
			}
		}
	}
	
	.new-dish {
		padding: 30rpx;
		.cu-btn.sm {
			height: 38rpx;
			line-height: 38rpx;
		}
	}
	.dish-type {
		font-weight: bold;
	}
	.dish-default {
		font-size: 24rpx;
		color: #aaaaaa;
	}
	.action-line{
		width: 1px;
		height: 26rpx;
		background: rgba(170, 170, 170, 0.8);
		margin: 0 15rpx;
		transform: scaleX(0.5);
		align-self: center;
	}
	.atrists-name {
		font-size: 19rpx;
		line-height: 1.5;
	}
</style>

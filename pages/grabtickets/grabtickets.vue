<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">我的小商城</block>
		</cu-custom>
		<!-- 套餐明细 -->
		<view class="qf-meal-box bg-white">
			<view class="qf-coupon-item">
				<image class="coupon-img" :src="image" mode="aspectFill"></image>
				<view class="right">
					<text class="title text-ellipsis-more">{{title}}</text>
				</view>
			</view>
			<view class="qf-choice-coupon" v-if="type == 2">选择套餐</view>
			<view class="qf-meal-operation">
				<view class="" v-if="type ==1">
					<view class="qf-meal-item margin-bottom-xs">
						<view class="qf-number-left">
							<text>单价：￥{{taPrice}}.00（库存{{stockA}}）</text>
						</view>
						<!-- <view class="qf-number-center" style="flex: 1;">
							购买数量：
						</view> -->
						<view class="qf-number-right" style="display: flex; align-items: center;">
							<text>购买数量：</text>
							<uni-number-box :value="mealValA" :min="1" :max="stockA" @change="mealChange"/>
						</view>
					</view>
				</view>
				<view class="" v-else-if="type == 2">
					<view class="qf-meal-item margin-bottom-xs">
						<view class="qf-number-left">
							<text>套餐A（库存{{stockA}}）</text>
						</view>
						<view class="qf-number-center" style="flex: 1;padding-left: 8%;">
							￥{{taPrice}}.00
						</view>
						<view class="qf-number-right">
							<uni-number-box :value="mealValA" :min="1" :max="stockA" @change="mealChange"/>
						</view>
					</view>
					<view class="qf-meal-item margin-bottom-xs">
						<view class="qf-number-left">
							<text>套餐B（库存{{stockB}}）</text>
						</view>
						<view class="qf-number-center" style="flex: 1;padding-left: 8%;">
							￥{{tbPrice}}.00
						</view>
						<view class="qf-number-right">
							<uni-number-box :value="mealValB" :min="1" :max="stockA" @change="mealChange"/>
						</view>
					</view>
				</view>
				<view class="qf-solid b-b margin-bottom margin-top"></view>
			</view>
			<view class="qf-order-detail">
				<view class="qf-order-item qf-line-height">
					订单编号：<text>201929472974391234</text>
				</view>
				<view class="qf-order-item qf-line-height">
					抢券时间：<text>2019-09-01 20:00:00</text>
				</view>
				<view class="qf-order-item" style="line-height: 1.5;">
					订单备注：<textarea placeholder="给自己的订单留个备注哦，方便以后查看" style="flex: 1;"/>
				</view>
			</view>
			<view class="qf-order-submit">
				<button class="cu-btn bg-blue round margin-bottom" style="width: 180rpx;" @tap="mealSubmit">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box'
	export default {
		data() {
			return {
				type: 2,
				image: 'https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg',
				title: '【京华城RMall店】就是这么任性！免费领养！！！邀请您参加免费送猫！就是这么任性！免费领养！！！！l',
				stockA: 1000,
				stockB: 1000,
				taPrice: 50,
				tbPrice: 100,
				mealValA: 1,
				mealValB: 1,
			}
		},
		onLoad(e) {	
			this.type = e.type;
		},
		onShow() {

		},
		components: {
			uniNumberBox
		},
		computed: {

		},
		methods: {
			mealChange(value) {
				// console.log(value)
			},
			mealSubmit() {
				uni.navigateTo({
					url: '/pages/coupon_success/coupon_success'
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
	.qf-meal-box {
		padding: 0 30rpx;
	}
	.qf-coupon-item {
		padding: 20rpx 0;
		display: flex;
		align-items: center;
		.coupon-img{
			display: block;
			width: 120rpx;
			height: 120rpx;
		}
		.right{
			flex: 1;
			padding:0 30rpx;
			.title{
				font-size: $font-base;
			}
		}
	}
	.qf-choice-coupon {
		font-size: $font-base;
		color: $uni-text-color;
		padding-bottom: 10rpx;
	}
	.qf-meal-operation {
		display: flex;
		flex-direction: column;
	}
	.qf-solid {
		position: relative;
	}
	.qf-solid.b-b:after{
		border-bottom: 1px solid #333;
	}
	.qf-meal-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.qf-order-detail {
		margin-bottom: 20rpx;
		color: $uni-text-color;
	}
	.qf-order-item {
		display: flex;
		font-size: $font-base;
		margin: 6rpx 0;
		textarea{
			font-size: 28rpx;
			height: 120rpx;
		}
	}
	.qf-order-submit {
		text-align: center;
	}
</style>
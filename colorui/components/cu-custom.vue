<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" v-if="isBack">
					<!-- <text class="cuIcon-back"></text>
					<slot name="backText"></slot> -->
					<view class="action-section" :style="actionStyle">
						<text class="cuIcon-back" style="font-size: 17px;" @tap="BackPage"></text>
						<text class="action-line"></text>
						<text class="cuIcon-homefill" style="font-size: 17px;" @tap="BackHome"></text>
					</view>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			},
			actionStyle() {
				let customWidth = this.Custom.width;
				let customHeight = this.Custom.height;
				let style = `width:${customWidth}px;height:${customHeight}px;line-height:${customHeight}px;`;
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			}
		},
		methods: {
			BackPage() {
				if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
					let url = '/' + __wxConfig.pages[0]
					return uni.redirectTo({url})
				}
				uni.navigateBack({
					delta: 1
				});
			},
			BackHome() {
				uni.switchTab({
					url: '../../pages/index/index'
				})
			}
		}
	}
</script>

<style>
	.action-section{
		display: flex;
		align-items: center;
		justify-content:center;
		border: .5px solid rgba(255, 255, 255, .2);
		border-radius: 20px;
		background-color: rgba(0, 0, 0, .1);
	}
	.action-line{
		width: 1px;
		height: 18px;
		background: rgba(255, 255, 255, .5);
		margin: 0 20rpx;
		transform: scaleX(0.5);
	}
</style>

<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的小商城</block>
		</cu-custom>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(option) {
			console.log(option.type)
			console.log(1)
		},
		onShow() {
			console.log(2)
		},
		components: {

		},
		computed: {

		},
		methods: {

		},
		created() {
			console.log(3)
		},
		mounted() {
			console.log(4)
		},
	}
</script>

<style scoped>

</style>
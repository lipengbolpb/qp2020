<template>
	<view class="content">
		<go-back :style="{'top':safeAreaTop}"></go-back>
		<image :src="ruleUrl" mode="widthFix" @load="imgLoad"></image>
	</view>
</template>

<script>
	import goBack from '@/components/back.vue';
	export default {
		data() {
			return {
				ruleUrl: getApp().globalData.imgUrl + '/privacy.png',
				safeAreaTop:getApp().globalData.safeAreaTop?getApp().globalData.safeAreaTop+'px':'64rpx'
			}
		},
		onLoad(options) {
			uni.showLoading({
				title: ''
			})
			if (options.ruleUrl) {
				this.ruleUrl = options.ruleUrl;
			}
		},
		methods: {
			imgLoad(e) {
				if (e.detail) {
					uni.hideLoading()
				}
			}
		},
		components: {
			goBack
		}
	}
</script>

<style lang="scss">
	.content {
		overflow: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;

		image {
			width: 100%;
			display: block;
		}
	}
</style>

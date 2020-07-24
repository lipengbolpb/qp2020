<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			}
		},
		onLoad(options) {
			if(options&&options.type=='send'){
				this.src='https://smp.tsingtao.com.cn/yhb2/hunan.html?cache=1.01';
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

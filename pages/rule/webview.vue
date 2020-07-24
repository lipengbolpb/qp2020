<template>
	<view>
		<web-view :src="rule"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rule:''
			}
		},
		onLoad(options) {
			switch (options.provinceCode){
				case 'AH'://安徽
					this.rule = 'https://xcxsite.vjifen.com/v/rule/ahRule.html';
					break;
				case 'HP'://河南瓶装
					this.rule = 'https://xcxsite.vjifen.com/v/rule/hnpzRule.html';
					break;	
				case 'U'://华南
					this.rule = 'https://xcxsite.vjifen.com/v/rule/hnRule.html';
					break;	
				case 'Q'://重庆
					this.rule = 'https://xcxsite.vjifen.com/v/rule/cqRule.html';
					break;
				case 'I'://江西
					this.rule = 'https://xcxsite.vjifen.com/v/rule/jxRule.html';
					break;
				case 'N'://湖南
					this.rule = 'https://xcxsite.vjifen.com/v/rule/csRule.html';
					break;
				case 'F'://福建
					this.rule = 'https://xcxsite.vjifen.com/v/rule/fjRule.html';
					break;				
				default:
					break;
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

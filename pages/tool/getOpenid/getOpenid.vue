<template>
	<view>
		<web-view :src="src" @message="getOpenid"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:'',
				payAppid:''
			}
		},
		onLoad(options) {
			console.log(this.$Store.state.wxUrl)
			if (options && options.type == 'hbopenid') {
				if(options.appid!='undefined'||!options.appid){
					this.payAppid = options.appid;
					this.src = `${this.$Store.state.wxUrl}/wx3/u2mpFromSg?appid=${options.appid}`;
				}else{
					this.src = `${this.$Store.state.wxUrl}/wx3/u2mpFromSg?appid=${this.$Store.state.payAppid}`;
				}
				this.type = 'hbopenid';
			} else if(options && options.type == 'vjfOpenid') {
				this.src = `${this.$Store.state.wxUrl}/wx3/u2mpFromSg?appid=${this.$Store.state.vjfAppid}`;
				this.type = 'vjfOpenid';
			} else {
				this.src = `${this.$Store.state.wxUrl}/wx3/u2mpFromSg?appid=${this.$Store.state.appid}`;
				this.type = 'openid';
			}
		},
		methods: {
			getOpenid(e) {
			    if (e.detail && e.detail.data[0].openid) {
			      if (this.type == 'hbopenid') {
			        getApp().globalData.hbopenid = e.detail.data[0].openid;
					let key = 'hbopenid_';
					if(this.payAppid){
						key += this.payAppid
					}else{
						key += this.$Store.state.payAppid
					}
			        uni.setStorage({
			          key: key,
			          data: {
			            hbopenid: e.detail.data[0].openid
			          },
			        })
			      } else if(this.type == 'vjfOpenid'){
					  getApp().globalData.vjfOpenid = e.detail.data[0].openid;
					  uni.setStorage({
					    key: 'vjfOpenid',
					    data: {
					      vjfOpenid: e.detail.data[0].openid
					    },
					  })
				  } else {
			        getApp().globalData.openid = e.detail.data[0].openid;
			        uni.setStorage({
			          key: 'openid',
			          data: {
			            openid: e.detail.data[0].openid
			          },
			        })
			      }
			    }
			  }
		}
	}
</script>

<style>

</style>

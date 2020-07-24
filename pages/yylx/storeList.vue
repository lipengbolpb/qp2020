<template>
	<view class="content">
		<view class="mask" v-if="needLocation" style="z-index: 1;">
			<view class="opensetting">
				<view class="head">
					<image :src="imgUrl+'/xcxhead.png?v=1'" class="headimg"></image>
					<text>扫码乐享青啤好礼</text> <text>申请</text>
					<image :src="imgUrl+'/icon_close_1.png'" class="close" @click="cancel"></image>
				</view>
				<view class="loc_content">
					<text>获取您的地理位置信息</text>
					<text>获取地理位置可以给你提供更好的服务</text>
				</view>
				<button @click="openset" class="set">进行授权</button>
			</view>
		</view>
		<view class="location_fail" v-if="noLocation">
			<image :src="imgUrl+'/yylx/location.jpg'" mode="widthFix" @click="closeTip"></image>
		</view>
		<view class="search_box">
			<view class="address">
				<input type="text" :value="pickerText" @click="openAddres" placeholder="选择地区" disabled/>
				<input type="text" :value="address" @input="inputAddress" placeholder="输入地址寻找附近门店"/>
			</view>
			<button class="search" @click="search"></button>
		</view>
		<view class="storeList">
			<view class="store" v-for="(item,index) in storeList" :key="index" @click="openMap(index)">
				<view class="storeName">
					{{item.terminalName}}<text v-if="item.distance">(距您{{parseInt(item.distance)}}米)</text>
				</view>
				<text>地址:{{item.province}}{{item.city}}{{item.county}}{{item.address}}</text>
			</view>
		</view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#007AFF'></simple-address>
	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.nvue';
	import transformLocation from '@/utils/utils.js';
	export default {
		data() {
			return {
				pickerText: '',
				cityPickerValueDefault: [0, 0, 0],
				address:"",
				storeList:'',
				canUseMap:true,
				needLocation: false,
				againCLick: false,
				noLocation: false,
				imgUrl:getApp().globalData.imgUrl
			}
		},
		onShow() {
			if(getApp().globalData.longitude){
				this.autoSearch();
			}else{
				this.$Store.dispatch('getLocation').then(res => {
					let [e, r] = res;
					if (r) { 
						console.log(r)
						getApp().globalData.latitude = r.latitude;
						getApp().globalData.longitude = r.longitude;
						this.autoSearch();
					} else {
						console.log(e)
						if (e.errMsg == 'getLocation:fail authorize no response' ||
							e.errMsg == 'getLocation:fail auth deny' ||
							e.errMsg == 'getLocation:fail:auth denied') {
							this.needLocation = true;
						} else {
							this.noLocation = true;
						}
					}
				})
			}
		},
		methods: {
			autoSearch(){
				uni.request({
					url:this.$Store.state.requestUrl_lx+'/terminal/queryTerminalByCoordinate',
					method: 'POST',
					data:{
						"companyKey":this.$Store.state.companyKey,
						"longitude":getApp().globalData.longitude,
						"latitude":getApp().globalData.latitude,
						"currentPage":1,
						"count":20
					}
				}).then(res=>{
					console.log(res)
					let [e,r] = res;
					if(r){
						this.storeList = r.data.reply.terminalAry
					}
				})
			},
			search(){
				if(this.pickerText==''){
					uni.showModal({
						title: "提示",
						content: '请选择地区！~',
						showCancel: false
					})
				}else{
					this.canUseMap = false;
					uni.request({
						url:this.$Store.state.requestUrl_lx+'/terminal/queryTerminalList',
						method: 'POST',
						data:{
							"queryType":0,
							"companyKey":this.$Store.state.companyKey,
							"province":this.pickerText.split('-')[0],
							"city":this.pickerText.split('-')[1]=='市辖区'?this.pickerText.split('-')[0]:this.pickerText.split('-')[1],
							"county":this.pickerText.split('-')[2],
							"address":this.address.replace(/\s+/g,""),
							"terminalName":this.address.replace(/\s+/g,"")
						}
					}).then(res=>{
						console.log(res)
						let [e,r] = res;
						if(r){
							if(r.data.reply&&r.data.reply.searchNum>0){
								this.storeList = r.data.reply.terminalAry;
							}else{
								this.storeList = '';
								uni.showModal({
									title: "提示",
									content: r.data.result.msg?r.data.result.msg:'没有符合条件的门店',
									showCancel: false
								})
							}
						}else{
							uni.showModal({
								title: "提示",
								content: '系统繁忙，稍后再试！~',
								showCancel: false
							})
						}
					}).catch(err=>{
						console.log(err)
						uni.showModal({
							title: "提示",
							content: '系统繁忙，稍后再试！~',
							showCancel: false
						})
					})
				}
				
			},
			openAddres() {
				this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				this.pickerText = e.label
			},
			inputAddress(e){
				this.address = e.detail.value;
			},
			openMap(index){
				let result = transformLocation.transformFromWGSToGCJ(Number(this.storeList[index].latitude),Number(this.storeList[index].longitude));
				uni.openLocation({
					"longitude":result.longitude,					"latitude":result.latitude,
					complete:(res)=>{
						console.log(res)
					}
				})
			},
			openset() {
				this.needLocation = false;
				uni.openSetting();
			},
			cancel() { //取消 直接调用扫码接口
				this.needLocation = false;
			},
			closeTip() {
				this.noLocation = false;
			}
		},
		components:{
			simpleAddress
		}
	}
</script>

<style lang="scss">
	.content{
		background-color: #f2f2f2;
		overflow: auto;
		overflow-x: hidden;
		.search_box{
			display: flex;
			padding: 0 40rpx;
			align-items: center;
			justify-content: space-between;
			.address input{
				width: 540rpx;
				height: 70rpx;
				background-color: #FFFFFF;
				border-radius: 35rpx;
				font-size: 26rpx;
				color: #000;
				margin-top: 20rpx;
				padding-left: 90rpx;
				box-sizing: border-box;
			}
			.search{
				padding: 0;
				margin: 0;
				width: 110rpx;
				height: 70rpx;
				background: url($bgUrl+'/yylx/button_search.png') no-repeat center;
				background-size: 100% auto;
			}
		}
	}
	.storeList{
		width: 100%;
		padding: 0 40rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		margin-top: 20rpx;
		.store{
			border-bottom: 1px #e5e5e5 solid;
			background: url($bgUrl+'/yylx/icon_right.png') no-repeat right;
			background-size: 20rpx auto;
			padding: 25rpx 0;
			.storeName{
				color: #000;
				font-size: 30rpx;
				text{
					font-size:26rpx;
				}
			}
			>text{
				font-size: 22rpx;
				color: #979797;
			}
		}
		.store:nth-last-of-type(1){
			border: 0;
		}
	}
	view.opensetting {
		width: 100%;
		height: 500rpx;
		background: #fff;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	
	view.opensetting .head {
		height: 120rpx;
		line-height: 120rpx;
		display: flex;
		color: #333;
		position: relative;
	}
	
	view.opensetting .head image.headimg {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin: 30rpx 0 30rpx 30rpx;
	}
	
	view.opensetting .head image.close {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 40rpx;
		right: 40rpx;
	}
	
	view.opensetting .head text {
		padding: 0 20rpx;
	}
	
	view.opensetting .loc_content text:nth-of-type(1) {
		font-size: 40rpx;
		color: #000;
		font-weight: bold;
		padding: 30rpx;
	}
	
	view.opensetting .loc_content text:nth-of-type(2) {
		font-size: 30rpx;
		padding: 0 30rpx;
		color: #333;
		line-height: 80rpx;
		display: block;
	}
	
	view.opensetting>button {
		width: 400rpx;
		height: 85rpx;
		background: #04c05f;
		display: block;
		margin: 50rpx auto;
		border-radius: 10rpx;
		color: #fff;
		font-size: 32rpx;
	}
	
	view.location_fail {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		background: rgba($color: #000000, $alpha: .8);
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	
	view.location_fail image {
		width: 80%;
		display: block;
	}
</style>

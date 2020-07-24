<template>
	<view class="content">
		<view class="template_1">
			<!-- 中奖封面 -->
			<view class="cover" v-show="!isGet&&!coverClosed&&!expireFlag">
				<image src="https://xcxsite.vjifen.com/v/static/hb2020/prize_cover.png?v=2" mode="widthFix" class="coverImg" @click="closeCover"></image>
			</view>
			<!-- template用于固定位置 -->
			<view class="template">
				<image :src="imgUrl+'/logo.png'" mode="widthFix" class="logo"></image>
				<text class="title">恭喜您获得</text>
				<image :src="prizeImg" mode="widthFix" class='prizeImg'></image>
				<image :src="imgUrl+'/icon_rule.png'" mode="widthFix" class="rule" @click="toRule"></image>
				<button class="btn_com" @click="openInput">{{isGet||expireFlag?'我 知 道 了':'立 即 领 取'}}</button>
				<text class="tip">奖品图片仅供参考</text>
				<view class="dj_tips" v-show="isGet||expireFlag">
					<text>{{expireFlag?'兑奖已过期':'您已领奖'}}</text>
				</view>
			</view>
			<view class="msg_box" v-show="writeMsg">
				<view class="">
					<view class="msglist">
						<view class="border">
							<image :src="imgUrl+'/txxx_title.png'" mode="widthFix" class="tips_tittle"></image>
							<input type="text" :value="username" placeholder="姓名" :disabled="isGet" @input="inputName"/>
							<input type="text" :value="idcard" placeholder="身份证号码" maxlength="18" :disabled="isGet" v-if="needIdcard" @input="inputIdcard"/>
							<input type="text" :value="tel" placeholder="手机号" maxlength="11" :disabled="isGet" @input="inputTel"/>
							<input type="text" :value="pickerText" @click="openAddres" placeholder="地区" disabled/>
							<input type="text" :value="address" placeholder="详细地址" :disabled="isGet" @input="inputAddress"/>
							<view class="yzcode_box" v-if="!isGet">
								<input type="text" placeholder="验证码" maxlength="4" class="yz_code" :value="yzcode" @input="inputYzm"/>
								<text @click="getVerifyCode" class="get_yz">{{sec==0?'获取验证码':sec+'秒后再次获取'}}</text>
							</view>
							<button class="btn_com" @click="submsg">{{isGet?'提 交 成 功':'提 交 信 息'}}</button>
						</view>
						<image :src="imgUrl+'/tips_bottom.png'" mode="widthFix" class="tips_bottom"></image>
					</view>
					<image :src="imgUrl+'/icon_close.png'" mode="widthFix" class="close" @click="writeMsg=false" v-show="!isGet"></image>
				</view>
			</view>
			<view class="tips_box" v-show="showTip">
				<view class="tips_msg">
					<text>信息提交成功</text>
					<button class="btn_com" @click="closeTip">我 知 道 了</button>
				</view>
			</view>
		</view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#007AFF'></simple-address>
	</view>
</template>

<script>
	let result = {};
	let coverTimer = null;
	import simpleAddress from '@/components/simple-address/simple-address.nvue';
	export default {
		data() {
			return {
				imgUrl: getApp().globalData.imgUrl,
				prizeImg:'',
				pickerText: '',
				cityPickerValueDefault: [0, 0, 0],
				writeMsg:false,
				isGet:false,
				username:'',
				address:'',
				tel:'',
				yzcode:'',
				idcard:'',
				sec:0,
				stop:false,
				showTip:false,
				needIdcard:false,//是否需要身份证号
				expireFlag:false,
				coverClosed:false,
				isEcjx:getApp().globalData.reply.doubleSurpriseFlag==1?true:false
			}
		},
		onLoad(options) {
			if(getApp().globalData.reply){
				result = getApp().globalData.reply;
				let y = result.expireTime.split('-')[0],
					m = result.expireTime.split('-')[1]-1,
					d = result.expireTime.split('-')[2];
				console.log(y,m,d);	
				console.log(Date.parse(new Date(y,m,d))+24*3600*1000);
				console.log(getApp().globalData.replyTime)
				if(Date.parse(new Date(y,m,d))+24*3600*1000<getApp().globalData.replyTime){//过期
					this.expireFlag = true;
				}
				this.isGet = (result.username && result.phonenum)?true:false;
				//确定奖项图片
				if(getApp().globalData.provinceCode=='U'){//华南
					switch (result.grandPrizeType.toUpperCase()){
						case 'U'://冰墩墩
							this.prizeImg = getApp().globalData.imgUrl+'/prize_bdd.png';
							break;
						case 'T'://青啤有一套
							this.prizeImg = getApp().globalData.imgUrl+'/prize_yyt_hn.png?v=1';
							break;
						case 'V'://huweiP30
							this.prizeImg = getApp().globalData.imgUrl+'/prize_hwp30.png';
							break;
						case 'Q'://冬奥环球之旅
							this.prizeImg = getApp().globalData.imgUrl+'/prize_hqzl.png';
							break;
						case 'R'://冬奥冰雪冬令营
							this.prizeImg = getApp().globalData.imgUrl+'/prize_dly.png';
							break;	
						default:
							uni.redirectTo({
								url: '../fail/fail'
							});
							break;
					}
				}else if(getApp().globalData.provinceCode=='AH'){//安徽
					switch (result.grandPrizeType.toUpperCase()){
						case 'S'://冰墩墩
							this.prizeImg = getApp().globalData.imgUrl+'/prize_bdd.png';
							break;
						case 'R'://青啤有一套
							this.prizeImg = getApp().globalData.imgUrl+'/prize_yyt.png?v=2';
							break;
						default:
							uni.redirectTo({
								url: '../fail/fail'
							});
							break;
					}
				}else if(getApp().globalData.provinceCode=='HP'){//河南瓶装
					switch (result.grandPrizeType.toUpperCase()){
						default:
							uni.redirectTo({
								url: '../fail/fail'
							});
							break;
					}
				}else if(getApp().globalData.provinceCode=='I'){//江西
					switch (result.grandPrizeType.toUpperCase()){
						case 'P'://冬奥环球之旅
							this.prizeImg = getApp().globalData.imgUrl+'/prize_hqzl.png';
							break;
						case 'Q'://青岛寻源之旅
							this.prizeImg = getApp().globalData.imgUrl+'/prize_xyzl.png';
							break;	
						case 'R'://冬奥冰雪冬令营1人次
							this.prizeImg = getApp().globalData.imgUrl+'/prize_dly.png';
							break;
						case 'S'://青啤有一套礼盒
							this.prizeImg = getApp().globalData.imgUrl+'/prize_yyt_hn.png?v=1';
							break;
														
						case 'T':// 6.11  新增 冰墩墩
							this.prizeImg = getApp().globalData.imgUrl+'/prize_bdd.png?v=1';
							break;
							
						default:
							uni.redirectTo({
								url: '../fail/fail'
							});
							break;
					}
				} else if(getApp().globalData.provinceCode=='Q'){//重庆
					switch (result.grandPrizeType.toUpperCase()){
						case 'Q'://金球
							this.prizeImg = getApp().globalData.imgUrl+'/prize_jq.png';
							break;	
						case 'P'://冰墩墩
							this.prizeImg = getApp().globalData.imgUrl+'/prize_bdd.png';
							break;
						default:
							uni.redirectTo({
								url: '../fail/fail'
							});
							break;
					}
				} else if(getApp().globalData.provinceCode=='F'){//福建
					switch (result.grandPrizeType.toUpperCase()){
						// case 'Q'://经典1903
						// 	this.prizeImg = getApp().globalData.imgUrl+'/prize_jq.png';
						// 	break;	
						case 'W'://冰墩墩
							this.prizeImg = getApp().globalData.imgUrl+'/prize_bdd.png';
							break;
						case '2'://有一套prizeType 567对应gandPrizeType 123
							this.prizeImg = getApp().globalData.imgUrl+'/prize_yyt_fj.png';
							break;
						default:
							uni.redirectTo({
								url: '../fail/fail'
							});
							break;
					}
				} else if(getApp().globalData.provinceCode=='N'){//湖南
					switch (result.grandPrizeType.toUpperCase()){
						case 'Q'://冰雪冬令营
							this.prizeImg = getApp().globalData.imgUrl+'/prize_dly.png';
							break;	
						case 'P'://冬奥环球之旅
							this.prizeImg = getApp().globalData.imgUrl+'/prize_hqzl.png';
							break;
						case 'R'://青啤有一套
							this.prizeImg = getApp().globalData.imgUrl+'/prize_yyt_hn.png';
							break;
						default:
							uni.redirectTo({
								url: '../fail/fail'
							});
							break;
					}
				}
				
				if(!this.isGet){
					coverTimer = setTimeout(()=>{
						this.coverClosed = true;
					},3000);
				}
			}
		},
		methods: {
			openAddres() {
				this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				this.pickerText = e.label
			},
			inputYzm(e){
				this.yzcode = e.detail.value;
			},
			inputName(e){
				this.username = e.detail.value;
			},
			inputTel(e){
				this.tel = e.detail.value;
			},
			inputAddress(e){
				this.address = e.detail.value;
			},
			inputIdcard(e){
				this.idcard = e.detail.value;
			},
			openInput(){
				if(this.isGet||this.expireFlag){
					uni.switchTab({
						url:'../mybag/mybag'
					})
				}else{
					this.writeMsg = true;
				}
			},
			closeCover(){
				this.coverClosed = true;
				clearTimeout(coverTimer);
			},
			closeTip(){
				this.showTip = false;
				if(this.isEcjx){
					getApp().globalData.ecjx = true;
					getApp().globalData.getPrize = true;
					uni.switchTab({
						url:'../index/index'
					})
				}
			},
			toRule() {
				uni.navigateTo({
					url: '../rule/webview?provinceCode=' + getApp().globalData.provinceCode
				})
			},
			submsg() {
				if(this.isGet){
					return this.writeMsg = false;
				}
				if(this.username==''||this.username==' '){
					uni.showModal({
						title: "提示",
						content: '请填写正确的姓名哦！~',
						showCancel: false
					})
				}else if(this.needIdcard&&!this.$Store.dispatch(this.idcard)){
					uni.showModal({
						title: "提示",
						content: '请填写正确的身份证号码哦！~',
						showCancel: false
					})
				}else if(!(/^[1]{1}[0-9]{10}$/).test(this.tel)){
					uni.showModal({
						title: "提示",
						content: '请输入正确的手机号',
						showCancel: false
					})
				}  else if(this.pickerText==''){
					uni.showModal({
						title: "提示",
						content: '请选择所在地区',
						showCancel: false
					})
				} else if (this.address==''||this.address==' ') {
					uni.showModal({
						title: "提示",
						content: '请输入正确的详细地址',
						showCancel: false
					})
				} else if(!/^[0-9]{4}$/.test(this.yzcode)){
					uni.showModal({
						title: "提示",
						content: '请输入验证码',
						showCancel: false
					})
				} else {
					uni.showLoading({
						title:'提交中'
					})
					uni.setStorage({
						key:'address',
						data:getApp().globalData.address
					})
					uni.request({
						url: this.$Store.state.requestUrl + '/user/savePrize',
						method: 'POST',
						data: {
							"openid": getApp().globalData.openid,
							"address": this.pickerText+'-'+this.address,
							"username": this.username,
							"idcard": this.needIdcard?this.idcard:'idcard',
							"skukey": getApp().globalData.reply.skukey,
							"phonenum": this.tel,
							"grandPrizeType": getApp().globalData.reply.grandPrizeType,
							"prizeVcode": getApp().globalData.reply.prizeVcode,
							"projectServerName":this.$Store.state.serverName,
							"captcha":this.yzcode
						}
					}).then(res=>{
						uni.hideLoading();
						let [e,r] =res;
						if(r){
							if(r.data.result.code==0){
								if(r.data.result.businessCode == 0){//提交成功
									this.showTip = true;
									this.yzcode = '';
									this.writeMsg = false;
									this.isGet = true;
								}else{
									uni.showModal({
										title: "提示",
										content: r.data.result.msg?r.data.result.msg:'系统开了个小差',
										showCancel: false
									})	
								}
							}else{
								uni.showModal({
									title: "大奖提交提示",
									content: r.data.result.msg?r.data.result.msg:'系统开了个小差',
									showCancel: false
								})	
							}
						}else{
							console.log(e)
							uni.showModal({
								title: "大奖提交提示",
								content: '系统繁忙',
								showCancel: false
							})
						}
					})
				}
			},
			timeout() {
				let timer = null;
				this.sec -= 1;
				if (this.sec <= 0 || this.stop) {
					return this.sec = 0;
				}
				timer = setTimeout(() => {
					this.timeout()
				}, 1000)
			},
			getVerifyCode(){
				if(this.sec!=0){
					return false;
				}else if (!(/^1[0-9]{10}$/.test(this.tel))) {
					uni.showModal({
						title: "提示",
						content: "请输入正确的手机号",
						showCancel: false
					})
				} else {
					uni.showLoading({
						title:'获取验证码',
						mask:true
					})
					uni.request({
						url:this.$Store.state.requestUrl+'/user/getCaptcha',
						method:'POST',
						data:{
							phonenum:this.tel,
							"projectServerName":this.$Store.state.serverName
						}
					}).then(res=>{
						uni.hideLoading()
						let [e,r] = res;
						if(r){
							if(r.data.result.code==0&&r.data.result.businessCode==0){//成功
								this.sec = 60;
								this.timeout();//开始倒计时
							}else if(r.data.result.code==0&&r.data.result.businessCode==2){
								uni.showModal({
									title: "提示",
									content: '您填写的手机号错误，发送验证码失败！',
									showCancel: false
								})
							}else{
								uni.showModal({
									title: "获取验证码提示",
									content:'验证码获取失败！请稍后再试并确认手机号是否输入正确',
									showCancel: false
								})
							}
						}else{
							uni.showModal({
								title: "获取验证码提示",
								content: '系统繁忙',
								showCancel: false
							})
						}
					})
				}
			}
		},
		components:{
			simpleAddress
		}
	}
</script>

<style lang="scss">
	.template_1{
		background: url($bgUrl+'/bg_2.png?v=1') no-repeat center;
		background-size: cover;
		text.title{
			color: #fefbe2;
			display: block;
			margin: 280rpx auto 0;
			text-align: center;
			font-size: 40rpx;
		}
		.logo{
			z-index: 2;
		}
		// 大奖封面
		view.cover{
			width: 100%;
			height: 100%;
			overflow: hidden;
			background: url($bgUrl+'/bg_2.png?v=1') no-repeat center;
			background-size: cover;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			.coverImg{
				width: 100%;
				display: block;
				position: absolute;
				top: 55%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
		.prizeImg{
			width: 605rpx;
			display: block;
			margin: 0 auto;
		}
		.rule{
			position: absolute;
			right: 0;
			top: 310rpx;
			width: 110rpx;
			z-index: 1;
		}
		>.btn_com{
			margin-top: 70rpx;
		}
		.tip{
			font-size: 30rpx;
			color: #FFFFFF;
			font-weight: bold;
			margin-top: 20rpx;
			display: block;
			text-align: center;
		}
		.dj_tips{
			width: 493rpx;
			height: 485rpx;
			position: absolute;
			left: 50%;
			transform: translate(-50%,-50%);
			top: 50%;
			text-align: center;
			line-height: 485rpx;
			color: #072712;
			font-size: 64rpx;
			background: url($bgUrl+'/dj_tips_bg.png') no-repeat center;
			background-size: 100% 100%;
			z-index: 1;
		}
		// 填写信息
		.msg_box{
			width: 100%;
			height: 100%;
			overflow: hidden;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 2;
			background-color: rgba($color: #000000, $alpha: .8);
			>view{
				display: flex;
				width: 100%;
				height: 100%;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.close{
				width: 80rpx;
				margin-top: 20rpx;
			}
			.msglist{
				width: 656rpx;
				border-radius: 8rpx;
				padding: 24rpx;
				box-sizing: border-box;
				overflow: hidden;
				background:linear-gradient(top,#009040,#005e2a);
				position: relative;
				.border{
					border-radius: 8rpx;
					padding: 0 27rpx;
					background:#FFFFFF;
					overflow: hidden;
					width: 100%;
					box-sizing: border-box;
					.tips_tittle{
						width: 236rpx;
						display: block;
						margin:80rpx auto 0;
					}
					input{
						border: 2rpx #4eac6d solid;
						height: 80rpx;
						border-radius: 8rpx;
						box-sizing: border-box;
						margin-top: 22rpx;
						position: relative;
						z-index: 1;
						padding-left: 20rpx;
						color: #000;
						font-size: 38rpx;
					}
					.yzcode_box{
						border: 2rpx #4eac6d solid;
						height: 80rpx;
						border-radius: 8rpx;
						margin-top: 22rpx;
						position: relative;
						z-index: 1;
						display: flex;
						justify-content: space-between;
						width: 100%;
						input{
							border: 0;
							margin: 0;
							width: 60%;
						}
						text{
							font-size: 30rpx;
							color: #4eac6d;
							line-height: 80rpx;
							width: 40%;
							text-align: center;
						}
					}
					.btn_com{
						width: 330rpx;
						height: 76rpx;
						line-height: 66rpx;
						position: relative;
						z-index: 1;
						margin: 70rpx auto;
						font-size: 32rpx;
					}
				}
				.tips_bottom{
					width: 100%;
					display: block;
					position: absolute;
					bottom: 0;
					left: 0;
				}
			}
		}
		// 领奖提示
		.tips_box{
			width: 100%;
			height: 100%;
			background-color: rgba($color: #000000, $alpha: 0.7);
			overflow: hidden;
			position: absolute;
			left: 0;
			top:0;
			z-index: 2;
			.tips_msg{
				width: 450rpx;
				height: 641rpx;
				background: url($bgUrl+'/sennmsg_success.png') no-repeat center;
				background-size: 100%;
				text-align: center;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				padding-top: 330rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				text{
					font-size: 40rpx;
					color: #000000;
					font-weight: bold;
				}
				.btn_com{
					width: 330rpx;
					height: 76rpx;
					line-height: 66rpx;
					margin-bottom: 40rpx;
					font-size:32rpx ;
				}
			}
		}
	}
</style>

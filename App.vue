<script>
	export default {
		onLaunch: function(options) {
			console.log('App Launch',options)
			uni.getSystemInfo({
				complete: (res) => {
					if (res.model.indexOf('iPhone X') !== -1 || res.model.indexOf('iPhone 11') !== -1) {
						this.$scope.globalData.isIphoneX = true;
					}
					this.$scope.globalData.safeHeight = res.statusBarHeight ? res.statusBarHeight : 20;
				}
			})
			if (!this.$Store.state.hasUserInfo) {
				uni.getUserInfo().then(res=>{
					let [er,re] = res;
					if(re){
						this.$Store.state.hasUserInfo = true;
						this.$Store.state.userInfo = re.userInfo;
					}
				}).catch(err=>{
					console.log('昵称头像',err)
				})
			}
			
			// this.$Store.dispatch('getProvinceCode').then(res=>{
			// 	console.log(res)
			// })
			
			const updateManager = uni.getUpdateManager();
			
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				console.log('是否有新版本', res.hasUpdate);
			});
			
			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，即将重启',
					showCancel: false,
					complete(res) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				});
			
			});
			
			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
				console.log('新的版本下载失败')
			});
		},
		onShow: function(options) {
			console.log('App Show',options)
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			imgUrl: 'https://xcxsite.vjifen.com/v/static/qp2020',
			openscan: true
		},
		onError(err) {
			console.log(err)
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/*每个页面公共css */
	page {
		height: 100%;
		-webkit-overflow-scrolling: touch;
	}
	.template{
		width: 100%;
		height: 1334rpx;
		overflow: hidden;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	.logo{
		width: 180rpx;
		position: fixed;
		top: 140rpx;
		left: 30rpx;
	}
	go-back{
		position: fixed;
		top: 64rpx;
		left: 30rpx;
	}
	button::after {
		border: 0;
	}
	image{
		height: auto;
	}
	.btn_com{
		padding: 0;
		display: block;
		background: url($bgUrl+'/button_common.png') no-repeat center;
		height: 102rpx;
		width: 493rpx;
		background-size: 100% 100%;
		color: #FFFFFF;
		font-size: 46rpx;
		line-height: 90rpx;
		border-radius: 0;
	}
	.content{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.template_1{
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}
	.mask{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: rgba($color: #000000, $alpha: 0.7);
		position: absolute;
		left: 0;
		top: 0;
	}
</style>

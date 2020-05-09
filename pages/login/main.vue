<template>
	<div class="container">

		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="navigateBack" title="登陆页面" status-bar="false"></uni-nav-bar>
		<!-- #endif-->


		<!-- #ifdef APP-PLUS -->
		<div class="content">
			<div class="title">豆子社区</div>
			<div class="tips">轻轻的说出你的秘密</div>
		</div>
		<button @click="bindGetUserInfo" class="app-wechat-login">微信授权登陆</button>
		<!-- #endif-->
		<!-- #ifdef MP-WEIXIN -->
		<div style='width:100%;padding-left:30rpx;font-size: 28rpx;margin-top:30rpx;'>1、同意当前小程序获取我的微信头像；</div>
		<div style='width:100%;padding-left:30rpx;font-size: 28rpx;margin-top:30rpx;'>2、同意当前小程序获取我的微信昵称等其他信息；</div>
		<!-- #endif-->

		<!-- #ifdef MP-TOUTIAO -->
		<div style='width:100%;padding-left:30rpx;font-size: 28rpx;margin-top:30rpx;'>1、同意当前小程序获取我的头条头像；</div>
		<div style='width:100%;padding-left:30rpx;font-size: 28rpx;margin-top:30rpx;'>2、同意当前小程序获取我的头条昵称等其他信息；</div>
		<!-- #endif-->

		<!-- #ifdef MP-BAIDU -->
		<div style='width:100%;padding-left:30rpx;font-size: 28rpx;margin-top:30rpx;'>1、同意当前小程序获取我的百度头像；</div>
		<div style='width:100%;padding-left:30rpx;font-size: 28rpx;margin-top:30rpx;'>2、同意当前小程序获取我的百度昵称等其他信息；</div>
		<!-- #endif-->

		<div class="button-group">
			<!-- #ifdef MP-WEIXIN -->
			<button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="save-btn">授权登陆</button>
			<!-- #endif-->
			<!-- #ifdef MP-TOUTIAO -->
			<button @click="bindGetUserInfo" class="save-btn">授权登陆</button>
			<!-- #endif-->
			<!-- #ifdef MP-BAIDU -->
			<button @click="bindGetUserInfo" class="save-btn">授权登陆</button>
			<!-- #endif-->
			<!-- #ifndef APP-PLUS -->
			<button @click.stop="cancel" class="save-btn">暂不登陆</button>
			<!-- #endif-->
		</div>
	</div>

</template>
<script>
	import {
		api,
		tips_msg
	} from '../../const'
	import {
		getUserToken
	} from '@/utils'


	export default {
		data() {
			return {
				accesstoken: '',
				userToken: ''
			}
		},
		methods: {
			navigateBack() {
				uni.navigateBack({

				})
			},
			cancel() {
				uni.navigateBack({

				})
			},
			getLoginAction() {
				//#ifdef MP-WEIXIN
				return "user.wechatLogin";
				//#endif
				//#ifdef MP-TOUTIAO
				return "user.toutiaoLogin";
				//#endif
				//#ifdef MP-BAIDU
				return "user.baiduLogin";
				//#endif
			},
			bindGetUserInfo(e) {
				this.userToken = getUserToken(this);
				var that = this
				uni.login({
					success: function(res) {
						var code = res.code // 微信登录接口返回的 code 参数，下面注册接口需要用到
						uni.getUserInfo({
							withCredentials: true,
							success: function(res) {
								console.log(res)
								uni.setStorageSync('userInfo', res.userInfo)
								var iv = res.iv

								//#ifdef MP-BAIDU
								var encryptedData = res.data
								//#endif
								//#ifndef MP-BAIDU
								var encryptedData = res.encryptedData
								//#endif
								// 下面开始调用注册接口
								that.$http({
										act: that.getLoginAction(),
										code: code,
										encryptedData: encryptedData,
										iv: iv,
										userToken: that.userToken
									},
									function(res) {
										uni.setStorageSync('t', res.data.t);
										uni.setStorageSync('userId', res.data.userId)
										uni.showToast({
											title: "登录成功",
											duration: 1000,
											complete: function() {
												that.navigateBack()
											}
										})
									}
								)
							},
							fail: function(res) {
								that.navigateBack()
							}
						})
					},
					fail: function(res) {
						console.log(res)
					}
				})

			}
		}
	}
</script>
<style lang='scss' scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;

		.title{
			margin-top: 100rpx;
			align-items: center;
			font-size: 80rpx;
		}
		.tips{
			margin-top:40rpx;
			margin-left: 70rpx;
			font-size: 40rpx;
		}


		.app-wechat-login {
			margin-top: 750rpx;
			background-color: #feb331;
			font-size: 25rpx;

		}

		.input {
			border-bottom: 2rpx solid $borderColor;
			width: 600rpx;
			margin-top: 200rpx;
		}

		.button {
			width: 600rpx;
			margin-top: 150rpx;
		}

		.tips {
			font-size: 22rpx;
			color: #888;
			margin-top: 10rpx;
		}

		.button-group {
			display: flex;
			flex-direction: row;

			.save-btn,
			.cancel-btn {
				margin-left: 20rpx;
				line-height: 80rpx;
				text-align: center;
				margin-top: 30rpx;
				border-radius: 6rpx;
				box-sizing: border-box;
			}
		}


		.save-btn {
			background-color: red;
			color: white;
		}
	}
</style>

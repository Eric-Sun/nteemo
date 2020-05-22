<template>
	<div class="container">
		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar title="我的页面" fixed="true" status-bar="false" ></uni-nav-bar>
		<!-- #endif-->
		<authorHead :user='user' v-on:login='login' ></authorHead>
		<div class='list'>
			<!--<navigator class='list-item' @click.stop='setListFrom' url='/pages/list/main?type=collect' data-item='collect'>我的收藏</navigator>-->
			<!-- <navigator class='list-item' @click.stop='setListFrom' url='/pages/list/main?type=topic' data-item='topic'>最近话题</navigator> -->
			<navigator class='list-item' url='/pages/collection/main'>我的收藏</navigator>
			<!-- #ifndef APP-PLUS -->
			<button open-type='feedback'>意见反馈</button>
			<!-- #endif -->
		</div>
	</div>
</template>

<script>
	import authorHead from '../../components/authorHead'
	import {
		api
	} from '../../const'
	import {
		checkT
	} from '../../utils/net'
	import login from '../../components/login'

	export default {
		data() {
			return {
				t:"",
				user: {}
			}
		},
		components: {
			authorHead,
			login
		},
		methods: {
			toModifyPage() {
				checkT(this, this.t,
					function() {
						uni.showModal({
							title: "登陆",
							content: "需要登陆后才可以进行发布",
							confirmText: "去登陆",
							success: function(res) {
								if (res.confirm) {
									// that.loginVisible = true;
									//#ifndef APP-PLUS 
									uni.navigateTo({
										url: "../login/main"
									})
									//#endif
									
									//#ifdef APP_PLUS
									uni.navigateTo({
										url: "../login/mobile"
									})
									//#endif
								} else if (res.cancel) {}
							}
						})
					},
					function() {
						uni.navigateTo({
							url: `modify`
						})
					});
			},
			setListFrom(e) {
				uni.setStorageSync('fromItem', e.target.dataset.item)
			},
			login() {
				//#ifndef APP-PLUS
				uni.navigateTo({
					url: "../login/main"
				})
				//#endif
				
				//#ifdef APP_PLUS
				uni.navigateTo({
					url: "../login/mobile"
				})
				//#endif
			},
			async getData() {
				const t = uni.getStorageSync('t')
				var that = this;
				this.$http({
					act: 'user.info',
					t: t
				}, function(res) {
					that.user = res.data
				})
			}
		},
		onShow() {
			var that = this
			this.t = uni.getStorageSync("t")
			checkT(this,this.t,
				function() {
					// that.loginVisible = true
				},
				function() {
					that.getData()
				}
			);
		}
	}
</script>

<style lang='scss' scoped>
	.container {
		height: 100vh;
		background-color: rgb(245, 245, 249);

		.list {
			margin-top: 30rpx;
			background-color: white;

			.list-item {
				height: 76rpx;
				line-height: 76rpx;
				margin: 0 30rpx;
				padding: 10rpx 0;
			}

			.list-item+.list-item {
				border-top: 1rpx solid $borderColor;
			}

			.margin {
				margin-top: 30rpx;
			}
		}
	}
</style>

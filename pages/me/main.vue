<template>
	<div class="container">
		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar title="我的页面" fixed="true" status-bar="false"></uni-nav-bar>
		<!-- #endif-->
		<authorHead :user='user' v-on:login='login' v-on:toModifyPage="toModifyPage"></authorHead>
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
				
				user: {}
			}
		},
		components: {
			authorHead,
			login
		},
		methods: {
			toModifyPage() {
				uni.navigateTo({
					url: `modify`
				})
			},
			setListFrom(e) {
				uni.setStorageSync('fromItem', e.target.dataset.item)
			},
			login() {
				uni.navigateTo({
					url:"../login/main"
				})
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
			},
			cancelModalClose: function() {
				this.loginVisible = false
			}
		},
		onShow() {
			var that = this
			var t = uni.getStorageSync("t")
			checkT(this,t,
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

<template>
	<div class='container'>
		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar title="首页"  status-bar="false" fixed="true"></uni-nav-bar>
		<!-- #endif-->
		<login :visible='visible' v-on:modalClose='closeModalEvent'></login>
		<!-- <div class='header'> -->
			<!-- <div data-tab='story' :data-offset='0'>故事贴 -->
			<!-- </div> -->
			<!--      <div :class='{ active: tab==="diary" }' @click.stop='changeTab($event)' data-tab='diary' :data-offset='1'>一日一记-->
			<!--      </div>-->
		<!-- </div> -->
		<div class="containers" :animation='animation'>
			<scroll-view scroll-y class='scroll-container' @scroll='onScroll($event)' @scrolltolower='getMore' :scroll-top="cursor">
				<div v-for='item in data' :key='item.id'>
					<card :item='item'></card>
				</div>
			</scroll-view>
		</div>
		<img class='up-png' src="@/static/refresh.png" mode='widthFix' @click.stop="refresh">

	</div>
</template>

<script>
	import card from '@/components/card'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import {
		api,
		barId,
		tips_msg
	} from '@/const'
	import login from '@/components/login'
	import {
		checkT
	} from '@/utils/net'
	import {
		debounce,
		getUserToken
	} from '@/utils'


	const debounceOnScroll = () => debounce(function(e) {
		this.cursor = e.target.scrollTop
		// this.cursor = 0;
	})
	export default {
		data() {
			return {
				t: 0,
				page: 0,
				data: [],
				isLoading: false,
				animation: {},
				visible: false,
				cursor: 0,
				userToken:''
			}
		},

		components: {
			card,
			login,
			uniNavBar
		},
		onShow() {
			// 为了测试
			// uni.setStorageSync("t",1586763893677)
			
			this.init();
					
		},
		onShareAppMessage: function() {
			return {
				title: '豆子社区', //分享内容
				path: '/pages/index/main' //分享地址
				// imageUrl: '/images/img_share.png',//分享图片
			}
		},
		methods: {
			onScroll: debounceOnScroll(),
			refresh() {
				this.init();
			},
			init() {
				this.userToken = getUserToken(this);
				var that = this;
				this.t = uni.getStorageSync("t");
				checkT(this,this.t,
					function() {
						uni.setStorageSync("t", 0);
						that.t = 0;
						console.log("t is expired")
					},
					function() {
						that.t = uni.getStorageSync("t")
						console.log("t is ok,t="+that.t)
					}
				);
				this.getData(0)
				this.cursor = 0;
				this.page = 0;
			},
			closeModalEvent() {
				this.visible = false
				this.t = uni.getStorageSync('t')
				this.getData(0)
			},

			getData(page) {
				var type = -1
				uni.showLoading({
					title: '加载中'
				})
				this.isLoading = true
				var that = this;
				this.$http({
						act: 'post.list',
						barId: barId,
						pageNum: this.page,
						size: 5,
						t: this.t,
						userToken:this.userToken
					},
					function(res) {
						console.log(res.data.list[0]);
						if (res.data.list.length != 0) {
							if (that.data.length > 0 && page === 0) {
								// 下拉刷新
								that.data = res.data.list
								// res.data.data;
							} else {
								// 底部加载更多 h和初始得时候
								that.data = [...that.data, ...res.data.list]
							}
						} else {
							// 获取数据失败
							uni.showToast({
								title: '已经没有更新的数据了',
								icon: 'none',
								duration: 2000
							})
						}
						if (res.data.noticeSize > 0) {
							uni.setTabBarBadge({
								index: 2,
								text: res.data.noticeSize + ''
							})
						}

					}
				)
				uni.hideLoading()
				this.isLoading = false
			},
			async getMore() {
				if (!this.isLoading) {
					this.page += 1
					await this.getData(this.page)
				}
			},
			async onPullDownRefresh() {
				await this.getData(0)
				uni.stopPullDownRefresh()
			},
			// changeTab(e) {
			// 	const currentTab = e.target.dataset.tab
			// 	const offset = e.target.dataset.offset
			// 	this.tab = currentTab
			// 	this.page = 0
			// 	this.getData(currentTab, 0)
			// 	this.animation = uni
			// 		.createAnimation({
			// 			duration: 1000,
			// 			timingFunction: 'ease'
			// 		})
			// 		.left(`-${offset * 100}vw`)
			// 		.step()
			// 		.export()
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: rgb(245, 245, 249);
		font-size: 30rpx;
		overflow: hidden;
		width: 100vw;

		.up-png {
			width: 80rpx;
			color: red;
			right: 30rpx;
			bottom: 166rpx;
			position: fixed;
		}

		.header {
			display: flex;

			&>div {
				width: 20%;
				/*background-color: #41b883;*/
				color: black;
				text-align: center;
				height: 86rpx;
				line-height: 86rpx;
			}
		}

		.containers {
			display: flex;
			position: relative;

			.scroll-container {
				height: 90vh;
				width: 100vw;
			}
		}
	}

	.header .header>div+.header>div {
		border-left: 2rpx solid white;
	}

	.active {
		font-weight: bolder;
	}
</style>

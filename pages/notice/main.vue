<template>
	<div class='container'>
		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar title="我的通知" fixed="true" status-bar="false"></uni-nav-bar>
		<!-- #endif-->
		<div v-if="noticeList.length==0" class="no-data">无数据</div>
		<div v-if="noticeList.length>0">
			<div class='notice' v-for='item in formatNoticeList' :key='item.id' :data-id='item.id'>
				<div v-if="item.type!=2" class="other-notice">
					<div class='head'>
						<div class="head-left">
							<img class='head-img' :src='item.fromUserAvatarImgUrl' @click.stop='goAuthorPage'>
							<div class='info'>
								<span class="name">{{item.fromUserNickName}}</span>

								<span class='time'>{{item.createtime}}</span>
							</div>
						</div>
						<div v-if="item.status==0" class="head-right">
							新
						</div>
					</div>
					<div class="body" @click.stop="goPostDetail($event)" :data-postid="item.content.postId">
						<div class="reply-content" v-if="item.type==0">{{item.replyContent}}</div>
						<div class="reply-content" v-if="item.type==1">
							回复{{item.content.targetReplyUserNickName}}:{{item.replyContent}}
						</div>
						<div class="replied-content" v-if="item.type==1">
							{{item.content.targetReplyRepliedUserId!=0?'回复@'+item.content.targetReplyRepliedUserNickName+':':''}}
							{{item.content.targetReplyContent}}
						</div>
						<div class="post">
							<img class='post-img' :src='item.content.postUserAvatarImgUrl'>
							<div class="post-info">
								<div class="post-username">
									{{item.content.postUserNickName}}
								</div>
								<div class="post-title">
									{{item.content.postTitle}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="item.type==2">
					<card :item='item.content' :hidden="true" :new_notice="item.status"></card>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import card from '@/components/card'
	import {
		api
	} from '../../const'
	import {
		passTime
	} from '../../utils/index'
	import {
		checkT
	} from '../../utils/net'
	import login from '../../components/login'

	export default {
		components: {
			login,
			card
		},
		data() {
			return {
				t: 0,
				noticeList: [],
			}
		},
		computed: {
			formatNoticeList: function() {
				return this.noticeList.map(_ => {
					return {
						..._,
						createtime: passTime(_.createtime)
					}
				})
			}
		},
		onShow() {
			var that = this;
			this.t = uni.getStorageSync("t");
			checkT(this, this.t,
				function() {
					uni.showModal({
						title: "登陆",
						content: "需要登陆后才可以进行收藏",
						confirmText: "去登陆",
						success: function(res) {
							if (res.confirm) {
								
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
					that.t = uni.getStorageSync('t')
					that.getData()
					that.readAllNotices()
				});
		},
		methods: {
			async readAllNotices() {
				this.$http({
					t: this.t,
					act: 'notice.readAll'
				}, function(res) {
					uni.removeTabBarBadge({
						index: 2
					})
				})
			},
			goPostDetail(e) {
				const postId = e.currentTarget.dataset.postid
				uni.navigateTo({
					url: `../detail/main?postId=` + postId
				})
			},
			goDetail(e) {
				uni.navigateTo({
					url: `../detail/main?topicid=${e.target.dataset.topicid}`
				})
			},
			async getData() {
				console.log("notice t=" + this.t)
				var that = this
				this.$http({
					act: 'notice.list',
					t: this.t,
					pageNum: 0,
					size: 10
				}, function(res) {
					that.noticeList = res.data.list
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container {
		background-color: rgb(245, 245, 249);
		width: 100vw;

		.no-data {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 35rpx;
			color: #C0C0C0;
			width: 100vw;
			height: 100vh;
		}

		.notice {
			background-color: white;
			margin-bottom: 20rpx;

			/*padding: 30rpx;*/
			.other-notice {
				padding: 30rpx;

				.head {
					color: black;
					display: flex;
					/*align-items: center;*/
					justify-content: space-between;

					.head-left {

						.head-img {
							border-radius: 45rpx;
							width: 75rpx;
							height: 75rpx;
						}

						.info {
							flex-direction: column;
							display: flex;
							margin-left: 26rpx;

							.name {
								font-weight: bold;
								font-size: $userName-font-size;
							}

							.time {
								font-size: $time-font-size;
								color: $borderColor;
							}
						}
					}

					.head-right {
						font-size: 35rpx;
						color: red;
					}

					.top {
						position: absolute;
						right: 40rpx;
						color: red;

						.ellipsis {
							width: 50rpx;
							height: 75rpx;
						}
					}
				}

				.body {
					display: flex;
					flex-direction: column;
					margin-top: 10rpx;
					font-size: $content-font-size;

					.reply-content {
						margin: 10rpx;
					}

					.replied-content {
						padding-left: 10rpx;
						padding-right: 10rpx;
						padding-bottom: 10rpx;
						background-color: rgb(245, 245, 249);
					}

					.post {
						background-color: rgb(245, 245, 249);
						display: flex;
						flex-direction: row;
						padding: 0rpx 10rpx 10rpx 10rpx;

						.post-img {
							width: 90rpx;
							height: 90rpx;
						}

						.post-info {
							display: flex;
							flex-direction: column;
							margin-left: 20rpx;

							.post-username {
								font-size: 35rpx;

							}

							.post-title {
								font-size: 35rpx;

							}
						}
					}
				}
			}
		}
	}

	.selected {
		color: $color;
		border-bottom: 2rpx solid $color;
	}
</style>

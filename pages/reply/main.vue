<template>
	<div class='container'>
		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar title="回复详情" fixed="true"  left-icon="back" @clickLeft="navigateBack" status-bar="false"></uni-nav-bar>
		<!-- #endif-->
		<sendReply v-if='sendVisible' @close-modal='closeModal' @reply-success='replySuccess' :content='content' :postId='postId'
		 :replyId='replyId' :postAnonymous='postAnonymous' :isPostUserId='isPostUserId' :replyUserName='replyUserName'></sendReply>
		<div>
			<scroll-view scroll-y='true' @scroll='onScroll($event)' :scroll-top="top" enable-back-to-top='true' @scrolltolower='getMore'>
				<div class='head'>
					<img v-if="postAnonymous==0" class='head-img' :src='reply.userAvatarUrl' @click.stop='goAuthorPage'>
					<img v-if="postAnonymous==1" class='head-img' :src='reply.userAvatarUrl'>
					<div class='info'>
						<div class="name_group">
							<div class="name">{{reply.userName}}</div>
							<span v-if="postUserId==reply.userId" class="info-louzhu">楼主</span>
						</div>
						<div class='content'>
							{{reply.content}}
						</div>

					</div>
				</div>

				<div class="body">
					<div class="tips">回复</div>
					<div class='reply'>
						<div class='reply-container-with-divide' v-for='(item,originindex) in reply.replyList' :key='item.id' :data-id='item.id'>
							<div class="reply-container">
								<div class='reply-head'>
									<img v-if="postAnonymous==0" class='head-img' :src='item.userAvatarUrl' @click.stop='goAuthorPage' />
									<img v-if="postAnonymous==1" class='head-img' :src='item.userAvatarUrl' />
								</div>
								<div class="reply-info">
									<div class="reply-info-user-group">
										<span class="reply-info-user-group-username">{{item.userName}}</span>
										<span v-if="postUserId==item.userId" class="reply-info-user-group-louzhu">楼主</span>
									</div>
									<div class='reply-content' :data-username="item.userName" :data-replyid='item.replyId' @click.stop="showReplyModal($event)">
										{{item.lastReplyId!=reply.replyId?
                    '回复@'+item.lastReplyUserName+':'+item.content:item.content}}
									</div>
									<div v-if="item.imgList.length!=0">
										<img class="reply-imgList" :src="item.imgList[0].url">
									</div>
									<div class="reply-foot">
										<!--                    <div class="time">-->
										<!--                      {{formatCreateAt}}-->
										<!--                    </div>-->
		
									</div>
								</div>
							</div>
							<div class="reply-divide"></div>
						</div>

					</div>
				</div>

			</scroll-view>
		</div>
	</div>
</template>

<script>
	import {
		api
	} from '../../const'
	import {
		passTime,
		debounce
	} from '../../utils'
	import sendReply from '../../components/sendReply'
	import {
		checkT
	} from '../../utils/net'
	import login from '../../components/login'


	const debounceOnScroll = () => debounce(function(e) {
		this.top = e.target.scrollTop
	})
	export default {
		components: {
			sendReply,
			login
		},
		mounted() {
			this.getData()
		},
		computed: {
			formatCreateAt() {
				return passTime(this.reply.createtime)
			}
		},
		onShow() {
			// var that = this;
			this.t = uni.getStorageSync("t")
			// checkT(t,
			// 	function() {
			// 		that.loginVisible = true
			// 	},
			// 	function() {});
		},

		methods: {
			navigateBack(){
					uni.navigateBack({
						
					})
			},
			onScroll: debounceOnScroll(),
			async getData() {
				const t = uni.getStorageSync('t')
				uni.showLoading({
					title: '加载中'
				})
				var that = this;
				this.$http({
					t: t,
					act: 'reply.detail',
					replyId: this.currentReplyId,
					size: 5,
					pageNum: 0
				}, function(res) {
					that.reply = res.data
					uni.hideLoading()
				})


			},

			goTop() {
				// console.log(11);
				this.top = 0
			},
			getMore() {
				// if (this.remainReplies.length > 0) {
				//   this.currentReplies.concat(this.remainReplies.splice(0, 10))
				// } else {
				//   uni.showToast({
				//     title: '无更多数据',
				//     icon: 'none',
				//     duration: 2000
				//   })
				// }
			},
			showReplyModal(e) {
				var userId = uni.getStorageSync('userId')

				const userName = e.currentTarget.dataset.username
				const replyId = e.currentTarget.dataset.replyid
				if (userName) {
					this.content = `@${userName}:`
				} else {
					this.content = ''
				}
				if (userId == this.postUserId) {
					this.isPostUserId = true
				}
				this.replyId = replyId
				this.replyUserName = userName
				this.sendVisible = true
			},
			replySuccess() {
				this.closeModal()
				uni.showToast({
					title: '评论成功',
					icon: 'none',
					duration: 1500

				})
				this.getData()
			},
			closeModal() {
				this.sendVisible = false
			}
		},
		onLoad(option) {
			this.currentReplyId = option.replyId
			this.postId = option.postId
			this.postAnonymous = option.anonymous
			this.postUserId = option.postUserId
		},
		data() {
			return {
				reply: {},
				sendVisible: false,
				replyId: 0,
				top: 0,
				currentReplyId: 0,
				postId: 0,
				postAnonymous: 0,
				postUserId: 0,
				isPostUserId: false
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container {
		/*height: 100vh;*/
		height: 100vh;
		width: 100vw;
		margin-top:20rpx;
		background-color: rgb(245, 245, 239);

		.head {
			background-color: white;
			display: flex;
			padding-left: 20rpx;
			padding-top:20rpx;

			/*align-items: center;*/
			.head-img {
				border-radius: 45rpx;
				width: 75rpx;
				height: 75rpx;
			}

			.info {
				flex-direction: column;
				display: flex;
				margin-left: 26rpx;

				.name_group {
					display: flex;
					flex-direction: row;

					.name {
						font-size: $userName-font-size;
					}

					.info-louzhu {
						margin-left: 5rpx;
						color: red;
						border: 0px solid rgba(93, 93, 93, 0.44);
						font-size: $userName-font-size;
					}
				}


				.content {
					white-space: pre-line;
					text-align: justify;
					text-justify: inter-ideograph;
					margin-bottom: 20rpx;
					margin-right: 25rpx;
					width: 590rpx;
					font-size: $content-font-size;
				}

			}

		}

		.body {
			padding: 15rpx;
			background-color: rgb(245, 245, 239);

			.tips{
				font-size:33rpx;
				padding-left:30rpx;
				padding-bottom: 15rpx;
			}
			.title {
				/*background-color: white;*/
				padding-left: 30rpx;

				.big {
					font-size: 50rpx;
				}
			}

			.reply {
				/* background-color: white; */
				.reply-container-with-divide {
					display: flex;
					flex-direction: column;

					.reply-container {
						display: flex;

						.reply-head {
							margin-left: 25rpx;

							.head-img {
								border-radius: 45rpx;
								width: 75rpx;
								height: 75rpx;
							}
						}

						.reply-info {
							display: flex;
							flex-direction: column;
							margin-top: 10rpx;
							margin-left: 20rpx;
							margin-right: 50rpx;
							width: 100%;

							.reply-info-user-group {
									display:flex;
									flex-direction:row;
								.reply-info-user-group-username{
									font-size: $userName-font-size;
								}
								
								.reply-info-user-group-louzhu{
									margin-left: 5rpx;
									color: red;
									border: 0px solid rgba(93, 93, 93, 0.44);
									font-size: $userName-font-size;
								}
							}

							&>span {
								/*font-weight: lighter;*/
								/*color: gray;*/
								font-size: $reply-content-font-size;
							}

							.reply-content {
								padding-top:15rpx;
								padding-bottom:15rpx;
								width: 100%;
								/*white-space: pre-line;*/
								text-align: justify;
								text-justify: inter-ideograph;
								/*font-weight: 200;*/
								font-size: $reply-content-font-size;

							}

							.reply-imgList {
								width: 180rpx;
								height: 180rpx;
							}

							.reply-foot {
								display: flex;
								justify-content: space-between;
								font-size: 30rpx;
								font-weight: lighter;
								margin-right: 50rpx;

								.time {
									font-size: 25rpx;
									color: gray;
								}

								.action {
									.item {
										height: 30rpx;
										width: 30rpx;
										/*margin-left: 50rpx;*/
									}
								}
							}

						}

					}

					.reply-divide {
						border-bottom: 1px solid #ccc;
						margin-bottom: 10rpx;
						margin-top: 10rpx;
						margin-right: 20rpx;
					}
				}

			}

			.reply-buton {
				border-radius: 50%;
				width: 100rpx;
				height: 100rpx;
				text-align: center;
				font-size: 30rpx;
				position: fixed;
				line-height: 100rpx;
				background-color: $color;
				top: 86vh;
				left: 81vw;
				color: white;
			}

			.up-png {
				width: 100rpx;
				top: 75vh;
				left: 81vw;
				position: fixed;
			}

		}

	}
</style>

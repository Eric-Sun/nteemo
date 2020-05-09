<template>
	<div class="container">
		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar title="修改用户资料" fixed="true" left-icon="back" @clickLeft="navigateBack"  status-bar="false"></uni-nav-bar>
		<!-- #endif-->
		<div>
			<img :src='user.avatarUrl' class='img' @click="uploadImg()" ref="inputer">
		</div>
		<div>
			<input v-model='user.nickName'>
		</div>
		<div>
			<button @click="doModify">保存</button>
		</div>
	</div>
</template>

<script>
	import {
		api
	} from '../../const'
	import {
		checkT
	} from '../../utils/net'
	export default {
		data() {
			return {
				user: {},
				userId: 0
			}
		},
		onLoad() {
			this.userId = uni.getStorageSync("userId");
			console.log(this.userId)
			this.getUserInfo();
		},
		methods: {
			navigateBack(){
					uni.navigateBack({
						
					})
			},
			getUserInfo() {
				const t = uni.getStorageSync('t')
				var that = this;
				this.$http({
					act: 'user.info',
					t: t
				}, function(res) {
					console.log(res.data)
					that.user = res.data
				})
			},
			doModify() {
				let t = uni.getStorageSync("t")
				this.$http({
					act: 'user.modifyNameAndAvatar',
					newName: this.user.nickName,
					newImgId: this.user.avatarImgId,
					t: t
				}, function(res) {
					uni.showToast({
						title: '修改成功',
						icon: 'none',
						duration: 2000,
						success: function() {
							
						}
					})
					uni.switchTab({
						url: `/pages/me/main`
					})

				})
			},
			async uploadImg() {
				var that = this;
				uni.chooseImage({
					count: 1, //最多可以选择的图片总数
					sizeType: ['compressed'], // 只能是原图
					sourceType: ['album'], // 只能是相册
					success: function(res) {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						var tempFilePaths = res.tempFilePaths;
						uni.showToast({
							title: '正在上传...',
							icon: 'loading',
							mask: true,
							duration: 20000
						})


						uni.uploadFile({
							url: api,
							filePath: tempFilePaths[0],
							name: "file",
							header: {
								"Content-Type": "multipart/form-data"
							},
							formData: {
								"act": "img.upload",
								"type": 0 //0为用户上传avatar
							},

							success: function(res) {
								let data1 = JSON.parse(res.data);
								that.user.avatarUrl = data1.url;
								that.user.avatarImgId = data1.imgId;
								uni.hideToast();
							}
						});

					}
				})
			}

		}
	}
</script>

<style lang='scss' scoped>
	.container {
		height: 100vh;
		background-color: rgb(245, 245, 249);
		display: flex;
		flex-direction: column;
		align-items: center;
		color: $color;
		font-size: 30rpx;
		background-color: white;

		.img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			margin-top: 30rpx;
		}

		.upload {
			opacity: 0;
			filter: alpha(opacity=0);
			height: 95px;
			width: 100px;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 9;
		}

	}
</style>

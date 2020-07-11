<template>
	<div class="container">
		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar title="发布" fixed="true" status-bar="false"></uni-nav-bar>
		<!-- #endif-->
		<div class='list'>
			<input class='input' type="text" placeholder-style="color: #BABABA;" placeholder="标题" v-model="title">
		</div>
		<div class="line"></div>

		<textarea v-show="tab==='markdown'" maxlength="-1" placeholder-style="color: #BABABA;" class='textarea' placeholder="静静写出来你想说的"
		 v-model="content"></textarea>
		<!-- <div class="help-block">上传图片(建议图片格式为：JPEG/BMP/PNG/GIF，大小不超过5M，最多可上传9张)</div> -->
		<!-- <lu class="upload-imgs">
			<li v-if="imgList.length>=9 ? false : true">
				<input type="file" class="upload" @click="uploadImg()" ref="inputer" />
				<a class="add"><i class="iconfont icon-plus"></i>
					<p>点击上传图片</p>
				</a>
			</li>
			<li v-for='(img, index) in imgList' :key='index'>
				<p class="img"><img :src="img.url"><a class="close" @click="delImg(index)">x</a>
				</p>
			</li>
		</lu> -->
		<div class="line"></div>
		<div class="topicInfo">
			<div class="topicLeft">
				选择话题
			</div>
			<picker @change="bindTopicPickerChange" class="topicPicker" :value="index" :range="array">

				<div>{{array[index]}}</div>
			</picker>
		</div>
		<div class="line"></div>
		<div class="btn-div">
			<button class="btn" @click.stop="handle">发帖</button>
		</div>
	</div>
</template>

<script>
	import login from '../../components/login'
	import {
		api
	} from '../../const'
	import {
		barId
	} from '../../const'
	import {
		checkT
	} from '../../utils/net'


	export default {
		components: {
			login
		},

		watch: {
			content(next) {}
		},
		data() {
			return {
				title: '',
				content: '',
				loginVisible: false,
				tab: 'markdown', // or preview
				t: '',
				imgList: [],
				array: ['中国', '美国', '巴西', '日本'],
				index: 0
			}
		},
		methods: {
			bindTopicPickerChange(e) {
				this.index = e.target.value
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
								"type": 2
							},
							dataType: "json",
							success: function(res) {
								var data = JSON.parse(res.data);
								var file = new Object();
								file.url = data.url;
								file.imgId = data.imgId;
								that.imgList.push(file);
								uni.hideToast();
							}
						});

					}
				})
			},
			delImg(index) {
				this.imgList.splice(index, 1);
			},
			bindPickerChange(e) {
				this.type.index = e.mp.detail.value
			},
			bindPickerChange1(e) {
				this.anon.index = e.mp.detail.value
			},
			changeTab(e) {
				this.tab = e.target.dataset.tab
			},
			async handle() {
				if (this.title.length == 0) {
					uni.showToast({
						title: '标题不能为空',
						icon: 'none',
						duration: 2000
					})
					return;
				}

				if (this.content.length == 0) {
					uni.showToast({
						title: '内容不能为空',
						icon: 'none',
						duration: 2000
					})
					return
				}

				var imgIdList = [];
				for (var i = 0; i < this.imgList.length; i++) {
					imgIdList.push(this.imgList[i].imgId)
				}
				var that = this;
				
				this.$http({
					act: 'post.add',
					t: this.t,
					barId: `${barId}`,
					title: this.title,
					content: this.content,
					imgList: JSON.stringify(imgIdList),
					topicIdList: JSON.stringify([this.index]),
					type: 0
				}, function(res) {
					if (!res.data.code) {
						uni.showToast({
							title: '发帖成功',
							icon: 'none',
							duration: 2000
						})
						that.title = ''
						that.content = ''
						uni.switchTab({
							url: `../index/main`
						})
					} else if (res.data.code == 6) {
						uni.showToast({
							title: '您发的标题或内容违规，请修改后重发',
							icon: 'none',
							duration: 2000
						})
					}
				}, function() {}, [6]);
			}
		},
		onShow() {
			var that = this;
			this.t = uni.getStorageSync("t");
			this.imgList = [];

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

				});

			this.$http({
				act: 'topic.list',

			}, function(res) {
				that.array = res.data.data.map(function(v) {
					return v.name
				});
			});
		}
	}
</script>

<style lang='scss' scoped>
	.container {
		height: 100vh;
		/* width: 100%; */
		background-color: white;
		margin-left: 20rpx;
		margin-right: 20rpx;



		.list {
			display: flex;
			/*justify-content: space-between;*/
			background-color: white;
			margin-left: 20rpx;
			margin-bottom: 10rpx;

			.input {}
		}

		.line {
			height: 1rpx;
			border-bottom: solid 1rpx #C5C5C5;
		}

		.picker {
			display: flex;
			/*justify-content: space-between;*/
			background-color: white;
			height: 90rpx;
			line-height: 90rpx;
		}

		.textarea {
			width: 100%;
			background-color: white;
			height: 500rpx;
			margin-top: 10rpx;
			margin-left: 20rpx;
			box-sizing: border-box;
			margin-bottom: 10rpx;
		}

		.topicInfo {
			margin-left: 20rpx;
			margin-top: 20rpx;
			display: flex;
			flex-direction: row;
			margin-bottom: 10rpx;


			.toplicLeft {}

			.topicPicker {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				margin-left: 50rpx;
			}

		}

		.btn-div {
			margin-top: 20rpx;
			margin-left: 50rpx;
			margin-right: 50rpx;
			justify-items: center;

			.btn {
				width: 300rpx;
			}
		}


	}
</style>

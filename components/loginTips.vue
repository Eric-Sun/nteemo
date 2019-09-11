<template>
<!--  <div class="mask">
    <div class="topsContent">
      登录用户会自动记录浏览过的位置
    </div>
    <div class="showLogin">
        <button size="mini">去登录</button>
    </div>
  </div> -->
</template>
<script>
  import {api, barId} from '../const'

  export default {
    props: {
      postId: 0,
      replyId: {
        default: '',
        type: String
      },
      replyUserName: {
        default: '',
        type: String
      },
      content: {
        default: '',
        type: String
      },
      // 帖子本身是否是匿名帖子
      postAnonymous: {
        default: '0',
        type: String
      },
      // 用户是否是发帖用户
      isPostUserId: {
        default: false,
        type: Boolean
      },
      imgList: {
        default: [],
        type: Array
      }

    },
    data: function () {
      return {
        anon: {
          pickerData: ['非匿名', '匿名'],
          index: -1,
          replyAnonymous: 1 //此评论是否是匿名评论，默认为匿名
        }
      }
    },
    methods: {
      async uploadImg() {
        var that = this;
        wx.chooseImage({
          count: 1, //最多可以选择的图片总数
          sizeType: ['original'], // 只能是原图
          sourceType: ['album'], // 只能是相册
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            wx.showToast({
              title: '正在上传...',
              icon: 'loading',
              mask: true,
              duration: 10000
            })


            wx.uploadFile({
              url: `${api}`,
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
              success: function (res) {
                var data = JSON.parse(res.data);
                var file = new Object();
                file.url = data.url;
                file.imgId = data.imgId;
                that.imgList.push(file);
                wx.hideToast();
              }
            });

          }
        })
      },
      delImg(index) {
        this.imgList.splice(index, 1);
      },
      changeAnonymous: function (e) {
        this.replyAnonymous = e.target.dataset.value
      },
      prevent() {

      }
      ,
      async send() {
        var that = this
        const t = wx.getStorageSync('t')
        var pureContent = ''
        if (this.replyId != 0) {
          var count = `@${this.replyUserName}:`.length
          pureContent = this.content.substring(count)
        } else {
          pureContent = this.content
        }
        var imgIdList = [];
        for (var i = 0; i < this.imgList.length; i++) {
          imgIdList.push(this.imgList[i].imgId)
        }
        await
          this.$http.get(
            `${api}`,
            {
              act: 'reply.add',
              t: t,
              content: pureContent,
              postId: this.postId,
              barId: `${barId}`,
              anonymous: this.replyAnonymous,
              lastReplyId: this.replyId,
              imgListStr: JSON.stringify(imgIdList)
            }
          ).then(function (res) {
            if (!res.data.code) {
              that.content = ''
              that.$emit('reply-success')
            } else if (res.data.code == 6) {
              wx.showToast({
                title: '您发的标题或内容违规，请修改后重发',
                icon: 'none',
                duration: 2000
              })
            }
          })
        this.imgList = []
      }
      ,
      closeModal() {
        this.$emit('close-modal')
      }
    }
  }
</script>
<style lang='scss' scoped>
  .mask {
    top: 0;
    height: 60rpx;
    width:100%;
    position: fixed;
    z-index: 1;
    display: flex;
    background-color: #a3c1ff;
    padding-left:20rpx;
    padding-right:20rpx;
    .topsContent{
      font-size:35rpx;
    }
    .showLogin{
      background-color:blue;
    }
    
  }
</style>


<template>
  <div class="container">
	  <!-- #ifdef APP-PLUS -->
	  <uni-nav-bar  title="列表"  fixed="true" left-icon="back" @clickLeft="navigateBack" status-bar="false"></uni-nav-bar>
	  <!-- #endif-->
    <!--<bottomAction v-if="bottomActionVisible" @close-modal="closeModal" :postId="deletedPostId"></bottomAction>-->
    <div class='margin' v-for='item in currentData' :key='item.id'>
      <card :item='item' :hidden='true' @reloadCardList="reloadCardList" @close-modal='closeModal'></card>
    </div>

  </div>
</template>
<script>
  import {api, barId} from '../../const'
  import card from '../../components/card'
  import bottomAction from '../../components/bottomAction'
  import {checkT} from '../../utils/net'
  import login from '../../components/login'
  
  export default {
    data() {
      return {
        currentData: [],
        t: 0,
        bottomActionVisible: false,
        deletedPostId: 0,
        type: '',
        otherUserId: 0,
        loginVisible: false
      }
    },
    components: {
      card,
      bottomAction,
      login
    },
    onLoad(options) {
      this.type = options.type
      console.log('type=' + this.type)
      this.t = uni.getStorageSync('t')
      this.otherUserId = options.otherUserId
      this.loadData()

    },
    onShow() {
      var that = this;
      var t = uni.getStorageSync("t")
      checkT(this,t,
        function () {
			console.log("t is ok")
          uni.navigateTo({
          	url:"../login/main"
          })
        },
        function () {
			console.log("t is expired;")
        }
      );
    },
    methods: {
		navigateBack(){
				uni.navigateBack({
					
				})
		},
      loadData() {
        // from 最近话题 最近回复
        switch (this.type) {
          case 'topic':
            this.getRecentlyPost()
            uni.setNavigationBarTitle({
              title: '最近话题'
            })
            break
          case 'reply':
            this.recentlyReplyList()
            uni.setNavigationBarTitle({
              title: '最近回复'
            })
            break
          case 'otherUserTopic':
            this.getOtherUserPostList()
            uni.setNavigationBarTitle({
              title: '最近回复'
            })
            break

        }
      }
      ,
      // closeModal: function () {
      //   this.bottomActionVisible = false
      // },
      // showActionModal: function (data) {
      //   this.bottomActionVisible = true
      //   this.deletedPostId = data
      //
      // },
      reloadCardList() {
        this.loadData()
      }
      ,
      async getRecentlyPost() {
          this.$http({
            act: 'post.recentlyPostList',
            t: this.t,
            barId: `${barId}`,
            pageNum: 0,
            size: 10
          },function(res){
			  this.currentData = res.data.list
		  })
      },

      async getOtherUserPostList() {
          this.$http({
            act: 'post.recentlyOtherUserPostList',
            t: this.t,
            barId: `${barId}`,
            otherUserId: this.otherUserId,
            pageNum: 0,
            size: 10
          },function(res){
			  this.currentData = res.data.list
		  })
      }
      ,
      async recentlyReplyList() {
          this.$http( {
            act: 'post.recentlyReplyList',
            t: this.t,
            barId: `${barId}`,
            pageNum: 0,
            size: 10
          },function(res){
			  this.currentData = res.data.list
		  })
      }
    }
  }
</script>
<style lang='scss' scoped>
  .container {
    background-color: rgb(245, 245, 249);
    min-height: 100vh;

    .margin {
      margin-bottom: 20rpx;
    }
  }
</style>

const {
  envList
} = require('../../../envList.js');
Page({
  data: {
    nickname: '',
    mobile: ''
  },
  gotoHome: async function (data) {
    const {
      nickname,
      mobile
    } = data?.detail?.value;
    if (nickname == false || mobile == false) {
      return wx.showToast({
        title: '用户昵称和手机号不能为空！',
        icon: 'none',
        duration: 2000
      })
    }
    wx.showLoading({
      title: 'loading...',
    })
    const {
      result
    } = await wx.cloud.callFunction({
      name: "userLogin",
      config: {
        env: envList[0].envId,
      },
      data: {
        username: nickname,
        mobile,
      },
    });
    wx.hideLoading()
    if (result?.success) {
      this.setData({
        nickname: '',
        mobile: ''
      })
      wx.navigateTo({
        url: '/page/component/Home/home'
      })
    } else {
      wx.showToast({
        title: result.msg,
        icon: 'error',
        duration: 10000
      })
    }
    // complete: (res) => {
    //   /**
    //    * 调用成功的话 success:true
    //    * 调用失败的话 success:false
    //    */
    //   console.log(res);
    //   // wx.navigateTo({
    //   //   url: '/page/component/Home/home'
    //   // })
    // },
  },
  onLoad() {},
});
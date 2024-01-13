const { envList } = require('../../../envList.js');
Page({
  gotoHome: function () {
    
    wx.cloud.callFunction({
      name: "userLogin",
      config: {
        env: envList[0].envId,
      },
      data: {
        username: '王八',
        mobile: '13312121212',
      },
      complete: (res) => {
        /**
         * 调用成功的话 success:true
         * 调用失败的话 success:false
         */
        console.log("callFunction test result: ", res);
        wx.navigateTo({
          url: '/page/component/Home/home'
        })
      },
    });
  },
  onLoad() {
  },
});

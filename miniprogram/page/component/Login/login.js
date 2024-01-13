const { envList } = require('../../../envList.js');
Page({
  gotoHome: function () {
    // wx.navigateTo({
    //   url: '/page/component/Home/home'
    // })
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
        console.log("callFunction test result: ", res);
      },
    });
  },
  onLoad() {
  },
});

const {
  envList
} = require('../../../envList.js');
// page/component/Home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onSubmit: function () {
    // wx.navigateTo({
    //   url: '/page/component/Home/home'
    // })
    wx.cloud.callFunction({
      name: "submit",
      config: {
        env: envList[0].envId,
      },
      data: {
        name: 'name',
        gender: 'gender',
        studentId: 'studentId',
        class: 'class',
        phone: 'phone',
        college: 'college',
        major: 'major',
        email: 'email',
        address: 'address',
      },
      complete: (res) => {
        /**
         * 调用成功的话 success:true
         * 调用失败的话 success:false
         */
        console.log("callFunction test result: ", res);
      },
    });
  },
})
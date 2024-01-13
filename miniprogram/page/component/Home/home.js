const {
  envList
} = require('../../../envList.js');
// page/component/Home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    gender: 'male',
    studentId: '',
    class: '',
    phone: '',
    college: '',
    major: '',
    email: '',
    address: '',
  },


  onSubmit: async function (data) {
    const {
      name,
      gender,
      studentId,
      class: className,
      phone,
      college,
      major,
      email,
      address,
    } = data?.detail?.value;
    if (
      address == false ||
      className == false ||
      college == false ||
      email == false ||
      gender == false ||
      major == false ||
      name == false ||
      phone == false ||
      studentId == false
    ) {
      return wx.showToast({
        title: '请完整填写内容！',
        icon: 'none',
        duration: 2000
      })
    }
    wx.showLoading({
      title: 'loading...',
    })
    // wx.navigateTo({
    //   url: '/page/component/Home/home'
    // })
    const {result} = await wx.cloud.callFunction({
      name: "submit",
      config: {
        env: envList[0].envId,
      },
      data: {
        address,
        class: className,
        college,
        email,
        gender,
        major,
        name,
        phone,
        studentId,
      }
    });
    /**
     * 调用成功的话 success:true
     * 调用失败的话 success:false
     */
    wx.hideLoading()
    if (result?.success) {
      
      wx.showModal({
        title: '成功',
        content:'数据已经提交完毕！',
        showCancel:false,
        complete:()=>{
          this.setData({
            name: '',
            gender: 'male',
            studentId: '',
            class: '',
            phone: '',
            college: '',
            major: '',
            email: '',
            address: '',
          })
        }
      })
    } else {
      wx.showToast({
        title: result.msg,
        icon: 'error',
        duration: 10000
      })
    }
  },
})
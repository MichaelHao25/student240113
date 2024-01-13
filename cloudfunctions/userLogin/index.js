// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  // traceUser:true,
})
const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const {
    OPENID: openid,
    APPID: appid
  } = cloud.getWXContext();
  const {
    mobile,
    username
  } = event;
  if (mobile == false || username == false || openid == false || appid == false) {
    return {
      success: false,
      msg: '用户信息不完整,请检查信息;'
    }
  }
  const user = await db.collection('user').where({
    openid: _.eq(openid),
    appid: _.eq(appid),
  }).get();
  /**
   * 用户存在
   */
  if (user.data.length !== 0) {
    /**
     * 并且是一个人
     */
    if (user.data.length === 1) {
      const [item] = user.data;
      if (item.username === username && item.mobile === mobile) {
        await db.collection('user').where({
          openid: _.eq(openid),
          appid: _.eq(appid),
        }).update({
          data: {
            login: true,
          }
        });
        return {
          success: true,
          msg: '登陆成功!'
        }
      }
    } else {
      /**
       * 如果不是一条数据的话
       */
      return {
        success: false,
        msg: '服务器错误，请联系管理员！'
      }
    }
  } else {
    /**
     * 不存在的话就创建用户
     */
    const res = await db.collection('user').add({
      data: {
        openid,
        appid,
        mobile,
        username,
        login: true
      }
    })
    /**
     * 创建失败
     */
    if (!res._id) {
      return {
        success: false,
        msg: '登陆失败,请重试!'
      }
    } else {
      return {
        success: true,
        msg: '登陆成功!'
      }
    }
  }

  return {
    success: false,
    msg: '未知错误'
  }
}
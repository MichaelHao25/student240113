// 云函数入口文件
const cloud = require('wx-server-sdk')
/**
 * 初始化
 */
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  // traceUser:true,
})
/**
 * 初始化
 */
const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  /**
   * 获取变量
   */
  const {
    OPENID: openid,
    APPID: appid
  } = cloud.getWXContext();
  /**
   * 获取参数
   */
  const {
    name,
    gender,
    studentId,
    class: className,
    phone,
    college,
    major,
    email,
    address
  } = event;
  /**
   * 参数预校验
   */
  if (
    name == false ||
    gender == false ||
    studentId == false ||
    className == false ||
    phone == false ||
    college == false ||
    major == false ||
    email == false ||
    address == false
  ) {
    return {
      success: false,
      msg: '信息不完整,请检查信息;'
    }
  }
  /**
   * 添加数据
   */
  const res = await db.collection('list').add({
    data: {
      name,
      gender,
      studentId,
      class: className,
      phone,
      college,
      major,
      email,
      address,
      openid,
      appid,
    }
  })
  /**
   * 创建失败
   */
  if (!res._id) {
    return {
      success: false,
      msg: '提交失败,请重试!'
    }
  } else {
    /**
     * 创建成功
     */
    return {
      success: true,
      msg: '提交成功!'
    }
  }
}
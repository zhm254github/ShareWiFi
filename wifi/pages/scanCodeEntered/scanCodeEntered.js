// pages/scanCodeEntered/scanCodeEntered.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ssid: '',
    password: '',
    scene: ''
  },
  connectWiFi: function() {
    wx.startWifi({
      success: (res) => {
        //console.log(res);
        wx.connectWifi({
          SSID: this.data.ssid,
          password: this.data.password,
          success: (res) => {
            //console.log(res);
            wx.showLoading({
              title: '连接中',
            })
            wx.getConnectedWifi({
              success: () => {
                //wx.hideLoading();
                wx.showToast({
                  title: '连接成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.redirectTo({
                  url: '../scanCodeResult/scanCodeResult?scene=' + this.data.scene
                })
              },
              fail: (res) => {
                wx.showToast({
                  title: '连接失败',
                  icon: 'none',
                  duration: 2000
                })
                wx.redirectTo({
                  url: '../scanCodeResult/scanCodeResult?scene=' + this.data.scene
                })
              }
            })
          },
          fail: (res) => {
            //console.log(res);
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(query) {
    this.data.scene = decodeURIComponent(query.scene);
    this.setData({
      scene: this.data.scene
    });
    // var scene = 6;
    // console.log(scene);
    // console.log(typeof scene);
    wx.request({
      url: 'https://wifi.cou8123.cn/api/wxapp/public/getwfinfo',
      data: {
        id: this.data.scene
      },
      method: 'POST',
      success: (res) => {
        //console.log(res);
        this.data.ssid = res.data.data.data.ssid;
        this.setData({
          ssid: this.data.ssid
        });
        this.data.password = res.data.data.data.pw;
        this.setData({
          password: this.data.password
        });
        //console.log(this.data.ssid);
        //console.log(this.data.password);
        // console.log(typeof(this.data.ssid));
        // console.log(typeof(this.data.password));
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
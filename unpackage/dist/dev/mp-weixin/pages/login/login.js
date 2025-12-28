"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    function handleAuth() {
      common_vendor.index.getUserProfile({
        desc: "用于完善用户资料",
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/login/login.vue:35", "获取用户信息成功:", res.userInfo);
          handleAuthSuccess(res.userInfo);
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/login/login.vue:40", "用户拒绝授权:", err);
          handleAuthCancel();
        }
      });
    }
    async function handleAuthSuccess(userInfo) {
      try {
        const loginRes = await common_vendor.index.login({ provider: "weixin" });
        common_vendor.index.__f__("log", "at pages/login/login.vue:78", "登录成功，code:", loginRes.code);
        const mockToken = "mock_token_" + Date.now();
        const fullUserInfo = {
          ...userInfo,
          phone: ""
          // 手机号需要单独授权获取
        };
        common_vendor.index.setStorageSync("token", mockToken);
        common_vendor.index.setStorageSync("userInfo", fullUserInfo);
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success",
          duration: 1500
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/my/my"
          });
        }, 1500);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/login/login.vue:106", "登录失败:", error);
        common_vendor.index.showToast({
          title: "登录失败",
          icon: "none"
        });
      }
    }
    function handleAuthCancel() {
      common_vendor.index.showModal({
        title: "提示",
        content: "未授权将无法使用完整功能，确定要退出吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.exitMiniProgram();
          }
        }
      });
    }
    common_vendor.onUnload(() => {
      common_vendor.index.__f__("log", "at pages/login/login.vue:130", "登录页面卸载");
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(handleAuth)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map

"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/spotList/spotList.js";
  "./pages/my/my.js";
  "./pages/spotDetail/spotDetail.js";
  "./pages/addSpot/addSpot.js";
  "./pages/editInfo/editInfo.js";
}
if (!Array) {
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  _component_uni_popup();
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    const loginPopup = common_vendor.ref(null);
    common_vendor.onLaunch(() => {
      common_vendor.index.__f__("log", "at App.vue:30", "App Launch");
      checkLoginStatus();
    });
    common_vendor.onShow(() => {
      common_vendor.index.__f__("log", "at App.vue:37", "App Show");
      checkLoginStatus();
    });
    common_vendor.onHide(() => {
      common_vendor.index.__f__("log", "at App.vue:44", "App Hide");
    });
    function checkLoginStatus() {
      const token = common_vendor.index.getStorageSync("token");
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (!token || !userInfo) {
        common_vendor.index.__f__("log", "at App.vue:56", "用户未登录，显示授权弹窗");
        setTimeout(() => {
          if (loginPopup.value) {
            loginPopup.value.open();
          }
        }, 500);
      } else {
        common_vendor.index.__f__("log", "at App.vue:64", "用户已登录");
      }
    }
    function handleLogin() {
      common_vendor.index.login({
        provider: "weixin",
        success: (loginRes) => {
          common_vendor.index.__f__("log", "at App.vue:76", "登录成功，code:", loginRes.code);
          common_vendor.index.getUserProfile({
            desc: "用于完善用户资料",
            success: (userRes) => {
              common_vendor.index.__f__("log", "at App.vue:83", "获取用户信息成功:", userRes.userInfo);
              const mockToken = "mock_token_" + Date.now();
              const userInfo = {
                avatar: userRes.userInfo.avatarUrl,
                nickname: userRes.userInfo.nickName,
                phone: ""
                // 手机号需要单独授权获取
              };
              common_vendor.index.setStorageSync("token", mockToken);
              common_vendor.index.setStorageSync("userInfo", userInfo);
              if (loginPopup.value) {
                loginPopup.value.close();
              }
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
            },
            fail: (err) => {
              common_vendor.index.__f__("error", "at App.vue:119", "获取用户信息失败:", err);
              common_vendor.index.showToast({
                title: "获取用户信息失败",
                icon: "none"
              });
              setTimeout(() => {
                common_vendor.index.exitMiniProgram();
              }, 1500);
            }
          });
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at App.vue:161", "登录失败:", err);
          common_vendor.index.showToast({
            title: "登录失败",
            icon: "none"
          });
          setTimeout(() => {
            common_vendor.index.exitMiniProgram();
          }, 1500);
        }
      });
    }
    function handleCancelLogin() {
      common_vendor.index.showModal({
        title: "提示",
        content: "未登录将无法使用完整功能，确定要退出吗？",
        success: (res) => {
          if (res.confirm) {
            if (loginPopup.value) {
              loginPopup.value.close();
            }
            common_vendor.index.exitMiniProgram();
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleCancelLogin),
        b: common_vendor.o(handleLogin),
        c: common_vendor.sr(loginPopup, "ab16cb18-0", {
          "k": "loginPopup"
        }),
        d: common_vendor.p({
          type: "dialog",
          ["mask-click"]: false
        })
      };
    };
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map

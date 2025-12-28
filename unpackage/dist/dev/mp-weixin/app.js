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
const _sfc_main = {
  __name: "App",
  setup(__props) {
    let loginModalShowing = false;
    common_vendor.onLaunch(() => {
      common_vendor.index.__f__("log", "at App.vue:16", "App Launch");
      checkLoginStatus();
    });
    common_vendor.onShow(() => {
      common_vendor.index.__f__("log", "at App.vue:23", "App Show");
      checkLoginStatus();
    });
    common_vendor.onHide(() => {
      common_vendor.index.__f__("log", "at App.vue:30", "App Hide");
    });
    function checkLoginStatus() {
      const token = common_vendor.index.getStorageSync("token");
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (!token || !userInfo) {
        common_vendor.index.__f__("log", "at App.vue:42", "用户未登录，显示授权弹窗");
        if (!loginModalShowing) {
          loginModalShowing = true;
          showLoginModal();
        }
      } else {
        common_vendor.index.__f__("log", "at App.vue:49", "用户已登录");
      }
    }
    function handleLogin() {
      common_vendor.index.login({
        provider: "weixin",
        success: (loginRes) => {
          common_vendor.index.__f__("log", "at App.vue:61", "登录成功，code:", loginRes.code);
          common_vendor.index.getUserProfile({
            desc: "用于完善用户资料",
            success: (userRes) => {
              common_vendor.index.__f__("log", "at App.vue:68", "获取用户信息成功:", userRes.userInfo);
              const mockToken = "mock_token_" + Date.now();
              const userInfo = {
                avatar: userRes.userInfo.avatarUrl,
                nickname: userRes.userInfo.nickName,
                phone: ""
                // 手机号需要单独授权获取
              };
              common_vendor.index.setStorageSync("token", mockToken);
              common_vendor.index.setStorageSync("userInfo", userInfo);
              loginModalShowing = false;
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
              common_vendor.index.__f__("error", "at App.vue:102", "获取用户信息失败:", err);
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
          common_vendor.index.__f__("error", "at App.vue:142", "登录失败:", err);
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
    function showLoginModal() {
      common_vendor.index.showModal({
        title: "登录提示",
        content: "为了给您提供更好的服务，需要获取您的微信授权信息。",
        confirmText: "授权登录",
        cancelText: "取消",
        success: (res) => {
          if (res.confirm) {
            handleLogin();
          } else {
            handleCancelLogin();
          }
        },
        fail: () => {
          loginModalShowing = false;
        }
      });
    }
    function handleCancelLogin() {
      common_vendor.index.showModal({
        title: "提示",
        content: "未登录将无法使用完整功能，确定要退出吗？",
        success: (res) => {
          if (res.confirm) {
            loginModalShowing = false;
            common_vendor.index.exitMiniProgram();
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return {};
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

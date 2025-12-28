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
    common_vendor.onLaunch(() => {
      common_vendor.index.__f__("log", "at App.vue:12", "App Launch");
      checkLoginStatus();
    });
    common_vendor.onShow(() => {
      common_vendor.index.__f__("log", "at App.vue:19", "App Show");
      checkLoginStatus();
    });
    common_vendor.onHide(() => {
      common_vendor.index.__f__("log", "at App.vue:26", "App Hide");
    });
    function checkLoginStatus() {
      const token = common_vendor.index.getStorageSync("token");
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (!token || !userInfo) {
        common_vendor.index.__f__("log", "at App.vue:38", "用户未登录，显示登录提示");
        setTimeout(() => {
          common_vendor.index.showModal({
            title: "提示",
            content: "您还未登录，是否立即登录？",
            confirmText: "立即登录",
            cancelText: "取消",
            success: (res) => {
              if (res.confirm) {
                common_vendor.index.$emit("triggerLogin");
              } else {
                common_vendor.index.showToast({
                  title: "需要登录才能使用",
                  icon: "none"
                });
              }
            }
          });
        }, 500);
      } else {
        common_vendor.index.__f__("log", "at App.vue:62", "用户已登录");
      }
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

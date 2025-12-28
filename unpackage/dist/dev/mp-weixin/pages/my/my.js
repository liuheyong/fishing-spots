"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  const _component_uni_list_item = common_vendor.resolveComponent("uni-list-item");
  const _component_uni_list = common_vendor.resolveComponent("uni-list");
  (_component_uni_icons + _component_uni_list_item + _component_uni_list)();
}
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const stats = common_vendor.ref({
      spotCount: 0,
      favoriteCount: 0,
      visitCount: 0
    });
    common_vendor.onShow(() => {
      loadStats();
    });
    common_vendor.onMounted(() => {
    });
    const loadStats = async () => {
      try {
        const response = await mockGetStats();
        if (response.success) {
          stats.value = response.data;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/my/my.vue:139", "加载统计信息失败:", error);
      }
    };
    const goToMySpots = () => {
      common_vendor.index.showToast({
        title: "功能开发中",
        icon: "none"
      });
    };
    const goToFavorites = () => {
      common_vendor.index.showToast({
        title: "功能开发中",
        icon: "none"
      });
    };
    const goToHistory = () => {
      common_vendor.index.showToast({
        title: "功能开发中",
        icon: "none"
      });
    };
    const goToSettings = () => {
      common_vendor.index.showToast({
        title: "功能开发中",
        icon: "none"
      });
    };
    const goToAbout = () => {
      common_vendor.index.showToast({
        title: "功能开发中",
        icon: "none"
      });
    };
    const mockGetStats = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              spotCount: 12,
              favoriteCount: 8,
              visitCount: 156
            }
          });
        }, 300);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "location",
          size: "80",
          color: "#3cc51f"
        }),
        b: common_vendor.t(stats.value.spotCount),
        c: common_vendor.t(stats.value.favoriteCount),
        d: common_vendor.t(stats.value.visitCount),
        e: common_vendor.p({
          type: "location-filled",
          size: "22",
          color: "#3cc51f"
        }),
        f: common_vendor.o(goToMySpots),
        g: common_vendor.p({
          title: "我的钓点",
          ["show-arrow"]: true,
          clickable: true
        }),
        h: common_vendor.p({
          type: "star-filled",
          size: "22",
          color: "#ff9500"
        }),
        i: common_vendor.o(goToFavorites),
        j: common_vendor.p({
          title: "收藏钓点",
          ["show-arrow"]: true,
          clickable: true
        }),
        k: common_vendor.p({
          type: "clock-filled",
          size: "22",
          color: "#007aff"
        }),
        l: common_vendor.o(goToHistory),
        m: common_vendor.p({
          title: "历史记录",
          ["show-arrow"]: true,
          clickable: true
        }),
        n: common_vendor.p({
          type: "gear-filled",
          size: "22",
          color: "#8e8e93"
        }),
        o: common_vendor.o(goToSettings),
        p: common_vendor.p({
          title: "设置",
          ["show-arrow"]: true,
          clickable: true
        }),
        q: common_vendor.p({
          type: "info-filled",
          size: "22",
          color: "#5ac8fa"
        }),
        r: common_vendor.o(goToAbout),
        s: common_vendor.p({
          title: "关于我们",
          ["show-arrow"]: true,
          clickable: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map

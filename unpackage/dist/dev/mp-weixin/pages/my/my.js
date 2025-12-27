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
    const userInfo = common_vendor.ref({
      avatar: "",
      nickname: "",
      phone: ""
    });
    const userStats = common_vendor.ref({
      spotCount: 0,
      favoriteCount: 0,
      visitCount: 0
    });
    const maskedPhone = common_vendor.computed(() => {
      if (!userInfo.value.phone)
        return "未绑定手机号";
      const phone = userInfo.value.phone;
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    });
    common_vendor.onShow(() => {
      loadUserInfo();
      loadUserStats();
    });
    common_vendor.onMounted(() => {
    });
    const loadUserInfo = async () => {
      try {
        const cachedUserInfo = common_vendor.index.getStorageSync("userInfo");
        if (cachedUserInfo) {
          userInfo.value = cachedUserInfo;
          common_vendor.index.__f__("log", "at pages/my/my.vue:166", "从缓存加载用户信息:", cachedUserInfo);
        }
        const response = await mockGetUserInfo();
        if (response.success) {
          userInfo.value = {
            ...userInfo.value,
            ...response.data
          };
          common_vendor.index.setStorageSync("userInfo", userInfo.value);
        } else {
          common_vendor.index.showToast({
            title: response.message || "加载失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/my/my.vue:188", "加载用户信息失败:", error);
      }
    };
    const loadUserStats = async () => {
      try {
        const response = await mockGetUserStats();
        if (response.success) {
          userStats.value = response.data;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/my/my.vue:204", "加载统计信息失败:", error);
      }
    };
    const goToEdit = () => {
      common_vendor.index.navigateTo({
        url: "/pages/editInfo/editInfo"
      });
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
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("userInfo");
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.showToast({
              title: "已退出登录",
              icon: "success",
              duration: 1500
            });
            setTimeout(() => {
              common_vendor.index.exitMiniProgram();
            }, 1500);
          }
        }
      });
    };
    const mockGetUserInfo = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              avatar: "https://via.placeholder.com/200",
              nickname: "钓鱼爱好者",
              phone: "13812345678"
            }
          });
        }, 300);
      });
    };
    const mockGetUserStats = () => {
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
        a: userInfo.value.avatar || "/static/default-avatar.png",
        b: common_vendor.t(userInfo.value.nickname || "未设置昵称"),
        c: common_vendor.t(maskedPhone.value),
        d: common_vendor.p({
          type: "compose",
          size: "20",
          color: "#3cc51f"
        }),
        e: common_vendor.o(goToEdit),
        f: common_vendor.t(userStats.value.spotCount),
        g: common_vendor.t(userStats.value.favoriteCount),
        h: common_vendor.t(userStats.value.visitCount),
        i: common_vendor.p({
          type: "location-filled",
          size: "22",
          color: "#3cc51f"
        }),
        j: common_vendor.o(goToMySpots),
        k: common_vendor.p({
          title: "我的钓点",
          ["show-arrow"]: true,
          clickable: true
        }),
        l: common_vendor.p({
          type: "star-filled",
          size: "22",
          color: "#ff9500"
        }),
        m: common_vendor.o(goToFavorites),
        n: common_vendor.p({
          title: "收藏钓点",
          ["show-arrow"]: true,
          clickable: true
        }),
        o: common_vendor.p({
          type: "clock-filled",
          size: "22",
          color: "#007aff"
        }),
        p: common_vendor.o(goToHistory),
        q: common_vendor.p({
          title: "历史记录",
          ["show-arrow"]: true,
          clickable: true
        }),
        r: common_vendor.p({
          type: "gear-filled",
          size: "22",
          color: "#8e8e93"
        }),
        s: common_vendor.o(goToSettings),
        t: common_vendor.p({
          title: "设置",
          ["show-arrow"]: true,
          clickable: true
        }),
        v: common_vendor.p({
          type: "info-filled",
          size: "22",
          color: "#5ac8fa"
        }),
        w: common_vendor.o(goToAbout),
        x: common_vendor.p({
          title: "关于我们",
          ["show-arrow"]: true,
          clickable: true
        }),
        y: common_vendor.o(handleLogout)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map

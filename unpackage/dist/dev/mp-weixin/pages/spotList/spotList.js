"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_search_bar = common_vendor.resolveComponent("uni-search-bar");
  const _component_uni_tag = common_vendor.resolveComponent("uni-tag");
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  (_component_uni_search_bar + _component_uni_tag + _component_uni_icons)();
}
const _sfc_main = {
  __name: "spotList",
  setup(__props) {
    const searchKeyword = common_vendor.ref("");
    const spotList = common_vendor.ref([]);
    const currentPage = common_vendor.ref(1);
    const pageSize = common_vendor.ref(15);
    const totalPages = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
    const hasMore = common_vendor.ref(true);
    common_vendor.onLoad(() => {
      loadSpotList();
    });
    common_vendor.onShow(() => {
      common_vendor.index.$on("triggerLogin", handleLogin);
    });
    common_vendor.onMounted(() => {
    });
    function handleLogin() {
      common_vendor.index.getUserProfile({
        desc: "用于完善用户资料",
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/spotList/spotList.vue:102", "获取用户信息成功:", res.userInfo);
          handleAuthSuccess(res.userInfo);
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/spotList/spotList.vue:107", "用户拒绝授权:", err);
          common_vendor.index.showToast({
            title: "需要授权才能使用",
            icon: "none"
          });
        }
      });
    }
    async function handleAuthSuccess(userInfo) {
      common_vendor.index.__f__("log", "at pages/spotList/spotList.vue:135", "用户授权成功，用户信息:", userInfo);
      try {
        const response = await mockLoginApi(userInfo);
        if (response.success) {
          common_vendor.index.setStorageSync("token", response.data.token);
          common_vendor.index.setStorageSync("userInfo", response.data.userInfo);
          common_vendor.index.showToast({
            title: "登录成功",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.switchTab({
              url: "/pages/my/my"
            });
          }, 1500);
        } else {
          common_vendor.index.showToast({
            title: response.message || "登录失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/spotList/spotList.vue:164", "登录失败:", error);
        common_vendor.index.showToast({
          title: "登录失败，请重试",
          icon: "none"
        });
      }
    }
    function mockLoginApi(userInfo) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              token: "mock_token_" + Date.now(),
              userInfo: {
                id: 1,
                avatarUrl: userInfo.avatarUrl,
                nickName: userInfo.nickName,
                gender: userInfo.gender,
                phone: "13800138000"
              }
            },
            message: "登录成功"
          });
        }, 500);
      });
    }
    const loadSpotList = async (isRefresh = false) => {
      if (loading.value)
        return;
      if (isRefresh) {
        currentPage.value = 1;
        spotList.value = [];
        hasMore.value = true;
      }
      loading.value = true;
      try {
        const response = await mockGetSpotList({
          page: currentPage.value,
          pageSize: pageSize.value,
          keyword: searchKeyword.value
        });
        if (response.success) {
          if (currentPage.value === 1) {
            spotList.value = response.data.list;
          } else {
            spotList.value = [...spotList.value, ...response.data.list];
          }
          totalPages.value = response.data.totalPages;
          hasMore.value = currentPage.value < totalPages.value;
          if (hasMore.value) {
            currentPage.value++;
          }
        } else {
          common_vendor.index.showToast({
            title: response.message || "加载失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/spotList/spotList.vue:242", "加载钓点列表失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    const handleSearch = () => {
      currentPage.value = 1;
      loadSpotList(true);
    };
    const handleClear = () => {
      searchKeyword.value = "";
      currentPage.value = 1;
      loadSpotList(true);
    };
    const goToDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/spotDetail/spotDetail?id=${id}`
      });
    };
    const goToAdd = () => {
      common_vendor.index.navigateTo({
        url: "/pages/addSpot/addSpot"
      });
    };
    common_vendor.onPullDownRefresh(() => {
      loadSpotList(true).then(() => {
        common_vendor.index.stopPullDownRefresh();
      });
    });
    common_vendor.onReachBottom(() => {
      if (hasMore.value && !loading.value) {
        loadSpotList();
      }
    });
    const mockGetSpotList = ({ page, pageSize: pageSize2, keyword }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockData = [];
          const totalCount = 45;
          const startIndex = (page - 1) * pageSize2;
          const endIndex = Math.min(startIndex + pageSize2, totalCount);
          for (let i = startIndex; i < endIndex; i++) {
            mockData.push({
              id: i + 1,
              name: keyword ? `${keyword}相关钓点${i + 1}` : `钓点${i + 1}`,
              imageUrl: "http://p3.diaoyur.cn/group3/M00/0B/4C/cjd0iVhwYF-xmeuqfNBk9gLpv4atJ.jpeg",
              type: i % 2 === 0 ? "wild" : "black",
              createTime: (/* @__PURE__ */ new Date()).toISOString()
            });
          }
          const filteredData = keyword ? mockData.filter((item) => item.name.includes(keyword)) : mockData;
          resolve({
            success: true,
            data: {
              list: filteredData,
              totalPages: Math.ceil(totalCount / pageSize2),
              currentPage: page
            }
          });
        }, 500);
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleSearch),
        b: common_vendor.o(handleClear),
        c: common_vendor.o(($event) => searchKeyword.value = $event),
        d: common_vendor.p({
          placeholder: "搜索钓点名称",
          cancelButton: "none",
          modelValue: searchKeyword.value
        }),
        e: common_vendor.f(spotList.value, (item, k0, i0) => {
          return {
            a: item.imageUrl || "/static/default-spot.png",
            b: common_vendor.t(item.name),
            c: "7c22d8f2-1-" + i0,
            d: common_vendor.p({
              text: item.type === "wild" ? "野河" : "黑坑",
              type: item.type === "wild" ? "success" : "primary",
              size: "small"
            }),
            e: item.id,
            f: common_vendor.o(($event) => goToDetail(item.id), item.id)
          };
        }),
        f: spotList.value.length === 0 && !loading.value
      }, spotList.value.length === 0 && !loading.value ? {
        g: common_vendor.p({
          type: "location",
          size: "80",
          color: "#ccc"
        })
      } : {}, {
        h: loading.value
      }, loading.value ? {
        i: common_vendor.p({
          type: "spinner-cycle",
          size: "30",
          color: "#3cc51f"
        })
      } : {}, {
        j: spotList.value.length > 0 && !hasMore.value
      }, spotList.value.length > 0 && !hasMore.value ? {} : {}, {
        k: common_vendor.p({
          type: "plusempty",
          size: "28",
          color: "#fff"
        }),
        l: common_vendor.o(goToAdd)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c22d8f2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/spotList/spotList.js.map

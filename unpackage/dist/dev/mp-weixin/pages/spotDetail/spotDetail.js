"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_tag = common_vendor.resolveComponent("uni-tag");
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  (_component_uni_tag + _component_uni_icons)();
}
const _sfc_main = {
  __name: "spotDetail",
  setup(__props) {
    const spotId = common_vendor.ref("");
    const spotInfo = common_vendor.ref({});
    const images = common_vendor.ref([]);
    common_vendor.onLoad((options) => {
      if (options.id) {
        spotId.value = options.id;
        loadSpotDetail();
      } else {
        common_vendor.index.showToast({
          title: "参数错误",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      }
    });
    const loadSpotDetail = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      try {
        const response = await mockGetSpotDetail(spotId.value);
        if (response.success) {
          spotInfo.value = response.data;
          if (response.data.images && response.data.images.length > 0) {
            images.value = response.data.images;
          } else if (response.data.imageUrl) {
            images.value = [response.data.imageUrl];
          } else {
            images.value = ["/static/default-spot.png"];
          }
        } else {
          common_vendor.index.showToast({
            title: response.message || "加载失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/spotDetail/spotDetail.vue:147", "加载钓点详情失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const previewImage = (index) => {
      common_vendor.index.previewImage({
        urls: images.value,
        current: index
      });
    };
    const handleEdit = () => {
      common_vendor.index.navigateTo({
        url: `/pages/addSpot/addSpot?id=${spotId.value}`
      });
    };
    const handleDelete = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除这个钓点吗？",
        success: async (res) => {
          if (res.confirm) {
            try {
              const response = await mockDeleteSpot(spotId.value);
              if (response.success) {
                common_vendor.index.showToast({
                  title: "删除成功",
                  icon: "success"
                });
                setTimeout(() => {
                  common_vendor.index.navigateBack();
                }, 1500);
              } else {
                common_vendor.index.showToast({
                  title: response.message || "删除失败",
                  icon: "none"
                });
              }
            } catch (error) {
              common_vendor.index.__f__("error", "at pages/spotDetail/spotDetail.vue:204", "删除钓点失败:", error);
              common_vendor.index.showToast({
                title: "网络错误",
                icon: "none"
              });
            }
          }
        }
      });
    };
    const formatDate = (dateString) => {
      if (!dateString)
        return "";
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const formatDateTime = (dateString) => {
      if (!dateString)
        return "";
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
    const mockGetSpotDetail = (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              id,
              name: `钓点${id}`,
              type: parseInt(id) % 2 === 0 ? "wild" : "black",
              imageUrl: "https://via.placeholder.com/600x400",
              images: [
                "https://via.placeholder.com/600x400/3cc51f",
                "https://via.placeholder.com/600x400/2fb015",
                "https://via.placeholder.com/600x400/1a8a0f"
              ],
              location: "北京市朝阳区某某湖",
              phone: "13800138000",
              description: "这是一个不错的钓点，水质清澈，鱼类丰富，适合休闲垂钓。周边环境优美，交通便利，是周末休闲的好去处。",
              createTime: (/* @__PURE__ */ new Date()).toISOString()
            }
          });
        }, 500);
      });
    };
    const mockDeleteSpot = (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: "删除成功"
          });
        }, 500);
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(images.value, (image, index, i0) => {
          return {
            a: image,
            b: common_vendor.o(($event) => previewImage(index), index),
            c: index
          };
        }),
        b: images.value.length > 1,
        c: common_vendor.t(spotInfo.value.name),
        d: common_vendor.p({
          text: spotInfo.value.type === "wild" ? "野河" : "黑坑",
          type: spotInfo.value.type === "wild" ? "success" : "primary"
        }),
        e: common_vendor.p({
          type: "calendar",
          size: "16",
          color: "#999"
        }),
        f: common_vendor.t(formatDate(spotInfo.value.createTime)),
        g: common_vendor.p({
          type: "info",
          size: "18",
          color: "#3cc51f"
        }),
        h: common_vendor.t(spotInfo.value.name),
        i: common_vendor.t(spotInfo.value.type === "wild" ? "野河" : "黑坑"),
        j: common_vendor.t(formatDateTime(spotInfo.value.createTime)),
        k: common_vendor.t(spotInfo.value.location || "暂未标记"),
        l: common_vendor.t(spotInfo.value.phone || "暂无"),
        m: spotInfo.value.description
      }, spotInfo.value.description ? {
        n: common_vendor.p({
          type: "compose",
          size: "18",
          color: "#3cc51f"
        }),
        o: common_vendor.t(spotInfo.value.description)
      } : {}, {
        p: common_vendor.p({
          type: "compose",
          size: "20",
          color: "#fff"
        }),
        q: common_vendor.o(handleEdit),
        r: common_vendor.p({
          type: "trash",
          size: "20",
          color: "#fff"
        }),
        s: common_vendor.o(handleDelete)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fda9a21b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/spotDetail/spotDetail.js.map

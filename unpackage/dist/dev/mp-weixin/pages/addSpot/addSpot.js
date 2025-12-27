"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_main = {
  __name: "addSpot",
  setup(__props) {
    const spotId = common_vendor.ref("");
    const formData = common_vendor.reactive({
      images: [],
      name: "",
      type: "wild",
      location: "",
      phone: "",
      description: ""
    });
    const errors = common_vendor.reactive({
      name: "",
      type: ""
    });
    const submitting = common_vendor.ref(false);
    common_vendor.onLoad((options) => {
      if (options.id) {
        spotId.value = options.id;
        common_vendor.index.setNavigationBarTitle({
          title: "编辑钓点"
        });
        loadSpotDetail();
      } else {
        common_vendor.index.setNavigationBarTitle({
          title: "新增钓点"
        });
      }
    });
    const loadSpotDetail = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      try {
        const response = await mockGetSpotDetail(spotId.value);
        if (response.success) {
          const data = response.data;
          formData.images = data.images || [];
          formData.name = data.name;
          formData.type = data.type;
          formData.location = data.location || "";
          formData.phone = data.phone || "";
          formData.description = data.description || "";
        } else {
          common_vendor.index.showToast({
            title: response.message || "加载失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/addSpot/addSpot.vue:208", "加载钓点详情失败:", error);
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const chooseImage = () => {
      const remainCount = 9 - formData.images.length;
      common_vendor.index.chooseImage({
        count: remainCount,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          common_vendor.index.showLoading({
            title: "上传中..."
          });
          setTimeout(() => {
            formData.images.push(...tempFilePaths);
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "图片上传成功",
              icon: "success"
            });
          }, 1e3);
        }
      });
    };
    const previewImage = (index) => {
      common_vendor.index.previewImage({
        urls: formData.images,
        current: index
      });
    };
    const deleteImage = (index) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除这张图片吗？",
        success: (res) => {
          if (res.confirm) {
            formData.images.splice(index, 1);
          }
        }
      });
    };
    const chooseLocation = () => {
      common_vendor.index.chooseLocation({
        success: (res) => {
          formData.location = res.address || res.name;
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/addSpot/addSpot.vue:294", "选择位置失败:", err);
          common_vendor.index.showToast({
            title: "获取位置失败",
            icon: "none"
          });
        }
      });
    };
    const validateName = () => {
      if (!formData.name.trim()) {
        errors.name = "钓点名称不能为空";
        return false;
      }
      if (formData.name.length < 2) {
        errors.name = "钓点名称至少2个字符";
        return false;
      }
      errors.name = "";
      return true;
    };
    const validateType = () => {
      if (!formData.type) {
        errors.type = "请选择钓点类型";
        return false;
      }
      errors.type = "";
      return true;
    };
    const validateForm = () => {
      const isNameValid = validateName();
      const isTypeValid = validateType();
      return isNameValid && isTypeValid;
    };
    const handleSubmit = async () => {
      if (!validateForm()) {
        common_vendor.index.showToast({
          title: "请检查表单信息",
          icon: "none"
        });
        return;
      }
      if (formData.images.length === 0) {
        common_vendor.index.showToast({
          title: "请至少上传一张图片",
          icon: "none"
        });
        return;
      }
      submitting.value = true;
      try {
        const response = spotId.value ? await mockUpdateSpot(spotId.value, formData) : await mockAddSpot(formData);
        if (response.success) {
          common_vendor.index.showToast({
            title: spotId.value ? "保存成功" : "添加成功",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        } else {
          common_vendor.index.showToast({
            title: response.message || "操作失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/addSpot/addSpot.vue:388", "提交失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      } finally {
        submitting.value = false;
      }
    };
    const mockGetSpotDetail = (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              id,
              name: `钓点${id}`,
              type: "wild",
              images: [
                "https://via.placeholder.com/600x400",
                "https://via.placeholder.com/600x400"
              ],
              location: "北京市朝阳区某某湖",
              phone: "13800138000",
              description: "这是一个不错的钓点"
            }
          });
        }, 500);
      });
    };
    const mockAddSpot = (data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          common_vendor.index.__f__("log", "at pages/addSpot/addSpot.vue:429", "添加钓点:", data);
          resolve({
            success: true,
            message: "添加成功"
          });
        }, 1e3);
      });
    };
    const mockUpdateSpot = (id, data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          common_vendor.index.__f__("log", "at pages/addSpot/addSpot.vue:444", "更新钓点:", id, data);
          resolve({
            success: true,
            message: "保存成功"
          });
        }, 1e3);
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(formData.images, (image, index, i0) => {
          return {
            a: image,
            b: common_vendor.o(($event) => previewImage(index), index),
            c: "766a2513-0-" + i0,
            d: common_vendor.o(($event) => deleteImage(index), index),
            e: index
          };
        }),
        b: common_vendor.p({
          type: "closeempty",
          size: "16",
          color: "#fff"
        }),
        c: formData.images.length < 9
      }, formData.images.length < 9 ? {
        d: common_vendor.p({
          type: "camera",
          size: "40",
          color: "#999"
        }),
        e: common_vendor.o(chooseImage)
      } : {}, {
        f: common_vendor.o(validateName),
        g: formData.name,
        h: common_vendor.o(($event) => formData.name = $event.detail.value),
        i: errors.name
      }, errors.name ? {
        j: common_vendor.t(errors.name)
      } : {}, {
        k: formData.type === "wild"
      }, formData.type === "wild" ? {} : {}, {
        l: common_vendor.n(formData.type === "wild" ? "radio-checked" : ""),
        m: common_vendor.o(($event) => formData.type = "wild"),
        n: formData.type === "black"
      }, formData.type === "black" ? {} : {}, {
        o: common_vendor.n(formData.type === "black" ? "radio-checked" : ""),
        p: common_vendor.o(($event) => formData.type = "black"),
        q: errors.type
      }, errors.type ? {
        r: common_vendor.t(errors.type)
      } : {}, {
        s: formData.location,
        t: common_vendor.o(($event) => formData.location = $event.detail.value),
        v: common_vendor.p({
          type: "location",
          size: "20",
          color: "#3cc51f"
        }),
        w: common_vendor.o(chooseLocation),
        x: formData.phone,
        y: common_vendor.o(($event) => formData.phone = $event.detail.value),
        z: formData.description,
        A: common_vendor.o(($event) => formData.description = $event.detail.value),
        B: common_vendor.t(formData.description.length),
        C: common_vendor.t(submitting.value ? "提交中..." : spotId.value ? "保存" : "提交"),
        D: common_vendor.o(handleSubmit),
        E: submitting.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-766a2513"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/addSpot/addSpot.js.map

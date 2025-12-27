"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_main = {
  __name: "editInfo",
  setup(__props) {
    const formData = common_vendor.reactive({
      avatar: "",
      nickname: "",
      phone: "",
      gender: "male",
      bio: ""
    });
    const errors = common_vendor.reactive({
      nickname: "",
      phone: ""
    });
    const submitting = common_vendor.ref(false);
    common_vendor.onLoad(() => {
      loadUserInfo();
    });
    const loadUserInfo = async () => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      try {
        const response = await mockGetUserInfo();
        if (response.success) {
          Object.assign(formData, response.data);
        } else {
          common_vendor.index.showToast({
            title: response.message || "加载失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/editInfo/editInfo.vue:152", "加载用户信息失败:", error);
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const chooseAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          common_vendor.index.showLoading({
            title: "上传中..."
          });
          setTimeout(() => {
            formData.avatar = tempFilePath;
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "头像上传成功",
              icon: "success"
            });
          }, 1e3);
        }
      });
    };
    const validateNickname = () => {
      if (!formData.nickname.trim()) {
        errors.nickname = "昵称不能为空";
        return false;
      }
      if (formData.nickname.length < 2) {
        errors.nickname = "昵称至少2个字符";
        return false;
      }
      errors.nickname = "";
      return true;
    };
    const validatePhone = () => {
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!formData.phone) {
        errors.phone = "手机号不能为空";
        return false;
      }
      if (!phoneRegex.test(formData.phone)) {
        errors.phone = "请输入正确的手机号";
        return false;
      }
      errors.phone = "";
      return true;
    };
    const validateForm = () => {
      const isNicknameValid = validateNickname();
      const isPhoneValid = validatePhone();
      return isNicknameValid && isPhoneValid;
    };
    const handleSubmit = async () => {
      if (!validateForm()) {
        common_vendor.index.showToast({
          title: "请检查表单信息",
          icon: "none"
        });
        return;
      }
      submitting.value = true;
      try {
        const response = await mockUpdateUserInfo(formData);
        if (response.success) {
          common_vendor.index.showToast({
            title: "保存成功",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        } else {
          common_vendor.index.showToast({
            title: response.message || "保存失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/editInfo/editInfo.vue:287", "保存用户信息失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      } finally {
        submitting.value = false;
      }
    };
    const mockGetUserInfo = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              avatar: "https://via.placeholder.com/200",
              nickname: "钓鱼爱好者",
              phone: "13812345678",
              gender: "male",
              bio: "热爱钓鱼，享受宁静的时光。"
            }
          });
        }, 500);
      });
    };
    const mockUpdateUserInfo = (data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          common_vendor.index.__f__("log", "at pages/editInfo/editInfo.vue:323", "更新用户信息:", data);
          resolve({
            success: true,
            message: "保存成功"
          });
        }, 1e3);
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: formData.avatar || "/static/default-avatar.png",
        b: common_vendor.o(chooseAvatar),
        c: common_vendor.p({
          type: "camera",
          size: "20",
          color: "#999"
        }),
        d: common_vendor.o(chooseAvatar),
        e: common_vendor.o(validateNickname),
        f: formData.nickname,
        g: common_vendor.o(($event) => formData.nickname = $event.detail.value),
        h: errors.nickname
      }, errors.nickname ? {
        i: common_vendor.t(errors.nickname)
      } : {}, {
        j: common_vendor.o(validatePhone),
        k: formData.phone,
        l: common_vendor.o(($event) => formData.phone = $event.detail.value),
        m: errors.phone
      }, errors.phone ? {
        n: common_vendor.t(errors.phone)
      } : {}, {
        o: formData.gender === "male"
      }, formData.gender === "male" ? {} : {}, {
        p: common_vendor.n(formData.gender === "male" ? "radio-checked" : ""),
        q: common_vendor.o(($event) => formData.gender = "male"),
        r: formData.gender === "female"
      }, formData.gender === "female" ? {} : {}, {
        s: common_vendor.n(formData.gender === "female" ? "radio-checked" : ""),
        t: common_vendor.o(($event) => formData.gender = "female"),
        v: formData.bio,
        w: common_vendor.o(($event) => formData.bio = $event.detail.value),
        x: common_vendor.t(formData.bio.length),
        y: common_vendor.t(submitting.value ? "保存中..." : "保存"),
        z: common_vendor.o(handleSubmit),
        A: submitting.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4130e2dc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/editInfo/editInfo.js.map

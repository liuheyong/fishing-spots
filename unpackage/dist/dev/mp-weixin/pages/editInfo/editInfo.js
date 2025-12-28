"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_main = {
  __name: "editInfo",
  setup(__props) {
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/editInfo/editInfo.vue:66", "关于页面加载");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "location",
          size: "100",
          color: "#3cc51f"
        }),
        b: common_vendor.p({
          type: "checkmarkempty",
          size: "18",
          color: "#3cc51f"
        }),
        c: common_vendor.p({
          type: "checkmarkempty",
          size: "18",
          color: "#3cc51f"
        }),
        d: common_vendor.p({
          type: "checkmarkempty",
          size: "18",
          color: "#3cc51f"
        }),
        e: common_vendor.p({
          type: "checkmarkempty",
          size: "18",
          color: "#3cc51f"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4130e2dc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/editInfo/editInfo.js.map

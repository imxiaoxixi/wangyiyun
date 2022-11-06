import { defineComponent, ref, watch, computed, onMounted, onBeforeUnmount, openBlock, createElementBlock, normalizeStyle, createElementVNode, createCommentVNode, renderSlot, Fragment, renderList } from "vue";
var vue3Marquee_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = defineComponent({
  props: {
    direction: {
      type: String,
      default: "normal"
    },
    duration: {
      type: Number,
      default: 20
    },
    delay: {
      type: Number,
      default: 0
    },
    loop: {
      type: Number,
      default: 0
    },
    clone: {
      type: Boolean,
      default: false
    },
    gradient: {
      type: Boolean,
      default: false
    },
    gradientColor: {
      type: Array,
      default: [255, 255, 255]
    },
    gradientWidth: {
      type: String,
      default: "200px"
    },
    pauseOnHover: {
      type: Boolean,
      default: false
    },
    pauseOnClick: {
      type: Boolean,
      default: false
    }
  },
  emits: ["onComplete", "onLoopComplete", "onPause", "onResume"],
  setup(props, { emit }) {
    let cloneAmount = ref(0);
    let minWidth = ref("100%");
    let componentKey = ref(0);
    let containerWidth = ref(0);
    let contentWidth = ref(0);
    let loopCounter = ref(0);
    let loopInterval = ref(null);
    let ready = ref(false);
    let marqueeContent = ref(null);
    let marqueeContainer = ref(null);
    const ForcesUpdate = async () => {
      await checkForClone();
      componentKey.value++;
    };
    const checkForClone = async () => {
      setInterval(() => {
        minWidth.value = "0%";
        if (marqueeContent.value !== null && marqueeContainer.value !== null) {
          if (marqueeContent.value && marqueeContainer.value) {
            if ("clientWidth" in marqueeContent.value && "clientWidth" in marqueeContainer.value) {
              contentWidth.value = marqueeContent.value.clientWidth;
              containerWidth.value = marqueeContainer.value.clientWidth;
              const localCloneAmount = Math.ceil(containerWidth.value / contentWidth.value);
              cloneAmount.value = isFinite(localCloneAmount) ? localCloneAmount : 0;
              return cloneAmount.value;
            } else {
              minWidth.value = "100%";
              return 0;
            }
          } else {
            minWidth.value = "100%";
            return 0;
          }
        } else {
          minWidth.value = "100%";
          return 0;
        }
      }, 100);
    };
    watch(contentWidth, async () => {
      if (props.clone) {
        ForcesUpdate();
      }
    });
    watch(containerWidth, async () => {
      if (props.clone) {
        ForcesUpdate();
      }
    });
    const hoverStarted = () => {
      if (props.pauseOnHover) {
        emit("onPause");
      }
    };
    const hoverEnded = () => {
      if (props.pauseOnHover) {
        emit("onResume");
      }
    };
    const mouseDown = () => {
      if (props.pauseOnClick) {
        emit("onPause");
      }
    };
    const mouseUp = () => {
      if (props.pauseOnClick) {
        emit("onResume");
      }
    };
    const getCurrentStyle = computed(() => {
      let cssVariables = {
        "--duration": `${props.duration}s`,
        "--delay": `${props.delay}s`,
        "--direction": `${props.direction}`,
        "--pauseOnHover": `${props.pauseOnHover ? "paused" : "running"}`,
        "--pauseOnClick": `${props.pauseOnClick ? "paused" : "running"}`,
        "--loops": `${props.loop === 0 ? "infinite" : props.loop}`,
        "--gradient-color": `rgba(${props.gradientColor[0]}, ${props.gradientColor[1]}, ${props.gradientColor[2]}, 1), rgba(${props.gradientColor[0]}, ${props.gradientColor[1]}, ${props.gradientColor[2]}, 0)`,
        "--gradient-width": `${props.gradientWidth}`,
        "--min-width": `${minWidth.value}`
      };
      return cssVariables;
    });
    const showGradient = computed(() => {
      if (props.gradient) {
        return true;
      }
      return false;
    });
    const setupMarquee = async () => {
      if (props.clone) {
        await checkForClone();
        ForcesUpdate();
        ready.value = true;
      } else {
        ready.value = true;
      }
    };
    onMounted(async () => {
      setupMarquee();
      loopInterval.value = setInterval(() => {
        loopCounter.value++;
        if (props.loop !== 0 && loopCounter.value === props.loop) {
          emit("onComplete");
          clearInterval(loopInterval.value);
        }
        emit("onLoopComplete");
      }, props.duration * 1e3);
    });
    onBeforeUnmount(() => {
      clearInterval(loopInterval.value);
    });
    return {
      ready,
      contentWidth,
      containerWidth,
      loopCounter,
      loopInterval,
      minWidth,
      marqueeContent,
      marqueeContainer,
      componentKey,
      showGradient,
      cloneAmount,
      ForcesUpdate,
      checkForClone,
      setupMarquee,
      getCurrentStyle,
      hoverStarted,
      hoverEnded,
      mouseDown,
      mouseUp
    };
  }
});
const _hoisted_1 = {
  class: "transparent-overlay",
  ref: "marqueeContainer"
};
const _hoisted_2 = {
  key: 0,
  class: "overlay"
};
const _hoisted_3 = {
  class: "marquee",
  ref: "marqueeContent"
};
const _hoisted_4 = { class: "marquee" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.ready ? (openBlock(), createElementBlock("div", {
    class: "vue3-marquee",
    style: normalizeStyle(_ctx.getCurrentStyle),
    key: _ctx.componentKey,
    onMouseenter: _cache[0] || (_cache[0] = (...args) => _ctx.hoverStarted && _ctx.hoverStarted(...args)),
    onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.hoverEnded && _ctx.hoverEnded(...args)),
    onMousedown: _cache[2] || (_cache[2] = (...args) => _ctx.mouseDown && _ctx.mouseDown(...args)),
    onMouseup: _cache[3] || (_cache[3] = (...args) => _ctx.mouseUp && _ctx.mouseUp(...args))
  }, [
    createElementVNode("div", _hoisted_1, null, 512),
    _ctx.showGradient ? (openBlock(), createElementBlock("div", _hoisted_2)) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_3, [
      renderSlot(_ctx.$slots, "default")
    ], 512),
    createElementVNode("div", _hoisted_4, [
      renderSlot(_ctx.$slots, "default")
    ]),
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.cloneAmount, (num) => {
      return openBlock(), createElementBlock("div", {
        class: "marquee cloned",
        key: num
      }, [
        renderSlot(_ctx.$slots, "default")
      ]);
    }), 128))
  ], 36)) : createCommentVNode("", true);
}
var Vue3Marquee = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
function install(app, options) {
  const finalOptions = Object.assign({}, {
    name: "Vue3Marquee"
  }, options);
  app.component(`${finalOptions.name}`, Vue3Marquee);
}
const plugin = {
  version: "3.1.2",
  install
};
export { Vue3Marquee, plugin as default, install };

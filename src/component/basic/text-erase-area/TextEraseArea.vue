<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { rgbaToHex } from "@/util/color";
import type { TextEraseAreaProps, TextEraseAreaEmits, TextEraseAreaExpose } from "@/type/basic";

defineOptions({ name: "TextEraseArea" });

const props = withDefaults(defineProps<TextEraseAreaProps>(), {
  duration: 5,
  delay: 0,
  autoStart: true,
});

const emit = defineEmits<TextEraseAreaEmits>();

const containerRef = ref<HTMLDivElement>();
const eraseRef = ref<HTMLSpanElement>();
const bgColor = ref("#ffffff");
const playing = ref(props.autoStart);

const animDuration = computed(() => `${props.duration}s`);
const animDelay = computed(() => `${props.delay}s`);

function readBgColor() {
  if (containerRef.value) {
    bgColor.value = rgbaToHex(window.getComputedStyle(containerRef.value).backgroundColor);
  }
}

function onAnimStart() {
  emit("start");
}

function onAnimEnd() {
  emit("end");
}

function restartAnimation() {
  const el = eraseRef.value;
  if (!el) return;
  el.style.animation = "none";
  void el.offsetHeight;
  el.style.animation = "";
}

function play() {
  readBgColor();
  if (!playing.value) {
    playing.value = true;
    nextTick(restartAnimation);
  } else {
    restartAnimation();
  }
}

function reset() {
  playing.value = false;
}

defineExpose<TextEraseAreaExpose>({ play, reset });

watch(() => props.autoStart, (val) => {
  playing.value = val;
});

onMounted(readBgColor);
</script>

<template>
  <div ref="containerRef" class="text-erase-area">
    <p class="content">{{ content }}</p>
    <p class="erase">
      <span
        v-show="playing"
        ref="eraseRef"
        class="erase-text"
        :style="{ '--bg': bgColor, '--duration': animDuration, '--delay': animDelay }"
        @animationstart="onAnimStart"
        @animationend="onAnimEnd"
      >{{ content }}</span>
    </p>
  </div>
</template>

<style scoped lang="scss">
.text-erase-area {
  width: 100%;
  padding: 1em;
  line-height: 2;
  text-indent: 2em;
  position: relative;

  p {
    text-align: start;
    word-break: break-all;
  }

  .erase {
    position: absolute;
    inset: 1em;

    .erase-text {
      --percentage: 0%;
      background: linear-gradient(
        to right,
        transparent var(--percentage),
        var(--bg, #fff) calc(var(--percentage) + 10px)
      );
      color: transparent;
      animation: erase var(--duration, 5s) var(--delay, 0s) forwards linear;
    }
  }
}

@keyframes erase {
  to {
    --percentage: 100%;
  }
}

@property --percentage {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { TextEraseArea } from "comp-vue-lib";
import type { ComponentApi } from "../../type/types";
import ApiTable from "../ApiTable.vue";
import DemoWidgetTabs from "../DemoWidgetTabs.vue";
import { demoCodes } from "../demoCodes";

const content =
  "这是一段演示文本，文本擦除区域组件会从左到右逐渐擦除显示内容，形成类似打字机反向的视觉效果。适合用于展示公告、提示语等场景，吸引用户注意力。";

const eventLog = ref("—");
const eraseRef = ref<InstanceType<typeof TextEraseArea>>();

function onStart() {
  eventLog.value = "start";
}

function onEnd() {
  eventLog.value = "end";
}

function replay() {
  eraseRef.value?.play();
}

const durationDemoCode = `<TextEraseArea
  :content="content"
  :duration="3"
  @start="onStart"
  @end="onEnd"
/>`;

const api: ComponentApi = {
  props: [
    { name: "content", type: "string", default: "—", required: true, desc: "文本内容" },
    { name: "duration", type: "number", default: "5", required: false, desc: "动画时长（秒）" },
    { name: "delay", type: "number", default: "0", required: false, desc: "延迟开始（秒）" },
    { name: "autoStart", type: "boolean", default: "true", required: false, desc: "是否自动播放" },
  ],
  events: [
    { name: "start", payload: "—", desc: "动画开始" },
    { name: "end", payload: "—", desc: "动画结束" },
  ],
  notes: [
    "通过 ref 调用 play() 重播动画，reset() 重置动画",
  ],
};
</script>

<template>
  <div class="doc-content__header">
    <h2>TextEraseArea 文本擦除</h2>
    <p>从左到右渐进擦除文本的动画组件，支持自定义时长与事件回调</p>
  </div>

  <DemoWidgetTabs :code="demoCodes.textEraseArea">
    <div style="background: #f6f6f7; border-radius: 8px">
      <TextEraseArea :content="content" @start="onStart" @end="onEnd" />
      <p class="widget-hint" style="padding: 0 16px 16px">最近事件：{{ eventLog }}</p>
    </div>
  </DemoWidgetTabs>

  <h3 class="demo-subsection__title">自定义时长 + 手动重播</h3>
  <DemoWidgetTabs :code="durationDemoCode">
    <div style="background: #f6f6f7; border-radius: 8px">
      <TextEraseArea
        ref="eraseRef"
        :content="content"
        :duration="3"
        @start="onStart"
        @end="onEnd"
      />
      <div style="padding: 0 16px 16px">
        <el-button size="small" @click="replay">重播</el-button>
        <span class="widget-hint" style="margin-left: 12px">最近事件：{{ eventLog }}</span>
      </div>
    </div>
  </DemoWidgetTabs>

  <div class="api-section">
    <h3 class="api-section__title">TextEraseArea Props</h3>
    <ApiTable type="props" :rows="api.props" />
  </div>

  <div class="api-section">
    <h3 class="api-section__title">TextEraseArea Events</h3>
    <ApiTable type="events" :rows="api.events" />
    <ul v-if="api.notes?.length" class="api-notes-list">
      <li v-for="note in api.notes" :key="note">{{ note }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use "../../style/demo";
</style>

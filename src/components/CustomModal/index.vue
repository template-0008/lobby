<script setup lang="ts">

defineOptions({
  name: "ResetLoginPwdModal",
});
withDefaults(defineProps<{
  title: string,
  text?: string,
  showCloseIcon?: boolean,
  showClose?: boolean,
  showOk?: boolean,
}>(), {
  showClose: true,
  showOk: true,
  showCloseIcon: true,
});
const modalVisible = defineModel({ required: true, default: false });

const emit = defineEmits<{
  onOk: [void];
  onClose: [void];
}>();

function handleCloseModal() {
  modalVisible.value = false;
  emit("onClose");
}
function onSubmit() {
  emit("onOk");
}
</script>

<template>
  <el-dialog
    v-model="modalVisible"
    v-bind="$attrs"
    :title="title || $t('system.i18nSystem.label.tipTitle')"
    :show-close="false"
    :close-on-click-modal="false"
    style="padding: 0;--el-bg-color: var(--kk-modal-bg-color);--el-dialog-border-radius: 10px;"
    @close="handleCloseModal"
  >
  <template #header>
    <div class="flex-center h-10 relative">
      <h2 class="text-18px">
        {{ title  }}
      </h2>
      <el-button v-if="showCloseIcon" link class="absolute right-0 top-0 w-10 !h-10" @click="handleCloseModal">
        <el-icon size="20" color="#ffffff">
          <Close />
        </el-icon>
      </el-button>
    </div>
  </template>
    <div class=" bg-white rounded-8px max-h-[calc(100vh-320px)] overflow-hidden relative flex flex-col">
      <slot>
        <h2 class="py-5 text-center color-[var(--kk-modal-title)] text-14px">
          {{ text || $t("system.i18nSystem.label.tipTitle") }}
        </h2>
      </slot>
      <div v-if="showOk || showClose" class="pt-5 border-t border-#dfe0e2 flex-center gap-5">
        <div v-if="showOk" class="h-7 min-w-90px bg-#e77e4f rounded-full flex-center cursor-pointer hover:bg-gradient-to-r hover:from-#ff942c hover:to-#ff6920" @click="onSubmit">
          <span class="text-14px text-white select-none">
            {{ $t("system.i18nSystem.opration.confirm") }}
          </span>
        </div>

        <div v-if="showClose" class="h-7 min-w-90px bg-#f5f5f5 rounded-full flex-center cursor-pointer border border-#eee hover:bg-#eee" @click="handleCloseModal">
          <span class="text-14px text-black select-none">
            {{ $t("system.i18nSystem.opration.cancel") }}
          </span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped></style>

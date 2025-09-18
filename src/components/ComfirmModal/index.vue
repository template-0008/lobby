<script setup lang="ts">

defineOptions({
  name: "ResetLoginPwdModal",
});
withDefaults(defineProps<{
  title: string,
  text: string,
  showClose?: boolean,
  showOk?: boolean,
}>(), {
  showClose: true,
  showOk: true,
});
const modalVisible = defineModel({ required: true, default: false });

const emit = defineEmits<{
  onOk: [void];
  onClose: [void];
}>();

function onClose() {
  modalVisible.value = false;
  emit("onClose");
}
function onSubmit() {
  modalVisible.value = false;
  emit("onOk");
}
</script>

<template>
  <el-dialog
    v-model="modalVisible"
    :align-center="true"
    :close-on-click-modal="false"
    :show-close="false"
    :append-to-body="true"
    width="360px"
    style="padding: 0; --el-dialog-border-radius: 10px;"
    @close="onClose"
  >
    <div class="bg-white -mt-10">
      <div class="flex flex-col items-center">
        <img src="@/assets/images/new/alert-icon.png" class="w-162px h-156px" alt="">
        <h2 class="py-5 text-center color-black text-20px">
          {{ title ?? $t("system.i18nSystem.label.tipTitle") }}
        </h2>
        <p class="text-center color-black text-14px pb-5">
          {{ text  ?? $t("system.i18nSystem.hint.confirmAct") }}
        </p>
      </div>
    </div>
    <div class="pt-10 pb-5 border-t border-#dfe0e2 flex-center gap-5">
      <div class="h-7 min-w-90px bg-#e77e4f rounded-full flex-center cursor-pointer hover:bg-gradient-to-r hover:from-#ff942c hover:to-#ff6920" @click="onSubmit">
        <span class="text-14px text-white select-none">
          {{ $t("system.i18nSystem.opration.confirm") }}
        </span>
      </div>

      <div class="h-7 min-w-90px bg-#f5f5f5 rounded-full flex-center cursor-pointer border border-#eee hover:bg-#eee" @click="onClose">
        <span class="text-14px text-black select-none">
          {{ $t("system.i18nSystem.opration.cancel") }}
        </span>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
:deep(.el-dialog__header) {
  height: 0;
}
</style>

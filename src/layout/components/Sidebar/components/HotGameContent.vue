<template>
  <div class="overflow-y-auto grid grid-cols-4 gap-3 p-5">
    <template v-if="hotGameList.length > 0">
      <div class="flex justify-end col-span-4" v-if="isCollect">
        <el-button type="danger" @click="onEditCollect">{{ $t('web.i18nFront.label.edit') }}</el-button>
      </div>
      <div class="flex-center h-10 rounded-5px text-#fff bg-#bf625d cursor-pointer transition-all duration-300 hover:bg-#6a2424 hover:text-#fff" v-for="(item, index) in hotGameList" :key="`${item.outerGamerID}-hot-game-${index}`" @click="onClickGame(item)">
        <span>{{ item.subgameDes ?? item.lottoName }}</span>
      </div>
    </template>
    <template v-else>
      <div class="flex justify-end col-span-4" v-if="isCollect">
        <el-button type="danger" @click="onEditCollect">{{ $t('web.i18nFront.label.edit') }}</el-button>
      </div>
      <div class="flex-center flex-col col-span-4">
        <el-empty :description="$t('web.i18nFront.hint.noData')" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { IObject } from "@/01-kk-system/allHttp/types/common";
import useLinkOpenFunc from "@/04-kk-component-admin/components/hooks/useLinkOpenFunc";

const props = withDefaults(defineProps<{
  hotGameList: IObject[];
  isCollect: boolean;
}>(), {
  hotGameList: () => [],
  isCollect: false,
});

const emit = defineEmits<{
  onEditCollect: [void];
}>();

const { onClickOuterSubGame, onClickClassiGame } = useLinkOpenFunc();

const onClickGame = (game: IObject) => {
  if (props.isCollect) {
    onClickClassiGame(game)
    return false;
  }
  onClickOuterSubGame(game)
}

const onEditCollect = () => {
  emit('onEditCollect')
}
</script>

<style scoped>

</style>

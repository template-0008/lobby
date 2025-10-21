<template>
  <div
    class="game-box"
    v-loading="loading"
    element-loading-background="rgba(122, 122, 122, 0.8)"
  >
    <div
      class="flex mt-5 mb-5 overflow-hidden"
      v-for="(game, i) in finalGameList"
      :key="i"
    >
      <div
        class="w-120px h-10 color-#000000 text-sm flex-center shrink-0 flex-wrap font-500"
      >
        <span>{{ game.title }}</span>
      </div>
      <div class="flex gap-2 flex-1 flex-wrap">
        <a
          href="javascript:void(0)"
          class="game-btn"
          v-for="(item, i) in game.children"
          :key="`${i}-game`"
          @click="onClickGame(item)"
        >
          <span>{{ item.outerGamerName }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IObject } from '@/01-kk-system/allHttp/types/common';
import useLinkOpenFunc from '@/04-kk-component-admin/components/hooks/useLinkOpenFunc';
import { useGameStore } from '@/store';

const props = defineProps<{
  gameList: IObject[];
}>();

const finalGameList = ref<IObject[]>([]);

const loading = ref(false);

const gameStore = useGameStore();
const { onClickOuterGame } = useLinkOpenFunc();

const init = async () => {
  loading.value = true;
  const list = await gameStore.getAvailableOuterGames();
  finalGameList.value = (props.gameList ?? []).map((item) => {
    const gameList = list[item.key ?? ''] ?? []
    return {
      title: item.title,
      key: item.key,
      children: gameList,
    }
  });
  loading.value = false;
}

const onClickGame = (game: IObject) => {
  onClickOuterGame(game)
}

onBeforeMount(() => {
  init();
});
</script>

<style scoped>
.game-box {
  width: 100%;
  background: var(--cp-color141);
  padding: 30px 0;
  border-radius: 12px;
  overflow-y: auto;
}
.game-btn {
  text-align: center;
  display: block;
  background: #e4e0dc;
  width: 138px;
  height: 40px;
  line-height: 40px;
  color: #000000;
  position: relative;
  border: 0;
  border-radius: 4px;
  transition: all 0.3s ease-in;
}
.game-btn:hover, .game-btn.active {
  background: #6a2424;
  color: #fff;
}
</style>

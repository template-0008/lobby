<template>
  <ul class="kk-top-menu color-[#fedbc7] h-full flex items-center justify-start text-base">
    <li class="relative h-full flex-center cursor-pointer mr-4 group" v-for="menu in menus" :key="menu.id" @click="onClickMenu(menu)">
      <div :class="`top-menu-item relative h-full flex-center flex-col`">
        <img class="w-4 h-4 object-contain" :src="menu.icon" alt="">
        <div class="relative font-400 text-14px">{{ menu.title }}</div>
      </div>
      <div v-if="menu.name === 'menu'" class="absolute group-hover:block hidden top-100% -left-200px">
        <div class="m-5 bg-white w-700px p-5 rounded-md">
          <AllMenuContent />
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { IObject } from '@/01-kk-system/allHttp/types/common';
import { localImg } from '@/01-kk-system/allUtils/utils';
import AllMenuContent from '@/components/AllMenuContent/index.vue';
import { useAppStore } from '@/store';

const { t } = useI18n()
const router = useRouter()
const appStore = useAppStore();

const menus = computed(() => {
  return [
    {
      title: t('web.i18nFront.label.home'),
      id: 1,
      name: 'home',
      icon: localImg('images/new/home-icon.png'),
      path: '/home',
    },
    {
      title: t('web.i18nFront.label.menu'),
      id: 7,
      name: 'menu',
      icon: localImg('images/new/menu-cion.png')
    },
    {
      title: t('web.i18nFront.label.platNoti2'),
      id: 6,
      name: 'notice',
      icon: localImg('images/new/notice-icon.png')
    },
  ]
})

const onClickMenu = (menu: IObject) => {
  if (menu.name === 'notice') {
    appStore.toggleNoticeModal(true);
    return;
  }
  if (menu.path) {
    router.push(menu.path);
  }
}
</script>

<style lang="scss" scoped>
.kk-top-menu {
  color: #fedbc7;
}
.top-menu-item {
  align-items: center;
    background: url(@/assets/images/new/menu-bg.png) no-repeat 50%;
    display: flex;
    flex-direction: column;
    height: 64px;
    justify-content: center;
    position: relative;
    width: 56px;
}
.top-menu-item:hover {
  color: #e57f4e;
  font-weight: 700;
}
.kk-top-menu li:not(:last-child):after {
  background: #f6f3ef;
  content: "";
  display: block;
  height: 34px;
  margin-top: -17px;
  position: absolute;
  right: -8px;
  top: 50%;
  width: 1px;
}

</style>

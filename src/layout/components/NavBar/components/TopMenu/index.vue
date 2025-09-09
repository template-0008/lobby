<template>
  <ul class="kk-top-menu h-full flex-1 w-0 overflow-x-auto flex items-center justify-start text-base color-[var(--kk-top-menu-text-color)]">
    <li class="relative h-full px-2 flex-center cursor-pointer" v-for="menu in menus" :key="menu.id" @click="onClickMenu(menu)">
      <div :class="`top-menu relative h-full flex-center ${menu.css ?? ''} ${ (currentRouteName === menu.routeName || menu.routeName === groupID) ? 'active' : '' }`">
        <div class="relative pb-2 font-400 title">{{ menu.title }}</div>
      </div>
      <div class="kk-menu-cover hidden absolute top-0 left-0 right-0 bottom-0 z-10" :style="{ display: isClicked ? 'block' : 'none' }"></div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { IObject } from '@/01-kk-system/allHttp/types/common';
import { useGameStore } from '@/store';

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const isClicked = ref(false)
const gameStore = useGameStore();

const groupID = ref('');

const currentRouteName = computed(() => route.name)

watchEffect(() => {
  groupID.value = route.params?.groupId as unknown as string
})

const menus = computed(() => {
  const groupList = gameStore.allGroups || []
  return [
    {
      title: t('web.i18nFront.label.home'),
      id: 1,
      route: '/',
      routeName: 'Home',
      css: '',
      isHot: false,
      children: null,
    },
    ...groupList,
    {
      title: t('web.i18nFront.title.egame'),
      id: 7,
      route: '/egame',
      routeName: 'EGame',
      css: 'kk-egame',
      isHot: false,
      children: null,
    },
    {
      title: t('web.i18nFront.title.fish'),
      id: 6,
      route: '/fish',
      routeName: 'Fish',
      css: 'kk-fish',
      isHot: false,
      children: null,
    },
    {
      title: t('web.i18nFront.title.lottery'),
      id: 2,
      route: '/games-lobby',
      routeName: 'GamesLobby',
      css: 'kk-lottery',
      isHot: true,
    },
    {
      title: t('web.i18nFront.title.sports'),
      id: 3,
      route: '/sports',
      routeName: 'Sports',
      isHot: false,
      css: 'kk-sports',
      children: null,
    },
    {
      title: t('web.i18nFront.title.realbet'),
      id: 4,
      route: '/realbet',
      routeName: 'Realbet',
      css: 'kk-realbet',
      isHot: false,
      children: null,
    },
    {
      title: t('web.i18nFront.title.chess'),
      id: 5,
      route: '/chess',
      routeName: 'Chess',
      css: 'kk-chess',
      isHot: false,
      children: null,
    },
  ]
})

const onClickMenu = (menu: IObject) => {
  isClicked.value = true
  router.push(menu.route)
  setTimeout(() => {
    isClicked.value = false
  }, 800)
}
</script>

<style lang="scss" scoped>
.kk-top-menu {
  margin: 0 auto;
}
.top-menu {
  transition: all 0.2s;
  white-space: nowrap;
}
.top-menu:hover,
.active {
  color: #5b9afd;
}
.top-menu .title::before,
.title::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #5b9afd;
  box-sizing: border-box;
  transform: scaleX(0);
  transition: all 0.2s;
}
.top-menu:hover .title::before,
.active .title::before {
  transform: scaleX(1);
}

.kk-menu-cover:hover {
  display: block !important;
}

</style>

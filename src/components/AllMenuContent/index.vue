<template>
  <div class="grid grid-cols-3 color-#000000 border border-#eceff2 pb-5">
    <div v-for="menu in allMenus" :key="menu.name" >
      <div class="menu-header flex-center gap-1 bg-#c7a25133 h-45px text-14px">
        <div v-if="menu.name === 'personCenter'" class="kk-item-icon1"></div>
        <div v-if="menu.name === 'teamCenter'" class="kk-item-icon2"></div>
        <div v-if="menu.name === 'systemCenter'" class="kk-item-icon3"></div>
        <span>{{ menu.title }}</span>
      </div>
      <div class="px-3 text-14px color-#666" v-for="child in menu.children" :key="child.pathName">
        <div
          class="menu-item flex-center gap-1 cursor-pointer mt-4 h-8 border border-#ddd rounded-full"
          :class="{ '!border-#893e3a color-#893e3a': headerKeepMenuList.includes(child.pathName) }"
          @click="onClickMenu(child)"
        >
          <template v-if="showSelect">
            <div v-if="headerKeepMenuList.includes(child.pathName)" class="border border-red bg-red-500 w-18px h-18px flex-center">
              <el-icon color="white"><Check /></el-icon>
            </div>
            <div v-else class="border border-#eee w-18px h-18px flex-center">
            </div>
          </template>
          <span class="text-14px">{{ child.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { IObject } from '../CURD/types';
import { useAllMenus } from './useAllMenus';

const props = withDefaults(defineProps<{
  showSelect?: boolean
}>(), {
  showSelect: false
})

const { t } = useI18n();
const appStore = useAppStore();
const router = useRouter();

const { allMenus } = useAllMenus();

const headerKeepMenuList = computed(() => {
  return props.showSelect ? appStore.headerKeepMenuName ?? [] : []
})

const onClickMenu = (data: IObject) => {
  const { path, pathName } = data
  if (!props.showSelect) {
    router.push({ path })
    return
  }
  if (headerKeepMenuList.value.includes(pathName)) {
    appStore.setHeaderKeepMenuName(headerKeepMenuList.value.filter((item) => item !== pathName))
  }
  else if(headerKeepMenuList.value.length >= 4) {
    ElMessage.error(t('web.i18nFront.hint.quickMenuFull'))
  } else {
    appStore.setHeaderKeepMenuName([...headerKeepMenuList.value, pathName])
  }
}

</script>

<style scoped>
.kk-item-icon1 {
  background: url('@/assets/images/new/sprite-icons2.png') no-repeat;
  background-position: -102px -87px;
  height: 14px;
  width: 11px;
}
.kk-item-icon2 {
  background: url('@/assets/images/new/sprite-icons2.png') no-repeat;
  background-position: -151px -88px;
  height: 12px;
  width: 12px;
}
.kk-item-icon3 {
  background: url('@/assets/images/new/sprite-icons2.png') no-repeat;
  background-position: -134px -88px;
  height: 12px;
  width: 14px;
}
</style>

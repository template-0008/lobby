<template>
  <div class="custom-menus flex items-center shrink-0">
    <div class="add-plus h-34px w-34px flex-center bg-#e57f4e rounded-5px cursor-pointer" @click="onAddMenu">
      <el-icon size="20"><Plus /></el-icon>
    </div>
    <div class="flex items-center gap-10px ml-10px" v-for="menu in headerKeepMenuList" :key="menu.name" @click="onClickMenu(menu)">
      <div class="menu-item">
        {{ menu.title }}
      </div>
    </div>
    <CustomModal v-model="showAddMenuModal" width="660px" :title="$t('web.i18nFront.label.addQuickMenu')" :show-close="false" :show-ok="false">
      <AllMenuContent :show-select="true" />
    </CustomModal>
  </div>
</template>

<script setup lang="ts">
import { useAllMenus } from '@/components/AllMenuContent/useAllMenus';
import { IObject } from '@/components/CURD/types';
import { useAppStore } from '@/store';

const { t } = useI18n();
const appStore = useAppStore();
const showAddMenuModal = ref(false);

const { allMenus } = useAllMenus();

const allFlatMenus = computed(() => {
  return allMenus.value.flatMap((item) => item.children)
})

const headerKeepMenuList = computed(() => {
  return allFlatMenus.value.filter((item) => appStore.headerKeepMenuName.includes(item.pathName))
})

const router = useRouter();

const onClickMenu = (menu: IObject) => {
  router.push(menu.path);
}

const onAddMenu = () => {
  showAddMenuModal.value = true;
}

</script>

<style scoped>
.menu-item {
  @apply border border-#dbdbdb rounded-5px box-border color-#fff flex-center h-34px min-w-34px px-10px cursor-pointer;
}
</style>

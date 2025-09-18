<script setup lang="ts">
import { IObject } from "@/01-kk-system/allHttp/types/common";
import { noticeHttp } from "@/01-kk-system/allHttp/userHall/notice";

defineOptions({
  name: "Announcement",
});

const activeName = ref("platform");
const list = ref<IObject>([]);
const loading = ref(false);
const showDetail = ref(false);
const DetailData = ref<IObject>();
const initPressID = ref("");

async function getNoticeList() {
  loading.value = true;
  const res = await noticeHttp.getAllList("3").catch(() => null);
  const { code, data } = res || {};
  if (code === "0") {
    list.value = data || [];
  }
  loading.value = false;
  if (initPressID.value) {
    const target = list.value.find((item: { pressID: string; }) => item.pressID === initPressID.value);
    target && onClickRow(target);
  }
}

function onClickRow(item: Record<string, any>) {
  console.log(item);
  DetailData.value = item;
  showDetail.value = true;
}

onBeforeMount(() => {
  getNoticeList();
  initPressID.value = useRoute().query?.pressID as string;
});
</script>

<template>
  <div class="app-container h-full m-5 bg-white p-4">
    <el-tabs v-model="activeName" class="top-tabs h-full">
      <el-tab-pane
        class="min-h-660px"
        :label="$t('web.i18nFront.label.platNoti')"
        name="platform"
        v-loading="loading"
      >
        <div
          class="notice-row flex items-center justify-between border-b border-b-solid border-#000000"
          v-for="(item, i) in list"
          :key="i"
          @click="onClickRow(item)"
        >
          <div class="flex items-center text-sm">
            <svg-icon
              icon-class="icon-notice-fill"
              size="20px"
              class="mr-2 color-#597ef7"
            />
            <span class="color-#000000">【{{ item.title }}】</span>
          </div>
          <span class="date text-right color-[var(--cp-color223)]">
            {{ item.createTime }}
          </span>
        </div>
        <NoticeDetails
          v-if="showDetail"
          @onClose="showDetail = false"
          :detail="DetailData"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.top-tabs {
  --el-font-size-base: 16px;
}
.notice-row {
  line-height: 36px;
  cursor: pointer;
  padding: 10px 20px;
  border-bottom: 1px solid #efeff4;
}
</style>

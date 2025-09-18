<template>
  <div class="login-container">
    <!-- 顶部 -->
    <div class="absolute-lt flex-x-end py-3 px-12 w-full">
      <switch-language />
    </div>
    <el-card class="!border-none bg-white !rounded-4% w-100 <sm:w-85">
      <div class="text-center relative">
        <h2>{{ brandName }}</h2>
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginData"
        :rules="loginRules"
        class="login-form"
      >
        <el-form-item prop="userName">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="user" class="mx-2" />
            <el-input
              v-model="loginData.userName"
              :placeholder="$t('system.i18nSystem.label.userName')"
              name="userName"
              size="large"
              class="h-[48px]"
            />
          </div>
        </el-form-item>

        <el-form-item prop="password">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="lock" class="mx-2" />
            <el-input
              v-model="loginData.password"
              :placeholder="$t('system.i18nSystem.label.password')"
              type="password"
              name="password"
              @keyup="checkCapslock"
              @keyup.enter="handleLogin"
              size="large"
              class="h-[48px] pr-2"
              show-password
            />
          </div>
        </el-form-item>

        <div class="pb-5 flex items-center justify-between">
        <el-checkbox v-model="isRemember" :label="$t('web.i18nFront.label.keepPwd')" size="large" />
        <template v-if="showInviteBtn && regesterLink" >
          <el-link target="_blank" :href="regesterLink">{{ $t("web.i18nFront.label.registLink") }}</el-link>
        </template>
        <el-button
          v-if="showTryGames"
          round
          class="text-[--kk-hightlight-text-color]"
          style="--el-link-hover-text-color: #597ef7"
          :loading="loading"
          @click="guestLogins"
        >
          {{ $t("web.i18nFront.label.tryPlay") }}
        </el-button>
      </div>

        <el-button
          :loading="loading"
          type="primary"
          size="large"
          class="w-full"
          @click.prevent="handleLogin"
          >{{ $t("system.i18nSystem.opration.login") }}
        </el-button>

        <div class="flex-y-center w-full pt-5">
          <el-link type="primary" @click="onOpenServer" >{{ $t("web.i18nFront.label.server2") }}</el-link>
        </div>
      </el-form>
    </el-card>
    <FloatMenu />
  </div>
</template>

<script setup lang="ts">
import { useAppStore, useChatStore, useUserStore } from "@/store";
import { LoginRequestData } from "@/01-kk-system/allHttp/types/common";
import type { FormInstance } from "element-plus";
import { LocationQuery, useRoute } from "vue-router";
import { platformHttp } from "@/01-kk-system/allHttp/userHall/platform";
import { getDomainName } from "@/01-kk-system/allUtils/utils";
import { getUserLocalInfo, saveUserLocalInfo } from "@/04-kk-component-admin/components/hooks/commonUtil";

const userStore = useUserStore();
const route = useRoute();
const appStore = useAppStore();
const chatStore = useChatStore();
const brandName = ref('')
const router = useRouter();

// Internationalization
const { t } = useI18n();

// Reactive states
const loading = ref(false); // 按钮loading
const isCapslock = ref(false); // 是否大写锁定
const loginFormRef = ref<FormInstance>(); // 登录表单ref
const isRemember = ref(false)
const showTryGames = ref(false)
const showInviteBtn = ref(false)
const regesterLink = ref('')

const loginData = ref<LoginRequestData>({
  userName: "admin",
  password: "12345678",
});

const loginRules = computed(() => {
  return {
    userName: [
      {
        required: true,
        trigger: "blur",
        message: t("system.i18nSystem.message.username_require"),
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: t("system.i18nSystem.message.password_required"),
      },
      {
        min: 6,
        message: t("system.i18nSystem.message.password_min"),
        trigger: "blur",
      },
    ],
  };
});


// 登录
function handleLogin() {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      userStore
        .login(loginData.value)
        .then(() => {
          // 若记住密码，则本地存储, 否则删除本地信息
          if (isRemember.value) {
            saveUserLocalInfo(loginData.value)
          }
          else {
            saveUserLocalInfo(null)
          }
          const { path, queryParams } = parseRedirect();
          router.replace({ path: 'Home', query: queryParams });
          console.log('--login successpath---', path)
          console.log('--login success---', router.currentRoute.value, router.getRoutes())
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
}

function onOpenServer() {
  chatStore.openChat();
}

const fetchInviteUrl = async () => {
  const res = await platformHttp.inviteUrl()
  if (res?.code === "0") {
    const list = res?.data ?? []
    const currentDomainName = getDomainName()
    const target = list.find((item: { invitationURL: string | string[]; }) => item.invitationURL?.includes(currentDomainName))
    if (target) {
      regesterLink.value = target.invitationURL
    } else {
      regesterLink.value = list[0]?.invitationURL ?? ''
    }
  }
}

const guestLogins = async () => {
  try {
    loading.value = true;
    await userStore.guestLogin()
    const { path, queryParams } = parseRedirect();
    router.replace({ path: path, query: queryParams });
  } catch (error) {
  } finally {
    loading.value = false;
  }
}

async function handleDiffConfig() {
  const diffConfig = await appStore.getDiffConfig()
  if (diffConfig?.SHOW_BUTTON_SHIWAN) {
    showTryGames.value = diffConfig?.SHOW_BUTTON_SHIWAN.value === '1'
  } else {
    showTryGames.value = true
  }
  if (diffConfig?.SHOW_BUTTON_ZHUCE) {
    showInviteBtn.value = diffConfig?.SHOW_BUTTON_ZHUCE.value === '1'
  } else {
    showInviteBtn.value = false
  }
}

// 解析 redirect 字符串 为 path 和  queryParams
function parseRedirect(): {
  path: string;
  queryParams: Record<string, string>;
} {
  const query: LocationQuery = route.query;
  const redirect = (query.redirect as string) ?? "/";

  const url = new URL(redirect, window.location.origin);
  const path = url.pathname;
  const queryParams: Record<string, string> = {};

  url.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  return { path, queryParams };
}

/** 检查输入大小写 */
function checkCapslock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState("CapsLock");
  }
}

async function fetchPlatformConfig() {
  const platformConfig = await appStore.getPlatformConfig()
  brandName.value = platformConfig?.brandName ?? ''
}

async function init() {
  const localInfo = getUserLocalInfo()
    loginData.value.userName = localInfo?.userName ?? ''
    loginData.value.password = localInfo?.password ?? ''
    isRemember.value = !!localInfo?.userName
    try {
      loading.value = true
      await Promise.allSettled([
        handleDiffConfig(), // // 配置查询
        fetchInviteUrl(), // 查询注册链接
        fetchPlatformConfig(), // 查询平台配置
      ])
      loading.value = false
    } catch (error) {
      loading.value = false
    }
}

onBeforeMount(() => {
  init()
})
</script>

<style lang="scss" scoped>
.login-container {
  overflow: hidden;
  background: url(@/assets/images/login/app-bg.jpg) no-repeat top #fff;
  background-attachment: fixed;
  background-size: cover;

  @apply wh-full flex-center;

  .login-form {
    padding: 30px 10px;
  }
}

.el-form-item {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      /* 通过延时渲染背景色变相去除背景颜色 */
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}
</style>

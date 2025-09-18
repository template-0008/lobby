import { IObject } from "@/01-kk-system/allHttp/types/common";

export const useAllMenus = () => {
  const { t } = useI18n();

  const allMenus = ref<IObject[]>([
    {
      name: 'personCenter',
      title: t('web.i18nFront.label.personCenter'),
      children: [
        {
          pathName: 'UserAccount',
          title: t('web.i18nFront.label.myPofile'),
          path: '/personal/account',
        },
        {
          pathName: 'UserFinance',
          title: t('web.i18nFront.label.wallet'),
          path: '/personal/finance/wallet',
        },
        {
          path: "/personal/proportion/rewards",
          title: t("web.i18nFront.label.myRewards"),
          pathName: "UserProportion",
        },
        {
          path: "/personal/report/total",
          title: t("web.i18nFront.label.myReport"),
          pathName: "UserRreport",
        },
        {
          path: "/personal/bill",
          title: t("web.i18nFront.label.accountDetail"),
          pathName: "UserBill",
        },
      ]
    },
    {
      name: 'teamCenter',
      title: t('web.i18nFront.label.teamCenter'),
      children: [
        {
          path: "/agent/account/open",
          title: t("web.i18nFront.label.agentShare"),
          pathName: "AgentAccount",
        },
        {
          path: "/agent/report/team-full",
          title: t("web.i18nFront.label.agentReport"),
          pathName: "AgentReport",
        },
      ]
    },
    {
      name: 'systemCenter',
      title: t('web.i18nFront.label.systemCenter'),
      children: [
        {
          path: "/personal/announcement",
          title: t("web.i18nFront.label.platNoti"),
          pathName: "Announcement",
        },
        {
          path: "/help",
          title: t("web.i18nFront.label.helpCenter"),
          pathName: "HelpCenter",
        },
      ]
    }
  ]);

  return {
    allMenus,
  }
}

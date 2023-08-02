const Menuitems = [
  {
    title: "Dashboard",
    icon: "grid",
    href: "/dashboard",
  },

  {
    title: "User",
    icon: "users",
    href: "/user-management",
    sublink: "/user-verification-detail",
    // sublink1: "/user-management",
  },
  {
    title: "Team",
    icon: "codepen",
    href: "/team-management",
  },
  {
    title: "Organization",
    icon: "crosshair",
    href: "/organization",
  },
  {
    title: "Subscription",
    icon: "rss",
    href: "/subscription",
    sublink: "/subscription-plans",
    sublink1: "/invoice",
    sublink2: "/subscription-payment",
  },
  {
    title: "Data Retention",
    icon: "database",
    href: "/data-retention",
  },
  {
    title: "Api Settings",
    icon: "tool",
    href: "/api-setting",
  },
  {
    title: "Roles Management",
    icon: "user-plus",
    href: "/roles-management",
    sublink1: "/add-roles",
    sublink: "/edit-roles",
    sublink2: "/view-roles",
  },
  {
    title: "API Documentation",
    icon: "box",
  },
  {
    title: "FIU",
    icon: "monitor",
  },
];

export const Settingitems = [];

export default Menuitems;

export function GiveIcon(name, give) {
  const menuItem = Menuitems.find(
    (data) => data.title.toLowerCase() === name.toLowerCase()
  );
  if (menuItem) {
    return menuItem[give];
  }
  return "circle";
}
export function GiveSubs(arr, name, give) {
  const menuItem = arr.find(
    (data) => data.tabName.toLowerCase() === name.toLowerCase()
  );
  if (menuItem) {
    return menuItem[give];
  }
  // return [];
}

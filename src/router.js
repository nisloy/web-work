import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./pages/Dashboard.vue";
import Goals from "./pages/Goals.vue";
import GoalDetail from "./pages/GoalDetail.vue";
import Transactions from "./pages/Transactions.vue";
import Reports from "./pages/Reports.vue";
import Settings from "./pages/Settings.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/goals",
    name: "Goals",
    component: Goals,
  },
  {
    path: "/goals/:id",
    name: "GoalDetail",
    component: GoalDetail,
    props: true,
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

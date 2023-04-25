import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import DetailPage from "../views/DetailPage.vue";
import FavoritePage from "../views/FavoritePage.vue";
import HomePage from "../views/HomePage.vue";
import NotFound from '../views/NotFound.vue'
import { useMainStore } from "../stores/main";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
    },
    {
      path: "/details/:id",
      name: "details",
      component: DetailPage,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoritePage,
    },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  try {
    const mainStore = useMainStore();
    mainStore.isLoading = true
    if (
      (to.name === "register" && mainStore.isLogin) ||
      (to.name === "login" && mainStore.isLogin)
    ) {
      next({ name: "home" });
      return mainStore.isLoading = false
    } else if (to.name === "favorites") {
      if (!mainStore.isLogin) {
        next({ name: "login" });
        return mainStore.isLoading = false
      } else {
        await mainStore.getFavorites();
        mainStore.isLoading = false
        return next();
      }
    } else if (to.name === "details") {
      try {
        await mainStore.getFoodById(to.params.id);
        next();
        return mainStore.isLoading = false
      } catch (error) {
        console.log(error);
        return next();
      }
    } else {
      next()
    }
    mainStore.isLoading = false
  } catch (error) {
    console.log(error);
  }
});



export default router;

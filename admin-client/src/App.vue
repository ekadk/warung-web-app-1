<script>
// const baseUrl = "http://localhost:3000";
const baseUrl = "https://restaurant-api-production-68d1.up.railway.app";
import axios from "axios";
import Swal from "sweetalert2";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

import LoginSection from "./components/LoginSection.vue";
import HomeSection from "./components/HomeSection.vue";

export default {
  data() {
    return {
      isLogin: false,
      page: "LoginPage",
      isLoading: false,

      food: [],
      activeFood: [],
      inactiveFood: [],
      categories: [],
      logs: [],

      foodById: [],
    };
  },
  methods: {
    changePage(page, cb) {
      this.page = page;
      if (cb) cb();
    },

    async loginHandler() {
      try {
        this.isLoading = true;
        if (localStorage.access_token) {
          this.isLogin = true;

          await this.fetchAllFood();
          await this.fetchAllCategories();
          await this.fetchLogs();

          this.page = "DashboardPage";
          this.isLoading = false;
        } else {
          this.isLogin = false;
          this.page = "LoginPage";
          this.isLoading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async login(loginForm) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          url: baseUrl + "/users/login",
          method: "post",
          data: loginForm,
        });
        localStorage.setItem("access_token", data.access_token);

        await this.loginHandler();
        this.isLoading = false;
        this.successToast("Signed in successfully");

      } catch (error) {
        console.log(error);
      }
    },

    async register(registerForm) {
      this.isLoading = true;
      try {
        const { data } = await axios({
          url: baseUrl + "/users/register",
          method: "post",
          data: registerForm,
        });
        console.log(data);
        this.changePage("LoginPage");
        this.isLoading = false;
        this.successToast("Account created successfully");
      } catch (error) {
        console.log(error);
      }
    },

    async fetchAllFood() {
      try {
        const { data } = await axios({
          url: baseUrl + "/food",
          method: "get",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.food = data.food.map(el => {
          el.price = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(el.price)
          return el
        });
        
        this.activeFood = this.food.filter((el) => el.status === "Active");
        this.inactiveFood = this.food.filter((el) => el.status === "Inactive");
      } catch (error) {
        console.log(error);
      }
    },

    async fetchAllCategories() {
      try {
        const { data } = await axios({
          url: baseUrl + "/categories",
          method: "get",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.categories = data.categories;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchLogs() {
      try {
        const { data } = await axios({
          url: baseUrl + "/food/logs",
          method: "get",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        data.logs.forEach(el => {
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          el.updatedAt = new Date(el.updatedAt).toLocaleDateString(undefined, options);
        })
        this.logs = data.logs;
      } catch (error) {
        console.log(error);
      }
    },

    async addFood(foodForm) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          url: baseUrl + "/food",
          method: "post",
          data: foodForm,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        await this.fetchAllFood();
        this.changePage("ProductPage");
        this.isLoading = false;
        this.successToast(`food with id ${data.food.id} created`);
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.failToast(error.response.data.message);
      }
    },

    async postCategory(categoryForm) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          url: baseUrl + "/categories",
          method: "post",
          data: categoryForm,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        console.log(data);
        await this.fetchAllCategories();
        this.changePage("CategoryPage");
        this.isLoading = false;
        this.successToast(data.message);
      } catch (error) {
        this.isLoading = false;
        this.failToast(error.response.data.message);
      }
    },

    async getFoodById(id) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          url: baseUrl + `/food/${id}`,
          method: "get",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.foodById = data.food;
        console.log(this.foodById);
        this.changePage("EditProductPage");
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.failToast(error.response.data.message);
      }
    },

    async deleteCategory(id) {
      try {
        const message = 'Every food within this category will be deleted too'
        this.confirmationDialog(message).then(async (result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            const { data } = await axios({
              url: baseUrl + `/categories/${id}`,
              method: "delete",
              headers: {
                access_token: localStorage.access_token,
              },
            });

            console.log(data);
            await this.fetchAllCategories();
            await this.fetchAllFood()
            await this.fetchLogs()
            this.isLoading = false;
            this.successToast(data.message);
          }
        });
      } catch (error) {
        console.log(error);
      }
      console.log(`deleting category with id ${id}`);
    },

    async updateFood(foodForm) {
      this.isLoading = true;
      const id = foodForm.id;
      try {
        const { data } = await axios({
          url: baseUrl + `/food/${id}`,
          method: "put",
          headers: {
            access_token: localStorage.access_token,
          },
          data: foodForm,
        });
        console.log(data);
        await this.fetchAllFood();
        await this.fetchLogs();
        this.changePage("ProductPage");
        this.isLoading = false;
        this.successToast(data.message);
      } catch (error) {
        this.isLoading = false;
        this.failToast(error.response.data.message);
      }
    },

    async updateFoodStatus(payload) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          url: baseUrl + `/food/${payload.id}`,
          method: "patch",
          data: { status: payload.status },
          headers: {
            access_token: localStorage.access_token,
          },
        });
        await this.fetchAllFood();
        await this.fetchLogs();
        this.isLoading = false;
        this.successToast(data.message);
      } catch (error) {
        this.isLoading = false;
        this.failToast(error.response.data.message);
      }
    },

    async GoogleLoginCallback(response) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          url: baseUrl + `/users/google-sign-in`,
          method: "post",
          headers: {
            google_token: response.credential,
          },
        });
        console.log(data);
        localStorage.setItem("access_token", data.access_token);
        this.loginHandler();
        this.isLoading = false;
        this.successToast("Signed in successfully");
      } catch (error) {
        console.log(error);
      }
    },

    logout() {
      localStorage.clear();
      this.loginHandler();
      this.successToast("Signed out successfully");
    },

    // Notifications
    successToast(message) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        text: message,
      });
    },

    failToast(message) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        text: message,
      });
    },

    confirmationDialog(text) {
      return Swal.fire({
        title: "Are you sure?",
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
    },
  },

  components: { LoginSection, HomeSection, Loading },
  created() {
    this.loginHandler();
  },
};
</script>

<template>
  <loading v-model:active="isLoading" :can-cancel="true" />

  <LoginSection
    v-if="!isLogin"
    :page="page"
    @login="login"
    @register="register"
    @changePage="changePage"
    @GoogleLoginCallback="GoogleLoginCallback"
  />
  <HomeSection
    v-if="isLogin"
    :page="page"
    :food="food"
    :activeFood="activeFood"
    :inactiveFood="inactiveFood"
    :categories="categories"
    :logs="logs"
    :foodById="foodById"
    @changePage="changePage"
    @fetchAllFood="fetchAllFood"
    @fetchAllCategories="fetchAllCategories"
    @fetchLogs="fetchLogs"
    @addFood="addFood"
    @postCategory="postCategory"
    @getFoodById="getFoodById"
    @deleteCategory="deleteCategory"
    @updateFood="updateFood"
    @updateFoodStatus="updateFoodStatus"
    @logout="logout"
  />
</template>

import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useMainStore = defineStore("main", {
  state: () => ({
    baseUrl: "https://restaurant-api-production-68d1.up.railway.app/customer",
    isLogin: false,
    username: "",
    food: [],
    foodById: {
      name: "",
      Category: {
        name: "",
      },
    },
    favorites: [],
    qrCode: {
      success: "",
      qrcode: "",
      size: {
        width: "",
        height: "",
      },
    },

    filter: {
      search: "",
      category: "",
      maxPrice: "",
      minPrice: "",
      page: 1,
    },

    totalPages: 0,
    currentPage: 0,

    isLoading: false,
    fullPage: true,
  }),

  actions: {
    async loginHandler() {
      try {
        if (localStorage.access_token) {
          this.isLogin = true
          this.router.push({ name: 'home'})
          await this.getAllFood();
          await this.getFavorites();
          this.isLoading = false
        } else {
          this.isLoading = true
          await this.getAllFood();
          this.isLogin = false;
          this.isLoading = false
        }
      } catch (error) {
        console.log(error);
      }
    },

    async register(registerForm) {
      try {
        this.isLoading = true
        const { username, email, password, phoneNumber, address } =
          registerForm;

        const { data } = await axios.post(this.baseUrl + "/register", {
          username,
          email,
          password,
          phoneNumber,
          address,
        });

        await this.router.push({ name: "login" });
        this.isLoading = false
        this.successToast("Your account created successfully");
      } catch (error) {
        console.log(error);
        this.failToast(error.response.data.message);
      }
    },

    async login(loginForm) {
      try {
        this.isLoading = true
        const { data } = await axios.post(this.baseUrl + "/login", loginForm);
        localStorage.setItem("access_token", data.access_token);
        await this.loginHandler();
        await this.router.push({ name: "home" });
        this.isLoading = false
        this.successToast("Signed in successfully");
      } catch (error) {
        console.log(error.response.data.message);
        this.isLoading = false
        this.failToast(error.response.data.message);
      }
    },

    async getAllFood(params) {
      try {
        const defaultParams = {
          page: 1,
        };
        let options = {
          params: params ? params : defaultParams,
        };

        if (localStorage.access_token)
          options.headers = { access_token: localStorage.access_token };

        const { data } = await axios.get(this.baseUrl + "/food", options);

        this.food = data.food;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
        window.scrollTo(0,0)
      } catch (error) {
        console.log(error);
      }
    },

    async getFoodById(id) {

      try {
        this.qrCode.qrcode = "";
        let options = {};

        if (localStorage.access_token) {
          options.headers = { access_token: localStorage.access_token };
        }

        const { data } = await axios.get(this.baseUrl + "/food/" + id, options);
        await this.getQrCode(id);
        this.foodById = data.food;
      } catch (error) {
        console.log(error);
        // this.router.push({ name: 'NotFound'})
      }
    },

    async getFavorites() {
      try {
        const { data } = await axios.get(this.baseUrl + "/favorites", {
          headers: { access_token: localStorage.access_token },
        });
        this.favorites = data.favorites;
      } catch (error) {
        console.log(error);
      }
    },

    async postFavorites(foodId) {
      try {
        if(!this.isLogin) return this.router.push({ name: 'login' })

        this.isLoading = true
        const { data } = await axios.post(
          this.baseUrl + `/favorites/${foodId}`,
          {},
          {
            headers: { access_token: localStorage.access_token },
          }
        );
        await this.router.push({ name: "favorites" });
        if(!this.isLoading) this.successToast("food added to favorites")
      } catch (error) {
        console.log(error);
      }
    },

    async deleteFavorite(id) {
      try {
        this.isLoading = true
        const { data } = await axios.delete(this.baseUrl + "/favorites/" + id, {
          headers: { access_token: localStorage.access_token },
        });
        await this.getAllFood();
        await this.getFavorites();
        this.isLoading = false
        this.successToast(data.message)
      } catch (error) {
        console.log(error);
        this.isLoading = false
      }
    },

    async logout() {
      try {
        localStorage.removeItem("access_token");
        await this.loginHandler();
        await this.getAllFood()
        this.router.push({ name: "home" });
      } catch (error) {
        console.log(error);
      }
    },

    async getQrCode(id) {
      const { data } = await axios.get("https://api.happi.dev/v1/qrcode", {
        headers: {
          "x-happi-key":
            "b5158fxtDfFoQbuHJQsVnFCDVuh2mDHyfTKeCDlv3A5voFpKyFrbcouY",
        },
        params: {
          data: this.baseUrl + id,
        },
      });
      this.qrCode = data;
    },

    async clickCallback(pageNum) {
      try {
        this.isLoading = true
        this.filter.page = pageNum;
        await this.getAllFood(this.filter);
        this.isLoading = false
      } catch (error) {
        console.log(error);
      }
    },

    async filterFood() {
      try {
        this.isLoading = true
        let params = {
          search: "",
          category: "",
          maxPrice: "",
          minPrice: "",
          page: 1
        };

        if (this.filter.search) params.search = this.filter.search;
        if (this.filter.category) params.category = this.filter.category;
        if (this.filter.maxPrice) params.maxPrice = this.filter.maxPrice;
        if (this.filter.minPrice) params.minPrice = this.filter.minPrice;
        this.filter.page = 1
        await this.getAllFood(params);

        this.isLoading = false
      } catch (error) {
        console.log(error);
      }
    },

    async resetFilter() {
      try {
        this.filter.category = "";
        this.filter.maxPrice = "";
        this.filter.minPrice = "";
        this.filter.search = "";
        this.filter.page = 1;
      } catch (error) {
        console.log(error);
      }
    },

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
        title: message,
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
        title: message,
      });
    },

    async googleSignIn(response) {
      try {
        this.isLoading = true
        const { data } = await axios({
          url: this.baseUrl + "/google-sign-in",
          method: 'post',
          headers: {
            google_token: response.credential
          }
        })
        localStorage.setItem('access_token', data.access_token)
        this.loginHandler()
        await this.router.push({ name: 'home' })
        this.successToast("Login successful")
      } catch (error) {
        console.log(error);
      }
    }
  },
});

import { defineStore } from 'pinia';
import { ref} from 'vue';
import ResetPasswordService from "@/services/ResetPasswordService.js";

export const useResetPasswordStore = defineStore('reset-password', () => {
  const data = ref([]);

  const resetPassword = async (params) => {
    const response = await ResetPasswordService.store(params);
    data.value = response?.data || []; // Store fetched data in state
    return response;
  };

  return {
    data,
    resetPassword,
  };
});

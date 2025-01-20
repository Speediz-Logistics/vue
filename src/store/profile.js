import { defineStore } from 'pinia';
import { ref} from 'vue';
import ProfileService from "@/services/ProfileService.js";

export const useProfileStore = defineStore('profile', () => {
  const data = ref([]);

  const profile = async (params) => {
    const response = await ProfileService.index(params);
    data.value = response?.data || []; // Store fetched data in state
    return response;
  };

  const updateProfile = async (params) => {
    try {
      const response = await ProfileService.store(params); // Assuming ProfileService.update handles updating profiles
      data.value = response?.data || {}; // Update the local state with the response data
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error; // Re-throw the error for handling in the calling function
    }
  };

  return {
    data,
    profile,
    updateProfile,
  };
});

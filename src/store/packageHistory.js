import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import PackageHistoryService from "@/services/PackageHistoryService.js";

export const usePackageHistoryStore = defineStore('history', () => {
  const data = ref([]);
  const total = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(15);
  const packageDetail = ref([]);

  const all = async (params) => {
    const response = await PackageHistoryService.index(params);
    data.value = response?.data?.packages || []; // Store fetched data in state
    total.value = response?.data?.total || 0; // Set total count from API response
    currentPage.value = response?.data?.current_page || 1; // Set current page from API response
    return response;
  };

  const show = async (id) => {
    const response = await PackageHistoryService.show(id);
    packageDetail.value = response?.data;
    packageDetail.value = response || {};
    return response;
  };


  return {
    all,
    show,
    data: computed(() => data.value),
    total: computed(() => total.value),
    currentPage: computed(() => currentPage.value),
    pageSize: computed(() => pageSize.value),
    packageDetail: computed(() => packageDetail.value),
    setTotal(newTotal) {
      total.value = newTotal;
    },
    setCurrentPage(newPage) {
      currentPage.value = newPage;
    },
    setPageSize(newSize) {
      pageSize.value = newSize;
    },
  };
});


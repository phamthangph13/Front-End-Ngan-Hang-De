import { ref, watch } from "vue";

import { defineStore } from 'pinia';



const useSearchTextStore = defineStore('searchText', () => {
    const searchText = ref<string>('');
    const recentSearches = ref<string[]>([]);

    function setSearchText(value: string) {
        searchText.value = value;
    }

    watch(searchText, (value) => {
        if (value) {
            recentSearches.value = [...recentSearches.value, value];
        }
    });

    return { searchText, setSearchText };
})

export default useSearchTextStore;
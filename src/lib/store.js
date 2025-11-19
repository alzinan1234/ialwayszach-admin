import { create } from 'zustand';
import { mockContents } from './mockData';


export const useContentStore = create((set) => ({
  contents: mockContents,
  selectedContent: null,
  searchTerm: '',
  filterType: 'all', // 'all', 'video', 'short'
  currentPage: 1,
  itemsPerPage: 7,

  setSelectedContent: (content) => set({ selectedContent: content }),
  closeModal: () => set({ selectedContent: null }),
  
  setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),
  setFilterType: (type) => set({ filterType: type, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),

  // Filter & Search logic
  getFilteredContents: () => {
    const state = useContentStore.getState();
    let filtered = state.contents;

    // Apply filter type
    if (state.filterType !== 'all') {
      filtered = filtered.filter(c => c.contentType === state.filterType);
    }

    // Apply search
    if (state.searchTerm) {
      const search = state.searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.contentTitle.toLowerCase().includes(search) ||
        c.creatorName.toLowerCase().includes(search) ||
        c.serial.toLowerCase().includes(search)
      );
    }

    return filtered;
  },

  getPaginatedContents: () => {
    const state = useContentStore.getState();
    const filtered = state.getFilteredContents();
    const start = (state.currentPage - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    return filtered.slice(start, end);
  },

  getTotalPages: () => {
    const state = useContentStore.getState();
    const filtered = state.getFilteredContents();
    return Math.ceil(filtered.length / state.itemsPerPage);
  },

  deleteContent: (id) => set((state) => ({
    contents: state.contents.filter(c => c.id !== id)
  }))
}));
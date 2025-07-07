import { create } from 'zustand';

interface BookmarkState {
  bookmarkedIds: string[];
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  toggleBookmark: (id: string) => void; // A convenient function to handle both
  loadBookmarks: () => void; // To load from localStorage
}

const LOCAL_STORAGE_KEY = 'bookmarkedCompanionIds';

// Create your Zustand store
export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  // Initial state
  bookmarkedIds: [],

  // Action to add a bookmark
  addBookmark: (id) => {
    set((state) => {
      if (!state.bookmarkedIds.includes(id)) {
        const newBookmarks = [...state.bookmarkedIds, id];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newBookmarks));
        return { bookmarkedIds: newBookmarks };
      }
      return state; // No change if already exists
    });
  },

  // Action to remove a bookmark
  removeBookmark: (id) => {
    set((state) => {
      if (state.bookmarkedIds.includes(id)) {
        const newBookmarks = state.bookmarkedIds.filter((bookmarkId) => bookmarkId !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newBookmarks));
        return { bookmarkedIds: newBookmarks };
      }
      return state; // No change if doesn't exist
    });
  },

  // Action to toggle a bookmark (add if not exists, remove if exists)
  toggleBookmark: (id) => {
    set((state) => {
      const isBookmarked = state.bookmarkedIds.includes(id);
      let newBookmarks: string[];

      if (isBookmarked) {
        newBookmarks = state.bookmarkedIds.filter((bookmarkId) => bookmarkId !== id);
      } else {
        newBookmarks = [...state.bookmarkedIds, id];
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newBookmarks));
      return { bookmarkedIds: newBookmarks };
    });
  },

  // Action to load bookmarks from localStorage
  loadBookmarks: () => {
    try {
      const storedBookmarks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedBookmarks) {
        const parsedBookmarks: string[] = JSON.parse(storedBookmarks);
        if (Array.isArray(parsedBookmarks)) {
          set({ bookmarkedIds: parsedBookmarks });
        } else {
          console.warn("Invalid data in localStorage for bookmarks. Resetting.");
          set({ bookmarkedIds: [] });
        }
      }
    } catch (error) {
      console.error("Failed to load or parse bookmarks from localStorage:", error);
      set({ bookmarkedIds: [] });
    }
  },
}));
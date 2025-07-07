// src/components/BookmarkHydrator.tsx
'use client'; // This directive is essential!

import { useEffect } from 'react';
import { useBookmarkStore } from '../stores/bookmarkStore'; // Adjust path if needed

export function BookmarkHydrator() {
  const loadBookmarks = useBookmarkStore((state) => state.loadBookmarks);

  // This useEffect will only run on the client side, after hydration.
  useEffect(() => {
    console.log("BookmarkHydrator: Loading bookmarks from localStorage...");
    loadBookmarks();
  }, [loadBookmarks]); // Dependency ensures it's called if loadBookmarks function itself changes (unlikely)

  // This component doesn't render anything visible, it's just for its side effect.
  return null;
}
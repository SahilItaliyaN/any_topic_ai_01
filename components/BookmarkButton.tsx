'use client';

import React from 'react';
import Image from 'next/image';
import { useBookmarkStore } from '../stores/bookmarkStore'; 

interface BookmarkButtonProps {
  companionId: string;
}

const BookmarkButton = ({ companionId }:BookmarkButtonProps) => {
  // Select only the parts of the store state you need
  const isBookmarked = useBookmarkStore((state) => state.bookmarkedIds.includes(companionId));
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  // The handleBookmarkToggle function now just calls the store action
  const handleBookmarkToggle = () => {
    toggleBookmark(companionId);
  };

  return (
    <button
      onClick={handleBookmarkToggle}
      className="companion-bookmark"
      aria-label={isBookmarked ? "Unbookmark companion" : "Bookmark companion"}
      title={isBookmarked ? "Click to unbookmark" : "Click to bookmark"}
    >
      <Image
        src={isBookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"}
        alt={isBookmarked ? "Bookmarked icon" : "Unbookmarked icon"}
        width={12.5}
        height={15}
      />
    </button>
  );
};

export default BookmarkButton;
/**
 * On phones a long list becomes one swipeable row (the next card peeks in), so its section still fits on
 * one screen. From 640px up these classes do nothing and the list stays a normal grid.
 */
export const swipeRow =
  "max-sm:-mx-4 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:scroll-px-4 max-sm:overflow-x-auto max-sm:px-4 max-sm:[scrollbar-width:none]";
export const swipeItem = "max-sm:w-[76%] max-sm:shrink-0 max-sm:snap-start";

import type { Card } from "./types";

export const inLocalStorage = (card: Card) => {
  const localStorage = window.localStorage;

  if (localStorage.getItem(card.id)) {
    return true;
  } else {
    return false;
  }
};

export type Wish = { name: string; message: string; createdAt: string };

const STORAGE_KEY = "wedding-invitation-wishes";

export function getWishes(): Wish[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as Wish[]; }
  catch { return []; }
}

/**
 * Demo-only local persistence. Messages stay in this browser and are not sent
 * to the couple. Replace this function with a POST to your backend before launch.
 */
export async function submitWish(name: string, message: string): Promise<void> {
  const wishes = getWishes();
  wishes.unshift({ name: name.trim(), message: message.trim(), createdAt: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes.slice(0, 30)));
}

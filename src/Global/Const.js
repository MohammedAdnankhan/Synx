export const baseUrl = "https://dev.glorep.com/api/admin/";
export const ERMSG = "Something went wrong";

export function isObjectEmpty(obj) {
  if (obj !== null && obj !== undefined) {
    if (obj.email) return true;
  } else {
    return false;
  }
}

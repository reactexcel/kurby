export const convertUSNumberFormat = (num?: number | string) => {
  if (!num) {
    return 0;
  }
  return Number(num + "").toLocaleString("en-US");
};

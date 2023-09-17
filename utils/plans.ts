export const plans = {
  pWrwqamn: "free",
  L9nOOeWZ: "starter",
  BWzEkg9E: "growth",
  ZmN83E92: "pro",
};

export const getPlan = (planUid: keyof typeof plans) => {
  return plans[planUid];
};

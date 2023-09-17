export const calculateRenewalDate = (date: string): string => {
  const startDate = new Date(date);

  if (isNaN(startDate.getTime())) {
    return new Date(new Date().getMonth() + 1).toISOString().split(".")[0];
  }

  const now = new Date();

  while (startDate <= now) {
    startDate.setMonth(startDate.getMonth() + 1);
  }

  return startDate.toISOString().split(".")[0];
};

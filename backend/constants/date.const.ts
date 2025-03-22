export const fiveMinutesAgo = () => {
  return new Date(Date.now() - 5 * 60 * 1000);
};

export const after30Days = () => {
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
};

export const after90Days = () => {
  return new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
};

export const after1Year = () => {
  return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
};

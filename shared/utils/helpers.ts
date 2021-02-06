export const currentYear = new Date().getFullYear();

export const expireDate = (seconds: number) =>
  new Date(new Date().getTime() + seconds * 1000);

export const debounce = (func: Function, wait: number) => {
  let timeout: any;

  return function executedFunction(...args: any) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };
};

export const linkShortener = (url: string) => {
  if (!url.startsWith("http")) {
    return url;
  }
  if (url.length > 30) {
    return url.slice(0, 30) + "...";
  }
  return url;
};

export const expireDate = (seconds: number) =>
  new Date(new Date().getTime() + seconds * 1000);

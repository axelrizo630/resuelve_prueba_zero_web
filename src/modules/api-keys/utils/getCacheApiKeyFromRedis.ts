export const getCachedApiKeyFromUserId = (userId: number) => {
  return `user-id-${userId.toString()}`;
};

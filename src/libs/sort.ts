export const getOrderBy = (orderBy?: string) => {
  switch (orderBy) {
    case 'updatedAt':
      return { updatedAt: 'desc' } as const;
    default:
      return { index: 'asc' } as const;
  }
};

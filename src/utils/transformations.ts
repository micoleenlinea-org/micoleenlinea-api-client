export const transformDniToNumber = (dni: string): number => {
  return Number(dni.replace(/\./g, ''));
};

export const transformDniToString = (dni: number): string => {
  const dniStr = dni.toString().padStart(8, '0');
  return `${dniStr.slice(0, 2)}.${dniStr.slice(2, 5)}.${dniStr.slice(5)}`;
};

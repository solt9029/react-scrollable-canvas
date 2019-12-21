export const convertNumberToStringPx = (value?: string | number): string => {
  if (typeof value === 'undefined') {
    return '';
  } else if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
};

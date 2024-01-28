function isBlankString(value: unknown): value is string {
  return typeof value === 'string' && /^\s*$/.test(value);
}

function isContentfulString(value: unknown): value is string {
  return typeof value === 'string' && !isEmptyOrBlankString(value);
}

function isEmptyOrBlankString(value?: string | null): boolean {
  return value === undefined || value === null || isBlankString(value);
}

function isEmptyOrEmptyString(value?: string | null): boolean {
  return value === undefined || value === null || isEmptyString(value);
}

function isEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 0;
}

export {
  isBlankString,
  isContentfulString,
  isEmptyOrBlankString,
  isEmptyOrEmptyString,
  isEmptyString,
};

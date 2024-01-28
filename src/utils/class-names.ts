interface ClassObject {
  [key: string]: boolean;
}

function classNames(classObject: ClassObject): string {
  const classes = Object.entries(classObject)
    .filter(([, value]) => value)
    .map(([key]) => key);

  return [...classes].join(' ');
}

export default classNames;

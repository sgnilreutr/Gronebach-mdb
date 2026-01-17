export function classNames(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(' ')
}

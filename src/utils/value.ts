// ------------------------------------------------------------------------------
// name: value
// author: mudas( mschool.tech )
// created: 2020/6/8
// ------------------------------------------------------------------------------

export function oneOf(set: any[], val: unknown): boolean {
  return set.some(item => item === val);
}

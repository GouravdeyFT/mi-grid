function isSingleFilter(filter: any) {
  return filter && 'o' in filter && 'm' in filter && 'v' in filter;
}

function isComposite(filter: any) {
  return filter && 'lo' in filter;
}

function createBody(filter: any): any {
  if (isComposite(filter)) {
    const bdy = '';
    if (filter.v.length > 1) {
      const o = filter.lo;
      return (
        '(' +
        createBody(filter.v.shift()) +
        ' ' +
        o +
        ' ' +
        createBody({ lo: filter.lo, v: filter.v }) +
        ')'
      );
    } else if (filter.v.length == 1) {
      return createBody(filter.v.shift());
    }
    return bdy;
  } else if (isSingleFilter(filter)) {
    const o = filter.o;
    if (typeof filter.v == 'string') filter.v = "'" + filter.v + "'";
    return filter.m + ' ' + o + '  ' + filter.v;
  }
}
const createFunc = function (filter: any) {
  const body = createBody(filter);
  console.log('body: ', body);
  const f: any = new Function('item', ' return ' + body + ';');
  return f;
};

function applyFilter(input: any[], filter: any) {
  if (filter == undefined) {
    return input;
  }

  const fun: any = createFunc(filter);
  console.log('fun: ', fun);
  return input.filter(fun);
}
//m:member,o:operator,v:value.

const filterQuery1 = { m: 'item.type', o: '==', v: 'metal' }; //simpe query
const filterQuery2 = { m: 'item.size', o: '>', v: 8 };
const filterQuery3 = {
  lo: '&&',
  v: [
    { m: 'item.type', o: '==', v: 'metal' },
    { m: 'item.size', o: '<', v: 9 },
  ],
}; //composite query
const data = [
  { item: { type: 'wood', size: 10 } },
  { item: { type: 'wood', size: 8 } },
  { item: { type: 'metal', size: 8 } },
];

const result = applyFilter(data, filterQuery1); // or filterQuery2,filterQuery3
const result2 = applyFilter(data, filterQuery2); // or filterQuery2,filterQuery3
const result3 = applyFilter(data, filterQuery3); // or filterQuery2,filterQuery3

console.log(result, result2, result3);

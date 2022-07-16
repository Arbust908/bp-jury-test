export const queryStringMaker = (options: any) => {
  let queryString = '?';
  Object.entries(options).forEach(([key, value], pos, arr) => {
    queryString += `${key}=${value}`;
    if (pos < arr.length - 1) {
      queryString += '&';
    }
  });
  
  return queryString;
}
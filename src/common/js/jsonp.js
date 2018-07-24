import originJsonp from 'jsonp';
export default function jsonp(url, data, option) {
  url += (url.includes('?')? '&' : '?') + param(data);
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
export const param =function (data) {
  let url = '';
  for (let [key, value] of Object.entries(data)) {
    url += `&${key}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : '';
};



import qs from 'qs'
export default function assembleParams(object) {
  // input - {AB:123,CD:456}
  // output - `param.aB=123&param.cD=456`
  // 本质是构造 querystring params
  const newObj = {}
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const element = object[key]
      newObj[`param.${key[0].toLocaleLowerCase() + key.slice(1)}`] = element
    }
  }
  return qs.stringify(newObj)
}

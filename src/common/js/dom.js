/**
 *
 * @param el
 * @param className
 * @returns {boolean}
 */
export function hasClass(el, className) {
  return  el.className.includes(className);
}
/**
 *
 * @param el
 * @param className
 */
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  el.className=`${el.className} ${className}`;
}

export function getData(el, name, val) {
  const prefix = 'data-';
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style;

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})();

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

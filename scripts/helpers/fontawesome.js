const { library, dom, icon: getIcon } = require('@fortawesome/fontawesome-svg-core')
const css = require('lightningcss');

function tryInstall(block) {
  try {
    var icons = block()
    library.add(icons)
    return true
  } catch(ex) {
    return false
  }
}

tryInstall(function () { return require('@fortawesome/free-solid-svg-icons').fas })
tryInstall(function () { return require('@fortawesome/free-regular-svg-icons').far })
tryInstall(function () { return require('@fortawesome/free-brands-svg-icons').fab })

module.exports = {
  faCss() {
    return css.transform({
      code: Buffer.from(dom.css()),
      minify: true,
    }).code.toString();
  },

  faInline(icon, options) {
    if (!icon.prefix) {
      icon.prefix = 'fas';
    }

    var icon = getIcon(icon, options)
    if (!icon) {
      throw new Error(
        'Can not find icon  with options "' + options + '"' +
        'Make sure you have installed also a corresponding icons package:\n' +
        ' - @fortawesome/free-solid-svg-icons for fas prefix \n' +
        ' - @fortawesome/free-regular-svg-icons for far prefix\n' +
        ' - @fortawesome/free-brands-svg-icons for fab prefix\n'
      )
    }
    return icon.html
  }
}

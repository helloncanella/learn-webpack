/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/webpack-plugin-serve/client.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack-plugin-serve/client.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, __webpack_require__.h, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\n\n/**\n * @note This file exists merely as an easy reference for folks adding it to their configuration entries\n */\n(() => {\n  /* eslint-disable global-require */\n  const {\n    run\n  } = __webpack_require__(/*! ./lib/client/client */ \"./node_modules/webpack-plugin-serve/lib/client/client.js\");\n\n  let hash = '<unknown>';\n  let options;\n\n  try {\n    options = {\"compress\":{},\"headers\":null,\"historyFallback\":false,\"hmr\":true,\"host\":null,\"liveReload\":true,\"log\":{\"level\":\"info\",\"prefix\":{\"template\":\"{{level}}\"},\"name\":\"webpack-plugin-serve\"},\"open\":false,\"port\":8080,\"progress\":true,\"ramdisk\":false,\"secure\":false,\"static\":\"./dist\",\"status\":true,\"waitForBuild\":true,\"address\":\"[::]:8080\",\"compilerName\":null,\"wpsId\":\"368e401\"};\n  } catch (e) {\n    const {\n      log\n    } = __webpack_require__(/*! ./lib/client/log */ \"./node_modules/webpack-plugin-serve/lib/client/log.js\");\n\n    log.error('The entry for webpack-plugin-serve was included in your build, but it does not appear that the plugin was. Please check your configuration.');\n  }\n\n  try {\n    // eslint-disable-next-line camelcase\n    hash = __webpack_require__.h();\n  } catch (e) {} // eslint-disable-line no-empty\n\n\n  run(hash, options);\n})();\n\n//# sourceURL=webpack://webpack-demo/./node_modules/webpack-plugin-serve/client.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/ClientSocket.js":
/*!**********************************************************************!*\
  !*** ./node_modules/webpack-plugin-serve/lib/client/ClientSocket.js ***!
  \**********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 98:0-14 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst {\n  error,\n  refresh,\n  warn\n} = __webpack_require__(/*! ./log */ \"./node_modules/webpack-plugin-serve/lib/client/log.js\")(); // ignore 1008 (HTTP 400 equivalent) and 1011 (HTTP 500 equivalent)\n\n\nconst ignoreCodes = [1008, 1011];\nconst maxAttempts = 10;\n\nclass ClientSocket {\n  constructor(options, ...args) {\n    this.args = args;\n    this.attempts = 0;\n    this.eventHandlers = [];\n    this.options = options;\n    this.retrying = false;\n    this.connect();\n  }\n\n  addEventListener(...args) {\n    this.eventHandlers.push(args);\n    this.socket.addEventListener(...args);\n  }\n\n  close() {\n    this.socket.close();\n  }\n\n  connect() {\n    if (this.socket) {\n      delete this.socket;\n    }\n\n    this.connecting = true;\n    this.socket = new WebSocket(...this.args);\n\n    if (this.options.retry) {\n      this.socket.addEventListener('close', event => {\n        if (ignoreCodes.includes(event.code)) {\n          return;\n        }\n\n        if (!this.retrying) {\n          warn(`The WebSocket was closed and will attempt to reconnect`);\n        }\n\n        this.reconnect();\n      });\n    } else {\n      this.socket.onclose = () => warn(`The client WebSocket was closed. ${refresh}`);\n    }\n\n    this.socket.addEventListener('open', () => {\n      this.attempts = 0;\n      this.retrying = false;\n    });\n\n    if (this.eventHandlers.length) {\n      for (const [name, fn] of this.eventHandlers) {\n        this.socket.addEventListener(name, fn);\n      }\n    }\n  }\n\n  reconnect() {\n    this.attempts += 1;\n    this.retrying = true;\n\n    if (this.attempts > maxAttempts) {\n      error(`The WebSocket could not be reconnected. ${refresh}`);\n      this.retrying = false;\n      return;\n    }\n\n    const timeout = 1000 * this.attempts ** 2;\n    setTimeout(() => this.connect(this.args), timeout);\n  }\n\n  removeEventListener(...args) {\n    const [, handler] = args;\n    this.eventHandlers = this.eventHandlers.filter(([, fn]) => fn === handler);\n    this.socket.removeEventListener(...args);\n  }\n\n}\n\nmodule.exports = {\n  ClientSocket\n};\n\n//# sourceURL=webpack://webpack-demo/./node_modules/webpack-plugin-serve/lib/client/ClientSocket.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/client.js":
/*!****************************************************************!*\
  !*** ./node_modules/webpack-plugin-serve/lib/client/client.js ***!
  \****************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 149:0-14 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\n\n/* eslint-disable global-require */\nconst run = (buildHash, options) => {\n  const {\n    address,\n    client = {},\n    hmr,\n    progress,\n    secure,\n    status\n  } = options;\n  options.firstInstance = !window.webpackPluginServe; // eslint-disable-line no-param-reassign\n\n  window.webpackPluginServe = window.webpackPluginServe || {\n    compilers: {}\n  };\n  window.webpackPluginServe.silent = !!client.silent;\n\n  const {\n    ClientSocket\n  } = __webpack_require__(/*! ./ClientSocket */ \"./node_modules/webpack-plugin-serve/lib/client/ClientSocket.js\");\n\n  const {\n    replace\n  } = __webpack_require__(/*! ./hmr */ \"./node_modules/webpack-plugin-serve/lib/client/hmr.js\");\n\n  const {\n    error,\n    info,\n    warn\n  } = __webpack_require__(/*! ./log */ \"./node_modules/webpack-plugin-serve/lib/client/log.js\")();\n\n  const protocol = secure ? 'wss' : 'ws';\n  const socket = new ClientSocket(client, `${protocol}://${client.address || address}/wps`);\n  const {\n    compilerName\n  } = options;\n  window.webpackPluginServe.compilers[compilerName] = {}; // prevents ECONNRESET errors on the server\n\n  window.addEventListener('beforeunload', () => socket.close());\n  socket.addEventListener('message', message => {\n    const {\n      action,\n      data = {}\n    } = JSON.parse(message.data);\n    const {\n      errors,\n      hash = '<?>',\n      warnings\n    } = data || {};\n    const shortHash = hash.slice(0, 7);\n    const identifier = options.compilerName ? `(Compiler: ${options.compilerName}) ` : '';\n    const compiler = window.webpackPluginServe.compilers[compilerName];\n    const {\n      wpsId\n    } = data;\n\n    switch (action) {\n      case 'build':\n        compiler.done = false;\n        break;\n\n      case 'connected':\n        info(`WebSocket connected ${identifier}`);\n        break;\n\n      case 'done':\n        compiler.done = true;\n        break;\n\n      case 'problems':\n        if (data.errors.length) {\n          error(`${identifier}Build ${shortHash} produced errors:\\n`, errors);\n        }\n\n        if (data.warnings.length) {\n          warn(`${identifier}Build ${shortHash} produced warnings:\\n`, warnings);\n        }\n\n        break;\n\n      case 'reload':\n        window.location.reload();\n        break;\n\n      case 'replace':\n        // actions with a wpsId in tow indicate actions that should only be executed when the wpsId sent\n        // matches the wpsId set in options. this is how we can identify multiple compilers in the\n        // client.\n        if (wpsId && wpsId === options.wpsId) {\n          replace(buildHash, hash, hmr === 'refresh-on-failure');\n        }\n\n        break;\n\n      default:\n    }\n  });\n\n  if (options.firstInstance) {\n    if (progress === 'minimal') {\n      const {\n        init\n      } = __webpack_require__(/*! ./overlays/progress-minimal */ \"./node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js\");\n\n      init(options, socket);\n    } else if (progress) {\n      const {\n        init\n      } = __webpack_require__(/*! ./overlays/progress */ \"./node_modules/webpack-plugin-serve/lib/client/overlays/progress.js\");\n\n      init(options, socket);\n    }\n\n    if (status) {\n      const {\n        init\n      } = __webpack_require__(/*! ./overlays/status */ \"./node_modules/webpack-plugin-serve/lib/client/overlays/status.js\");\n\n      init(options, socket);\n    }\n\n    if (true) {\n      info('Hot Module Replacement is active');\n\n      if (options.liveReload) {\n        info('Live Reload taking precedence over Hot Module Replacement');\n      }\n    } else {}\n\n    if (false) {}\n  }\n};\n\nmodule.exports = {\n  run\n};\n\n//# sourceURL=webpack://webpack-demo/./node_modules/webpack-plugin-serve/lib/client/client.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/hmr.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-plugin-serve/lib/client/hmr.js ***!
  \*************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 91:0-14 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst {\n  error,\n  info,\n  refresh,\n  warn\n} = __webpack_require__(/*! ./log */ \"./node_modules/webpack-plugin-serve/lib/client/log.js\")();\n\nlet latest = true;\n\nconst hmr = onFailure => {\n  return {\n    onUnaccepted(data) {\n      onFailure();\n      warn('Change in unaccepted module(s):\\n', data);\n      warn(data);\n    },\n\n    onDeclined(data) {\n      onFailure();\n      warn('Change in declined module(s):\\n', data);\n    },\n\n    onErrored(data) {\n      onFailure();\n      error('Error in module(s):\\n', data);\n    }\n\n  };\n};\n\nconst replace = async (buildHash, hash, refreshOnFailure) => {\n  const {\n    apply,\n    check,\n    status\n  } = module.hot;\n\n  if (hash) {\n    // eslint-disable-next-line no-undef\n    latest = hash.includes(buildHash);\n  }\n\n  if (!latest) {\n    const hmrStatus = status();\n\n    if (hmrStatus === 'abort' || hmrStatus === 'fail') {\n      warn(`An HMR update was triggered, but ${hmrStatus}ed. ${refresh}`);\n      return;\n    }\n\n    let modules;\n\n    try {\n      modules = await check(false);\n    } catch (e) {\n      // noop. this typically happens when a MultiCompiler has more than one compiler that includes\n      // this script, and an update happens with a hash that isn't part of the compiler/module this\n      // instance was loaded for.\n      return;\n    }\n\n    if (!modules) {\n      warn(`No modules found for replacement. ${refresh}`);\n      return;\n    }\n\n    modules = await apply(hmr(refreshOnFailure ? () => {\n      if (refreshOnFailure) {\n        // eslint-disable-next-line no-undef\n        location.reload();\n      }\n    } : () => {}));\n\n    if (modules) {\n      latest = true;\n      info(`Build ${hash.slice(0, 7)} replaced:\\n`, modules);\n    }\n  }\n};\n\nmodule.exports = {\n  replace\n};\n\n//# sourceURL=webpack://webpack-demo/./node_modules/webpack-plugin-serve/lib/client/hmr.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-plugin-serve/lib/client/log.js ***!
  \*************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 31:0-14 */
/***/ (function(module) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst {\n  error,\n  info,\n  warn\n} = console;\nconst log = {\n  error: error.bind(console, '⬡ wps:'),\n  info: info.bind(console, '⬡ wps:'),\n  refresh: 'Please refresh the page',\n  warn: warn.bind(console, '⬡ wps:')\n};\n\nconst noop = () => {};\n\nconst silent = {\n  error: noop,\n  info: noop,\n  warn: noop\n};\n\nmodule.exports = () => window.webpackPluginServe.silent ? silent : log;\n\n//# sourceURL=webpack://webpack-demo/./node_modules/webpack-plugin-serve/lib/client/log.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js ***!
  \***********************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 116:0-14 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst {\n  addCss,\n  addHtml\n} = __webpack_require__(/*! ./util */ \"./node_modules/webpack-plugin-serve/lib/client/overlays/util.js\");\n\nconst ns = 'wps-progress-minimal';\nconst html = `\n<div id=\"${ns}\" class=\"${ns}-hidden\">\n  <div id=\"${ns}-bar\"></div>\n</div>\n`;\nconst css = `\n#${ns} {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 4px;\n  width: 100vw;\n  z-index: 2147483645;\n}\n\n#${ns}-bar {\n  width: 0%;\n  height: 4px;\n  background-color: rgb(186, 223, 172);\n}\n\n@keyframes ${ns}-fade {\n\t0% {\n\t\topacity: 1;\n\t}\n\t100% {\n\t\topacity: 0;\n\t}\n}\n\n.${ns}-disappear {\n  animation: ${ns}-fade .3s;\n  animation-fill-mode: forwards;\n  animation-delay: .5s;\n}\n\n.${ns}-hidden {\n  display: none;\n}\n`;\nlet hideOnPageVisible = false;\n\nconst update = percent => {\n  const bar = document.querySelector(`#${ns}-bar`);\n  bar.style.width = `${percent}%`;\n};\n\nconst reset = wrapper => {\n  wrapper.classList.add(`${ns}-disappear`);\n};\n\nconst init = (options, socket) => {\n  if (options.firstInstance) {\n    document.addEventListener('DOMContentLoaded', () => {\n      addCss(css);\n      addHtml(html);\n      const wrapper = document.querySelector(`#${ns}`);\n      wrapper.addEventListener('animationend', () => {\n        update(0);\n        wrapper.classList.add(`${ns}-hidden`);\n      });\n    });\n    document.addEventListener('visibilitychange', () => {\n      if (!document.hidden && hideOnPageVisible) {\n        const wrapper = document.querySelector(`#${ns}`);\n        reset(wrapper);\n        hideOnPageVisible = false;\n      }\n    });\n  }\n\n  socket.addEventListener('message', message => {\n    const {\n      action,\n      data\n    } = JSON.parse(message.data);\n\n    if (action !== 'progress') {\n      return;\n    }\n\n    const percent = Math.floor(data.percent * 100);\n    const wrapper = document.querySelector(`#${ns}`);\n    wrapper.classList.remove(`${ns}-hidden`, `${ns}-disappear`);\n\n    if (data.percent === 1) {\n      if (document.hidden) {\n        hideOnPageVisible = true;\n      } else {\n        reset(wrapper);\n      }\n    } else {\n      hideOnPageVisible = false;\n    }\n\n    update(percent);\n  });\n};\n\nmodule.exports = {\n  init\n};\n\n//# sourceURL=webpack://webpack-demo/./node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-plugin-serve/lib/client/overlays/progress.js ***!
  \***************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 171:0-14 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst {\n  addCss,\n  addHtml\n} = __webpack_require__(/*! ./util */ \"./node_modules/webpack-plugin-serve/lib/client/overlays/util.js\");\n\nconst ns = 'wps-progress';\nconst css = `\n#${ns}{\n  width: 200px;\n  height: 200px;\n  position: fixed;\n  right: 5%;\n  top: 5%;\n  transition: opacity .25s ease-in-out;\n  z-index: 2147483645;\n}\n\n#${ns}-bg {\n  fill: #282d35;\n}\n\n#${ns}-fill {\n  fill: rgba(0, 0, 0, 0);\n  stroke: rgb(186, 223, 172);\n  stroke-dasharray: 219.99078369140625;\n  stroke-dashoffset: -219.99078369140625;\n  stroke-width: 10;\n  transform: rotate(90deg)translate(0px, -80px);\n}\n\n#${ns}-percent {\n  font-family: 'Open Sans';\n  font-size: 18px;\n  fill: #ffffff;\n}\n\n#${ns}-percent-value {\n  dominant-baseline: middle;\n  text-anchor: middle;\n}\n\n#${ns}-percent-super {\n  fill: #bdc3c7;\n  font-size: .45em;\n  baseline-shift: 10%;\n}\n\n.${ns}-noselect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  cursor: default;\n}\n\n@keyframes ${ns}-fade {\n\t0% {\n\t\topacity: 1;\n\t\ttransform: scale(1);\n\t\t-webkit-transform: scale(1);\n\t}\n\t100% {\n\t\topacity: 0;\n\t\ttransform: scale(0);\n\t\t-webkit-transform: scale(0);\n\t}\n}\n\n.${ns}-disappear {\n  animation: ${ns}-fade .3s;\n  animation-fill-mode:forwards;\n  animation-delay: .5s;\n}\n\n.${ns}-hidden {\n  display: none;\n}\n\n/* Put google web font at the end, or you'll see FOUC in Firefox */\n@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');\n`;\nconst html = `\n<svg id=\"${ns}\" class=\"${ns}-noselect ${ns}-hidden\" x=\"0px\" y=\"0px\" viewBox=\"0 0 80 80\">\n  <circle id=\"${ns}-bg\" cx=\"50%\" cy=\"50%\" r=\"35\"></circle>\n  <path id=\"${ns}-fill\" d=\"M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0\" />\n  <text id=\"${ns}-percent\" x=\"50%\" y=\"51%\"><tspan id=\"${ns}-percent-value\">0</tspan><tspan id=\"${ns}-percent-super\">%</tspan></text>\n</svg>\n`;\nlet hideOnPageVisible = false;\n\nconst update = percent => {\n  const max = -219.99078369140625;\n  const value = document.querySelector(`#${ns}-percent-value`);\n  const track = document.querySelector(`#${ns}-fill`);\n  const offset = (100 - percent) / 100 * max;\n  track.setAttribute('style', `stroke-dashoffset: ${offset}`);\n  value.innerHTML = percent.toString();\n};\n\nconst reset = svg => {\n  svg.classList.add(`${ns}-disappear`);\n};\n\nconst init = (options, socket) => {\n  if (options.firstInstance) {\n    document.addEventListener('DOMContentLoaded', () => {\n      addCss(css);\n      addHtml(html); // Reset progress to zero after disappear animation\n\n      const svg = document.querySelector(`#${ns}`);\n      svg.addEventListener('animationend', () => {\n        update(0);\n        svg.classList.add(`${ns}-hidden`);\n      });\n    });\n    document.addEventListener('visibilitychange', () => {\n      if (!document.hidden && hideOnPageVisible) {\n        const svg = document.querySelector(`#${ns}`);\n        reset(svg);\n        hideOnPageVisible = false;\n      }\n    });\n  }\n\n  socket.addEventListener('message', message => {\n    const {\n      action,\n      data\n    } = JSON.parse(message.data);\n\n    if (action !== 'progress') {\n      return;\n    }\n\n    const percent = Math.floor(data.percent * 100);\n    const svg = document.querySelector(`#${ns}`);\n\n    if (!svg) {\n      return;\n    } // we can safely call this even if it doesn't have the class\n\n\n    svg.classList.remove(`${ns}-disappear`, `${ns}-hidden`);\n\n    if (data.percent === 1) {\n      if (document.hidden) {\n        hideOnPageVisible = true;\n      } else {\n        reset(svg);\n      }\n    } else {\n      hideOnPageVisible = false;\n    }\n\n    update(percent);\n  });\n};\n\nmodule.exports = {\n  init\n};\n\n//# sourceURL=webpack://webpack-demo/./node_modules/webpack-plugin-serve/lib/client/overlays/progress.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/status.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-plugin-serve/lib/client/overlays/status.js ***!
  \*************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 409:0-14 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst {\n  addCss,\n  addHtml,\n  socketMessage\n} = __webpack_require__(/*! ./util */ \"./node_modules/webpack-plugin-serve/lib/client/overlays/util.js\");\n\nconst ns = 'wps-status';\nconst css = `\n#${ns} {\n  background: #282d35;\n  border-radius: 0.6em;\n  display: flex;\n  flex-direction: column;\n\tfont-family: 'Open Sans', Helvetica, Arial, sans-serif;\n\tfont-size: 10px;\n  height: 90%;\n  min-height: 20em;\n  left: 50%;\n  opacity: 1;\n  overflow: hidden;\n  padding-bottom: 3em;\n  position: absolute;\n  top: 2rem;\n  transform: translateX(-50%);\n  transition: opacity .25s ease-in-out;\n  width: 95%;\n  z-index: 2147483645;\n}\n\n@keyframes ${ns}-hidden-display {\n\t0% {\n\t\topacity: 1;\n\t}\n\t99% {\n\t\tdisplay: inline-flex;\n\t\topacity: 0;\n\t}\n\t100% {\n\t\tdisplay: none;\n\t\topacity: 0;\n\t}\n}\n\n#${ns}.${ns}-hidden {\n  animation: ${ns}-hidden-display .3s;\n  animation-fill-mode:forwards;\n  display: none;\n}\n\n#${ns}.${ns}-min {\n  animation: minimize 10s;\n  bottom: 2em;\n  cursor: pointer;\n  height: 6em;\n  left: auto;\n  min-height: 6em;\n  padding-bottom: 0;\n  position: absolute;\n  right: 2em;\n  top: auto;\n  transform: none;\n  width: 6em;\n}\n\n#${ns}.${ns}-min #${ns}-beacon {\n  display: block;\n}\n\n#${ns}-title {\n  color: #fff;\n  font-size: 1.2em;\n  font-weight: normal;\n  margin: 0;\n  padding: 0.6em 0;\n  text-align: center;\n  width: 100%;\n}\n\n#${ns}.${ns}-min #${ns}-title {\n  display: none;\n}\n\n#${ns}-title-errors {\n  color: #ff5f58;\n  font-style: normal;\n  padding-left: 1em;\n}\n\n#${ns}-title-warnings {\n  color: #ffbd2e;\n  font-style: normal;\n  padding-left: 1em;\n}\n\n#${ns}-problems {\n  overflow-y: auto;\n  padding: 1em 2em;\n}\n\n#${ns}-problems pre {\n  color: #ddd;\n  background: #282d35;\n  display: block;\n  font-size: 1.3em;\n\tfont-family: 'Open Sans', Helvetica, Arial, sans-serif;\n  white-space: pre-wrap;\n}\n\n#${ns}-problems pre em {\n  background: #ff5f58;\n  border-radius: 0.3em;\n  color: #641e16;\n  font-style: normal;\n  line-height: 3em;\n  margin-right: 0.4em;\n  padding: 0.1em 0.4em;\n  text-transform: uppercase;\n}\n\npre#${ns}-warnings em {\n  background: #ffbd2e;\n  color: #3e2723;\n}\n\npre#${ns}-success {\n  display: none;\n  text-align: center;\n}\n\npre#${ns}-success em {\n  background: #7fb900;\n  color: #004d40;\n}\n\n#${ns}-problems.${ns}-success #${ns}-success {\n  display: block;\n}\n\n#${ns}.${ns}-min #${ns}-problems {\n  display: none;\n}\n\n#${ns}-nav {\n  opacity: 0.5;\n  padding: 1.2em;\n  position: absolute;\n}\n\n#${ns}.${ns}-min #${ns}-nav {\n  display: none;\n}\n\n#${ns}-nav:hover {\n  opacity: 1;\n}\n\n#${ns}-nav div {\n  background: #ff5f58;\n  border-radius: 1.2em;\n  cursor: pointer;\n  display: inline-block;\n  height: 1.2em;\n  position: relative;\n  width: 1.2em;\n}\n\ndiv#${ns}-min {\n  background: #ffbd2e;\n  margin-left: 0.8em;\n}\n\n#${ns}-beacon {\n  border-radius: 3em;\n  display: none;\n  font-size: 10px;\n  height: 3em;\n  margin: 1.6em auto;\n  position: relative;\n  width: 3em;\n}\n\n#${ns}-beacon:before, #${ns}-beacon:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(127,185,0, 0.2);\n  border-radius: 3em;\n  opacity: 0;\n}\n\n#${ns}-beacon:before {\n  animation: ${ns}-pulse 3s infinite linear;\n  transform: scale(1);\n}\n\n#${ns}-beacon:after {\n  animation: ${ns}-pulse 3s 2s infinite linear;\n}\n\n\n@keyframes ${ns}-pulse {\n  0% {\n    opacity: 0;\n    transform: scale(0.6);\n  }\n  33% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(1.4);\n  }\n}\n\n#${ns}-beacon mark {\n  background: rgba(127, 185, 0, 1);\n  border-radius: 100% 100%;\n  height: 1em;\n  left: 1em;\n  position: absolute;\n  top: 1em;\n  width: 1em;\n}\n\n#${ns}-beacon.${ns}-error mark {\n  background: #ff5f58;\n}\n\n#${ns}-beacon.${ns}-error:before, #${ns}-beacon.error:after {\n  background: rgba(255, 95, 88, 0.2);\n}\n\n#${ns}-beacon.${ns}-warning mark {\n  background: #ffbd2e;\n}\n\n#${ns}-beacon.${ns}-warning:before, #${ns}-beacon.warning:after {\n  background: rgba(255, 189, 46, 0.2);\n}\n\n/* Put google web font at the end, or you'll see FOUC in Firefox */\n@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');\n`;\nconst html = `\n<aside id=\"${ns}\" class=\"${ns}-hidden\" title=\"build status\">\n  <figure id=\"${ns}-beacon\">\n    <mark/>\n  </figure>\n  <nav id=\"${ns}-nav\">\n    <div id=\"${ns}-close\" title=\"close\"></div>\n    <div id=\"${ns}-min\" title=\"minmize\"></div>\n  </nav>\n  <h1 id=\"${ns}-title\">\n    build status\n    <em id=\"${ns}-title-errors\"></em>\n    <em id=\"${ns}-title-warnings\"></em>\n  </h1>\n  <article id=\"${ns}-problems\">\n    <pre id=\"${ns}-success\"><em>Build Successful</em></pre>\n    <pre id=\"${ns}-errors\"></pre>\n    <pre id=\"${ns}-warnings\"></pre>\n  </article>\n</aside>\n`;\n\nconst init = (options, socket) => {\n  const hidden = `${ns}-hidden`;\n  let hasProblems = false;\n  let aside;\n  let beacon;\n  let problems;\n  let preErrors;\n  let preWarnings;\n  let titleErrors;\n  let titleWarnings;\n\n  const reset = () => {\n    preErrors.innerHTML = '';\n    preWarnings.innerHTML = '';\n    problems.classList.remove(`${ns}-success`);\n    beacon.className = '';\n    titleErrors.innerText = '';\n    titleWarnings.innerText = '';\n  };\n\n  const addErrors = errors => {\n    if (errors.length) {\n      problems.classList.remove(`${ns}-success`);\n      beacon.classList.add(`${ns}-error`);\n\n      for (const error of errors) {\n        const markup = `<div><em>Error</em> in ${error}</div>`;\n        addHtml(markup, preErrors);\n      }\n\n      titleErrors.innerText = `${errors.length} Error(s)`;\n    } else {\n      titleErrors.innerText = '';\n    }\n\n    aside.classList.remove(hidden);\n  };\n\n  const addWarnings = warnings => {\n    if (warnings.length) {\n      problems.classList.remove(`${ns}-success`);\n\n      if (!beacon.classList.contains(`${ns}-error`)) {\n        beacon.classList.add(`${ns}-warning`);\n      }\n\n      for (const warning of warnings) {\n        const markup = `<div><em>Warning</em> in ${warning}</div>`;\n        addHtml(markup, preWarnings);\n      }\n\n      titleWarnings.innerText = `${warnings.length} Warning(s)`;\n    } else {\n      titleWarnings.innerText = '';\n    }\n\n    aside.classList.remove(hidden);\n  };\n\n  if (options.firstInstance) {\n    document.addEventListener('DOMContentLoaded', () => {\n      addCss(css);\n      [aside] = addHtml(html);\n      beacon = document.querySelector(`#${ns}-beacon`);\n      problems = document.querySelector(`#${ns}-problems`);\n      preErrors = document.querySelector(`#${ns}-errors`);\n      preWarnings = document.querySelector(`#${ns}-warnings`);\n      titleErrors = document.querySelector(`#${ns}-title-errors`);\n      titleWarnings = document.querySelector(`#${ns}-title-warnings`);\n      const close = document.querySelector(`#${ns}-close`);\n      const min = document.querySelector(`#${ns}-min`);\n      aside.addEventListener('click', () => {\n        aside.classList.remove(`${ns}-min`);\n      });\n      close.addEventListener('click', () => {\n        aside.classList.add(`${ns}-hidden`);\n      });\n      min.addEventListener('click', e => {\n        aside.classList.add(`${ns}-min`);\n        e.stopImmediatePropagation();\n      });\n    });\n  }\n\n  socketMessage(socket, (action, data) => {\n    if (!aside) {\n      return;\n    }\n\n    const {\n      compilers\n    } = window.webpackPluginServe;\n\n    switch (action) {\n      case 'build':\n        // clear errors and warnings when a new build begins\n        reset();\n        break;\n\n      case 'problems':\n        addErrors(data.errors);\n        addWarnings(data.warnings);\n        aside.classList.remove(hidden);\n        hasProblems = data.errors.length || data.warnings.length;\n        break;\n\n      case 'replace':\n        // if there's a compiler that isn't done yet, hold off and let it run the show\n        for (const compilerName of Object.keys(compilers)) {\n          if (!compilers[compilerName]) {\n            return;\n          }\n        }\n\n        if (hasProblems && !preErrors.children.length && !preWarnings.children.length) {\n          reset();\n          hasProblems = false;\n          problems.classList.add(`${ns}-success`);\n          aside.classList.remove(hidden);\n          setTimeout(() => aside.classList.add(hidden), 3e3);\n        }\n\n        break;\n\n      default:\n    }\n  });\n};\n\nmodule.exports = {\n  init\n};\n\n//# sourceURL=webpack://webpack-demo/./node_modules/webpack-plugin-serve/lib/client/overlays/status.js?");

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/util.js":
/*!***********************************************************************!*\
  !*** ./node_modules/webpack-plugin-serve/lib/client/overlays/util.js ***!
  \***********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 47:0-14 */
/***/ (function(module) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst addHtml = (html, parent) => {\n  const div = document.createElement('div');\n  const nodes = [];\n  div.innerHTML = html.trim();\n\n  while (div.firstChild) {\n    nodes.push((parent || document.body).appendChild(div.firstChild));\n  }\n\n  return nodes;\n};\n\nconst addCss = css => {\n  const style = document.createElement('style');\n  style.type = 'text/css';\n\n  if (css.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    style.appendChild(document.createTextNode(css));\n  } // append the stylesheet for the svg\n\n\n  document.head.appendChild(style);\n};\n\nconst socketMessage = (socket, handler) => {\n  socket.addEventListener('message', message => {\n    const {\n      action,\n      data = {}\n    } = JSON.parse(message.data);\n    handler(action, data);\n  });\n};\n\nmodule.exports = {\n  addCss,\n  addHtml,\n  socketMessage\n};\n\n//# sourceURL=webpack://webpack-demo/./node_modules/webpack-plugin-serve/lib/client/overlays/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "368e401-" + chunkId + "-wps-hmr.js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".css";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	!function() {
/******/ 		__webpack_require__.hmrF = function() { return "368e401-wps-hmr.json"; };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "6d9d4f5eecbc521cdd33"; }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "webpack-demo:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	!function() {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: currentChildModule !== moduleId,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 					else hot._acceptedDependencies[dep] = callback || function () {};
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				registeredStatusHandlers[i].call(null, newStatus);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			setStatus("check");
/******/ 			return __webpack_require__.hmrM().then(function (update) {
/******/ 				if (!update) {
/******/ 					setStatus(applyInvalidatedModules() ? "ready" : "idle");
/******/ 					return null;
/******/ 				}
/******/ 		
/******/ 				setStatus("prepare");
/******/ 		
/******/ 				var updatedModules = [];
/******/ 				blockingPromises = [];
/******/ 				currentUpdateApplyHandlers = [];
/******/ 		
/******/ 				return Promise.all(
/******/ 					Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 						promises,
/******/ 						key
/******/ 					) {
/******/ 						__webpack_require__.hmrC[key](
/******/ 							update.c,
/******/ 							update.r,
/******/ 							update.m,
/******/ 							promises,
/******/ 							currentUpdateApplyHandlers,
/******/ 							updatedModules
/******/ 						);
/******/ 						return promises;
/******/ 					},
/******/ 					[])
/******/ 				).then(function () {
/******/ 					return waitForBlockingPromises(function () {
/******/ 						if (applyOnUpdate) {
/******/ 							return internalApply(applyOnUpdate);
/******/ 						} else {
/******/ 							setStatus("ready");
/******/ 		
/******/ 							return updatedModules;
/******/ 						}
/******/ 					});
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				setStatus("abort");
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			// handle errors in accept handlers and self accepted module load
/******/ 			if (error) {
/******/ 				setStatus("fail");
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw error;
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			if (queuedInvalidatedModules) {
/******/ 				return internalApply(options).then(function (list) {
/******/ 					outdatedModules.forEach(function (moduleId) {
/******/ 						if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 					});
/******/ 					return list;
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			setStatus("idle");
/******/ 			return Promise.resolve(outdatedModules);
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "/";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	!function() {
/******/ 		var createStylesheet = function(chunkId, fullhref, resolve, reject) {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = function(event) {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var request = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.request = request;
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			document.head.appendChild(linkTag);
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = function(href, fullhref) {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = function(chunkId) {
/******/ 			return new Promise(function(resolve, reject) {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = function(options) {
/******/ 			return { dispose: function() {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: function() {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = function(chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach(function(chunkId) {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				const oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise(function(resolve, reject) {
/******/ 					var tag = createStylesheet(chunkId, fullhref, function() {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"0": 0
/******/ 		};
/******/ 		
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId) {
/******/ 			return new Promise(function(resolve, reject) {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = function(event) {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatewebpack_demo"] = function(chunkId, moreModules, runtime) {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				if (
/******/ 					__webpack_require__.c[outdatedModuleId] &&
/******/ 					__webpack_require__.c[outdatedModuleId].hot._selfAccepted &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!__webpack_require__.c[outdatedModuleId].hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: __webpack_require__.c[outdatedModuleId].hot._requireSelf,
/******/ 						errorHandler: __webpack_require__.c[outdatedModuleId].hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (options.onErrored) {
/******/ 											options.onErrored({
/******/ 												type: "accept-errored",
/******/ 												moduleId: outdatedModuleId,
/******/ 												dependencyId: dependenciesForCallbacks[k],
/******/ 												error: err
/******/ 											});
/******/ 										}
/******/ 										if (!options.ignoreErrored) {
/******/ 											reportError(err);
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err);
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 									}
/******/ 									reportError(err);
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then(function(response) {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no deferred startup
/******/ 		
/******/ 		// no jsonp function
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./node_modules/webpack-plugin-serve/client.js");
/******/ })()
;
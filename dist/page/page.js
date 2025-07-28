/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/apply-loader/index.js!./node_modules/pug-loader/index.js!./src/page/block/popup/templates/container.pug":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/apply-loader/index.js!./node_modules/pug-loader/index.js!./src/page/block/popup/templates/container.pug ***!
  \******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var req = __webpack_require__(/*! !!./node_modules/pug-loader/index.js!./src/page/block/popup/templates/container.pug */ "./node_modules/pug-loader/index.js!./src/page/block/popup/templates/container.pug");
module.exports = (req['default'] || req).apply(req, [])

/***/ }),

/***/ "./node_modules/apply-loader/index.js!./node_modules/pug-loader/index.js!./src/page/block/popup/templates/popup.pug":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/apply-loader/index.js!./node_modules/pug-loader/index.js!./src/page/block/popup/templates/popup.pug ***!
  \**************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var req = __webpack_require__(/*! !!./node_modules/pug-loader/index.js!./src/page/block/popup/templates/popup.pug */ "./node_modules/pug-loader/index.js!./src/page/block/popup/templates/popup.pug");
module.exports = (req['default'] || req).apply(req, [])

/***/ }),

/***/ "./node_modules/apply-loader/index.js!./node_modules/pug-loader/index.js!./src/page/render/styles/style.pug":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/apply-loader/index.js!./node_modules/pug-loader/index.js!./src/page/render/styles/style.pug ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var req = __webpack_require__(/*! !!./node_modules/pug-loader/index.js!./src/page/render/styles/style.pug */ "./node_modules/pug-loader/index.js!./src/page/render/styles/style.pug");
module.exports = (req['default'] || req).apply(req, [])

/***/ }),

/***/ "./node_modules/pug-loader/index.js!./src/page/block/popup/templates/container.pug":
/*!*****************************************************************************************!*\
  !*** ./node_modules/pug-loader/index.js!./src/page/block/popup/templates/container.pug ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(/*! !../../../../../node_modules/pug-runtime/index.js */ "./node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"menu-container\"\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ "./node_modules/pug-loader/index.js!./src/page/block/popup/templates/level-display.pug":
/*!*********************************************************************************************!*\
  !*** ./node_modules/pug-loader/index.js!./src/page/block/popup/templates/level-display.pug ***!
  \*********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(/*! !../../../../../node_modules/pug-runtime/index.js */ "./node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (number, width) {
      pug_html = pug_html + "\u003Cdiv" + (" class=\"change-level-menu\""+pug.attr("style", pug.style(`width: ${width}`), true, true)) + "\u003E\u003Ca class=\"wb-level-controller\"\u003E+\u003C\u002Fa\u003E\u003Ca class=\"wb-level-number\"\u003E" + (pug.escape(null == (pug_interp = number) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Ca class=\"wb-level-controller\"\u003E-\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
    }.call(this, "number" in locals_for_with ?
        locals_for_with.number :
        typeof number !== 'undefined' ? number : undefined, "width" in locals_for_with ?
        locals_for_with.width :
        typeof width !== 'undefined' ? width : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),

/***/ "./node_modules/pug-loader/index.js!./src/page/block/popup/templates/popup.pug":
/*!*************************************************************************************!*\
  !*** ./node_modules/pug-loader/index.js!./src/page/block/popup/templates/popup.pug ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(/*! !../../../../../node_modules/pug-runtime/index.js */ "./node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"page-popup-menu\"\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ "./node_modules/pug-loader/index.js!./src/page/block/popup/templates/word-display.pug":
/*!********************************************************************************************!*\
  !*** ./node_modules/pug-loader/index.js!./src/page/block/popup/templates/word-display.pug ***!
  \********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(/*! !../../../../../node_modules/pug-runtime/index.js */ "./node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (href, netGraph, word) {
      pug_html = pug_html + "\u003Cdiv class=\"display-word-menu\"\u003E\u003Ca" + (" class=\"translate-link\""+" target=\"_blank\""+pug.attr("href", href, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = word) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Cdiv\u003E\u003Cspan\u003Ecursor-x:\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = netGraph.cursor.x) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Cspan\u003Ecursor-y:\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = netGraph.cursor.y) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Cspan\u003Eblock-width:\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = netGraph.block.width) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Cspan\u003Eblock-height:\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = netGraph.block.height) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Cspan\u003Etext-length:\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = netGraph.textLength) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Cspan\u003Etext-blocks-count:\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = netGraph.textBlocksCount) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Cspan\u003Etext-block-index:\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = netGraph.currentLine) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Cspan\u003Etext-block-size-width:\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = netGraph.currentTextBlockSize.width) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Cspan\u003Etext-block-size-height:\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = netGraph.currentTextBlockSize.height) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C!--div--\u003E\u003C!--    span gap-height:--\u003E\u003C!--    span= netGraph.gapHeight--\u003E\u003C!----\u003E\u003C!--div--\u003E\u003C!--    span count-gaps:--\u003E\u003C!--    span= netGraph.countGaps--\u003E\u003Cdiv\u003E\u003Cspan\u003Ereal-height:\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = netGraph.realHeight) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Cspan\u003Ecoefficient:\u003C\u002Fspan\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = netGraph.coefficient) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C!--div--\u003E\u003C!--    span text-block-width:--\u003E\u003C!--    span= textBlock.width--\u003E\u003C!--div--\u003E\u003C!--    span text-block-height:--\u003E\u003C!--    span= textBlock.height--\u003E\u003C!--div--\u003E\u003C!--    span index:--\u003E\u003C!--    span= index--\u003E\u003C!--div--\u003E\u003C!--    span line:--\u003E\u003C!--    span= line--\u003E\u003C!--div--\u003E\u003C!--    span text-length:--\u003E\u003C!--    span= length--\u003E\u003C!--div--\u003E\u003C!--    span one-symbol-width:--\u003E\u003C!--    span= one--\u003E\u003C!--div--\u003E\u003C!--    span cursor-offset-width:--\u003E\u003C!--    span= offset.width--\u003E\u003C!--div--\u003E\u003C!--    span cursor-offset-height:--\u003E\u003C!--    span= offset.height--\u003E\u003C!--div--\u003E\u003C!--    span block-width:--\u003E\u003C!--    span= block.width--\u003E\u003C!--div--\u003E\u003C!--    span block-height:--\u003E\u003C!--    span= block.height--\u003E\u003C!--div--\u003E\u003C!--    span cursor-x:--\u003E\u003C!--    span= eventInfo.x--\u003E\u003C!--div--\u003E\u003C!--    span cursor-y:--\u003E\u003C!--    span= eventInfo.y--\u003E\u003C!--.edit-button EDIT--\u003E\u003C\u002Fdiv\u003E";
    }.call(this, "href" in locals_for_with ?
        locals_for_with.href :
        typeof href !== 'undefined' ? href : undefined, "netGraph" in locals_for_with ?
        locals_for_with.netGraph :
        typeof netGraph !== 'undefined' ? netGraph : undefined, "word" in locals_for_with ?
        locals_for_with.word :
        typeof word !== 'undefined' ? word : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),

/***/ "./node_modules/pug-loader/index.js!./src/page/render/styles/style.pug":
/*!*****************************************************************************!*\
  !*** ./node_modules/pug-loader/index.js!./src/page/render/styles/style.pug ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(/*! !../../../../node_modules/pug-runtime/index.js */ "./node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cstyle\u003E.menu-container {\n    text-align: center;\n}\n\n.page-popup-menu {\n    position: fixed;\n    user-select: none;\n    color: #1e81c6;\n    z-index: 1000;\n    transition: all 0.2s ease;\n    background: white;\n    border: 1px #1e81c6 solid;\n    padding: 2px;\n    border-radius: 4px;\n}\n\na {\n    text-decoration: none;\n}\n\na:hover {\n    text-decoration: none;\n}\n\n.wb-level-controller {\n    cursor: pointer;\n}\n\n.wb-level-number {\n    color: #444\n}\n\n.change-level-menu {\n    height: 30px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-around;\n    align-items: center;\n    font-family: Impact, serif;\n    position: relative;\n    font-size: 18px;\n    z-index: 1001;\n    border-radius: 8px;\n    background: #f9f9ff;\n    border: 1px #1e81c6 solid;\n}\n\n.display-word-menu {\n    display: flex;\n    flex-direction: column;\n    grid-gap:4px;\n    margin: 4px 8px;\n    padding-bottom: 2px;\n    font-size: 12px;\n}\n\n.display-word-menu a {\n    line-height: normal;\n    text-decoration: none;\n    color: #1e81c6;\n    border-bottom: 1px #1e81c6 solid;\n}\n\n.display-word-menu div {\n    display: flex;\n    flex-direction: row;\n    grid-gap: 4px;\n}\n\n.display-word-menu .edit-button {\n    margin-left: 4px;\n    font-family: Impact, serif;\n}\u003C\u002Fstyle\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ "./node_modules/pug-runtime/index.js":
/*!*******************************************!*\
  !*** ./node_modules/pug-runtime/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;
      var valB = pug_style(b[key]);
      valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
}

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '',
    className,
    padding = '',
    escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '',
    padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    return val + '';
  }
}

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (
    val === false ||
    val == null ||
    (!val && (key === 'class' || key === 'style'))
  ) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  var type = typeof val;
  if (
    (type === 'object' || type === 'function') &&
    typeof val.toJSON === 'function'
  ) {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + "='" + val.replace(/'/g, '&#39;') + "'";
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse) {
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
}

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html) {
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34:
        escape = '&quot;';
        break;
      case 38:
        escape = '&amp;';
        break;
      case 60:
        escape = '&lt;';
        break;
      case 62:
        escape = '&gt;';
        break;
      default:
        continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
}

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str) {
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  var context, lines, start, end;
  try {
    str = str || (__webpack_require__(/*! fs */ "?8f63").readFileSync)(filename, {encoding: 'utf8'});
    context = 3;
    lines = str.split('\n');
    start = Math.max(lineno - context, 0);
    end = Math.min(lines.length, lineno + context);
  } catch (ex) {
    err.message +=
      ' - could not read from ' + filename + ' (' + ex.message + ')';
    pug_rethrow(err, null, lineno);
    return;
  }

  // Error context
  context = lines
    .slice(start, end)
    .map(function(line, i) {
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ') + curr + '| ' + line;
    })
    .join('\n');

  // Alter exception message
  err.path = filename;
  try {
    err.message =
      (filename || 'Pug') +
      ':' +
      lineno +
      '\n' +
      context +
      '\n\n' +
      err.message;
  } catch (e) {}
  throw err;
}


/***/ }),

/***/ "./src/core/HTMLMapper.ts":
/*!********************************!*\
  !*** ./src/core/HTMLMapper.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTMLMapper: () => (/* binding */ HTMLMapper)
/* harmony export */ });
class HTMLMapper {
    constructor() {
        this.toElement = (html) => {
            const template = window.document.createElement("div");
            template.innerHTML = html.trim();
            return template.firstChild;
        };
    }
}


/***/ }),

/***/ "./src/core/builder/AbstractView.ts":
/*!******************************************!*\
  !*** ./src/core/builder/AbstractView.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractView: () => (/* binding */ AbstractView)
/* harmony export */ });
/* harmony import */ var _HTMLMapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../HTMLMapper */ "./src/core/HTMLMapper.ts");

class AbstractView {
    constructor() {
        this.getHTMLMapper = () => {
            return this.HTMLMapper;
        };
        this.HTMLMapper = new _HTMLMapper__WEBPACK_IMPORTED_MODULE_0__.HTMLMapper();
    }
}


/***/ }),

/***/ "./src/lib/controllers/CloneBlockController.ts":
/*!*****************************************************!*\
  !*** ./src/lib/controllers/CloneBlockController.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CloneBlockController: () => (/* binding */ CloneBlockController)
/* harmony export */ });
/* harmony import */ var _models_SizeModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/SizeModel */ "./src/lib/models/SizeModel.ts");

class CloneBlockController {
    constructor(tagName) {
        this.executeInAppendTiming = (executeList) => {
            parent.document.body.appendChild(this.cloneRef);
            const result = executeList.map(execute => execute());
            parent.document.body.removeChild(this.cloneRef);
            return result;
        };
        this.getParameterizedSize = (computedStyles, attributes) => {
            this.attributeStylesService.fillCloneAttributeStyles(computedStyles, attributes);
            return this.buildSize();
        };
        this.appendAttributeStyles = (attributeStyles) => {
            this.cloneRef.style.width = "auto";
            this.cloneRef.style.wordBreak = "normal";
            this.cloneRef.setAttribute('style', attributeStyles);
        };
        // fillCloneStyles = (computedStyles: CSSStyleDeclaration) => {
        //     // @ts-ignore
        //     this.cloneRef["style"] = computedStyles;
        // }
        this.buildSize = () => {
            return new _models_SizeModel__WEBPACK_IMPORTED_MODULE_0__.SizeModel(this.cloneRef.offsetWidth, this.cloneRef.offsetHeight);
        };
        this.cloneRef = document.createElement(tagName);
    }
    setAttributeStylesService(attributeStylesService) {
        this.attributeStylesService = attributeStylesService;
    }
    fillCloneContent(html, text) {
        //this.#ref.innerHTML
        this.cloneRef.innerHTML = html;
        this.cloneRef.innerText = text;
    }
}


/***/ }),

/***/ "./src/lib/controllers/ComputedStylesController.ts":
/*!*********************************************************!*\
  !*** ./src/lib/controllers/ComputedStylesController.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComputedStylesController: () => (/* binding */ ComputedStylesController)
/* harmony export */ });
class ComputedStylesController {
    constructor() {
        this.getComputedStyles = (ref) => {
            return window.getComputedStyle(ref);
        };
    }
}


/***/ }),

/***/ "./src/lib/models/CloneBlockModel.ts":
/*!*******************************************!*\
  !*** ./src/lib/models/CloneBlockModel.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CloneBlockModel: () => (/* binding */ CloneBlockModel)
/* harmony export */ });
class CloneBlockModel {
    constructor(inline, block) {
        this.inline = inline;
        this.block = block;
    }
}


/***/ }),

/***/ "./src/lib/models/SizeModel.ts":
/*!*************************************!*\
  !*** ./src/lib/models/SizeModel.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SizeModel: () => (/* binding */ SizeModel)
/* harmony export */ });
class SizeModel {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}


/***/ }),

/***/ "./src/lib/provider/StylesProvider.ts":
/*!********************************************!*\
  !*** ./src/lib/provider/StylesProvider.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StylesProvider: () => (/* binding */ StylesProvider)
/* harmony export */ });
class StylesProvider {
    constructor() {
        this.HIDDEN_STYLES = "left:0;top:0;position:absolute;z-index:100";
        this.buildAttributeStyles = (fontSize, fontFamily, widthHeightAttributes) => {
            const mainAttributeStyles = `${this.HIDDEN_STYLES};font-size:${fontSize};font-family:${fontFamily};`;
            return `${mainAttributeStyles}${widthHeightAttributes}`;
        };
        this.getWidthHeightInlineAttributes = () => "width:auto;height:auto;white-space:nowrap";
        this.getWidthHeightBlockAttributes = (size) => `width:${size.width}px;height:auto`;
    }
}


/***/ }),

/***/ "./src/lib/services/AttributeStylesService.ts":
/*!****************************************************!*\
  !*** ./src/lib/services/AttributeStylesService.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttributeStylesService: () => (/* binding */ AttributeStylesService)
/* harmony export */ });
class AttributeStylesService {
    constructor(cloneBlockController, stylesProvider) {
        this.fillCloneAttributeStyles = (computedStyles, widthHeightAttributes) => {
            const fontSize = computedStyles["fontSize"];
            const fontFamily = computedStyles["fontFamily"];
            const attributeStyles = this.stylesProvider.buildAttributeStyles(fontSize, fontFamily, widthHeightAttributes);
            this.elementExactSizeController.appendAttributeStyles(attributeStyles);
        };
        this.stylesProvider = stylesProvider;
        this.elementExactSizeController = cloneBlockController;
    }
}


/***/ }),

/***/ "./src/lib/services/CloneBlockService.ts":
/*!***********************************************!*\
  !*** ./src/lib/services/CloneBlockService.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CloneBlockService: () => (/* binding */ CloneBlockService)
/* harmony export */ });
/* harmony import */ var _controllers_CloneBlockController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/CloneBlockController */ "./src/lib/controllers/CloneBlockController.ts");
/* harmony import */ var _provider_StylesProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../provider/StylesProvider */ "./src/lib/provider/StylesProvider.ts");
/* harmony import */ var _controllers_ComputedStylesController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/ComputedStylesController */ "./src/lib/controllers/ComputedStylesController.ts");
/* harmony import */ var _models_CloneBlockModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/CloneBlockModel */ "./src/lib/models/CloneBlockModel.ts");
/* harmony import */ var _AttributeStylesService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AttributeStylesService */ "./src/lib/services/AttributeStylesService.ts");





class CloneBlockService {
    constructor() {
        this.ELEMENT_TYPE_NAME = "div";
        this.getSize = (ref, text, refSize) => {
            const computedStyles = this.computedStylesController.getComputedStyles(ref);
            //this.elementExactSizeController.fillCloneStyles(computedStyles);
            this.cloneBlockController.fillCloneContent(ref.innerHTML, text);
            const sizes = this.cloneBlockController.executeInAppendTiming([
                () => {
                    return this.cloneBlockController.getParameterizedSize(computedStyles, this.stylesProvider.getWidthHeightInlineAttributes());
                },
                () => {
                    return this.cloneBlockController.getParameterizedSize(computedStyles, this.stylesProvider.getWidthHeightBlockAttributes(refSize));
                }
            ]);
            return new _models_CloneBlockModel__WEBPACK_IMPORTED_MODULE_3__.CloneBlockModel(sizes[0], sizes[1]);
        };
        this.cloneBlockController = new _controllers_CloneBlockController__WEBPACK_IMPORTED_MODULE_0__.CloneBlockController(this.ELEMENT_TYPE_NAME);
        this.computedStylesController = new _controllers_ComputedStylesController__WEBPACK_IMPORTED_MODULE_2__.ComputedStylesController();
        this.stylesProvider = new _provider_StylesProvider__WEBPACK_IMPORTED_MODULE_1__.StylesProvider();
        this.attributeStylesService = new _AttributeStylesService__WEBPACK_IMPORTED_MODULE_4__.AttributeStylesService(this.cloneBlockController, this.stylesProvider);
        this.cloneBlockController.setAttributeStylesService(this.attributeStylesService);
    }
}


/***/ }),

/***/ "./src/page/ApiPageService.ts":
/*!************************************!*\
  !*** ./src/page/ApiPageService.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiPageService: () => (/* binding */ ApiPageService)
/* harmony export */ });
/* harmony import */ var _core_ApiStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/ApiStore */ "./src/core/ApiStore.js");
/* harmony import */ var _render_styles_Styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render/styles/Styles */ "./src/page/render/styles/Styles.js");
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Context */ "./src/core/Context.js");
/* harmony import */ var _queue_QueueProcessor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./queue/QueueProcessor */ "./src/page/queue/QueueProcessor.js");
/* harmony import */ var _block_popup_controllers_PopupController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block/popup/controllers/PopupController */ "./src/page/block/popup/controllers/PopupController.ts");
/* harmony import */ var _block_PageManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block/PageManager */ "./src/page/block/PageManager.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ApiPageService_styles, _ApiPageService_storage, _ApiPageService_manager, _ApiPageService_joinPoint, _ApiPageService_old;






class ApiPageService {
    constructor() {
        _ApiPageService_styles.set(this, void 0);
        _ApiPageService_storage.set(this, void 0);
        _ApiPageService_manager.set(this, void 0);
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // Проверяем авторизацию в API
                const isAuth = yield __classPrivateFieldGet(this, _ApiPageService_storage, "f").ensureAuth();
                __classPrivateFieldGet(this, _ApiPageService_storage, "f").appParams().then(enable => {
                    __classPrivateFieldGet(this, _ApiPageService_joinPoint, "f").call(this, enable, isAuth);
                });
            }
            catch (error) {
                // В случае ошибки API, запускаем в локальном режиме
                __classPrivateFieldGet(this, _ApiPageService_storage, "f").appParams().then(enable => {
                    __classPrivateFieldGet(this, _ApiPageService_joinPoint, "f").call(this, enable, false);
                });
            }
        });
        /**
         * Добавляется в тег head новые css-стили.
         * Если доступен парсинг на сервере, делаем на сервере, иначе на локальной машине
         */
        _ApiPageService_joinPoint.set(this, (enable, isApiAvailable) => {
            if (enable) {
                __classPrivateFieldGet(this, _ApiPageService_styles, "f").append();
                __classPrivateFieldGet(this, _ApiPageService_manager, "f").run();
                // Добавляем информацию о доступности API в контекст
                _core_Context__WEBPACK_IMPORTED_MODULE_2__.Context.add("apiAvailable", isApiAvailable);
            }
        }
        /**
         * Устанавливаются настройки языка
         * Запускается бесконечный процесс парсинга и рендеринга страницы локально
         */
        );
        /**
         * Устанавливаются настройки языка
         * Запускается бесконечный процесс парсинга и рендеринга страницы локально
         */
        _ApiPageService_old.set(this, () => {
            _core_Context__WEBPACK_IMPORTED_MODULE_2__.Context.add("language", { sl: "en", tl: "ru" });
            const processor = new _queue_QueueProcessor__WEBPACK_IMPORTED_MODULE_3__.QueueProcessor();
            processor.runInfinityParsing();
            processor.runInfinityRender();
        });
        __classPrivateFieldSet(this, _ApiPageService_storage, new _core_ApiStore__WEBPACK_IMPORTED_MODULE_0__.ApiStore(), "f");
        __classPrivateFieldSet(this, _ApiPageService_styles, new _render_styles_Styles__WEBPACK_IMPORTED_MODULE_1__.Styles(), "f");
        _core_Context__WEBPACK_IMPORTED_MODULE_2__.Context.add("menu", new _block_popup_controllers_PopupController__WEBPACK_IMPORTED_MODULE_4__.PopupController());
        __classPrivateFieldSet(this, _ApiPageService_manager, new _block_PageManager__WEBPACK_IMPORTED_MODULE_5__.PageManager(), "f");
    }
}
_ApiPageService_styles = new WeakMap(), _ApiPageService_storage = new WeakMap(), _ApiPageService_manager = new WeakMap(), _ApiPageService_joinPoint = new WeakMap(), _ApiPageService_old = new WeakMap();


/***/ }),

/***/ "./src/page/block/IndexService.ts":
/*!****************************************!*\
  !*** ./src/page/block/IndexService.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IndexService: () => (/* binding */ IndexService)
/* harmony export */ });
/* harmony import */ var _realtime_parser_models_CursorModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../realtime/parser/models/CursorModel */ "./src/page/realtime/parser/models/CursorModel.ts");
/* harmony import */ var _cache_CacheManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cache/CacheManager */ "./src/page/block/cache/CacheManager.ts");


class IndexService {
    constructor() {
        this.cacheManager = new _cache_CacheManager__WEBPACK_IMPORTED_MODULE_1__.CacheManager();
    }
    getIndex(event, blockInnerText) {
        let cache = this.cacheManager.getOrUpdateCache(event);
        const cursor = new _realtime_parser_models_CursorModel__WEBPACK_IMPORTED_MODULE_0__.CursorModel(event.offsetX, event.offsetY);
        const blockWidth = cache.clone.block.width;
        const inlineHeight = cache.clone.inline.height;
        const inlineWidth = cache.clone.inline.width;
        const currentLine = Math.round(cursor.y / inlineHeight);
        console.log('currentLine: ' + currentLine);
        const currentPositionByXInline = (blockWidth * (currentLine - 1)) + cursor.x;
        const offsetPercent = currentPositionByXInline / inlineWidth;
        const symbolIndexInline = Math.round(blockInnerText.length * offsetPercent);
        return symbolIndexInline;
    }
}


/***/ }),

/***/ "./src/page/block/NodeManager.ts":
/*!***************************************!*\
  !*** ./src/page/block/NodeManager.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeManager: () => (/* binding */ NodeManager)
/* harmony export */ });
class NodeManager {
    constructor() {
        this.notInteractiveElement = (node) => {
            return !this.isScript(node) && !this.isSVG(node) && !this.isImage(node)
                && !this.isInput(node) && /*!this.isLink(node) &&*/ !this.isBr(node)
                && !this.isStyle(node) && !this.isForm(node) && !this.isComment(node)
                && !this.isUnverifiableInteractiveElement(node);
        };
        this.isScript = (node) => node instanceof HTMLScriptElement;
        this.isForm = (node) => node instanceof HTMLFormElement;
        this.isImage = (node) => node instanceof HTMLImageElement;
        this.isInput = (node) => node instanceof HTMLInputElement;
        // private isLink = (node: Node) => node instanceof HTMLLinkElement;
        this.isStyle = (node) => node instanceof HTMLStyleElement;
        this.isBr = (node) => node instanceof HTMLBRElement;
        this.isSVG = (node) => node instanceof SVGSVGElement;
        this.isComment = (node) => node instanceof Comment;
        this.isUnverifiableInteractiveElement = (node) => node.nodeName === "CODE" /*|| node.nodeName === "A"*/;
        this.resultArray = [];
        this.getChildNodes = (element) => {
            if (!element)
                return;
            const childNodes = [];
            for (const node of element.childNodes) {
                if (this.notInteractiveElement(node))
                    childNodes.push(node);
            }
            return childNodes;
        };
        this.getTextNodes = (element) => {
            const ELEMENT_NODE = 1;
            const TEXT_NODE = 3;
            const childNodes = this.getChildNodes(element);
            // Очищаем массив перед новым поиском
            this.resultArray = [];
            for (const elememt of childNodes) {
                if (elememt.nodeType === TEXT_NODE) {
                    console.log(elememt.textContent);
                    this.resultArray.push(elememt);
                }
                else if (elememt.nodeType === ELEMENT_NODE) {
                    this.getTextNodes(elememt);
                }
            }
            return this.resultArray;
        };
    }
}


/***/ }),

/***/ "./src/page/block/PageManager.ts":
/*!***************************************!*\
  !*** ./src/page/block/PageManager.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageManager: () => (/* binding */ PageManager)
/* harmony export */ });
/* harmony import */ var _cache_CacheManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cache/CacheManager */ "./src/page/block/cache/CacheManager.ts");
/* harmony import */ var _popup_PopupManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popup/PopupManager */ "./src/page/block/popup/PopupManager.ts");
/* harmony import */ var _highlighting_HighlightingService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./highlighting/HighlightingService */ "./src/page/block/highlighting/HighlightingService.ts");
/* harmony import */ var _lib_services_CloneBlockService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/services/CloneBlockService */ "./src/lib/services/CloneBlockService.ts");
/* harmony import */ var _IndexService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IndexService */ "./src/page/block/IndexService.ts");
/* harmony import */ var _NodeManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NodeManager */ "./src/page/block/NodeManager.ts");
/* harmony import */ var _lib_models_SizeModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/models/SizeModel */ "./src/lib/models/SizeModel.ts");







class PageManager {
    constructor() {
        this.run = () => {
            const body = document.querySelector('body');
            const textNodeArray = this.nodeManager.getTextNodes(body);
            console.log(textNodeArray);
            const cloneArray = textNodeArray.map((node) => {
                // Для текстовых узлов нужно получить родительский элемент
                const parentElement = node.parentElement;
                if (!parentElement) {
                    console.warn('Parent element not found for text node:', node);
                    return null;
                }
                const { width, height } = parentElement.getBoundingClientRect();
                return this.cloneBlockService.getSize(parentElement, node.textContent, new _lib_models_SizeModel__WEBPACK_IMPORTED_MODULE_6__.SizeModel(width, height));
            }).filter(Boolean); // Убираем null значения
            console.log(cloneArray.length);
            cloneArray.forEach((el) => {
                console.log(el.inline.width);
                console.log(el.inline.height);
                console.log(el.block.width);
                console.log(el.block.height);
            });
        };
        this.cacheManager = new _cache_CacheManager__WEBPACK_IMPORTED_MODULE_0__.CacheManager();
        this.popupManager = new _popup_PopupManager__WEBPACK_IMPORTED_MODULE_1__.PopupManager("menu");
        this.highlightingService = new _highlighting_HighlightingService__WEBPACK_IMPORTED_MODULE_2__.HighlightingService();
        this.cloneBlockService = new _lib_services_CloneBlockService__WEBPACK_IMPORTED_MODULE_3__.CloneBlockService();
        this.indexService = new _IndexService__WEBPACK_IMPORTED_MODULE_4__.IndexService();
        this.nodeManager = new _NodeManager__WEBPACK_IMPORTED_MODULE_5__.NodeManager();
    }
}
// const nodes = span.childNodes
// for (let i = 0; i < nodes.length; i++) {
//   const item = nodes[i];
//     if (item.innerHTML == undefined) {
//         const split = item.textContent.split(' ')
//         console.log(split)
//     }
// }
// onclick = (event: MouseEvent) => {
//     let cache: CacheModel = this.cacheManager.getCache(event);
//     if (cache) {
//     }
// }
// onmousemove = (event: MouseEvent) => {
//     this.cacheManager.validateNoneBlackListElement(event, () => {
//         // let cache: CacheModel = this.cacheManager.getOrUpdateCache(event);
//         const blockInnerText = (<HTMLElement> event.target).innerText
//         const index = new IndexService().getIndex(event, blockInnerText)
//         const parser = new ParserService();
//         const word = parser.getWord(index, blockInnerText);
//         console.log(word)
//         // const highlighting = new BlockHighlighting(
//         //     cache.focusBlock,
//         //     cache.textBlocks
//         // );
//         // highlighting.draw();
//         this.onclick(event);
//     });
// }


/***/ }),

/***/ "./src/page/block/cache/CacheManager.ts":
/*!**********************************************!*\
  !*** ./src/page/block/cache/CacheManager.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CacheManager: () => (/* binding */ CacheManager)
/* harmony export */ });
/* harmony import */ var _models_CacheModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/CacheModel */ "./src/page/block/cache/models/CacheModel.ts");
/* harmony import */ var _realtime_blocks_FocusBlockModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../realtime/blocks/FocusBlockModel */ "./src/page/realtime/blocks/FocusBlockModel.ts");
/* harmony import */ var _lib_services_CloneBlockService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/services/CloneBlockService */ "./src/lib/services/CloneBlockService.ts");
/* harmony import */ var _lib_models_SizeModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/models/SizeModel */ "./src/lib/models/SizeModel.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CacheManager_blackList, _CacheManager_cachedBlocks, _CacheManager_updateCache, _CacheManager_whereWeAre, _CacheManager_getTextNodes;




class CacheManager {
    constructor() {
        _CacheManager_blackList.set(this, void 0);
        _CacheManager_cachedBlocks.set(this, void 0);
        this.getOrUpdateCache = (event) => {
            let cache = this.getCache(event);
            if (!cache) {
                if (__classPrivateFieldGet(this, _CacheManager_getTextNodes, "f").call(this, event).length > 0) {
                    cache = __classPrivateFieldGet(this, _CacheManager_updateCache, "f").call(this, event);
                }
                else {
                    __classPrivateFieldGet(this, _CacheManager_blackList, "f").add(event.target);
                }
            }
            return cache;
        };
        this.getCache = (event) => {
            return __classPrivateFieldGet(this, _CacheManager_cachedBlocks, "f").get(event.target);
        };
        this.validateNoneBlackListElement = (event, execute) => {
            if (!__classPrivateFieldGet(this, _CacheManager_blackList, "f").has(event.target)) {
                execute();
            }
        };
        _CacheManager_updateCache.set(this, (event) => {
            const ref = event.target;
            const text = ref.innerText;
            const { width, height } = ref.getBoundingClientRect();
            const clone = this.cloneBlockService.getSize(ref, text, new _lib_models_SizeModel__WEBPACK_IMPORTED_MODULE_3__.SizeModel(width, height));
            const cache = new _models_CacheModel__WEBPACK_IMPORTED_MODULE_0__.CacheModel(clone);
            __classPrivateFieldGet(this, _CacheManager_cachedBlocks, "f").set(event.target, cache);
            return cache;
        });
        _CacheManager_whereWeAre.set(this, (event) => {
            return new _realtime_blocks_FocusBlockModel__WEBPACK_IMPORTED_MODULE_1__.FocusBlockModel(event);
        }
        // What is this!?
        );
        // What is this!?
        _CacheManager_getTextNodes.set(this, (event) => {
            const array = Array
                .from(event.target.childNodes)
                .filter(node => node.nodeName === "#text");
            //Почему пропускает вложенные элементы?    
            //array.map((el) => console.log(el));
            return array;
        });
        __classPrivateFieldSet(this, _CacheManager_blackList, new Set(), "f");
        __classPrivateFieldSet(this, _CacheManager_cachedBlocks, new Map(), "f");
        this.cloneBlockService = new _lib_services_CloneBlockService__WEBPACK_IMPORTED_MODULE_2__.CloneBlockService();
    }
}
_CacheManager_blackList = new WeakMap(), _CacheManager_cachedBlocks = new WeakMap(), _CacheManager_updateCache = new WeakMap(), _CacheManager_whereWeAre = new WeakMap(), _CacheManager_getTextNodes = new WeakMap();


/***/ }),

/***/ "./src/page/block/cache/models/CacheModel.ts":
/*!***************************************************!*\
  !*** ./src/page/block/cache/models/CacheModel.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CacheModel: () => (/* binding */ CacheModel)
/* harmony export */ });
class CacheModel {
    constructor(clone) {
        this.clone = clone;
    }
}


/***/ }),

/***/ "./src/page/block/highlighting/HighlightingController.ts":
/*!***************************************************************!*\
  !*** ./src/page/block/highlighting/HighlightingController.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HighlightingController: () => (/* binding */ HighlightingController)
/* harmony export */ });
/* harmony import */ var _HighlightingProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HighlightingProvider */ "./src/page/block/highlighting/HighlightingProvider.ts");

class HighlightingController {
    constructor() {
        this.appendRef = (block) => {
            this.updateHighlightBlockRef();
            const highlightBlock = this.highlightingProvider.getUpdatedBlockWithColor(block, "blue");
            const element = this.highlightingProvider.getHighlightingElement(highlightBlock);
            HighlightingController.highlightBlockRef.appendChild(element);
        };
        this.updateHighlightBlockRef = () => {
            if (!HighlightingController.highlightBlockRef) {
                HighlightingController.highlightBlockRef = window.document.createElement("div");
                window.document.body.appendChild(HighlightingController.highlightBlockRef);
            }
        };
        this.destructRef = () => {
            if (HighlightingController.highlightBlockRef) {
                window.document.body.removeChild(HighlightingController.highlightBlockRef);
            }
        };
        this.highlightingProvider = new _HighlightingProvider__WEBPACK_IMPORTED_MODULE_0__.HighlightingProvider();
    }
}


/***/ }),

/***/ "./src/page/block/highlighting/HighlightingProvider.ts":
/*!*************************************************************!*\
  !*** ./src/page/block/highlighting/HighlightingProvider.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HighlightingProvider: () => (/* binding */ HighlightingProvider)
/* harmony export */ });
class HighlightingProvider {
    constructor() {
        this.getUpdatedBlockWithColor = (block, color) => {
            const highlightBlock = block;
            highlightBlock.color = color;
            return highlightBlock;
        };
        this.getHighlightingElement = (block) => {
            const draw = window.document.createElement("div");
            draw.style.left = `${block.x}px`;
            draw.style.top = `${block.y}px`;
            draw.style.width = `${block.width}px`;
            draw.style.height = `${block.height}px`;
            draw.style.position = "absolute";
            draw.style.zIndex = "1000";
            draw.style.opacity = "0.25";
            draw.style.pointerEvents = "none";
            draw.style.background = block.color;
            return draw;
        };
    }
}


/***/ }),

/***/ "./src/page/block/highlighting/HighlightingService.ts":
/*!************************************************************!*\
  !*** ./src/page/block/highlighting/HighlightingService.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HighlightingService: () => (/* binding */ HighlightingService)
/* harmony export */ });
/* harmony import */ var _HighlightingController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HighlightingController */ "./src/page/block/highlighting/HighlightingController.ts");

class HighlightingService {
    constructor() {
        this.drawHighlight = (innerTextBlocks) => {
            this.highlightingController.destructRef();
            innerTextBlocks.getBlocks().forEach((block, index) => {
                const position = innerTextBlocks.getPosition(index);
                [block.x, block.y] = [position.x, position.y];
                this.highlightingController.appendRef(block);
            });
        };
        this.drawWordHighlight = (text) => {
            const highlight = document.createElement('span');
            highlight.style.border = "1px solid black";
            highlight.className = 'highlight';
            highlight.innerText = text;
            return highlight;
        };
        this.highlightingController = new _HighlightingController__WEBPACK_IMPORTED_MODULE_0__.HighlightingController();
    }
}


/***/ }),

/***/ "./src/page/block/popup/PopupManager.ts":
/*!**********************************************!*\
  !*** ./src/page/block/popup/PopupManager.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopupManager: () => (/* binding */ PopupManager)
/* harmony export */ });
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Context */ "./src/core/Context.js");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PopupManager_popupController;

class PopupManager {
    constructor(popupName) {
        _PopupManager_popupController.set(this, void 0);
        this.updatePopup = (word, netGraph) => {
            const ref = __classPrivateFieldGet(this, _PopupManager_popupController, "f").getRef();
            __classPrivateFieldGet(this, _PopupManager_popupController, "f").displayOn();
            __classPrivateFieldGet(this, _PopupManager_popupController, "f").setContent(word, netGraph);
            __classPrivateFieldGet(this, _PopupManager_popupController, "f").setPosition(window.innerWidth - ref.offsetWidth, window.innerHeight - ref.offsetHeight - 20);
        };
        __classPrivateFieldSet(this, _PopupManager_popupController, _core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.get(popupName), "f");
    }
}
_PopupManager_popupController = new WeakMap();


/***/ }),

/***/ "./src/page/block/popup/controllers/PopupController.ts":
/*!*************************************************************!*\
  !*** ./src/page/block/popup/controllers/PopupController.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopupController: () => (/* binding */ PopupController)
/* harmony export */ });
/* harmony import */ var _view_LevelView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/LevelView */ "./src/page/block/popup/view/LevelView.js");
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/Context */ "./src/core/Context.js");
/* harmony import */ var _core_HTMLMapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/HTMLMapper */ "./src/core/HTMLMapper.ts");
/* harmony import */ var _view_WordView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/WordView */ "./src/page/block/popup/view/WordView.js");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PopupController_instances, _PopupController_ref, _PopupController_HTMLMapper, _PopupController_wordContainer, _PopupController_levelContainer, _PopupController_left, _PopupController_top, _PopupController_appendPopup, _PopupController_createPopup, _PopupController_updatePosition, _PopupController_onMouseOver, _PopupController_setWordPosition, _PopupController_getOffset;




class PopupController {
    constructor() {
        _PopupController_instances.add(this);
        _PopupController_ref.set(this, void 0);
        _PopupController_HTMLMapper.set(this, void 0);
        _PopupController_wordContainer.set(this, void 0);
        _PopupController_levelContainer.set(this, void 0);
        _PopupController_left.set(this, "0");
        _PopupController_top.set(this, "0");
        this.getRef = () => {
            return __classPrivateFieldGet(this, _PopupController_ref, "f");
        };
        this.setContent = (word, netGraph) => {
            __classPrivateFieldGet(this, _PopupController_levelContainer, "f").setWord(word);
            //this.#levelContainer.updateLevel();
            __classPrivateFieldGet(this, _PopupController_wordContainer, "f").updateLink(word, netGraph);
            __classPrivateFieldGet(this, _PopupController_setWordPosition, "f").call(this);
        };
        this.setPosition = (left, top) => {
            const offset = _core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.get("POPUP_WIDTH") / 2;
            __classPrivateFieldSet(this, _PopupController_left, `${left - offset}px`, "f");
            __classPrivateFieldSet(this, _PopupController_top, `${top}px`, "f");
            __classPrivateFieldGet(this, _PopupController_updatePosition, "f").call(this);
        };
        /*
        *  Показывать попап
        */
        this.displayOn = () => {
            __classPrivateFieldGet(this, _PopupController_ref, "f").style.visibility = "visible";
        };
        /*
        *  Скрывать попап
        */
        this.displayOff = () => {
            __classPrivateFieldGet(this, _PopupController_ref, "f").style.visibility = "hidden";
        };
        /*
        *  Добавление попапа в body
        */
        _PopupController_appendPopup.set(this, () => {
            const body = window.document.querySelector('body');
            body.appendChild(__classPrivateFieldGet(this, _PopupController_ref, "f"));
        }
        /*
        * Добавляем препроцессор popup'а в обертку HTMLMapper
        * По дефолту попап скрыт, но на него вешаем addEventListner'ы с открытием\закрытием попапа
        * Создаем контейнеры для слов и для уровня
        */
        );
        /*
        * Добавляем препроцессор popup'а в обертку HTMLMapper
        * По дефолту попап скрыт, но на него вешаем addEventListner'ы с открытием\закрытием попапа
        * Создаем контейнеры для слов и для уровня
        */
        _PopupController_createPopup.set(this, () => {
            const html = __webpack_require__(/*! apply-loader!pug-loader!../templates/popup.pug */ "./node_modules/apply-loader/index.js!./node_modules/pug-loader/index.js!./src/page/block/popup/templates/popup.pug");
            __classPrivateFieldSet(this, _PopupController_ref, __classPrivateFieldGet(this, _PopupController_HTMLMapper, "f").toElement(html), "f");
            this.displayOff();
            __classPrivateFieldGet(this, _PopupController_instances, "m", _PopupController_onMouseOver).call(this);
            __classPrivateFieldSet(this, _PopupController_wordContainer, new _view_WordView__WEBPACK_IMPORTED_MODULE_3__.WordView(__classPrivateFieldGet(this, _PopupController_ref, "f")), "f");
            __classPrivateFieldSet(this, _PopupController_levelContainer, new _view_LevelView__WEBPACK_IMPORTED_MODULE_0__.LevelView(__classPrivateFieldGet(this, _PopupController_ref, "f")), "f");
            __classPrivateFieldGet(this, _PopupController_appendPopup, "f").call(this);
        });
        _PopupController_updatePosition.set(this, () => {
            __classPrivateFieldGet(this, _PopupController_ref, "f").style.left = __classPrivateFieldGet(this, _PopupController_left, "f");
            __classPrivateFieldGet(this, _PopupController_ref, "f").style.top = __classPrivateFieldGet(this, _PopupController_top, "f");
        });
        /*
        * Определяем положение слова, используя ширину wordContaner'a и ширину попапа
        */
        _PopupController_setWordPosition.set(this, () => {
            const offset = __classPrivateFieldGet(this, _PopupController_getOffset, "f").call(this, __classPrivateFieldGet(this, _PopupController_wordContainer, "f").getRef().offsetWidth);
            const position = __classPrivateFieldGet(this, _PopupController_getOffset, "f").call(this, _core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.get("POPUP_WIDTH")) - offset;
            __classPrivateFieldGet(this, _PopupController_wordContainer, "f").getRef().style.left = `${position}px`;
        });
        _PopupController_getOffset.set(this, (width) => width / 2);
        __classPrivateFieldSet(this, _PopupController_HTMLMapper, new _core_HTMLMapper__WEBPACK_IMPORTED_MODULE_2__.HTMLMapper(), "f");
        _core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.add("POPUP_WIDTH", 120);
        _core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.add("TRANSLATE_URL", "https://translate.google.com/#view=home&op=translate");
        __classPrivateFieldGet(this, _PopupController_createPopup, "f").call(this);
    }
}
_PopupController_ref = new WeakMap(), _PopupController_HTMLMapper = new WeakMap(), _PopupController_wordContainer = new WeakMap(), _PopupController_levelContainer = new WeakMap(), _PopupController_left = new WeakMap(), _PopupController_top = new WeakMap(), _PopupController_appendPopup = new WeakMap(), _PopupController_createPopup = new WeakMap(), _PopupController_updatePosition = new WeakMap(), _PopupController_setWordPosition = new WeakMap(), _PopupController_getOffset = new WeakMap(), _PopupController_instances = new WeakSet(), _PopupController_onMouseOver = function _PopupController_onMouseOver() {
    __classPrivateFieldGet(this, _PopupController_ref, "f").addEventListener("mouseover", () => this.displayOn());
    __classPrivateFieldGet(this, _PopupController_ref, "f").addEventListener("mouseout", () => this.displayOff());
};


/***/ }),

/***/ "./src/page/block/popup/view/AbstractContainerView.ts":
/*!************************************************************!*\
  !*** ./src/page/block/popup/view/AbstractContainerView.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractContainerView: () => (/* binding */ AbstractContainerView)
/* harmony export */ });
/* harmony import */ var _core_builder_AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/builder/AbstractView */ "./src/core/builder/AbstractView.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractContainerView_ref;

class AbstractContainerView extends _core_builder_AbstractView__WEBPACK_IMPORTED_MODULE_0__.AbstractView {
    constructor(parent) {
        super();
        _AbstractContainerView_ref.set(this, void 0);
        this.setRef = (ref) => {
            __classPrivateFieldSet(this, _AbstractContainerView_ref, ref, "f");
        };
        this.getRef = () => {
            return __classPrivateFieldGet(this, _AbstractContainerView_ref, "f");
        };
        const html = __webpack_require__(/*! apply-loader!pug-loader!../templates/container.pug */ "./node_modules/apply-loader/index.js!./node_modules/pug-loader/index.js!./src/page/block/popup/templates/container.pug");
        __classPrivateFieldSet(this, _AbstractContainerView_ref, this.getHTMLMapper().toElement(html), "f");
        parent.appendChild(__classPrivateFieldGet(this, _AbstractContainerView_ref, "f"));
    }
}
_AbstractContainerView_ref = new WeakMap();


/***/ }),

/***/ "./src/page/realtime/blocks/FocusBlockModel.ts":
/*!*****************************************************!*\
  !*** ./src/page/realtime/blocks/FocusBlockModel.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusBlockModel: () => (/* binding */ FocusBlockModel)
/* harmony export */ });
class FocusBlockModel {
    constructor(event) {
        this.getRef = () => {
            return this.ref;
        };
        this.getSize = () => {
            return this.size;
        };
        this.getPosition = () => {
            return this.position;
        };
        this.setupPosition = () => {
            const x = this.rect.x + window.scrollX;
            const y = this.rect.y + window.scrollY;
            this.position = { x, y };
        };
        this.setupSize = () => {
            const width = this.rect.width;
            const height = this.rect.height;
            this.size = { width, height };
        };
        this.ref = event.target;
        this.rect = this.ref.getBoundingClientRect();
        this.setupSize();
        this.setupPosition();
    }
}


/***/ }),

/***/ "./src/page/realtime/parser/models/CursorModel.ts":
/*!********************************************************!*\
  !*** ./src/page/realtime/parser/models/CursorModel.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CursorModel: () => (/* binding */ CursorModel)
/* harmony export */ });
class CursorModel {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


/***/ }),

/***/ "./src/core/ApiApp.js":
/*!****************************!*\
  !*** ./src/core/ApiApp.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiApp: () => (/* binding */ ApiApp)
/* harmony export */ });
/* harmony import */ var _words_ApiWordbookService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./words/ApiWordbookService.js */ "./src/core/words/ApiWordbookService.js");
/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Context */ "./src/core/Context.js");



class ApiApp {

    #context;
    #wordbookService;
    #logicService;

    constructor(logicService) {
        this.#context = new _Context__WEBPACK_IMPORTED_MODULE_1__.Context();
        this.#logicService = logicService;
        this.#wordbookService = new _words_ApiWordbookService_js__WEBPACK_IMPORTED_MODULE_0__.ApiWordbookService();
    }

    start = async () => { 
        // Инициализируем API сервис
        const isInitialized = await this.#wordbookService.initialize();
        
        if (isInitialized) {
            this.#wordbookService.executeAfter(this.#runService);
            await this.#wordbookService.loadWords();
        } else {
            // Если API недоступен, запускаем логику без инициализации
            this.#runService();
        }
    }

    #runService = () => {
        _Context__WEBPACK_IMPORTED_MODULE_1__.Context.add("wordbook", this.#wordbookService);
        this.#logicService.run();
    }
}

/***/ }),

/***/ "./src/core/ApiStore.js":
/*!******************************!*\
  !*** ./src/core/ApiStore.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiStore: () => (/* binding */ ApiStore)
/* harmony export */ });
/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Context */ "./src/core/Context.js");
/* harmony import */ var _api_ApiService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/ApiService */ "./src/core/api/ApiService.js");



class ApiStore {

    #apiService;

    constructor() {
        this.#apiService = new _api_ApiService__WEBPACK_IMPORTED_MODULE_1__.ApiService();
    }

    appParams = () => {
        return new Promise(async (resolve) => {
            try {
                // Проверяем авторизацию
                const isAuth = await this.#apiService.ensureAuth();
                
                // Загружаем настройки из localStorage (для совместимости)
                chrome.storage.local.get(['enable', "russian", "english", "china", "korean"], (app) => {
                    _Context__WEBPACK_IMPORTED_MODULE_0__.Context.add("settings", app);
                    resolve(app.enable);
                });
            } catch (error) {
                // В случае ошибки API, используем локальные настройки
                chrome.storage.local.get(['enable', "russian", "english", "china", "korean"], (app) => {
                    _Context__WEBPACK_IMPORTED_MODULE_0__.Context.add("settings", app);
                    resolve(app.enable);
                });
            }
        });
    }

    saveWordbooks = (wordbooks) => {
        // Для совместимости сохраняем в localStorage
        chrome.storage.local.set(wordbooks);
    }

    getByName = (name) => {
        return new Promise(resolve => chrome.storage.local.get([name], (app) => resolve(app[name])));
    }

    /**
     * Получает API сервис
     */
    getApiService = () => {
        return this.#apiService;
    }

    /**
     * Проверяет авторизацию
     */
    ensureAuth = async () => {
        return await this.#apiService.ensureAuth();
    }

    /**
     * Получает текущего пользователя
     */
    getCurrentUser = async () => {
        return await this.#apiService.getCurrentUser();
    }
}

/***/ }),

/***/ "./src/core/Context.js":
/*!*****************************!*\
  !*** ./src/core/Context.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Context: () => (/* binding */ Context)
/* harmony export */ });
const context = new Map();

class Context {

    /**
    * bean - компонент\класс из Java
     */
    static add = (name, bean) => {
        context.set(name, bean);
    }

    static get = (beanName) => {
        return context.get(beanName);
    }

    static getWordbookService = () => {
        const wordbook = Context.get("wordbook");
        if (wordbook) {
            return wordbook;
        }
    }
}

/***/ }),

/***/ "./src/core/Logger.js":
/*!****************************!*\
  !*** ./src/core/Logger.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Logger: () => (/* binding */ Logger)
/* harmony export */ });
class Logger {
    log = (massage) => {
        window.console.log("Reckue language app: " + massage);
    }

    /**
     * Считывает всю информацию о ноде и её родителе, пишет её в консоль.
     * Рекомендуется для использования в методе pushLastNode, после запонения листа.
     *
     * @param node - Вся нужная информация для дебага содержится в этой ноде.
     */
    #debugNode = (node) => {
        window.console.log(node.textContent);
        window.console.log(node.toString());
        window.console.log(node.parentNode.toString());
        window.console.log(node.parentNode.nodeName);
        window.console.log(node.parentNode.role);
    }
}

/***/ }),

/***/ "./src/core/api/ApiService.js":
/*!************************************!*\
  !*** ./src/core/api/ApiService.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiService: () => (/* binding */ ApiService)
/* harmony export */ });
/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Logger */ "./src/core/Logger.js");


class ApiService {
    #baseUrl = 'https://api.reckue.com/api/1';
    #tempToken = null;
    #logger = new _Logger__WEBPACK_IMPORTED_MODULE_0__.Logger();

    constructor() {
        this.#loadTempToken();
    }

    /**
     * Загружает временный токен из localStorage
     */
    #loadTempToken = () => {
        this.#tempToken = localStorage.getItem('reckue_temp_token');
    }

    /**
     * Сохраняет временный токен в localStorage
     */
    #saveTempToken = (token) => {
        this.#tempToken = token;
        localStorage.setItem('reckue_temp_token', token);
    }

    /**
     * Выполняет HTTP запрос с авторизацией
     */
    #request = async (endpoint, options = {}) => {
        const url = `${this.#baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.#tempToken) {
            headers['Authorization'] = `Bearer ${this.#tempToken}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            this.#logger.log(`API request failed: ${error.message}`);
            throw error;
        }
    }

    /**
     * Авторизация через temp-in
     */
    tempAuth = async () => {
        try {
            const response = await this.#request('/auth/tempin', {
                method: 'POST',
                body: JSON.stringify({})
            });
            
            if (response.token) {
                this.#saveTempToken(response.token);
                this.#logger.log('Temporary authentication successful');
                return true;
            }
            return false;
        } catch (error) {
            this.#logger.log('Temporary authentication failed');
            return false;
        }
    }

    /**
     * Получение информации о текущем пользователе
     */
    getCurrentUser = async () => {
        try {
            return await this.#request('/auth/whoami');
        } catch (error) {
            this.#logger.log('Failed to get current user');
            return null;
        }
    }

    /**
     * Получение всех словарей пользователя
     */
    getWordbooks = async () => {
        try {
            return await this.#request('/wordbooks');
        } catch (error) {
            this.#logger.log('Failed to get wordbooks');
            return [];
        }
    }

    /**
     * Получение основного словаря
     */
    getMainWordbook = async () => {
        try {
            return await this.#request('/wordbooks/main');
        } catch (error) {
            this.#logger.log('Failed to get main wordbook');
            return null;
        }
    }

    /**
     * Получение слов из словаря с пагинацией
     */
    getWords = async (wordbookId, page = 0, size = 50, filter = '') => {
        try {
            const body = {
                page: page,
                size: size
            };

            if (filter) {
                body.filter = filter;
            }

            return await this.#request(`/wordbook/words/${wordbookId}`, {
                method: 'POST',
                body: JSON.stringify(body)
            });
        } catch (error) {
            this.#logger.log('Failed to get words');
            return { content: [], totalElements: 0 };
        }
    }

    /**
     * Добавление слова в словарь
     */
    addWord = async (wordbookId, word, level = 1) => {
        try {
            return await this.#request('/wordbook/words', {
                method: 'POST',
                body: JSON.stringify({
                    wordbookId: wordbookId,
                    word: word,
                    level: level
                })
            });
        } catch (error) {
            this.#logger.log('Failed to add word');
            return null;
        }
    }

    /**
     * Добавление списка слов
     */
    addWordsList = async (wordbookId, words) => {
        try {
            const wordsList = words.map(word => ({
                wordbookId: wordbookId,
                word: word.word || word,
                level: word.level || 1
            }));

            return await this.#request('/wordbook/words/list', {
                method: 'POST',
                body: JSON.stringify(wordsList)
            });
        } catch (error) {
            this.#logger.log('Failed to add words list');
            return null;
        }
    }

    /**
     * Обновление уровня слова
     */
    updateWordLevel = async (wordbookId, wordId, level) => {
        try {
            return await this.#request('/wordbook/words/levels', {
                method: 'POST',
                body: JSON.stringify({
                    wordbookId: wordbookId,
                    wordId: wordId,
                    level: level
                })
            });
        } catch (error) {
            this.#logger.log('Failed to update word level');
            return null;
        }
    }

    /**
     * Удаление слова
     */
    deleteWord = async (wordbookId, wordId) => {
        try {
            return await this.#request('/wordbook/words', {
                method: 'DELETE',
                body: JSON.stringify({
                    wordbookId: wordbookId,
                    wordId: wordId
                })
            });
        } catch (error) {
            this.#logger.log('Failed to delete word');
            return null;
        }
    }

    /**
     * Создание нового словаря
     */
    createWordbook = async (language) => {
        try {
            return await this.#request('/wordbooks', {
                method: 'POST',
                body: JSON.stringify({
                    language: language
                })
            });
        } catch (error) {
            this.#logger.log('Failed to create wordbook');
            return null;
        }
    }

    /**
     * Получение словарей по языку
     */
    getWordbooksByLanguage = async (language) => {
        try {
            return await this.#request(`/wordbooks/language/${language}`);
        } catch (error) {
            this.#logger.log('Failed to get wordbooks by language');
            return [];
        }
    }

    /**
     * Проверка авторизации и автоматическая авторизация при необходимости
     */
    ensureAuth = async () => {
        if (!this.#tempToken) {
            return await this.tempAuth();
        }
        
        // Проверяем, что токен еще действителен
        try {
            await this.getCurrentUser();
            return true;
        } catch (error) {
            // Токен истек, получаем новый
            return await this.tempAuth();
        }
    }
}

/***/ }),

/***/ "./src/core/enum.js":
/*!**************************!*\
  !*** ./src/core/enum.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   enumForEach: () => (/* binding */ enumForEach)
/* harmony export */ });
/**
 * Обёртка над классической записью чтобы не писать каждый раз Object.entries(...).forEach((...) => {...})
 * Вытаскивает entry из массива value, где 0 элемент это ключь енама, а 1 значение это объект - содержимое
 * После передаёт entry в callback функцию, которая и будет являться обработчиком цыкла forEach.
 *
 * @param Enum - enum который нужно распарсить
 * @param callback - функция обрабатывающая входящие в enum объекты.
 */
const enumForEach = (Enum, callback) => {
    Object.entries(Enum).forEach((value) => {
        const entry = value[1];
        callback(entry);
    });
}

/***/ }),

/***/ "./src/core/enum/Levels.js":
/*!*********************************!*\
  !*** ./src/core/enum/Levels.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Levels: () => (/* binding */ Levels)
/* harmony export */ });
const Levels = Object.freeze({
    NATIVE:   { name: "native", hex: "#2e8801", number: 4},
    ADVANCED:  { name: "advanced", hex: "#72d400" , number: 3 },
    INTERMEDIATE: { name: "intermediate", hex: "#ef9f00", number: 2 },
    ELEMENTARY: { name: "elementary", hex: "#ab0000", number: 1 },
    BEGINNER: { name: "beginner", hex: "#ff2a00", number: 0 }
});

/***/ }),

/***/ "./src/core/words/ApiWordbookService.js":
/*!**********************************************!*\
  !*** ./src/core/words/ApiWordbookService.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiWordbookService: () => (/* binding */ ApiWordbookService)
/* harmony export */ });
/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Logger */ "./src/core/Logger.js");
/* harmony import */ var _api_ApiService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/ApiService */ "./src/core/api/ApiService.js");
/* harmony import */ var _Wordbook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Wordbook */ "./src/core/words/Wordbook.js");




class ApiWordbookService {

    #apiService;
    #logger;
    #wordbook;
    #currentWordbookId;
    #executeAfter;

    executeAfter = (after) => {
        this.#executeAfter = after;
    }

    constructor() {
        this.#apiService = new _api_ApiService__WEBPACK_IMPORTED_MODULE_1__.ApiService();
        this.#logger = new _Logger__WEBPACK_IMPORTED_MODULE_0__.Logger();
        this.#wordbook = new _Wordbook__WEBPACK_IMPORTED_MODULE_2__.Wordbook();
    }

    /**
     * Инициализация сервиса с авторизацией
     */
    initialize = async () => {
        try {
            const isAuth = await this.#apiService.ensureAuth();
            if (!isAuth) {
                this.#logger.log('Failed to authenticate with API');
                return false;
            }

            // Получаем основной словарь
            const mainWordbook = await this.#apiService.getMainWordbook();
            if (mainWordbook) {
                this.#currentWordbookId = mainWordbook.id;
                this.#logger.log(`Using main wordbook: ${this.#currentWordbookId}`);
            } else {
                // Если основного словаря нет, создаем его
                const newWordbook = await this.#apiService.createWordbook('ENGLISH');
                if (newWordbook) {
                    this.#currentWordbookId = newWordbook.id;
                    this.#logger.log(`Created new wordbook: ${this.#currentWordbookId}`);
                }
            }

            return true;
        } catch (error) {
            this.#logger.log('Failed to initialize API wordbook service');
            return false;
        }
    }

    /**
     * Загружает слова из API
     */
    loadWords = async () => {
        if (!this.#currentWordbookId) {
            this.#logger.log('No wordbook ID available');
            if (this.#executeAfter) {
                this.#executeAfter();
            }
            return;
        }

        try {
            let page = 0;
            const allWords = [];
            
            while (true) {
                const response = await this.#apiService.getWords(this.#currentWordbookId, page, 50);
                
                if (!response.content || response.content.length === 0) {
                    break;
                }

                // Преобразуем формат слов для совместимости с Wordbook
                const words = response.content.map(word => ({
                    word: word.word,
                    level: word.level || 1
                }));

                allWords.push(...words);
                
                if (response.content.length < 50) {
                    break;
                }
                
                page++;
            }

            this.set(allWords);
            this.#logger.log(`Loaded ${allWords.length} words from API`);
            
            if (this.#executeAfter) {
                this.#executeAfter();
            }
        } catch (error) {
            this.#logger.log('Failed to load words from API');
            if (this.#executeAfter) {
                this.#executeAfter();
            }
        }
    }

    /**
     * Устанавливает слова в wordbook
     */
    set = (words) => {
        this.#wordbook.set(words);
    }

    /**
     * Добавляет слово в API и локальный wordbook
     */
    addWord = async (word, level = 1) => {
        if (!this.#currentWordbookId) {
            this.#logger.log('No wordbook ID available for adding word');
            return false;
        }

        try {
            const result = await this.#apiService.addWord(this.#currentWordbookId, word, level);
            if (result) {
                // Добавляем в локальный wordbook
                this.#wordbook.set([{word, level}]);
                this.#logger.log(`Added word to API: ${word}`);
                return true;
            }
            return false;
        } catch (error) {
            this.#logger.log(`Failed to add word to API: ${word}`);
            return false;
        }
    }

    /**
     * Добавляет список слов в API
     */
    addWordsList = async (words) => {
        if (!this.#currentWordbookId) {
            this.#logger.log('No wordbook ID available for adding words list');
            return false;
        }

        try {
            const result = await this.#apiService.addWordsList(this.#currentWordbookId, words);
            if (result) {
                // Добавляем в локальный wordbook
                this.#wordbook.set(words);
                this.#logger.log(`Added ${words.length} words to API`);
                return true;
            }
            return false;
        } catch (error) {
            this.#logger.log('Failed to add words list to API');
            return false;
        }
    }

    /**
     * Удаляет слово из API и локального wordbook
     */
    remove = async (word) => {
        if (!this.#currentWordbookId) {
            this.#logger.log('No wordbook ID available for removing word');
            return false;
        }

        try {
            // Находим wordId для удаления
            const words = await this.#apiService.getWords(this.#currentWordbookId, 0, 1000, word);
            const wordToDelete = words.content.find(w => w.word === word);
            
            if (wordToDelete) {
                const result = await this.#apiService.deleteWord(this.#currentWordbookId, wordToDelete.id);
                if (result) {
                    this.#wordbook.remove(word);
                    this.#logger.log(`Removed word from API: ${word}`);
                    return true;
                }
            }
            return false;
        } catch (error) {
            this.#logger.log(`Failed to remove word from API: ${word}`);
            return false;
        }
    }

    /**
     * Обновляет уровень слова в API
     */
    updateWordLevel = async (word, level) => {
        if (!this.#currentWordbookId) {
            this.#logger.log('No wordbook ID available for updating word level');
            return false;
        }

        try {
            // Находим wordId для обновления
            const words = await this.#apiService.getWords(this.#currentWordbookId, 0, 1000, word);
            const wordToUpdate = words.content.find(w => w.word === word);
            
            if (wordToUpdate) {
                const result = await this.#apiService.updateWordLevel(this.#currentWordbookId, wordToUpdate.id, level);
                if (result) {
                    // Обновляем в локальном wordbook
                    this.#wordbook.remove(word);
                    this.#wordbook.set([{word, level}]);
                    this.#logger.log(`Updated word level in API: ${word} -> ${level}`);
                    return true;
                }
            }
            return false;
        } catch (error) {
            this.#logger.log(`Failed to update word level in API: ${word}`);
            return false;
        }
    }

    /**
     * Получает wordbook
     */
    getWordbook = () => {
        return this.#wordbook;
    }

    /**
     * Получает отфильтрованный wordbook
     */
    getFilteredWordbook = (filter) => {
        const filtered = [];
        this.#wordbook.get().forEach((level, word) => word && word.includes(filter) && filtered.push({word, level}));
        const wordbook = new _Wordbook__WEBPACK_IMPORTED_MODULE_2__.Wordbook();
        wordbook.set(filtered);
        return wordbook;
    }

    /**
     * Получает кэш wordbook
     */
    getWordbookCache = () => {
        return this.#wordbook.get();
    }

    /**
     * Загружает словари (совместимость со старым API)
     */
    loadWordbooks = async () => {
        await this.loadWords();
    }

    /**
     * Получает текущий ID словаря
     */
    getCurrentWordbookId = () => {
        return this.#currentWordbookId;
    }

    /**
     * Устанавливает текущий словарь
     */
    setCurrentWordbook = async (wordbookId) => {
        this.#currentWordbookId = wordbookId;
        await this.loadWords();
    }

    /**
     * Получает все словари пользователя
     */
    getUserWordbooks = async () => {
        try {
            return await this.#apiService.getWordbooks();
        } catch (error) {
            this.#logger.log('Failed to get user wordbooks');
            return [];
        }
    }
}

/***/ }),

/***/ "./src/core/words/Pages.js":
/*!*********************************!*\
  !*** ./src/core/words/Pages.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pages: () => (/* binding */ Pages)
/* harmony export */ });
class Pages {

    #wordsCount;

    #pagesCount;
    #scale;

    constructor(wordsCount, scale) {
        this.#wordsCount = wordsCount;
        this.#scale = scale;
    }

    getCount = () => {
        return this.#pagesCount;
    }

    calcPagesCount = () => {
        this.#pagesCount = Math.ceil(this.#wordsCount / this.#scale);
        return this.#pagesCount;
    }

    isIndexOnPage = (page, index) => index >= this.#getPageStart(page) && index < this.#getPageEnd(page);

    #getPageStart = (page) => page * this.#scale;

    #getPageEnd = (page) => (page + 1) * this.#scale;
}

/***/ }),

/***/ "./src/core/words/UnicodeLanguages.js":
/*!********************************************!*\
  !*** ./src/core/words/UnicodeLanguages.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnicodeLanguages: () => (/* binding */ UnicodeLanguages)
/* harmony export */ });
/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Context */ "./src/core/Context.js");


class UnicodeLanguages {

    getRegex = () => {
        return new RegExp(this.#unicode(this.#combinedLanguages()));
    }

    #unicode = (string) => {
        return `[^${string}]+`;
    }

    #combinedLanguages = () => {
        return this.#combine() === "" ? "\\w" : this.#combine();
    }

    #combine = () => {
        return this.#russian() + this.#russian().toUpperCase() +
            this.#english() + this.#english().toUpperCase() +
            this.#korean() + this.#china();
    }

    #russian = () => {
        return _Context__WEBPACK_IMPORTED_MODULE_0__.Context.get("settings").russian ? "йцукенгшщзхъфывапролджэячсмитьбю" : "";
    }

    #english = () => {
        return _Context__WEBPACK_IMPORTED_MODULE_0__.Context.get("settings").english ? "yqwertuiopasdfghjklzxcvbnm" : "";
    }

    #korean = () => {
        return _Context__WEBPACK_IMPORTED_MODULE_0__.Context.get("settings").korean ? "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅓㅗㅜㅡㅣㅑㅕㅛㅠㄲㄸㅃㅆㅉㄳㄵ" +
            "ㄶㄺㄻㄼㄽㄾㄿㅀㅄㅐㅒㅔㅖㅘㅙㅚㅝㅞㅟㅢ" : "";
    }

    #china = () => {
        return _Context__WEBPACK_IMPORTED_MODULE_0__.Context.get("settings").china ? "一丁丂七丄丅丆万丈三上下丌不与丏丐丑丒专且丕世丗丘丙业丛东丝丞丟" +
            "丠両丢丣两严並丧丨丩个丫丬中丮丯丰丱串丳临丵丶丷丸丹为主丼丽举丿乀乁乂乃乄久乆乇么义乊之乌乍乎乏乐乑乒乓乔乕" +
            "乪乫乬乭乮乯买乱乲乳乴乵乶乷乸乹乺乻乼乽乾乿亀亁亂亃亄亅了亇予争亊事二亍于亏亐云互亓五井亖亗亘亙亚些亜亝亞亟" +
            "亠亡亢亣交亥亦产亨亩亪享京亭亮亯亰亱亲亳亴亵亶亷亸亹人亻亼亽亾亿什仁仂仃仄仅仆仇仈仉今介仌仍从仏仐仑仒仓仔仕" +
            "他仗付仙仚仛仜仝仞仟仠仡仢代令以仦仧仨仩仪仫们仭仮仯仰仱仲仳仴仵件价仸仹仺任仼份仾仿伀企伂伃伄伅伆伇伈伉伊伋" +
            "伌伍伎伏伐休伒伓伔伕伖众优伙会伛伜伝伞伟传伡伢伣伤伥伦伧伨伩伪伫伬伭伮伯估伱伲伳伴伵伶伷伸伹伺伻似伽伾伿佀佁" +
            "佂佃佄佅但佇佈佉佊佋佌位低住佐佑佒体佔何佖佗佘余佚佛作佝佞佟你佡佢佣佤佥佦佧佨佩佪佫佬佭佮佯佰佱佲佳佴併佶佷" +
            "佸佹佺佻佼佽佾使侀侁侂侃侄侅來侇侈侉侊例侌侍侎侏侐侑侒侓侔侕侖侗侘侙侚供侜依侞侟侠価侢侣侤侥侦侧侨侩侪侫侬侭" +
            "侮侯侰侱侲侳侴侵侶侷侸侹侺侻侼侽侾便俀俁係促俄俅俆俇俈俉俊俋俌俍俎俏俐俑俒俓俔俕俖俗俘俙俚俛俜保俞俟俠信俢俣" +
            "俤俥俦俧俨俩俪俫俬俭修俯俰俱俲俳俴俵俶俷俸俹俺俻俼俽俾俿倀倁倂倃倄倅倆倇倈倉倊個倌倍倎倏倐們倒倓倔倕倖倗倘候" +
            "倚倛倜倝倞借倠倡倢倣値倥倦倧倨倩倪倫倬倭倮倯倰倱倲倳倴倵倶倷倸倹债倻值倽倾倿偀偁偂偃偄偅偆假偈偉偊偋偌偍偎偏" +
            "偐偑偒偓偔偕偖偗偘偙做偛停偝偞偟偠偡偢偣偤健偦偧偨偩偪偫偬偭偮偯偰偱偲偳側偵偶偷偸偹偺偻偼偽偾偿傀傁傂傃傄傅" +
            "傆傇傈傉傊傋傌傍傎傏傐傑傒傓傔傕傖傗傘備傚傛傜傝傞傟傠傡傢傣傤傥傦傧储傩傪傫催傭傮傯傰傱傲傳傴債傶傷傸傹傺傻" +
            "傼傽傾傿僀僁僂僃僄僅僆僇僈僉僊僋僌働僎像僐僑僒僓僔僕僖僗僘僙僚僛僜僝僞僟僠僡僢僣僤僥僦僧僨僩僪僫僬僭僮僯僰僱" +
            "僲僳僴僵僶僷僸價僺僻僼僽僾僿儀儁儂儃億儅儆儇儈儉儊儋儌儍儎儏儐儑儒儓儔儕儖儗儘儙儚儛儜儝儞償儠儡儢儣儤儥儦儧" +
            "儨儩優儫儬儭儮儯儰儱儲儳儴儵儶儷儸儹儺儻儼儽儾儿兀允兂元兄充兆兇先光兊克兌免兎兏児兑兒兓兔兕兖兗兘兙党兛兜兝" +
            "兞兟兠兡兢兣兤入兦內全兩兪八公六兮兯兰共兲关兴兵其具典兹兺养兼兽兾兿冀冁冂冃冄内円冇冈冉冊冋册再冎冏冐冑冒冓" +
            "冔冕冖冗冘写冚军农冝冞冟冠冡冢冣冤冥冦冧冨冩冪冫冬冭冮冯冰冱冲决冴况冶冷冸冹冺冻冼冽冾冿净凁凂凃凄凅准凇凈凉" +
            "凊凋凌凍凎减凐凑凒凓凔凕凖凗凘凙凚凛凜凝凞凟几凡凢凣凤凥処凧凨凩凪凫凬凭凮凯凰凱凲凳凴凵凶凷凸凹出击凼函凾凿" +
            "刀刁刂刃刄刅分切刈刉刊刋刌刍刎刏乖乗乘乙乚乛乜九乞也习乡乢乣乤乥书乧乨乩" : "";
    }
}

/***/ }),

/***/ "./src/core/words/Word.js":
/*!********************************!*\
  !*** ./src/core/words/Word.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Word: () => (/* binding */ Word)
/* harmony export */ });
/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Context */ "./src/core/Context.js");
/* harmony import */ var _UnicodeLanguages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UnicodeLanguages */ "./src/core/words/UnicodeLanguages.js");



class Word {

    #unicode;
    #original;
    #clear;

    constructor(word) {
        this.#unicode = new _UnicodeLanguages__WEBPACK_IMPORTED_MODULE_1__.UnicodeLanguages();
        this.#original = word;
        this.#setupClear();
    }

    get = () => {
        return this.#original;
    }

    getClear = () => {
        return this.#clear;
    }

    #setupClear = () => {
        this.#clear = this.#original.toString().toLowerCase().replace(this.#unicode.getRegex(), "");
        if (!this.#found(this.#clear)) {
            this.#checkEnding();
            // this.#checkPrefix();
        }
    }

    #checkEnding = () => {
        let ending = null;
        this.#clear.endsWith('s') && (ending = "s");
        this.#clear.endsWith('ed') && (ending = "ed");
        this.#clear.endsWith('ing') && (ending = "ing");
        (ending !== null) && this.#trimEnding(ending);
    }

    #checkPrefix = () => {
        this.#clear.startsWith('un') && this.#trimPrefix('un');
    }

    #trimEnding = (ending) => {
        this.#clear = this.#clear.substr(0,this.#clear.length - ending.length);
        this.#enrichEnding(this.#clear);
    }

    #trimPrefix = (prefix) => {
        //TODO:: Косячный метод, пока что убрал его из алгоритма.
        this.#clear = this.#clear.substr(prefix.length - 1);
    }

    #enrichEnding = (shorted) => {
        if (!this.#found(shorted)) {
            this.#found(shorted + 's') && (this.#clear = shorted + 's');
            this.#found(shorted + 'e') && (this.#clear = shorted + 'e');
        }
    }

    #found = (word) => _Context__WEBPACK_IMPORTED_MODULE_0__.Context.getWordbookService().getWordbookCache().get(word);
}

/***/ }),

/***/ "./src/core/words/Wordbook.js":
/*!************************************!*\
  !*** ./src/core/words/Wordbook.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Wordbook: () => (/* binding */ Wordbook)
/* harmony export */ });
/* harmony import */ var _Pages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pages */ "./src/core/words/Pages.js");


class Wordbook {

    #pages;
    #cache;

    constructor() {
        this.#cache = new Map();
        this.#pages = new _Pages__WEBPACK_IMPORTED_MODULE_0__.Pages(0, 0);
    }

    remove = (word) => {
        this.#cache.delete(word);
        this.#pages = new _Pages__WEBPACK_IMPORTED_MODULE_0__.Pages(this.#cache.size, 50);
        this.#pages.calcPagesCount();
    }

    set = (list) => {
        list.forEach((bundle) => {
            this.#cache.set(bundle.word, bundle.level);
        });
        this.#pages = new _Pages__WEBPACK_IMPORTED_MODULE_0__.Pages(this.#cache.size, 50);
        this.#pages.calcPagesCount();
        return this;
    }

    get = () => {
        return this.#cache;
    }

    getPages = () => {
        return this.#pages;
    }

    getPage = (page) => {
        let index = 0;
        const result = new Map();
        this.#cache.forEach((level, word) => {
            this.#pages.isIndexOnPage(page, index) && result.set(word, level);
            index++;
        });
        return result;
    }

    toObject = () => {
        const wordbooks = {};
        this.#toPieces().forEach((wordbook, index) => {
            wordbooks[this.getName(index)] = wordbook;
        });
        return wordbooks;
    }

    getName = (number) => {
        return "wordbook" + number;
    }

    #toList = () => {
        const list = [];
        this.#cache.forEach((level, word) => {
            list.push({word: word, level: level}) ;
        });
        return list;
    }

    #toPieces = () => {
        const pieces = [[]];
        this.#toList().forEach((bundle) => this.#putInPiece(pieces, bundle));
        return pieces;
    }

    #putInPiece = (pieces, bundle) => {
        const counter = pieces.length - 1;
        if (pieces[counter].length < 100) {
            pieces[counter].push(bundle);
        } else  {
            pieces.push([]);
            this.#putInPiece(pieces, bundle);
        }
    }
}

/***/ }),

/***/ "./src/page/block/popup/view/LevelView.js":
/*!************************************************!*\
  !*** ./src/page/block/popup/view/LevelView.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LevelView: () => (/* binding */ LevelView)
/* harmony export */ });
/* harmony import */ var _AbstractContainerView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractContainerView */ "./src/page/block/popup/view/AbstractContainerView.ts");
/* harmony import */ var _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/enum/Levels */ "./src/core/enum/Levels.js");
/* harmony import */ var _core_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/enum */ "./src/core/enum.js");
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../core/Context */ "./src/core/Context.js");
/* harmony import */ var _render_WordRenderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../render/WordRenderer */ "./src/page/render/WordRenderer.js");






class LevelView extends _AbstractContainerView__WEBPACK_IMPORTED_MODULE_0__.AbstractContainerView {

    #wordbookService;
    #wordRenderer;
    #word;

    constructor(parent, word) {
        super(parent);
        this.#wordbookService = _core_Context__WEBPACK_IMPORTED_MODULE_3__.Context.getWordbookService();
        this.#word = word;
        this.#wordRenderer = new _render_WordRenderer__WEBPACK_IMPORTED_MODULE_4__.WordRenderer();
    }

    updateLevel = () => {
        const level = this.#wordbookService.getWordbookCache().get(this.#word);
        this.#renderLevelDisplay(_core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__.Levels[level.toUpperCase()].number);
    }

    setWord = (word) => {
        this.#word = word;
    }

    /**
     * Далее создаём некст (Большее на 1) и пробуем менять уровень.
     *
     * @param current - текущее число.
     */
    #increaseLevel = (current) => {
        const next = current + 1;
        this.#changeLevel(next);
    }

    /**
     * Делаем проверку что не 0. Чем немного упрощаем сложность алгоритма.
     * (При current = 0, мы не заходим в цикл для провеки уровней)
     *
     * Далее создаём некст (Меньшее на 1) и меняем уровень.
     *
     * Потенциально можно не заходить в matchConcurrence, но нужно точно убедиться что этим мы не сломем логику.
     * Потенциально это мало что даст. Преждевременна оптимизация корень всех зол.
     *
     * @param current - текущее число.
     */
    #decreaseLevel = (current) => {
        if (current > 0) {
            const next = current - 1;
            //TODO:: Потенциально стоит поменять (не заходить в matchConcurrence).
            this.#changeLevel(next);
        }
    }

    /**
     * Делаем проверку, что уровень можно менять.
     *
     * Если можно, то вызываем функцию которая перерендерит дисплей по templates шаблону.
     * Также выгрузим render функцию из контекста. (Эта функция заменит цвет слов на странице в соотвествии с их новым уровнем).
     * И под конец выгрузим изменения в storage и cache. После чего они сохранятся и после перезагрузки страницы.
     *
     * @param next - Число обозначающее уровень после изменений
     */
    #changeLevel = (next) => {
        this.#matchConcurrence(next, (next, level) => {
            this.#renderLevelDisplay(next)
            this.#wordRenderer.renderAll(this.#word, level.name);
            this.#wordbookService.set([{word: this.#word, level: level.name}]);
        });
    }

    /**
     * Если находим соответствие в массиве уровней, тогда меняем везде current на next.
     *
     * current - текущее число обозначающее уровень
     * @param next - Число обозначающее уровень после изменений
     * @param doChange - Функция которая заменит уровень
     */
    #matchConcurrence = (next, doChange) => {
        ;(0,_core_enum__WEBPACK_IMPORTED_MODULE_2__.enumForEach)(_core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__.Levels, (level) => (level.number === next) && doChange(next, level));
    }

    /**
     * Заполняем display из templates шаблона.
     * Полностью заменяем старые элементы на новые.
     * Также отвязываем старую ссылку дисплея в родительском классе.
     * После возвращаем EventListener's на кнопки + и - (Уровни).
     *
     * Метод вызывается в самом начале и при каждом изменении уровня.
     *
     * @param number - текущее число обозначающее уровень
     */
    #renderLevelDisplay = (number) => {
        const pug = __webpack_require__(/*! pug-loader!../templates/level-display.pug */ "./node_modules/pug-loader/index.js!./src/page/block/popup/templates/level-display.pug");
        const display = this.getHTMLMapper().toElement(pug(this.#buildOptions(number)));
        this.#replaceReferences(display);
        this.#setupControllers(number);
    }

    #replaceReferences = (ref) => {
        this.getRef().replaceWith(ref);
        this.setRef(ref);
    }

    /**
     * Добавляем click событие на новые кнопки + и - (Уровень)
     * Для корректной работы нужен заполненный display
     */
    #setupControllers = (current) => {
        const controllers = this.getRef().getElementsByClassName("wb-level-controller");
        controllers[0].addEventListener("click", () => this.#increaseLevel(current));
        controllers[1].addEventListener("click", () => this.#decreaseLevel(current));
    }

    /**
     * Заполняем
     * @param number
     * @returns {{number, width: string}}
     */
    #buildOptions = (number) => {
        return {
            number: number,
            width: _core_Context__WEBPACK_IMPORTED_MODULE_3__.Context.get("POPUP_WIDTH") + "px"
        }
    }
}

/***/ }),

/***/ "./src/page/block/popup/view/WordView.js":
/*!***********************************************!*\
  !*** ./src/page/block/popup/view/WordView.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WordView: () => (/* binding */ WordView)
/* harmony export */ });
/* harmony import */ var _AbstractContainerView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractContainerView */ "./src/page/block/popup/view/AbstractContainerView.ts");
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/Context */ "./src/core/Context.js");



class WordView extends _AbstractContainerView__WEBPACK_IMPORTED_MODULE_0__.AbstractContainerView {

    #templateFunction;
    #parent;

    constructor(parent) {
        super(parent);
        this.#templateFunction = __webpack_require__(/*! pug-loader!../templates/word-display.pug */ "./node_modules/pug-loader/index.js!./src/page/block/popup/templates/word-display.pug");
        this.#parent = parent;
        this.#parent.prepend(this.getRef());
    }
    /**
     * Берем собранный Href > делаем через pug ссылку со словом
     * > оборачиваем через HTMLMapper в див
     * Заменяем old контейнер на новый ref
     */
    updateLink = (word, netGraph) => {
        //const href = this.#buildHref(word);
        const html = this.#templateFunction({word, netGraph});
        const ref = this.getHTMLMapper().toElement(html);
        const old = this.getRef();
        this.setRef(ref);
        this.#parent.replaceChild(this.getRef(), old);
    }

    /*
    *Делаем ссылку на слово в гугл-переводчик
    */
    #buildHref = (word) => {
        const language = _core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.get("language");
        const url = `${_core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.get("TRANSLATE_URL")}&sl=${language.sl}&tl=${language.tl}&text=${word}`;
        this.#printPageContent(url);
        return url;
    }

    /*
    * window.open(url, name, params) - метод возвращает ссылку на объект window нового окна.
    * Name - имя, params - настройки окна (не обязательные)
    */
    #printPageContent = (url) => {
        window.console.log(chrome.tabs);
        const opened = window.open(url, "_blank");
        opened.close();
    }
}

/***/ }),

/***/ "./src/page/parser/Parser.js":
/*!***********************************!*\
  !*** ./src/page/parser/Parser.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Parser: () => (/* binding */ Parser)
/* harmony export */ });
/* harmony import */ var _page_PageParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page/PageParser */ "./src/page/parser/page/PageParser.js");
/* harmony import */ var _text_TextBlocksParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text/TextBlocksParser */ "./src/page/parser/text/TextBlocksParser.js");
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Context */ "./src/core/Context.js");




class Parser {

    #page;
    #textBlocks;

    constructor() {
        this.#page = new _page_PageParser__WEBPACK_IMPORTED_MODULE_0__.PageParser();
        this.#textBlocks = new _text_TextBlocksParser__WEBPACK_IMPORTED_MODULE_1__.TextBlocksParser();
    }

    textBlocksParsing = (textBlocks) => {
        return this.#textBlocks.parse(textBlocks);
    }

    parsePage = () => {
        this.#page.parse();
    }

    /**
     * 
     */
    putInQueue = (node) => {
        this.#page.putInQueue(node);
    }
}

/***/ }),

/***/ "./src/page/parser/page/PageParser.js":
/*!********************************************!*\
  !*** ./src/page/parser/page/PageParser.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageParser: () => (/* binding */ PageParser)
/* harmony export */ });
/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Logger */ "./src/core/Logger.js");
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/Context */ "./src/core/Context.js");
/* harmony import */ var _render_PageChangeListener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../render/PageChangeListener */ "./src/page/render/PageChangeListener.js");




class PageParser {

    #logger;
    #listener;
    #pageQueue;
    #textsQueue;

    constructor() {
        this.#logger = new _core_Logger__WEBPACK_IMPORTED_MODULE_0__.Logger();
        this.#listener = new _render_PageChangeListener__WEBPACK_IMPORTED_MODULE_2__.PageChangeListener();
        this.#pageQueue = _core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.get("page-elements-queue");
        this.#textsQueue = _core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.get("text-elements-queue");
    }

    putInQueue = (node) => {
        this.#pageQueue.queueUp(node);
    }

    /**
     * Заходим в алгоритм парсинга с началной нодой.
     * Это может быть body или добавочные ноды из листнера.
     *
     * @returns {*[]} - textBlocks
     * Список всего текста на странице с привязкой к элементам.
     * Эти элементы это всегда конечные child ноды.
     */
    parse = () => {
        this.#logger.log("Started queued node.");
        this.#pageQueue.takeTurns(this.#parsingTextBlocks);
    }

    /**
     * Логирует процент парсинга страницы в спискок референсов, пока что работает топорно от тега BODY.
     * По какой-то причине ускоряет работу алгоритма парсинга. Магия не иначе :b
     *
     * @param node - берём отсюда название тега (определяем BODY) и общий объём работы (количество всех тэгов)
     * @param currIndex - текущий тэг, который и опредяет наш процент выполненной работы.
     * Когда currIndex === maxIndex (node.childNodes.length) - мы распарсили страницу.
     */
    #logPercent = (node, currIndex) => {
        if (node.nodeName === "BODY") {
            const maxIndex = node.childNodes.length;
            const percent = (currIndex * 100 / maxIndex).toFixed(2);
            this.#logger.log(`processed ${percent}% of the page!`);
        }
    }

    /**
     * Принимает тэг и возвращает список всех TEXT элементов
     * (Они всегда расположены на вершинах дерева html документа)
     *
     * @param node - Текущий тэг
     * @returns {[]}
     */
    #parsingTextBlocks = (node) => {
        node.childNodes.forEach((childNode, index) => {
            this.#logPercent(node, index);
            if (this.#notInteractiveElement(childNode)) {
                this.#parseCurrentNode(childNode);
            }
        });
    }

    /**
     * Этот метод и методы под ним используются для отсеивания тэгов, которые мы точно не хотим парсить.
     * Различный динамический контент, то что переводить не надо, картинки, вспомогательные файлы, скрипты и тд.
     *
     * @param node - Тэг, который подвергается проверке.
     * @returns {boolean} - ответ на вопрос: парсим мы тэг или нет?
     */
    #notInteractiveElement = (node) => {
        return !this.#isScript(node) && !this.#isSVG(node) && !this.#isImage(node)
            && !this.#isInput(node) && !this.#isLink(node) && !this.#isBr(node)
            && !this.#isStyle(node) && !this.#isForm(node) && !this.#isComment(node)
            && !this.#isUnverifiableInteractiveElement(node);
    }
    #isScript = (node) => node instanceof HTMLScriptElement;
    #isForm = (node) => node instanceof HTMLFormElement;
    #isImage = (node) => node instanceof HTMLImageElement;
    #isInput = (node) => node instanceof HTMLInputElement;
    #isLink = (node) => node instanceof HTMLLinkElement;
    #isStyle = (node) => node instanceof HTMLStyleElement;
    #isBr = (node) => node instanceof HTMLBRElement;
    #isSVG = (node) => node instanceof SVGSVGElement;
    #isComment = (node) => node instanceof Comment;
    #isUnverifiableInteractiveElement = (node) => node.nodeName === "CODE" || node.nodeName === "A";

    /**
     * Если текущий элемент не в конце дерева, идём парсить дальше,
     * иначе пробуем добавить его в массив всех TEXT элементов
     *
     * @param node - текущий элемент
     */
    #parseCurrentNode = (node) => {
        if (node.hasChildNodes()) {
            this.#listener.listen(node);
            this.#parsingTextBlocks(node);
        } else {
            this.#textsQueue.queueUp(node);
        }
    }
}

/***/ }),

/***/ "./src/page/parser/text/TextBlocksParser.js":
/*!**************************************************!*\
  !*** ./src/page/parser/text/TextBlocksParser.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextBlocksParser: () => (/* binding */ TextBlocksParser)
/* harmony export */ });
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Context */ "./src/core/Context.js");
/* harmony import */ var _core_words_Word__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/words/Word */ "./src/core/words/Word.js");
/* harmony import */ var _queue_Queue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../queue/Queue */ "./src/page/queue/Queue.js");




class TextBlocksParser {

    #textsQueue;
    #renderQueue;
    #wordbook;

    constructor() {
        this.#wordbook = _core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.getWordbookService().getWordbookCache();
        this.#textsQueue = _core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.get("text-elements-queue");
        this.#renderQueue = _core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.get("render-queue");
    }

    parse = () => {
        this.#textsQueue.takeTurns((ref) => {
            const originals = this.#parseWords(ref)
            this.#collectWords(ref, originals);
        });
    }

    #parseWords = (ref) => {
        const text = ref.textContent;
        const wordsList = text.split(' ');
        return this.#restoreSpacesAndSymbols(wordsList);
    }

    /**
     * Метод который добавляет пробелы в список, чтобы они не терялись после разделения методом split
     * Также проверяет слова на наличие тире, в случае наличия - делит слова на два и добавляет дэш.
     * На случай если слово сливается с запятой или точкой также проверяет и эти случаи. Аналогично с тире.
     *
     * @param wordsList
     * @returns {[]}
     */
    #restoreSpacesAndSymbols = (wordsList) => {
        const wordsListWithSpaces = [];
        wordsList.forEach((word, index) => {
            if (index !== 0) {
                wordsListWithSpaces.push("");
            }
            this.#restoreSymbols(wordsListWithSpaces, word, "-") ||
            this.#restoreSymbols(wordsListWithSpaces, word, ".") ||
            this.#restoreSymbols(wordsListWithSpaces, word, "...") ||
            this.#restoreSymbols(wordsListWithSpaces, word, ",") ||
            this.#restoreEndings(wordsListWithSpaces, word);
        })
        return wordsListWithSpaces;
    }

    #restoreEndings = (words, word) => {
        if (word.endsWith("n't") && !word.includes("can't")) {
            this.#restoreSpecificEnding(words, word, "n't", "not");
        } else if (word.endsWith("'ll")) {
            this.#restoreSpecificEnding(words, word, "'ll", "will");
        } else {
            words.push(word);
        }
    }

    #restoreSpecificEnding = (words, word, ending, restored) => {
        const clear = this.#checkByEnding(word, ending);
        words.push(clear, "", restored);
    }

    #checkByEnding = (word, ending) => {
        const removedPastEndingWord = this.#removeEnding(word, ending);
        return this.#findMatches(removedPastEndingWord);
    }

    #removeEnding = (word, ending) => word.substr(0,word.length - ending.length);

    #findMatches = (word) => {
        if (this.#found(word)) return word;
        if (this.#found(word + 'e')) return word + 'e';
        return word;
    }

    #found = (word) => this.#wordbook.get(word);

    /**
     *  Непосредственно проверка наличия символа, разделение слова на
     *  два и добавление их вместе с символом в общий массив слов.
     *
     * @param words - общий массив слов
     * @param word - слово, которое проверяем на наличие символа.
     * @param symbol - символ, который проверяем
     *
     * @returns {boolean} - если сделали restore - вернём true, в дальнейшем проверяем это условие.
     * Если ни один из символов не будет найден, то в итоге просто добавим word в общий массив слов.
     */
    #restoreSymbols = (words, word, symbol) => {
        const splinted = word.split(symbol);
        if (splinted.length === 2) {
            const first = splinted[0];
            const second = splinted[1];
            words.push(first, symbol, second);
            return true;
        }
        return false;
    }

    /**
     * Создаём связку слов и чистых слов без всяких точек, запятых, пробелов и тд.
     * Это нужно чтобы упростить сложность алгоритма построения страницы в дальнейшем.
     *
     * Складываем связку вместе с ссылкой на изначальный элемент.
     *
     * @param ref - ссылка на элемент, из которого построен массив слов.
     * @param originals - список изначальных слов (В том виде в котором они на странице).
     * @returns {[]} - список связок (слов и чистых слов)
     */
    #collectWords = (ref, originals) => {
        const words = [];
        originals.forEach((original) => words.push(new _core_words_Word__WEBPACK_IMPORTED_MODULE_1__.Word(original)));
        this.#renderQueue.queueUp({ref, words});
    }
}

/***/ }),

/***/ "./src/page/queue/Queue.js":
/*!*********************************!*\
  !*** ./src/page/queue/Queue.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Queue: () => (/* binding */ Queue)
/* harmony export */ });
class Queue {

    #inProgress;
    #elements;

    constructor() {
        this.#inProgress = false;
        this.#elements = new Set();
    }

    /**
     * Добавляет элемент страницы в коллекцию для дальнейшей работы с ним
     */
    queueUp = (element) => {
        this.#elements.add(element); 
    }

    /**
     * Ставим статус запуска работы функции true.
     * Выполняем с каждым элементом коллекции некоторые действия.
     * После чего очищаем коллекцию для оптимизации.
     * После чего меняем статус работы функции на false, дабы обозначить завершение работы функции.
     */
    takeTurns = (func) => {
        this.#inProgress = true;
        this.#elements.forEach((element) => func(element));
        this.#elements.clear();
        this.#inProgress = false;
    }

    /**
     * Проверка, пустая ли коллекция элементов
     */
    isEmpty = () => {
        return this.#elements.size === 0;
    }

    /**
     * Проверка, какой статус выполнения
     */
    isActive = () => {
        return this.#inProgress;
    }
}

/***/ }),

/***/ "./src/page/queue/QueueProcessor.js":
/*!******************************************!*\
  !*** ./src/page/queue/QueueProcessor.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueueProcessor: () => (/* binding */ QueueProcessor)
/* harmony export */ });
/* harmony import */ var _render_DOMBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render/DOMBuilder */ "./src/page/render/DOMBuilder.js");
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Context */ "./src/core/Context.js");
/* harmony import */ var _parser_Parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../parser/Parser */ "./src/page/parser/Parser.js");
/* harmony import */ var _Queue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Queue */ "./src/page/queue/Queue.js");
/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/Logger */ "./src/core/Logger.js");






class QueueProcessor {

    #builder;
    #parser;
    #logger;

    constructor() {
        _core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.add("render-queue", new _Queue__WEBPACK_IMPORTED_MODULE_3__.Queue());
        _core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.add("page-elements-queue", new _Queue__WEBPACK_IMPORTED_MODULE_3__.Queue());
        _core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.add("text-elements-queue", new _Queue__WEBPACK_IMPORTED_MODULE_3__.Queue());
        this.#logger = new _core_Logger__WEBPACK_IMPORTED_MODULE_4__.Logger();
        this.#parser = new _parser_Parser__WEBPACK_IMPORTED_MODULE_2__.Parser();
        this.#builder =  new _render_DOMBuilder__WEBPACK_IMPORTED_MODULE_0__.DOMBuilder();
    }

    runInfinityParsing = () => {
        this.#startPageParsing();
        this.#startTextsParsing();
    }

    /**
     * Находим body, ставим в очередь на парсинг страницу. Если выполняются условия:
     * 1) isParsingQueueReady - проверка готовности очереди на парсинг
     * и
     * 2) isParsingPageQueueReady - проверка готовности и не пустой страницы
     * Парсим страницу
     */
    #startPageParsing = () => {
        let body = window.document.querySelector('body');
        this.#parser.putInQueue(body);
        setInterval(() => {
            if (this.#isParsingQueueReady() && this.#isParsingPageQueueReady()) {
                this.#parser.parsePage();
            }
        }, 100);
    }

    /**
     * Через интервал 100 парсим текст страницы, если:
     * 1) isParsingQueueReady - проверка готовности очереди на парсинг
     * и
     * 2) isParsingTextsQueueReady - проверка готовности текста и коллекции text-элементов
     */
    #startTextsParsing = () => {
        setInterval(() => {
            if (this.#isParsingQueueReady() && this.#isParsingTextsQueueReady()) {
                this.#parser.textBlocksParsing();
            }
        }, 100);
    }

    runInfinityRender = () => {
        setInterval(() => {
            if (this.#isRenderQueueReady()) {
                this.#builder.rebuildPage();
            }
        }, 100);
    }

    #isRenderQueueReady = () => {
        const queue = _core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.get("render-queue");
        return !queue.isActive() && !queue.isEmpty();
    }

    #isParsingQueueReady = () => {
        const render = _core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.get("render-queue");
        return !render.isActive();
    }

    #isParsingPageQueueReady = () => {
        const page = _core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.get("page-elements-queue");
        return !page.isActive() && !page.isEmpty();
    }

    #isParsingTextsQueueReady = () => {
        const texts = _core_Context__WEBPACK_IMPORTED_MODULE_1__.Context.get("text-elements-queue");
        return !texts.isActive() && !texts.isEmpty();
    }
}

/***/ }),

/***/ "./src/page/render/DOMBuilder.js":
/*!***************************************!*\
  !*** ./src/page/render/DOMBuilder.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOMBuilder: () => (/* binding */ DOMBuilder)
/* harmony export */ });
/* harmony import */ var _core_Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Logger */ "./src/core/Logger.js");
/* harmony import */ var _block_popup_controllers_PopupController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block/popup/controllers/PopupController */ "./src/page/block/popup/controllers/PopupController.ts");
/* harmony import */ var _PageWord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PageWord */ "./src/page/render/PageWord.js");
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/Context */ "./src/core/Context.js");





class DOMBuilder {

    #logger = new _core_Logger__WEBPACK_IMPORTED_MODULE_0__.Logger();

    constructor() {
        _core_Context__WEBPACK_IMPORTED_MODULE_3__.Context.add("menu", new _block_popup_controllers_PopupController__WEBPACK_IMPORTED_MODULE_1__.PopupController());
        _core_Context__WEBPACK_IMPORTED_MODULE_3__.Context.add("notSavedWords", new Set());
        _core_Context__WEBPACK_IMPORTED_MODULE_3__.Context.add("refs", new Map());
    }

    rebuildPage = () => {
        this.#logAspect((bundle) => this.#appendText(bundle.ref, bundle.words));
    }

    #logAspect = (logic) => {
        this.#logger.log("Rebuilding page...");
        const queue = _core_Context__WEBPACK_IMPORTED_MODULE_3__.Context.get("render-queue");
        queue.takeTurns(logic);
        this.#logger.log("Rebuilding page complete!");
        this.#logger.log(`Found not saved words - ${_core_Context__WEBPACK_IMPORTED_MODULE_3__.Context.get("notSavedWords").size}`);
    }

    #appendText = (textRef, list) => {
        if (textRef.parentNode.nodeName !== "A") {
            list.forEach((word) => {
                const wordRef = this.#createRef(word);
                if (wordRef.textContent !== "") {
                    this.#saveRef(word.getClear(), wordRef);
                    this.#doAppend(wordRef, textRef);
                }
            });
            textRef.textContent = "";
        }
    }

    #saveRef = (clear, wordRef) => {
        const map = _core_Context__WEBPACK_IMPORTED_MODULE_3__.Context.get("refs");
        let refs = map.get(clear);
        !refs && (refs = []);
        refs.push(wordRef);
        map.set(clear, refs);
    }

    #createRef = (word) => {
        if (word.get() !== "") {
            const pageWord = new _PageWord__WEBPACK_IMPORTED_MODULE_2__.PageWord(word);
            return pageWord.create();
        }
        return this.#createTextNode(" ");
    }

    #doAppend = (updated, previous) => {
        previous.after(updated, previous);
    }

    #createTextNode = (word) => {
        return document.createTextNode(word);
    }
}

/***/ }),

/***/ "./src/page/render/PageChangeListener.js":
/*!***********************************************!*\
  !*** ./src/page/render/PageChangeListener.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageChangeListener: () => (/* binding */ PageChangeListener)
/* harmony export */ });
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Context */ "./src/core/Context.js");


class PageChangeListener {

    #observer;

    constructor() {
        this.#observer = new MutationObserver((mutations) => this.#parseCandidate(mutations));
    }

    listen = (node) => {
        const config = { childList: true };
        this.#observer.observe(node, config);
    }

    #parseCandidate = (mutations) => {
        if (!_core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.get("render-queue").isActive()) {
            mutations.forEach((mutation) => this.#putInQueue(mutation));
        }
    }

    #putInQueue = (mutation) => {
        mutation.addedNodes.forEach(node => {
            const pageQueue = _core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.get("page-elements-queue");
            pageQueue.queueUp(node);
        })
    }
}

/***/ }),

/***/ "./src/page/render/PageWord.js":
/*!*************************************!*\
  !*** ./src/page/render/PageWord.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageWord: () => (/* binding */ PageWord)
/* harmony export */ });
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Context */ "./src/core/Context.js");
/* harmony import */ var _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/enum/Levels */ "./src/core/enum/Levels.js");
/* harmony import */ var _WordRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WordRenderer */ "./src/page/render/WordRenderer.js");




class PageWord {

    #wordbookService;
    #word;
    #renderer;

    constructor(word) {
        this.#word = word;
        this.#renderer = new _WordRenderer__WEBPACK_IMPORTED_MODULE_2__.WordRenderer();
        this.#wordbookService = _core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.getWordbookService();
    }

    create = () => {
        if (this.#word.get() === "") return this.#blank();
        const ref = this.#renderer.createRef(this.#word.get().trim());
        const level = this.#wordbookService.getWordbookCache().get(this.#word.getClear());
        if (this.#isSaved(level)) return this.#saved(ref, level);
        return this.#notSaved(ref);
    }

    #blank = () => {
        return document.createTextNode(this.#word.get());
    }

    #saved = (ref, level) => {
        this.#renderer.onHover(ref, this.#word.getClear());
        this.#renderer.resolveColor(ref, level)
        return ref;
    }

    #notSaved = (ref) => {
        this.#pullInContext();
        ref.addEventListener("click", this.#saveWord, {once: true});
        return ref;
    }

    #saveWord = () => {
        const level = _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__.Levels.BEGINNER.name;
        const word = this.#word.getClear();
        this.#wordbookService.set([{word, level}]);
        this.#renderer.renderAll(word, level);
        this.#renderer.onHoverAll(this.#word.getClear());
    }

    #pullInContext = () => (this.#word.getClear() !== " ") && _core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.get("notSavedWords").add(this.#word.getClear());

    #isSaved = (level) => level !== undefined;
}

/***/ }),

/***/ "./src/page/render/WordRenderer.js":
/*!*****************************************!*\
  !*** ./src/page/render/WordRenderer.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WordRenderer: () => (/* binding */ WordRenderer)
/* harmony export */ });
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Context */ "./src/core/Context.js");
/* harmony import */ var _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/enum/Levels */ "./src/core/enum/Levels.js");



class WordRenderer {

    onHover(ref, word) {
        const popup = _core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.get("menu");
        ref.addEventListener("click", (event) => this.#showPopup(event, popup, word));
        ref.addEventListener("mouseout", popup.displayOff);
    }

    #showPopup = (event, popup, word) => {
        popup.displayOn();
        popup.setPosition(event.clientX, event.clientY);
        popup.setContent(word);
    }

    onHoverAll = (clear) => {
        const refs = _core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.get("refs");
        const words = refs.get(clear);
        words.forEach((word) => {
            this.onHover(word, clear);
        });
    }

    renderAll = (clear, level) => {
        const refs = _core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.get("refs");
        const words = refs.get(clear);
        words.forEach((word) => {
            this.resolveColor(word, level)
        });
    }

    createRef = (word) => {
        const ref = document.createElement('a');
        word = word.replace(/\r?\n/g, "");
        ref.innerText = word;
        ref.style.cursor = "pointer";
        return ref;
    }

    resolveColor = (ref, level) => {
        switch (level) {
            case _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__.Levels.NATIVE.name:
                ref.style.color = _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__.Levels.NATIVE.hex;
                break;
            case _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__.Levels.ADVANCED.name:
                ref.style.color = _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__.Levels.ADVANCED.hex;
                break;
            case _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__.Levels.INTERMEDIATE.name:
                ref.style.color = _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__.Levels.INTERMEDIATE.hex;
                break;
            case _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__.Levels.ELEMENTARY.name:
                ref.style.color = _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__.Levels.ELEMENTARY.hex;
                break;
            case _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__.Levels.BEGINNER.name:
                ref.style.color = _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__.Levels.BEGINNER.hex;
                break;
        }
    }
}

/***/ }),

/***/ "./src/page/render/styles/Styles.js":
/*!******************************************!*\
  !*** ./src/page/render/styles/Styles.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Styles: () => (/* binding */ Styles)
/* harmony export */ });
/* harmony import */ var _core_HTMLMapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/HTMLMapper */ "./src/core/HTMLMapper.ts");


class Styles {

    #HTMLMapper;

    constructor() {
        this.#HTMLMapper = new _core_HTMLMapper__WEBPACK_IMPORTED_MODULE_0__.HTMLMapper();
    }

    append = () => {
        const html = __webpack_require__(/*! apply-loader!pug-loader!./style.pug */ "./node_modules/apply-loader/index.js!./node_modules/pug-loader/index.js!./src/page/render/styles/style.pug");
        const styles = this.#HTMLMapper.toElement(html);
        window.document.querySelector("head").appendChild(styles);
    }
}

/***/ }),

/***/ "?8f63":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/api-page.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_ApiApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/ApiApp */ "./src/core/ApiApp.js");
/* harmony import */ var _page_ApiPageService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page/ApiPageService */ "./src/page/ApiPageService.ts");


const service = new _page_ApiPageService__WEBPACK_IMPORTED_MODULE_1__.ApiPageService();
const app = new _core_ApiApp__WEBPACK_IMPORTED_MODULE_0__.ApiApp(service);
app.start();

})();

/******/ })()
;
//# sourceMappingURL=page.js.map
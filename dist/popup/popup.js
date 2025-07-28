/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/apply-loader/index.js!./node_modules/pug-loader/index.js!./src/popup/scroll/templates/scroll.pug":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/apply-loader/index.js!./node_modules/pug-loader/index.js!./src/popup/scroll/templates/scroll.pug ***!
  \***********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var req = __webpack_require__(/*! !!./node_modules/pug-loader/index.js!./src/popup/scroll/templates/scroll.pug */ "./node_modules/pug-loader/index.js!./src/popup/scroll/templates/scroll.pug");
module.exports = (req['default'] || req).apply(req, [])

/***/ }),

/***/ "./node_modules/pug-loader/index.js!./src/popup/navbar/nav-button.pug":
/*!****************************************************************************!*\
  !*** ./node_modules/pug-loader/index.js!./src/popup/navbar/nav-button.pug ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(/*! !../../../node_modules/pug-runtime/index.js */ "./node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (buttonInfo) {
      pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([buttonInfo.className], [true]), false, true)+pug.attr("disabled", buttonInfo.disabled, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = buttonInfo.title) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
    }.call(this, "buttonInfo" in locals_for_with ?
        locals_for_with.buttonInfo :
        typeof buttonInfo !== 'undefined' ? buttonInfo : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),

/***/ "./node_modules/pug-loader/index.js!./src/popup/scroll/templates/scroll.pug":
/*!**********************************************************************************!*\
  !*** ./node_modules/pug-loader/index.js!./src/popup/scroll/templates/scroll.pug ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(/*! !../../../../node_modules/pug-runtime/index.js */ "./node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"wordbook\"\u003E\u003Cdiv class=\"header\"\u003E\u003Cdiv class=\"filter\"\u003E\u003Cinput id=\"filter-terms\" placeholder=\"Search or filter words...\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"words\" id=\"words\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"pages\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ "./node_modules/pug-loader/index.js!./src/popup/scroll/templates/word.pug":
/*!********************************************************************************!*\
  !*** ./node_modules/pug-loader/index.js!./src/popup/scroll/templates/word.pug ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(/*! !../../../../node_modules/pug-runtime/index.js */ "./node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (clear, level, options) {
      pug_html = pug_html + "\u003Cdiv class=\"word\"\u003E\u003Cinput" + (" class=\"clear\""+pug.attr("value", clear, true, true)) + "\u003E\u003Cselect class=\"level\"\u003E";
// iterate options
;(function(){
  var $$obj = options;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var option = $$obj[pug_index0];
pug_html = pug_html + "\u003Coption" + (pug.attr("value", option, true, true)+pug.attr("selected", (level === option), true, true)) + "\u003E" + (pug.escape(null == (pug_interp = option) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var option = $$obj[pug_index0];
pug_html = pug_html + "\u003Coption" + (pug.attr("value", option, true, true)+pug.attr("selected", (level === option), true, true)) + "\u003E" + (pug.escape(null == (pug_interp = option) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E";
    }.call(this, "clear" in locals_for_with ?
        locals_for_with.clear :
        typeof clear !== 'undefined' ? clear : undefined, "level" in locals_for_with ?
        locals_for_with.level :
        typeof level !== 'undefined' ? level : undefined, "options" in locals_for_with ?
        locals_for_with.options :
        typeof options !== 'undefined' ? options : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),

/***/ "./node_modules/pug-loader/index.js!./src/popup/settings/template/settings.pug":
/*!*************************************************************************************!*\
  !*** ./node_modules/pug-loader/index.js!./src/popup/settings/template/settings.pug ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(/*! !../../../../node_modules/pug-runtime/index.js */ "./node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"settings\"\u003E\u003Cdiv class=\"block\"\u003E\u003Cdiv class=\"title\"\u003ELanguages\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ "./node_modules/pug-loader/index.js!./src/popup/settings/template/slider.pug":
/*!***********************************************************************************!*\
  !*** ./node_modules/pug-loader/index.js!./src/popup/settings/template/slider.pug ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(/*! !../../../../node_modules/pug-runtime/index.js */ "./node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (language) {
      pug_html = pug_html + "\u003Cdiv" + (" class=\"enable\""+pug.attr("id", language.id, true, true)) + "\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = language.title) ? "" : pug_interp)) + ":\u003C\u002Fspan\u003E\u003Cdiv class=\"lever\"\u003E\u003Cdiv class=\"slider\"\u003E|||\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }.call(this, "language" in locals_for_with ?
        locals_for_with.language :
        typeof language !== 'undefined' ? language : undefined));
    ;;return pug_html;};
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

/***/ "./src/core/builder/ContentView.js":
/*!*****************************************!*\
  !*** ./src/core/builder/ContentView.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentView: () => (/* binding */ ContentView)
/* harmony export */ });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/core/builder/AbstractView.ts");


class ContentView extends _AbstractView__WEBPACK_IMPORTED_MODULE_0__.AbstractView {

    #content;

    constructor() {
        super();
        this.#content = window.document.getElementById("content");
    }

    getContent = () => {
        return this.#content;
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

/***/ "./src/core/enum/NavbarButtons.js":
/*!****************************************!*\
  !*** ./src/core/enum/NavbarButtons.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavbarButtons: () => (/* binding */ NavbarButtons)
/* harmony export */ });
const NavbarButtons = Object.freeze({
    WORDBOOK: {title: "Wordbook", className: "nav-button", disabled: true},
    SETTINGS: {title: "Settings", className: "nav-button"},
    REFRESH:  { title: "↺ page", className: "refresh-btn" }

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

/***/ "./src/popup/ApiPopupService.js":
/*!**************************************!*\
  !*** ./src/popup/ApiPopupService.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiPopupService: () => (/* binding */ ApiPopupService)
/* harmony export */ });
/* harmony import */ var _settings_SettingsService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings/SettingsService */ "./src/popup/settings/SettingsService.js");
/* harmony import */ var _navbar_NavbarBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navbar/NavbarBuilder */ "./src/popup/navbar/NavbarBuilder.js");
/* harmony import */ var _scroll_WordbookScroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scroll/WordbookScroll */ "./src/popup/scroll/WordbookScroll.js");
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/Context */ "./src/core/Context.js");
/* harmony import */ var _settings_SettingsBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings/SettingsBuilder */ "./src/popup/settings/SettingsBuilder.js");
/* harmony import */ var _navbar_NavButtons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./navbar/NavButtons */ "./src/popup/navbar/NavButtons.js");
/* harmony import */ var _scroll_ScrollBuilder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scroll/ScrollBuilder */ "./src/popup/scroll/ScrollBuilder.js");
/* harmony import */ var _info_InfoBarBuilder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./info/InfoBarBuilder */ "./src/popup/info/InfoBarBuilder.js");
/* harmony import */ var _core_ApiStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/ApiStore */ "./src/core/ApiStore.js");










class ApiPopupService {

    #navbarBuilder;
    #settingsBuilder;
    #scrollBuilder;
    #infoBarBuilder;
    #apiStore;

    constructor() {
        this.#settingsBuilder = new _settings_SettingsBuilder__WEBPACK_IMPORTED_MODULE_4__.SettingsBuilder();
        this.#navbarBuilder = new _navbar_NavbarBuilder__WEBPACK_IMPORTED_MODULE_1__.NavbarBuilder();
        this.#scrollBuilder = new _scroll_ScrollBuilder__WEBPACK_IMPORTED_MODULE_6__.ScrollBuilder();
        this.#infoBarBuilder = new _info_InfoBarBuilder__WEBPACK_IMPORTED_MODULE_7__.InfoBarBuilder();
        this.#apiStore = new _core_ApiStore__WEBPACK_IMPORTED_MODULE_8__.ApiStore();
    }

    run = async () => {
        try {
            // Проверяем авторизацию в API
            const isAuth = await this.#apiStore.ensureAuth();
            _core_Context__WEBPACK_IMPORTED_MODULE_3__.Context.add("apiAvailable", isAuth);
            
            if (isAuth) {
                // Получаем информацию о пользователе
                const user = await this.#apiStore.getCurrentUser();
                _core_Context__WEBPACK_IMPORTED_MODULE_3__.Context.add("currentUser", user);
            }
        } catch (error) {
            _core_Context__WEBPACK_IMPORTED_MODULE_3__.Context.add("apiAvailable", false);
        }

        this.#buildPopupDOM();
        const settings = new _settings_SettingsService__WEBPACK_IMPORTED_MODULE_0__.SettingsService();
        settings.fillSettings();
        const scroll = new _scroll_WordbookScroll__WEBPACK_IMPORTED_MODULE_2__.WordbookScroll();
        scroll.fillScroll(0);
        this.#setupNavButtons();
    }

    #buildPopupDOM = () => {
        this.#navbarBuilder.buildButtons();
        this.#settingsBuilder.buildSettingsContentStructure();
        this.#scrollBuilder.build();
    }

    #setupNavButtons = () => {
        const navButtons = new _navbar_NavButtons__WEBPACK_IMPORTED_MODULE_5__.NavButtons();
        navButtons.onClickNavButtons();
        navButtons.checkButtonsAndSetContentVisibility();
    }
}

/***/ }),

/***/ "./src/popup/deprecated/html.js":
/*!**************************************!*\
  !*** ./src/popup/deprecated/html.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addClass: () => (/* binding */ addClass),
/* harmony export */   addListener: () => (/* binding */ addListener),
/* harmony export */   create: () => (/* binding */ create),
/* harmony export */   selectByClass: () => (/* binding */ selectByClass)
/* harmony export */ });
/**
 * Функция для создания html тэга
 *
 * @param name - название тэга
 * @returns {*} - готовый html тэг, пока не привязаный ни к чему.
 */
const create = (name) => document.createElement(name);

/**
 * Добавляет атрибут class для тэга,
 * по нему будут прописаны определённые css стили.
 *
 * @param element - тэг для которого нужно добавть класс
 * @param className - имя класса
 */
const addClass = (element, className) => {
    element.classList.add(className);
}

/**
 * Добавляет EventListener для элемента
 *
 * @param element - тэг эвенты которого будем слушать
 * @param eventType - тип требуемого эвента, на который будем реагировать
 * @param callback - функция которая будет выполнена.
 */
const addListener = (element, eventType, callback) => {
    element.addEventListener(eventType, event => {
        callback(event);
    });
}

const selectByClass = (className, index) => {
    if (index !== undefined) {
        return window.document.getElementsByClassName(className)[index];
    }
    return selectByClass(className,0);
};

/***/ }),

/***/ "./src/popup/info/InfoBarBuilder.js":
/*!******************************************!*\
  !*** ./src/popup/info/InfoBarBuilder.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InfoBarBuilder: () => (/* binding */ InfoBarBuilder)
/* harmony export */ });
/* harmony import */ var _deprecated_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../deprecated/html */ "./src/popup/deprecated/html.js");


class InfoBarBuilder {

    #element;
    #version;

    constructor() {
        const jsonData = __webpack_require__(/*! ../../../manifest.json */ "./manifest.json");
        this.#version = jsonData.version;
        this.#element = (0,_deprecated_html__WEBPACK_IMPORTED_MODULE_0__.selectByClass)('infobar');
        this.#appendVersion();
    }

    #appendVersion = () => {
        this.#element.textContent = `Version ${this.#version}`;
    }
}

/***/ }),

/***/ "./src/popup/navbar/NavButtons.js":
/*!****************************************!*\
  !*** ./src/popup/navbar/NavButtons.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavButtons: () => (/* binding */ NavButtons)
/* harmony export */ });
/* harmony import */ var _deprecated_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../deprecated/html */ "./src/popup/deprecated/html.js");
/* harmony import */ var _NavbarBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavbarBuilder */ "./src/popup/navbar/NavbarBuilder.js");
/* harmony import */ var _core_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/enum */ "./src/core/enum.js");




class NavButtons {

    #builder;
    #navbar;
    #refresh;
    #content;
    #buttons;

    constructor() {
        this.#builder = new _NavbarBuilder__WEBPACK_IMPORTED_MODULE_1__.NavbarBuilder();
        this.#navbar = (0,_deprecated_html__WEBPACK_IMPORTED_MODULE_0__.selectByClass)('navbar');
    }

    onClickNavButtons = () => {
        this.#loadButtons();
        (0,_deprecated_html__WEBPACK_IMPORTED_MODULE_0__.addListener)(this.#refresh, "click", this.#callParser);
        (0,_core_enum__WEBPACK_IMPORTED_MODULE_2__.enumForEach)(this.#buttons,button => (0,_deprecated_html__WEBPACK_IMPORTED_MODULE_0__.addListener)(button, "click", this.#onClick))
    }

    #loadButtons = () => {
        this.#refresh = (0,_deprecated_html__WEBPACK_IMPORTED_MODULE_0__.selectByClass)('refresh-btn');
        this.#buttons = this.#navbar.getElementsByClassName('nav-button');
        this.#content = (0,_deprecated_html__WEBPACK_IMPORTED_MODULE_0__.selectByClass)('content');
    }

    #onClick = (event) => {
        ;(0,_core_enum__WEBPACK_IMPORTED_MODULE_2__.enumForEach)(this.#buttons,button => button.disabled = false);
        event.target.disabled = true;
        this.checkButtonsAndSetContentVisibility();
    };

    checkButtonsAndSetContentVisibility = () => {
        (0,_core_enum__WEBPACK_IMPORTED_MODULE_2__.enumForEach)(this.#buttons,button => {
            const className = button.innerText.toLowerCase();
            this.#builder.setContentVisibility(className, button.disabled);
        });
    };

    #callParser = () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.executeScript(tabs[0].id, {file: './page/page.ts'});
        });
    };
}

/***/ }),

/***/ "./src/popup/navbar/NavbarBuilder.js":
/*!*******************************************!*\
  !*** ./src/popup/navbar/NavbarBuilder.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavbarBuilder: () => (/* binding */ NavbarBuilder)
/* harmony export */ });
/* harmony import */ var _core_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/enum */ "./src/core/enum.js");
/* harmony import */ var _core_enum_NavbarButtons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/enum/NavbarButtons */ "./src/core/enum/NavbarButtons.js");
/* harmony import */ var _deprecated_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../deprecated/html */ "./src/popup/deprecated/html.js");
/* harmony import */ var _core_builder_ContentView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/builder/ContentView */ "./src/core/builder/ContentView.js");





class NavbarBuilder extends _core_builder_ContentView__WEBPACK_IMPORTED_MODULE_3__.ContentView {

    #navbar;

    constructor() {
        super();
        this.#navbar = (0,_deprecated_html__WEBPACK_IMPORTED_MODULE_2__.selectByClass)('navbar');
    }

    buildButtons = () => {
        const getHtml = __webpack_require__(/*! pug-loader!./nav-button.pug */ "./node_modules/pug-loader/index.js!./src/popup/navbar/nav-button.pug");
        (0,_core_enum__WEBPACK_IMPORTED_MODULE_0__.enumForEach)(_core_enum_NavbarButtons__WEBPACK_IMPORTED_MODULE_1__.NavbarButtons, (buttonInfo) => {
            const html = getHtml({buttonInfo});
            const button = this.getHTMLMapper().toElement(html);
            this.#navbar.appendChild(button);
        });
    }

    setContentVisibility = (className, disabled) => {
        const entry = this.getContent().getElementsByClassName(className)[0];
        entry.style.visibility = this.#getVisibility(disabled);
        entry.style.transform = this.#getTranslate(disabled);
    };

    #getVisibility = (disabled) => {
        return disabled ? 'visible' : 'hidden';
    }

    #getTranslate = (disabled) => {
        return disabled ? 'translate(0px)' : 'translate(-400px)';
    }
}

/***/ }),

/***/ "./src/popup/scroll/ChangePageButtons.js":
/*!***********************************************!*\
  !*** ./src/popup/scroll/ChangePageButtons.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChangePageButtons: () => (/* binding */ ChangePageButtons)
/* harmony export */ });
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Context */ "./src/core/Context.js");


class ChangePageButtons {

    #current
    #pagesList;
    #wordbookService;
    #fillScroll;
    #filter;

    constructor(fillScroll, filter) {
        this.#wordbookService = _core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.getWordbookService();
        this.#pagesList = window.document.getElementById("pages");
        this.#fillScroll = fillScroll;
        this.#filter = filter;
    }

    buildPageButtons = (page) => {
        this.#current = page;
        this.#clearPageButtonsElement();
        const countPages = this.#wordbookService.getFilteredWordbook(_core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.get("filter").get()).getPages().getCount();
        if (countPages < 10) {
            countPages !== 1 && this.#renderPageButtons(0, countPages);
        } else {
            const first = this.#getFirstLimits(countPages);
            const second = this.#getSecondLimits(countPages);
            this.#buildTwoRowsPageButtons(first, second);
        }
    }

    #clearPageButtonsElement = () => {
        this.#pagesList.innerHTML = "";
    }

    #buildTwoRowsPageButtons = (first, second) => {
        this.#renderPageButtons(first[0], first[1]);
        this.#divideRows();
        this.#renderPageButtons(second[0], second[1]);
    }

    #divideRows = () => {
        const separator = window.document.createTextNode("...");
        this.#pagesList.appendChild(separator);
    }

    #getFirstLimits = (countPages) => {
        if (this.#current >= 2 && this.#current <= countPages - 5) {
            if (this.#current >= countPages - 8) {
                return [countPages - 10, countPages - 5];
            }
            return [this.#current - 2, this.#current + 3];
        }
        return [0, 5];
    }

    #getSecondLimits = (countPages) => [countPages - 5, countPages];

    #renderPageButtons = (start, end) => {
        for (let number = start; number < end; number++) {
            const page = window.document.createElement("a");
            page.target = "_blank";
            page.textContent = `${number}`;
            page.style.cursor = "pointer";
            page.addEventListener("click", () => this.#fillScroll(number));
            this.#pagesList.appendChild(page);
        }
    }
}

/***/ }),

/***/ "./src/popup/scroll/Filter.js":
/*!************************************!*\
  !*** ./src/popup/scroll/Filter.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Filter: () => (/* binding */ Filter)
/* harmony export */ });
class Filter {

    #filter;
    #buildPageButtons;
    #fillScroll;

    constructor(buildPageButtons, fillScroll) {
        this.#filter = "";
        this.#buildPageButtons = buildPageButtons;
        this.#fillScroll = fillScroll;
        this.#setupInput();
    }

    #setupInput = () => {
        const filterInput = window.document.getElementById("filter-terms");
        filterInput.addEventListener("change", (e) => {
            this.#filter = e.target.value;
            this.#buildPageButtons(0);
            this.#fillScroll(0);
        });
    }

    get = () => {
        return this.#filter;
    }
}

/***/ }),

/***/ "./src/popup/scroll/ScrollBuilder.js":
/*!*******************************************!*\
  !*** ./src/popup/scroll/ScrollBuilder.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScrollBuilder: () => (/* binding */ ScrollBuilder)
/* harmony export */ });
/* harmony import */ var _core_builder_ContentView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/builder/ContentView */ "./src/core/builder/ContentView.js");


class ScrollBuilder extends _core_builder_ContentView__WEBPACK_IMPORTED_MODULE_0__.ContentView {

    build = () => {
        const html = __webpack_require__(/*! apply-loader!pug-loader!./templates/scroll.pug */ "./node_modules/apply-loader/index.js!./node_modules/pug-loader/index.js!./src/popup/scroll/templates/scroll.pug");
        const scroll = this.getHTMLMapper().toElement(html);
        this.getContent().appendChild(scroll);
    }
}

/***/ }),

/***/ "./src/popup/scroll/WordbookScroll.js":
/*!********************************************!*\
  !*** ./src/popup/scroll/WordbookScroll.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WordbookScroll: () => (/* binding */ WordbookScroll)
/* harmony export */ });
/* harmony import */ var _core_Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Context */ "./src/core/Context.js");
/* harmony import */ var _WordsAppender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WordsAppender */ "./src/popup/scroll/WordsAppender.js");
/* harmony import */ var _ChangePageButtons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChangePageButtons */ "./src/popup/scroll/ChangePageButtons.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Filter */ "./src/popup/scroll/Filter.js");





class WordbookScroll {

    #wordbookService;
    #wordsAppender;
    #pageButtons;
    #filter;

    constructor() {
        this.#wordbookService = _core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.getWordbookService();
        this.#wordsAppender = new _WordsAppender__WEBPACK_IMPORTED_MODULE_1__.WordsAppender();
        this.#pageButtons = new _ChangePageButtons__WEBPACK_IMPORTED_MODULE_2__.ChangePageButtons(this.fillScroll);
        this.#filter = new _Filter__WEBPACK_IMPORTED_MODULE_3__.Filter(this.#pageButtons.buildPageButtons, this.fillScroll);
        _core_Context__WEBPACK_IMPORTED_MODULE_0__.Context.add("filter", this.#filter);
    }

    fillScroll = (page) => {
        this.#pageButtons.buildPageButtons(page);
        const loaded = this.#loadWords(page);
        this.#fillWords(loaded);
    }

    #loadWords = (page) => {
        return this.#wordbookService.getFilteredWordbook(this.#filter.get()).getPage(page);
    }

    #fillWords = (loaded) => {
        this.#wordsAppender.clearScroll();
        loaded.forEach((level, word) => {
            const ref = this.#wordsAppender.addWord(word, level);
            this.#whenChangeOption(ref, word);
            this.#whenEditWord(ref, word);
        });
    }

    #whenEditWord = (ref, word) => {
        const input = ref.getElementsByTagName("input")[0];
        input.addEventListener("change", (event) => this.#changeWord(event, word));
    }

    #whenChangeOption = (ref, word) => {
        const select = ref.getElementsByClassName("level")[0];
        select.addEventListener("change", (event) => this.#changeLevel(event, word));
    }

    #changeWord = (event, word) => {
        const level = this.#wordbookService.getWordbookCache().get(word);
        const edited = event.target.value;
        this.#wordbookService.remove(word);
        this.#updateWord(edited, level);
        this.fillScroll(0);
    }

    #changeLevel = (event, word) => {
        const level = event.target.value;
        this.#updateWord(word, level);
    }

    #updateWord = (word, level) => {
        this.#wordbookService.set([{word, level}]);
    }
}

/***/ }),

/***/ "./src/popup/scroll/WordsAppender.js":
/*!*******************************************!*\
  !*** ./src/popup/scroll/WordsAppender.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WordsAppender: () => (/* binding */ WordsAppender)
/* harmony export */ });
/* harmony import */ var _core_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/enum */ "./src/core/enum.js");
/* harmony import */ var _core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/enum/Levels */ "./src/core/enum/Levels.js");
/* harmony import */ var _core_builder_AbstractView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/builder/AbstractView */ "./src/core/builder/AbstractView.ts");




class WordsAppender extends _core_builder_AbstractView__WEBPACK_IMPORTED_MODULE_2__.AbstractView {

    #templateFunction;
    #options;

    constructor() {
        super();
        this.#templateFunction = __webpack_require__(/*! pug-loader!./templates/word.pug */ "./node_modules/pug-loader/index.js!./src/popup/scroll/templates/word.pug");
        this.#options = [];
        (0,_core_enum__WEBPACK_IMPORTED_MODULE_0__.enumForEach)(_core_enum_Levels__WEBPACK_IMPORTED_MODULE_1__.Levels, (level) => {
            this.#options.push(level.name)
        });
    }

    addWord = (clear, level) => {
        const words = this.#getWordsElement();
        const ref = this.#buildWord(clear, level);
        words.appendChild(ref);
        return ref;
    }

    #buildWord = (clear, level) => {
        const options = this.#options;
        const html = this.#templateFunction({clear, level, options})
        return this.getHTMLMapper().toElement(html);
    };

    clearScroll = () => {
        this.#getWordsElement().innerHTML = "";
    }

    #getWordsElement = () => window.document.getElementById('words');
}

/***/ }),

/***/ "./src/popup/settings/SettingsBuilder.js":
/*!***********************************************!*\
  !*** ./src/popup/settings/SettingsBuilder.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsBuilder: () => (/* binding */ SettingsBuilder)
/* harmony export */ });
/* harmony import */ var _core_builder_ContentView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/builder/ContentView */ "./src/core/builder/ContentView.js");



class SettingsBuilder extends _core_builder_ContentView__WEBPACK_IMPORTED_MODULE_0__.ContentView {

    #levers;

    buildSettingsContentStructure = () => {
        const templateLoader = __webpack_require__(/*! pug-loader!./template/settings.pug */ "./node_modules/pug-loader/index.js!./src/popup/settings/template/settings.pug");
        const html = templateLoader();
        const settings = this.getHTMLMapper().toElement(html);
        this.getContent().appendChild(settings);
        const block = this.getContent().getElementsByClassName("block")[0];
        this.appendSlider(block, {id: "russian", title: "Russian"})
        this.appendSlider(block, {id: "korean", title: "Korean"})
        this.appendSlider(block, {id: "english", title: "English"})
        this.appendSlider(block, {id: "china", title: "China"})

    }

    appendSlider = (parent, language) => {
        const templateLoader = __webpack_require__(/*! pug-loader!./template/slider.pug */ "./node_modules/pug-loader/index.js!./src/popup/settings/template/slider.pug");
        const html = templateLoader({language});
        const slider = this.getHTMLMapper().toElement(html);
        parent.appendChild(slider);
    }
    loadLevers = () => {
        this.#levers = window.document.getElementsByClassName('lever');
    }

    setupAppEnableLever = (changeEnable) => {
        this.#setupLever(this.#levers[0], changeEnable, "enable");
    }

    renderAppEnableLever = (enable) => {
        this.renderLever(this.#levers[0], enable);
    };

    setupRussianEnableLever = (changeEnable) => {
        this.#setupLever(this.#levers[1], changeEnable, "russian");
    }

    renderRussianEnableLever = (enable) => {
        this.renderLever(this.#levers[1], enable);
    };

    setupKoreanEnableLever = (changeEnable) => {
        this.#setupLever(this.#levers[2], changeEnable, "korean");
    }

    renderKoreanEnableLever = (enable) => {
        this.renderLever(this.#levers[2], enable);
    };

    setupEnglishEnableLever = (changeEnable) => {
        this.#setupLever(this.#levers[3], changeEnable, "english");
    }

    renderEnglishEnableLever = (enable) => {
        this.renderLever(this.#levers[3], enable);
    };

    setupChinaEnableLever = (changeEnable) => {
        this.#setupLever(this.#levers[4], changeEnable, "china");
    }

    renderChinaEnableLever = (enable) => {
        this.renderLever(this.#levers[4], enable);
    };

    #setupLever = (lever, changeEnable, name) => {
        lever.addEventListener('click', () => changeEnable(lever, name));
    }

    renderLever = (lever, enable) => {
        lever.style.justifyContent = enable ? 'flex-end' : 'flex-start';
        lever.style.background = enable ? '#c2d7bf' : '#ffffff';
    }

}


/***/ }),

/***/ "./src/popup/settings/SettingsService.js":
/*!***********************************************!*\
  !*** ./src/popup/settings/SettingsService.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsService: () => (/* binding */ SettingsService)
/* harmony export */ });
/* harmony import */ var _SettingsBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingsBuilder */ "./src/popup/settings/SettingsBuilder.js");


class SettingsService {

    #builder;
    #settings;

    constructor() {
        this.#builder = new _SettingsBuilder__WEBPACK_IMPORTED_MODULE_0__.SettingsBuilder();
        this.#settings = {enable: true, russian: true, english: true, china: true, korean: true}
    }

    fillSettings = () => {
        chrome.storage.local.get(['enable', 'russian', "english", "china", "korean"], (settings) => this.#setupSettings(settings));
    }

    #setupSettings = (settings) => {
        this.#settings = settings;
        this.#builder.loadLevers();
        this.#setupEnableAppLever();
        this.#setupLangLevers();
    }

    #setupEnableAppLever = () => {
        this.#builder.setupAppEnableLever(this.#changeEnable);
        this.#builder.renderAppEnableLever(this.#settings.enable);
    }

    #setupLangLevers = () => {
        //TODO:: Clean code (Remove duplicate)
        this.#builder.setupRussianEnableLever(this.#changeEnable);
        this.#builder.renderRussianEnableLever(this.#settings.russian);
        this.#builder.setupKoreanEnableLever(this.#changeEnable);
        this.#builder.renderKoreanEnableLever(this.#settings.korean);
        this.#builder.setupEnglishEnableLever(this.#changeEnable);
        this.#builder.renderEnglishEnableLever(this.#settings.english);
        this.#builder.setupChinaEnableLever(this.#changeEnable);
        this.#builder.renderChinaEnableLever(this.#settings.china);
    }

    #changeEnable = (lever, name) => {
        this.#settings[name] = !this.#settings[name];
        chrome.storage.local.set(this.#settings, () => {
            this.#builder.renderLever(lever, this.#settings[name]);
        });
    };
}

/***/ }),

/***/ "?8f63":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "./manifest.json":
/*!***********************!*\
  !*** ./manifest.json ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"Reckue Languages (API)","version":"0.6.0","description":"Interactive language learning assistant with API integration","permissions":["storage","activeTab","tabs"],"host_permissions":["https://api.reckue.com/*"],"background":{"service_worker":"background/application.js"},"action":{"default_popup":"dist/popup/popup.html","default_icon":{"16":"images/coach16.png","32":"images/coach32.png","48":"images/coach48.png","128":"images/coach128.png"}},"content_scripts":[{"matches":["http://*/*","https://*/*"],"exclude_matches":["https://translate.google.com/*"],"run_at":"document_idle","js":["dist/page/page.js"]}],"icons":{"16":"images/coach16.png","32":"images/coach32.png","48":"images/coach48.png","128":"images/coach128.png"},"manifest_version":3}');

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
/*!**************************!*\
  !*** ./src/api-popup.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_ApiApp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/ApiApp.js */ "./src/core/ApiApp.js");
/* harmony import */ var _popup_ApiPopupService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popup/ApiPopupService.js */ "./src/popup/ApiPopupService.js");


const service = new _popup_ApiPopupService_js__WEBPACK_IMPORTED_MODULE_1__.ApiPopupService();
const app = new _core_ApiApp_js__WEBPACK_IMPORTED_MODULE_0__.ApiApp(service);
app.start();

})();

/******/ })()
;
//# sourceMappingURL=popup.js.map
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/scan/scan"],{

/***/ 131:
/*!***************************************************************************************!*\
  !*** D:/v工作/项目/小程序/2020通用小程序/trunk/qp20200612/main.js?{"page":"pages%2Fscan%2Fscan"} ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _scan = _interopRequireDefault(__webpack_require__(/*! ./pages/scan/scan.vue */ 132));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_scan.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 132:
/*!********************************************************************!*\
  !*** D:/v工作/项目/小程序/2020通用小程序/trunk/qp20200612/pages/scan/scan.vue ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scan_vue_vue_type_template_id_52573064_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scan.vue?vue&type=template&id=52573064&scoped=true& */ 133);
/* harmony import */ var _scan_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scan.vue?vue&type=script&lang=js& */ 135);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _scan_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _scan_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _scan_vue_vue_type_style_index_0_id_52573064_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scan.vue?vue&type=style&index=0&id=52573064&scoped=true&lang=scss& */ 137);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _scan_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _scan_vue_vue_type_template_id_52573064_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _scan_vue_vue_type_template_id_52573064_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "52573064",
  null,
  false,
  _scan_vue_vue_type_template_id_52573064_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "v工作/项目/小程序/2020通用小程序/trunk/qp20200612/pages/scan/scan.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 133:
/*!***************************************************************************************************************!*\
  !*** D:/v工作/项目/小程序/2020通用小程序/trunk/qp20200612/pages/scan/scan.vue?vue&type=template&id=52573064&scoped=true& ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_template_id_52573064_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./scan.vue?vue&type=template&id=52573064&scoped=true& */ 134);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_template_id_52573064_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_template_id_52573064_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_template_id_52573064_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_template_id_52573064_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 134:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/v工作/项目/小程序/2020通用小程序/trunk/qp20200612/pages/scan/scan.vue?vue&type=template&id=52573064&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 135:
/*!*********************************************************************************************!*\
  !*** D:/v工作/项目/小程序/2020通用小程序/trunk/qp20200612/pages/scan/scan.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./scan.vue?vue&type=script&lang=js& */ 136);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 136:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/v工作/项目/小程序/2020通用小程序/trunk/qp20200612/pages/scan/scan.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 36));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {
      needLocation: false,
      againCLick: false,
      noLocation: false,
      imgUrl: getApp().globalData.imgUrl,
      longitude: '00',
      latitude: '00',
      qr: '',
      provinceCode: '',
      isOnLoad: false,
      showPrivacy: false };

  },
  onLoad: function onLoad(options) {
    var qr = '',
    optionsQ = decodeURIComponent(options.q),
    urlParse = [];
    if (optionsQ.indexOf('VJ1.TV/') != -1) {
      urlParse = decodeURIComponent(options.q).split('VJ1.TV/')[1].split('/');
    } else if (optionsQ.indexOf('vj1.tv/') != -1) {
      urlParse = decodeURIComponent(options.q).split('vj1.tv/')[1].split('/');
    } else if (optionsQ.indexOf('xt.vjifen.com') != -1) {//测试
      if (decodeURIComponent(options.q).indexOf('&') != -1) {
        urlParse[0] = decodeURIComponent(options.q).split('c=')[1].split('&')[0];
        urlParse[1] = decodeURIComponent(options.q).split('v=')[1];
      } else {
        urlParse = decodeURIComponent(options.q).split('xt.vjifen.com/')[1].split('/');
      }
    } else {
      qr = '';
      uni.showModal({
        title: "温馨提示",
        content: '请扫描正确的活动二维码',
        showCancel: false,
        complete: function complete(res) {
          console.log(res);
          if (res.confirm) {//返回首页
            uni.switchTab({
              url: "../index/index" });

          }
        } });

    }
    if (urlParse[0].toUpperCase() == 'AH') {//安徽
      if (urlParse[1].length == 18) {
        var strHb = urlParse[1][0] + urlParse[1][1] + urlParse[1][3];
        if (strHb == 'W8W' || strHb == 'Z46' || strHb == '8C9' || strHb == 'TXA') {//河北
          return uni.redirectTo({
            url: '../result/fail?bizcode=5' });

        }
      } else if (urlParse[1].length == 12) {
        var _strHb = urlParse[1].substr(0, 3);
        if (_strHb == 'W8W' || _strHb == 'Z46' || _strHb == '8C9' || _strHb == 'TXA') {//河北
          return uni.redirectTo({
            url: '../result/fail?bizcode=5' });

        }
      }
    }
    console.log(urlParse);
    if (urlParse.length > 0) {
      this.qr = urlParse[1];
      this.provinceCode = urlParse[0].toUpperCase(); //省区编号
      getApp().globalData.provinceCode = urlParse[0].toUpperCase(); //省区编号
      this.isOnLoad = true;
      this.$Store.commit('setProjectSign', this.provinceCode);
    }
  },
  onShow: function onShow() {var _this = this;
    if (!this.isOnLoad) {
      return false;
    }
    console.log(1, this.$Store.state.requestUrl, this.$Store.state.appid, this.$Store.state.payAppid, this.$Store.state.serverName);
    if (!this.$Store.state.serverName || !this.$Store.state.appid) {
      this.qr = '';
      this.provinceCode = ''; //省区编号
      getApp().globalData.provinceCode = ''; //省区编号
      return uni.showModal({
        title: "温馨提示",
        content: '请扫描正确的活动二维码',
        showCancel: false,
        complete: function complete(res) {
          console.log(res);
          if (res.confirm) {//返回首页
            uni.switchTab({
              url: "../index/index" });

          }
        } });

    }
    if (!getApp().globalData.vjfOpenid) {
      this.$Store.dispatch('getVjfOpenid').then(function (res) {var _res = _slicedToArray(
        res, 2),e = _res[0],r = _res[1];
        if (r) {
          getApp().globalData.vjfOpenid = r.data.vjfOpenid;
          _this.checkProvinceCode().then(function (res) {
            console.log('省区关系是否变更', res);
            if (!res) {//清除缓存中各种id
              getApp().globalData.openid = '';
              getApp().globalData.hbopenid = '';
              try {
                uni.removeStorageSync('openid');
              } catch (e) {
                // error
                console.log('removeStorageSync', e);
              }
            }
            if (!getApp().globalData.openid) {//是否有openid
              if (!_this.qr) {
                return false;
              }
              _this.$Store.dispatch('getOpenid').then(function (res) {var _res2 = _slicedToArray(
                res, 2),e = _res2[0],r = _res2[1];
                if (r) {//有openid
                  getApp().globalData.openid = r.data.openid;
                  uni.getStorage({ //查询是否查看隐私说明
                    key: 'readPrivacy' }).
                  then(function (res) {var _res3 = _slicedToArray(
                    res, 2),e = _res3[0],r = _res3[1];
                    if (!r) {
                      _this.showPrivacy = true;
                    } else {
                      _this.$Store.dispatch('getLocation').then(function (res) {var _res4 = _slicedToArray(
                        res, 2),e = _res4[0],r = _res4[1];
                        if (r) {//扫码
                          console.log(5, r);
                          _this.latitude = r.latitude;
                          _this.longitude = r.longitude;
                          getApp().globalData.latitude = r.latitude;
                          getApp().globalData.longitude = r.longitude;
                          if (_this.provinceCode == 'U') {//此处改造 华南和海南改造接口
                            _this.sweepVerify();
                          } else {
                            _this.sweep();
                          }
                        } else {
                          console.log('location fail', e);
                          if (e.errMsg == 'getLocation:fail authorize no response' ||
                          e.errMsg == 'getLocation:fail auth deny' ||
                          e.errMsg == 'getLocation:fail:auth denied') {
                            _this.needLocation = true;
                          } else {
                            _this.noLocation = true;
                          }
                        }
                      });
                    }
                  });
                } else {//重新获取
                  console.log(e);
                  uni.navigateTo({
                    url: '../tool/getOpenid/getOpenid?type=openid' });

                }
              });
            } else {
              if (!_this.qr) {
                return false;
              }
              console.log(getApp().globalData.openid);
              uni.getStorage({
                key: 'readPrivacy' }).
              then(function (res) {var _res5 = _slicedToArray(
                res, 2),e = _res5[0],r = _res5[1];
                if (!r) {
                  _this.showPrivacy = true;
                } else {
                  _this.$Store.dispatch('getLocation').then(function (res) {var _res6 = _slicedToArray(
                    res, 2),e = _res6[0],r = _res6[1];
                    if (r) {//扫码
                      console.log(r);
                      _this.latitude = r.latitude;
                      _this.longitude = r.longitude;
                      getApp().globalData.latitude = r.latitude;
                      getApp().globalData.longitude = r.longitude;
                      if (_this.provinceCode == 'U') {//此处改造 华南和海南改造接口
                        _this.sweepVerify();
                      } else {
                        _this.sweep();
                      }
                    } else {
                      console.log(e);
                      if (e.errMsg == 'getLocation:fail authorize no response' ||
                      e.errMsg == 'getLocation:fail auth deny' ||
                      e.errMsg == 'getLocation:fail:auth denied') {
                        _this.needLocation = true;
                      } else {
                        _this.noLocation = true;
                      }
                    }
                  });
                }
              });
            }
          });
        } else {
          console.log(e);
          uni.navigateTo({
            url: '../tool/getOpenid/getOpenid?type=vjfOpenid' });

        }
      });
    } else {
      this.checkProvinceCode().then(function (res) {
        console.log('省区关系是否变更', res);
        if (!res) {//清除缓存中各种id
          getApp().globalData.openid = '';
          getApp().globalData.hbopenid = '';
          try {
            uni.removeStorageSync('openid');
            uni.removeStorageSync('hbopenid');
          } catch (e) {
            // error
            console.log('removeStorageSync', e);
          }
        }
        if (!getApp().globalData.openid) {//是否有openid
          if (!_this.qr) {
            return false;
          }
          _this.$Store.dispatch('getOpenid').then(function (res) {var _res7 = _slicedToArray(
            res, 2),e = _res7[0],r = _res7[1];
            if (r) {//有openid
              getApp().globalData.openid = r.data.openid;
              uni.getStorage({ //查询是否查看隐私说明
                key: 'readPrivacy' }).
              then(function (res) {var _res8 = _slicedToArray(
                res, 2),e = _res8[0],r = _res8[1];
                if (!r) {
                  _this.showPrivacy = true;
                } else {
                  _this.$Store.dispatch('getLocation').then(function (res) {var _res9 = _slicedToArray(
                    res, 2),e = _res9[0],r = _res9[1];
                    if (r) {//扫码
                      console.log(r);
                      _this.latitude = r.latitude;
                      _this.longitude = r.longitude;
                      getApp().globalData.latitude = r.latitude;
                      getApp().globalData.longitude = r.longitude;
                      if (_this.provinceCode == 'U') {//此处改造 华南和海南改造接口
                        _this.sweepVerify();
                      } else {
                        _this.sweep();
                      }
                    } else {
                      console.log(e);
                      if (e.errMsg == 'getLocation:fail authorize no response' ||
                      e.errMsg == 'getLocation:fail auth deny' ||
                      e.errMsg == 'getLocation:fail:auth denied') {
                        _this.needLocation = true;
                      } else {
                        _this.noLocation = true;
                      }
                    }
                  });
                }
              });
            } else {//重新获取
              console.log(e);
              uni.navigateTo({
                url: '../tool/getOpenid/getOpenid?type=openid' });

            }
          });
        } else {
          if (!_this.qr) {
            return false;
          }
          console.log(getApp().globalData.openid);
          uni.getStorage({
            key: 'readPrivacy' }).
          then(function (res) {var _res10 = _slicedToArray(
            res, 2),e = _res10[0],r = _res10[1];
            if (!r) {
              _this.showPrivacy = true;
            } else {
              _this.$Store.dispatch('getLocation').then(function (res) {var _res11 = _slicedToArray(
                res, 2),e = _res11[0],r = _res11[1];
                if (r) {//扫码
                  console.log(r);
                  _this.latitude = r.latitude;
                  _this.longitude = r.longitude;
                  getApp().globalData.latitude = r.latitude;
                  getApp().globalData.longitude = r.longitude;
                  if (_this.provinceCode == 'U') {//此处改造 华南和海南改造接口
                    _this.sweepVerify();
                  } else {
                    _this.sweep();
                  }
                } else {
                  console.log(e);
                  if (e.errMsg == 'getLocation:fail authorize no response' ||
                  e.errMsg == 'getLocation:fail auth deny' ||
                  e.errMsg == 'getLocation:fail:auth denied') {
                    _this.needLocation = true;
                  } else {
                    _this.noLocation = true;
                  }
                }
              });
            }
          });
        }
      });
    }
  },
  methods: {
    readPrivacy: function readPrivacy() {var _this2 = this;
      this.showPrivacy = false;
      uni.setStorage({
        key: 'readPrivacy',
        data: true });

      this.$Store.dispatch('getLocation').then(function (res) {var _res12 = _slicedToArray(
        res, 2),e = _res12[0],r = _res12[1];
        if (r) {//扫码
          console.log(r);
          _this2.latitude = r.latitude;
          _this2.longitude = r.longitude;
          getApp().globalData.latitude = r.latitude;
          getApp().globalData.longitude = r.longitude;
          if (_this2.provinceCode == 'U') {//此处改造 华南和海南改造接口
            _this2.sweepVerify();
          } else {
            _this2.sweep();
          }
        } else {
          console.log(e);
          if (e.errMsg == 'getLocation:fail authorize no response' ||
          e.errMsg == 'getLocation:fail auth deny' ||
          e.errMsg == 'getLocation:fail:auth denied') {
            _this2.needLocation = true;
          } else {
            _this2.noLocation = true;
          }
        }
      });
    },
    toPrivacy: function toPrivacy() {
      uni.navigateTo({
        url: '../rule/privacy' });

    },
    checkProvinceCode: function checkProvinceCode() {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var xcxOpenid, provinceCode;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0: //校验是否有省区编号且是否变更
                xcxOpenid = {};if (
                getApp().globalData.xcxOpenid) {_context.next = 8;break;}_context.next = 4;return (
                  _this3.$Store.dispatch('getXcxOpenid'));case 4:xcxOpenid = _context.sent;
                getApp().globalData.xcxOpenid = xcxOpenid.openid;
                getApp().globalData.sessionKey = xcxOpenid.session_key;
                uni.setStorage({
                  key: 'xcxOpenid',
                  data: xcxOpenid });case 8:_context.next = 10;return (


                  _this3.$Store.dispatch('getProvinceCode', getApp().globalData.xcxOpenid));case 10:provinceCode = _context.sent;
                console.log(provinceCode);if (!(
                provinceCode != _this3.provinceCode && _this3.provinceCode != undefined)) {_context.next = 18;break;} //存储省区code
                uni.request({
                  url: "".concat(_this3.$Store.state.isOnline ? _this3.$Store.state.online.sgUrl : _this3.$Store.state.test.sgUrl, "/api/queryProvinceCode"),
                  method: 'GET',
                  data: {
                    xcxopenid: xcxOpenid.openid,
                    provinceCode: _this3.provinceCode },

                  complete: function complete(res) {
                    console.log('redis', res);
                  } });

                uni.setStorage({ //每次都要存一下？
                  key: 'provinceCode',
                  data: _this3.provinceCode });return _context.abrupt("return",

                false);case 18:
                //保持不变 不需要重新获取openid
                uni.setStorage({ //每次都要存一下？
                  key: 'provinceCode',
                  data: _this3.provinceCode });return _context.abrupt("return",

                true);case 20:case "end":return _context.stop();}}}, _callee);}))();


    },
    getOpenid: function getOpenid() {var _this4 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var xcxOpenid;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                  _this4.$Store.dispatch('getXcxOpenid'));case 2:xcxOpenid = _context2.sent;
                uni.setStorage({
                  key: 'xcxOpenid',
                  data: xcxOpenid });return _context2.abrupt("return",

                xcxOpenid);case 5:case "end":return _context2.stop();}}}, _callee2);}))();
    },
    openset: function openset() {
      this.needLocation = false;
      uni.openSetting();
    },
    cancel: function cancel() {//取消 直接调用扫码接口
      console.log('调接口');
      this.needLocation = false;
      if (this.provinceCode == 'U') {//此处改造 华南和海南改造接口
        this.sweepVerify();
      } else {
        this.sweep();
      }
    },
    closeTip: function closeTip() {var _this5 = this;
      uni.showModal({
        title: "温馨提示",
        content: '开启手机定位有机会获得更大的红包哦！确定不开启手机定位参与本次扫码活动吗？',
        cancelText: '先开定位',
        confirmColor: "#808080",
        confirmText: '直接参与',
        complete: function complete(res) {
          console.log(res);
          if (res.confirm) {//直接扫码
            _this5.noLocation = false;
            if (_this5.provinceCode == 'U') {//此处改造 华南和海南改造接口
              _this5.sweepVerify();
            } else {
              _this5.sweep();
            }
          } else {//返回首页
            uni.switchTab({
              url: '../index/index' });

          }
        } });

    },
    sweep: function sweep() {var _this6 = this;
      uni.showLoading({
        title: '加载中' });

      uni.request({
        url: this.$Store.state.requestUrl + '/sweep/sweepQrcode',
        method: 'POST',
        data: {
          "openid": getApp().globalData.openid,
          "vjifenOpenid": getApp().globalData.vjfOpenid,
          "paOpenid": '', //省区小程序openid
          "appletOpenid": getApp().globalData.xcxOpenid, //通用小程序openid
          "sweepstr": this.qr,
          "longitude": this.longitude, //"经度"
          "latitude": this.latitude, //"纬度"
          "headimgurl": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.avatarUrl : '',
          "nickname": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.nickName : '',
          "sex": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.gender : '', //1男
          "projectServerName": this.$Store.state.serverName } }).

      then(function (res) {
        uni.hideLoading();
        console.log(res);var _res13 = _slicedToArray(
        res, 2),e = _res13[0],r = _res13[1];
        if (r) {
          if (r.data.result.code == 0) {
            getApp().globalData.reply = r.data.reply;
            getApp().globalData.result = r.data.result;
            getApp().globalData.replyTime = r.data.replyTime;
            _this6.$Store.state.haveTel = r.data.reply.phonenum; //全局缓存手机号
            if (r.data.result.businessCode == 0 || r.data.result.businessCode == 11) {//扫码成功
              uni.redirectTo({
                url: '../result/getcash?bizcode=' + r.data.result.businessCode });

            } else if (r.data.result.businessCode == 7 || r.data.result.businessCode == 21) {//大奖 
              uni.redirectTo({
                url: '../result/prize?bizcode=' + r.data.result.businessCode });

            } else if (r.data.result.businessCode == 12 || r.data.result.businessCode == 13) {//可疑 黑名单
              uni.redirectTo({
                url: '../result/getMsg?bizcode=' + r.data.result.businessCode });

            } else if (r.data.result.businessCode == 30) {//核销
              uni.redirectTo({
                url: '../result/verification' });

            } else if (r.data.result.businessCode == 24) {//一元乐享
              uni.redirectTo({
                url: '../yylx/yylx' });

            } else {//其他异常
              uni.redirectTo({
                url: '../result/fail?bizcode=' + r.data.result.businessCode });

            }
          } else {
            uni.showModal({
              title: '扫码接口提示',
              content: '系统开了个小差',
              showCancel: false,
              complete: function complete(res) {
                if (res.confirm) {
                  uni.switchTab({
                    url: '../index/index' });

                }
              } });

          }
        } else {
          uni.showModal({
            title: '扫码接口提示',
            content: '系统繁忙',
            showCancel: false,
            complete: function complete(res) {
              if (res.confirm) {
                uni.switchTab({
                  url: '../index/index' });

              }
            } });

        }
      });
    },
    sweepVerify: function sweepVerify() {var _this7 = this; //华南海南扫码不占码接口
      uni.showLoading({
        title: '加载中' });

      uni.request({
        url: this.$Store.state.requestUrl + '/sweep/sweepVerify',
        method: 'POST',
        data: {
          "openid": getApp().globalData.openid,
          "vjifenOpenid": getApp().globalData.vjfOpenid,
          "paOpenid": '', //省区小程序openid
          "appletOpenid": getApp().globalData.xcxOpenid, //通用小程序openid
          "sweepstr": this.qr,
          "longitude": this.longitude, //"经度"
          "latitude": this.latitude, //"纬度"
          "headimgurl": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.avatarUrl : '',
          "nickname": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.nickName : '',
          "sex": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.gender : '', //1男
          "projectServerName": this.$Store.state.serverName } }).

      then(function (res) {
        uni.hideLoading();
        console.log(res);var _res14 = _slicedToArray(
        res, 2),e = _res14[0],r = _res14[1];
        if (r) {
          if (r.data.result.code == 0) {
            getApp().globalData.reply = r.data.reply;
            getApp().globalData.result = r.data.result;
            getApp().globalData.replyTime = r.data.replyTime;
            _this7.$Store.state.haveTel = r.data.reply.phonenum; //全局缓存手机号
            if (r.data.result.businessCode == 0 || r.data.result.businessCode == 11) {//扫码成功
              getApp().globalData.qr = _this7.qr;
              uni.redirectTo({
                url: '../result/getcash?bizcode=' + r.data.result.businessCode });

            } else if (r.data.result.businessCode == 7 || r.data.result.businessCode == 21) {//大奖 
              uni.redirectTo({
                url: '../result/prize?bizcode=' + r.data.result.businessCode });

            } else if (r.data.result.businessCode == 12 || r.data.result.businessCode == 13) {//可疑 黑名单
              uni.redirectTo({
                url: '../result/getMsg?bizcode=' + r.data.result.businessCode });

            } else if (r.data.result.businessCode == 30) {//核销
              uni.redirectTo({
                url: '../result/verification' });

            } else if (r.data.result.businessCode == 24) {//一元乐享
              uni.redirectTo({
                url: '../yylx/yylx' });

            } else {//其他异常
              uni.redirectTo({
                url: '../result/fail?bizcode=' + r.data.result.businessCode });

            }
          } else {
            uni.showModal({
              title: '扫码接口提示',
              content: '系统开了个小差',
              showCancel: false,
              complete: function complete(res) {
                if (res.confirm) {
                  uni.switchTab({
                    url: '../index/index' });

                }
              } });

          }
        } else {
          uni.showModal({
            title: '扫码接口提示',
            content: '系统繁忙',
            showCancel: false,
            complete: function complete(res) {
              if (res.confirm) {
                uni.switchTab({
                  url: '../index/index' });

              }
            } });

        }
      });
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 137:
/*!******************************************************************************************************************************!*\
  !*** D:/v工作/项目/小程序/2020通用小程序/trunk/qp20200612/pages/scan/scan.vue?vue&type=style&index=0&id=52573064&scoped=true&lang=scss& ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_style_index_0_id_52573064_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../办公软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./scan.vue?vue&type=style&index=0&id=52573064&scoped=true&lang=scss& */ 138);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_style_index_0_id_52573064_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_style_index_0_id_52573064_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_style_index_0_id_52573064_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_style_index_0_id_52573064_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_scan_vue_vue_type_style_index_0_id_52573064_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 138:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/v工作/项目/小程序/2020通用小程序/trunk/qp20200612/pages/scan/scan.vue?vue&type=style&index=0&id=52573064&scoped=true&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[131,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/scan/scan.js.map
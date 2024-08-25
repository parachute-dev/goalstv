"use strict";

var _client = require("react-dom/client");
var _App = _interopRequireDefault(require("./App"));
var _GlobalContextProvider = _interopRequireDefault(require("./context/GlobalContextProvider"));
var _reactRouterDom = require("react-router-dom");
var _reactGa = _interopRequireDefault(require("react-ga4"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_reactGa.default.initialize('G-XW3PRCC9GN');
var container = document.getElementById('root');
var root = (0, _client.createRoot)(container);
root.render( /*#__PURE__*/React.createElement(_reactRouterDom.MemoryRouter, null, /*#__PURE__*/React.createElement(_GlobalContextProvider.default, null, /*#__PURE__*/React.createElement(_App.default, null))));

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', function (arg) {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
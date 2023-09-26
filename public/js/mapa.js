/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n(\r\n    function() {\r\n    \r\n    const lat = -16.5230037;\r\n    const lng = -68.1415526;\r\n    const mapa = L.map('mapa').setView([lat, lng ], 15); // el numero 15 es el zoom del mapa\r\n    let marker\r\n\r\n    // utilizamos lealeft y geocoder que ya instalamos\r\n    const geocodeService=L.esri.Geocoding.geocodeService()\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n    \r\n    // creamos el pin de ubicacion\r\n    marker= new L.marker([lat,lng],{\r\n        draggable:true, // permite mover el pin \r\n        autoPan:true    // sigue el mapa\r\n    }).addTo(mapa)\r\n\r\n     /**\r\n     * movemos el pin de ubicacion \r\n     */\r\n    marker.on('moveend',e=>{\r\n        marker=e.target\r\n        const posicion =marker.getLatLng()// devuelve la posicion del PIN\r\n        console.log(posicion);\r\n        mapa.panTo(new L.LatLng(posicion.lat,posicion.lng)) // centra el mapa \r\n\r\n    // Obtener la info de las calles al soltar el PIN\r\n      geocodeService.reverse().latlng(posicion,15).run((err,res)=>{\r\n           if(err){console.log(err)} \r\n           marker.bindPopup(res.address.LongLabel)\r\n\r\n      // llenar en views/propiedades/crear.pug\r\n      document.querySelector(\".calle\").textContent=res?.address.Address ?? \"\"\r\n      document.querySelector(\"#calle\").value=res?.address?.Address ?? \"\"\r\n      document.querySelector(\"#lat\").value=res?.latlng?.lat ?? \"\"\r\n      document.querySelector(\"#lng\").value=res?.latlng?.lng ?? \"\"\r\n      })\r\n\r\n     \r\n\r\n    })\r\n}\r\n) ()  // es una funcion que se invoca a si misma, se caracteriza por el scope de sus variables solo estan para la funcion\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
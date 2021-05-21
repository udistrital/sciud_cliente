/* eslint-disable */
import { custom } from "devextreme/ui/dialog";
import retina from "retinajs";

//#region jQuery

// 202104121500: Define la velocidad por defecto de las transiciones
// https://stackoverflow.com/a/4086780
jQuery.fx.speeds._default = 500;
// console.log("jQuery.fx.speeds", jQuery.fx.speeds);

jQuery.fn.clear = function(clearHidden = false) {
	return this.each(function() {
		var els = window.jQuery(this).find("input, textarea, select");
		els.each(function(index) {
			var type = this.type,
				tag = this.tagName.toLowerCase();
			if (type === "hidden" && clearHidden !== undefined && clearHidden) this.value = "";
			else if (type === "text" || type === "password" || tag === "textarea") this.value = "";
			else if (type === "checkbox" || type === "radio") this.checked = false;
			else if (tag === "select") this.selectedIndex = 0;
		});
	});
};

jQuery.fn.disable = function() {
	return this.each(function() {
		var el = $(this);
		el.addClass("disabled");
	});
};

jQuery.fn.enable = function() {
	return this.each(function() {
		var el = $(this);
		el.removeClass("disabled");
	});
};

//#endregion

//#region Number Extensions
Number.prototype.format = function(decimals, dec_point, thousands_sep) {
	var number = this;
	number = (number + "").replace(/[^0-9+-Ee.]/g, "");
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = typeof thousands_sep === "undefined" ? "." : thousands_sep,
		dec = typeof dec_point === "undefined" ? "," : dec_point,
		s = "",
		toFixedFix = function(n, prec) {
			var k = Math.pow(10, prec);
			return "" + Math.round(n * k) / k;
		};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
	if (s[0].length > 3) s[0] = s[0].replace(/B(?=(?:d{3})+(?!d))/g, sep);
	if ((s[1] || "").length < prec) {
		s[1] = s[1] || "";
		s[1] += new Array(prec - s[1].length + 1).join("0");
	}
	return s.join(dec);
};

Number.prototype.formatSize = function() {
	var filesize = parseInt(this);
	if (filesize >= 1073741824) filesize = (filesize / 1073741824).format(2, ",", ".") + " GB";
	else if (filesize >= 1048576) filesize = (filesize / 1048576).format(2, ",", ".") + " MB";
	else if (filesize >= 1024) filesize = (filesize / 1024).format(0) + " KB";
	else filesize = filesize.format(0) + " Bytes";
	return filesize.replaceAll(",00", "");
};

//#endregion

//#region Vue

// This exports the plugin object.
export default {
	// 202009240640: Disable console
	// https://stackoverflow.com/a/1216743
	checkConsole: function() {
		// 202105201242: Desabilita la consola solo para el entorno productivo
		let cUrl = window.location.href.toLowerCase();
		if (cUrl.indexOf("siciud.") > -1) {
			if (!window.console) window.console = {};
			var methods = ["log", "debug", "warn", "info", "dir", "dirxml", "trace", "profile"];
			for (var i = 0; i < methods.length; i++) {
				window.console[methods[i]] = function() {};
			}
		}
	},

	// The install method will be called with the vue constructor as
	// the first argument, along with possible options
	install(vue, options) {
		vue.prototype.$current = null;
		vue.prototype.$sep = "---------------------------------------------------------------------------------\n";

		// 202103090317: Get deep field value
		// https://stackoverflow.com/a/6394014
		vue.prototype.$getFieldValue = function(obj, string) {
			var parts = string.split(".");
			var newObj = obj[parts[0]];
			if (parts[1]) {
				parts.splice(0, 1);
				var newString = parts.join(".");
				return vue.prototype.$getFieldValue(newObj, newString);
			}
			return newObj;
		};

		// 202009301411: Convert yyyy-mm-dd string to date
		// https://stackoverflow.com/a/7151607
		vue.prototype.$getDate = function(date) {
			let from = date.split("-");
			var f = new Date(from[0], from[1] - 1, from[2]);
			return f;
		};

		vue.prototype.$notEmpty = function(value) {
			return value !== undefined && value !== null && value !== "";
		};

		// 202010280022:
		// https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript
		vue.prototype.$toClipboard = (str) => {
			const el = document.createElement("textarea");
			el.value = str;
			el.setAttribute("readonly", "");
			el.style.position = "absolute";
			el.style.left = "-9999px";
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);
		};

		// 202010281041: https://stackoverflow.com/a/7390612
		vue.prototype.$getType = function(obj) {
			return {}.toString
				.call(obj)
				.match(/\s([a-zA-Z]+)/)[1]
				.toLowerCase();
		};

		//202103201537 creacion de una nueva alerta Carlos A. M
		vue.prototype.$alert = function(message) {
			const callback = null;
			this.$nextTick(function() {
				let dialog = custom({
					onShowing: function() {
						console.log("onShowing");
					},
					showTitle: false,
					dragEnabled: false,
					messageHtml: "<i class='icon-notification msg-icon'></i>" + message,
					buttons: [
						{
							text: "Aceptar",
							onClick: function() {
								return false;
							},
						},
					],
				});
				window.jQuery(".dx-dialog").addClass("confirm");
				dialog.show().then((result) => {
					if (vue.prototype.$isFunction(callback)) callback(result);
				});
			});
		};

		// 202009240327
		vue.prototype.$confirm = function(message, callback) {
			this.$nextTick(function() {
				let dialog = custom({
					onShowing: function() {
						console.log("onShowing");
					},
					showTitle: false,
					dragEnabled: false,
					messageHtml: "<i class='icon-question3 msg-icon'></i>" + message,
					buttons: [
						{
							text: "SI",
							onClick: function() {
								return true;
							},
						},
						{
							text: "NO",
							onClick: function() {
								return false;
							},
						},
					],
				});
				window.jQuery(".dx-dialog").addClass("confirm");
				dialog.show().then((result) => {
					if (vue.prototype.$isFunction(callback)) callback(result);
				});
			});
		};

		// 202009240327
		vue.prototype.$error = function(message, callback) {
			this.$nextTick(function() {
				let dialog = custom({
					onShowing: function() {
						console.log("onShowing");
					},
					showTitle: false,
					dragEnabled: false,
					messageHtml: "<i class='icon-notification msg-icon'></i>" + message,
					buttons: [
						{
							text: "Ok",
							onClick: function() {
								return true;
							},
						},
					],
				});
				window.jQuery(".dx-dialog").addClass("confirm");
				dialog.show().then((result) => {
					if (vue.prototype.$isFunction(callback)) callback(result);
				});
			});
		};

		// 202009240327
		vue.prototype.$info = function(message, callback) {
			this.$nextTick(function() {
				let dialog = custom({
					onShowing: function() {
						console.log("onShowing");
					},
					showTitle: false,
					dragEnabled: false,
					messageHtml: "<i class='icon-info msg-icon'></i>" + message,
					buttons: [
						{
							text: "Ok",
							onClick: function() {
								return true;
							},
						},
					],
				});
				window.jQuery(".dx-dialog").addClass("confirm");
				dialog.show().then((result) => {
					if (vue.prototype.$isFunction(callback)) callback(result);
				});
			});
		};

		window.jQuery.fn.removeClasses = function(prefix) {
			this.each(function(i, el) {
				var classes = el.className.split(" ").filter(function(c) {
					return c.lastIndexOf(prefix, 0) !== 0;
				});
				el.className = $.trim(classes.join(" "));
			});
			return this;
		};

		// 202009200401: Detect the current active responsive breakpoint in Bootstrap
		// https://stackoverflow.com/a/37141090
		function getResponsiveBreakpoint() {
			var envs = {
				xs: "d-none",
				sm: "d-sm-none",
				md: "d-md-none",
				lg: "d-lg-none",
				xl: "d-xl-none",
			};
			var env = "";
			var $el = $("<div>");
			$el.appendTo($("body"));
			for (var i = Object.keys(envs).length - 1; i >= 0; i--) {
				env = Object.keys(envs)[i];
				$el.addClass(envs[env]);
				if ($el.is(":hidden")) break; // env detected
			}
			$el.remove();
			// $("body")
			// 	.removeClasses("device-")
			// 	.addClass("device-" + env);
			return env;
		}

		// 202009200534: OIDC based
		vue.prototype.$qsParams = function() {
			var params = {},
				queryString = location.hash.substring(1),
				regex = /([^&=]+)=([^&]*)/g;
			let m;
			while ((m = regex.exec(queryString))) {
				params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
			}
			return params;
		};

		// 202009142046: https://stackoverflow.com/a/979995
		vue.prototype.$queryString = function() {
			var query = window.location.search.substring(1);
			console.log("query", query);
			var vars = query.split("&");
			var query_string = {};
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split("=");
				var key = decodeURIComponent(pair[0]);
				var value = decodeURIComponent(pair[1]);
				// If first entry with this name
				if (typeof query_string[key] === "undefined") {
					query_string[key] = decodeURIComponent(value);
					// If second entry with this name
				} else if (typeof query_string[key] === "string") {
					var arr = [query_string[key], decodeURIComponent(value)];
					query_string[key] = arr;
					// If third or later entry with this name
				} else {
					query_string[key].push(decodeURIComponent(value));
				}
			}
			return query_string;
		};

		// 202009091346: Is function
		vue.prototype.$isFunction = function(functionToCheck) {
			return functionToCheck && {}.toString.call(functionToCheck) === "[object Function]";
		};

		// 202009091217: Sorting an array of objects by property values
		// https://stackoverflow.com/a/979325
		vue.prototype.$objectSort = function(object, field, reverse = false) {
			const sort_by = (f, r, p) => {
				const key = p
					? function(x) {
							return p(x[f]);
					  }
					: function(x) {
							return x[f];
					  };
				r = !r ? 1 : -1;
				return function(a, b) {
					return (a = key(a)), (b = key(b)), r * ((a > b) - (b > a));
				};
			};
			return object.sort(sort_by(field, reverse, (o) => (typeof o === "string" ? o.toUpperCase() : o)));
		};

		// 202009091002: ReplaceAll
		vue.prototype.$replaceAll = function(string, from, to) {
			var re = new RegExp(from, "g");
			return string.replace(re, to);
		};

		// 202104102245: Clean double and leading spaces
		vue.prototype.$clean = function(string) {
			if (typeof string !== "string") return string;
			return string.replace(/ +(?= )/g, "").trim();
		};

		// 202009091002: Capitalize
		vue.prototype.$capitalize = function(string) {
			if (typeof string !== "string") return string;
			string = string.toLowerCase();
			return this.$clean(string.charAt(0).toUpperCase() + string.slice(1)).trim();
		};

		// 202009091156: titleCase
		vue.prototype.$titleCase = function(string, exceptions = ["de", "del", "en", "y", "la", "los", "el", "a", "e"]) {
			if (typeof string !== "string") return string;
			var res = [];
			var words = this.$replaceAll(string, "  ", " ").split(" ");
			words.forEach((word) => {
				if (exceptions.includes(word.toLowerCase())) {
					res.push(word.toLowerCase());
				} else {
					var w = this.$capitalize(word.toString());
					res.push(w);
				}
			});
			words = res.join(" ");
			return words.trim();
		};

		// 202009091156: titleCase
		vue.prototype.$formatDocument = function(doc, noval = "--") {
			if (typeof doc === "undefined") return noval;
			let v = "value" in doc ? doc.value : doc;
			if (typeof v !== "undefined" && v !== null) {
				return v
					.toString()
					.split(/(?=(?:...)*$)/)
					.join(".");
			} else {
				return noval;
			}
		};

		// 202104230814: Formatea un entero a KB, MB, GB
		vue.prototype.$formatSize = function(item, no_val = "--") {
			if (typeof item === "undefined") return no_val;
			let v = "value" in item ? item.value : item;
			if (typeof v !== "undefined" && v !== null) {
				return v.formatSize();
			} else {
				return no_val;
			}
		};

		// 202009091007: Base url
		vue.prototype.$baseUrl = function() {
			var loc = window.location;
			var baseUrl = loc.protocol + "//" + loc.host + "/" + loc.pathname.split("/")[1];
			return baseUrl;
		};

		// 201906141957: Acciones a ser ejecutadas
		vue.prototype.$global = function() {
			// 202011142215: ScrollTop
			// https://github.com/bartholomej/material-scrollTop#usage
			// $("body").materialScrollTop();
			// if (vue.prototype.$isFunction(window.jQuery.materialScrollTop)) {
			// console.log("materialScrollTop!");
			// window.jQuery("body").materialScrollTop({
			// 	padding: 100, // ... and add padding 100px
			// 	// revealElement: "header", // Reveal button when scrolling over <header> ...
			// 	revealPosition: "bottom", // ... and do it at the end of </header> element
			// 	duration: 600, // Animation will run 600 ms
			// 	easing: "swing", // Do it with swing animation
			// 	onScrollEnd: function() {
			// 		// Give me some log when animation ends
			// 		console.log("SCROLL!");
			// 	},
			// });
			// }
			// Main
			const main = function() {
				// console.clear();
				var bp = getResponsiveBreakpoint();
				// console.log("breakpoint", bp);
				retina();
			};
			window.addEventListener("load", function(event) {
				main();
			});
			window.addEventListener("resize", function(event) {
				main();
			});
		};

		// 201906141619: Find the closest ancestor with a specific class
		// https://stackoverflow.com/a/27037567
		vue.prototype.$findAncestor = function(el, sel) {
			while ((el = el.parentElement) && !(el.matches || el.matchesSelector).call(el, sel));
			return el;
		};

		vue.prototype.$type = function(obj) {
			return {}.toString
				.call(obj)
				.match(/\s([a-z|A-Z]+)/)[1]
				.toLowerCase();
		};

		// 202010081631: Clean properties
		// https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/#_2-using-object-assign
		vue.prototype.$cleanProperties = function(source) {
			for (const property in source) {
				// console.log(this.$sep);
				let t = this.$type(source[property]);
				console.log(`field: ${property}, value: ${source[property]}, type: ${t}`);
				switch (t) {
					// case "number":
					// 	source[property] = null;
					// 	break;
					// case "string":
					// 	source[property] = null;
					// 	break;
					case "object":
						source[property] = {};
						break;
					case "array":
						source[property] = [];
						break;
					default:
						source[property] = null;
				}
			}
			// console.log("source", source);
			return source;
		};

		// 202010081631: Clone an object
		// https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/#_2-using-object-assign
		vue.prototype.$clone = function(source, cleanProperties = false) {
			const cloned = Object.assign({}, source);
			return cleanProperties ? this.$cleanProperties(cloned) : cloned;
		};

		// 202104110402: Formatea la fecha
		vue.prototype.$formatDate = function(e) {
			console.log("$formatDate", e);
			return e;
		};

		// 201906121015: Obtiene la fecha formateada
		// https://stackoverflow.com/a/42862926
		vue.prototype.$getFormattedDate = function(theDate = new Date(), withTime = true) {
			// https://stackoverflow.com/a/8888498
			function formatAMPM(date) {
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var ampm = hours >= 12 ? "p.m." : "a.m.";
				hours = hours % 12;
				hours = hours ? hours : 12; // the hour '0' should be '12'
				minutes = minutes < 10 ? "0" + minutes : minutes;
				var strTime = hours + ":" + minutes + " " + ampm;
				return strTime;
			}

			function checkZero(data) {
				if (data.length == 1) {
					data = "0" + data;
				}
				return data;
			}

			var day = theDate.getDate() + "";
			var month = theDate.getMonth() + 1 + "";
			var year = theDate.getFullYear() + "";
			var time = formatAMPM(theDate);
			day = checkZero(day);
			month = checkZero(month);
			year = checkZero(year);
			var d = day + "/" + month + "/" + year;
			return d + (withTime ? " " + time : "");
		};

		// 201906141145: Detecta el navegador
		// https://stackoverflow.com/a/9851769
		vue.prototype.$getBrowser = function() {
			// Opera 8.0+
			var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0;
			// Firefox 1.0+
			var isFirefox = typeof InstallTrigger !== "undefined";
			// Safari 3.0+ "[object HTMLElementConstructor]"
			var isSafari =
				/constructor/i.test(window.HTMLElement) ||
				(function(p) {
					return p.toString() === "[object SafariRemoteNotification]";
				})(!window["safari"] || (typeof safari !== "undefined" && safari.pushNotification));
			// Internet Explorer 6-11
			var isIE = /*@cc_on!@*/ false || !!document.documentMode;
			// Edge 20+
			var isEdge = !isIE && !!window.StyleMedia;
			// Chrome 1 - 71
			var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
			// Blink engine detection
			var isBlink = (isChrome || isOpera) && !!window.CSS;
			return {
				isOpera: isOpera,
				isFirefox: isFirefox,
				isSafari: isSafari,
				isIE: isIE,
				isEdge: isEdge,
				isChrome: isChrome,
				isBlink: isBlink,
			};
		};
	},
};

//#endregion

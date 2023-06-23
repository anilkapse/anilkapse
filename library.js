function ready(f) {
	var j=document;
	if (j.readyState === 'complete' || j.readyState === 'interactive') {
		if (j.attachEvent) {
			setTimeout(f, 0);
		} else {
			f();
		}
	} else if (j.addEventListener) {
		j.addEventListener('DOMContentLoaded', f);
	} else {
		if (j.attachEvent && !j.addEventListener) {
			j.attachEvent('onreadystatechange', function() {
				if (j.readyState === 'complete') {
					f();
				}
			});
		}
	}
}

/*----
Native JS Polyfills --
*/
var toString = Object.prototype.toString;
if (!Array.isArray) {
	Array.isArray = function(a) {
		return toString.call(a) === "[object Array]";
	};
}
/*----
Native JS Polyfills Ends --
*/


function trim(s){
	return String.prototype.trim ?
		String(s).trim() :
		String(s).replace(/^[\s]+|[\s]+$/g, "")
}

var rnothtmlwhite = ( /[^\s\x20\t\r\n\f]+/g ); // Cached regular expression

function stripCollapse( v ) {
  var t =String( v ).match( rnothtmlwhite ) || [];
  return t.join( " " );
}
if (!String.prototype.trim){
	String.prototype.trim = function(){
		return this.replace(/^[\s\uFEFF\xA0\u1680\u2000-\u200A\u202F\u205F\u3000]+|[\s\uFEFF\xA0\u1680\u2000-\u200A\u202F\u205F\u3000]+$/g, '')
	}
}


function toArray( v ) {
  if ( Array.isArray(v) ) {
    return v;
  }
  if ( typeof v === "string" ) {
    return v.match( rnothtmlwhite ) || [];
  }
  return [];
}
function getClass( e ) {
  return e.getAttribute && e.getAttribute( "class" ) || "";
}
function addClass(e, c) {
	if (e && e.nodeType === 1 && c && (typeof c === "string" || Array.isArray(c))) {
		var s = performance.now();
		var a, f, d, u, v, n, i;
		a = toArray(c);
		var l = a.length;
		if (l) {
			v = getClass(e);
			d = stripCollapse(v);
			u = " " + d + " ";
			for (i = 0; i < l; i++) {
				n = a[i];
				if (u.indexOf(" " + n + " ") < 0) {
					u += n + " ";
				}
			}
			f =u.trim();
			if (d !== f) {
				e.setAttribute("class", f);
				console.log(performance.now() - s, e);
			}
		}
	}
}
/* Script -- */

function evalScript(s){
	var j = document,
	h= j.getElementsByTagName("head")[0] || j.documentElement;
	h.insertBefore(s,h.firstChild).parentNode.removeChild(s);
}
function createScript(u){
	var s = document.createElement("script");
	s.src = u, s.type = "text/javascript";
	return s
}
function jsonp(n, o) {
	var l, a = createScript(n);
	a.onload = function() {
		o.call(a[l])
	}, a.onerror = function() {
		console.error("There was a network error while trying to load the script")
	}, a.onload = null, evalScript(a)
}

function loadJS(u){
	evalScript(createScript(u));
}
function _jsonp(u,f,n){
	var r=(/(?<=callback\=)[a-zA-z0-9_$]+(?=&)?|$/),
	q = ( /\?/ );
	n=n||u.match(r)[0]||"callback";
	u=u+( q.test( u ) ? "&" : "?" )+"callback="+n;
	window[n]=f;
	return jsonp(u,f)
}
/* Scripts */
function uniqueWord(s) {
	return String(s).replace(/(\b\S+\b)(?=.*\1)/ig, "" )
}
function uniqueArray(a){
	var r = [], i = 0, j = a.length;
	for(; i < j ; i++){
		if(r.indexOf(a[i]) == -1) r.push(a[i]);
	}
	return r;
}

function CopyToClipboard(e) {
	var o, a;
	function t(e) {
		var o = document,
			a = o.createElement("TEXTAREA");
		a.value = e, o.body.appendChild(a), a.select(), o.execCommand("copy"), o.body.removeChild(a)
	}
	try {
		e.nodeType ? (o = (a = "TEXTAREA" === e.tagName || "INPUT" === e.tagName) && e.value || e.innerText, a ? (e.focus(), e.select(), document.execCommand("copy")) : t(o)) : t(e), document.getSelection().removeAllRanges()
	} catch (c) {
		async function n(e) {
			try {
				await navigator.clipboard.writeText(e)
			} catch (o) {
				console.error(o)
			}
		}
		n(e.nodeType ? a ? e.value : e.innerText : e)
	}
}

/* Helpers */

function removeClass_(d, f) {
	var n = " " + f + " ";
	if (d.indexOf(n) > -1) {
		var r = RegExp(n, "g");
		d = d.replace(r, " ");
	}
	return d;
}

function removeClass(el, val) {
	var _A=performance.now();
    var a, l, c, s, r, d, n;
    if (el && el.nodeType === 1 && val && (typeof val === "string" || Array.isArray(val))) {
        a = toArray(val);
        l = a.length;
        if (l) {
            c = getClass(el);
            s = stripCollapse(c);
            d = " " + s + " ";
            for (var i = 0; i < l; i++) {
            	d=removeClass_(d, a[i])
            }
            c = stripCollapse(d);
            if (s !== c) {
                el.setAttribute("class", c);
            }
            console.log( performance.now() - _A, el )
        }
    }
}


function isFunction(o){
	return typeof o === "function" && typeof o.nodeType !== "number" && typeof o.item !== "function";
}
function isArrayLike(o) {
	var l = !!o && typeof o !== "string" && "length" in o && o.length;
	if(o === null || typeof o === "undefined" || o === o.window || isFunction( o ) ){
		return false;
	}
	return Array.isArray(o) || typeof o === "string" || typeof l === "number" && l > -1 && (l - 1) in o;
}

function forEach(e, l) {
	var r, a = 0;
	if (isArrayLike(e)) {
		for (r = e.length; a < r && !1 !== l.call(e[a], e[a], a); a++);
	}else{
		for (a in e){
			if (!1 === l.call(e[a], a, e[a])) break;
		}
	}
}
	
function addEvent(e, t, n) {
	if (e && e.addEventListener) e.addEventListener(t, n, !1)
	else e && e.attachEvent && e.attachEvent("on" + t, n)
}

function removeEvent(e, t, n) {
	if (e && e.removeEventListener) try {
		e.removeEventListener(t, n, !1)
	} catch (v) {} else e && e.detachEvent && e.detachEvent("on" + t, n)
}


function ajax(o) {
	var x;
	try {
		x = new XMLHttpRequest();
	} catch (e) {
		try {
			x = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
			console.error("Ajax is not supported by this browser!");
			return;
		}
	}
	if (!o || typeof o !== "object") {
		o = {}
	}
	var m = o.method || "GET",
		u = o.url || location.href,
		r = o.responseType || "document",
		b = "POST" === m && o.body || null,
		h = o.headers || null;

	x.open(m, u, true);
	x.responseType = r;

	var s, e;
	x.onreadystatechange = function() {
		if (x.readyState === 4) {
			var r = createResponse(x);

			if (x.status === 200) {
				if (s && typeof s === "function") {
					s.call(this, r);
				}
			} else {
				if (e && typeof e === "function") {
					e.call(this, r);
					x.onerror = null;
				}
			}
		}
	};

	x.onerror = function() {
		var r = createResponse(x);
		if (e && typeof e === "function") {
			e.call(this, r);
			x.onreadystatechange = null;
		}
	};
	if (h) {
		setHeaders.call(x, h);
	}
	try {
		x.send(b);
	} catch (e) {}
	this.then = function(c) {
		if (c && typeof c === "function") {
			s = c;
		}
		return this;
	}

	this.catch = function(c) {
		if (c && typeof c === "function") {
			e = c;
		}
		return this;
	}
}

function setHeaders(headers) {
	if (!headers || typeof headers !== "object") {
		console.error("Headers object is invalid or missing!");
		return;
	}
	var name, value;
	for (name in headers) {
		value = headers[name];
		this.setRequestHeader(name, value);
	}
}

function createResponse(x) {
	return {
		response: x.response,
		statusText: x.statusText,
		status: x.status,
		headers: x.getAllResponseHeaders(),
		body: x.status === 0 && "Illegal cross origin request!" || x.response
	}
}
function toggleClass(e, c, x) {
	var t = performance.now();

	if (e && (e.nodeType === 1 || isArrayLike(e)) && c && (typeof c === "string" || Array.isArray(c))) {
		
		c = toArray(c);
		if (isArrayLike(e) === false) {
			e = [e]
		}

		forEach(e, function(el) {
			if (el.nodeType === 1 && c.length) {
				
				var b = stripCollapse(el.getAttribute("class") || "");
				var d = " " + b + " ";
				
				for (var i = 0; i < c.length; i++) {
					var f = c[i];
					d = toggleClassX_(d, f, x);
				}
				
				d = toArray(d).join(" ");
				console.log(b || "_empty", d || " empty_")
				if (d !== b) {
					el.setAttribute("class", d);
				}
			}
		});
		console.log(performance.now() - t);
	}
}

function toggleClassX_(d, f, x) {
	if (typeof x === 'boolean') {
		if (x) {
			if (d.indexOf(" " + f + " ") < 0) {
				d += f + " ";
			}
		} else {
			d = removeClass_(d, f);
		}
	} else {
		d = toggleClass_(d, f);
	}
	return d;
}

function toggleClass_(d, f) {
	var n = " " + f + " ";
	if (d.indexOf(n) > -1) {
		d = removeClass_(d, f);
	} else {
		d += f + " ";
	}
	return d;
}






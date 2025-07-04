/*  ==== BixGrow head-less click affiliate tracker ====  */
/* eslint-disable */
/* prettier-ignore */

var bixgrowUrl = "https://track.bixgrow.com",
    gbRefParam = bgGetParameterByName("bg_ref"),
    bgGroup = 0;
if (gbRefParam && -1 != gbRefParam.indexOf(":")) {
    let e = gbRefParam.split(":");
    (gbRefParam = e[1]), (bgGroup = e[0]);
}
function bgGetParameterByName(e, i = window.location.href) {
    var t = RegExp("[?&]" + (e = e.replace(/[\[\]]/g, "\\$&")) + "(=([^&#]*)|&|#|$)").exec(i);
    return t ? (t[2] ? decodeURIComponent(t[2].replace(/\+/g, " ")) : "") : null;
}
function bgSetCookie(e, i, t) {
    var r = new Date();
    r.setTime(r.getTime() + 864e5 * t);
    var o = "expires=" + r.toUTCString();
    document.cookie = e + "=" + i + ";" + o + ";domain=.keycard.tech;path=/";
}
function bgSetCookieByUnixTime(e, i, t) {
    var r = "expires=" + new Date(1e3 * t).toUTCString();
    document.cookie = e + "=" + i + ";" + r + ";domain=.keycard.tech;path=/";
}
function bgGetCookie(e) {
    for (var i = e + "=", t = decodeURIComponent(document.cookie).split(";"), r = 0; r < t.length; r++) {
        for (var o = t[r]; " " == o.charAt(0); ) o = o.substring(1);
        if (0 == o.indexOf(i)) return o.substring(i.length, o.length);
    }
    return "";
}
function bguuid() {
    var e = URL.createObjectURL(new Blob()),
        i = e.toString();
    return URL.revokeObjectURL(e), i.split(/[:\/]/g).pop();
}
function bgPostEvent(e) {
    var i = new XMLHttpRequest();
    (i.onreadystatechange = function () {
        4 == this.readyState && 200 == this.status
            ? "click" == (bixgrowres = JSON.parse(this.responseText)).event_type &&
              (bgSetCookieByUnixTime("bgvisitor_id", bixgrowres.visitor_id, bixgrowres.expire_at),
              bgSetCookieByUnixTime("bgaffilite_id", e.aff_id, bixgrowres.expire_at),
              bgSetCookieByUnixTime("bglast_click", new Date().getTime(), bixgrowres.expire_at),
              bgSetCookieByUnixTime("bgexpire_time", bixgrowres.expire_at, bixgrowres.expire_at),
              bgSetCookieByUnixTime("bggroups", bgGroup, bixgrowres.expire_at),
          	  bgSetCookieByUnixTime('bgclick_id', bixgrowres.click_id, bixgrowres.expire_at))
            : "add_to_cart" == e.event_type && clearInterval(bgSetInterval);
    }),
        i.open("POST", bixgrowUrl + "/api/bg_trackv2", !0),
        i.setRequestHeader("Content-Type", "application/json"),
        i.send(JSON.stringify(e));
}
if (gbRefParam) {
    if ("" === bgGetCookie("bgvisitor_id")) {
        console.log(1);
        bgPostEvent({ aff_id: gbRefParam, event_type: "click", referral_site: document.referrer, destination_url: window.location.href, visitor_id: bguuid() });
    } else if (bgGetCookie("bgaffilite_id") != gbRefParam) {
        console.log(2);
        bgPostEvent({ aff_id: gbRefParam, visitor_id: bgGetCookie("bgvisitor_id"), event_type: "click", referral_site: document.referrer, destination_url: window.location.href });
    } else if (new Date().getTime() - bgGetCookie("bglast_click") > 6e4) {
        console.log(3);
        bgPostEvent({ aff_id: gbRefParam, visitor_id: bgGetCookie("bgvisitor_id"), event_type: "click", referral_site: document.referrer, destination_url: window.location.href, channel: bgGetParameterByName("chan") });
    }
}
function bgGetHasCode(e) {
    return e ? (-1 != e.indexOf(":") ? e.split(":")[1] : e) : "";
}
import { LOCALE_CODES, DEFAULT_LOCALE } from './config.js'

/** Where the visitor's explicit language choice is remembered. */
export const PREF_KEY = '8slabz.lang'

/**
 * The inline script that routes a visitor to their language.
 *
 * This runs synchronously in <head>, before first paint, because a redirect
 * that happens after the page renders shows a flash of English — and on the
 * Arabic page, a flash of the entire layout in the wrong direction.
 *
 * Three guards keep it from ever trapping someone in a language:
 *
 *  1. A locale prefix already in the URL wins outright. If Simant emails a
 *     buyer /vi/catalogue/, that buyer sees Vietnamese, whatever their browser
 *     or their previous visit says.
 *
 *  2. It only runs on ENTRY to the site — when the referrer is not our own
 *     origin. Clicking "English" from /es/ lands on /, an unprefixed URL that
 *     would otherwise look exactly like a fresh visit and bounce straight back
 *     to Spanish. This guard works even when storage is blocked (private mode),
 *     which the stored preference alone cannot do.
 *
 *  3. It only ever redirects AWAY from the default locale, so there is no pair
 *     of URLs that can redirect to each other.
 *
 * Deliberately NOT server-side: `output: export` means / is one static file on
 * a CDN, identical for every visitor, so Accept-Language never reaches us.
 */
export function preferenceScript() {
  const codes = JSON.stringify(LOCALE_CODES)
  // Minified by hand rather than by a build step: it is small, it ships inline
  // on every page, and it has to stay readable in View Source for whoever
  // inherits this site.
  return `(function(){try{
var C=${codes},D=${JSON.stringify(DEFAULT_LOCALE)},K=${JSON.stringify(PREF_KEY)};
var p=location.pathname,s=p.split("/").filter(Boolean)[0];
if(C.indexOf(s)>-1)return;
var r=document.referrer;
if(r&&r.indexOf(location.origin+"/")===0)return;
var w=null;try{w=localStorage.getItem(K)}catch(e){}
if(!w){var n=navigator.languages||[navigator.language||""];
for(var i=0;i<n.length;i++){var b=String(n[i]).toLowerCase().split("-")[0];
if(C.indexOf(b)>-1){w=b;break}}}
if(!w||w===D||C.indexOf(w)<0)return;
location.replace("/"+w+p+location.search+location.hash);
}catch(e){}})();`
}

// sleepsooth.com: the Soothing Sleep site (static pages in ./public) plus short links to the channel,
// videos and albums. The worker runs first: www → apex, short links, then the static pages, then a 404.
// Theme links point at the first 1-hour video of each; switch them to playlists once those exist.
import { PROFILES } from "./seo/pages.mjs";

const CHANNEL = "https://www.youtube.com/@SleepSooth";
const LINKS = {
  "/subscribe": `${CHANNEL}?sub_confirmation=1`,
  "/youtube": `${CHANNEL}?sub_confirmation=1`,
  "/videos": `${CHANNEL}/videos`,
  "/shorts": `${CHANNEL}/shorts`,
  "/playlists": `${CHANNEL}/playlists`,
  "/rain": "https://www.youtube.com/watch?v=kSrfISnnYjM",
  "/ocean": "https://www.youtube.com/watch?v=ayAra16BQnA",
  "/forest": "https://www.youtube.com/watch?v=Ovi1t67XL3U",
  "/river": "https://www.youtube.com/watch?v=eo2tkngnfEE",
  // Not uploaded yet: point at the channel's videos until the 1-hour videos are live.
  "/storm": `${CHANNEL}/videos`,
  "/focus": `${CHANNEL}/videos`,
  "/bells": "https://www.youtube.com/watch?v=QlD2SlOvIJ8",
  "/tinroof": "https://www.youtube.com/watch?v=HzTH8GMVWII",
  "/piano-rain": "https://www.youtube.com/watch?v=xOsWyDAzIgM",
  "/mix": "https://canopytide.com",
  "/license": "https://canopytide.com/license/",
  // The artist page once PROFILES.spotify is filled in; until then, Spotify's artist search for the name.
  "/spotify": PROFILES.spotify || "https://open.spotify.com/search/Soothing%20Sleep/artists",
};
// Alternate spellings people search for; permanent redirects to the canonical guide.
const ALIASES = {
  "/sleep-maxxing": "/sleepmaxxing",
  "/sleep-maxing": "/sleepmaxxing",
  "/sleepmaxing": "/sleepmaxxing",
  "/white-noise": "/sleep-sounds",
  "/pink-noise": "/sleep-sounds",
  "/brown-noise": "/sleep-sounds",
  "/relax": "/relaxation",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }
    const path = url.pathname.replace(/\/+$/, "").toLowerCase() || "/";
    if (LINKS[path]) return Response.redirect(LINKS[path], 302);
    if (ALIASES[path]) return Response.redirect(`${url.origin}${ALIASES[path]}`, 301);
    const page = await env.ASSETS.fetch(request);
    if (page.status !== 404) return page;
    // Unknown path: real 404 status so search engines don't index it, with a way home.
    return new Response(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Page not found | Soothing Sleep</title><body style="font:18px/1.6 system-ui;background:#0d1020;color:#e7e9f4;padding:2rem"><h1>Page not found</h1><p><a style="color:#b9c4ff" href="/">Go to Soothing Sleep</a> or <a style="color:#b9c4ff" href="${CHANNEL}?sub_confirmation=1">open the YouTube channel</a>.</p>`,
      { status: 404, headers: { "content-type": "text/html; charset=utf-8" } });
  },
};

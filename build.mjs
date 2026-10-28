// Builds sleepsooth.com into ./public: a homepage and evidence-based sleep guides.
// The worker serves these pages and keeps the YouTube short links (/rain, /subscribe, ...).
// Usage: node sleepsooth/build.mjs
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { PROFILES } from "./seo/pages.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, "public");
const SITE = "https://sleepsooth.com";
const MIXER = "https://canopytide.com";
const CHANNEL = "https://www.youtube.com/@SleepSooth";
const SUB = `${CHANNEL}?sub_confirmation=1`;
const UPDATED = "2026-10-20";
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = s => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

const VIDEOS = [
  { id: "kSrfISnnYjM", name: "Tropical rain", page: "rain-sounds", title: "Tropical Rain Sounds for Sleep | 3D Audio 1 Hour Deep Sleep & Relaxation", date: "2026-10-19T23:01:12-07:00" },
  { id: "ayAra16BQnA", name: "Ocean waves", page: "ocean-sounds", title: "Ocean Waves Sounds for Sleep | 3D Audio 1 Hour Deep Sleep & Relaxation", date: "2026-10-19T23:18:03-07:00" },
  { id: "Ovi1t67XL3U", name: "Forest", page: "forest-sounds", title: "Forest Sounds for Sleep | 3D Audio 1 Hour Deep Sleep & Relaxation", date: "2026-10-19T23:18:43-07:00" },
  { id: "eo2tkngnfEE", name: "River stream", page: "river-sounds", title: "River Stream Sounds for Sleep | 3D Audio 1 Hour Deep Sleep & Relaxation", date: "2026-10-19T23:17:21-07:00" },
  { id: "QlD2SlOvIJ8", name: "Tibetan singing bowls", page: "tibetan-singing-bowls", title: "Tibetan Singing Bowls for Sleep | 3D Audio 1 Hour Deep Sleep & Meditation", date: "2026-10-20T14:02:00-07:00" },
  { id: "HzTH8GMVWII", name: "Tin roof rain", page: "rain-sounds", title: "Heavy Rain on a Tin Roof for Sleep | 10 Hours Dark Screen 🌧️ Wind & Wind Chimes", date: "2026-10-22",
    len: "10 hours · dark screen", dur: "PT10H", desc: "Heavy rain on a tin roof with wind and wind chimes: ten hours, with a dark screen after three minutes." },
  { id: "xOsWyDAzIgM", name: "Piano & rain", page: "rain-sounds", title: "Soft Piano & Gentle Rain for Sleep | 10 Hours Dark Screen 🌧️ Calm Lake at Night", date: "2026-10-26",
    len: "10 hours · dark screen", dur: "PT10H", desc: "Soft piano and cello over a river, fine drizzle and distant rain: ten hours over a dark, slowly moving lake at night." },
];
// Defaults for the 1-hour 3D videos; a video can override them (len = card label, dur = ISO 8601 duration).
const vLen = v => v.len || "1 hour · 3D audio";
const vDur = v => v.dur || "PT1H";
const vDesc = v => v.desc || `${v.name} sounds for sleep: one uninterrupted hour in 3D audio.`;

const SRC = {
  watson: `<a href="https://doi.org/10.5665/sleep.4716" rel="noopener">Watson et al., 2015, <em>Sleep</em></a>`,
  edinger: `<a href="https://doi.org/10.5664/jcsm.8986" rel="noopener">Edinger et al., 2021, AASM guideline</a>`,
  drake: `<a href="https://doi.org/10.5664/jcsm.3170" rel="noopener">Drake et al., 2013</a>`,
  baron: `<a href="https://doi.org/10.5664/jcsm.6472" rel="noopener">Baron et al., 2017</a>`,
  rhee: `<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12094774/" rel="noopener">2025 systematic review in <em>PLOS One</em></a>`,
  riedy: `<a href="https://doi.org/10.1016/j.smrv.2020.101385" rel="noopener">Riedy et al., 2021, <em>Sleep Medicine Reviews</em></a>`,
  papa: `<a href="https://doi.org/10.3389/fnhum.2017.00109" rel="noopener">Papalambros et al., 2017</a>`,
  ngo: `<a href="https://doi.org/10.1016/j.neuron.2013.03.006" rel="noopener">Ngo et al., 2013, <em>Neuron</em></a>`,
  hugh: `<a href="https://doi.org/10.1542/peds.2013-3617" rel="noopener">Hugh et al., 2014, <em>Pediatrics</em></a>`,
  scullin: `<a href="https://doi.org/10.1037/xge0000374" rel="noopener">Scullin et al., 2018</a>`,
  zaccaro: `<a href="https://doi.org/10.3389/fnhum.2018.00353" rel="noopener">Zaccaro et al., 2018</a>`,
};

const ORG = { "@type": "Organization", "@id": `${SITE}/#org`, name: "Soothing Sleep", alternateName: "SleepSooth", url: `${SITE}/`, logo: `${MIXER}/icon.png`, sameAs: [CHANNEL, MIXER, ...Object.values(PROFILES).filter(Boolean)] };

const PAGES = [
  {
    slug: "", og: "ocean",
    title: "Soothing Sleep: 3D Sleep Sounds, Relaxation & Sleep Guides",
    description: "Hour-long 3D sleep sounds, a free nature sound mixer and plain-English, evidence-based guides to sleep, rest, relaxation and sleepmaxxing.",
    h1: "Sleep sounds and sleep guides that keep it simple",
    lede: "Soothing Sleep makes hour-long 3D sleep sounds for YouTube, a free sound mixer you can run all night, and short guides that separate what helps you sleep from what is just a trend.",
    home: true,
    faqs: [
      { q: "How many hours of sleep do adults need?", a: "Adults should regularly get 7 or more hours of sleep a night, according to the joint consensus of the American Academy of Sleep Medicine and the Sleep Research Society." },
      { q: "What sounds help you fall asleep?", a: "Steady sounds such as rain, ocean waves, wind or pink and brown noise help many people by masking sudden noises. Evidence is still limited, so pick whichever you find easiest to ignore and keep the volume low." },
      { q: "What is the fastest way to relax before bed?", a: "Dim the lights, put the phone away and do a few minutes of slow breathing with a longer exhale than inhale. Writing tomorrow's to-do list before bed can also help you fall asleep faster." },
      { q: "Is Soothing Sleep free?", a: "Yes. The YouTube videos, the Canopy & Tide sound mixer and these guides are all free." },
    ],
  },
  {
    slug: "sleepmaxxing", og: "forest", article: true,
    title: "Sleepmaxxing: What Actually Works | Soothing Sleep",
    description: "Sleepmaxxing, explained: the sleep habits with real evidence, the viral hacks with little or none, and a simple routine to get better sleep without obsessing.",
    h1: "Sleepmaxxing: what actually works, and what to skip",
    lede: "Sleepmaxxing (also spelled sleep maxxing or sleep maxing) is the social media trend of stacking habits, gadgets and supplements to get the best possible sleep. Some of it is solid. Some of it is theatre.",
    answer: "Sleepmaxxing works when it focuses on the basics: a consistent sleep and wake time, 7 or more hours in bed asleep, a dark, cool and quiet bedroom, morning daylight, and no caffeine in the afternoon. Trendy extras such as mouth taping, sleep cocktails and chasing a perfect sleep score have weak evidence, and some carry risks.",
    body: `
      <h2>What is sleepmaxxing?</h2>
      <p>The word borrows the "-maxxing" suffix from online self-improvement culture, meaning to push something to its maximum. Sleepmaxxing videos show elaborate evening routines: magnesium drinks, mouth tape, blackout masks, white noise, cold rooms and sleep trackers. The goal of better sleep is a good one. The trouble is that the routines mix well-supported habits with untested hacks, and present them as equally important.</p>

      <h2>The evidence, habit by habit</h2>
      <div class="table"><table>
        <thead><tr><th scope="col">Habit</th><th scope="col">Evidence</th><th scope="col">Verdict</th></tr></thead>
        <tbody>
          <tr><td>Same sleep and wake time every day</td><td>Strong</td><td>Do it. Regularity is one of the most reliable ways to improve sleep.</td></tr>
          <tr><td>7+ hours of sleep for adults</td><td>Strong (${SRC.watson})</td><td>The foundation. No hack replaces enough time asleep.</td></tr>
          <tr><td>No caffeine within about 6 hours of bed</td><td>Good (${SRC.drake})</td><td>Do it. Caffeine taken 6 hours before bed still cut sleep by more than an hour in one lab study.</td></tr>
          <tr><td>Dark, cool, quiet bedroom</td><td>Good</td><td>Do it. Blackout curtains, a cooler room and steady background sound if your area is noisy.</td></tr>
          <tr><td>Morning daylight and daytime activity</td><td>Good</td><td>Do it. Light early in the day helps set your body clock.</td></tr>
          <tr><td>CBT-I for ongoing insomnia</td><td>Strong (${SRC.edinger})</td><td>The first-line treatment for chronic insomnia, ahead of sleeping pills.</td></tr>
          <tr><td>White noise, rain or nature sounds</td><td>Limited (${SRC.riedy})</td><td>Optional. Helpful for masking noise; keep it quiet.</td></tr>
          <tr><td>Magnesium</td><td>Mixed</td><td>Optional. Small, inconsistent trials; most plausible if you are low in magnesium.</td></tr>
          <tr><td>Melatonin</td><td>Situational</td><td>Useful for jet lag and some body clock problems. Doses vary between products, so ask a pharmacist.</td></tr>
          <tr><td>Sleep trackers and sleep scores</td><td>Weak for improving sleep</td><td>Use lightly. Chasing a perfect score can create the anxiety that keeps you awake (${SRC.baron}).</td></tr>
          <tr><td>Mouth taping</td><td>Weak, with risks (${SRC.rhee})</td><td>Skip it unless a doctor suggests it. It can be dangerous with nasal blockage or sleep apnea.</td></tr>
          <tr><td>"Sleepy girl" mocktails, tart cherry</td><td>Weak</td><td>Harmless for most people, but do not expect much.</td></tr>
        </tbody>
      </table></div>

      <h2>A simple sleepmaxxing routine</h2>
      <ol>
        <li><strong>Fix your wake time</strong>, including weekends. Count back 7.5 to 9 hours for your bedtime.</li>
        <li><strong>Get outside in the morning</strong> for 10 to 30 minutes of daylight.</li>
        <li><strong>Stop caffeine by early afternoon</strong> and keep alcohol away from bedtime; it fragments sleep later in the night.</li>
        <li><strong>Wind down for 20 to 30 minutes</strong>: dim lights, screens away, a <a href="/relaxation">relaxation routine</a>.</li>
        <li><strong>Make the room dark, cool and quiet.</strong> If noise wakes you, use steady sound such as <a href="${MIXER}/rain-sounds/">rain</a> or <a href="${MIXER}/ocean-sounds/">ocean waves</a> at a low volume.</li>
        <li><strong>If you cannot sleep after about 20 minutes</strong>, get up, do something calm in low light, and go back when sleepy.</li>
      </ol>

      <h2>When sleepmaxxing goes too far</h2>
      <p>Researchers use the word <em>orthosomnia</em> for an unhealthy preoccupation with perfect sleep, often driven by tracker data. If your routine is making you more anxious about bedtime, simplify it. Good sleep usually comes from doing a few boring things consistently, not from doing everything.</p>

      <h2>When to see a doctor</h2>
      <p>Talk to a doctor if you snore loudly and wake unrefreshed, someone notices you stop breathing at night, you fall asleep during the day without meaning to, or poor sleep lasts more than three months. These can be signs of sleep apnea or insomnia, which are treatable.</p>`,
    faqs: [
      { q: "What does sleepmaxxing mean?", a: "Sleepmaxxing means optimising your sleep as much as possible with habits, products and routines. It became popular on TikTok and other social media." },
      { q: "Is sleep maxing the same as sleepmaxxing?", a: "Yes. Sleep maxing, sleep maxxing and sleepmaxxing are different spellings of the same trend." },
      { q: "Does mouth taping help you sleep?", a: "There is little good evidence that it does, and a 2025 systematic review warned it may be risky for people with nasal obstruction or sleep apnea. Skip it unless a doctor recommends it." },
      { q: "What is the most important sleepmaxxing habit?", a: "Keeping the same wake time every day and giving yourself at least 7 hours of sleep. Everything else builds on those two." },
    ],
  },
  {
    slug: "sleep-sounds", og: "rain", article: true,
    title: "White, Pink or Brown Noise for Sleep? | Soothing Sleep",
    description: "White noise vs pink noise vs brown noise vs rain and nature sounds for sleep: what each sounds like, what the research says, and how to use them safely.",
    h1: "White, pink and brown noise for sleep: which sound is best?",
    lede: "Background sound is one of the simplest sleep aids there is. Here is how the common types differ, what the research actually shows, and how to use them without overdoing the volume.",
    answer: "The best sleep sound is a steady one you find easy to ignore. White noise is bright and hissy, pink noise is softer and balanced, and brown noise is deep and rumbly, like heavy rain or wind. Research suggests sound mainly helps by masking disruptive noise, and the evidence that it improves sleep overall is still limited.",
    body: `
      <h2>What the colours of noise mean</h2>
      <div class="table"><table>
        <thead><tr><th scope="col">Sound</th><th scope="col">What it is</th><th scope="col">Sounds like</th></tr></thead>
        <tbody>
          <tr><td><a href="${MIXER}/white-noise/">White noise</a></td><td>Equal energy at every frequency</td><td>A detuned radio or a fan: bright and hissy</td></tr>
          <tr><td><a href="${MIXER}/pink-noise/">Pink noise</a></td><td>Energy falls by about 3 dB per octave, so each octave is equally loud</td><td>Steady rain or a waterfall: balanced and softer</td></tr>
          <tr><td><a href="${MIXER}/brown-noise/">Brown noise</a></td><td>Energy falls by about 6 dB per octave</td><td>Heavy rain, strong wind or distant surf: deep and rumbly</td></tr>
          <tr><td>Nature sounds</td><td>Mixtures of the above with natural variation</td><td>Rain, ocean waves, a stream, forest</td></tr>
        </tbody>
      </table></div>

      <h2>What the research says</h2>
      <p>A 2021 systematic review of 38 studies rated the evidence that continuous noise improves sleep as very low quality (${SRC.riedy}). That does not mean it never helps; it means the studies are small and mixed. Where sound clearly helps is in masking: a steady sound makes sudden noises like traffic, doors or snoring less likely to wake you.</p>
      <p>The exciting pink noise headlines come from a different technique. In lab studies, short bursts of pink noise timed to the brain's slow waves during deep sleep strengthened those waves and improved next-day memory (${SRC.ngo}; ${SRC.papa}). That needs equipment that reads your brain waves in real time, so it is not the same as playing pink noise all night.</p>

      <h2>Nature sounds vs noise</h2>
      <p>Rain, surf and wind are natural versions of pink and brown noise, with gentle variation that many people find more pleasant than a flat hiss. Others prefer pure noise precisely because it has no changes to notice. Try one for a week before switching.</p>

      <h2>How to use sleep sounds safely</h2>
      <ul>
        <li><strong>Keep it quiet</strong>: just loud enough to soften background noise.</li>
        <li><strong>Put the speaker away from your head</strong>, across the room rather than on the pillow.</li>
        <li><strong>Use a timer</strong> if sound wakes you later in the night.</li>
        <li><strong>For babies</strong>, keep machines on low and well away from the cot. Some infant sleep machines exceeded safe levels at full volume when placed close (${SRC.hugh}).</li>
      </ul>

      <h2>Try them free</h2>
      <p>The <a href="${MIXER}/">Canopy &amp; Tide mixer</a> has plain <a href="${MIXER}/white-noise/">white noise</a>, <a href="${MIXER}/pink-noise/">pink noise</a> and <a href="${MIXER}/brown-noise/">brown noise</a>, plus <a href="${MIXER}/rain-sounds/">rain</a>, <a href="${MIXER}/thunderstorm-sounds/">thunderstorm</a>, <a href="${MIXER}/ocean-sounds/">ocean</a>, <a href="${MIXER}/wind-sounds/">wind</a>, <a href="${MIXER}/river-sounds/">river</a>, <a href="${MIXER}/light-rain-sounds/">light rain</a> and <a href="${MIXER}/tibetan-singing-bowls/">singing bowl</a> sounds in 3D, with a sleep timer. For a full hour without a browser, see the videos on <a href="${CHANNEL}" rel="noopener">our YouTube channel</a>.</p>`,
    faqs: [
      { q: "Is pink noise better than white noise for sleep?", a: "Many people find pink noise more comfortable because it is less hissy. Lab studies of timed pink noise bursts are promising, but there is no strong evidence that playing pink noise all night beats white noise." },
      { q: "What is brown noise good for?", a: "Brown noise is deep and rumbly, like heavy rain or wind. People use it to mask low background noise and many find it calming. Evidence is mostly anecdotal." },
      { q: "Is it bad to sleep with white noise every night?", a: "For most adults it is fine at a low volume. Keep it quiet and the speaker away from your head. If you want to sleep without it eventually, wean down the volume gradually." },
      { q: "What volume should sleep sounds be?", a: "Low: just loud enough to soften background noise and quieter than normal conversation." },
    ],
  },
  {
    slug: "relaxation", og: "bells", article: true,
    title: "How to Relax Before Bed: 20-Minute Wind-Down | Soothing Sleep",
    description: "A simple 20-minute routine to relax before bed and rest better: dim the lights, slow breathing, muscle relaxation, a to-do list and calming sound.",
    h1: "How to relax before bed: a 20-minute wind-down",
    lede: "Falling asleep is easier when your body and mind are already slowing down. This routine takes about 20 minutes, needs no equipment, and works for rest even on nights you do not sleep well.",
    answer: "To relax before bed, give yourself 20 minutes of wind-down: dim the lights and put screens away, write tomorrow's to-do list, do a few minutes of slow breathing with a longer exhale, relax each muscle group in turn, and play a quiet, steady sound if it helps.",
    body: `
      <h2>The 20-minute wind-down</h2>
      <ol>
        <li><strong>Minute 0 to 3: lights down, screens away.</strong> Switch to warm, low lamps and put your phone out of reach. This is the cue that the day is over.</li>
        <li><strong>Minute 3 to 6: write tomorrow's to-do list.</strong> In a sleep lab study, people who spent five minutes writing a to-do list fell asleep faster than those who wrote about tasks they had already finished (${SRC.scullin}).</li>
        <li><strong>Minute 6 to 11: slow breathing.</strong> Breathe in through your nose for about 4 seconds and out for about 6. Slow breathing near six breaths a minute is linked with calmer heart rate and mood (${SRC.zaccaro}).</li>
        <li><strong>Minute 11 to 17: progressive muscle relaxation.</strong> Starting at your feet, tense each muscle group gently for 5 seconds, then let it go for 10. Work up to your face.</li>
        <li><strong>Minute 17 to 20: sound and stillness.</strong> Lie down with a quiet, steady sound such as <a href="${MIXER}/ocean-sounds/">ocean waves</a>, <a href="${MIXER}/light-rain-sounds/">light rain</a> or <a href="${MIXER}/tibetan-singing-bowls/">singing bowls</a>, and let your breathing follow it.</li>
      </ol>

      <h2>Rest counts, even when sleep does not come</h2>
      <p>Lying still with a relaxed body and slow breathing is restful, even if you stay awake. Trying hard to sleep usually backfires. Aim to relax, and let sleep arrive when it does. If you are still wide awake after about 20 minutes, get up, read something calm in dim light, and return when you feel sleepy.</p>

      <h2>Relaxation sounds to try</h2>
      <ul>
        <li><strong>Ocean waves</strong>: one wave every 7 to 12 seconds is a natural breathing guide.</li>
        <li><strong>Tibetan singing bowls</strong>: long, fading tones for meditation and the last minutes before sleep.</li>
        <li><strong>Light rain or a river</strong>: soft, steady and easy to ignore.</li>
      </ul>
      <p>All of these are free in the <a href="${MIXER}/">Canopy &amp; Tide mixer</a>, with a sleep timer so the sound fades once you drift off. For a broader plan, read <a href="/sleepmaxxing">sleepmaxxing: what actually works</a>.</p>`,
    faqs: [
      { q: "How can I relax my mind before bed?", a: "Write tomorrow's to-do list to get tasks out of your head, then do a few minutes of slow breathing with a longer exhale than inhale." },
      { q: "What is the 4-6 breathing technique?", a: "Breathe in for about 4 seconds and out for about 6, which works out to around six breaths a minute. A longer exhale helps many people feel calmer." },
      { q: "Is resting in bed as good as sleeping?", a: "No, but it still helps. Quiet, relaxed rest lowers arousal and makes falling asleep more likely. Avoid forcing sleep; focus on relaxing instead." },
      { q: "What sounds are best for relaxation?", a: "Slow, steady sounds: ocean waves, light rain, a stream or singing bowls. Choose one you find pleasant and keep it quiet." },
    ],
  },
];

const url = p => `${SITE}/${p.slug}`;

function jsonld(p) {
  const graph = [ORG];
  if (p.home) {
    graph.push({ "@type": "WebSite", "@id": `${SITE}/#site`, name: "Soothing Sleep", url: `${SITE}/`, publisher: { "@id": `${SITE}/#org` } });
    graph.push({
      "@type": "ItemList", name: "Hour-long 3D sleep sounds",
      itemListElement: VIDEOS.map((v, i) => ({
        "@type": "ListItem", position: i + 1, item: {
          "@type": "VideoObject", name: v.title, description: vDesc(v),
          thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`, uploadDate: v.date, duration: vDur(v),
          embedUrl: `https://www.youtube.com/embed/${v.id}`, contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
        },
      })),
    });
  } else {
    graph.push({
      "@type": "Article", "@id": `${url(p)}#article`, headline: p.h1, description: p.description,
      url: url(p), mainEntityOfPage: url(p), image: `${SITE}/og/${p.og}.jpg`,
      datePublished: UPDATED, dateModified: UPDATED,
      author: { "@id": `${SITE}/#org` }, publisher: { "@id": `${SITE}/#org` },
    });
    graph.push({ "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Soothing Sleep", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: p.h1, item: url(p) },
    ] });
  }
  graph.push({ "@type": "FAQPage", mainEntity: p.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

const CSS = `
:root {
  --bg: #0d1020; --surface: #151a30; --line: #262c4a; --fg: #e7e9f4; --muted: #9aa0c0;
  --moon: #f0d9a0; --moon-ink: #1a1508; --link: #b9c4ff;
  --display: "Young Serif", Georgia, serif; --body: "Figtree", system-ui, -apple-system, "Segoe UI", sans-serif;
  color-scheme: dark;
}
@media (prefers-color-scheme: light) { :root { --bg: #f4f3ee; --surface: #fff; --line: #dcdbe6; --fg: #181a2c; --muted: #575b78; --moon: #8a5a12; --moon-ink: #fffaf0; --link: #3843a8; color-scheme: light; } }
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--fg); font: 400 1.0625rem/1.65 var(--body);
  padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
.wrap { max-width: 1000px; margin: 0 auto; display: grid; gap: 2.75rem; padding-block: 1.25rem 3rem; }
nav { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .75rem 1.5rem; }
nav .brand { font: 400 1.35rem/1 var(--display); color: var(--fg); text-decoration: none; }
nav .brand span { color: var(--moon); }
nav ul { list-style: none; display: flex; flex-wrap: wrap; gap: .25rem 1.25rem; margin: 0; padding: 0; font-size: .95rem; }
nav a { color: var(--muted); text-decoration: none; } nav a:hover, nav a[aria-current] { color: var(--fg); }
header.hero { display: grid; gap: 1rem; padding-top: 1.5rem; }
h1 { font: 400 clamp(2.2rem, 6vw, 3.6rem)/1.05 var(--display); margin: 0; text-wrap: balance; max-width: 20ch; }
.lede { margin: 0; color: var(--muted); font-size: 1.15rem; max-width: 62ch; }
.cta { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: .5rem; }
.btn { display: inline-flex; align-items: center; gap: .5rem; padding: .8rem 1.3rem; border-radius: 999px; font-weight: 600; text-decoration: none; border: 1px solid var(--line); color: var(--fg); background: var(--surface); }
.btn.primary { background: var(--moon); color: var(--moon-ink); border-color: var(--moon); }
.answer { font-size: 1.15rem; border-left: 3px solid var(--moon); padding-left: 1rem; margin: 0; max-width: 68ch; }
main { display: grid; gap: 2.75rem; }
article.prose { display: grid; gap: 1rem; max-width: 70ch; min-width: 0; }
article.prose h2, section h2 { font: 400 clamp(1.5rem, 3.6vw, 2rem)/1.15 var(--display); margin: 1rem 0 0; text-wrap: balance; }
article.prose p, article.prose li { margin: 0; }
article.prose ol, article.prose ul { margin: 0; padding-left: 1.3rem; display: grid; gap: .55rem; }
a { color: var(--link); }
.table { overflow-x: auto; border: 1px solid var(--line); border-radius: 12px; }
table { border-collapse: collapse; width: 100%; min-width: 560px; font-size: .95rem; }
th, td { text-align: left; vertical-align: top; padding: .65rem .85rem; border-bottom: 1px solid var(--line); }
th { color: var(--muted); font-weight: 600; font-size: .8rem; text-transform: uppercase; letter-spacing: .06em; }
tr:last-child td { border-bottom: 0; }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr)); gap: 1rem; }
.card { display: grid; gap: .5rem; text-decoration: none; color: var(--fg); background: var(--surface); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; }
.card img { width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; display: block; max-width: 100%; background: var(--line); }
.card div { padding: .2rem 1rem 1rem; display: grid; gap: .25rem; }
.card strong { font: 400 1.2rem/1.2 var(--display); }
.card span { color: var(--muted); font-size: .9rem; }
.faq { display: grid; gap: .6rem; max-width: 70ch; }
details { border: 1px solid var(--line); border-radius: 10px; padding: .8rem 1rem; background: var(--surface); }
summary { cursor: pointer; font-weight: 600; }
details p { margin: .6rem 0 0; color: var(--muted); }
.meta { color: var(--muted); font-size: .9rem; }
footer { border-top: 1px solid var(--line); padding-top: 1.25rem; color: var(--muted); font-size: .9rem; display: grid; gap: .5rem; }
footer p { margin: 0; }
footer .ph-badge { display: inline-block; line-height: 0; }
a:focus-visible, summary:focus-visible { outline: 2px solid var(--moon); outline-offset: 3px; }
`;

function page(p) {
  const nav = [["/sleepmaxxing", "Sleepmaxxing"], ["/sleep-sounds", "Sleep sounds"], ["/relaxation", "Relaxation"], [`${MIXER}/`, "Free mixer"], [SUB, "YouTube"]];
  const img = `${SITE}/og/${p.og}.jpg`;
  const main = p.home ? `
    <section aria-labelledby="videos">
      <h2 id="videos">Hour-long 3D sleep sounds</h2>
      <p class="meta">Uninterrupted sleep sounds, from one hour in 3D to a full night with a dark screen. Best on headphones.</p>
      <div class="cards">
        ${VIDEOS.map(v => `<a class="card" href="https://www.youtube.com/watch?v=${v.id}" rel="noopener"><img src="https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg" alt="${esc(v.name)} sounds for sleep, ${esc(vLen(v).split(" · ")[0])}" loading="lazy" width="1280" height="720"><div><strong>${esc(v.name)}</strong><span>${esc(vLen(v))} · YouTube</span></div></a>`).join("\n        ")}
      </div>
    </section>
    <section aria-labelledby="guides">
      <h2 id="guides">Sleep guides</h2>
      <div class="cards">
        ${PAGES.filter(g => g.article).map(g => `<a class="card" href="/${g.slug}"><div style="padding-top:1rem"><strong>${esc(g.h1)}</strong><span>${esc(g.description)}</span></div></a>`).join("\n        ")}
      </div>
    </section>
    <section aria-labelledby="mixer">
      <h2 id="mixer">Make your own sleep mix</h2>
      <p class="lede">Canopy &amp; Tide is our free browser sound mixer: rain, thunderstorm, ocean waves, forest, river, wind, light rain and Tibetan singing bowls in 3D, with a sleep timer. Nothing to install.</p>
      <div class="cta"><a class="btn primary" href="${MIXER}/">Open the free mixer</a><a class="btn" href="${MIXER}/rain-sounds/">Rain sounds</a><a class="btn" href="${MIXER}/ocean-sounds/">Ocean sounds</a></div>
    </section>` : `
    <article class="prose">
      <p class="answer">${esc(p.answer)}</p>
      ${p.body}
      <p class="meta">Updated ${UPDATED} by Soothing Sleep. This guide is general information, not medical advice. If sleep problems persist, see a doctor.</p>
    </article>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${url(p)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="#0d1020">
<meta property="og:type" content="${p.article ? "article" : "website"}">
<meta property="og:site_name" content="Soothing Sleep">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url(p)}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${img}">
<link rel="icon" href="${MIXER}/icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Figtree:wght@400;600&display=swap">
<style>${CSS}</style>
<script type="application/ld+json">${jsonld(p)}</script>
</head>
<body>
<div class="wrap">
  <nav aria-label="Main">
    <a class="brand" href="/">Soothing <span>Sleep</span></a>
    <ul>${nav.map(([h, t]) => `<li><a href="${h}"${h === "/" + p.slug ? ' aria-current="page"' : ""}${h.startsWith("http") ? ' rel="noopener"' : ""}>${t}</a></li>`).join("")}</ul>
  </nav>
  <header class="hero">
    <h1>${esc(p.h1)}</h1>
    <p class="lede">${esc(p.lede)}</p>
    ${p.home ? `<p class="answer">Soothing Sleep is a sleep and relaxation channel and site. Watch hour-long 3D nature sounds on YouTube, build your own mix in the free Canopy &amp; Tide player, or read short, evidence-based guides to sleeping and resting better.</p>
    <div class="cta"><a class="btn primary" href="${SUB}" rel="noopener">Subscribe on YouTube</a><a class="btn" href="${MIXER}/">Open the free sound mixer</a></div>` : ""}
  </header>
  <main>
    ${main}
    <section class="faq" aria-labelledby="faq">
      <h2 id="faq">Frequently asked questions</h2>
      ${p.faqs.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("\n      ")}
    </section>
  </main>
  <footer>
    <p><strong>Soothing Sleep</strong> · <a href="${SUB}" rel="noopener">YouTube @SleepSooth</a> · <a href="${MIXER}/">Canopy &amp; Tide mixer</a></p>
    <p>Guides: <a href="/sleepmaxxing">Sleepmaxxing</a> · <a href="/sleep-sounds">White, pink and brown noise</a> · <a href="/relaxation">How to relax before bed</a></p>
    <p>Information on this site is general and not a substitute for medical advice.</p>
    <p><a class="ph-badge" href="https://www.producthunt.com/products/canopy-tide?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-canopy-tide" target="_blank" rel="noopener noreferrer"><picture><source media="(prefers-color-scheme: light)" srcset="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1288305&amp;theme=light&amp;t=1792608722700"><img alt="Canopy &amp; Tide - Free 3D sleep sounds with no loop point, in your browser | Product Hunt" width="250" height="54" loading="lazy" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1288305&amp;theme=dark&amp;t=1792608722700"></picture></a></p>
  </footer>
</div>
</body>
</html>
`;
}

for (const p of PAGES) {
  const file = p.slug ? path.join(out, p.slug, "index.html") : path.join(out, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(p));
}

fs.mkdirSync(path.join(out, "og"), { recursive: true });
for (const name of new Set(PAGES.map(p => p.og))) {
  const dest = path.join(out, "og", `${name}.jpg`);
  if (fs.existsSync(dest)) continue;
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", path.join(process.env.OG_IMAGE_DIR || path.join(here, "youtube", "images"), `${name}.png`),
    "-vf", "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630", "-q:v", "3", dest]);
}

fs.writeFileSync(path.join(out, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(path.join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(p => `  <url><loc>${p.slug ? url(p) : SITE + "/"}</loc><lastmod>${UPDATED}</lastmod></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(out, "llms.txt"), `# Soothing Sleep

> Soothing Sleep (YouTube @SleepSooth) publishes hour-long 3D nature sound videos for sleep and relaxation, runs the free Canopy & Tide browser sound mixer, and writes short evidence-based guides on sleep, rest, relaxation and sleepmaxxing.

## Guides
${PAGES.filter(p => p.article).map(p => `- [${p.h1}](${url(p)}): ${strip(p.answer)}`).join("\n")}

## Videos (1 hour each, 3D audio)
${VIDEOS.map(v => `- [${v.title}](https://www.youtube.com/watch?v=${v.id})`).join("\n")}

## Tools
- [Canopy & Tide](${MIXER}/): free 3D sleep sound mixer with rain, thunderstorm, ocean, forest, river, wind, light rain and Tibetan singing bowls, and a sleep timer.

## Quick facts
- Adults should sleep 7 or more hours a night (AASM and Sleep Research Society consensus, Watson et al. 2015).
- Continuous background noise mainly helps by masking disruptive sounds; overall evidence that it improves sleep is very low quality (Riedy et al. 2021).
- CBT-I is the first-line treatment for chronic insomnia (AASM guideline, Edinger et al. 2021).
- Mouth taping has weak evidence and possible risks (PLOS One systematic review, 2025).
`);
console.log(`built ${PAGES.length} pages into ${out}`);

// Page data for canopytide.com. Each page reuses the mixer and adds its own
// title, headline, preset and a short answer-first guide with FAQs.
export const SITE = "https://canopytide.com";
export const HUB = "https://sleepsooth.com";
export const CHANNEL = "https://www.youtube.com/@SleepSooth";
export const UPDATED = "2026-10-28";
// Other Soothing Sleep profiles. Fill each one in once it is live and confirmed as ours: they go into the
// Organization sameAs on both sites, and spotify also drives the sleepsooth.com/spotify short link.
// Left empty, a profile is simply omitted (never list a URL we haven't confirmed belongs to us).
export const PROFILES = {
  spotify: "",     // https://open.spotify.com/artist/<id> (from Spotify for Artists)
  appleMusic: "",  // https://music.apple.com/us/artist/soothing-sleep/<id>
  kofi: "",        // https://ko-fi.com/sleepsooth
  pinterest: "",   // https://www.pinterest.com/<handle>/
};

export const VIDEOS = {
  forest: { id: "Ovi1t67XL3U", title: "Forest Sounds for Sleep | 3D Audio 1 Hour Deep Sleep & Relaxation", date: "2026-10-19T23:18:43-07:00" },
  rain: { id: "kSrfISnnYjM", title: "Tropical Rain Sounds for Sleep | 3D Audio 1 Hour Deep Sleep & Relaxation", date: "2026-10-19T23:01:12-07:00" },
  river: { id: "eo2tkngnfEE", title: "River Stream Sounds for Sleep | 3D Audio 1 Hour Deep Sleep & Relaxation", date: "2026-10-19T23:17:21-07:00" },
  bells: { id: "QlD2SlOvIJ8", title: "Tibetan Singing Bowls for Sleep | 3D Audio 1 Hour Deep Sleep & Meditation", date: "2026-10-20T14:02:00-07:00" },
  ocean: { id: "ayAra16BQnA", title: "Ocean Waves Sounds for Sleep | 3D Audio 1 Hour Deep Sleep & Relaxation", date: "2026-10-19T23:18:03-07:00" },
  tinroof: { id: "HzTH8GMVWII", title: "Heavy Rain on a Tin Roof for Sleep | 10 Hours Dark Screen 🌧️ Wind & Wind Chimes", date: "2026-10-22",
    dur: "PT10H", desc: "Heavy rain on a tin roof with wind and wind chimes: ten hours, with a dark screen after three minutes, from Soothing Sleep.",
    blurb: "Want the whole night with a dark screen? Try" },
  pianorain: { id: "xOsWyDAzIgM", title: "Soft Piano & Gentle Rain for Sleep | 10 Hours Dark Screen 🌧️ Calm Lake at Night", date: "2026-10-26",
    dur: "PT10H", desc: "Soft piano and cello over a river, fine drizzle and distant rain: ten hours over a dark, slowly moving lake at night, from Soothing Sleep.",
    blurb: "Prefer soft piano with your rain? Try" },
};

const INFANT = `If you use it for a baby, keep the volume low and the speaker well away from the cot. A 2014 study in <em>Pediatrics</em> found some infant sleep machines could exceed safe noise levels at full volume when placed close by (<a href="https://doi.org/10.1542/peds.2013-3617" rel="noopener">Hugh et al., 2014</a>).`;

const common = [
  { q: "Is Canopy & Tide free?", a: "Yes. It runs in your browser with no sign-up, no ads and no downloads, and every sound loops for as long as you leave it playing." },
  { q: "Do I need headphones?", a: "No, speakers work well. Headphones make the 3D placement much clearer, so sounds seem to come from around, above and behind you." },
];

export const PAGES = [
  {
    slug: "",
    og: "rain",
    title: "Free 3D Sleep Sounds & Nature Sound Mixer | Canopy & Tide",
    description: "Free sleep sounds in 3D: rain, thunderstorm, ocean waves, forest, river, wind and Tibetan bowls. Mix them, set a sleep timer and play all night. No sign-up.",
    eyebrow: "By Soothing Sleep · free 3D sleep sound mixer",
    h1sub: "Free 3D sleep sounds and relaxing nature sounds",
    lede: "Rain, a thunderstorm, ocean waves, forest birdsong, a river stream, wind, light drizzle, Tibetan singing bowls and brown, pink and white noise, each generated live in your browser and placed around you in 3D. Nothing repeats on a short loop, so you can leave it on all night. Mix sounds, set a sleep timer and drift off.",
    answer: "Canopy & Tide is a free online sleep sound mixer. Pick one or more nature sounds, adjust each level, add a sleep timer and press Play. It works in any modern browser, on phone or desktop, with no app or account.",
    sections: [
      ["What makes these sleep sounds different", `<p>Most sleep sound apps replay a short recording, and the loop point becomes noticeable after a while. Here every sound is synthesized as it plays: raindrops, bird calls, bubbles and bell strikes are scheduled at random, so the soundscape keeps changing in small ways and never cycles.</p><p>Each source also has a position in space. Drops land around you, waves break in front, birds call from the canopy above, and with <strong>Distance variation</strong> on, every sound slowly drifts nearer and farther. You can switch both effects off in the Space panel if you prefer plain stereo.</p>`],
      ["How to use sleep sounds for better rest", `<ul><li><strong>Keep it quiet.</strong> Set the level just loud enough to soften sudden noises like traffic or a partner snoring. It should never compete with conversation.</li><li><strong>Use a timer if sound wakes you.</strong> A 30 to 60 minute fade covers the time it usually takes to fall asleep.</li><li><strong>Pick steady sounds for masking.</strong> Rain and ocean waves cover background noise best. Forest and bells are better for winding down than for masking.</li><li><strong>Make it a routine.</strong> Starting the same mix every night can become a cue that it is time to sleep.</li></ul>`],
      ["Does background noise actually help you sleep?", `<p>The honest answer is that it helps some people, mainly by masking disruptive noise, and the research is still thin. A 2021 systematic review rated the overall evidence that continuous noise improves sleep as very low quality (<a href="https://doi.org/10.1016/j.smrv.2020.101385" rel="noopener">Riedy et al., 2021</a>). Lab studies using carefully timed pink-noise pulses during deep sleep are promising, but that is a different technique from playing sound all night. Our <a href="${HUB}/sleep-sounds">guide to white, pink and brown noise</a> covers what is known.</p><p class="note">Canopy &amp; Tide is a relaxation tool, not a medical device. If you regularly struggle to sleep, talk to a doctor; cognitive behavioural therapy for insomnia (CBT-I) is the first-line treatment recommended by the American Academy of Sleep Medicine.</p>`],
    ],
    faqs: [
      ...common,
      { q: "What are the best sounds for sleep?", a: "Steady, broadband sounds such as rain, ocean waves and wind are best for masking noise. Many people find nature sounds more pleasant than white noise. Try a few for a week each and keep the one you find easiest to ignore." },
      { q: "Can I play sleep sounds all night?", a: "Yes. The sounds never stop or cut out. If you would rather they fade once you are asleep, choose a 15, 30, 60 or 90 minute sleep timer." },
      { q: "Does it work on iPhone?", a: "Yes, in Safari or Chrome. Turn off silent mode, because iOS mutes web audio when the ring switch is set to silent." },
    ],
  },
  {
    slug: "rain-sounds", sound: "rain", og: "rain",
    preset: { rain: 75 },
    title: "Rain Sounds for Sleep: Free 3D Tropical Rain | Canopy & Tide",
    description: "Free tropical rain sounds for sleep in 3D: steady downpour, drops on leaves, distant thunder. Endless, no loops, with a sleep timer. Play in your browser.",
    h1sub: "Rain sounds for sleep",
    lede: "A warm tropical downpour that never loops: a steady wash of rain, individual drops landing on leaves all around you, a low drum on the canopy and the occasional roll of distant thunder.",
    answer: "Rain is one of the most popular sleep sounds because it is steady, broadband and natural, so it masks traffic and household noise without drawing attention. Press Play to start an endless tropical rain in 3D, then set a sleep timer if you want it to fade.",
    sections: [
      ["What you will hear", `<p>The rain is built in layers: a soft broadband wash (roughly 0.5 to 9 kHz), about 70 individual drops a second placed around and above you, a low canopy drum under 900 Hz and gusts that make the shower swell and ease. Every minute or two, thunder rolls in from a different direction far away.</p>`],
      ["Why rain sounds help people sleep", `<p>Rain covers a wide range of frequencies at a fairly even level, which makes it good at hiding sudden sounds like a door, a car or a neighbour. It is also predictable, so the brain quickly stops paying attention to it. Many people simply associate rain with being warm and indoors.</p>`],
      ["Good rain mixes", `<ul><li><strong>Rainforest:</strong> rain plus forest birdsong, for winding down.</li><li><strong>Monsoon:</strong> heavy rain with ocean waves, for maximum masking.</li><li>Prefer something gentler? Try <a href="/light-rain-sounds">light rain sounds</a>. Want it heavier? Try <a href="/thunderstorm-sounds">thunderstorm sounds</a>.</li></ul><p>${INFANT}</p>`],
    ],
    faqs: [
      { q: "Is rain or white noise better for sleep?", a: "Both mask noise. Rain has more energy in the low and mid frequencies, closer to pink or brown noise, which many people find less harsh than white noise. Use whichever you find easiest to ignore." },
      { q: "Does the thunder get loud?", a: "No. In the tropical rain sound, thunder is distant and appears every one to two minutes. For closer, more frequent thunder use the thunderstorm sound." },
      ...common,
    ],
    video: ["rain", "tinroof", "pianorain"],
  },
  {
    slug: "thunderstorm-sounds", sound: "storm", og: "rain",
    preset: { storm: 80, wind: 30 },
    title: "Thunderstorm Sounds for Sleep: Free 3D Storm | Canopy & Tide",
    description: "Free thunderstorm sounds for sleep: heavy rain, driving wind and rolling thunder from every direction in 3D. Endless, no loops, with a sleep timer.",
    h1sub: "Thunderstorm sounds for sleep",
    lede: "Heavy rain driven by wind, with thunder that rolls in every 14 to 38 seconds from different directions and distances. About a third of strikes are close, with a sharp crack before the rumble.",
    answer: "Thunderstorm sounds combine heavy rain, wind and low rolling thunder. The rain masks background noise while the deep rumbles feel cosy and enveloping. Press Play for an endless 3D storm; lower the level if the close cracks keep you alert.",
    sections: [
      ["What you will hear", `<p>A dense downpour of around 140 drops a second, a wind layer whose pitch rises with each gust, and thunder that rolls in two to four swells. Each strike comes from its own position in the sky, and near strikes arrive with a bright crack first, the way real lightning does.</p>`],
      ["Who thunderstorm sounds suit", `<p>Storms are the best choice if you like a heavy, enveloping sound or need to cover a lot of noise. If sudden cracks make you jump, use <a href="/rain-sounds">tropical rain</a> instead, where thunder stays distant and rare.</p>`],
      ["Pair it with", `<ul><li><strong>Stormy night:</strong> the storm with extra wind.</li><li>Add <a href="/ocean-sounds">ocean waves</a> for a coastal storm.</li></ul>`],
    ],
    faqs: [
      { q: "Are thunderstorm sounds good for sleep?", a: "Many people love them, because heavy rain masks noise and low rumbles feel calming. If the louder strikes wake you, lower the level or switch to plain rain sounds." },
      { q: "How often does it thunder?", a: "Roughly every 14 to 38 seconds, from a different direction each time, with about one strike in three close enough to crack." },
      ...common,
    ],
  },
  {
    slug: "ocean-sounds", sound: "ocean", og: "ocean",
    preset: { ocean: 80 },
    title: "Ocean Waves Sounds for Sleep: Free 3D Waves | Canopy & Tide",
    description: "Free ocean waves sounds for sleep: two swell trains breaking left and right in 3D, 7 to 12 seconds apart. Endless, no loops, with a sleep timer.",
    h1sub: "Ocean waves sounds for sleep",
    lede: "Gentle surf on an empty beach. Two sets of swells break in front of you, one to the left and one to the right, each wave 7 to 12 seconds apart, rising, crashing and washing back with foam.",
    answer: "Ocean wave sounds are slow and rhythmic, roughly matching a calm breathing pace, which is why many people use them to relax and fall asleep. Press Play for endless 3D waves and set a sleep timer if you want them to fade out.",
    sections: [
      ["What you will hear", `<p>Each wave is shaped individually: a low surf that swells from about 280 Hz up to 3 kHz as it breaks, followed by a hissing foam wash. Wave size and timing vary randomly, and the two swell trains drift slowly along the shore.</p>`],
      ["Why waves are relaxing", `<p>A wave every 7 to 12 seconds is close to slow, relaxed breathing. Some people breathe along with the swell: in as it builds, out as it washes back. Waves also mask noise well during the louder part of each cycle.</p>`],
      ["Good ocean mixes", `<ul><li><strong>Coastline:</strong> waves on their own.</li><li><strong>Windswept coast:</strong> waves with wind.</li><li><strong>Monsoon:</strong> waves under heavy <a href="/rain-sounds">rain</a>.</li></ul>`],
    ],
    faqs: [
      { q: "Are ocean sounds good for sleep?", a: "Yes for many people. The slow rhythm encourages relaxed breathing, and the surf masks background noise. If the gaps between waves let noise through, add rain or wind underneath." },
      { q: "Can I breathe along with the waves?", a: "Yes. Breathe in as a wave builds and out as it washes back. At 7 to 12 seconds per wave this is a slow, calming pace." },
      ...common,
    ],
    video: "ocean",
  },
  {
    slug: "forest-sounds", sound: "forest", og: "forest",
    preset: { forest: 75 },
    title: "Forest Sounds for Sleep: Free 3D Birdsong | Canopy & Tide",
    description: "Free forest sounds for sleep and relaxation: wind in the trees, rustling leaves and birdsong from the canopy around you in 3D. Endless, with a sleep timer.",
    h1sub: "Forest sounds for sleep and relaxation",
    lede: "Wind moving through tall trees, leaves rustling and birds calling from the canopy around and above you: whistled phrases, fast trills, rising chirps and a soft dove-like coo.",
    answer: "Forest sounds pair a soft wind bed with birdsong. They are best for relaxing, reading or winding down, and lighter than rain for masking. Press Play to step into an endless 3D forest.",
    sections: [
      ["What you will hear", `<p>A wind band around 600 Hz rises and falls in gusts, with leaf rustle near 3.5 kHz. Every few seconds a bird calls from its own spot 2 to 14 metres away, using one of four call types between 0.6 and 5.5 kHz. Farther birds sound softer and duller, the way they do outdoors.</p>`],
      ["Best uses", `<p>Forest sounds are lovely for an evening wind-down, meditation or focus. For sleeping through noise, combine them with rain (<strong>Rainforest</strong> mix) or a river (<strong>Riverside</strong> mix), because birdsong alone has quiet gaps.</p>`],
    ],
    faqs: [
      { q: "Will birdsong keep me awake?", a: "It can for light sleepers. Use the forest as a wind-down sound with a 30 minute timer, or mix it under rain so the calls blend into the background." },
      ...common,
    ],
    video: "forest",
  },
  {
    slug: "river-sounds", sound: "river", og: "river",
    preset: { river: 75, forest: 25 },
    title: "River & Stream Sounds for Sleep: Free 3D | Canopy & Tide",
    description: "Free river and stream sounds for sleep and focus: a babbling brook with bubbling water flowing low in front of you in 3D. Endless, no loops.",
    h1sub: "River and stream sounds for sleep",
    lede: "A clear stream running over stones just in front of you: a soft flowing bed, about 45 bubbles a second rising in pitch, and a bright sparkle on the surface.",
    answer: "Stream sounds are continuous and gently textured, which makes them good for both sleep and concentration. Press Play for an endless babbling brook in 3D.",
    sections: [
      ["What you will hear", `<p>The bubbling is modelled on how real air bubbles ring in water: each one is a short tone that rises in pitch, between roughly 0.3 and 3 kHz. They sit over a flowing water bed near 900 Hz with surface sparkle above 3 kHz, all placed low and in front of you.</p>`],
      ["Best uses", `<p>A stream is steadier than birdsong and softer than rain, so it suits studying, working and falling asleep. The <strong>Riverside</strong> mix adds forest birds.</p>`],
    ],
    faqs: [
      { q: "Is a river sound good for focus?", a: "Many people find flowing water easier to work to than silence, because it covers distracting chatter without demanding attention." },
      ...common,
    ],
    video: "river",
  },
  {
    slug: "light-rain-sounds", sound: "drizzle", og: "rain",
    preset: { drizzle: 75 },
    title: "Light Rain Sounds for Sleep: Free 3D Drizzle | Canopy & Tide",
    description: "Free light rain and drizzle sounds for sleep: a soft mist of fine droplets and slow drips into puddles around you in 3D. Gentle, endless, no loops.",
    h1sub: "Light rain and drizzle sounds for sleep",
    lede: "A soft, quiet drizzle: a fine mist of droplets settling all around you and the occasional slow drip into a puddle from the eaves.",
    answer: "Light rain is the gentlest of the rain sounds, good if you like a quiet background or find heavy rain too intense. Press Play for an endless 3D drizzle.",
    sections: [
      ["What you will hear", `<p>A fine high mist between 1.5 and 7 kHz, around 28 tiny droplets a second, and pitched drips into puddles between 0.9 and 2.4 kHz, all landing within a few metres of you.</p>`],
      ["Best uses", `<p>Drizzle is ideal for reading, relaxing and light sleepers who want sound without volume. To mask more noise, step up to <a href="/rain-sounds">tropical rain</a>. The <strong>Soft drizzle</strong> mix adds a little forest.</p>`],
    ],
    faqs: [
      { q: "What is the difference between light rain and rain sounds?", a: "Light rain is quieter and sparser, with fine droplets and drips. The tropical rain sound is a full downpour that masks much more background noise." },
      ...common,
    ],
  },
  {
    slug: "wind-sounds", sound: "wind", og: "forest",
    preset: { wind: 70 },
    title: "Wind Sounds for Sleep: Free 3D Howling Wind | Canopy & Tide",
    description: "Free wind sounds for sleep: a low rumble with howling gusts that sweep around you in 3D. Endless, no loops, with a sleep timer.",
    h1sub: "Wind sounds for sleep",
    lede: "A low, steady rumble with two howling gusts that sweep around you as they pass, whistling higher as they strengthen, over a soft hiss of moving air.",
    answer: "Wind is a deep, continuous sound that many people find cosy, especially paired with rain or ocean waves. Press Play for endless 3D wind.",
    sections: [
      ["What you will hear", `<p>A rumble under 250 Hz, two howling voices between about 280 Hz and 1.8 kHz that circle the listener, and air hiss above 4 kHz. Gust strength changes every few seconds.</p>`],
      ["Pair it with", `<ul><li><strong>Windswept coast:</strong> wind with <a href="/ocean-sounds">ocean waves</a>.</li><li><strong>Stormy night:</strong> wind with a <a href="/thunderstorm-sounds">thunderstorm</a>.</li></ul>`],
    ],
    faqs: [
      { q: "Are wind sounds good for sleep?", a: "Yes for people who like deep, enveloping sound. The low rumble behaves a little like brown noise. If the howling feels eerie, lower the level or mix it under rain." },
      ...common,
    ],
  },
  {
    slug: "tibetan-singing-bowls", sound: "bells", og: "bells",
    preset: { bells: 70, drizzle: 30 },
    title: "Tibetan Singing Bowls for Sleep & Meditation | Canopy & Tide",
    description: "Free Tibetan singing bowl, tingsha and ghanta bell sounds for meditation and sleep. Random strikes that circle you in 3D. Endless and never repeating.",
    h1sub: "Tibetan singing bowls and bells for meditation and sleep",
    lede: "Struck and rubbed singing bowls, bright tingsha cymbals and a ghanta hand bell, played at random. Each strike rings out from its own place around you and slowly circles as it fades.",
    answer: "Singing bowl sounds are long, slowly fading tones that many people use for meditation and winding down before bed. Press Play for endless, randomized Tibetan bells in 3D.",
    sections: [
      ["What you will hear", `<p>Bowls are tuned to a pentatonic scale between 110 and 330 Hz, so overlapping tones stay consonant. Each bowl rings with inharmonic partials close to 1 : 2.76 : 5.4 : 8.9 and a gentle beating "wah" as it fades over 10 to 20 seconds. Tingsha sit around 2.3 to 3.1 kHz and are usually struck twice; the ghanta rings in a short run of strikes.</p>`],
      ["How the 3D movement works", `<p>Every strike gets its own position 1 to 10 metres away and travels an arc of 60 to 200 degrees around you while it rings, rising or falling as it goes. With headphones the tones seem to orbit the room. Switch off <strong>3D spatial sound</strong> for still, plain stereo bells.</p>`],
      ["Best uses", `<p>Use bowls for meditation, breathwork, yoga nidra or the last minutes before sleep. For sleeping, the <strong>Monastery rain</strong> mix adds soft drizzle so the space between strikes is never silent. See our <a href="${HUB}/relaxation">wind-down routine</a>.</p>`],
    ],
    faqs: [
      { q: "Are singing bowls good for sleep?", a: "They are best for relaxing before sleep. Strikes are spaced 3 to 11 seconds apart, so pair them with light rain or set a 30 minute timer if the gaps keep you listening." },
      { q: "Are these real recordings?", a: "No. Each bowl, cymbal and bell is synthesized from its measured overtone pattern, so every strike is slightly different and the session never repeats." },
      ...common,
    ],
    video: "bells",
  },
  {
    slug: "brown-noise", sound: "brown", og: "storm",
    preset: { brown: 70 },
    title: "Brown Noise for Sleep: Free, Endless & Deep | Canopy & Tide",
    description: "Free brown noise for sleep and focus: a deep, soft rumble like distant surf or heavy rain, generated live in your browser. Endless, with a sleep timer.",
    h1sub: "Brown noise for sleep and focus",
    lede: "A deep, warm rumble with most of its energy in the low frequencies, softened above about 1.5 kHz and gently swaying in level so it never feels completely flat.",
    answer: "Brown noise is random noise whose energy falls by about 6 dB per octave, so it sounds deep and rumbly, like distant surf or a strong wind, rather than hissy. Many people use it to mask low background noise for sleep or focus. Press Play for endless brown noise and set a sleep timer if you want it to fade.",
    sections: [
      ["What you will hear", `<p>Brown noise is generated live in your browser from a random signal that is smoothed so the low frequencies dominate. A soft filter above about 1.5 kHz takes off any remaining edge, and the level sways by around 12% every 8 to 16 seconds. With <strong>Distance variation</strong> and <strong>3D spatial sound</strong> on, it also drifts slowly nearer and farther and around you; switch both off for perfectly steady noise.</p>`],
      ["Why people use brown noise", `<p>Because it is darker than white or pink noise, brown noise is often described as calmer and less fatiguing, and it is good at covering low sounds such as traffic rumble, a fridge or a neighbour's music. Some people also use it to focus. Most of the evidence is anecdotal, so treat it as a comfort tool rather than a treatment: our <a href="${HUB}/sleep-sounds">guide to white, pink and brown noise</a> summarises what the research does and does not show.</p>`],
      ["Good brown noise mixes", `<ul><li><strong>Deep brown:</strong> brown noise on its own.</li><li><strong>Brown &amp; rain:</strong> brown noise under <a href="/rain-sounds">tropical rain</a>, for a fuller, more natural texture.</li><li>Prefer something a little brighter? Try <a href="/pink-noise">pink noise</a>.</li></ul>`],
    ],
    faqs: [
      { q: "Is brown noise good for sleep?", a: "Many people find it comfortable, because its deep, soft sound masks low background noise without the hiss of white noise. There is little formal research on brown noise for sleep, so try it at a low volume and see whether it helps you." },
      { q: "What is the difference between brown noise and white noise?", a: "White noise has equal energy at every frequency and sounds bright and hissy. Brown noise loses about 6 dB per octave, so its energy is concentrated in the low end and it sounds deep and rumbly." },
      { q: "Why is it called brown noise?", a: "It is named after Brownian motion, the random movement that produces this kind of signal, not after the colour. It is also called red noise." },
      common[0],
    ],
  },
  {
    slug: "pink-noise", sound: "pink", og: "river",
    preset: { pink: 55 },
    title: "Pink Noise for Sleep: Free, Endless & Gentle | Canopy & Tide",
    description: "Free pink noise for sleep and focus: a balanced, gentle hiss like steady rain or a waterfall, generated live in your browser. Endless, with a sleep timer.",
    h1sub: "Pink noise for sleep and focus",
    lede: "A balanced, gentle wash of sound with equal energy in every octave, softer than white noise and brighter than brown, with a slow sway in level.",
    answer: "Pink noise is random noise whose energy falls by about 3 dB per octave, so every octave sounds roughly equally loud. It sounds like steady rain or a waterfall and is softer than white noise. Press Play for endless pink noise and set a sleep timer if you want it to fade.",
    sections: [
      ["What you will hear", `<p>Pink noise is generated live in your browser with a filter that gives each octave about the same energy. It is softened above about 9 kHz and its level sways by around 10% every 8 to 16 seconds. Distance variation and 3D spatial sound let it drift gently around you; switch them off in the Space panel for a perfectly still sound.</p>`],
      ["What the research says about pink noise", `<p>Pink noise is often in the news because of lab studies in which short bursts of pink noise, timed to the brain's slow waves during deep sleep, strengthened those waves and improved next-day memory (<a href="https://doi.org/10.1016/j.neuron.2013.03.006" rel="noopener">Ngo et al., 2013</a>). That technique needs equipment that reads brain activity in real time, so it is not the same as playing pink noise all night. Played continuously, pink noise mainly helps by masking disruptive sounds, and the overall evidence for continuous noise improving sleep is still limited. Our <a href="${HUB}/sleep-sounds">guide to white, pink and brown noise</a> has more.</p>`],
      ["Good pink noise mixes", `<ul><li><strong>Pink surf:</strong> pink noise under <a href="/ocean-sounds">ocean waves</a>, so the quiet gaps between waves stay covered.</li><li>Want it deeper? Try <a href="/brown-noise">brown noise</a>. Want it brighter? Try <a href="/white-noise">white noise</a>.</li></ul>`],
    ],
    faqs: [
      { q: "Is pink noise better than white noise for sleep?", a: "Many people find pink noise more comfortable because it is less hissy. Lab studies of precisely timed pink noise bursts are promising, but there is no strong evidence that playing pink noise all night beats white noise." },
      { q: "What does pink noise sound like?", a: "Like steady rain, a waterfall or wind through leaves: a full, even hiss that is noticeably softer and less sharp than white noise." },
      { q: "Can pink noise help with focus?", a: "Some people find it easier to work with pink noise than in silence, because it covers distracting chatter. Results vary from person to person, so try it for a few sessions." },
      common[0],
    ],
  },
  {
    slug: "white-noise", sound: "white", og: "study",
    preset: { white: 50 },
    title: "White Noise for Sleep: Free, Endless, Steady | Canopy & Tide",
    description: "Free white noise for sleep, focus and masking: a steady, bright hiss like a fan or a detuned radio, generated live in your browser. Endless, with a sleep timer.",
    h1sub: "White noise for sleep and focus",
    lede: "A steady, bright hiss with equal energy at every frequency, the classic fan or detuned-radio sound, lightly softened at the very top and gently swaying in level.",
    answer: "White noise has equal energy at every frequency, so it sounds bright and hissy, like a fan or a detuned radio. Its strength is masking: it covers voices, doors and traffic well. Press Play for endless white noise, keep the volume low, and set a sleep timer if you want it to fade.",
    sections: [
      ["What you will hear", `<p>White noise is generated live in your browser from a flat random signal, softened only above about 12 kHz to take the sharpest edge off. Its level sways by around 8% every 8 to 16 seconds. Distance variation and 3D spatial sound let it drift slowly around you; switch them off in the Space panel for a plain, steady hiss.</p>`],
      ["When white noise works best", `<p>Because white noise covers the whole range of hearing, it is the strongest of the three colours at masking speech and higher-pitched sounds. Some people find it harsh; if so, try <a href="/pink-noise">pink noise</a> or <a href="/brown-noise">brown noise</a>, which sound softer. A 2021 systematic review rated the evidence that continuous noise improves sleep as very low quality (<a href="https://doi.org/10.1016/j.smrv.2020.101385" rel="noopener">Riedy et al., 2021</a>), so think of it as a way to cover disruptive noise rather than a sleep treatment.</p><p>${INFANT}</p>`],
      ["Good white noise mixes", `<ul><li>White noise on its own at a low level for masking.</li><li>Under <a href="/light-rain-sounds">light rain</a> for a softer, more natural texture.</li></ul>`],
    ],
    faqs: [
      { q: "Is it bad to sleep with white noise every night?", a: "For most adults it is fine at a low volume. Keep it quieter than normal conversation and the speaker away from your head. If you want to sleep without it eventually, lower the volume gradually." },
      { q: "White noise vs pink noise vs brown noise: which is best?", a: "There is no single best. White masks the most but can sound harsh, pink is softer and balanced, and brown is deep and rumbly. Use the one you find easiest to ignore." },
      ...common,
    ],
  },
];

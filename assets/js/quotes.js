
const QUOTES = [
 {
  quote: 'TIL: how to install #owncast on a vps in 5 minutes and stream to it with OBS',
  url: 'https://sonomu.club/@luka/105610570654392787',
  name: '@luka@sonomu.club',
 },
 {
  quote: 'wow, i rented a linode server and managed to set up owncast in like 5 minutes. This is fun and very promising',
  url: 'https://twitter.com/stamp_gal/status/1349088683887104002',
  name: '@stamp_gal',
 },
 {
  quote: "Want to stream without worrying about the music you're going to play? Just run OwnCast and have an equivalent to Twitch.",
  url: 'https://twitter.com/strycore/status/1347825083503427585',
  name: '@strycore',
 },
 {
  quote: "This is exactly what I was looking for a couple of years ago. This might be a good way to break from Twitch.",
  url: 'https://twitter.com/veridical_22/status/1341916444909588481',
  name: '@veridical_22',
 },

 {
  quote: "I'm amazed, #owncast seems to perform as any proprietary platforms out there.",
  url: 'https://fosstodon.org/@lopeztel/105466043426592961',
  name: '@lopeztel',
 },
 {
  quote: "Finally",
  url: 'https://old.reddit.com/r/selfhosted/comments/kgo6ct/selfhosted_live_video_streaming_server_with/gggfudh/',
  name: 'User digitalEarthling',
 },
 {
  quote: "many thanks for your work, owncast is exactly what we where looking for !",
  url: 'https://owncast.rocket.chat/channel/general?msg=jTGXEkNTMcqyNcDTs',
  name: 'Juju',
 },

 {
  quote: "With new tools like Owncast, you can run a livestream for all the guests who can't make it to your event in person. And you can do so without giving up control of your content, or acceding to the whims of companies who might not have your best interest at heart.",
  url: 'https://steele.blue/indieweb-wedding-livestream/',
  name: 'Matt Steele',
 },
 {
  quote: "Bless the owncast people, for real. Getting it up is dummy easy in hindsight",
  url: 'https://gitlab.com/libremiami/libremiami/-/issues/42#note_503367630',
  name: 'Roberto Beltran',
 },
 {
  quote: "Ahh! I love it! I setup #owncast and it was super easy! Take that other streaming services!",
  url: 'https://vulpine.club/@latrans/105749660754537997',
  name: '@latrans',
 }
];

(function(){
  function createQuoteItem(divId) {
    const container = document.getElementById(divId);
    if (!container || !QUOTES.length) {
      return;
    }
    const index = Math.floor(Math.random() * Math.floor(QUOTES.length));
    const { quote, url, name } = QUOTES[index];
    container.className = 'quotebox ' + divId;
    const content = '<span class="comment">' + quote + '</span><p class="commentor"><a href="'+ url +'" target="_blank" rel="noopener noreferrer">'+ name +'</a></p>';
    container.innerHTML = content;
  }


  createQuoteItem('quote1');
  createQuoteItem('quote2');
}());
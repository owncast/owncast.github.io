const QUOTES = [
  {
    quote:
      "TIL: how to install #owncast on a vps in 5 minutes and stream to it with OBS",
    url: "https://sonomu.club/@luka/105610570654392787",
    name: "@luka@sonomu.club",
  },
  {
    quote:
      "I'm amazed, #owncast seems to perform as well as any proprietary platforms out there.",
    url: "https://fosstodon.org/@lopeztel/105466043426592961",
    name: "@lopeztel",
  },
  {
    quote:
      "With new tools like Owncast, you can run a livestream for all the guests who can't make it to your event in person. And you can do so without giving up control of your content, or acceding to the whims of companies who might not have your best interest at heart.",
    url: "https://steele.blue/indieweb-wedding-livestream/",
    name: "Matt Steele",
  },
  {
    quote:
      "Bless the owncast people, for real. Getting it up is dummy easy in hindsight",
    url: "https://gitlab.com/libremiami/libremiami/-/issues/42#note_503367630",
    name: "Roberto Beltran",
  },
  {
    quote:
      "Ahh! I love it! I setup #owncast and it was super easy! Take that other streaming services!",
    url: "https://vulpine.club/@latrans/105749660754537997",
    name: "@latrans",
  },
  {
    quote:
      "Owncast is the best open source project.  Well, at least in the top 10.",
    url: "https://stream.kylebronsdon.com/",
    name: "Kyle Bronsdon",
  },
  {
    quote: "Very professional.  I hope to see this for every city council.",
    url: "https://uelfte.club/@jannik/105985943638208608",
    name: "City council meeting using Owncast",
  },
  {
    quote:
      "We shouldn’t need Amazon’s permission to goof off in a battle royale in front of our digital friends. Owncast offers a promising alternative glimpse into a more democratic, live streaming future that’s ripe for seizing.",
    url: "https://www.pcmag.com/reviews/owncast",
    name: "PC Mag Review of Owncast",
  },
  {
    quote:
      "For true democratic freedom, go with Owncast, a service that lets you stream whatever you want to whoever you want without corporate oversight.",
    url: "https://www.pcmag.com/picks/best-video-game-live-streaming-services",
    name: "PC Mag The Best Streaming Services for 2023",
  },
  {
    quote:
      "Went from hearing about Owncast to having it up and running in a frighteningly short amount of time.",
    url: "https://hexdsl.co.uk/log/20210507-owncast.html",
    name: "HexDSL",
  },
];

(function () {
  function createQuoteItem(divId) {
    const container = document.getElementById(divId);
    if (!container || !QUOTES.length) {
      return;
    }
    const index = Math.floor(Math.random() * Math.floor(QUOTES.length));
    const { quote, url, name } = QUOTES.splice(index, 1)[0];
    container.className = "quotebox " + divId;
    const content =
      '<p class="comment">' +
      quote +
      '</p><p class="commentor"><a href="' +
      url +
      '" target="_blank" rel="noopener noreferrer">- ' +
      name +
      "</a></p>";
    container.innerHTML = content;
  }

  createQuoteItem("quote1");
  createQuoteItem("quote2");
})();

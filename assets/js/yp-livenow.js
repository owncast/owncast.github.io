// Get currently live owncast instances from the Directory
// If there are less than 3 live instances, don't show anything.

// TODO: make this server generated?

async function getDirectory() {
  const listContainer = document.getElementById("stream-list");

  if (!listContainer) {
    return;
  }

  const response = await fetch("https://directory.owncast.online/api/active", {
    mode: "cors", // same-origin, no-cors
  });
  let streams = await response.json();
  if (!streams.length || streams.length < 2) {
    return;
  }

  // Remove NSFW streams
  streams = streams.filter((stream) => !stream.nsfw);

  // if full list is bigger than widow width, make list "flex-start", else center it.
  const reflex = () => {
    const list = document.getElementById("stream-list");
    if (listContainer.clientWidth > window.innerWidth) {
      list.parentElement.style.justifyContent = "flex-start";
    } else {
      list.parentElement.style.justifyContent = "center";
    }
  };
  window.addEventListener("resize", reflex);

  document.getElementById("container-live-now").style.display = "block";

  streams.forEach(function (stream) {
    const listItem = document.createElement("li");
    listItem.className = "stream-item";

    const itemMarkup =
      '<a href="' +
      stream.url +
      '" target="_blank" rel="noopener noreferrer">' +
      '<img src="https://directory.owncast.online/api/image/thumb/' +
      stream.id +
      '" loading="lazy" aspect-ratio="16 / 9" alt="See ' +
      stream.name +
      '&apos; stream." />' +
      '<span class="stream-name">' +
      stream.name +
      "</span>" +
      "</a>";

    listItem.innerHTML = itemMarkup;
    listContainer.appendChild(listItem);
  });
  reflex();
}
(function () {
  getDirectory();
})();

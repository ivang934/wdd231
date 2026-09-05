// TODO (next week): render `members` (from data.js) as cards, plus a
// grid/list view toggle. Stub below just proves the data is reachable.
const directoryContainer = document.querySelector("#directory-container");

directoryContainer.innerHTML = members
  .map(
    (m) => `
    <div class="directory-card">
      <h3>${m.name}</h3>
      <span class="membership-level">${m.level}</span>
      <p>${m.address}</p>
      <p>${m.phone}</p>
      <a href="${m.website}" target="_blank" rel="noopener">Website</a>
    </div>
  `
  )
  .join("");

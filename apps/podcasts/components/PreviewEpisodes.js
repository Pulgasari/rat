// podcasts :: components/PreviewEpisodes.js
// the episode list of a podcast you are looking at but have not subscribed to.
//
// not EpisodesIndex: every control there writes to the library (progress, done,
// listen-later) and a previewed episode has no place in it — it exists only as long
// as the parsed feed is on screen. what is left is what the decision needs: when it
// came out, how long it is, what it is about.

import Date    from '/.shared/js/components/Date.js';
import Empty   from '/.shared/js/components/Empty.js';
import Link    from '/.shared/js/components/Link.js';

import Artwork from './Artwork.js';

import { plain } from './../modules/methods.js';

const TEASER = 240;

function Item ({ episode }) {
  const teaser = plain(episode.description).slice(0, TEASER);

  return html`
    <data-item>
      <${Artwork} src=${episode.image} />

      <div class='meta'>
        <${Date} value=${episode.pubDate} />
        <span class='dur'>${zugriff.fmt.duration(episode.duration)}</span>
      </div>

      <div class='title'>${episode.title}</div>

      ${teaser && html`<p class='teaser'>${teaser}</p>`}

      ${episode.link && html`<${Link} href=${episode.link} icon='mdi:open-in-new' label='Episode page' />`}
    </data-item>
  `;
}

function PreviewEpisodes ({ episodes, empty }) {
  if (!episodes.length) return html`<${Empty} ...${empty} />`;

  return html`
    <data-index class='preview-episodes' viewmode='list'>
      ${episodes.map(episode => html`<${Item} key=${episode.id} episode=${episode} />`)}
    </data-index>
  `;
}

export default PreviewEpisodes;

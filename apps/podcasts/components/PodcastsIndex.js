// podcasts :: components/PodcastsIndex.js

import Artwork from './Artwork.js';
import Empty   from '/.shared/js/components/Empty.js';

const viewmode = 'list';

function Item ({ podcast }) {
  return html`
    <data-item onClick=${() => zugriff.app.go('podcast', podcast.id)}>
      <${Artwork} src=${podcast.image} />
      <div class="title">${podcast.title}</div>
      <div class="sub">${podcast.episodeCount} episode(s) · ${zugriff.fmt.date(podcast.lastEpisodeAt)}</div>
    </data-item>
  `;
}

function PodcastsIndex ({ podcasts, empty }) {
  return !podcasts.length
  ? html`<${Empty} ...${empty} />`
  : html`
    <data-index viewmode=${viewmode} item-size='150px'>
      ${podcasts.map(p => html`<${Item} key=${p.id} podcast=${p} />`)}
    </data-index>
  `;
}

export default PodcastsIndex;

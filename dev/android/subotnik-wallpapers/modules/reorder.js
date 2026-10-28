// subotnik-wallpapers :: modules/reorder.js
//
// a behavior for a grid of tiles (.tile[data-index], the add tile without): a tile dragged follows the
// finger and lands before the tile it is dropped on, a tile tapped without moving is a tap. its corner
// buttons (.tile-x, .tile-toggle) keep their own clicks. the list changes once, on the drop
//
//   <div @reorder={{ move: (from, to) => …, tap: index => … }}>

const SLOP = 8;   // px before a press is a drag

// the tile the pointer is left of or above (row-major), among the ones that stay
function before (tiles, x, y) {
  let best     = null;
  let distance = Infinity;
  for (const tile of tiles) {
    const box = tile.getBoundingClientRect();
    const cx  = box.left + box.width / 2;
    const cy  = box.top + box.height / 2;
    if (y < cy - 1 || (y < cy + box.height / 2 && x < cx)) {
      const d = Math.hypot(x - cx, y - cy);
      if (d < distance) { distance = d; best = tile; }
    }
  }
  return best;
}

export function reorder (grid, handlers) {
  let current = handlers;

  function down (event) {
    const tile = event.target.closest('.tile[data-index]');
    if (!tile || !grid.contains(tile) || event.target.closest('.tile-x, .tile-toggle')) return;

    const from   = Number(tile.dataset.index);
    const startX = event.clientX;
    const startY = event.clientY;
    let active   = false;

    const move = next => {
      const dx = next.clientX - startX;
      const dy = next.clientY - startY;
      if (!active) {
        if (Math.hypot(dx, dy) < SLOP) return;
        active = true;
        tile.classList.add('dragging');
        try { tile.setPointerCapture(next.pointerId); } catch {}
      }
      tile.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const up = last => {
      grid.removeEventListener('pointermove', move);
      grid.removeEventListener('pointerup', up);
      grid.removeEventListener('pointercancel', up);
      try { tile.releasePointerCapture(last.pointerId); } catch {}
      if (!active) return current.tap?.(from);
      tile.classList.remove('dragging');
      tile.style.transform = '';
      if (last.type === 'pointercancel') return;
      const others = [...grid.querySelectorAll('.tile[data-index]')].filter(other => other !== tile);
      const target = before(others, last.clientX, last.clientY);
      const to     = target ? others.indexOf(target) : others.length;
      if (to !== from) current.move?.(from, to);
    };

    grid.addEventListener('pointermove', move);
    grid.addEventListener('pointerup', up);
    grid.addEventListener('pointercancel', up);
  }

  grid.addEventListener('pointerdown', down);

  return {
    destroy : () => grid.removeEventListener('pointerdown', down),
    update  : next => { current = next; },
  };
}

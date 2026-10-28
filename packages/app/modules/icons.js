// @rat/app :: icons

/*
RAT.app.icons: short names for icon ids, what <svg-icon icon='close'> shows, and every element built on it
(btn-icon …). a name the app does not give falls back to the defaults of @aufbau/svg/aliases.js, an id
(lucide:x) is taken as it is.

  icons : { close: 'lucide:x', copy: 'lucide:copy' }

registered once <svg-icon> is defined: config.import defines it before the mods, then at once.
*/

const icons = async options => {
  const map = Object.freeze({ ...options });
  customElements.whenDefined('svg-icon').then(SvgIcon => SvgIcon.register?.(map));
  return map;
};

// :::::: EXPORT

export default icons;

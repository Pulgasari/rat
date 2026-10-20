// @rat/app :: elements

/*
<rat-app>   the root of an app: router, commands, views, areas, loads its src
<rat-area>  a region of the app: sidebar, drawer, bottom sheet, main
<rat-part>  a piece of a page: loads a .rat file and mounts it, an island
<rat-view>  a view of the app, activated by its router
*/

export { RatApp, rat }  from './rat-app.js';
export { RatArea }       from './rat-area.js';
export { RatPart }       from './rat-part.js';
export { RatView }       from './rat-view.js';

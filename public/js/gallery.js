// external js: masonry.pkgd.js, imagesloaded.pkgd.js

// init Isotope
var grid = document.querySelector('.grid');

var msnry = new Masonry( grid, {
  itemSelector: '.grid__item',
  columnWidth: '.grid__sizer',
  gutter: 15,
  percentPosition: true
});

imagesLoaded( grid ).on( 'progress', function() {
  // layout Masonry after each image loads
  msnry.layout();
});


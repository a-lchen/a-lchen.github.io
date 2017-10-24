
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
function chooseFile() {
    document.getElementById("fileInput").click();
    document.getElementById("form").submit();

}

function loadFunc() {

    var url = 'https://alexlchen-gallery-photos.s3.amazonaws.com/file_listing.json';
    var j = [];
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function(data) { j = data;},
        async: false
    });

    console.log(j.files)
    loadPics(j.files)
}
/*
function loadPics(arr) {
    for(count = 0; count < arr.length; count++){
        var html = <a href="#" class="grid__item">
            <div class="item__overlay">
            <button class="js-button btn btn-secondary-outline center-block" data-toggle="modal" data-target="#modalPicture" type="button" value="Expand photo" role="button">Expand photo</button>
          </div>
          <img src=arr[count] />
        </a>


        $("section").append(pic);
}
}*/

$(document).on("click", ".js-button", function() {
    var imageSrc = $(this).parents(".grid__item").find("img").attr("src");
    $(".js-download").attr("href", imageSrc);
    $(".js-modal-image").attr("src", imageSrc);
    $(document).on("click", ".js-heart", function() {
      $(this).toggleClass("active");
    });
  });



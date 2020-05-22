// Dean Attali / Beautiful Jekyll 2016

var main = {

  bigImgEl : null,
  numImgs : null,

  init : function() {
    // Shorten the navbar after scrolling a little bit down
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 30) {
            $(".navbar").addClass("top-nav-short");
            $(".navbar-custom .avatar-container").fadeOut(300);
        } else {
            $(".navbar").removeClass("top-nav-short");
            $(".navbar-custom .avatar-container").fadeIn(300);
        }
    });

    // On mobile, hide the avatar when expanding the navbar menu
    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

    // On mobile, when clicking on a multi-level navbar menu, show the child links
    $('#main-navbar').on("click", ".navlinks-parent", function(e) {
      var target = e.target;
      $.each($(".navlinks-parent"), function(key, value) {
        if (value == target) {
          $(value).parent().toggleClass("show-children");
        } else {
          $(value).parent().removeClass("show-children");
        }
      });
    });

    // 원하는 태그만 보여주기
    $(window).on('hashchange', function(e) {
      if (window.location.hash) {
        // e.preventDefault();
        var hash_name = "."+ window.location.hash.replace("#", "");
        // nav 클릭
        if (window.location.pathname == "/tags/") {
          $(hash_name).show();
          $(".linked-panel").not(hash_name).hide();
          $(".tags-category").hide();
          $("#show-all-tags").show(); // 버튼 숨기기
        }
      }
    });
    // 첫 페이지 로드
    if (window.location.pathname == "/tags/") {
      var hash_name = "."+ window.location.hash.replace("#", "")
      $(".linked-panel").not(hash_name).hide();
      $(".tags-category").hide();
    }

    // 전체보기 버튼
    $("#show-all-tags").on('click', function(e){
      // e.preventDefault();
      $(".linked-panel").show();
      $(".tags-category").show();
      $("#show-all-tags").hide(); // 버튼 숨기기
    })

    // 카테고리 태그 눌렀을 때
    $(".tag-btn").on('click', function(e){
      // e.preventDefault();
      $(hash_name).show();
      $(".linked-panel").not(hash_name).hide();
      $(".tags-category").hide();
      $("#show-all-tags").show(); // 버튼 숨기기
    })

    // Ensure nested navbar menus are not longer than the menu header
    var menus = $(".navlinks-container");
    if (menus.length > 0) {
      var navbar = $("#main-navbar ul");
      var fakeMenuHtml = "<li class='fake-menu' style='display:none;'><a></a></li>";
      navbar.append(fakeMenuHtml);
      var fakeMenu = $(".fake-menu");

      $.each(menus, function(i) {
        var parent = $(menus[i]).find(".navlinks-parent");
        var children = $(menus[i]).find(".navlinks-children a");
        var words = [];
        // $.each(children, function(idx, el) { words = words.concat($(el).text().trim().split(/\s+/)); });
        $.each(children, function(idx, el) { words = words.concat($(el).text().trim()); });
        var maxwidth = 0;
        $.each(words, function(id, word) {
          // console.log(word);
          fakeMenu.html("<a>" + word + "</a>");
          var width =  fakeMenu.width();
          if (width > maxwidth) {
            maxwidth = width;
          }
        });
        $(menus[i]).find(".navlinks-children").css('min-width', maxwidth + 'px')
      });

      fakeMenu.remove();
    }

    // show the big header image
    main.initImgs();
  },

  initImgs : function() {
    // If the page was large images to randomly select from, choose an image
    if ($("#header-big-imgs").length > 0) {
      main.bigImgEl = $("#header-big-imgs");
      main.numImgs = main.bigImgEl.attr("data-num-img");

          // 2fc73a3a967e97599c9763d05e564189
	  // set an initial image
	  var imgInfo = main.getImgInfo();
	  var src = imgInfo.src;
	  var desc = imgInfo.desc;
  	  main.setImg(src, desc);

	  // For better UX, prefetch the next image so that it will already be loaded when we want to show it
  	  var getNextImg = function() {
	    var imgInfo = main.getImgInfo();
	    var src = imgInfo.src;
	    var desc = imgInfo.desc;

		var prefetchImg = new Image();
  		prefetchImg.src = src;
		// if I want to do something once the image is ready: `prefetchImg.onload = function(){}`

  		setTimeout(function(){
                  var img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
  		  $(".intro-header.big-img").prepend(img);
  		  setTimeout(function(){ img.css("opacity", "1"); }, 50);

		  // after the animation of fading in the new image is done, prefetch the next one
  		  //img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
		  setTimeout(function() {
		    main.setImg(src, desc);
			img.remove();
  			getNextImg();
		  }, 1000);
  		  //});
  		}, 6000);
  	  };

	  // If there are multiple images, cycle through them
	  if (main.numImgs > 1) {
  	    getNextImg();
	  }
    }
  },

  getImgInfo : function() {
  	var randNum = Math.floor((Math.random() * main.numImgs) + 1);
    var src = main.bigImgEl.attr("data-img-src-" + randNum);
	var desc = main.bigImgEl.attr("data-img-desc-" + randNum);

	return {
	  src : src,
	  desc : desc
	}
  },

  setImg : function(src, desc) {
	$(".intro-header.big-img").css("background-image", 'url(' + src + ')');
	if (typeof desc !== typeof undefined && desc !== false) {
	  $(".img-desc").text(desc).show();
	} else {
	  $(".img-desc").hide();
	}
  }
};

// 2fc73a3a967e97599c9763d05e564189

document.addEventListener('DOMContentLoaded', main.init);

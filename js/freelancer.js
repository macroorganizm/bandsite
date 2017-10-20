(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse the navbar when page is scrolled
  $(window).scroll(function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });

  // Floating label headings for the contact form
  $(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

})(jQuery); // End of use strict

jQuery(function ($) {
  var supportsAudio = !!document.createElement('audio').canPlayType;
  if (supportsAudio) {
    var index = 0,
      playing = false,
      mediaPath = './tracks/',
      extension = '',
      tracks = [{
        "track": 1,
        "name": "Падає Вниз",
        "length": "4:40",
        "file": "falling_down"
      }, {
        "track": 2,
        "name": "В глаза",
        "length": "4:07",
        "file": "in_my_eyes"
      }, {
        "track": 3,
        "name": "Стрази",
        "length": "2:56",
        "file": "strazy"
      }],
      buildPlaylist = $.each(tracks, function(key, value) {
        var trackNumber = value.track,
          trackName = value.name,
          trackLength = value.length;
        if (trackNumber.toString().length === 1) {
          trackNumber = '0' + trackNumber;
        } else {
          trackNumber = '' + trackNumber;
        }
        $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
      }),
      trackCount = tracks.length,
      npAction = $('#npAction'),
      npTitle = $('#npTitle'),
      audio = $('#audio1').bind('play', function () {
        playing = true;
        npAction.text('Now Playing...');
      }).bind('pause', function () {
        playing = false;
        npAction.text('Paused...');
      }).bind('ended', function () {
        npAction.text('Paused...');
        if ((index + 1) < trackCount) {
          index++;
          loadTrack(index);
          audio.play();
        } else {
          audio.pause();
          index = 0;
          loadTrack(index);
        }
      }).get(0),
      btnPrev = $('#btnPrev').click(function () {
        if ((index - 1) > -1) {
          index--;
          loadTrack(index);
          if (playing) {
            audio.play();
          }
        } else {
          audio.pause();
          index = 0;
          loadTrack(index);
        }
      }),
      btnNext = $('#btnNext').click(function () {
        if ((index + 1) < trackCount) {
          index++;
          loadTrack(index);
          if (playing) {
            audio.play();
          }
        } else {
          audio.pause();
          index = 0;
          loadTrack(index);
        }
      }),
      li = $('#plList li').click(function () {
        var id = parseInt($(this).index());
        if (id !== index) {
          playTrack(id);
        }
      }),
      loadTrack = function (id) {
        $('.plSel').removeClass('plSel');
        $('#plList li:eq(' + id + ')').addClass('plSel');
        npTitle.text(tracks[id].name);
        index = id;
        audio.src = mediaPath + tracks[id].file + extension;
      },
      playTrack = function (id) {
        loadTrack(id);
        audio.play();
      };
    extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
    loadTrack(index);
  }
});

//initialize plyr
// plyr.setup($('#audio1'), {});

//$.ajaxSetup({ async: false }) - Seems to work with out this now.  

var streamers = ["syndicate", "riotgames", "Nightblue3", "summit1g", "LIRIK", "phantomsfx", "imaqtpie", "sodapoppin", "captainsparklez", "freecodecamp", "comster404"];

function getData(streamer) {
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/' + streamer + '?',
    headers: {
      'Client-ID': 'gx8xtfz8f3fb7jhi18abmtpbdaz7a3w'
    },
    success: function(data) {
      var streamerURL = "https://www.twitch.tv/" + streamer.toLowerCase()
        // process closed or non-existent accounts
        if (data.error) {
          console.log("Error")
          $("body").append("<div class='unknown text-center'>" + streamer + "has either deleted their account or doesn't exist! <br></div>");
        }

     else if (data.stream === null) {
        $("body").append("<a href=" + streamerURL + ">" + "<div class='offline text-center'>" + streamer + " is offline. <br></div></a>");
     

      } else {
        $("body").append("<a href=" + streamerURL + ">" + "<div class='online text-center'>" + streamer + " is online and playing " + data.stream.game + "<br></div></a>");
      }
    },
    error: function error() {
      $("body").append("<div class='unknown text-center'>" + streamer + "has either deleted their account or doesn't exist! <br></div>");
    }
  });
}

function refresh() {
  $(".offline").remove();
  $(".online").remove();
  $(".unknown").remove();
  for (var i = 0; i < streamers.length; i++) {
    getData(streamers[i]);
  }
}
refresh()
$("#onlineButton").click(function() {
  $("div").filter(".online").toggle();
});
$("#offlineButton").click(function() {
  $("div").filter(".offline").toggle();
});
// https://blog.twitch.tv/client-id-required-for-kraken-api-calls-afbb8e95f843#.vj602jtxt
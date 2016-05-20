$(function() {
  var List = ["freecodecamp", "storbeck",  "habathcx","RobotCaleb","noobs2ninjas"];

  List.forEach(function(user) {
    $.ajax({
      type: 'GET',
      url: "https://api.twitch.tv/kraken/streams/" + user,
      contentType: "application/json",
      dataType: 'jsonp',
      success: function(Data) {
        if (Data.stream) {
          $.ajax({
            type: 'GET',
            url: "https://api.twitch.tv/kraken/streams/" + user,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(Data) {
              $("#twitch").
              append("<div class='item' id='" + Data.stream.channel.display_name.toLowerCase() + "'><a href='" + Data.stream.channel.url + "' target='_blank'><img src='" + Data.stream.channel.logo + "' class='online'></a>" + "<p class='username'>" + Data.stream.channel.display_name + "</p>" + "<p class='game'>" + Data.stream.channel.game + "</p>" + "<p class='online'>ONLINE</p></div>");

            }
          });

        } else {
          $.ajax({
            type: 'GET',
            url: "https://api.twitch.tv/kraken/channels/" + user,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(off) {
              $("#twitch").
              append("<div class='item' id='" + off.display_name.toLowerCase() + "'><a href='" + off.url + "' target='_blank'><img src='" + off.logo + "'></a>" + "<p class='username'>" + off.display_name + "</p>" + "<p class='offline'>OFFLINE</p></div>");

            }
          });
        }
      }
    });
  });
});

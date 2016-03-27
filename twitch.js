var apiStreams = "streams/";
var apiChannels = "channels/";
var apiBase = "https://api.twitch.tv/kraken/";
var apiCallback = "?callback=?";
var TwitchChannel = function(name) {
  this.name = name;
  this.url = "http://twitch.tv/" + this.name;
  this.apiUrl = apiBase + apiStreams + this.name + apiCallback;
  this.imgUrl = "http://placehold.it/50/50";
  this.status = "unchecked";
  this.subtitle = "";
  this.renderChannel(); //Prerender item with loading animation

  this.checkStatus();

};

TwitchChannel.prototype.setStatus = function(status) {
  this.status = status;
};

TwitchChannel.prototype.setImgUrl = function(url) {
  this.imgUrl = url;
};

TwitchChannel.prototype.renderChannel = function() {
  var me = this;
  var list = $('#listOfStreamings');
  if ($('a[href="' + me.url + '"]').length) {

    var meAnchor = $('a[href="' + me.url + '"]');
    meAnchor.removeClass("online offline").addClass(me.status);
    var meIcon = $('a[href="' + me.url + '"] #status-icon');
    meIcon.replaceWith('<span class="glyphicon glyphicon-' + (me.status === "online" ? "ok" : "remove") + ' status-icon " aria-hidden="true">');

    var meImg = $('a[href="' + me.url + '"] .smaller-image');
    meImg.replaceWith('<img class="smaller-image img-circle" src="' + me.imgUrl + '">');
  } else {

    list.append('<a href="' + me.url + '" class="list-group-item all"><img class="smaller-image img-circle" src="' + me.imgUrl + '">' + me.name + '<div id="status-icon" class="progress progress-striped active pull-right vertical-aligned" style="width: 20px; height: 20px"> <div class="progress-bar img-circle"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%; height: 100%"></div></div></a>')

  }

}

TwitchChannel.prototype.checkStatus = function() {
  var me = this;

  $.getJSON(me.apiUrl, function(result) {
    $.each(result, function(i, field) {

      if (i == "stream") {
        if (field != null) {
          me.setStatus("online");
          //me.setImgUrl(field.channel.logo);
          console.log(me.name + ".status:" + me.status);
        } else {
          me.setStatus("offline");
          console.log(me.name + ".status:" + me.status);
        }
      }

    });

    $.getJSON(apiBase + apiChannels + me.name + apiCallback, function(result) {
      $.each(result, function(i, field) {
        if (i === "logo") {
          if (field != null) {
            me.setImgUrl(field);
          } else {
            me.setImgUrl("http://placehold.it/50/50");
          }
        }
      });

      me.renderChannel(); //update html code 

    });
  });
};

$.fn.log = function() {
  console.log.apply(console, this);
  return this;
};

$(document).ready(function() {

  $('#myTabs a').click(function(e) {
    e.preventDefault()

    var list = $('#listOfStreamings a'); //Get all the current channels
    var toShow = list.filter("." + $(this).attr('aria-controls')).show();
    list.not(toShow).hide();

  })

  var demoData =  ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "monstercat"];

  var channels = demoData.map(function(elem) {
    return new TwitchChannel(elem);
  });

});
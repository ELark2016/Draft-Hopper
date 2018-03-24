// RSS Feed
google.load("feeds", "1");

function initialize() {
  var feed = new google.feeds.Feed("https://news.google.com/news/rss/search/section/q/virginia%20craft%20beer/virginia%20craft%20beer?hl=en&gl=US&ned=us",{
        count : 5
      });
  feed.load(function(result) {
    if (!result.error) {
      var container = document.getElementById("feed");
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        // var div = document.createElement("div");
        // div.appendChild(document.createTextNode(entry.title));
        // container.appendChild(div);
        $("#feed").append("<div><a href='" + entry.link + "' target='-blank'>" + entry.title + "</a><div><div class='divider'></div>");
      }
    }
  });
}
google.setOnLoadCallback(initialize);
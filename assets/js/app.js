// Ajax call to dynamically pull in current articles on Virginia craft beer using rss2json api

$.ajax({
  url: 'https://api.rss2json.com/v1/api.json',
  method: 'GET',
  dataType: 'json',
  data: {
      rss_url: 'https://news.google.com/news/rss/search/section/q/virginia%20craft%20beer/virginia%20craft%20beer?hl=en&gl=US&ned=us',
      api_key: '5dg4w0dln5jxsgrc3ytto8wp4mumybkdwicrhzjb', // put your api key here
      count: 5
  }
}).done(function (response) {
  if(response.status != 'ok'){ throw response.message; }
  console.log('====== ' + response.feed.title + ' ======');
    for (var i = 0; i < response.items.length; i++) {
      var entry = response.items[i];
      $("#feed").append("<div><a href='" + entry.link + "' target='-blank'>" + entry.title + "</a><div><div class='divider'></div>");
    }
});
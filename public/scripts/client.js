const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {

  $('#createTweet').on('click', function(event) {
    window.scrollTo(0, 0);
    $('.new-tweet').toggle();
  });

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
    .then((data) => {
      console.log("I'm here", data);
      for (let element of data) {
        $('.tweets-container').append(renderTweets(element));
      }
    })
    .catch((error) => {
       console.log('ERROR: ', error);
    });
  };

  $('form').on('submit', function(event) {
    event.preventDefault();

    const stringLength = $('.text-area').val();
    let data = $('.text-area').serialize();

    if (stringLength.length > 140) {
      $('#error').html("Tweet must be under 140 characters");
    } else if (stringLength.length === 0) {
      $('#error').html("Tweet must be at least 1 character");
    } else {

      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: data
      })
      .then(() => {
        $('#error').html('');
        loadTweets();

      });
      $('.text-area').val('');
      $('.counter').val(140);
    }
  });

  const createTweetElement = (tweetData) => {
    const date = new Date(tweetData.created_at);
    const localDate = date.toLocaleString('en-US');
    console.log("local", localDate);
    console.log("created at", tweetData.created_at);
    console.log("DATE NOW", Date.now());
    const $tweet = $(`<article class="tweet-container">
    <div class="tweet-header">
      <div class="nameAvatar">
        <h3>${tweetData.user.name}</h3>
        <div><img src="${tweetData.user.avatars}"></div>
      </div>
      <h5>${tweetData.user.handle}</h5>
    </div>
    <div class="tweet-content">
      <p>${escape(tweetData.content.text)}</p>
    </div>
    <footer class="tweet-footer">
      <p>${timeago.format(tweetData.created_at)}</p>
      <div class="tweet-symbols">
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </div>
    </footer>
    </article>`);
    return $tweet;
  };

  const renderTweets = function(tweet) {
    const tweetElement = createTweetElement(tweet);
    $('.tweets-container').prepend(tweetElement);
  };

  loadTweets();
});
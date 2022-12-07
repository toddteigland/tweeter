/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

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
    let data = $('form').serialize();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: {
        text: data
      }
    });
  });

  const createTweetElement = (tweetData) => {
    const $tweet = $(`<article class="tweet-container">
    <div class="tweet-header">
    <h2>${tweetData.user.name}</h2>
    <h2>${tweetData.user.handle}</h2>
    </div>
    <div class="tweet-content">
    <p>${tweetData.content.text}</p>
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
    $('.tweets-container').append(tweetElement);
  };

  //renderTweets();
  loadTweets();
});
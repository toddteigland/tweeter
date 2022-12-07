$(document).ready(function() {
  let maxChar = 140;
  let charLeft;
  $('.text-area').keyup(function() {
    let charCount = this.value.length;
    charLeft = maxChar - charCount;
    $('.counter').text(charLeft);
    if (charLeft <= 0) {
      $('output').addClass('red');
    } else {
      $('output').removeClass('red');
    }
  });
});
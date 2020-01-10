$(function(){
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message__upper-info">` +
          `<div class="message__upper-info-talker">` +
            message.user_name +
          `</div>` +
          `<div class="message__upper-info-date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message__text">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message__upper-info">` +
          `<div class="message__upper-info-talker">` +
            message.user_name +
          `</div>` +
          `<div class="message__upper-info-date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message__text">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message__upper-info">` +
          `<div class="message__upper-info-talker">` +
            message.user_name +
          `</div>` +
          `<div class="message__upper-info-date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message__text">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
      
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })

  var reloadMessages = function() {
    last_message_id = $('.messages .message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $("#new_message")[0].reset();
      }
    })
    .fail(function() {
      console.log("自動更新失敗")
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  };

});

$(document).ready(function() {

  $('.saved').click(function() {

    $(this).css({
      background: 'grey'
    })
    $('.home').css({
      background: 'none'
    })

    $('.scrape').hide()

    // get saved headlines from mongo
    $.getJSON('/saved', function(data) {
      displayResults(data);
    })

  })

  function displayResults(data) {
    $('.article-container').html(data.map(headline => `

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3><a class="article-link" target="_blank" href="${headline.link}">${headline.title}</a><a class="btn btn-danger delete" id="${headline._id}">DELETE FROM SAVED</a>
          <button type="button" class="btn btn-primary btn-info notes" id="${headline._id}" data-toggle="modal" data-target="#exampleModal">
            ARTICLE NOTES
          </button></h3>
        </div>
        <div class="panel-body">
          ${headline.source}
        </div>
      </div>
    
      `

    ))
  }

  $(document).on('click', '.delete', function() {

   var thisId = $(this).attr("id");

    $.ajax({
      method: "PUT",
      url: '/saved/' + thisId,
      data: {saved: false}
    })
    .then(function(data) {

      $.getJSON('/saved', function(data) {
        displayResults(data);
      })

    });

  })

  $(document).on('click', '.notes', function() {

    $('.note-container').empty();

    var thisId = $(this).attr('id');
    $('.modal-title').text(`Notes for Article: ${thisId}`)

    $.ajax({
      method: 'GET',
      url: '/headlines/' + thisId
    })
    .then(function(data){
      console.log(data);
      
      $('#savenote').attr('data-id', data._id)

      if (data.note) {
        $('.note-container').append(`
            <li class="list-group-item note">
              ${data.note.body}
              <button class="btn btn-danger note-delete" id="${data.note._id}">x</button>
            </li>`
        );

        // $('.note').val(data.note.body)
      }
      
    })

  })

  $(document).on('click', '#savenote', function() {

    // event.preventDefault();
    console.log('clicked')

   var thisId = $(this).attr("data-id");
    console.log(thisId)

    $.ajax({
      method: "POST",
      url: '/headlines/' + thisId,
      data: {
        body: $('#text').val()
      }
    })
    .then(function(data) {
      // Log the response
      console.log(data);

      // $.getJSON('/saved', function(data) {
      //   console.log(data);
      //   displayResults(data);
      // })
      
    });

    $('#text').val('')

  })

})




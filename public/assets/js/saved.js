$(document).ready(function() {

  $('.saved').click(function() {
    console.log('clicked')
    $(this).css({
      background: 'grey'
    })
    $('.home').css({
      background: 'none'
    })

    $('.scrape').hide()

    // get saved headlines from mongo
    $.getJSON('/saved', function(data) {
      console.log(data);
      displayResults(data);
    })

  })

  function displayResults(data) {
    $('.article-container').html(data.map(headline => `

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3><a class="article-link" target="_blank" href="${headline.link}">${headline.title}</a><a class="btn btn-danger delete" id="${headline._id}">DELETE FROM SAVED</a><a class="btn btn-info notes id="${headline._id}"">ARTICLE NOTES</a></h3>
        </div>
        <div class="panel-body">
          Nothing here yet
        </div>
      </div>
    
      `

    ))
  }

  $(document).on('click', '.delete', function() {
    // event.preventDefault();
    console.log('clicked')

   var thisId = $(this).attr("id");
    console.log(thisId)

    $.ajax({
      method: "PUT",
      url: '/saved/' + thisId,
      data: {saved: false}
    })
    .then(function(data) {
      // Log the response
      console.log(data);

      $.getJSON('/saved', function(data) {
        console.log(data);
        displayResults(data);
      })

    });

  })

  $(document).on('click', '.notes', function() {
    // event.preventDefault();
    console.log('clicked')

   var thisId = $(this).attr("id");
    console.log(thisId)

    $.ajax({
      method: "PUT",
      url: '/notes/' + thisId,
      data: {saved: false}
    })
    .then(function(data) {
      // Log the response
      console.log(data);

      $.getJSON('/saved', function(data) {
        console.log(data);
        displayResults(data);
      })
      
    });

  })

})




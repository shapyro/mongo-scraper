
$(document).ready(function(){

  $.getJSON('/headlines', function(data) {
    console.log(data);
    displayResults(data);
  })

  $('.scrape').click(function(event) {
    event.preventDefault();
    $.get('/scrape', function(data){
      alert(data);
      location.reload();
    })
  });

  $('.home').click(function(event) {
    event.preventDefault();
    console.log('clicked')
    $(this).css({
      background: 'grey'
    })
    $('.saved').css({
      background: 'none'
    })

    // get headlines from mongo
    $.getJSON('/headlines', function(data) {
      console.log(data);
      displayResults(data);
    })

  })
  

  function displayResults(data) {
    $('.article-container').html(data.map(headline => `

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3><a class="article-link" target="_blank" href="${headline.link}">${headline.title}</a><a class="btn btn-success save" id="${headline._id}">SAVE ARTICLE</a></h3>
        </div>
        <div class="panel-body">
          Nothing here yet
        </div>
      </div>
    
      `

    ))
  }

  // $('.btn-success').unbind().click(function(event) {

  $(document).on('click', '.save', function() {
    // event.preventDefault();
    console.log('clicked')

    var thisId = $(this).attr("id");
    console.log(thisId)

    $.ajax({
      method: "PUT",
      url: '/headlines/' + thisId,
      data: {saved: true}
    })
    .then(function(data) {
      // Log the response
      console.log(data);
    });

  })

});


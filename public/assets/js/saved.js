$(document).ready(function() {

  $('.saved').click(function() {
    console.log('clicked')
    $(this).css({
      background: 'grey'
    })
    $('.home').css({
      background: 'none'
    })

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
          <h3><a class="article-link" target="_blank" href="${headline.link}">${headline.title}</a><a class="btn btn-success save">SAVE ARTICLE</a></h3>
        </div>
        <div class="panel-body">
          Nothing here yet
        </div>
      </div>
    
      `

    ))
  }

})




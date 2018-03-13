$(document).ready(function(){

  $('.btn').click(function() {
    console.log("clicked");
    $.get('/scrape', function(data){
      alert(data);
    })
  });

  $('.home').click(function() {
    console.log('clicked')
    $(this).css({
      background: 'grey'
    })
    $('.saved').css({
      background: 'none'
    })
    $.getJSON('/headlines', function(data) {
      console.log(data);
      displayResults(data);
    })
  })

  $('.saved').click(function() {
    console.log('clicked')
    $(this).css({
      background: 'grey'
    })
    $('.home').css({
      background: 'none'
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

});


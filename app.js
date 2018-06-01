function ajaxCall() {
   $.ajax({
       url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('#search').val(),
       dataType: 'jsonp',
       type: 'GET',
       success: function(data) {
           console.log(data);
           $('#update').empty();
           var data = JSON.stringify(data);
           console.log(data);
           data = JSON.parse(data);
           console.log(data);
           console.log(data.query.search);
           // loop through data and output
           var output = '';
           data.query.search.forEach(function(data) {
               var title = '<h2>' + data.title + '</h2>' + '<br>';
               var snippet = '<p>' + data.snippet + '</p>';
               var url = '<a href="https://en.wikipedia.org/wiki/' + data.title + '" target="_blank">';
               //saves manipulating too many apostrophes
               var endUrl = '</a>';
               output += url + title + endUrl + snippet + '<hr>';
           });
           $('#update').append(output);
           console.log(output);

       }
   });
}

function randomFunction() {
   $('#update').empty();
   $('#serach').empty();
   $('iframe').attr('src', 'https://en.wikipedia.org/wiki/Special:Random');
}

$(document).ready(function() {
   $('#search').focus();
   $('#search').off('keyup');
   $('#search').on('keyup', function() {
       ajaxCall();
       $('iframe').attr('src', '');
   });
   // show random wiki article
   $('.random').on('click', function() {
       randomFunction();
       $(this).html('Show me another random article!');
   });
});

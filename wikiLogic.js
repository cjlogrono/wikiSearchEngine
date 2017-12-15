function ajaxCall(keyword){
  
  $.ajax( {
            url : "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch="+keyword+"&gsrlimit=10&prop=extracts|info&inprop=url&pilimit=10&exintro&explaintext&exsentences=1&exlimit=10",
            dataType : "jsonp",
            success : function(parsed_json){
                 
              $.each(parsed_json.query.pages, function(i, item) {
                $('.results').append('<div class="result col-xs-12 col-md-6" data-url="'+item.fullurl+'"><h2>'+item.title+'</h2><p>'+item.extract+'</p></div>');

              });           
            }
    
          });
}

$('#search button').on('click', function(){
  
  $(this).removeClass().addClass('animated zoomOut').hide();
  $('#inputBar input').show().removeClass().addClass('animated zoomIn').attr('autofocus', 'autofocus');
  optimize();
});

$('#inputBar input.phase1').blur(function(){
  
    $(this).removeClass().addClass('animated zoomOut').hide().removeAttr('autofocus');
    $('#search button').show().removeClass().addClass('animated zoomIn');
  optimize();
});

$('.UI #inputBar input').keydown(function(event) {
  
  var textVal;
  
        if (event.keyCode === 13) {
          
            $('#inputBar input').removeClass();
            textVal = $(this).val();
            $('.UI').hide();
            $('.results').show();
            $('#inputBar input').val(textVal);
            $('#inputBar').clone().detach().appendTo('.results').append('<button class="closeBut">Close</button>');
            $('main').css('height', 'auto').addClass('phase2');
          
            ajaxCall(textVal);
        }
});

$('main').on('keydown', '.results #inputBar input' ,function(event) {
  
  var textVal;
  
        if (event.keyCode === 13) {
          
            textVal = $(this).val();
            $('.results .result').detach();
          
            ajaxCall(textVal);
        }
});

$('main').on('click','.results .result', function(){
  
  var url = $(this).attr('data-url');
  window.location.href = url;
});
$('#randomize button').on('click', function(){
  
  $(this).text('Randomizing...');
  window.location.href = "https://en.wikipedia.org/wiki/Special:Random";
});

$('main').on('click', '.closeBut' ,function(){
  $('#inputBar input').addClass('phase1');
          $('.UI').show();
          $('.results #inputBar').detach();
          $('.results .result').remove();
          $('#inputBar input').addClass('phase1').removeAttr('autofocus').val('').hide();
          $('#search button').removeClass().show();
          $('.results').hide();
          $('main').removeClass('phase2'); 
          optimize();
});
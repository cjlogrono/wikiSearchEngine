function optimize(){
  
  var w_width = $(window).width();
  var w_height = $(window).height();
  var top = w_height / 2 - $('.UI').height() / 2;
  var left = w_width / 2 - $('.UI').width() / 2;
  
  $('main').css('width', w_width).css('height', w_height);
  $('.phase2').css('height', 'auto');
  $('.UI').css('margin-top', top).css('margin-left',left);
}

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

$(window).resize(function(){
  
  optimize();
});

$(document).ready(function(){
  
  optimize();
});
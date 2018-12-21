$(document).ready( function() {
  
  $(".search-btn").click( function() {
    
    $(".search").html("<input class='search-input' type='text' name='search-bar' placeholder='Search...'>");
    $(".search-input").animate({width: '180px'}, 400);
    $(".search-input").focus();
    
});
    
    
  /*  $(".search-input").focusout( function() {
      $(".search-input").animate({width: '0px'}, 400, function() {
        $(".search").html("<button type='button' class='search-btn'><i class='fa fa-search'></i></button>");
      }); 
    });  */ 
  
  
  $(".search").on("submit", function(e) {
    e.preventDefault();
    
    var input = $('.search-input').val();
    var wikipediaAPI = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + input + "&format=json&callback=?";
 
    $.getJSON(wikipediaAPI, function(data) {

    var results;
    var titleArr = [];
    var descriptionArr = [];
    var description;
    var linkArr = [];   
      
      for (var i = 0; i < data[1].length; i++) {
        titleArr.push(data[1][i]);
      }
      for (var i = 0; i < data[2].length; i++) {
        descriptionArr.push(data[2][i]);
        //descriptionArr[i] = (descriptionArr[i].length <= 280? descriptionArr[i] : descriptionArr[i].substring(0, 280) + "...");
        //to shorten descriptions ^^^^^^
      }
      for (var i = 0; i < data[3].length; i++) {
        linkArr.push(data[3][i]);
      }
      
      console.log(titleArr);
      console.log((data[1].length == data[2].length) && (data[1].length == data[3].length));
      
      $(".extra").fadeOut(2000, function() {
      $(".extra").remove();
      $(".search").animate({top: '30px'}, 1000);
    });
      
    $(".results").empty();
    $(".search").append("<div class='results'></div>");
      
      
     
     setTimeout( function() {
      if(linkArr.length == 0) { //to manage zero search results
        $(".results").append("<div class='error'>No results found... Look for something less weird</div>");
      } else {
        for (var i = 0; i < titleArr.length; i++) {
         $(".results").append("<a href='" + linkArr[i] + "' target='_blank' class='link'>"  + "<div class='individual-result'><strong>"+ titleArr[i] + "</strong><div class='description'>" + descriptionArr[i] + "</div>"+ "</div>" + "</a>");    
      }
     }
   }, 2000); 
    
      
    });   
    
  });
  
  
  
  
  
});

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

var maxwords = 100

function make_cloud(data){

  var words = data.objects
                  .filter(function(d){return !("hidden" in d) || d.hidden;})
                  .slice(0,100);

  var fontScale = d3.scale.sqrt()
                    .range([5,40])
                    .domain([words[99].weight, words[0].weight]);

  var layout = d3.layout.cloud()
      .size([1618, 1000])
      .words(words)
      .padding(2)
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact") // needed for layout algorithm
      .fontSize(function(d) { return fontScale(d.weight);})
      .on("end", draw)
      .start();

  function draw(words) {
    var wordcloud = d3.select(".cloudcontainer")
              .selectAll(".cloudword")
              .data(words, function(d, i){return d.text;});

    var enter = wordcloud.enter()
        .append("text");
        
    enter.attr("class", "cloudword")
          .text(function(d) {return d.text;})
          .on("click", function(d){
            //update our user's list of hidden words
            $.post('/update_session/', {aootype: "B",
                                        aookey: $("#LASelector>option:selected").val(),
                                        word: d.text}, function(data){});
            data[d.idx].hidden = true;
            var newWords = data.objects
                               .filter(function(d){return !("hidden" in d) || d.hidden;})
                               .slice(0,100);
            fontScale = fontScale.domain([newWords[0].weight, newWords[99].weight]);
            layout.stop();
            layout.words(newWords)
                  .fontSize(function(d) {return fontScale(d.weight);});
            layout.start();
          })
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .style("opacity", 1e-6);

  //attach animations here - will fade in newly added words, and resize and move already present ones
  //applying both types as one transition ensures it will terminate correctly if interrrupted
    wordcloud.merge(enter)
             .transition()
               .duration(1e3)
               .style("opacity", 1)
               .attr("transform", function(d) {
                 return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
               });
               .style("font-size", function(d){return d.size;});;

  //when removed, fad the word out
    wordcloud.exit()
             .transition()
             .duration(1e3)
             .style("opacity", 1e-6)
             .remove();
  }

}

// when the filters change, we want to update teh hash to match the new filters
// and whenever the hash changes, ask for data from teh API and run the viz
// splitting like this means that browser forward/back will work (hopefully)
$(document).ready(function(){
  // retore the filters from cache on pageload
  $('select').each(function () {
    var select = $(this);
    var selectedValue = select.find('option[selected]').val();

    if (selectedValue) {
      select.val(selectedValue);
    } else {
      select.prop('selectedIndex', 0);
    }
  });

  // bind hashchange event to query generation
  $(window).on('hashchange', function(){
    d3.json("/api/v1/worddata/?" + $(window).location.hash,
      make_cloud)
  })

  // bind hashchange event to filters
  // call it once we're done - want to generate a viz if the default is blank
  $(".filter").on('change', function(){
    var area = $("#LASelector>option:selected").val();
    var weight = $("#WeightSelector>option:selected").val();
    var alg = $("#AlgSelector>option:selected").val();
    $(window).location.hash = "aootype=B&aookey=${area}&cal_type=${alg}&weight=${weight}&order_by=-${weight}";
  })

  $("#LASelector").trigger("change");

})

var maxwords = 100

convertFields = function(data){
  return data.forEach(function (d) {
    d.subsidiary_count = 0.0+d.subsidiary_count
    d.charity_count = 0.0+d.charity_count
    d.income = 0.0+d.income
    d.expense = 0.0+d.expense
    d.active = true
  });
}

nestLA = d3.nest()
           .key(function(d) { return d.aootype;})
           .key(function(d) { return d.aooname;});

nestArea = d3.nest()
           .key(function(d) { return d.aootype;});

var la_words = nestLA
  .key(function(d) { return d.word;})
  .object(d3.csv("/static/data/la_words.csv", convertFields));
console.log(la_words);
var la_counts = nestLA
  .object(d3.csv("/static/data/la_counts.csv", convertFields));
var area_counts = nestArea
  .object(d3.csv("/static/data/area_counts.csv", convertFields));
var area_words = nestArea
  .key(function(d) { return d.word;})
  .object(d3.csv("/static/data/area_words.csv", convertFields));

function make_cloud(data){

//this stuff can be removed
//we are being given a slimmed down result set
//the result set will be in order
//still need to trim down the number of words shown
//build scale ect.
//this will be called with new data whenever the filters change
//because I'm awesome
//TODO: fix
  var LA = document.getElementById('LASelector').value;
  var weighting = document.getElementById('weightSelector').value;
  var wordsection = Object.keys(la_words['B'][LA]);

  function redfun(result, word) {
    if (la_words['B'][LA][word].active){
      result.push({text: word,
                   weight: (la_words['B'][LA][word][weighting] /
                            la_counts['B'][LA][weighting]) *
                           Math.log(area_counts['B'][weighting] /
                            area_words['B'][word][weighting])
                  });
      }
    return(result);
  }

  function sortfun(a, b) {
    return(b.weight - a.weight);
  }

  var words = wordsection.reduce(redfun, [])
                         .sort(sortfun)
                         .slice(0,100);

  var fontScale = d3.scale.sqrt()
                    .range([5,40])
                    .domain([words[99].weight, words[0].weight]);

  var layout = d3.layout.cloud()
      .size([1618, 1000])
      .words(words)
      .padding(2)
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact") // this should be in style sheet I think
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
            la_words['B'][LA][d.text].active = false;
            var newWords = wordsection.reduce(redfun, [])
                                      .sort(sortfun)
                                      .slice(0, 100);
            fontScale = fontScale.domain([newWords[0].weight, newWords[99].weight]);
            layout.stop();
            layout.words(newWords)
                  .fontSize(function(d) {return fontScale(d.weight);});
            layout.start();
          })
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .style("opacity", 1e-6)
          .transition()
            .duration(1e3)
            .style("opacity", 1);
    
    wordcloud
      .transition()
        .duration(1e3)
        .style("opacity", 1)
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        });
    
    wordcloud.merge(enter)
      .style("font-size", function(d){return d.size;});;
        

    wordcloud.exit()
             .transition()
             .duration(1e3)
             .style("opacity", 1e-6)
             .remove();
  }

  //we should add transitions to this
  //especially as I'm keeping track of individual words; should be good to see them shuffle when words are removed or a new location selected
  //location selection will be using .nest
  //not certain the data mutability will work. Worth a test.
}
$(document).ready(function(){
  $(".filter").on('change', function(){
    var area = $("#LASelecto>option:selected").text();
    var weight = $("#WeightSelecto>option:selected").text();
    $(window).location.hash = "area=${area}&weight=${weight}";
    //change this so that it works as an API query
  })
  $(window).on('hashchange', function(){
    d3.json("../api/v1/?" + $(window).location.hash,
      make_cloud)
  })
})

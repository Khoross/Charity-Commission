/*
SNIPPET FOR ADDING ON HOVER TOOLTIPS
ADD TO WORDS IN MAP
Contents of tooltip will depend on the mode selected
Initially, will rujn on only one mode
tooltip will read:
    {WORD}
    Present in objectives for {XX}% ({YY}) charities in {AREA}
    Present in objectives for {XX}% ({YY}) charities overall
    Weighting: {XX}
TODO: look into javascript string formatting
*/


var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

.on("mouseover", function(d) {
    div.transition()
         .duration(200)
         .style("opacity", .9);
    div.html(
             d.word + "<br/>" +
             "Present in objectives for % () charities in <br/>" + 
             "Present in objectives for % () charities overall <br/>" + 
             "Weighting: "
            )
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
})
.on("mouseout", function(d) {
    div.transition()
         .duration(500)
         .style("opacity", 0);
});
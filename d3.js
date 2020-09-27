let climate_daly_data = [
        {region: "Low-and-middle-income countries of the African Region", deaths: 57},
        {region: "Low-and-middle-income countries of the Americas", deaths: 2},
        {region: "Low-and-middle-income countries of the Eastern Mediterranean Region", deaths: 20},
         {region: "Low-and-middle-income countries of the European Region", deaths: 0.67},
         {region: "Low-and-middle-income countries of the South-East Asia Region", deaths: 58},
        {region: "Low-and-middle-income countries of the Western Pacific Region", deaths: 4},
        {region: "High income countries", deaths: 0.23}
 ];


let toggleClass = (i,toggle) => {
   d3.select("#viz div:nth-child("+ i +")").classed("highlightBar",toggle);
   d3.select("#legend li:nth-child("+ i +")").classed("highlightText",toggle);
};

var divSelection = d3.select('#viz')
    .selectAll('div')
    .data(climate_daly_data)
    .enter()
    .append('div')
    .attr('class', 'bar')
    .style("width", function(d){
        return d.deaths * 8 + "px"
    })
    .on("mouseover", function(d, i){
      toggleClass(i+1, true)
    })
     .on("mouseout", function(d, i){
      toggleClass(i+1, false)
    })

var listSelection = d3.select('#legend')
    .selectAll('li')
    .data(climate_daly_data)
    .enter()
    .append('li')
    .text(function(d) { 
     return d.region + ": " + d.deaths + " deaths";
	 })
   .on("mouseover", function(d, i){
      toggleClass(i+1, true)
    })
     .on("mouseout", function(d, i){
      toggleClass(i+1, false)
    })


    // puts the <svg></svg> html el in the variable svg. 
//sets the width and height (defined in html) in that var too.
//calculate the radius - chooses whichever of the width and height is the minimum value. the radius of the pie chart is half the width or half the height. WHichever is smaller. 

 var chart1 = d3.select(".chart1"),
        width = chart1.attr("width"),
        height = chart1.attr("height"),
        radius = Math.min(width, height) / 2

//make a group (g) to hold pie chart
//then g.... appends a group el to our svg to group all the pie els together. 
// move the center of pie chart from 0,0 to radius, radius
var g = chart1.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        //select colours
var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

// Generate the pie - // 
    var pie = d3.pie()
            //tells it where to get the data. 
            .value(function(d){
                return d.totalTimeFocusedOnTask;
            });

    //create a new arc generator and set the inner and outer radius of it.  
    var path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    // Generate the arcs
    var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

    // this is setting WHERE we want our labels to sit in our wedges. 
    var label = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 80);

    //Generate groups for each of our data values. This group el holds our individual paths or wedges. 
    // selects all els in the arc class
    // the .data method holds in the data in a waiting state, ready for something to be done on it. 
    // the .enter method calls all the following methods on each data item. 
    //assigns the class arc to each el in the group. 
    var arcs = g.selectAll(".arc")
                .data(pie(list.taskList))
                .enter()
                .append("g")
                .attr("class", "arc")

    //Draw arc paths for each of the pie wedges. 
    //append a path el to the group (arcs)
    arcs.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return color(d.data.browser); });
        
        console.log(arc)


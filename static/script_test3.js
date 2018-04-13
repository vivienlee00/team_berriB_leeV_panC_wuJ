/*
  BlwuBerrLee-Pancakes
  SoftDev2 pd7
*/
//======================================================================
//                          VAR DECLARATION
//======================================================================

var shootings;
var get_data = function(){
    d3.csv("../static/data/shootings.csv", function(data){
	data.forEach(function(d){
	    d["S#"] = +d["S#"];
	    d.Fatalities = +d.Fatalities;
	    d.Injured = +d.Injured;
	    d["Total victims"] = +d["Total victims"];
	    //d.Latitude = +d.Latitude;
	    //d.Longitude = +d.Longitude;
	});
	shootings = data;
    });
}
//get_data()
var decade_count = {};
var by_decade = function(){
    get_data();
    for (x in shootings){
	decade = shootings[x].Date.substr(-4).substr(0,3) + "0";
	console.log(decade);
	if (decade_count[decade] == undefined){
	    decade_count[decade] = 1;
	}
	else{
	    decade_count[decade] += 1;
	}
    };
}


//need to fix data parsing
// var years = []; //initializing list of arrays
// //finds total number of shootings per decade
// d3.csv("../data/shootings.csv", function(data){
//   for (var i = 0; i < data.length; i++) {
//     //takes date of data and retrieves the year, adds to array
//     years.push(parseInt(data[i].Date.split("/")[2]));
//   }
//   console.log(years);
//
//   //counts total number of shootings per decade
//   var decades = []; //initialize empty list
//   var count = 0; //initial 0
//   console.log(years.length);
//   for (var i = 0; i < years.length; i++){
//     var year = 1970; //starting year
//     console.log(years[i]);
//     if (years[i] > year){
//       decades.push(count);
//       count = 0;
//       year = year + 10; //decade increment
//     }
//     count += 1;
//   }
//
//   console.log(decades);
// });

var decades = [8,22,48,44,196]; //dummy data representing # shootings in decade
var decadenum = 0;

var svg=d3.select("svg");
var width= svg.attr("width");
var height= svg.attr("height");
var barHeight = 50; //height of timeline blocks


var margin = { top: 40, right: 40, bottom: 100, left: 40 };

var setup=function(){

}

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

var bar = chart.selectAll("g")
    .data(decades)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(" + i * (width/5) + "," + ((height/2)-(barHeight/2)) +")"; });

console.log("hi");
bar.append("rect")
  .attr("width", width/5)
  .attr("height", barHeight)
  .style("fill-opacity", function(d) {return d/100.; })
  .on("mouseover",function(){//TOOLTIP STARTS HERE!!
    tooltip.style("display",null);

  })
  .on("mouseout",function(){
    tooltip.style("display","none");
  })
  .on("mousemove",function(){
    var xPos=d3.mouse(this)[0];
    var yPos=d3.mouse(this)[1];
    var xPosAbs=d3.mouse(bar.node())[0];
    console.log(xPosAbs);
    tooltip.attr("transform","translate("+xPos+","+yPos+")");
    var shootingsnum = 0;
    if (xPosAbs > 1200){
      shootingsnum = 196;
    }
    else if (xPosAbs > 900)
    {
      shootingsnum = 44;
    }
    else if (xPosAbs > 600)
    {
      shootingsnum = 48;
    }
    else if (xPosAbs > 300)
    {
      shootingsnum = 22;
    }
    else if (xPosAbs > 000)
    {
      shootingsnum = 8;
    }
    tooltip.select("text").text(shootingsnum + " mass shootings have occurred during this decade");
  });
var tooltip=svg.append("g")
    .attr("class",tooltip)
    .style("display","none");
tooltip.append("text")
  .attr("x",15)
  .attr("dy","1.2em")
  .style("font-size","1.25em")
  .attr("font-weight","bold");


var xScale = d3.scaleLinear()
    .domain([1967, 2017])
    .range([0, width]);
//.range([margin.left, width - margin.right]);

var xAxis = d3.axisBottom(xScale);

var bottomaxis = svg.append("g")
bottomaxis.call(xAxis);
bottomaxis.attr("transform", "translate(0," + 375 + ")");
//TOOLTIP:
/*
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
*/
/*
  var color = d3.scale.category20(); //a color scale that d3 has built in!
  var data = [
  [{y:21},{y:10},{y:10},{y:38},{y:20}],
  [{y:14},{y:25},{y:21},{y:10},{y:10}],
  [{y:14},{y:35},{y:21},{y:10},{y:4}]
  ];

  var stack = d3.layout.stack();
  stack(data); //stackifying the data

  var max = d3.max(data, function(d) {
  return d3.max(d, function(v) {
  return v.y + v.y0
  })
  })

  var height = 416;
  var yscale = d3.scale.linear()
  .domain([0, max])
  .range([0, height]);

  var group = svg.append("g") //create a group so you can move everything around together
  .attr("transform", "translate(" + [100, 100] + ")")

  var layers = group.selectAll("g")
  .data(data)
  .enter()
  .append("g")
  .style({
  fill: function(d,i) { return color(i) }
  })

  var stacks = layers.selectAll("rect")
  .data(function(d) { return d }) //create one shape for each data point
  .enter()
  .append("rect")
  .attr({
  width: 30,
  height: function(d,i) {
  return yscale(d.y)
  },
  x: function(d,i) {
  return i * 40 //this is just a way to make the bars a certain distance apart
  },
  y: function(d,i) {
  return height - yscale(d.y0 + d.y) //subtract cause you flip it!
  }

  })
*/
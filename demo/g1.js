$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "n2_nostop.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});


function processData(allText){
	var X = [];
var Y = [];
	var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(';');
    for(o=40;o>=0;o--){
    	for (var i=0; i<allTextLines.length; i++) {
	        var data = allTextLines[i].split(';');
	        if (data.length == headers.length && parseInt(data[1])==o ) {
	            X.push(data[0]);
	            Y.push(data[1]);
	        }
	    }
    }
    $("#wrapper").html("");
    console.log(X,Y);
    init(X,Y)
}
function init(X,Y){
	var categories= X;

		var dollars = Y;

		var colors = ['#000'];

		var grid = d3.range(5).map(function(i){
			return {'x1':0,'y1':0,'x2':0,'y2':180};
		});

		var tickVals = grid.map(function(d,i){
			if(i>0){ return i*10; }
			else if(i===0){ return "100";}
		});

		var xscale = d3.scale.linear()
						.domain([3,40])
						.range([0,722]);

		var yscale = d3.scale.linear()
						.domain([0,categories.length/2.5])
						.range([0,480]);
		var yscaleText = d3.scale.linear()
						.domain([0,categories.length/1.75])
						.range([0,480]);

		var colorScale = d3.scale.quantize()
						.domain([0,categories.length])
						.range(colors);

		var canvas = d3.select('#wrapper')
						.append('svg')
						.attr({'width':400,'height':800});

		// var grids = canvas.append('g')
		// 				  .attr('id','grid')
		// 				  .attr('transform','translate(150,10)')
		// 				  .selectAll('line')
		// 				  .data(grid)
		// 				  .enter()
		// 				  .append('line')
		// 				  .attr({'x1':function(d,i){ return i*30; },
		// 						 'y1':function(d){ return d.y1; },
		// 						 'x2':function(d,i){ return i*30; },
		// 						 'y2':function(d){ return d.y2; },
		// 					})
		// 				  .style({'stroke':'#adadad','stroke-width':'1px'});

		var	xAxis = d3.svg.axis();
			xAxis
				.orient('bottom')
				.scale(xscale)
				.tickValues(tickVals);

		var	yAxis = d3.svg.axis();
			yAxis
				.orient('left')
				.scale(yscaleText)
				.tickSize(2)
				.tickFormat(function(d,i){ return ""; })
				.tickValues(d3.range(50));

		// var y_xis = canvas.append('g')
		// 				  .attr("transform", "translate(150,0)")
		// 				  .attr('id','yaxis')
		// 				  .call(yAxis);

		var x_xis = canvas.append('g')
						  .attr("transform", "translate(150,0)")
						  .attr('id','xaxis')
						  .call(xAxis);

		var chart = canvas.append('g')   //BARRAS
							.attr("transform", "translate(150,0)")
							.attr('id','bars')
							.selectAll('rect')
							.data(dollars)
							.enter()
							.append('rect')
							.attr('height',2)
							.attr({'x':0,'y':function(d,i){ return yscale(i)+52; }})
							.style('fill',function(d,i){ return "rgba(0,0,0,.2)"; })
							.attr('width',function(d){ return 0; });


		var transit = d3.select("svg").selectAll("rect")
						    .data(dollars)
						    .transition()
						    .duration(1000) 
						    .attr("width", function(d) {return xscale(d); });

		var transitext = d3.select('#bars') //LABELS DEL FINAL
							.selectAll('text')
							.data(dollars)
							.enter()
							.append('text')
							.attr({'x':function(d) {return xscale(d)+20; },'y':function(d,i){ return yscale(i)+55; }})
							.text(function(d,i){ return categories[i]; }).style({'fill':'#000','font-size':'11px'});
		

}
/* rede sociales, uso, identidad, secuestro,personales*/


    var matrix = [
      [ "","P1",  "P2",  "P3"],
       [ "redes sociales",15,  15,  11],
       [ "uso",24,  17,  31],
       [ "identidad",9,  0,  0],
       [ "secuestro",8,  1,  0],
       [ "datos personales",6,  7,  0],
    ];
    var labels=["redes sociales", "uso", "identidad", "secuestro","personales"];

    // selecting the body
    var body = d3.select("#g3");

    // append a table element to the body
    var table = body.append("table");

    // append entering rows to the table via data-join (Since selectAll is called on the selected table element, it establishes a new parent node of table instead of the default html)
    var tr = table.selectAll("tr")
            .data(matrix)
            .enter()
            .append("tr");

    // append entering cells to each row
    var td = tr.selectAll("td")
            .data(function(d,i) { 
            	console.log(i,d);
            	//if(0==0){ return i }
            	return d; 
            })
            .enter()
            .append("td");


    // add content from the dataset
    var content = td.text(function(d) { return d; });

    // manipulate colour of specific cells and rows: j is row ,and i is column
    td.style("background-color", function(d, i, j) { 
    	if(j<1 && i<1 ){ return "white"; }
    	else if(i<1 || j<1){
    		return null;
    	}
    	else{
    		op=matrix[j][i]/31;
    		return "rgba(0,204,153,"+op+")";
    	}
    	

    });


const csv = require('csv-parser');  
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

/*
El propósito de este script es leer los datos de la La Encuesta Nacional Agropecuaria 2017 de INEGI 
Y preparar los datos para su visualización en un navegador.
A continuación se detallan los pasos:
1-Existen muchos campos vacíos con producción 0, por lo que primero se realiza una limpieza del archivo.
2-En esta limpieza también se considera el nivel al cual queremos graficar, en este caso municipal.
3-Se crea un archivo CSV con el archivo limpio.
4-El procesador que junta la información en un geoJSON se encuentra en geojoin.js
*/

 //Diccionario de códigos de los estados de la república
di = {
      'Aguascalientes': '1',
      'Baja California': '2',
      'Baja California Sur': '3',
      'Campeche': '4',
      'Coahuila de Zaragoza': '5',
      'Colima': '6',
      'Chiapas': '7', 
      'Chihuahua': '8',
      'Ciudad de México': '9',
      'Durango': '10',
      'Guanajuato': '11',
      'Guerrero': '12',
      'Hidalgo' : '13',
      'Jalisco': '14',
      'México' : '15',
      'Michoacán de Ocampo': '16',
      'Morelos': '17',
      'Nayarit': '18',
      'Nuevo León': '19',
      'Oaxaca': '20',
      'Puebla': '21',
      'Querétaro': '22',
      'Quintana Roo': '23',
      'San Luis Potosí': '24',
      'Sinaloa': '25',
      'Sonora': '26',
      'Tabasco': '27',
      'Tamaulipas': '28',
      'Tlaxcala': '29',
      'Veracruz de Ignacio de la Llave': '30',
      'Veracruz de Ignacio de la': '30',
      'Yucatán': '31',
      'Zacatecas': '32',  
     } 
var producto=0;
var firstflag=0;
const csvWriter = createCsvWriter({
    path: 'cleanENA2017.csv',
    header: ["AGRUPACION1","AGRUPACION2","AGRUPACION3","AGRUPACION4","AGRUPACION5","DESCRIPCION","VALOR","TABULADO","ESTATUS" ]
});
var cleanS1=[]; // Variable donde se encuentra el csv sin datos nulos
//Lector de CSV
fs.createReadStream('tr_ena_agropecuario_2017.csv')  
  .pipe(csv())
  .on('data', (row) => {
    var arrOfVals = [];
	for( key in row ){
    	arrOfVals.push( row[key] );
	}
	//Hay que eliminar los datos de información no desagregada por entidad y solo nos interesa la producción total
    if ( (arrOfVals[0] =="Estados Unidos Mexicanos" || arrOfVals[0] =="ESTADOS UNIDOS MEXICANOS") && "Producción obtenida-Toneladas" && arrOfVals[2] !="" && arrOfVals[4]!='') {
    	if (arrOfVals[4]!=producto) { //Solo nos interesa el dato de producción total
    		valor = parseFloat(arrOfVals[6])
	    //Solo nos interesan los valores no-nulos
	    	if (valor>0) {
	    		row.AGRUPACION2=di[row.AGRUPACION2]
	    		cleanS1.push(row);
	    		//console.log(cleanS1) //control
	    	}
	    	producto=arrOfVals[4];
    	}
    	else{
    		producto=arrOfVals[4];
    	}
    	
    	
    	
    	
    }
    
  })
  .on('end', () => {
  	csvWriter.writeRecords(cleanS1)       // Escribe el archivo limpio
    .then(() => {
        console.log('...Done');
    });
    console.log('CSV file successfully processed');
 });



  
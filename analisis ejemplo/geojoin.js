const csv = require('csv-parser');  
const fs = require('fs');
var util = require('util');
/*
Script para generar un json de consumo
*/

var diccionarioENA2017={}; // Variable donde se encuentra el csv sin datos nulos
for (var i = 0; i < 33 ;i++) {
      diccionarioENA2017[i]={};
}
//Lector de CSV
fs.createReadStream('cleanENA2017.csv')  
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
    
    //Se asegura que existan las claves
      if (!(row.municipio in diccionarioENA2017[row.estado]) ){
        diccionarioENA2017[row.estado][row.municipio]=[];
      }
    diccionarioENA2017[row.estado][row.municipio].push({"producto" :row.producto, "valor" :row.VALOR, "desc":row.DESCRIPCION});

    
    
    
  })
  .on('end', () => {
    
    fs.writeFileSync('./data.json', JSON.stringify(diccionarioENA2017, null, 2) , 'utf-8');
    console.log('CSV file successfully processed',diccionarioENA2017);
 });


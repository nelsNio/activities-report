var Zip = require("adm-zip");

// loads and parses existing zip file local_file.zip
var zip = new Zip("Archivo.zip");
// var zip = new Zip("users.txt.zip");

zip.getEntries().forEach(function(entry) {
    console.log("=====          Iniciando archivo         --------");
    var entryName = entry.entryName;
    var decompressedData = zip.readFile(entry); // decompressed buffer of the entry
    // console.log(zip.readAsText(entry)); // outputs the decompressed content of the entry  
    console.log(entryName)

    console.log("=====          Finalizando archivo         --------");

});
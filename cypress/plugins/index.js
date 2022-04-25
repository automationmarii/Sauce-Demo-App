/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

 //const excelToJson = require('convert-excel-to-json');
 
 const fs = require('fs');
 const XLSX = require('xlsx');
 const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
 module.exports = (on, config) => {

  on('before:run', async (details) => {
    console.log('override before:run');
    await beforeRunHook(details);
  });

  on('after:run', async () => {
    console.log('override after:run');
    await afterRunHook();
  });


   on('task', {
     readExcel({
       rootPath
      
     }) {
       
         const workbook = XLSX.readFile(rootPath);
         const sheet_name_list = workbook.SheetNames;
         let jsonPagesArray = [];
         sheet_name_list.forEach(function (sheet) {
           // let workSheeet = workbook.Sheets(sheet)
           const jsonPage = {
             name: sheet,
             content: JSON.parse(JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[sheet],
 
               {
                 defval: "",
               }
             )))
           }
           jsonPagesArray.push(jsonPage);
         })
         fs.writeFileSync(
 
           `./cypress/fixtures/InventoryDetails.json`,
           JSON.stringify(jsonPagesArray, (key, value) => {
             if (typeof value === 'string') {
               return value.trim();
             }
             return value;
           }),
           "utf-8"
         );
      
       return null
     }
   })
   // `on` is used to hook into various events Cypress emits
   // `config` is the resolved Cypress config
 }
//<reference types ='cypress' />
class JsonData {

    // This is the method used to get the product names from test json data
    getProductNames() {
        let productNames = []
        const testData = require(`../../../cypress/fixtures/InventoryDetails.json`);
        testData.map((element, ind, array) => {
            element['content'].map((val, inx) => {
                productNames.push(val['Product Name'])

            })
        })
        return productNames
    }

    //This is the methd used to get the product Prize accoeding to the product name
    getProductPrice(prodName) {
        let productPrize = ''
        const testData = require(`../../../cypress/fixtures/InventoryDetails.json`);
        testData.map((element, ind, array) => {
            element['content'].map((val, inx) => {
                if (val['Product Name'] === prodName) {
                    productPrize = val['Price']
                }
            })
        })
        return productPrize
    }


    //This is the methd used to get the product description accoeding to the product name
    getProductDescription(prodName) {
        let productDesc = ''
        const testData = require(`../../../cypress/fixtures/InventoryDetails.json`);
        testData.map((element, ind, array) => {
            element['content'].map((val, inx) => {
                if (val['Product Name'] === prodName) {
                    productDesc = val['Product Description']
                }
            })
        })
        return productDesc
    }


    // This is the method used to get the Price lists from test json data
    getProductPriceLists() {
        let priceLists = []
        const testData = require(`../../../cypress/fixtures/InventoryDetails.json`);
        testData.map((element, ind, array) => {
            element['content'].map((val, inx) => {

                priceLists.push(Number(val['Price'].replace('$', '')))

            })
        })
        let newar = priceLists.filter((v, i, a) => a.indexOf(v) === i)
        return newar.sort(function (a, b) { return a - b; })
    }


    // This is the method used to get the productNames according to the High to Low from test json data
    getProductNameOrderByPriceHighToLow() {
        let productNames = []
        const testData = require(`../../../cypress/fixtures/InventoryDetails.json`);
        testData.map((element, ind, array) => {
            this.getProductPriceLists().reverse().map((price, index) => {
                element['content'].map((val, inx) => {
                    if (Number(val['Price'].replace('$', '')) === price) {
                        productNames.push(val['Product Name'])
                    }


                })
            })
        })

        return productNames
    }

    // This is the method used to get the productNames according to the Low to High from test json data
    getProductNameOrderByPriceLowToHigh() {
        let productNames = []
        const testData = require(`../../../cypress/fixtures/InventoryDetails.json`);
        testData.map((element, ind, array) => {
            this.getProductPriceLists().map((price, index) => {
                element['content'].map((val, inx) => {
                    if (Number(val['Price'].replace('$', '')) === price) {
                        productNames.push(val['Product Name'])
                    }


                })
            })
        })

        return productNames
    }


    //This is the methd used to get the total product Prize accoeding to the product names
    getTotalProductPrice(prodNames=[]) {
        let totalPrize = 0
        const testData = require(`../../../cypress/fixtures/InventoryDetails.json`);
        prodNames.map((prodName)=>
        {
            testData.map((element, ind, array) => {
                element['content'].map((val, inx) => {
                    if (val['Product Name'] === prodName) {
                        totalPrize = totalPrize + Number(val['Price'].replace('$', ''))
                    }
                })
            })
        })
        
        return totalPrize
    }

//This is the methd used to get the Tax Prize accoeding to the product names
    getTotalTaxPrice(prodNames=[],taxPrize) {
        let totalPrize = 0
        const testData = require(`../../../cypress/fixtures/InventoryDetails.json`);
        prodNames.map((prodName)=>
        {
            testData.map((element, ind, array) => {
                element['content'].map((val, inx) => {
                    if (val['Product Name'] === prodName) {
                        totalPrize = totalPrize + Number(val['Price'].replace('$', ''))
                    }
                })
            })
        })
        
        return (totalPrize * taxPrize).toFixed(2)
    }


}
export default JsonData
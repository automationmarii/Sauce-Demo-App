/// <reference types="cypress" />

import JsonData from '../../support/Utils/JsonData.js'
describe('Sauce Demo Specs', () => {

  const BaseURL = Cypress.env('url')
  const userName = Cypress.env('uName')
  const password = Cypress.env('pWord')
  const jsonData = new JsonData()

  before(() => {
    //Step 1) Navigate to the Target URL
    cy.visitURL(BaseURL)

  })

  beforeEach(function () {
    //Step 2) Login to Sauce Demo
    cy.loginSauce(userName, password)
  })

  afterEach(() => {
    cy.clickMenuItems('logout')
  })


  it('SD-001 Verify the total product lists are listed in the sauce demo Correctly', () => {
    let productNames = jsonData.getProductNames()
    // verify the product names
    productNames.map((pName, index) => {
      cy.sauceDemoProductLists().then((produtList) => {
        //Step 3) Verify the Product Name Home Page
        expect(produtList).to.deep.eq(jsonData.getProductNames())
        //Step 4) Verify the Product Price Home Page
        cy.getProductPrice(pName).then((price) => {
          expect(price).to.eq(jsonData.getProductPrice(pName))
        })
        //Step 5) Verify the Product Description Home Page
        cy.getProductdescription(pName).then((desc) => {
          expect(desc).to.eq(jsonData.getProductDescription(pName))
        })
        //Step 6) Verify the Cart to button is Displayed Home Page
        cy.verifyAddToCart(pName)

        //Step 7) Verify Prodcut Image in Home Page
        cy.get('#inventory_container .inventory_item img')
          .eq(0)
          .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.34e7aa42.jpg')
      })
    })
  })


  it('SD-002 Verify Filters are working according to the filtered option', () => {
    //Step 3) Verify the Filter option Name (Z to A)
    cy.selectFilter('Name (Z to A)')
    cy.sauceDemoProductLists().then((produtList) => {
      expect(produtList).to.deep.eq(jsonData.getProductNames().sort().reverse())
    })
    //Step 4) Verify the Filter option Name (A to Z)
    cy.selectFilter('Name (A to Z)')
    cy.sauceDemoProductLists().then((produtList) => {
      expect(produtList).to.deep.eq(jsonData.getProductNames().sort())
    })
    //Step 5) Verify the Filter option price (low to high)
    cy.selectFilter('Price (low to high)')
    cy.sauceDemoProductLists().then((produtList) => {
      expect(produtList).to.deep.eq(jsonData.getProductNameOrderByPriceLowToHigh())
    })
    //Step 6) Verify the Filter option Price (high to low)
    cy.selectFilter('Price (high to low)')
    cy.sauceDemoProductLists().then((produtList) => {
      expect(produtList).to.deep.eq(jsonData.getProductNameOrderByPriceHighToLow())
    })
  })


  it('SD-003 Verify Product Details in Product details page', () => {
    let productCount = jsonData.getProductNames().length
    let randomProduct = Math.floor(Math.random() * ((productCount - 1) - 1) + 1)
    console.log(randomProduct)
    let productName = jsonData.getProductNames()[randomProduct]
    //Step 3) Click any one product name in home page
    cy.clickProduct(productName)
    //Step 4) Verify the Product Name Product Details Page
    cy.getProductNameInDetailsPage().then((product) => {
      expect(product).to.eq(productName)
    })
    //Step 5) Verify the Product Price Product Details Page
    cy.getProductPriceInDetailsPage(productName).then((price) => {
      expect(price).to.eq(jsonData.getProductPrice(productName))
    })
    //Step 6) Verify the Product Description  Product Details Page
    cy.getProductDescInDetailsPage(productName).then((desc) => {
      expect(desc).to.eq(jsonData.getProductDescription(productName))
    })


    cy.contains('#back-to-products', 'Back to products').click()
    cy.elementSelector('#inventory_container').should('be.visible')
  })


  it('SD-004 Verify the Add to cart/Remove Count after added/Removed the product into cart', () => {
    let productName1 = jsonData.getProductNames()[4]
    //Step 3) Click any one product "Add To cart"
    cy.clickAddToCart(productName1)
    cy.getCountInAddToCart().then((count) => {
      expect(count).to.eq(1)
    })
    //Step 4) Click the Remove button the same product
    cy.clickRemove(productName1)
    cy.get('.shopping_cart_link .shopping_cart_badge').should('not.exist')

  })



  it('SD-005 Verify the Product Details in cart Page after added the product into cart', () => {
    let productName1 = jsonData.getProductNames()[3]
    //Step 3) Click any one product "Add To cart"
    cy.clickAddToCart(productName1)
    //Step 4) Click the Cart icon
    cy.clickCart()
    cy.getCartQuantity().then((qty) => {
      expect(qty).to.eq(1)
    })
    //Step 5) Verify the Product Name in Carts Page
    cy.getproductNameInCartPage().then((productNames) => {
      expect(productNames).to.deep.eq([productName1])
    })
    //Step 6) Verify the Product Price in Carts Page
    cy.getProductPriceInCartsPage(productName1).then((price) => {
      expect(price).to.eq(jsonData.getProductPrice(productName1))
    })
    //Step 7) Verify the Product Description in Carts Page

    cy.getProductdescriptionInCartsPage(productName1).then((desc) => {
      expect(desc).to.eq(jsonData.getProductDescription(productName1))
    })

    cy.clickContinueShopping()
    cy.clickRemove(productName1)
    cy.get('.shopping_cart_link .shopping_cart_badge').should('not.exist')

  })

  it('SD-006 Verify the Continue shopping and remove after add items in carts page', () => {
    let productName1 = jsonData.getProductNames()[1]
    //Step 3) Click first product "Add To cart"
    cy.clickAddToCart(productName1)
    //Step 4) Click the Cart icon
    cy.clickCart()
    cy.getCartQuantity().then((qty) => {
      expect(qty).to.eq(1)
    })
    //Step 5) Verify the first Product Name in Carts Page
    cy.getproductNameInCartPage().then((productNames) => {
      expect(productNames).to.deep.eq([productName1])
    })
    //Step 6) Verify the first Product Price in Carts Page
    cy.getProductPriceInCartsPage(productName1).then((price) => {
      expect(price).to.eq(jsonData.getProductPrice(productName1))
    })
    //Step 7) Verify the first Product Description in Carts Page
    cy.getProductdescriptionInCartsPage(productName1).then((desc) => {
      expect(desc).to.eq(jsonData.getProductDescription(productName1))
    })
    //Step 8) Click the Continue Shopping
    cy.clickContinueShopping()


    let productName2 = jsonData.getProductNames()[4]
    //Step 9) Click the second product "Add To cart"
    cy.clickAddToCart(productName2)
    cy.getCountInAddToCart().then((count) => {
      expect(count).to.eq(2)
    })


    cy.clickCart()

    //Step 10) Verify the second Product Name in Carts Page
    cy.getproductNameInCartPage().then((productNames) => {
      expect(productNames).to.deep.eq([productName1, productName2])
    })
    //Step 11) Verify the second Product Price in Carts Page
    cy.getProductPriceInCartsPage(productName2).then((price) => {
      expect(price).to.eq(jsonData.getProductPrice(productName2))
    })
    //Step 12) Verify the second Product Description in Carts Page
    cy.getProductdescriptionInCartsPage(productName2).then((desc) => {
      expect(desc).to.eq(jsonData.getProductDescription(productName2))
    })


    cy.cartListCount().then((count) => {
      expect(count).to.eq(2)
    })
    //Step 13) click the Remove In carts details page for any selected product
    cy.clickRemoveInCartsPage(productName2)
    cy.cartListCount().then((count) => {
      expect(count).to.eq(1)
    })
    cy.getCountInAddToCart().then((count) => {
      expect(count).to.eq(1)
    })

    cy.clickRemoveInCartsPage(productName1)
    cy.get('.shopping_cart_link .shopping_cart_badge').should('not.exist')

  })

  it('SD-007 Verify the Add to cart added details retains after logout and login again', () => {
    let productName1 = jsonData.getProductNames()[4]
    //Step 3) Click any one product "Add To cart"
    cy.clickAddToCart(productName1)
    cy.getCountInAddToCart().then((count) => {
      expect(count).to.eq(1)
    })
    //Step 4) Logout 
    cy.clickMenuItems('logout')
    //Step 5) Login 
    cy.loginSauce(userName, password)
    //Step 6) Veriy the carts count in the home page 
    cy.getCountInAddToCart().then((count) => {
      expect(count).to.eq(1)
    })
    //Step 7) click the cart icon
    cy.clickCart()
    //Step 8) Verify the Product Name in Carts Page
    cy.getproductNameInCartPage().then((productNames) => {
      expect(productNames).to.deep.eq([productName1])
    })
    //Step 9) Verify the Product Price in Carts Page
    cy.getProductPriceInCartsPage(productName1).then((price) => {
      expect(price).to.eq(jsonData.getProductPrice(productName1))
    })
    //Step 10) Verify the Product Description in Carts Page
    cy.getProductdescriptionInCartsPage(productName1).then((desc) => {
      expect(desc).to.eq(jsonData.getProductDescription(productName1))
    })

    cy.clickRemoveInCartsPage(productName1)
    cy.get('.shopping_cart_link .shopping_cart_badge').should('not.exist')

  })


  it('SD-008 Verify the Add to cart added details in the checkout page', () => {
    let productName1 = jsonData.getProductNames()[4]
    let productName2 = jsonData.getProductNames()[5]
    //Step 3) Click any two products "Add To cart"
    cy.clickAddToCart(productName1)
    cy.clickAddToCart(productName2)
    //Step 4) click the cart icon
    cy.clickCart()
    //Step 5) click the checkout
    cy.clickCheckout()
    //Step 6) Fill the user details forms and continue
    cy.userInfo('Mari', 'Murugan', '123456')
    //Step 7) Verify those two Product Names in Checkout Page
    cy.getproductNameInCheckoutPage().then((productNames) => {
      expect(productNames).to.deep.eq([productName1, productName2])
    })
    //Step 8) Verify those two Product Prices in Checkout Page
    cy.getProductPriceInCheckoutPage(productName1).then((price) => {
      expect(price).to.eq(jsonData.getProductPrice(productName1))
    })

    cy.getProductPriceInCheckoutPage(productName2).then((price) => {
      expect(price).to.eq(jsonData.getProductPrice(productName2))
    })

    //Step 9) Verify the those two Product Descriptions in Checkout Page
    cy.getProductdescriptionInCartsPage(productName1).then((desc) => {
      expect(desc).to.eq(jsonData.getProductDescription(productName1))
    })

    cy.getProductdescriptionInCheckoutPage(productName2).then((desc) => {
      expect(desc).to.eq(jsonData.getProductDescription(productName2))
    })


    cy.cartListCount().then((count) => {
      expect(count).to.eq(2)
    })

    //Step 10) Verify the Total Price
    let tPrize = jsonData.getTotalProductPrice([productName1, productName2])
    cy.getItemTotalInCheckoutPage().then((price) => {
      expect(price).to.eq(`Item total: $${tPrize}`)
    })
    //Step 11) Verify the Tax Price
    let taxPrize = (tPrize * 0.08).toFixed(2)
    cy.getTaxAmount().then((tax) => {
      expect(tax).to.eq(`Tax: $${taxPrize}`)
    })
    //Step 12) Verify the Final Price
    let finalTotal = (Number(tPrize) + Number(taxPrize)).toFixed(2)
    cy.getSummaryTotalAmount().then((summaryTotal) => {
      expect(summaryTotal).to.eq(`Total: $${finalTotal}`)
    })

    //Step 13) click finish and verify the succes message for purchase
    cy.clickFinish()

    cy.getSuccessMessage().then((success) => {
      expect(success).to.eq('THANK YOU FOR YOUR ORDER')
    })
  })
})

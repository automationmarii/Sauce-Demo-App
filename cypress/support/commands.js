import 'cypress-wait-until';


// common method used for get the element
Cypress.Commands.add('elementSelector', (selector) => {
  cy.get(selector)
})

// common method used for type the Value in to the field
Cypress.Commands.add('typeValue', (selector, val) => {
  cy.elementSelector(selector).should('exist').then((element) => {
    cy.wrap(element).wait(10).focus().clear().type(val)
  })
})

// common method used for Select the element from dropdown
Cypress.Commands.add('selectValue', (selector, val) => {
  cy.elementSelector(selector).then((element) => {
    cy.wrap(element).select(val)
  })
})

// common method used for Click the element
Cypress.Commands.add('clickElement', (selector) => {
  cy.elementSelector(selector).then((element) => {
    cy.wrap(element).click()
  })
})

// This is the method used  Load the URL
Cypress.Commands.add('visitURL', (url) => {
  cy.visit(url)
  cy.get('.login_logo').should('be.visible')
})


// This is the method used  Login the Sauce Demo application
Cypress.Commands.add('loginSauce', (uName, pWord) => {
  cy.get('.login_logo').should('be.visible')
  cy.typeValue('#user-name', uName)
  cy.typeValue('#password', pWord)
  cy.clickElement('#login-button')
})


// This is the method used  Login the Sauce Demo application
Cypress.Commands.add('logoutSauce', () => {
  cy.get('#react-burger-menu-btn').should('be.exist')
  cy.get('#react-burger-menu-btn').scrollIntoView({ easing: 'linear' })
  cy.get('#react-burger-menu-btn').trigger('click')
  cy.get("#logout_sidebar_link").click()
  cy.get('#login-button').should('be.visible')
})
// This is the method used  select the menu items
Cypress.Commands.add('clickMenuItems', (menuAuction) => {
  cy.get('#react-burger-menu-btn').should('be.exist')
  cy.get('#react-burger-menu-btn').scrollIntoView({ easing: 'linear' })
  cy.get('#react-burger-menu-btn').trigger('click').then(() => {
    switch (menuAuction) {
      case 'All Items':
        cy.get("#inventory_sidebar_link").click()
        cy.elementSelector('#inventory_container').should('be.visible')
        break;
      case 'logout':
        cy.get("#logout_sidebar_link").trigger('click')
        cy.get('#login-button').should('be.visible')
        break;
      case 'reset':
        cy.get("#reset_sidebar_link").click()
        break;
      case 'about':
        cy.get("#about_sidebar_link").click()
        break;
      default:
        break;
    }
  })
})


// This is the method used to get the total product lists
Cypress.Commands.add('sauceDemoProductLists', () => {
  let productLists = []
  cy.elementSelector('#inventory_container').should('be.visible')
  cy.elementSelector('#inventory_container .inventory_item .inventory_item_name')
    .each((element, index) => {
      productLists.push(element.text().trim())

    }).then(() => {
      return productLists
    })
})

// This is the method used to get the product Name in detail view Page
Cypress.Commands.add('getProductNameInDetailsPage', () => {
  cy.elementSelector('.inventory_item_container').should('be.visible')
  return cy.elementSelector('#inventory_item_container .inventory_details_name').then((el) => {
    return el.text().trim()
  })
})

// This is the method used to get the product Price in detail view Page
Cypress.Commands.add('getProductPriceInDetailsPage', () => {
  cy.elementSelector('.inventory_item_container').should('be.visible')
  return cy.elementSelector('#inventory_item_container .inventory_details_price').then((el) => {
    return el.text().trim()
  })
})


// This is the method used to get the product description in detail view Page
Cypress.Commands.add('getProductDescInDetailsPage', () => {
  cy.elementSelector('.inventory_item_container').should('be.visible')
  return cy.elementSelector('#inventory_item_container .inventory_details_desc').then((el) => {
    return el.text().trim()
  })
})

// This is the method usd to get the Product Price according to the product Name
Cypress.Commands.add('getProductPrice', (pName) => {
  let priceLists = ''
  cy.elementSelector('#inventory_container').should('be.visible')
  cy.elementSelector('#inventory_container .inventory_item_description .inventory_item_name')
    .each((element, index) => {
      if (element.text().trim() === pName) {
        cy.get('.inventory_item_price').eq(index).then((price) => {
          priceLists = price.text().trim()
        })
      }
    }).then(() => {
      return priceLists
    })
})

// This is the method usd to get the Product Description according to the product Name
Cypress.Commands.add('getProductdescription', (pName) => {
  let itemDesc = ''
  cy.elementSelector('#inventory_container').should('be.visible')
  cy.elementSelector('#inventory_container .inventory_item_description .inventory_item_name')
    .each((element, index) => {
      if (element.text().trim() === pName) {
        cy.get('.inventory_item_desc').eq(index).then((desc) => {
          itemDesc = desc.text().trim()
        })
      }
    }).then(() => {
      return itemDesc
    })

})


// This is the method usd to Verify the Add to cart button is present according to the product Name
Cypress.Commands.add('verifyAddToCart', (pName) => {
  cy.elementSelector('#inventory_container').should('be.visible')
  cy.elementSelector('#inventory_container .inventory_item_description .inventory_item_name')
    .each((element, index) => {
      if (element.text().trim() === pName) {
        cy.get('.btn_inventory').eq(index).should('be.visible')
        cy.get('.btn_inventory').eq(index).should('contain', 'Add to cart')
      }
    })
})

// This is the method usd to Verify the Add to cart button is present according to the product Name
Cypress.Commands.add('verifyRemoveButton', (pName) => {
  cy.elementSelector('#inventory_container').should('be.visible')
  cy.elementSelector('#inventory_container .inventory_item_description .inventory_item_name')
    .each((element, index) => {
      if (element.text().trim() === pName) {
        cy.get('.btn_inventory').eq(index).should('be.visible')
        cy.get('.btn_inventory').eq(index).should('contain', 'Remove')
      }
    })
})


// This is the method used  select the value from the Filter drop down
Cypress.Commands.add('selectFilter', (filterValue) => {
  cy.get('.product_sort_container').should('be.visible')
  cy.selectValue('.product_sort_container', filterValue)
})


// This is the method used  select the product to see the product details in product details page
Cypress.Commands.add('clickProduct', (productName) => {
  cy.elementSelector('#inventory_container .inventory_item .inventory_item_name')
    .each((element, index) => {
      if (element.text().trim() === productName) {
        cy.wrap(element).click()
        cy.contains('#back-to-products', 'Back to products').should('be.visible')
      }
    })
})


// This is the method usd to click the add to cart button according to the product Name
Cypress.Commands.add('clickAddToCart', (pName) => {
  cy.elementSelector('#inventory_container').should('be.visible')
  cy.elementSelector('#inventory_container .inventory_item_description .inventory_item_name')
    .each((element, index) => {
      if (element.text().trim() === pName) {
        cy.get('.btn_inventory').eq(index).should('contain', 'Add to cart')
        cy.get('.btn_inventory').eq(index).click()
        cy.get('.btn_inventory').eq(index).should('contain', 'Remove')
      }
    })
})

// This is the method usd to click the add to cart button according to the product Name
Cypress.Commands.add('clickRemove', (pName) => {
  cy.elementSelector('#inventory_container').should('be.visible')
  cy.elementSelector('#inventory_container .inventory_item_description .inventory_item_name')
    .each((element, index) => {
      if (element.text().trim() === pName) {
        cy.get('.btn_inventory').eq(index).should('contain', 'Remove')
        cy.get('.btn_inventory').eq(index).click()
        cy.get('.btn_inventory').eq(index).should('contain', 'Add to cart')
      }
    })
})

// This is the method usd to click the add to cart button according to the product Name
Cypress.Commands.add('getCountInAddToCart', () => {
  return cy.elementSelector('.shopping_cart_link .shopping_cart_badge').then((el) => {
    return Number(el.text().trim())
  })
})

// This is the method used to click the add to cart button according to the product Name
Cypress.Commands.add('clickCart', () => {
  cy.clickElement('.shopping_cart_link .shopping_cart_badge')
  cy.get('#cart_contents_container').should('be.visible')
})


// This is the method used to get the cart quantity in carts page
Cypress.Commands.add('getCartQuantity', () => {
  return cy.elementSelector('.cart_list .cart_quantity').then((el) => {
    return Number(el.text().trim())
  })
})

// This is the method used to get the cart quantity in carts page
Cypress.Commands.add('getproductNameInCartPage', () => {
  let productLists = []
  cy.elementSelector('.cart_list .inventory_item_name').each((element, index) => {
    productLists.push(element.text().trim())
  }).then(() => {
    return productLists.sort()
  })
})


// This is the method usd to get the Product Price in carts page according to the product Name

Cypress.Commands.add('getProductPriceInCartsPage', (pName) => {
  let priceLists = ''
  cy.elementSelector('.cart_list .inventory_item_name')
    .each((element, index) => {
      if (element.text().trim() === pName) {
        cy.get('.inventory_item_price').eq(index).then((price) => {
          priceLists = price.text().trim()
        })
      }
    }).then(() => {
      return priceLists
    })
})

// This is the method used to get the Product Description in carts page according to the product Name
Cypress.Commands.add('getProductdescriptionInCartsPage', (pName) => {
  let itemDesc = ''
  cy.elementSelector('.cart_list .inventory_item_name')
    .each((element, index) => {
      if (element.text().trim() === pName) {
        cy.get('.inventory_item_desc').eq(index).then((desc) => {
          itemDesc = desc.text().trim()
        })
      }
    }).then(() => {
      return itemDesc
    })
})


// This is the method used to click the continue shopping button in the cart details page
Cypress.Commands.add('clickContinueShopping', () => {
  cy.clickElement('#continue-shopping')
  cy.elementSelector('#inventory_container').should('be.visible')
})


// This is the method used to get the cart lost count in the carts page
Cypress.Commands.add('cartListCount', () => {
  return cy.elementSelector('.cart_list .cart_item').its('length')
})


// This is the method usd to click the remove button according to the product Name in carts page
Cypress.Commands.add('clickRemoveInCartsPage', (pName) => {
  cy.elementSelector('#cart_contents_container').should('be.visible')
  cy.elementSelector('.cart_list .inventory_item_name')
    .each((element, index) => {
      if (element.text().trim() === pName) {
        cy.get('#cart_contents_container .cart_item_label .cart_button').eq(index).should('contain', 'Remove')
        cy.get('#cart_contents_container .cart_item_label .cart_button').eq(index).click()
        cy.contains('.cart_list .inventory_item_name', pName).should('not.exist')
      }
    })
})

// This is the method used to click the Checkout button in the carts page
Cypress.Commands.add('clickCheckout', () => {
  cy.elementSelector('#cart_contents_container').should('be.visible')
  cy.clickElement('#checkout')
  cy.get('#checkout_info_container').should('be.visible')
})

// This is the method used  fill the user information form
Cypress.Commands.add('userInfo', (fname,lName, zip) => {
  cy.get('#checkout_info_container').should('be.visible')
  cy.typeValue('#first-name', fname)
  cy.typeValue('#last-name', lName)
  cy.typeValue('#postal-code', zip)
  cy.clickElement('#continue')
})


// This is the method used to get the product name checkout page
Cypress.Commands.add('getproductNameInCheckoutPage', () => {
  let productLists = []
  cy.elementSelector('.cart_item .inventory_item_name').each((element, index) => {
    productLists.push(element.text().trim())
  }).then(() => {
    return productLists.sort()
  })
})


// This is the method usd to get the Product Price in Checkouts page according to the product Name

Cypress.Commands.add('getProductPriceInCheckoutPage', (pName) => {
  let priceLists = ''
  cy.elementSelector('.cart_list .inventory_item_name')
    .each((element, index) => {
      if (element.text().trim() === pName) {
        cy.get('.inventory_item_price').eq(index).then((price) => {
          priceLists = price.text().trim()
        })
      }
    }).then(() => {
      return priceLists
    })
})


// This is the method used to get the Product Description in Checkout page according to the product Name
Cypress.Commands.add('getProductdescriptionInCheckoutPage', (pName) => {
  let itemDesc = ''
  cy.elementSelector('.cart_list .inventory_item_name')
    .each((element, index) => {
      if (element.text().trim() === pName) {
        cy.get('.inventory_item_desc').eq(index).then((desc) => {
          itemDesc = desc.text().trim()
        })
      }
    }).then(() => {
      return itemDesc
    })
})


// This is the method used to get the Item total amount checkout page
Cypress.Commands.add('getItemTotalInCheckoutPage', () => {
  return cy.elementSelector('.summary_subtotal_label').then((el) => {
    return el.text().trim()
  })
})


// This is the method used to get the get tax amounty in carts page
Cypress.Commands.add('getTaxAmount', () => {
  return cy.elementSelector('.summary_tax_label').then((el) => {
    return el.text().trim()
  })
})

// This is the method used to get Full toatal amount
Cypress.Commands.add('getSummaryTotalAmount', () => {
  return cy.elementSelector('.summary_total_label').then((el) => {
    return el.text().trim()
  })
})



// This is the method used to click the Checkout button in the carts page
Cypress.Commands.add('clickFinish', () => {
  cy.clickElement('#finish')
  cy.get('#checkout_complete_container').should('be.visible')
})


// This is the method used to get the success message for purchase
Cypress.Commands.add('getSuccessMessage', () => {
  cy.get('#checkout_complete_container').should('be.visible')
  return cy.elementSelector('#checkout_complete_container .complete-header').then((el) => {
    return el.text().trim()
  })
})
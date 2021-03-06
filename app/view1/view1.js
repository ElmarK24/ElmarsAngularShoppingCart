'use strict';
(function(global){

	global.ElmarLib = function(){}
    var orderIdInc = 0;


    ElmarLib.addProductAndLineItemToOrder = addProductAndLineItemToOrder;

    ElmarLib.getNewOrder = getNewOrder;

    function getNewOrder()
    {


        var ret = {
            id: orderIdInc,
            LineItems: [],
            SubTotal: 0,
            Taxes: 0,
            Total: 0
        }

        orderIdInc ++

        return ret;
    }

    function getNewLineItem()
    {
        return {

            CreatedDate: new Date(),
            Product: undefined,
            Quantity: 0,
            SubTotal: 0,
            Taxes: 0,
            Total: 0
        }
    }



	function addProductAndLineItemToOrder(Order, Product, Quantity, AddRemoveOrAbsolute)
	{
		  Quantity = Quantity || 1;

    //defaults to 1
        if(typeof Quantity !== 'number')
        {
            Quantity = parseInt(Quantity) || 1
        }

        var LineItemToAddTo
        //adds to existing line item
        for(var i = 0; i < Order.LineItems.length; i++)
        {
            if(Order.LineItems[i].Product.id == Product.id)
            {
                LineItemToAddTo = Order.LineItems[i]
            }
        }
        //creates new line item
        if(!LineItemToAddTo)
        {
            LineItemToAddTo =  getNewLineItem();
            LineItemToAddTo.Product = Product;


            Order.LineItems.push(LineItemToAddTo);
        }

        if(AddRemoveOrAbsolute== "Add"){
            LineItemToAddTo.Quantity += Quantity;
        }
        else if(AddRemoveOrAbsolute=="Remove"){
            LineItemToAddTo.Quantity -= Quantity;
        }
        else if(AddRemoveOrAbsolute=="Absolute"){
                LineItemToAddTo.Quantity = Quantity;
        }




        LineItemToAddTo.SubTotal = (Product.price * LineItemToAddTo.Quantity);
        LineItemToAddTo.Taxes = (Product.taxRate * LineItemToAddTo.SubTotal);
        LineItemToAddTo.Total = (LineItemToAddTo.SubTotal + LineItemToAddTo.Taxes);

        Order.SubTotal = 0;
        Order.Taxes = 0;
        Order.Total = 0;
        // Recalculate SubTotal, Tax and Total
        for(var i = 0; i < Order.LineItems.length; i ++){


            Order.SubTotal += Order.LineItems[i].SubTotal;
            Order.Taxes += Order.LineItems[i].Taxes;
            Order.Total += Order.LineItems[i].Total;
        }
        // Order.SubTotal += LineItemToAddTo.SubTotal;
        // Order.Taxes += LineItemToAddTo.Taxes;
        // Order.Total += LineItemToAddTo.Total;






	}


})(window)




var app = angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

app.controller('View1Ctrl', function($scope) {

    $scope.Order = ElmarLib.getNewOrder();

    $scope.catalogOfProducts = [
      {
          id: 0,
          name: "Apple",
          price: 1.00,

          taxRate: 0.13,
          image: "images/apple.jpg",
          maxQuantityPerOrder: 5
      },
      {
          id: 1,

          name: "Orange",
          price: 1.25,
          taxRate: 0.13,
          image: "images/orange.jpg",
          maxQuantityPerOrder: 5
      },
      {
          id: 2,

          name: "Banana",
          price: 0.75,
          taxRate: 0.13,
          image: "images/banana.jpg",
          maxQuantityPerOrder: 5
      }
  ];






    $scope.addItem = function(Order, product)
    {

        ElmarLib.addProductAndLineItemToOrder(Order, product)


        // if(product){
        //     if(product.quantity>0 && product.quantity<=5) {
        //         $scope.orders.push({
        //             name: product.name, price: product.price, quantity: product.quantity, taxRate: product.taxRate,
        //             maxQuantityPerOrder: product.maxQuantityPerOrder
        //         });
        //     }
        //     if(product.quantity>product.maxQuantityPerOrder){
        //         alert("You cannot order more than "+product.maxQuantityPerOrder +" "+ product.name +"s");
        //     }
        //     if(product.quantity<0){
        //         alert("You need to add a quantity");
        //     }
        // }
    }

    $scope.ChangeQuantity = function(Order, Product, Quantity){




         ElmarLib.addProductAndLineItemToOrder(Order, Product, Quantity);

           // ElmarLib.Order.LineItems[0].Quantity = value;


        //Quantity = value;


    }



    $scope.removeItem = function(LineItem){

        for(var i = 0; i < LineItems.length; i++)
        {
            if(LineItems[i].Product.id == LineItem.Product.id)
            {
                LineItem.flumps.splice(LineItem.flumps.indexOf(LineItem.flump), 1);
            }
        }


        // if(order){
        //     $scope.orders.splice($scope.orders.indexOf(order), 1);
        //     $scope.totalPrice -= (((order.price*order.taxRate)+order.price)*order.quantity);
        // }
    }

});
  // function getNewOrder()
  // {
  //     var ret = {
  //         id:orderIdInc,
  //         CreatedDate: new Date(),
  //         LineItems:[],
  //         SubTotal: 0,
  //         Taxes: 0,
  //         Total:0
  //     }
  //     orderIdInc ++
  //
  //     return ret;
  // }
  //
  // function getNewLineItem()
  // {
  //     return{
  //         CreateDate: new Date(),
  //         Product: null,
  //         SubTotal: 0,
  //         Taxes: 0,
  //         Total: 0
  //     }
  //
  // }

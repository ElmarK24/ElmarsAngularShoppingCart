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


	function addProductAndLineItemToOrder(Order, Product, Quantity)
	{
		Quantity = Quantity || 1;
    //defaults to 1
        if(typeof Quantity !== 'number')
        {
            Quantity = parseInt(Quantity) || 1
        }

        var LineItemToAddTo

        for(var i = 0; i < Order.LineItems.length; i++)
        {
            if(Order.LineItems[i].Product.id == Product.id)
            {
                LineItemToAddTo = Order.LineItems[i]
            }
        }

        if(!LineItemToAddTo)
        {
            LineItemToAddTo =  getNewLineItem();
            LineItemToAddTo.Product = Product;

            LineItemToAddTo.Quantity = 0;

            Order.LineItems.push(LineItemToAddTo);
        }

        LineItemToAddTo. Quantity += Quantity;



        LineItemToAddTo =  Quantity * Product.Price


		// Recalculate SubTotal, Tax and Total
	}

	function recalculateTotal(Order)
    {

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






    $scope.addItem = function(Order, product, quantity)
    {

        ElmarLib.addProductAndLineItemToOrder(Order, product, quantity)


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

    $scope.totalPrice = 0;

    $scope.setTotalPrice = function(id, quantity){

        var total = 0;
        for(var i = 0; i < this.LineItems.length, i++;){
            var LineItem = this.LineItems[i];
            if(id == null || LineItem.id == id){
                total += this.toNumber(quantity*LineItem.price);
            }
        }
        // if(order){
        //     $scope.totalPrice += (((order.price*order.taxRate)+order.price)*order.quantity);}

    }

    $scope.removeItem = function(order){
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

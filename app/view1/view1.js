'use strict';

var app = angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

app.controller('View1Ctrl', function($scope) {

    $scope.orders = [];
    $scope.catalogOfProducts = [
      {
          name: "Apple",
          price: 1.00,
          taxRate: 0.13,
          image: "images/apple.jpg",
          maxQuantityPerOrder: 5
      },
      {
          name: "Orange",
          price: 1.25,
          taxRate: 0.13,
          image: "images/orange.jpg",
          maxQuantityPerOrder: 5
      },
      {
          name: "Banana",
          price: 0.75,
          taxRate: 0.13,
          image: "images/banana.jpg",
          maxQuantityPerOrder: 5
      }
  ];


    $scope.addItem = function(product)
    {
        if(product){
            $scope.orders.push({name: product.name, price: product.price, taxRate: product.taxRate,
            maxQuantityPerOrder: product.maxQuantityPerOrder});
        }
    }

    $scope.totalPrice = 0;

    $scope.setTotalPrice = function(order){
        if(order){
            $scope.totalPrice += order.price;}

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

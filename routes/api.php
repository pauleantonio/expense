<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/////
//user
/////
Route::group([

  
], function () {

    Route::post('login', 'AuthController@login');
    Route::post('isAuthenticated', 'AuthController@isAuthenticated');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('register', 'AuthController@register');
    Route::post('me', 'AuthController@getAuthenticatedUser');

});

/////
//expense
/////
Route::group([


    'prefix'=>'expense',

], function () {
  
    Route::get('', 'ExpenseController@index');
    Route::post('chartData', 'ExpenseController@getDataExpense');
    Route::get('show/{expense}', 'ExpenseController@show');
    Route::post('store', 'ExpenseController@store');
    Route::post('delete/{expense}', 'ExpenseController@destroy');
    Route::put('update/{expense}', 'ExpenseController@update');
    Route::delete('{expense}', 'ExpenseController@index');

});
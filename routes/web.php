<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PrepaidController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RandomNumberController;
use App\Http\Controllers\UserStakeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [GeneralController::class, 'showDashboard']);

Route::get('/staking', [GeneralController::class, 'showHistory']);

Route::post('/user-stakes', [UserStakeController::class, 'store'])->name('user-stakes.store');

Route::get('/projects', [GeneralController::class, 'showProjects']);

Route::get('/projects/{slug}', [GeneralController::class, 'showProject']);
Route::post('/complete-quest/{accountId}/{questId}', [GeneralController::class, 'completeQuest']);

Route::get('/account', [GeneralController::class, 'showAccount']);

Route::get('/academy', [GeneralController::class, 'showArticles']);

Route::get('/academy/{slug}', [GeneralController::class, 'showArticle']);

Route::get('/news/{slug}', [GeneralController::class, 'showNews']);


Route::get('/prepaid-cards', [PrepaidController::class, 'showPrepaid']);



Route::post('/api/purchase', [PrepaidController::class, 'purchaseCard']);
Route::post('/purchase/email', [PrepaidController::class, 'ShowSelectedCard']);



Route::post('/api/accounts', [AccountController::class, 'store']);
Route::get('/api/accounts/{account}', [AccountController::class, 'check']);
Route::post('/api/update-staked-amount', [AccountController::class, 'updateStakedAmount']);
Route::post('/api/update-status', [AccountController::class, 'updateStatus']);
Route::post('/send-number', [RandomNumberController::class, 'send']);








// 
Route::get('/admin-dashboard', [GeneralController::class, 'showAdminDashboard']);

Route::get('/admin-dashboard/{slug}', [GeneralController::class, 'showAdminDashboardEdit']);

Route::patch('/projects/{project}/update-pool-id', [ProjectController::class, 'updatePoolId']);

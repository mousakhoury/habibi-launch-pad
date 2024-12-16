<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Article;
use App\Models\Country;
use App\Models\News;
use App\Models\Project;
use App\Models\UserQuests;
use App\Models\UserStake;
use Illuminate\Http\Request;
use Inertia\Inertia;


class GeneralController extends Controller
{
    public function showDashboard()
    {
        $projects = Project::all()->reverse()->where('is_published', 1);
        $accounts = Account::all();
        $news = News::with('user')->where('is_published', 1)
            ->orderBy('created_at', 'desc') // or 'id', if that's your preferred order
            ->get();;

        return Inertia::render('Dashboard', [
            'projects' => $projects->values()->all(),
            'accounts' => $accounts,
            'news' => $news


        ]);
    }


    public function showHistory()
    {

        $history = UserStake::all();

        $accounts = Account::all();

        return Inertia::render('Staking', [
            'histories' => $history,
            'accounts' => $accounts

        ]);
    }

    public function showProjects()
    {
        $projects = Project::all()->reverse()->where('is_published', 1);
        $accounts = Account::all();


        return Inertia::render('AllProjects', [
            'projects' => $projects->values()->all(),
            'accounts' => $accounts

        ]);
    }


    public function showProject($slug)
    {
        $project = Project::where('slug', $slug)->first();

        if (!$project) {
            abort(404);
        }

        $accounts = Account::with(['userQuests' => function ($query) {
            $query->with('quest');
        }])->get();

        return Inertia::render('Project', [
            'project' => $project,
            'accounts' => $accounts
        ]);
    }

    public function completeQuest(Request $request, $accountId, $questId)
    {
        $userQuest = UserQuests::where('account_id', $accountId)
            ->where('quest_id', $questId)
            ->first();

        if ($userQuest) {
            $userQuest->update(['is_completed' => true]);

            // Unlock the next quest
            $nextQuest = UserQuests::where('account_id', $accountId)
                ->where('quest_id', '>', $questId)
                ->orderBy('quest_id')
                ->first();
            if ($nextQuest) {
                $nextQuest->update(['is_locked' => false]);
            }

            // Add XP to user's points
            $account = Account::find($accountId);
            $quest = $userQuest->quest;
            $account->points += $quest->xp;
            $account->save();

            // Increment people_completed count
            $quest->increment('people_completed');

            // Return the updated userQuest and account information
            return response()->json([
                'userQuest' => $userQuest,
                'nextQuest' => $nextQuest,
                'points' => $account->points,
                'people_completed' => $quest->people_completed,
            ]);
        }

        return response()->json(['error' => 'Quest not found'], 404);
    }




    public function showAccount()
    {
        $projects = Project::all();
        $accounts = Account::all();

        return Inertia::render('Account', [
            'projects' => $projects,
            'accounts' => $accounts
        ]);
    }


    public function showArticles()
    {
        $articles = Article::with('user')
            ->where('is_published', 1)
            ->orderBy('created_at', 'desc') // or 'id', if that's your preferred order
            ->get();

        return Inertia::render('Academy', [
            'articles' => $articles
        ]);
    }


    public function showArticle($slug)
    {
        $article = Article::with('user')->where('slug', $slug)->first();

        if (!$article) {
            // Handle the case where the article is not found
            abort(404); // Or redirect to another page
        }

        $newArticles = Article::with('user')
            ->where('is_published', 1)
            ->where('id', '!=', $article->id) // Exclude the current article
            ->orderBy('created_at', 'desc')
            ->take(4) // Take only the newest 3 articles excluding the current one
            ->get();

        $type = 'Articles';


        return Inertia::render('Article', [
            'article' => $article,
            'newArticles' => $newArticles,
            'type' => $type,
        ]);
    }


    public function showNews($slug)
    {
        $article = News::with('user')->where('slug', $slug)->first();

        if (!$article) {
            // Handle the case where the article is not found
            abort(404); // Or redirect to another page
        }

        $newArticles = News::with('user')
            ->where('is_published', 1)
            ->where('id', '!=', $article->id) // Exclude the current article
            ->orderBy('created_at', 'desc')
            ->take(4) // Take only the newest 3 articles excluding the current one
            ->get();

        $type = 'News';

        return Inertia::render('Article', [
            'article' => $article,
            'newArticles' => $newArticles,
            'type' => $type,
        ]);
    }







    public function showAdminDashboard()
    {
        $projects = Project::all();

        return Inertia::render('AdminDashboard', [
            'projects' => $projects
        ]);
    }

    public function showAdminDashboardEdit($slug)
    {
        $project = Project::where('slug', $slug)->first();

        if (!$project) {
            // Handle the case where the project is not found
            abort(404); // Or redirect to another page
        }

        return Inertia::render('DashboardEdit', [
            'project' => $project
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    public function updatePoolId(Request $request, $project)
    {
        $validatedData = $request->validate([
            'pool_id' => 'required|string', // or the validation rules you need
        ]);

        $project = Project::findOrFail($project);
        $project->pool_id = $validatedData['pool_id'];
        $project->save();

        return response()->json($project);
    }
}

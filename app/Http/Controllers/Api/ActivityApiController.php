<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Activity;
use Illuminate\Support\Facades\DB;

class ActivityApiController extends Controller
{
    public function index(Request $request)
    {
        $startDate =  $request->query('startDate');
        $endDate =  $request->query('endDate');
        $activities;
        if (is_null($startDate) && is_null($endDate)) {
            // Return all activities
            $activities = Activity::where('user_id', auth()->user()->id)->get();
        } elseif (!is_null($startDate) && !is_null($endDate)) {
            // Return activities between start and end date
            $activities = Activity::where('user_id', auth()->user()->id)->whereBetween('activityDateFrom', [$startDate, $endDate])->get();
        } else {
            // Return error message
            return response()->json(['error' => 'Both start date and end date are required.'], 400);
        }
    
        return response()->json($activities, 200);
    }

    public function report(Request $request)
    {
        $activities;
        $startDate =  $request->query('startDate');
        $endDate =  $request->query('endDate');
        $query=Activity::query();
        if (is_null($startDate) && is_null($endDate)) {
            // Return all activities
            $activities= $query->filterTimeSpent()->get();
        } elseif (!is_null($startDate) && !is_null($endDate)) {
            // Return activities between start and end date
            $data= [
                'activiyFilterDateFrom'=> $startDate,
                'activiyFilterDateTo'=> $endDate,
                'user_id'=> auth()->user()->id,
            ];
            $activities= $query
            ->filterTimeSpent()
            ->filterUserActivityBetweenTwoDates($data);
        } else {
            // Return error message
            return response()->json(['error' => 'Both start date and end date are required.'], 400);
        }
    
        return response()->json($activities, 200);
    }
}

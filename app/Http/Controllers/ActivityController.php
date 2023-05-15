<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActivityRequest;
use App\Http\Requests\UpdateActivityRequest;
use App\Models\Activity;
use Illuminate\Support\Facades\Redirect;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $startDate =  $request->query('startDate');
        $endDate =  $request->query('endDate');
        $activities;
        if (is_null($startDate) && is_null($endDate)) {
            // Return all activities
            $activities = Activity::where('user_id', Auth::id())->get();
        } elseif (!is_null($startDate) && !is_null($endDate)) {
            // Return activities between start and end date
            $activities = Activity::where('user_id', Auth::id())->whereBetween('activityDateFrom', [$startDate, $endDate])->get();
        } else {
            // Return error message
            return response()->json(['error' => 'Both start date and end date are required.'], 400);
        }
    
        return response()->json($activities, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return $this->createView('Activities/CreateActivity', [
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActivityRequest $request)
    {  
        Activity::create($request->validated());

        return Redirect::route('dashboard');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Activity $activity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActivityRequest $request, Activity $activity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        //
    }
}

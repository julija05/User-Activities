<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActivityReportRequest;
use App\Http\Requests\UpdateActivityReportRequest;
use App\Models\ActivityReport;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;
use App\Models\Activity;
use Illuminate\Support\Facades\Auth;

class ActivityReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->createView('PrintReport', [
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActivityReportRequest $request)
    {
        $activity= ActivityReport::create($request->validated());

        
        Mail::to($request['sendUserEmail'])->send(
            new SendMail($activity)
        );    
        return Redirect::route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(ActivityReport $activityReport, $id)
    {
        if(!$id || !$activityReport->getReport($id)){
            abort(404);
        }
        $activities = Activity::query()->filterUserActivityBetweenTwoDates($activityReport->getReport($id));

       return $this->createView('Report', [
            'activities' => $activities
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ActivityReport $activityReport)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActivityReportRequest $request, ActivityReport $activityReport)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ActivityReport $activityReport)
    {
        //
    }
}

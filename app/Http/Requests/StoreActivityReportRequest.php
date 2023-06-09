<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreActivityReportRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'activiyFilterDateFrom' => 'required|date',
            'activiyFilterDateTo' => 'required|date|after_or_equal:activiyFilterDateFrom',
            'user_id'=>'required|integer',
            'sendUserEmail'=> 'required|email'
        ];
    }
    protected function prepareForValidation()
    {
        $this->merge([
            'user_id'=>auth()->user()->id,
        ]);
       
    }
}

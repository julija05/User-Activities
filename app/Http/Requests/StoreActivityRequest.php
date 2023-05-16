<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreActivityRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'activityDateFrom' => 'required|date',
            'activityTimeSpend' => 'required|integer',
            'activityDescription'=> 'required|string',
            'user_id'=>'required|integer'
        ];
    }
}

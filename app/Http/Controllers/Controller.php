<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Call view method including come global values e.g. logo path
     * @param string $templateName
     * @param array $values
     * @param string|null $resourceName
     * @return Application|Factory|View
     */
    protected function createView(string $templateName, array $values = [])
    {
        return Inertia::render($templateName, $values);
    }
}

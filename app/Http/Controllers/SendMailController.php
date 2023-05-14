<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use App\Mail\SendMail;

class SendMailController extends Controller
{
      /**
     * Write code on Method
     *
     * @return response()
     */
    public function index()
    {
        $mailData = [
            'title' => 'Send mail from Nicesnippets.com',
            'body' => 'This is for testing email using smtp.'
        ];
         
        Mail::to('yourmail@gmail.com')->send(new SendMail($mailData));
           
        dd("Email is sent successfully.");
    }
}

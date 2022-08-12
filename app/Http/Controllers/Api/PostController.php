<?php

namespace App\Http\Controllers\Api;

use App\Model\Post;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Controllers\Api\PostResource;

class PostController extends Controller
{
    // 
    public function index(){
        // get 
        $posts = Post::latest()->paginate(5);

        // rendering
        return new PostResource(true,'List Data Posts',$posts);
    }




}

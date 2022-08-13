<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage; 


class PostController extends Controller
{
    // 
    public function index(){
        // get 
        $posts = Post::latest()->paginate(5);

        // rendering
        return new PostResource(true,'List Data Posts',$posts);
    }

    public function store(Request $request){
        // definisi validasi 
        $validator = Validator::make($request->all(),[
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'title' => 'required',
            'content' => 'required'
        ]);

        // cek jika validasi gagal
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }

        // upload image
        $image = $request->file('image');
        $image->storeAs('public/posts',$image->hashName());
        
        // create post
        $post = Post::create([
            'image' => $image->hashName(),
            'title' => $request->title,
            'content' => $request->content
        ]);

        // return data response
        return new PostResource(true,'Data Post telah berhasil ditambahkan !',$post);

    }

    public function show(Post $post){
        // return single data post
        return new PostResource(true,'Data Post Ditemukan!',$post);
    }

    public function update(Request $request,Post $post){
        // definisi validasi 
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'content' => 'required'
        ]);

        // cek jika validasi gagal
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }

        if($request->hasFile('image')){
            // validate just image
            $validator = Validator::make($request->all(),[
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // upload image
            $image = $request->file('image');
            $image->storeAs('public/posts',$image->hashName());

            //delete old image
            Storage::delete('public/posts/'.$post->image);

            //update post            
            $post->update([
                'image' => $image->hashName(),
                'title' => $request->title,
                'content' => $request->content
            ]);
        }else{
            // update post without image
            $post->update([
                'title' => $request->title,
                'content' => $request->content
            ]);
        }

        // return data response
        return new PostResource(true,'Data Post telah berhasil diubah !',$post);
    }

    public function destroy(Post $post){
        // hapus old image
        Storage::delete('public/posts/'.$post->image);

        $post->delete();

        return new PostResource(true, 'Data Post Berhasil Dihapus!', null);

    }

}

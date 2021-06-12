<?php

namespace App\Http\Controllers;

use App\Models\category;
use Illuminate\Http\Request;
use App\Models\post;
use App\Models\User;
use App\Models\verification;
use App\Models\follower;
use App\Models\report;
use App\Models\report_list;
use Illuminate\Support\Facades\Hash;
use App\Models\profile as ModelsProfile;
use Illuminate\Support\Facades\Storage;

use function PHPSTORM_META\map;

class APIController extends Controller
{

    /**
     * Gets all the list of posts
     * .
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllPosts()
    {
        $post_link = env('POST_STORAGE_URL');
        try {
            $posts = post::with(['user' => function ($query) {
                $query->selectRaw('id, name, user_id, user_type, CONCAT("https://stardom.wallpiper.app/main/public/storage/profile/" ,profile_picture) as profile_image, phone_number, email, bio')
                    ->with('followers')->with('following');
            }, 'profile' => function ($query) {
                $query->select(['id', 'profile_name']);
            }])->get();

            $categories = category::all();

            collect($posts)->map(function ($post) use ($post_link, $categories) {
                $categoryids = explode(',', $post->categoryIds);
                $categories = collect($categories)->whereIn('categoryId', $categoryids)->all();
                $result = collect($categories)->pluck('categoryTitle')->join(',');
                $post->categoryTitles = $result;

                $post->postImage = $post_link . $post->postImage;
            });
            if ($posts != null) {
                return response()->json([
                    'posts' => $posts,
                ], 200);
            }
            return response()->json([
                'message' => 'Posts Not Available',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error',
                'value' => $th
            ], 500);
        }
    }

    public function getPostsByUserId($id)
    {
        $post_link = env('POST_STORAGE_URL');
        try {
            $post = post::where('user', $id)->with(['user' => function ($query) {
                $query->selectRaw('id, name, user_id, user_type, CONCAT("https://stardom.wallpiper.app/main/public/storage/profile/" ,profile_picture) as profile_image, phone_number, email, bio')
                    ->with('followers')->with('following');
            }, 'profile' => function ($query) {
                $query->select(['id', 'profile_name']);
            }])->get();

            $categories = category::all();

            collect($post)->map(function ($singlePost) use ($post_link, $categories) {
                $singlePost->postImage = $post_link . $singlePost->postImage;
                $categoryids = explode(',', $singlePost->categoryIds);
                $categories = collect($categories)->whereIn('categoryId', $categoryids)->all();
                $result = collect($categories)->pluck('categoryTitle')->join(',');
                $singlePost->categoryTitles = $result;
            });

            if ($post != null) {
                return response()->json([
                    'posts' => $post,
                ], 200);
            }
            return response()->json([
                'message' => 'Posts Not Available',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error',
                'value' => $th
            ], 500);
        }
    }
    /**
     * Get Post BY ID
     * .
     *
     */

    public function getPostById($id)
    {
        $post_link = env('POST_STORAGE_URL');
        $profile_link = env('PROFILE_STORAGE_URL');
        try {
            $post = post::with(['user' => function ($query) {
                $query->selectRaw('id, name, user_id, user_type, CONCAT("https://stardom.wallpiper.app/main/public/storage/profile/" ,profile_picture) as profile_image, phone_number, email, bio')
                    ->with('followers')->with('following');
            }, 'profile' => function ($query) {
                $query->select(['id', 'profile_name']);
            }])->where('id', $id)->first();
            collect($post)->map(function ($singlePost) use ($post_link) {
                $singlePost->postImage = $link . $singlePost->postImage;
            });
            if ($post != null) {
                return response()->json([
                    'post' => $post,
                ], 200);
            }
            return response()->json([
                'message' => 'Post Not Available',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'value' => $e
            ], 500);
        }
    }


    /**
     * Get ALl Category
     * .
     *
     */

    public function getAllCategories()
    {
        $category_link = env('CATEGORY_STORAGE_URL');
        try {
            $cat = category::all();
            collect($cat)->map(function ($category) use ($category_link) {
                $category->categoryCover = $category_link . $category->categoryCover;
            });
            if ($cat != null) {
                return response()->json([
                    'categories' => $cat,
                ], 200);
            }
            return response()->json([
                'message' => 'Category Not Available',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'value' => $e
            ], 500);
        }
    }
    public function postAction(Request $request)
    {
        try {
            switch ($request->action) {
                case 'add':
                    $post = new post();
                    $post->user = $request->user_id;
                    break;
                case 'update':
                    $post = post::find($request->id);
                    break;
                default:
                    $post = NULL;
                    break;
            }
            if ($post != NULL) {
                $post->postTitle = $request->post_title;
                $post->postDescription = $request->post_description;
                $post->categoryIds = $request->post_categories;
                $post->postType = $request->post_type;
                $post->profile  = $request->profile_id;
                $post->postLink = $request->post_link != NULL ? $request->post_link : NULL;
                if ($request->hasFile('post_image')) {
                    $existingPath = $post->postImage;
                    $filenameWithExt = $request->file('post_image')->getClientOriginalName();
                    $fileNameToStore = date("Y-m-d") . $filenameWithExt;
                    $path = $request->file('post_image')->storeAs('public/post/', $fileNameToStore);
                    $post->postImage = $fileNameToStore;
                }
                $post = $post->save();
                if ($request->action == 'update' && $path != NULL) {
                    $path = Storage::delete("public/post/" . $existingPath);
                    //delete exiting file.
                }
                return response()->json([
                    'message' => $request->action == "add" ? "Added Successfully" :
                        "Updated Successfully",
                ], 200);
            }
            return response()->json([
                'message' => 'Bad Request',
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'value' => $e
            ], 500);
        }
    }

    /**
     * Delete Post
     * .
     *
     */
    public function deletePost($id)
    {
        try {
            $post = post::where('id', $id)->first();
            $postImage = $post->postImage;
            $post->delete();
            Storage::delete("public/post/" . $postImage);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'value' => $e
            ], 500);
        }
    }

    public function validateUserAction(Request $request)
    {
        switch ($request->action) {
            case 'user_id':
                $count = User::where('user_id', $request->value)->count();
                if ($count >= 1) {
                    return response()->json([
                        'message' => 'Not Available',
                        'availability' => false
                    ], 200);
                }
                return response()->json([
                    'message' => 'Available',
                    'availability' => true
                ], 200);
            case 'phone_number':
                return User::where('phone_number', $request->value)->exists();
            default:
                break;
        }
    }
    /**
     * 
     */
    function isFollowing($follower_id, $action, $type)
    {
        $user = auth()->user();
        if ($user->id != $follower_id) {
            $followings = $user->following()->get();
            $following_ids = $followings->contains(function ($following) use ($follower_id, $type) {
                if ($type == 'public') {
                    return $following->following_id == $follower_id;
                } else if ($type == 'private') {
                    return $following->following_id == $follower_id && $following->pvtaccess > 0;
                }
            });
            return $following_ids;
        }
        return $action == 'follow' && 1 || 0;
    }

    public function miscProfileCountAction(Request $request)
    {
        try {
            $followersCount = $followingCount = $wallsCount = $uploadCount = $downloadCount = 0;
            $user = User::with('followers', 'following', 'posts')->where('id', $request->id)->first();
            $followingCount = $user->following()->count();
            $uploadCount = $user->posts->count();
            $followersCount = $user->followers()->count();
            foreach ($user->posts as $post) {
                $wallsCount += $post->postWallpapers;
                $downloadCount += $post->postDownloads;
            }
            return response()->json([
                'followersCount' => $followersCount,
                'followingCount' => $followingCount,
                'wallsCount' => $wallsCount,
                'uploadCount' => $uploadCount,
                'downloadCount' => $downloadCount
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'value' => $e
            ], 500);
        }
    }

    public function miscPostAction(Request $request)
    {
        try {
            switch ($request->action) {
                case 'follow':
                    $type = $request->type;
                    $isFollowing = $this->isFollowing($request->following_id, 'follow', $type);
                    $user = auth()->user();
                    if ($type == 'public') {
                        if (!$isFollowing) {
                            $follower = new follower();
                            $follower->follower_id = $user->id;
                            $follower->following_id = $request->following_id;
                            $follower->save();
                            return response()->json([
                                'message' => 'Successfully Added Follower',
                            ], 200);
                        }
                        return response()->json([
                            'message' => 'User already following ' . $request->following_id,
                        ], 400);
                    } else if ($type == 'private') {
                        if (!$isFollowing) {
                            $following = follower::where('following_id', $request->following_id)->where('follower_id', $user->id)->first();
                            $following->pvtaccess = 1; //requested
                            $following = $following->save();
                            return response()->json([
                                'message' => "Successfully Requested Private Access",
                            ], 200);
                        }
                        return response()->json([
                            'message' => 'User already private following ' . $request->following_id,
                        ], 400);
                    }
                case 'unfollow':
                    $type = $request->type;
                    $isFollowing = $this->isFollowing($request->following_id, 'unfollow', $type);
                    $user = auth()->user();
                    if ($type == 'public' && $isFollowing) {
                        $user->following()->detach($request->following_id);
                        return response()->json([
                            'message' => 'Successfully unfollowed',
                        ], 200);
                    } else if ($type == 'private' && $isFollowing) {
                        $following = follower::where('following_id', $request->following_id)->where('follower_id', $user->id)->first();
                        $following->pvtaccess = 0; //un-requested
                        $following = $following->save();
                        return response()->json([
                            'message' => "Successfully unfollowed private access",
                        ], 200);
                    }
                    return response()->json([
                        'message' => 'User already unfollowing ' . $request->following_id,
                    ], 400);
                case 'removefollower':
                    $user = User::with('followers', 'following')->where('id', $request->id)->first();
                    if ($user != NULL) {
                        $user->following()->detach($request->following_id);
                        return response()->json([
                            'message' => 'Successfully removed',
                        ], 200);
                    }
                    return response()->json([
                        'message' => 'User already unfollowing ' . $request->following_id,
                    ], 400);
                default:
                    return response()->json([
                        'message' => 'Bad Request',
                    ], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'value' => $e
            ], 500);
        }
    }

    public function userAction(Request $request)
    {
        try {
            switch ($request->action) {
                case 'userid':
                case 'id':
                    $id = $request->value;
                    $user = User::with('followers', 'following', 'profiles')->where($request->action == 'userid' ? 'user_id' : 'id', $id)->first();
                    if ($user) {
                        return response()->json([
                            'user' => $user,
                        ], 200);
                    }
                    return response()->json([
                        'message' => 'User Not Found',
                    ], 404);
                case 'followers':
                case 'following':
                    $user = auth()->user()->load($request->action);
                    $ids = $user[$request->action]->map(function ($key) use ($request) {
                        return $request->action == 'followers' ? $key->follower_id :
                            $key->following_id;
                    });
                    $users = User::findMany($ids);
                    foreach ($users as $user) {
                        $user->profile_picture = env('PROFILE_STORAGE_URL') . $user->profile_picture;
                    }
                    return response()->json([
                        'users' => $users,
                    ], 200);
                case 'allusers':
                    $users = User::all();
                    if ($users != NULL) {
                        $users->map(function ($user) {
                            $user->profile_picture = env('PROFILE_STORAGE_URL') . $user->profile_picture;
                        });
                        return response()->json([
                            'users' => $users,
                        ], 200);
                    }
                    return response()->json([
                        'message' => 'No Users Available',
                    ], 404);
                default:
                    return response()->json([
                        'message' => 'Bad Request',
                    ], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'value' => $e
            ], 500);
        }
    }

    public function userSaveActions(Request $request)
    {
        try {
            switch ($request->action) {
                case 'verify':
                    $verification = new verification();
                    $verification->user = auth()->user()->id;
                    $verification->details = $request->details;
                    $verification = $verification->save();
                    return response()->json([
                        'message' => 'Success',
                    ], 200);
                case 'edit':
                    $user = auth()->user();
                    $user->name = $request->name != NULL ? $request->name : $user->name;
                    $user->email = $request->email != NULL ? $request->email : $user->email;
                    $user->password = $request->password != NULL ? Hash::make($request->password) : $user->password;
                    $user->bio = $request->bio != NULL ? $request->bio : $user->bio;
                    if ($request->hasFile('profile_picture')) {
                        $existingPath = $user->profile_picture;
                        $filenameWithExt = $request->file('profile_picture')->getClientOriginalName();
                        $fileNameToStore = date("Y-m-d") . $filenameWithExt;
                        $path = $request->file('profile_picture')->storeAs('public/profile/', $fileNameToStore);
                        $user->profile_picture = $fileNameToStore;
                    }
                    $user = $user->save();
                    if ($request->hasFile('profile_picture')) {
                        if ($path != NULL) {
                            $path = Storage::delete("public/profile/" . $existingPath);
                            //delete exiting file.
                        }
                    }
                    $savedUser = auth()->user();
                    $savedUser->profile_picture = env('PROFILE_STORAGE_URL') . $savedUser->profile_picture;
                    return response()->json([
                        'user' => $savedUser,
                    ], 200);
                case 'privateaccess':
                    $user = auth()->user();
                    $action = $request->approval;
                    $follower = follower::where('following_id', $user->id)->where('follower_id', $request->follower_id)->first();
                    if ($follower != NULL) {
                        if ($action == 'Approve') {
                            $follower->pvtaccess =  2; //approved
                        } else if ($action == 'Reject') {
                            $follower->pvtaccess =  3; //rejected
                        }
                        $follower = $follower->save();
                        return response()->json([
                            'message' => 'Successfully Updated',
                        ], 200);
                    }
                    return response()->json([
                        'message' => 'No action required',
                    ], 200);
                default:
                    return response()->json([
                        'message' => 'Bad Request',
                    ], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'value' => $e
            ], 500);
        }
    }

    public function getAllProfiles()
    {
        try {
            $profile = ModelsProfile::select('profile_name as label', 'id as value')->get();
            return response($profile, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'value' => $e
            ], 500);
        }
    }

    public function setPostReach(Request $request)
    {
        try {
            switch ($request->option) {
                case 'count':
                    $post_id = post::find($request->postId);
                    if ($post_id != NULL) {
                        $postReturnCount = 0;
                        if ($request->reachType == 'likes') {
                            $post_id->postLikes += 1;
                            $postReturnCount = $post_id->postLikes;
                        } else if ($request->reachType == 'downloads') {
                            $post_id->postDownloads += 1;
                            $postReturnCount = $post_id->postDownloads;
                        } else if ($request->reachType == 'wallpapers') {
                            $post_id->postWallpapers += 1;
                            $postReturnCount = $post_id->postWallpapers;
                        }
                        $post_id->save();
                        return response()->json([
                            'message' => 'Success',
                            $request->reachType => $postReturnCount,
                        ], 200);
                    }
                    return  response()->json([
                        'message' => 'No Post Available for post id ' . $request->postId,
                    ], 400);
                case 'reportabuse':
                    $report = new report_list();
                    $report->post_id = $request->postId;
                    $report->report_id = $request->postReportAbuseId;
                    $report->save();
                    if ($report != NULL) {
                        return response()->json([
                            'message' => 'Success',
                        ], 200);
                    }
                    return response()->json([
                        'message' => 'UnSuccessful',
                    ], 200);
                    break;
                default:
                    break;
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error',
                'value' => $th
            ], 500);
        }
    }

    public function getPostReportAbuses()
    {
        try {
            $reportList = report::all();
            if ($reportList != NULL) {
                return response()->json($reportList, 200);
            }
            return response()->json([
                'message' => 'No Report abuses present',
            ], 400);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error',
                'value' => $th
            ], 500);
        }
    }
}

{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost); 
                    deletePost($(' .delete-post-button', newPost));

                    // Used createComment function from post_comments.js because the createComment was not working for new Post
                    Post_Comments.createComment($(' .new-comment-forms', newPost));

                    // enable the functionality of toggle like on new post 
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        type: 'success',
                        text: 'Post created successfully',
                        timeout: 3000 // set the duration for how long the message will be displayed
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // mehod to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                        </small>
                        
                        ${post.content}
                        <br>
                        <small>
                            ${post.user.name}
                        </small>
                        <br>
                        <small>
                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                0 Likes
                            </a>
                        </small>
                    </p>
                    <div class="post-comments">
                        <form action="/comments/create" class="new-comment-forms" method="POST">
                            <input type="text" name="content" placeholder="Type here to add comments" required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                        </form>

                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">

                            </ul>
                        </div>
                    </div>
                </li> `);
    }

    // method to delete a post from dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        type: 'success',
                        text: 'Post Deleted',
                        timeout: 3000 // set the duration for how long the message will be displayed
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        })
    }

    let applyDeletePost = function(){
        $('.delete-post-button').each(function(){
            deletePost($(this));
        });
    }
    
    applyDeletePost();

    createPost();

}
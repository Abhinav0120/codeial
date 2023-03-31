// Revealing module Pattern
var Post_Comments = (function(){
    // method to submit form data for new comment using AJAX
    let newCommentForms = $('.new-comment-forms');
    let deleteCommentButton = $('.delete-comment-button')

    let createComment = function(element){

            $(element).on('submit', function(event){
                event.preventDefault();

                $.ajax({
                    type: 'post',
                    url: '/comments/create',
                    data: $(element).serialize(),
                    success: function(data){
                        let newComment = newCommentDom(data.data.comment);
                        $(`#post-comments-${data.data.comment.post}`).prepend(newComment); 
                        deleteComment($(' .delete-comment-button', newComment));

                        // enable the functionality of hte toggle like button on the new comment
                        new ToggleLike($(' .toggle-like-button', newComment));
                        new Noty({
                            type: 'success',
                            text: 'Commented on Post',
                            timeout: 3000 // set the duration for how long the message will be displayed
                        }).show();

                    }, error: function(error){
                        console.log(error.responseText);
                    }
                })
            });
    
    }

    // method to create a comment into a DOM
    let newCommentDom = function(comment){
        return $(`<li id="comment-${comment._id}">
        <p>
                <small>
                    <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                </small>
            ${comment.content}
            <br>
            <small>
                ${comment.user.name}
            </small>
            <small>
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                    0 Likes
                </a>
            </small>
        </p>
    </li>`);
    }

    // methos to delete post from dom
    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        type: 'success',
                        text: 'Comment Deleted',
                        timeout: 3000 // set the duration for how long the message will be displayed
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        })
    }


    let applyCreateComment = function(){
        $('.new-comment-forms').each(function(index, element){
            createComment(element);
        });
    }

    let applyDeleteComment = function(){
        deleteCommentButton.each(function(index, element){
            deleteComment(element);
        });
    }
    
    applyDeleteComment();
    applyCreateComment();

    return{
        createComment: createComment,
    }

})();

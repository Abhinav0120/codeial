{
    // console.log("Comments");
    let newCommentForms = $('.new-comment-forms');

    let createComment = function(element){

            $(element).on('submit', function(event){
                event.preventDefault();

                $.ajax({
                    type: 'post',
                    url: '/comments/create',
                    data: $(element).serialize(),
                    success: function(data){
                        // console.log(data);
                        // console.log(data.data.comment.post);
                        let newComment = newCommentDom(data.data.comment);
                        $(`#post-comments-${data.data.comment.post}`).prepend(newComment); 

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


    let newCommentDom = function(comment){
        return $(`<li id="comment-${comment.id}">
        <p>
                <small>
                    <a href="/comments/destroy/${comment.id}">X</a>
                </small>
            ${comment.content}
            <br>
            <small>
                ${comment.user.name}
            </small>
        </p>
    </li>`);
    }

    let applyCreatePost = function(){
        newCommentForms.each(function(index, element){
            createComment(element);
        });
    }
    
    applyCreatePost();

}
// create a clas to toggle friedships
class ToggleFriendship{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleFriendship();
    }

    toggleFriendship(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // ajax request
            $.ajax({
                type: 'POST',
                url: $(self).attr('href')
            })
            .done(function(data){
                if(data.data.deleted == true){
                    $(self).html('Add Friend');
                }else{
                    $(self).html('Remove Friend');
                }
            })
            .fail(function(errData){
                console.log('error in completing the request', errData);
            });
        })
    }
}
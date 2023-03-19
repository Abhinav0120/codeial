module.exports.index = function(req, res){
    return res.json(200, {
        message: "v1 List of posts",
        posts: []
    });
}
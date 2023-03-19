module.exports.index = function(req, res){
    return res.json(200, {
        message: "v2 Lists of Posts",
        posts: []
    })
}
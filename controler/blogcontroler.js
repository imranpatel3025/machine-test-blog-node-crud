

const { error } = require("node:console");
let blogs = require("../data/data");
const { title } = require("node:process");

function getBlog(req, res){
    try{
        res.status(200).json({
            success : true,
            message : `Blog is fetched Successfully...!`,
            data : blogs
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : `Somthing went wrong..!`,
            error : err.message
        })
    }
}


function getBlogById(req, res){
    try{
        let blogID = req.params.id;
        let blog = blogs.find(b => b.id === blogID)
        if(!blog){
            return res.status(404).json({
                success : false,
                message : `Blog with id ${blogID} is not Found...!`
            })
        }

        res.status(200).json({
            success : true,
            message : `Blog is Fetched Successfully`,
            data : blog
        })
    }catch(err){
         res.status(500).json({
            success : false,
            message : `Somthing went wrong..!`,
            error : err.message
        })
    }
}

function createBlog(req, res){
    try{
        let body = req.body
        if(!body.title || !body.content){
            return res.status(400).json({
                success : false,
                message : `Title and Content is Require...!`
            })
        }

        let newObj = {
            title : body.title,
            content : body.content,
            userid : body.userid,
            id : Date.now().toString()
        }

        blogs.unshift(newObj)

        res.status(201).json({
            success : true,
            message : `Blog is Created Successfully....!`,
            data : newObj
        })
    }catch(err){
         res.status(500).json({
            success : false,
            message : `Somthing went wrong..!`,
            error : err.message
        })
    }
}

function updateBlog(req, res){
    try{
        let updateID = req.params.id;
        let body = req.body;
        let blogIndex = blogs.findIndex(b => b.id === updateID)
        if(!blogIndex){
            return res.status(404).json({
                success : false,
                message : `Blog with id ${updateID} is not found...!`
            })
        }
        
        if(!body.title || !body.content){
            return res.status(404).json({
                success : false,
                message : `Title and Content is Required..!`
            })
        }

        let updateObj = {
            ...blogs[blogIndex],
            title : body.title,
            content : body.content
        }
        blogs[blogIndex] = updateObj

        res.status(200).json({
            success : true,
            message : `Blog With id ${updateID} is Updated Successfully....!`,
            data : updateObj
        })

    }catch(err){
         res.status(500).json({
            success : false,
            message : `Somthing went wrong..!`,
            error : err.message
        })
    }
}

function deleteBlog(req, res){
    try{
        let deleteId = req.params.id;
        let deleteIndex = blogs.findIndex(b => b.id === deleteId)

        if(!deleteIndex === -1){
            return res.status(404).json({
                success : false,
                message : `Blog with Delete ID ${deleteId} is not found..!`
            })
        }

        let deletedBlog = blogs.splice(deleteIndex, 1)
        res.status(200).json({
            success : true,
            message : `Blog with id ${deleteId} is Deleted Successfully...!`,
            data : deletedBlog
        })

    }catch(err){
         res.status(500).json({
            success : false,
            message : `Somthing went wrong..!`,
            error : err.message
        })
    }
}

module.exports = {
    getBlog,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
}
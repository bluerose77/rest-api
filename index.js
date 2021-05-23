const express = require('express');
const app = express();
const posts = require('./posts.json');
const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded());

// create new post using POST
app.post('/posts', (req, res) => {
    console.log(req.body.newPost)
    posts.push(req.body.newPost);
    let stringedData = JSON.stringify(posts, null, 2);
    fs.writeFile('posts.json', stringedData, function (err) {
        if(err) {
            return res.status(500).json({message: err})
        }
    })
    return res.status(200).json({message: "new post created"})
})

// fetch all posts using GET
app.get('/posts', (req,res) => {
    return res.json({ posts })
})

// fetch a single post using GET
app.get('/posts/:id', (req, res) => {
    let id = req.params.id;
    let foundPost = posts.find( post => {
        return String(post.id) === id
    })
    if (foundPost) {
        return res.status(200).json({post: foundPost })
    } else {
        return res.status(404).json({message: "post not found"})
    }
})

// update a single post using PUT
app.put("/posts/:id", (req, res) => {
    let id = req.params.id;
    let updatePost = posts.find((post) => {
        return String(post.id) === id;
    });
    let updateFoundPost = posts.find((post) => {
        return String(post.id) === id;
    });
    if (updateFoundPost) {
        updatePost.title = req.body.title;
        updatePost.body = req.body.body;
        let indexId = posts.indexOf(updatePost);
        posts[indexId] = updatePost;
        let stringedData = JSON.stringify(posts, null, 2);
        fs.writeFile("posts.json", stringedData, (err) => {
        if (err) {
            return res.status(500).json({ message: err });
        } else {
            return res.status(200).json({ message: "post was updated" });
        }
        });
    } else {
        return res.status(404).json({ message: "post not found" });
    }
});

app.listen(3000, function () {
    console.log('server is up and running')
})
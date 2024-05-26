

// mid-ware for json parsing


// conect to mongo db


// add routes
const postsRouter = require('./routes/posts');

app.use('/api/posts', postsRouter);

// connect to server
app.listen(4000, () => {
    console.log('sever connected')
})

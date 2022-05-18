const totalLikes = (blogs) => {
    let totalLikes = 0;
    blogs.forEach(blog => totalLikes += blog.likes)
    return totalLikes;
}

const favouriteBlog = (blogs) => {
    let favouriteBlog = blogs.reduce((prev, current) => (+prev.likes > +current.likes) ? prev : current)
    return {
        title: favouriteBlog.title,
        author: favouriteBlog.author,
        likes: favouriteBlog.likes
    }
}

const mostBlogs = (blogs) => {
    let frequencies = {}
    blogs.forEach(blog => {
        if(!frequencies[blog.author]){
            frequencies[blog.author] = 1
        } else {
            frequencies[blog.author]++
        }
    })
    const author = Object.keys(frequencies).reduce((a, b) => (frequencies[a] > frequencies[b]) ? a : b)
    return {
        author: author,
        blogs: frequencies[author]
    }
}

const mostLikes = (blogs) => {
    let frequencies = {}
    blogs.forEach(blog => {
        if(!frequencies[blog.author]){
            frequencies[blog.author] = blog.likes
        } else {
            frequencies[blog.author] += blog.likes
        }
    })
    const author = Object.keys(frequencies).reduce((a, b) => (frequencies[a] > frequencies[b]) ? a : b)
    return {
        author: author,
        likes: frequencies[author]
    }
}

module.exports = {
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}
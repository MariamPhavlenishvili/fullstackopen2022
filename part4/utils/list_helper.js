const _ = require('lodash');
const { flow, countBy, toPairs, maxBy, last, zipObject, groupBy } = _

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let total = blogs.reduce((prevValue, curValue) => {
        return prevValue + curValue.likes
    }, 0)

    return total
}

const favoriteBlog = (blogs) => {
    const max = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return {
        title: max.title,
        author: max.author,
        likes: max.likes
    }
}

const mostBlogs = (blogs) => {
    const mostBlogs = flow(
        blogs => countBy(blogs, 'author'), // count by the author
        toPairs, // convert to array of [key, value] pairs
        blogs => maxBy(blogs, last), // get the entry with most blogs
        blog => zipObject(['author', 'blogs'], blog) // convert to an object
    )

    return mostBlogs(blogs)
}

const mostLikes = (blogs) => {
    const authorsAndLikesArray = _(blogs)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, "likes"),
    }))
    .value();
  const mostLiked = _.maxBy(authorsAndLikesArray, "likes");
  return mostLiked

}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
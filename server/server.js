const express = require('express');
const axios = require('axios');
const cors = require('cors');
const _ = require('lodash');

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3004;

app.use(express.json());

// Your route for fetching blog data and analysis
app.get('/api/blog-stats', async (req, res) => {
    try {
        const apiUrl = 'https://intent-kit-16.hasura.app/api/rest/blogs';
        const response = await axios.get(apiUrl, {
            headers: {
                'x-hasura-admin-secret':
                    '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
            },
        });

        const blogs = response.data.blogs;

        
        const totalBlogs = blogs.length;

        const longestTitleBlog = _.maxBy(blogs, (blog) => blog.title.length);

        const blogsWithPrivacy = blogs.filter((blog) =>
            blog.title.toLowerCase().includes('privacy')
        );

        const uniqueBlogTitles = _.uniqBy(blogs, 'title').map((blog) => blog.title);

        res.status(200).json({
            totalBlogs,
            longestTitle: longestTitleBlog ? longestTitleBlog.title : '',
            blogsWithPrivacy: blogsWithPrivacy.length,
            uniqueBlogTitles,
        });
    } catch (error) {
        console.error('Error fetching data from the third-party API:', error.message);
        
        res.status(500).json({ error: 'Failed to fetch blog data' });
    }
});


app.get('/api/blog-search', async (req, res) => {
    try {
        const query = req.query.query || '';

        const apiUrl = 'https://intent-kit-16.hasura.app/api/rest/blogs';
        const response = await axios.get(apiUrl, {
            headers: {
                'x-hasura-admin-secret':
                    '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
            },
        });

        const blogs = response.data.blogs;

        
        const searchResults = blogs.filter((blog) =>
            blog.title.toLowerCase().includes(query.toLowerCase())
        );

        res.status(200).json(searchResults);
    } catch (error) {
        console.error('Error performing blog search:', error.message);
      
        res.status(500).json({ error: 'Blog search failed' });
    }
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

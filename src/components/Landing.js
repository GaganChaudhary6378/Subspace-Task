import React from 'react';

function Landing() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-7xl font-semibold mb-4">Subspace Intern Task</div>

            <div className='flex flex-row space-x-10'>
                <a href="/api/blog-stats"><button className="bg-blue-500 text-white px-4 py-2 mt-8 rounded hover:bg-blue-600 focus:outline-none">Fetch Blogs</button> </a>
                <a href="/api/blog-search"><button className="bg-blue-500 text-white px-4 py-2 mt-8 rounded hover:bg-blue-600 focus:outline-none">Search Blogs</button></a>
            </div>


        </div >
    );
}

export default Landing;

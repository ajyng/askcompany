import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Post from './Post';
import { useAppContext } from 'store';
import { Alert } from 'antd';

const apiUrl = "http://localhost:8000/api/posts/";

function PostList() {
    const [postList, setPostList] = useState([]);
    const { store: {jwtToken}, dispatch } = useAppContext();

    useEffect(() => {
        const headers = { Authorization: `JWT ${jwtToken}` };
        
        Axios.get(apiUrl, { headers })
            .then(response => {
                const { data } = response;
                setPostList(data);
            })
            .catch(error => {
                
            })
        
        console.log("mounted");
    }, [])

    return (
        <div>
            {postList.length === 0 && <Alert type="warning" message="포스팅이 없습니다." />}
            {postList.map(post => <Post post={post} key={post.id} />)}
        </div>
    );
}

export default PostList;
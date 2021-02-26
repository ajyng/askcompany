import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import "./SuggestionList.scss";
import Suggestion from './Suggestion';
import useAxios from 'axios-hooks';
import { useAppContext } from 'store';

const SuggestionList = () => {
    const { store: {jwtToken} } = useAppContext();
    const [userList, setUserList] = useState([]);
    const headers = { Authorization: `JWT ${jwtToken}` };

    const [{data: origUserList, loading, error}, refetch] = useAxios({
        url: "http://localhost:8000/accounts/suggestions/",
        headers,
    });

    useEffect(() => {
        if(!origUserList) setUserList([]);
        else setUserList(origUserList.map(user => ({...user, is_follow: false})));
    }, [origUserList]);

    const onFollowUser = username => {
        Axios.post("http://localhost:8000/accounts/follow/", {username}, {headers})
            .then(response => {
                setUserList(prevUserList => 
                    prevUserList.map(user =>
                        user.username !== username ? user : {...user, is_follow: true}
                        )
                    )
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            {loading && <div>loading...</div>}
            {error && <div>로딩 중에 에러가 발생했습니다.</div>}

            <Card title="Suggestions for you">
                {userList && userList.map(suggestionUser => (
                    <Suggestion onFollowUser={onFollowUser} key={suggestionUser.username} suggestionUser={suggestionUser} />
                ))}
            </Card>
        </div>
    );
};

export default SuggestionList;
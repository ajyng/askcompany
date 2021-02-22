import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import "./SuggestionList.scss";
import Suggestion from './Suggestion';
import Axios from 'axios';
import { useAppContext } from 'store';

const SuggestionList = () => {
    const [userList, setUserList] = useState([]);
    const { store: {jwtToken} } = useAppContext();

    useEffect(() => {
        async function fetchUserList() {
            const apiUrl = "http://localhost:8000/accounts/suggestions/";
            const headers = { Authorization: `JWT ${jwtToken}` };
            try {
                const { data } = await Axios.get(apiUrl, { headers }); 
                setUserList(data);
            }
            catch(error) {
                console.log(error);
            }
        }
        fetchUserList();
    }, []);

    return (
        <Card title="Suggestions for you">
            {userList.map(suggestionUser => (
                <Suggestion key={suggestionUser.username} suggestionUser={suggestionUser} />
            ))}
        </Card>
    );
};

export default SuggestionList;
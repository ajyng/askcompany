import React from 'react';
import { Card } from 'antd';
import "./SuggestionList.scss";
import Suggestion from './Suggestion';

const SuggestionList = () => {
    return (
        <Card title="Suggestions for you">
            <Suggestion />
            <Suggestion />
            <Suggestion />
        </Card>
    );
};

export default SuggestionList;
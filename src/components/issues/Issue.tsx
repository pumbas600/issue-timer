import Issue from '../../types/models/Github';
import { Component } from '../../types/Utility';
import Card from '../cards/Card';
import CardSeparator from '../cards/CardSeparator';
import Timer from './Timer';

interface Props {
    issue: Issue;
}

const Issue: Component<Props> = (props) => {
    return (
        <Card>
            <h4>{props.issue.title}</h4>
            <CardSeparator />
            <Timer />
        </Card>
    );
};

export default Issue;

import variablesScope from './variablesScope';
import variables from './variables';
import functionsContent from './functions';
import closuresContent from './closures';
import promisesContent from './promises';
import eventLoopContent from './eventLoop';

export const topicContents = {
    'variables-scope': variablesScope,
    variables,
    functions: functionsContent,
    closures: closuresContent,
    promises: promisesContent,
    'event-loop': eventLoopContent,
};

export const getTopicContent = (topicId) => topicContents[topicId] || null;

export default topicContents;


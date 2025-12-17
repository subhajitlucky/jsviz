import variablesScope from './variablesScope';
import variables from './variables';
import dataTypes from './dataTypes';
import operators from './operators';
import controlFlow from './controlFlow';
import functionsBasics from './functionsBasics';
import objects from './objects';
import arrays from './arrays';
import strings from './strings';
import typeCoercion from './typeCoercion';
import literalsSyntax from './literalsSyntax';
import callbacks from './callbacks';
import higherOrderFunctions from './higherOrderFunctions';
import scopeChain from './scopeChain';
import closures from './closures';
import executionContext from './executionContext';
import thisBinding from './thisBinding';
import functionMethods from './functionMethods';
import argumentsRest from './argumentsRest';
import arrowFunctions from './arrowFunctions';
import prototypeChain from './prototypeChain';
import constructorFunctions from './constructorFunctions';
import classes from './classes';
import regex from './regex';
import errors from './errors';
import eventLoop from './eventLoop';
import microtasks from './microtasks';
import promises from './promises';
import asyncAwait from './asyncAwait';
import modules from './modules';
import functionsContent from './functions';

export const topicContents = {
    'variables-scope': variablesScope,
    'data-types': dataTypes,
    'operators': operators,
    'control-flow': controlFlow,
    'functions-basics': functionsBasics,
    'objects': objects,
    'arrays': arrays,
    'strings': strings,
    'type-coercion': typeCoercion,
    'literals-syntax': literalsSyntax,
    'callbacks': callbacks,
    'higher-order-functions': higherOrderFunctions,
    'scope-chain': scopeChain,
    'closures': closures,
    'execution-context': executionContext,
    'this-binding': thisBinding,
    'function-methods': functionMethods,
    'arguments-rest': argumentsRest,
    'arrow-functions': arrowFunctions,
    'prototype-chain': prototypeChain,
    'constructor-functions': constructorFunctions,
    'classes': classes,
    'regex': regex,
    'errors': errors,
    'event-loop': eventLoop,
    'microtasks': microtasks,
    'promises': promises,
    'async-await': asyncAwait,
    'modules': modules,
    variables,
    functions: functionsContent,
};

export const getTopicContent = (topicId) => topicContents[topicId] || null;

export default topicContents;


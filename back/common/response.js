'use strict';

export const ErrorResponse = function (json) {
    return {
        statusCode: 400,
        body: JSON.stringify(json),
    };
}

export const ValidResponse = function (json) {
    return {
        statusCode: 200,
        body: JSON.stringify(json),
    };
}
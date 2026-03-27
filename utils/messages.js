import moment from 'moment';

function messageFormat(username, text) {
    return {
        username, text, time: moment().format("LT")
    };
}

export default messageFormat;
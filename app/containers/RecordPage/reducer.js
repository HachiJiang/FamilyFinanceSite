/*
 *
 * RecordPage reducer
 *
 */

const initialState = {
    filter: {
        from: '2017.03.01',
        to: '2017.03.31'
    },
    list: [
        {
            id: '10',
            type: 0,
            category: 'eating',
            amount: 100,
            account: 'account1',
            project: 'general',
            member: 'huan',
            tips: 'eating fish'
        }, {
            id: '11',
            type: 1,
            category: 'eating',
            amount: 21,
            account: 'account1',
            project: 'general',
            member: 'huan',
            tips: 'eating fish'
        }
    ]
};

function RecordReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default RecordReducer;
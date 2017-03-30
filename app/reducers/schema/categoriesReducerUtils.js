/**
 * Utils for category reducers
 */

export const addCategory = (state, action) => {
    const indices = action.indices;
    let newState;

    if (_.isEmpty(indices)) {
        newState = [
            ...state,
            {
                name: action.name,
                items: []
            }
        ];
    } else { // sub category
        const index = indices[0];
        const category = state[indices[0]];

        newState = [
            ...state.slice(0, index),
            {
                name: category.name,
                items: [
                    ...category.items,
                    {
                        name: action.name
                    }
                ]
            },
            ...state.slice(index + 1)
        ];
    }

    return newState;
};
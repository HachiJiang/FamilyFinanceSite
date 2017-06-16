/**
 * Selectors for Pulldown2
 */

/**
 * Convert raw items to options
 * @param {Array} items
 */
export const convertToOptions = items => items && items.map(item => {
    let option = {
        ...item,
        label: item.value
    };

    if (item.children) {
        option.children = convertToOptions(item.children);
    }
    return option;
});

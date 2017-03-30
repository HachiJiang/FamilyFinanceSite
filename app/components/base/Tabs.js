/*
 * Tabs
 *
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Tabs extends Component {
    render() {
        const { activeIndex, children, onSwitch } = this.props;
        return (
            <div className="tabs">
                <header className="tabs-header">
                    {
                        children.map((tab, index) => {
                            if (tab) {
                                let cls = classNames('tab', {
                                    active: index === activeIndex
                                });
                                const title = tab.props.title;
                                return (
                                    <div key={ title }
                                         className={ cls }
                                         onClick={ e => onSwitch(index) }>
                                        <span>{ title }</span>
                                    </div>
                                );
                            }
                        })
                    }
                </header>
                <div className="tabs-content">{ (children[activeIndex]) }</div>
            </div>
        );
    }
}

Tabs.propTypes = {
    children: PropTypes.node.isRequired,
    activeIndex: PropTypes.number.isRequired,
    onSwitch: PropTypes.func
};

export default Tabs;
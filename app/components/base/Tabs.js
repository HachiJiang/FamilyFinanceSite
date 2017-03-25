/*
 * Tabs
 *
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Tabs extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        activeIndex: PropTypes.number.isRequired
    };

    state = {
        activeIndex: this.props.activeIndex
    };

    onSwitch(index) {
        this.setState({ activeIndex: index });
    }

    render() {
        const activeIndex = this.state.activeIndex;
        const children = this.props.children;
        const activeTab = children.filter((tab, index) => index === activeIndex);

        return (
            <div className="tabs">
                <header className="tabs-header">
                    {
                        children.map((tab, index) => {
                            let cls = classNames('tab', {
                                active: index === activeIndex
                            });
                            const title = tab.props.title;
                            return (
                                <div key={title}
                                     className={cls}
                                     onClick={ evt => this.onSwitch(index) }>
                                    <span>{title}</span>
                                </div>
                            );
                        })
                    }
                </header>
                <div className="tabs-content">{ activeTab }</div>
            </div>
        );
    }
}

export default Tabs;
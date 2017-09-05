/**
 * @file  CollapsePanel.jsx
 * @author xiongchao(xiongchao@jingoal.com)
 * 分类导航Component
 */

import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classNames';
import { generateUUID } from './util/util'
import './index.scss';

const INTERVAL_500_MS = 500;

const DefaultBtn = () => <i className="arrow"></i>;

export default class CollapsePanel extends PureComponent {

    static propTypes = {
        isOpen: PropTypes.bool,
        collapseBtn: PropTypes.element,
        children: PropTypes.node.isRequired,
        itemBlockHeight: PropTypes.number
    }

    static defaultProps = {
        prefixCls: 'jui-classify-nav',
        itemBlockHeight: 52,
        collapseBtn: <DefaultBtn />
    }

    constructor(props) {
        super(props);
        this.state = {
            showToggleBtn: false,
            isActiveItem: false,
            isChecked: false
        };
        this.checkboxId = generateUUID();
        this.handleCheckedChange = this.handleCheckedChange.bind(this);
    }

    componentWillMount() {
        const { isOpen } = this.props;
        if (isOpen) {
            this.setState({
                isChecked: true
            });
        }
    }

    componentDidMount() {
        const surfaceHeight = this.navSurfaceDom.offsetHeight;
        const realilyHeight = this.navPracticalDom.offsetHeight;
        const rowHeight = this.navPracticalDom.children && this.navPracticalDom.children[0].offsetHeight;

        if (rowHeight < realilyHeight) {
            this.setState({// eslint-disable-line
                showToggleBtn: true
            });
        }

        const that = this;
        const callback = _.throttle(() => {
            const dynimacHeight = that.navPracticalDom.offsetHeight;
            const isShowBtn = surfaceHeight < dynimacHeight
                || (dynimacHeight > rowHeight && surfaceHeight === dynimacHeight);
            that.setState({
                showToggleBtn: isShowBtn
            });
        }, INTERVAL_500_MS);
        window.addEventListener('resize', callback);
    }

    handleCheckedChange() {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    render() {
        const {
            prefixCls,
            className,
            collapseBtn,
            itemBlockHeight
        } = this.props;

        const classes = classNames({
            [prefixCls]: true,
            [className]: className
        });

        return (
            <div className={classes}>
                <input
                    type="checkbox"
                    className={`${prefixCls}__input`}
                    id={this.checkboxId}
                    defaultChecked={this.state.isChecked}
                    onChange={this.handleCheckedChange}
                />
                <div className={`${prefixCls}__box`} style={{height: itemBlockHeight}} ref={ref => (this.navSurfaceDom = ref)}>
                    <div className={`${prefixCls}__labels`} ref={ref => (this.navPracticalDom = ref)}>
                        {React.Children.map(this.props.children, (child) => {
                            return <span className={`${prefixCls}__item-wrap`}>{child}</span>;
                        })}
                    </div>
                </div>

                <div className={`${prefixCls}__expand-col${this.state.showToggleBtn ? '--show' : ''}`}>
                    <label htmlFor={this.checkboxId} className={`${prefixCls}__expand-col__toggle`}>
                        {collapseBtn}
                    </label>
                </div>
            </div>
        );
    }
}

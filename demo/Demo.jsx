/**
 * @file  Demo.jsx
 * @author xiongchao(xiongchao@jingoal.com)
 * 分类导航DEMO
 */
import React, { Component } from 'react';
import CollapsePanel from '../src/CollapsePanel';

/**
 * mock data
 */
const getData = [
    {
        id: '1234',
        name: 'ABCDEDFGHIJKLMNOPQRSTUVWXYZ'
    },
    {
        id: '1235',
        name: '事实上ABCDEDFGHIJKLMNOPQRSTUVWXYZ'
    },
    {
        id: '1236',
        name: 'ABCDEDFGHIJKLMNOPQRSTUVWXYZ'
    },
    {
        id: '1237',
        name: 'ABCDEDFGHIJKLMNOPQRSTUVWXYZ'
    },
    {
        id: '1238',
        name: '事实上ABCDEDFGHIJKLMNOPQRSTUVWXYZ'
    },
    {
        id: '1239',
        name: 'ABCDEDFGHIJKLMNOPQRSTUVWXYZ'
    }
];

/**
 * 自定义展开收起按钮及样式
 */
const CustomBtn = () => {
    return <i className="coll">Toggle</i>
}

export default class Demo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    /**
     * 默认选择第一个
     */
    componentWillMount() {
        const newData = getData.map((item, index) => {
            if (index === 0) {
                return Object.assign({}, item, { active: true });
            }
            return Object.assign({}, item, { active: false });
        });
        this.setState({
            data: newData
        });
    }

    /**
     * 点击每个block，选中状态
     * @param {*} data: Array
     */
    doSth(data) {
        const newData = getData.map(item => {
            return Object.assign({}, item, { active: item.id === data.id });
        });
        this.setState({
            data: newData
        });
    }

    render() {
        const { data } = this.state;

        return (
            <div>
                <h2>Demo1 默认模式，默认只展示一行，按钮为默认样式</h2>
                <CollapsePanel>
                    {data.map((item) => {
                        return (
                            <div
                                className={`jui-classify-nav__label-items${item.active ? ' jui-classify-nav__label-items--active' : ''}`}
                                key={item.id}
                                onClick={this.doSth.bind(this, item)}
                            >
                                <div className="jui-classify-nav__label-items__text">
                                    {item.name}
                                </div>
                            </div>
                        );
                    })}
                </CollapsePanel>

                <h2>Demo2 自定义模式，展开全部，自定义按钮内容</h2>
                <CollapsePanel
                    className="your-classname"
                    isOpen={true}
                    collapseBtn={<CustomBtn/>}
                >
                    {data.map((item) => {
                        return (
                            <div
                                className={`jui-classify-nav__label-items${item.active ? ' jui-classify-nav__label-items--active' : ''}`}
                                key={item.id}
                                onClick={this.doSth.bind(this, item)}
                            >
                                <div className="jui-classify-nav__label-items__text">
                                    {item.name}
                                </div>
                            </div>
                        );
                    })}
                </CollapsePanel>
            </div>
        );
    }
}

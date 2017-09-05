##多个Block展开收起

#功能描述：
默认显示一行，根据宽度自动匹配显示多少个Block，点击右上角的展开按钮，显示全部Block，再次点击，展示一行。
允许传入每块的内容，展开收起的图标

```html
<CollapsePanel
    isOpen={false}
>
    {data.map((item) => {
        return (
            <div
                className={`label-items${item.active ? ' active' : ''}`}
                key={item.id}
                onClick={this.doSth.bind(this, item)}
            >
                <div className="text">
                    {item.name}
                </div>
            </div>
        );
    })}
</CollapsePanel>
```

## API

| Param    | Description   | Type     | Default value       |
|----------|---------------|----------|--------------|
| isOpen   | 默认是否自动展开 | boolean | false |
| collapseBtn  | 自定义展开收起的结构 | ReactNode | 默认不传以上下箭头的方式显示 |
| itemBlockHeight | 自定义每个item的高度 | number | 默认52px |




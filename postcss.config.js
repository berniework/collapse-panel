module.exports = {
    plugins: [
        require('autoprefixer')({
            // TODO: (xiongchao) 这里是配置浏览器兼容的版本，postcss根据符合版本条件的css加前缀，个人感觉这块不用加，默认全部生成前缀即可。
        })
    ]
};
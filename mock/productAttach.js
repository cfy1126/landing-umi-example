const fs = require('fs');
const path = require('path');

module.exports = {
    'GET /api/product/attach': (req, res) => {
        const rootPath = path.resolve(__dirname, '../'); // 获取项目根目录路径
        const filePath = path.join(rootPath, 'data', 'product_attach.json'); // 拼接数据文件路径
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            const result = JSON.parse(data);
            res.json(result);
        });
    }
};
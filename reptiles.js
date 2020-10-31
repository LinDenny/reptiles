var request = require('request');
var fs = require("fs");
/**
 * 只需要修改页面地址
 */
const url = "https://www.quickteller.com/categories/2"

const index = url.lastIndexOf('/');
const params = url.substr(index + 1);
const options = {
  url: `https://www.quickteller.com/api/v1/services/categories/${params}?countryCode=NG&withservices=true`,
  headers: {
    'terminalId': '3QTI0001'
  }
};
request(options, function (error, response, body) {
  const data = JSON.parse(body);
  fs.mkdir('./' + params);
  data.services.forEach(service => {
    getImg(service.imageUrl);
  })
})

function getImg(url) {
  const index = url.lastIndexOf('/');
  const name = url.substr(index + 1);
  request(url, function (err, res, body) {
    if (err) {
      console.log(name + '下载失败');
    }
  })
    .pipe(fs.createWriteStream(`./${params}/${name}`))
    .on('close', (data) => {
      console.log(`${name} -->> 下载成功`);
    });
}
/*
* @Author: j3n5en
* @Date:   2017-05-24 15:01:17
* @Last Modified by:   j3n5en
* @Last Modified time: 2017-05-24 15:16:11
*/

const moment = require('moment');

module.exports =  
function log(log, type = 'log') {
  if (typeof log === 'string') {
    console[type](`[${moment().format('YYYY-MM-DD HH:mm:ss')}] [Wy2Moro] ${log}`);
  } else {
    console[type](log);
  }
}
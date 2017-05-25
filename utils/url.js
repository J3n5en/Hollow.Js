/*
* @Author: j3n5en
* @Date:   2017-05-24 16:09:08
* @Last Modified by:   j3n5en
* @Last Modified time: 2017-05-25 01:40:55
*/
/* eslint-disable no-param-reassign */
module.exports = function urlParser(urlpattern, actionDir, method = 'ALL') {
  const controller = actionDir.split('@')[0];
  const action = actionDir.split('@')[1];
  method = method.toLowerCase();
  return { urlpattern, controller, action, method };
};

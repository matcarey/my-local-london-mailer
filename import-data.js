const fs = require('fs'),
  _ = require('lodash'),
  mysql = require('mysql-promise'),
  srootDir = '../tmp-data',
  db = mysql();

db.configure({
  "host": "127.0.0.1",
  "user": "mll-mailer",
  "password": "hijklm",
  "database": "MLL_MAILER"
});

function lookupCategory(basic) {
  return {
    health: '/event/category/health',
    kids: '/event/category/children',
    community: '/event/category/community',
    music: '/event/category/entertainment/music',
    art: '/event/category/creative/art',
    charity: '/event/category/community/charity'
  }[basic];
}

fs.readdir(srootDir, function (err, fileList) {
  if (err) {
    throw err;
  }
  const subscribeFiles = _.filter(fileList, function (i) {
    return i.startsWith('subscribe-')
  });
  const subscribeObjs = _.compact(_.map(subscribeFiles, function (i) {
    const obj = JSON.parse(fs.readFileSync([srootDir, i].join('/')));

    if (!obj.email) {
      return;
    }

    obj.responsibilities = _.concat(obj.responsibilities);
    if (obj.interest) {
      obj.interest = _.concat(obj.interest);
    }
    if (obj.area) {
      obj.area = _.concat(obj.area);
    }

    obj.interest = _.compact(_.map(obj.interest, lookupCategory));
    obj.area = _.compact(_.map(obj.area, function (i) {
      var tmp = i.toUpperCase();
      if (tmp === 'CALEDONIAN ROAD') {
        return;
      }
      if (tmp === 'CAMDEN TOWN') {
        return 'NW1';
      }
      return tmp;
    }));

    return obj;
  }));
  console.log(subscribeObjs);
  console.log(fileList.length, subscribeFiles.length, _.uniq(_.flatMap(subscribeObjs, _.keys)), _.uniq(_.flatMap(subscribeObjs, 'area')));
  Promise.all(_.map(subscribeObjs, function (sub) {
      return db.query('INSERT INTO mailUser SET ?', {
        greeting: sub.name,
        email: sub.email,
        notes: sub.notes,
        jsonAreas: JSON.stringify(sub.area),
        jsonCategories: JSON.stringify(sub.interests),
        findEvents: sub.responsibilities.indexOf('find') > -1,
        listEvents: sub.responsibilities.indexOf('list') > -1,
        ambassador: sub.responsibilities.indexOf('ambassador') > -1
      });
    }))
    .then(function () {
      console.log('done.');
      process.exit(0);
    })
    .catch(function (err) {
      console.error(err);
      process.exit(1);
    })
});
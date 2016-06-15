var defaultTitle = 'Copy Brandy';

exports.renderIndex = function(req, res) {
  res.render('index', {
    title: defaultTitle
  });
};

exports.renderOtherPage = function(req, res) {
  res.render('other', {
    title: 'Other Page' + ' | ' + defaultTitle
  });
};

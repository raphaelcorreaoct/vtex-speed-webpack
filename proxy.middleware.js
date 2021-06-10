let ignoreReplace = [
  /\.js(\?.*)?$/,
  /\.css(\?.*)?$/,
  /\.svg(\?.*)?$/,
  /\.ico(\?.*)?$/,
  /\.woff(\?.*)?$/,
  /\.png(\?.*)?$/,
  /\.jpg(\?.*)?$/,
  /\.jpeg(\?.*)?$/,
  /\.gif(\?.*)?$/,
  /\.pdf(\?.*)?$/,
];
const { accountName } = require("./package.json");

function rewriteLocation(location) {
  return (
    location
      // .replace('http:', 'https:')
      .replace(
        `${accountName}.vtexcommercestable.com.br`,
        `${accountName}.vtexlocal.com.br`
      )
  );
}

function setBody(req, res, next) {
  var data, end, proxiedHeaders, proxiedStatusCode, write, writeHead;
  if (
    ignoreReplace.some(function (ignore) {
      return ignore.test(req.url);
    })
  ) {
    return next();
  }

  data = "";
  write = res.write;
  end = res.end;
  writeHead = res.writeHead;
  proxiedStatusCode = null;
  proxiedHeaders = null;
  res.writeHead = function (statusCode, headers) {
    proxiedStatusCode = statusCode;
    return (proxiedHeaders = headers);
  };
  res.write = function (chunk) {
    return (data += chunk);
  };
  res.end = function (chunk, encoding) {
    if (chunk) {
      data += chunk;
    }
    if (data) {
      data = data.replace(/vtexcommercestable/g, "vtexlocal");
      data = data.replace(/vteximg/g, "vtexlocal");
      // data = data.replace(/http/g, 'https');
    }

    res.write = write;
    res.end = end;
    res.writeHead = writeHead;
    if (proxiedStatusCode && proxiedHeaders) {
      proxiedHeaders["content-length"] = Buffer.byteLength(data);

      delete proxiedHeaders["content-security-policy"];

      res.writeHead(proxiedStatusCode, proxiedHeaders);
    }
    return res.end(data, encoding);
  };

  next();
}

function setCompression(req, res, next) {
  //middlware 1
  req.headers["accept-encoding"] = "identity";
  next();
}

function setHeaders(req, res, next) {
  let writeHead = res.writeHead;
  res.writeHead = function (statusCode, headers) {
    if (headers && headers.location) {
      headers.location = rewriteLocation(headers.location);
    }
    res.writeHead = writeHead;
    return res.writeHead(statusCode, headers);
  };
  next();
}

function setHost(req, res, next) {
  //middlware 3
  req.headers.host = `${accountName}.vtexcommercestable.com.br`;
  next();
}

module.exports = {
  setHeaders,
  setHost,
  setCompression,
  setBody,
};

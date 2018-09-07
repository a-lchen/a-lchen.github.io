var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var index = require('./routes/index');
var users = require('./routes/users');
var jenna = require('./routes/jenna');
var app = express();
var debug = require('debug')('alexlchen.com:server');
var http = require('http').createServer(app);
let io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use('/uploads', express.static(__dirname + &quot;/uploads&quot;));
//app.use(multer({dest: './uploads/'}))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
app.use('/jenna', jenna);

let claimed = new Set();


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/upload', (req, res) => {
    console.log('upload')
    console.log(req.files)

});


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */


/**
 * Listen on provided port, on all network interfaces.
 */

http.listen(port);
http.on('error', onError);
http.on('listening', onListening);
console.log("hi")
io.on('connection', function(socket){
    console.log('a user connected');


    socket.on('data', function(msg){
        console.log('data: ' + msg);
        console.log(JSON.stringify(msg))
        fs.appendFile("log.txt", JSON.stringify(msg) + "\n\n", ((err)=> {
            if (err) {
                console.log("error");
                console.log(err);
            }
        }));
        for (let synco in msg["claimed"]) {
            console.log(synco)
            claimed.add(msg["claimed"][synco]);
        }
        console.log(claimed)

        fs.writeFile("claimed.txt", JSON.stringify(Array.from(claimed)), ((err)=> {
            if (err) {
                console.log("error");
                console.log(err);
            }
        }))


    });

    socket.on('requestInfo', function (msg) {
        fs.readFile('progress.txt', "utf8", function read(err, data) {
            console.log(data)
            if (err) {
                console.log(err)
            }
            else {
                console.log("emitting progress percent")
                io.emit('getInfo', {"progressPercent": data.replace(/\n|\r/g, "")});
            }
        });

    });


    socket.on('claim', function(msg) {
        console.log("claimed")
        console.log(msg);
        claimed.add(msg);
        console.log(claimed)
    });


    socket.on("requestClaimed", function(msg) {
        console.log(claimed)
        fs.readFile('claimed.txt', function read(err, data) {
            if (err) {
                throw err;
            }
            content = JSON.parse(data);
            console.log("read file and got back " + data)
            // Invoke the next step here however you like

            io.emit('claim', {"claimed": content});
        });
    })
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP http "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP http "listening" event.
 */

function onListening() {
    var addr = http.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}


module.exports = function(app, passport){

    //when root directory requested, respond with index.html.
    app.get('/', function(req, res){
        res.sendFile(app.get("rootPath") + '/client/views/index.html');
    });

    app.post('/api/signup', passport.authenticate('local-signup',{
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true }
    ));

    app.post('/Logout', function(req, res){
        console.log('in logout function');
        req.logout();
        //res.redirect('#/Home')
    })

    app.post('/api/login', function(req, res, next){ 
        passport.authenticate('local-login',function(err, user, info){
            console.log('err', err);
            console.log('user', user );
            console.log('info', info);
            if(err){
                return next(err);
            }
            if(user == false){
                console.log(info);
                res.send(info);
            }
            else{
                res.status(200).send('success!');
            }
        })(req, res, next);
    });

}
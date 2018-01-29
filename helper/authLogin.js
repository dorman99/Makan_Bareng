function cekLogin(req,res,next){
    let isLoggedIn =  req.session.isLogin
    if(isLoggedIn){
        next()
    }else{
        res.redirect('/loginWithOutGoogle')
    }
}

module.exports = cekLogin
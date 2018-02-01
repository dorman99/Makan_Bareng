function cekLogin(req,res,next){
    let isLoggedIn =  req.session.isLogin
    // let isLoggedIn = true
    if(isLoggedIn){
        next()
    }else{
        res.redirect('/loginWithOutGoogle')
    }
}

module.exports = cekLogin

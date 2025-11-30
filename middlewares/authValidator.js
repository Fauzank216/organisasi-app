export const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect('/page/guest')
    next()
}

export const isMember = (req, res, next) => {

    if (req.user && req.user.role === 'member') {
        return next();
    }

    return res.render('member', {page:"information", isMember: false });
}



export const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role != role) return res.redirect('/page/guest')
        next()
    }
}
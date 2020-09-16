const authController = {}

// const users = 

authController.register = (req, res, next) => {
    console.log('REGIST CONTROLLER HIT [authController.js]')
    next()
}

authController.signin = (req, res, next) => {}

module.exports = authController
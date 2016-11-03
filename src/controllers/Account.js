const models = require('../models');
const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login');
};

const signupPage = (req, res) => {
  res.render('signup');
};

const logout = (req, res) => {
  res.redirect('/');
};

const login = (request,response) => {

};

const signup = (request,response) => {
  const req = request;
  const res = response;

  if (!req.body.username || !req.body.pass || !req.body.pass2){
    return res.status(400).json({error:'All fields are required'});
  }

  if (req.body.pass !== req.body.pass2){
    return res.status(400).json({ error:'Passwords do not match'});
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username:req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    newAccount.save((err)) => {
      if(err){
        console.log(err);
      }

      return res.json({ redirect: '/maker'});
    }
  });
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signupPage = signupPage;
module.exports.signup = signup;

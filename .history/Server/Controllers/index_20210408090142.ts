import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();

import mongoose from 'mongoose';
import passport from 'passport';

//create the User Model Instance
import User from '../Models/user';

// Display Page functions
export function DisplayHomePage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home', displayName: ''    });
}
export function DisplayAboutPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'About Us', page: 'about', displayName: ''    });
}

export function DisplayServicesPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Our Services', page: 'services', displayName: ''    });
}
export function DisplayProjectsPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Our Projects', page: 'projects', displayName: ''    });
}
export function DisplayContactPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: ''    });
}
export function DisplayLoginPage(req:Request, res:Response, next:NextFunction)
{
    if(!req.user)
    {
        res.render('index', { 
            title: 'Login', 
            page: 'login',
            messages: req.flash('loginMessage'), 
            displayName: req.user ? req.user.displayName : ''    
        });
    }
    return res.redirect('/contact-list');
}
export function DisplayRegisterPage(req:Request, res:Response, next:NextFunction): void
{
    if(!req.user)
    {
        res.render('index',
         { 
             title: 'Register', 
             page: 'register',
             messages: req.flash('registerMessage'), 
             displayName: ''    
        });
    }
    return res.redirect('/contact-list');
}

// Process page functions
export function ProcessLoginPage(req:Request, res:Response, next:NextFunction): void
{

    passport.authenticate('local', (err,user,info) =>{
        //are there server errors?
        if(err)
        {
            console.error(err);
            return next(err);
        }
        //are there login errors?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.login(user, (err) =>{
            //are there db errors?
            if(err)
            {
                console.error(err);
                return next(err);
            }
            return res.redirect('/contact-list');
        });
    })(req,res,next);



}
export function ProcessRegisterPage(req:Request, res:Response, next:NextFunction): void
{
    //instantiate a new user object
    let newUser = new User
    ({
        username: req.body.username,
        emailAddress: req.body.EmailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName
    });

    User.register(newUser, req.body.password, (err)=>
    {
       if(err)
       {
           console.error('Error: Inserting New User');
           if(err.name == "UserExistsError")
           {
               req.flash('registerMessage', 'Registration Error');
               console.error('Error: User Already Exists');
           }
           return res.redirect('/register');
       }
       
       //automatically login the user
       return passport.authenticate('local')(req, res, ()=>{
        res.redirect('/contact-list');
       });
    });
}
export function ProcessLogoutPage(req:Request, res:Response, next:NextFunction): void
{
    req.logout();
    res.redirect('/login');
}
export function ProcessContactPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home', displayName: ''    });
}



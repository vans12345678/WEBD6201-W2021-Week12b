import express, {Request, Response, NextFunction} from 'express';

import passport from 'passport';

//create the User Model Instance
import User from '../Models/user';

//Util functions
import {UserDisplayName} from '../Util/index';


// Display Page functions
export function DisplayHomePage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req)   });
}
export function DisplayAboutPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'About Us', page: 'about', displayName: UserDisplayName(req)  });
}

export function DisplayServicesPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Our Services', page: 'services', displayName: UserDisplayName(req)  });
}
export function DisplayProjectsPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Our Projects', page: 'projects', displayName: UserDisplayName(req)   });
}
export function DisplayContactPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: UserDisplayName(req) });
}
export function DisplayLoginPage(req:Request, res:Response, next:NextFunction)
{
    if(!req.user)
    {
        return res.render('index', { 
            title: 'Login', 
            page: 'login',
            messages: req.flash('loginMessage'), 
            displayName: UserDisplayName(req)
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
             displayName: UserDisplayName(req)   
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
            console.log("heuhhuhh?");
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
    // instantiate a new user object
    let newUser = new User
    ({
        username: req.body.username,
        emailAddress: req.body.EmailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName 
    });

    User.register(newUser, req.body.password, (err) => 
    {
        if(err){
            console.error('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {
                req.flash('registerMessage', 'Registration Error');
                console.error('Error: User Already Exists');
            }
            return res.redirect('/register');
        }

        // automatically login the user
        return passport.authenticate('local')(req, res, ()=>
        {
            return res.redirect('/contact-list');
        });
    });
}

export function ProcessLogoutPage(req:Request, res:Response, next:NextFunction): void
{
    req.logout();
    console.log("User logged out");
    res.redirect('/login');
}
export function ProcessContactPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req)  });
}



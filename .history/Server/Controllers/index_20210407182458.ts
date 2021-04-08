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
export function DisplayLoginPage(req:Request, res:Response, next:NextFunction): void
{
    if(req.user)
    {
        res.render('index', { title: 'Login', page: 'login', displayName: ''    });
    }
    return res.redirect('/contact-list');
}
export function DisplayRegisterPage(req:Request, res:Response, next:NextFunction): void
{
    
}

// Process page functions
export function ProcessLoginPage(req:Request, res:Response, next:NextFunction): void
{
    return res.redirect('/contact-list');

}
export function ProcessRegisterPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home', displayName: ''    });
}
export function ProcessLogoutPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home', displayName: ''    });
}
export function ProcessContactPage(req:Request, res:Response, next:NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home', displayName: ''    });
}



import express, {Request, Response, NextFunction} from 'express';



// Contact Model
import Contact from "../Models/contact";

//display page functions
export function DisplayContactListPage(req: Request, res:Response, next: NextFunction): void
{
    // db.contacts.find()
    Contact.find(function(err, contacts){
        if(err)
        {
          return console.error(err);
        }
        res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contacts, displayName: 'temp'  });
      });
}
export function DisplayEditPage(req: Request, res:Response, next: NextFunction): void
{
    let id = req.params.id;

  // instantiate a new Contact
  let updatedContact = new Contact
  ({
    "_id": id,
    "FullName": req.body.FullName,
    "ContactNumber": req.body.ContactNumber,
    "EmailAddress": req.body.EmailAddress
  });

  // db.contacts.update({"_id":id} and then update)
  Contact.updateOne({_id: id}, updatedContact, {}, (err) =>{
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contact-list');
  });
}
export function DisplayAddPage(req: Request, res:Response, next: NextFunction): void
{
    res.render('index', { title: 'Add', page: 'edit', contact: '', displayName: ''    });
}

//Process page
export function ProcessEditPage(req: Request, res:Response, next: NextFunction): void
{
    
}
export function ProcessAddPage(req: Request, res:Response, next: NextFunction): void
{
    
}
export function ProcessDeletePage(req: Request, res:Response, next: NextFunction): void
{
    
}

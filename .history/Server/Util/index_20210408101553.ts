import express, {Request, Response, NextFunction} from 'express';

//Helper function
export UserDisplayName(req: Request): string
{
    if(req.user)
    {
        let user = req.user as UserDocument;
        return user.displayName.toString();
    }
    return '';
}
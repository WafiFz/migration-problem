import { NextFunction, Request, Response } from 'express';


class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      // res.send('wafi fahruzzaman');
      // res.sendStatus(200);
      res.render("login", {
      } );
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;

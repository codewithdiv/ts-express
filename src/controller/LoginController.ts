import { NextFunction, Request, Response } from 'express';
import { get } from './decorators/routes';
import { controller } from './decorators/controller';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response, next: NextFunction): void {
    res.send(`
        <div>
        <form method="post" action"">
            <div>
                <label>Email</label>
                <input type="email" name="email" />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" />
            </div>
            <button type="submit">Submit</button>
        </form>
        </div>
  `);
  }
}

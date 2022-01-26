import { NextFunction, Request, Response } from 'express';
import { get, post } from './decorators/routes';
import { controller } from './decorators/controller';
import { bodyValidator } from './decorators/bodyValidator';

interface RequestBody extends Request {
  body: { [key: string]: string | undefined };
}
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

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === 'test@test.com' && password === 'test@1234') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send(`Please enter a valid email address and a password`);
    }
  }

  logout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}

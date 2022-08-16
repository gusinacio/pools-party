import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Mutation('signup')
  async signup(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('username') username: string,
  ) {
    const user = await this.userService.createUser(username, email, password);

    const token = this.authService.createToken(user);

    return {
      token,
      user,
    };
  }

  @Mutation('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const token = this.authService.createToken(user);

    return { token, user };
  }
}

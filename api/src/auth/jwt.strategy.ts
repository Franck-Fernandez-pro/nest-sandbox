import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey', // ENV VARS
      ignoreExpiration: false,
    });
  }

  // This method called validate, but validation already happened in the constructor
  async validate(payload: any) {
    // Here you can call your usersService to add some data to the returned user object
    return {
      username: payload.username,
      id: payload.sub,
    };
  }
}

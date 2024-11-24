import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UserController } from './user.controller';
import { EncryptService } from '../utils';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, EncryptService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

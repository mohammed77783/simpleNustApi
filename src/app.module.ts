import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './db/drizzle.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}.local`,
      isGlobal: true,
    }),
    DrizzleModule,
    PostsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

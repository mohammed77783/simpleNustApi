import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDrizzleClient } from './index';

export const DRIZZLE = Symbol('DRIZZLE');

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        return createDrizzleClient(databaseUrl!);
      },
      inject: [ConfigService],
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
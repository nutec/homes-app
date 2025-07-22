import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationsModule } from './locations/locations.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LocationsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

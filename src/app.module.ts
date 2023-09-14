import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { CityModule } from './city/city.module';
import { BranchModule } from './branch/branch.module';
import { BudgetModule } from './budget/budget.module';
import { ProspectModule } from './prospect/prospect.module';
import { SaleModule } from './sale/sale.module';
import { SellersModule } from './sellers/sellers.module';
import { VisitModule } from './visit/visit.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CityModule,
    BranchModule,
    BudgetModule,
    ProspectModule,
    SaleModule,
    SellersModule,
    VisitModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}

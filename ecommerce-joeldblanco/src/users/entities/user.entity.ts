import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50, type: 'varchar', nullable: false })
  name: string;

  @Column({ length: 50, type: 'varchar', nullable: false })
  email: string;

  @Column({ length: 60, type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'integer' })
  phone: number;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ length: 20, type: 'varchar', nullable: true })
  country?: string;

  @Column({ type: 'text', nullable: false })
  address: string;

  @Column({ length: 50, type: 'varchar', nullable: true })
  city?: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}

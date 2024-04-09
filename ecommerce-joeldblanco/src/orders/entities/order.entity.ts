import { OrderDetails } from 'src/order_details/entities/order_details.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => User, (user) => user.orders_id)
  @JoinColumn()
  user_id: User;

  @Column({ type: 'date' })
  date: Date;

  @OneToOne(() => OrderDetails)
  order_detail: OrderDetails;
}

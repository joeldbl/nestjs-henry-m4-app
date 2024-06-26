import { Category } from 'src/categories/entities/category.entity';
import { OrderDetails } from 'src/order_details/entities/order_details.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
@Unique(['name'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'numeric', nullable: false })
  stock: number;

  @Column({
    name: 'image_url',
    type: 'varchar',
    default: 'https://placehold.co/180x180',
  })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => OrderDetails, (order_details) => order_details.products)
  orders_details: OrderDetails[];
}

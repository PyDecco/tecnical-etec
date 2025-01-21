import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('client') 
export class Client {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  fullName: string;

  @Column({ unique: true, type: 'char', length: 11 })
  cpf: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'preferred_color', type: 'enum', enum: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'] })
  preferredColor: string;

  @Column({ type: 'text', nullable: true })
  observations?: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

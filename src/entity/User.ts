import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity({
    name: 'user',
})
@Unique(['email'])
export class User extends BaseEntity {
    //
    @Column({
        primary: true,
        name: 'id_user',
    })
    id: number;

    @Column()
    @Length(4, 20)
    email: string;

    @Column()
    @Length(4, 100)
    password: string;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}

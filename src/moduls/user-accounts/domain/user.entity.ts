import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from '../../blog-platform/blogs/domain/blog.enity';
import { Post } from '../../blog-platform/posts/domain/post.entity';
import { Comment } from '../../blog-platform/comments/domain/comment.entity';
import { Session } from './session.entity';

export enum DeletionStatus {
  ACTIVE = 'active',
  DELETED = 'deleted',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column({ default: false })
  is_email_confirmed: boolean;

  /** 🔗 User → Blogs */
  @OneToMany(() => Blog, (blog) => blog.owner)
  blogs: Blog[];

  /** 🔗 User → Posts */
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  /** 🔗 User → Comments */
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  /** 🔗 User → Sessions */
  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @Column({
    type: 'enum',
    enum: DeletionStatus,
    default: DeletionStatus.ACTIVE,
  })
  deletionStatus: DeletionStatus;

  @Column({ nullable: true })
  confirmation_code: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  confirmation_code_expiration: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

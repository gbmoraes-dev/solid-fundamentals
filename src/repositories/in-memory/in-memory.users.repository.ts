import type { Prisma, User } from '@prisma/client'

import type { UsersRepository } from '../users.repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'cm3i6qnaf0000cst58ckp06ej',
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
}

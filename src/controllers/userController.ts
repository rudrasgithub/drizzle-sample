import { Request, Response, NextFunction } from 'express';
import { db } from '../config/db';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { user } from '../db/schema';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await db.select().from(user);
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
};

export const getUsersByLimit = async (req: Request, res: Response, next: NextFunction) => {
    const limit: number = parseInt(req.query.limit as string);
    const limitedUsers = await db.select(). from(user).limit(limit);
    res.json(limitedUsers);
}

export const findOneUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = parseInt(req.params.id);
    const Checkeduser = await db.select().from(user).where(eq(user.id, id));

    if (!Checkeduser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, role, email, password } = req.body;

    const existingUser = await db.select().from(user).where(eq(user.email, email));
    
    if (existingUser[email] === email && existingUser) {
      console.log(existingUser)
      res.status(400).json({ error: 'User with the given email already exists' });
      return;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db.insert(user).values({ name, email, passwordHash: hashedPassword, role }).returning({
        id: user.id
      });
      res.status(201).json(newUser);
      return;
    }
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = parseInt(req.params.id);
    const { name, role, email, password } = req.body;

    const existingUser = await db.select().from(user).where(eq(user.id, id));

    if (!existingUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.update(user).set({ name, email, passwordHash: hashedPassword, role }).where(eq(user.id, id));
      res.json({ message: 'User updated successfully' });
      return;
    }
  } catch (err) {
    next(err);
  }
}

export const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await db.delete(user);
    res.json({ message: 'All users deleted successfully' });
  } catch (err) {
    next(err);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {  
    const id: number = parseInt(req.params.id);

    const existingUser = await db.select().from(user).where(eq(user.id, id));

    if (!existingUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    } else {
      await db.delete(user).where(eq(user.id, id));
      res.json({ message: 'User deleted successfully' });
      return;
    }
  } catch (err) {
    next(err);
  }
}
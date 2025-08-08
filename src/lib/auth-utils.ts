import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db"
import { z } from "zod"

// Validation schemas
export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required").optional(),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// User registration
export async function registerUser(data: RegisterInput) {
  try {
    // Validate input
    const validatedData = registerSchema.parse(data)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingUser) {
      throw new Error("User with this email already exists")
    }
    
    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      }
    })
    
    return { success: true, user }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: "Validation failed", 
        details: error.issues 
      }
    }
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Registration failed" 
    }
  }
}

// User authentication
export async function authenticateUser(data: LoginInput) {
  try {
    // Validate input
    const validatedData = loginSchema.parse(data)
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (!user) {
      return { success: false, error: "Invalid credentials" }
    }
    
    // Verify password
    const isPasswordValid = await verifyPassword(validatedData.password, user.password)
    
    if (!isPasswordValid) {
      return { success: false, error: "Invalid credentials" }
    }
    
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: "Validation failed", 
        details: error.errors 
      }
    }
    
    return { 
      success: false, 
      error: "Authentication failed" 
    }
  }
}

// Get user by ID
export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      }
    })
    
    return user
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}


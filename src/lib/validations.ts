import { z } from 'zod'

export const loginSchema = z.object({
  emailOrUsername: z.string().min(3, 'Email ou nome de usuário deve ter pelo menos 3 caracteres'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export type LoginData = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  username: z.string()
    .min(3, 'Nome de usuário deve ter pelo menos 3 caracteres')
    .regex(/^\w+$/, 'Nome de usuário pode conter apenas letras, números e _'),
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .refine(
      (pwd) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pwd),
      'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'
    ),
})

export type RegisterData = z.infer<typeof registerSchema>


export const submitScoreSchema = z.object({
  gameId: z.string().min(1, 'ID do jogo é obrigatório'),
  score: z.number().min(0, 'Score deve ser positivo'),
  duration: z.number().min(1, 'Duração deve ser positiva'),
})

export type SubmitScoreData = z.infer<typeof submitScoreSchema>


export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
  username: z.string()
    .min(3, 'Nome de usuário deve ter pelo menos 3 caracteres')
    .regex(/^\w+$/, 'Nome de usuário pode conter apenas letras, números e _')
    .optional(),
  avatar: z.string().refine(
    (url) => !url || /^https?:\/\/.+/.test(url),
    'URL do avatar inválida'
  ).optional(),
})

export type UpdateProfileData = z.infer<typeof updateProfileSchema>
import express from 'express'
import { serviceResponse } from '../../enum/response.types'

export interface iAuthService {
    signUp: (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ) => Promise<serviceResponse>;
}
import { FC } from 'react'
import { Dashboard } from '@/pages/dashboard/Dashboard'
import ErrorPage from '@/pages/error/ErrorPage'
import PokemonPage from '@/pages/pokemon/PokemonPage'

export interface IRoute {
    path: string
    element: FC
}

export const routePublic: IRoute[] = [
    { path: '/', element: Dashboard },
    { path: '/pokemon', element: PokemonPage },
    { path: '*', element: ErrorPage }, // Zástupný znak by měl být vždy poslední
];
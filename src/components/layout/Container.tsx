import { ReactNode } from "react";

export interface ContainerProps{
    children: ReactNode
}

export const Container = ({children}: ContainerProps) =>{
return <div className="max-w-container mx-auto px-6">
{children}
</div>
}
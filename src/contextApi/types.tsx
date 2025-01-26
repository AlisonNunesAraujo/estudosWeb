import { ReactNode } from "react";

export type Users = {
    user: DadosUser;
    CreateUser: (info: DadosCreate) => Promise<void>;
    Login: (info: DadosCreate) => Promise<void>;
    verificar: boolean;
    renderLista: TrilhaProps[] | undefined;
    AddTrilha: (info: AddProps) => Promise<void>;
    Deletar: (uid: string) => Promise<void>;
    Deslogar: () => Promise<void>
    loading: boolean | undefined
};




export type DadosUser = {
    email: string | null;
    uid: string | null | number;
};

export type ChildrenProps = {
    children: ReactNode;
};

export type DadosCreate = {
    email: string;
    senha: string;
};

export type TrilhaProps = {
    conteudo: string;
    uid: string;
    nomeTrilha: string;
};

export type AddProps = {
    nomeTrilha: string;
    conteudo: string;
};

import { useEffect, useState } from "preact/hooks";

interface pageInfo {
    categoria: string;
    candidatos: Candidate[];
}

interface Candidate {
    nombre: string;
    imagen: string;
    enlace?: string;
}

export function VoteSystem() {
    const category = 0;
    const [pageInfo, setPageInfo] = useState<pageInfo>();

    useEffect(() => {
        async function fetchCandidates() {
            const response = await fetch(
                `/api/candidates.json?category=${category}`
            );
            const data = await response.json();
            console.log(data);

            setPageInfo(data);
        }

        fetchCandidates();
    }, []);

    const { categoria = "", candidatos } = pageInfo ?? {};

    return (
        <div class="absolute w-full h-full flex flex-col justify-center items-center">
            <CategorySystem>{categoria}</CategorySystem>
            <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {candidatos?.map((candidato, i) => {
                    return (
                        <li>
                            <a href={candidato.enlace} target="_blank">
                                <img
                                    src={`/images/voting-assets/${candidato.imagen}`}
                                    alt={candidato.nombre}
                                />
                                <p>{candidato.nombre}</p>
                            </a>
                        </li>
                    );
                })}
            </ul>
            <footer>Navegación</footer>
        </div>
    );
}

function CategorySystem({ children }: { children: string }) {
    return (
        <h1 class="mb-20 text-4xl lg:text-6xl font-medium font-tomaso tracking-widest uppercase text-center">
            {children}
        </h1>
    );
}

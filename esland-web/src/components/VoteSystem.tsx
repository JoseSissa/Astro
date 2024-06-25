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

type typeVotes = Array<Array<number>>;

const MAX_CATEGORY = 12;

export function VoteSystem() {
    const [pageInfo, setPageInfo] = useState<pageInfo>();
    const [category, setCategory] = useState(0);
    // Nos crea el estado que será un array con una logitud MAX_CATEGORY y donde cada elemento es un array vacío
    const [votes, setVotes] = useState<typeVotes>(
        Array.from({ length: MAX_CATEGORY }, () => [])
    );

    useEffect(() => {
        async function fetchCandidates() {
            const response = await fetch(
                `/api/candidates.json?category=${category}`
            );
            const data = await response.json();

            setPageInfo(data);
        }

        fetchCandidates();
    }, [category]);

    const handleNavigation = (categoryIndex: number) => {
        if (categoryIndex < 0) categoryIndex = MAX_CATEGORY - 1;
        else if (categoryIndex > MAX_CATEGORY - 1) categoryIndex = 0;
        setCategory(categoryIndex);
    };

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
            <footer>
                <button onClick={() => handleNavigation(category - 1)}>
                    <Arrow rotate />
                </button>
                Categoría {category + 1} / {MAX_CATEGORY}
                <button onClick={() => handleNavigation(category + 1)}>
                    <Arrow />
                </button>
            </footer>
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

function Arrow({ rotate }: { rotate?: boolean }) {
    const className = rotate ? "-rotate-180" : "";

    return (
        <svg class={className} width="16" height="16" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                stroke="transparent"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m13.04 1.429 10.218 10.216a.5.5 0 0 1 0 .708L13.04 22.571a.5.5 0 0 1-.707 0l-2.756-2.756a.5.5 0 0 1-.014-.693L14.1 14.5h-13a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h13L9.566 4.878a.5.5 0 0 1 .012-.7l2.755-2.754a.5.5 0 0 1 .707.005Z"
            ></path>
        </svg>
    );
}

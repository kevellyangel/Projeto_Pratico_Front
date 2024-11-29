import PCards from "../components/PCards";

const projects = [
    {
        name: "Pokedex",
        description: "Este é o primeiro projeto.",
        image: "assets/Pokedex.jpg",
        link: "https://pokedex-ebon-iota-14.vercel.app/", // URL do site
    },
    {
        name: "TodoList",
        description: "Este é o segundo projeto.",
        image: "assets/TodoList.jpg",
        link: "https://projeto-pratico-front-pebtfmg2a-camila-marques-projects.vercel.app/", // URL do site
    },
];


function Portfolio() {
    return (
        <div className="portfolio">
            <h1>Portfólio</h1>
            <div className="project-list">
                {projects.map((project, index) => (
                    <PCards key={index} {...project} />
                ))}
            </div>
        </div>
    );
}

export default Portfolio;

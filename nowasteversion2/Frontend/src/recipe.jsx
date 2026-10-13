
import { useEffect, useState } from "react";
import "./recipe.css";

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(
                    "https://www.themealdb.com/api/json/v1/1/search.php?s="
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch recipes");
                }

                const data = await response.json();
                setRecipes(data.meals || []);
            } catch (error) {
                setError("Could not load recipes. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) {
        return <p>Loading recipes...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main className="recipes-page">
            <h1>Discover Recipes</h1>
            <p>Find meals to make with what you have.</p>

            <div className="recipe-grid">
                {recipes.map((recipe) => (
                    <article className="recipe-card" key={recipe.idMeal}>
                        <img
                            src={recipe.strMealThumb}
                            alt={recipe.strMeal}
                        />

                        <div className="recipe-info">
                            <h2>{recipe.strMeal}</h2>
                            <p>{recipe.strArea || "Cuisine not specified"}</p>
                            <a
                                href={recipe.strSource || recipe.strYoutube || "#"}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View recipe
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}

export default Recipes;
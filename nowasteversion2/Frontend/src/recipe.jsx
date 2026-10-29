
import { useState } from "react";
import "./recipe.css";

const API_URL = "http://127.0.0.1:8000";
const MEAL_API = "https://www.themealdb.com/api/json/v1/1";

function Recipes() {
    const [recipe, setRecipe] = useState(null);
    const [recipeImage, setRecipeImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirming, setConfirming] = useState(false);
    const [message, setMessage] = useState("");

    const findRecipeImage = async (generatedRecipe) => {
        setRecipeImage("");
        setImageLoading(true);

        try {
            const searchTerms = [
                generatedRecipe.name,
                generatedRecipe.ingredients?.[0]?.name
            ].filter(Boolean);

            for (const term of searchTerms) {
                const response = await fetch(
                    `${MEAL_API}/search.php?s=${encodeURIComponent(term)}`
                );

                if (!response.ok) continue;

                const data = await response.json();
                const image = data.meals?.[0]?.strMealThumb;

                if (image) {
                    setRecipeImage(image);
                    return;
                }
            }
        } catch (err) {
            console.error("Could not find a recipe image:", err);
        } finally {
            setImageLoading(false);
        }
    };

    const generateRecipe = async () => {
        setLoading(true);
        setError("");
        setMessage("");
        setRecipe(null);
        setRecipeImage("");

        try {
            const response = await fetch(`${API_URL}/GenerateRecipe`, {
                method: "POST",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Failed to generate recipe.");
            }

            setRecipe(data.recipe);
            findRecipeImage(data.recipe);
        } catch (err) {
            setError(
                err.message ||
                "Could not generate a recipe. Check that the backend is running."
            );
        } finally {
            setLoading(false);
        }
    };

    const confirmRecipe = async (made) => {
        if (!recipe) return;

        setConfirming(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch(`${API_URL}/ConfirmRecipe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    made,
                    recipe,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Failed to confirm recipe.");
            }

            setMessage(data.message);

            if (made) {
                setRecipe(null);
                setRecipeImage("");
            }
        } catch (err) {
            setError(err.message || "Could not confirm the recipe.");
        } finally {
            setConfirming(false);
        }
    };

    return (
        <main className="recipes-page">
            <h1>Discover Recipes</h1>
            <p>Find meals to make with the ingredients you have.</p>

            <button
                type="button"
                onClick={generateRecipe}
                disabled={loading || confirming}
            >
                {loading ? "Generating recipe..." : "Generate a recipe"}
            </button>

            {loading && <p>Finding a recipe using your pantry...</p>}

            {error && <p role="alert">{error}</p>}
            {message && <p role="status">{message}</p>}

            {recipe && (
                <article className="recipe-card">
                    {recipeImage ? (
                        <img
                            className="recipe-image"
                            src={recipeImage}
                            alt={recipe.name}
                        />
                    ) : (
                        <div className="recipe-image-placeholder">
                            {imageLoading
                                ? "Finding a food image..."
                                : "No matching food image found"}
                        </div>
                    )}

                    <div className="recipe-info">
                        <h2>{recipe.name}</h2>

                        <h3>Ingredients</h3>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={`${ingredient.name}-${index}`}>
                                    {ingredient.name}: {ingredient.quantity}{" "}
                                    {ingredient.unit}
                                </li>
                            ))}
                        </ul>

                        <h3>Instructions</h3>
                        <ol>
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index}>
                                    {instruction.replace(/^\s*\d+\.\s*/, "")}
                                </li>
                            ))}
                        </ol>

                        <h3>Did you make this recipe?</h3>

                        <button
                            type="button"
                            onClick={() => confirmRecipe(true)}
                            disabled={confirming}
                        >
                            {confirming ? "Saving..." : "Yes, I made it"}
                        </button>

                        <button
                            type="button"
                            onClick={() => confirmRecipe(false)}
                            disabled={confirming}
                        >
                            No, I didn't
                        </button>
                    </div>
                </article>
            )}
        </main>
    );
}

export default Recipes;

import React from 'react';

const Order = (props) => {
    const ingredients = [];
    for (const [key,
        value]of Object.entries(props.ingredients)) {
        ingredients.push({ingredient: key, amount: value});
    }

    const transformedIngredients = ingredients.map((data) => {
        return (
            <li key={data.ingredient}>{data.ingredient} ({data.amount})</li>
        );
    });

    return (
        <div>
            <p>Ingredients:</p>
            <ul>
                {transformedIngredients}
            </ul>
            <p>Price: <strong>USD {(props.price / 100).toFixed(2)}</strong></p>
        </div>
    )
};

export default Order;
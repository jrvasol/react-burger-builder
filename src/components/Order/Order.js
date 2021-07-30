import React from 'react';
import { connect } from 'react-redux';
import {getIngredientCount} from '../../shared/utility';

const Order = (props) => {
    let countedIngredients = [];
    Object.keys(props.ing).map((type) => (
        countedIngredients.push({type, count: getIngredientCount(props.ingredients, type)})
    ));

    const transformedIngredients = countedIngredients.map(ing => (ing.count !== 0 && <li key={ing.type}>{ing.type} ({ing.count})</li>));

    return (
        <div>
            <p>Ingredients:</p>
            <ul>
                {transformedIngredients}
            </ul>
            <p>Price: <strong>₱{(props.price / 100).toFixed(2)}</strong></p>
        </div>
    )
};

const mapStateToProps = ({burgerBuilder}) => ({
    ing: burgerBuilder.ingredients
})

export default connect(mapStateToProps)(Order);
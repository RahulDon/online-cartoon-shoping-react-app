const cartWithoutItems = (cart, item) => cart.filter(cartItem => cartItem.id !== item.id)
const itemInCart = (cart, item) => cart.filter(cartItem => cartItem.id === item.id)[0]

const removeAllFromCart = (cart, item) => {
    return [ ...cartWithoutItems(cart, item)]
}

const removeFromCart = (cart, item) => {
    return item.quantity === 1
            ? [ ...cartWithoutItems(cart, item)]
            : [ ...cartWithoutItems(cart, item), { ...item, quantity: item.quantity - 1} ]
}

const addToCart = (cart, item) => {
    const cartItem = itemInCart(cart, item)
    return cartItem === undefined 
            ? [ ...cartWithoutItems(cart, item), { ...item, quantity: 1}]
            : [ ...cartWithoutItems(cart, item), { ...cartItem, quantity: cartItem.quantity + 1} ]
}

const cartReducer = (state=[], action) => {
    switch(action.type) {
        case 'ADD':
            return addToCart(state, action.payload)

        case 'REMOVE':
        return removeFromCart(state, action.payload)

        case 'REMOVE_ALL':
        return removeAllFromCart(state, action.payload)

        default:
            return state;
    }
}

export default cartReducer;
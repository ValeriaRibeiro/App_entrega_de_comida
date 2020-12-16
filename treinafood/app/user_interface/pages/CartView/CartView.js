import React, {useContext, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Appbar, Button, IconButton, List, Snackbar} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {CartContext} from '../../providers/CartProvider';
import {NumberService} from '../../../data/services/NumberService';
import {cartClear, cartRemoveProduct} from '../../../data/actions/CartActions';
import {ApiService} from '../../../data/services/ApiService';


export default function CartView(props){
    const [{products}, cartdispatch] = useContext(CartContext);
    const [isMessageVisible, setMessageVisible] = useState(false);

    function removeFromCart(item){
        cartdispatch(cartRemoveProduct(item));
    }

    function finish(){
        ApiService.post('pedidos', {pedido: products});
        cartdispatch(cartClear());
        setMessageVisible(true);
    }

    function getTotal(){
        const value = products
            .map(item => item.product.price)
            .reduce((previous, current) => previous + current, 0)
        return NumberService.currency(value);
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <Appbar.Header>
                <Appbar.Content title="Carrinho"/>
            </Appbar.Header>
            <ScrollView>
                <List.Section>
                    {products.map((item, index) => (
                        <List.Item 
                            key={index}
                            title={item.product.name}
                            description={NumberService.currency(item.product.price)}
                            right={() => <IconButton
                                onPress={() => removeFromCart(item)}
                                icon={({size, color}) => <FontAwesomeIcon icon={faTimes} size={size}
                                    color={color}/>}
                            />}
                        />
                    ))}

                    {products.length !== 0 && <Button mode={'contained'} onPress={finish}>Finalizar Compra - {getTotal()}</Button>}
                </List.Section>
            </ScrollView>

            <Snackbar
                visible={isMessageVisible}
                onDismiss={() => setMessageVisible(false)}
                duration={3000}
            >
                Seu pedido foi enviado!
            </Snackbar>
        </SafeAreaView>
    )
}
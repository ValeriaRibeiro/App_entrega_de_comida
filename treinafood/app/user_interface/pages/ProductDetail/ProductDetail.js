import React, {useContext, useState} from 'react';
import {ScrollView} from 'react-native';
import {List, Checkbox, TextInput, Button} from 'react-native-paper';
import styled from 'styled-components/native';
import {ProductContext} from '../../providers/ProductProvider';
import {CartContext} from '../../providers/CartProvider';
import {cartAddProduct} from '../../../data/actions/CartActions';
import {productSelect} from '../../../data/actions/ProductActions';

const NoteInput  = styled(TextInput)`
    margin: 16px;
`;

export default function ProductDetail(){
    const [{selectedProduct}, productDispatch] = useContext(ProductContext);
    const [ , cartDispatch] = useContext(CartContext);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [note, setNote] = useState('');

    function sendtoCart(){
        const {id, name, price} = selectedProduct;

        cartDispatch(cartAddProduct({
            product: {id, name, price},
            note,
            selectedOptions
        }))
        back();
    }

    function toggleOption(option){
        let newOptionsList;

        if(isOptionSelected(option)){
            newOptionsList = selectedOptions.filter(item => item !== option);
        }else{
            newOptionsList = [...selectedOptions, option];
        }
        setSelectedOptions(newOptionsList);
    }

    function isOptionSelected(option){
        return selectedOptions.includes(option);
    }

    function back(){
        productDispatch(productSelect(null));
    }

    return(
        <ScrollView>
            <List.Section>
                <List.Subheader>Opções</List.Subheader>
                {selectedProduct.options.map(option => (
                    <List.Item 
                        key={option}
                        title={option}
                        right={(props) => (
                            <Checkbox 
                                {...props}
                                status={isOptionSelected(option) ? 'checked' : 'unchecked'}
                                onPress={() => toggleOption(option)}
                            />
                        )}
                    />
                ))}
            </List.Section>

            <NoteInput
                label={'Observação'}
                value={note}
                mode={'outlined'}
                multiline={true}
                onChangeText={setNote}
            />

            <Button mode={'contained'} onPress={sendtoCart}>Adicionar ao Carrinho</Button>

        </ScrollView>
    )
}
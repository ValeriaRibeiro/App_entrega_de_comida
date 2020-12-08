import React, {useEffect, useContext} from 'react';
import styled from 'styled-components/native';
import {Appbar, Card, Button, Paragraph} from 'react-native-paper';
import {ScrollView} from 'react-native';
import {ApiService} from '../../../data/services/ApiService';
import {ProductContext} from '../../providers/ProductProvider'
import {productSelect, productsResponse} from '../../../data/actions/ProductActions';
import {NumberService} from '../../../data/services/NumberService';
import ProductDetail from '../ProductDetail/ProductDetail';

const ViewContainer = styled.SafeAreaView`
    flex: 1;
`;

const ProductCard = styled(Card)`
    margin: 8px;
`;

export default function ProductsView(props){
    const [{productList, selectedProduct}, productDispatch] = useContext(ProductContext);

    useEffect(() => {
        ApiService.get('products')
            .then(productList => productDispatch(productsResponse(productList)))
    }, [])

    function selectProduct(product){
        productDispatch(productSelect(product))
    }

    if(selectedProduct){
        return (
            <ViewContainer>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => selectProduct(null)}/>
                    <Appbar.Content title={selectedProduct.name}/>
                </Appbar.Header>
                <ProductDetail />
            </ViewContainer>
        )
    }

    return(
        <ViewContainer>
            <Appbar.Header>
                <Appbar.Content title={'Produtos'}/>
            </Appbar.Header>

            <ScrollView>
                {productList.map(item => (
                    <ProductCard key={item.id}>
                        <Card.Cover source={{uri: item.picture}}/>
                        <Card.Title 
                            title={item.name}
                            right={(props) => <Button onPress={() => selectProduct(item)}>Selecionar</Button>}
                        />
                        <Card.Content>
                            <Paragraph>{NumberService.currency(item.price)}</Paragraph>
                        </Card.Content>
                    </ProductCard>
                ))}
            </ScrollView>

        </ViewContainer>
    )
}
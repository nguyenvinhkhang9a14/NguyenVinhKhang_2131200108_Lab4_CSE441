import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomNavigation,Provider as PaperProvider} from 'react-native-paper';
import Product_Add from './Q1_ProductList/Product_Add';
import Product_Detail from './Q1_ProductList/Product_Detail';
import Product_Search from './Q1_ProductList/Product_Search';
import Products from './Q1_ProductList/Product_List';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons';


export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    
    {key: 'ProductList', title: 'Products',icon: 'view-list'},
    {key: 'Product_Add', title: 'Add',icon: 'plus-box'},
    {key: 'ProductSearch', title: 'Search', icon: 'magnify'},
    {key: 'Product_Detail', title: 'Detail',icon: 'information'},
  ]);
  

  const renderScene = BottomNavigation.SceneMap({
    ProductList: Products,
    Product_Add: Product_Add,
    ProductSearch: Product_Search,
    Product_Detail: Product_Detail,
  });

  return (
    <PaperProvider
      settings={{
      }}>
      <SafeAreaProvider>
        <View style={{marginTop: 20, flex: 1}}>
          <BottomNavigation
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
          />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

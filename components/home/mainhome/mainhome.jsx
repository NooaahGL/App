import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { SIZES, COLORS, icons, images } from "../../../constants";
import { Stack, useRouter } from "expo-router";
import { Mysongs , Popularsongs, ScreenHeaderBtn, Welcome } from "../../../components";

const Home = () => {
    return (

      <SafeAreaView style={{ flex:1, backgroundColor: COLORS.lightWhite }}>
          <Stack.Screen 
              options={{ 
                  headerStyle: { backgroundColor: COLORS.lightWhite }, 
                  headerShadowVisible : false,
                  headerLeft: () => (
                      <ScreenHeaderBtn  iconUrl ={icons.menu} dimension = "60%"/>
                  ),
                  headerRight: () => (
                      <ScreenHeaderBtn  iconUrl ={images.profile} dimension = "100%"/>
                  ),
                  headerTitle : ""
              }}
          />

          <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{ flex:1, padding: SIZES.medium }}>
              <Welcome/>
              <Popularsongs/>
            </View>
          </ScrollView>

      </SafeAreaView>
    );
  };

export { Home };
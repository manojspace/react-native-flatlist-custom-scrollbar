/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback, useRef, useState } from "react";
import {
  Image,
  Animated,
  FlatList,
  Text,
  View,
  FlatListProps
} from "react-native";
import { transform } from "typescript";

const images = [
  "https://ud-img.azureedge.net/w_480,q_90/u/assets/logo-1.png",
  "https://ud-img.azureedge.net/w_480,q_90/u/assets/logo-2.png",
  "https://ud-img.azureedge.net/w_480,q_90/u/assets/logo-3.png",
  "https://ud-img.azureedge.net/w_480,q_90/u/assets/logo-4.png",
  "https://ud-img.azureedge.net/w_480,q_90/u/assets/logo-5.png",
  "https://ud-img.azureedge.net/w_480,q_90/u/assets/logo-6.png",
  "https://ud-img.azureedge.net/w_480,q_90/u/assets/logo-7.png",
  "https://ud-img.azureedge.net/w_480,q_90/u/assets/logo-8.png"
];

type ItemType = typeof images[0];

const SCROLLER_WIDTH = 200;
const SCROLLER_PILL_WIDTH = 20;

function App() {
  const valueX = useRef(new Animated.Value(0));

  const renderItem: FlatListProps<ItemType>["renderItem"] = useCallback(
    ({ index, item }) => {
      return (
        <View
          style={{
            marginRight: 24,
            shadowColor: "black",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            borderRadius: 8,
            overflow: "hidden",
            maxHeight: 120
          }}
        >
          <Image source={{ uri: item }} style={{ height: 120, width: 120 }} />
        </View>
      );
    },
    []
  );

  const keyExtractor: FlatListProps<ItemType>["keyExtractor"] = useCallback(
    (item, index) => item,
    []
  );

  const onScroll: FlatListProps<ItemType>["onScroll"] = useCallback((e) => {
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const scrollRatio = clamp(contentOffset.x / layoutMeasurement.width, 0, 1);
    valueX.current.setValue(scrollRatio);
  }, []);

  const translateX = valueX.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SCROLLER_WIDTH - SCROLLER_PILL_WIDTH]
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 24
      }}
    >
      <View style={{ maxWidth: 600 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>
          Top Brands
        </Text>
        <View style={{ alignItems: "center" }}>
          <FlatList
            onScroll={onScroll}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            style={{ maxHeight: 500, maxWidth: 500 }}
            horizontal
            data={images}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
          <View
            style={{
              marginTop: 24,
              backgroundColor: "#c0c0c0",
              borderRadius: 12,
              width: SCROLLER_WIDTH,
              height: 12
            }}
          >
            <Animated.View
              style={{
                backgroundColor: "rgb(60,144,207)",
                width: SCROLLER_PILL_WIDTH,
                height: "100%",
                borderRadius: 20 / 2,
                transform: [{ translateX }]
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default App;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
